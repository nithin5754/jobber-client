import { ChangeEvent, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { ISelectedBudget } from 'src/features/gigs/interface/gigi.interface';
import { IButtonProps, ITextInputProps } from 'src/shared/shared.interface';
import { saveToLocalStorage } from 'src/shared/utils/utils.service';
const Button: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));

const TextInput: LazyExoticComponent<ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>> =
  lazy(() => import('src/shared/inputs/TextInput'));
const BudgetDropDown: FC = (): ReactElement => {

  const [searchParams,setSearchParams]=useSearchParams()
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);
  const [selectedBudgetPrice, setSelectedBudgetPrice] = useState<ISelectedBudget>({
    maxPrice: '',
    minPrice: ''
  });
  return (
    <div className="flex flex-col">
      <div className="relative">
        <Button
          onClick={() => setToggleDropDown((item: boolean) => !item)}
          className="flex justify-between gap-5 rounded-lg border border-gray-400 px-5 py-3 font-medium transition-all "
          label={
            <>
              <span>Budget</span>
              {!toggleDropDown ? (
                <FaChevronDown className="float-right mt-1 h-4 fill-current text-slate-900" />
              ) : (
                <FaChevronUp className="float-right mt-1 h-4 fill-current text-slate-900" />
              )}
            </>
          }
        />
        {toggleDropDown ? (
          <div className="absolute mt-2 w-96 divide-y divide-gray-100 rounded-lg border border-slate-100 bg-white drop-shadow-md sm:w-72">
            <ul className="space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="min" className="mb-2 block text-sm font-normal text-slate-900">
                   MAX
                    </label>
                    <TextInput
                      type="number"
                      id="min"
                      min="0"
                      name="minPrice"
                      value={selectedBudgetPrice.minPrice ?? ''}
                      className="block w-full border border-gray-300 p-2.5 text-sm text-gray-900 dark:placeholder-gray-400 dark:focus:border-black dark:focus:ring-black"
                      placeholder="Any"
                      onChange={(event: ChangeEvent) => {
                        setSelectedBudgetPrice({ ...selectedBudgetPrice, minPrice: (event.target as HTMLInputElement).value });
                      }}
                      onKeyDown={(event:any):void => {
                        if (event.key !== 'Backspace' && isNaN(parseInt(event.key))) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="max" className="mb-2 block text-sm font-normal text-slate-900">
                    MIN
                    </label>
                    <TextInput
                      type="number"
                      id="max"
                      name="maxPrice"
                      value={selectedBudgetPrice.maxPrice ?? ''}
                      className="block w-full border border-gray-300 p-2.5 text-sm text-gray-900 dark:placeholder-gray-400 dark:focus:border-black dark:focus:ring-black"
                      placeholder="Any"
                      onChange={(event: ChangeEvent) => {
                   setSelectedBudgetPrice({ ...selectedBudgetPrice, maxPrice: (event.target as HTMLInputElement).value });
                      }}     
                      onKeyDown={(event: any):void => {
                        if (event.key !== 'Backspace' && isNaN(parseInt(event.key))) {
                          event.preventDefault();
                        }
                      }}
                
                    />
                  </div>
                </div>
              </li>
            </ul>
            <div className="my-4 flex cursor-pointer justify-evenly pt-3">
              <div className="px-4 py-2 text-sm font-medium text-slate-900"           onClick={() => {
                   setSelectedBudgetPrice({ ...selectedBudgetPrice, maxPrice: '',minPrice:'' })
                   setToggleDropDown(false)
                      }}    >Clear All</div>
              <div className="rounded bg-customPurple hover:bg-customViolet px-4 py-2 text-sm font-bold text-white "
              onClick={()=>{
                const updatedSearchParams:URLSearchParams=new URLSearchParams(searchParams.toString())

                updatedSearchParams.set('minPrice',selectedBudgetPrice.minPrice)
                updatedSearchParams.set('maxPrice',selectedBudgetPrice.maxPrice)

                setSearchParams(updatedSearchParams)
                setToggleDropDown(false)
saveToLocalStorage('filteredApplied',JSON.stringify(true))
              }}
              
              >Apply</div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-2 flex h-10 gap-4 text-xs text-slate-950">
        {
          selectedBudgetPrice.maxPrice!==''&&selectedBudgetPrice.minPrice!==''&& (
            <Button
            className="flex gap-4 self-center rounded-md bg-gray-200 px-5 py-1 font-bold hover:text-gray-500"
            label={
              <>
              {(`$${selectedBudgetPrice.minPrice}-$${selectedBudgetPrice.maxPrice}`
  
                
              )}
                <FaTimes className="self-center font-normal" />
              </>
            }
  
            onClick={()=>{
              const updatedSearchParams:URLSearchParams=new URLSearchParams(searchParams.toString())
  
              updatedSearchParams.delete('minPrice')
              updatedSearchParams.delete('maxPrice')
              setSearchParams(updatedSearchParams)
              setSelectedBudgetPrice({...selectedBudgetPrice,minPrice:'',maxPrice:''})
              setToggleDropDown(false)
  
            }}
          />
          )
        }
   
      </div>
    </div>
  );
};
export default BudgetDropDown;
