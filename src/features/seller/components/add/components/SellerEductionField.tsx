import { LazyExoticComponent, FC, lazy, Suspense, ReactElement, ForwardRefExoticComponent, ChangeEvent, useCallback } from 'react';
import { IEducation, IEducationProps } from 'src/features/seller/interfaces/seller.interface';
import { IButtonProps, IDropdownProps, ITextInputProps } from 'src/shared/shared.interface';
import { countriesList, degreeList, yearList } from 'src/shared/utils/utils.service';

const SellerButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const SellerDropDown: LazyExoticComponent<FC<IDropdownProps>> = lazy(() => import('src/shared/dropdown/DropDown'));
const SellerTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));

import { v4 as uuidV4 } from 'uuid';

const SellerEductionField: FC<IEducationProps> = ({ educationFields, setEducationFields }): ReactElement => {
  const handleEducationChange = useCallback(
    (event: ChangeEvent, index: number): void => {
      const { name, value } = event.target as HTMLInputElement;

      if (educationFields && setEducationFields) {
        const data: IEducation[] = [...educationFields];

        data[index][name] = value;

        setEducationFields([...data]);
      }
    },
    [setEducationFields, educationFields]
  );

  const addNewEducationField = (): void => {
    if (educationFields && setEducationFields) {
      const newEducation: IEducation = {
        country: 'Country',
        university: '',
        title: 'Title',
        major: '',
        year: 'Year'
      };

      setEducationFields([...educationFields, newEducation]);
    }
  };

  const handleToDeleteExperienceField = (index: number) => {
    if (educationFields && setEducationFields && educationFields.length > 1) {
      const data: IEducation[] = [...educationFields];

      data.splice(index, 1);

      setEducationFields([...data]);
    }
  };

  return (
    <div className="border-grey flex w-full flex-col border-b px-6 pb-3 pt-6">
      <div className="flex justify-between">
        <h2 className="pb-4 text-xl font-bold">Education</h2>
        <Suspense fallback={'loading ...'}>
          <SellerButton
            className="md:text-md h-7 rounded bg-customPurple hover:bg-customViolet px-6 text-center text-sm font-bold text-white  focus:outline-none md:px-8"
            label="Add More"
            onClick={addNewEducationField}
          />
        </Suspense>
      </div>

      {educationFields &&
        educationFields.map((fields: IEducation, index: number) => (
          <div key={index} className="my-4">
            <div className="relative">
              <Suspense fallback={'loading ...'}>
                <SellerTextInput
                  className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
                  placeholder="University/College Name"
                  type="text"
                  name="university"
                  value={fields.university}
                  onChange={(event: ChangeEvent) => handleEducationChange(event, index)}
                />
              </Suspense>
            </div>
            <div className="relative h-[55px]">
              <Suspense fallback={'loading ...'}>
                <SellerDropDown
                  text={fields.country}
                  maxHeight="300"
                  showSearchInput={true}
                  mainClassNames="absolute bg-white z-50"
                  onClick={(item:string)=>{

                    const data:IEducation[]=[...educationFields]
                    data[index]['country']=item

                    if(setEducationFields){
                      setEducationFields([...data])
                    }

                  }}
                  values={countriesList()}
                />
              </Suspense>
            </div>
            <div className="mt-4 grid h-1/5 grid-cols-4 gap-x-2 gap-y-3">
              <div className="relative">
                <Suspense fallback={'loading ...'}>
                  <SellerDropDown text={fields.title} maxHeight="300" mainClassNames="absolute bg-white z-40" values={degreeList()} 
                  
                  onClick={(item:string)=>{

                    const data:IEducation[]=[...educationFields]
                    data[index]['title']=item

                    if(setEducationFields){
                      setEducationFields([...data])
                    }

                  }}
                  />
                </Suspense>
              </div>
              <div className="col-span-2">
                <Suspense fallback={'loading ...'}>
                  <SellerTextInput
                    className="border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
                    placeholder="Major e.g: Computer Engineering"
                    type="text"
                    name="major"
                    value={fields.major}
                    onChange={(event: ChangeEvent) => handleEducationChange(event, index)}
                  />
                </Suspense>
              </div>
              <div className="relative">
                <Suspense fallback={'loading ...'}>
                  <SellerDropDown
                    text={fields.year}
                    maxHeight="300"
                    mainClassNames="absolute bg-white z-40"
                    values={yearList(50)}
                    onClick={(item: string) => {
                      const data: IEducation[] = [...educationFields];

                      data[index]['year'] = item;
                      if (setEducationFields) {
                        setEducationFields([...data]);
                      }
                    }}
                  />
                </Suspense>
              </div>
              {educationFields && setEducationFields && educationFields.length > 1 && (
                <div className="mb-2">
                  <Suspense fallback={'loading ...'}>
                    <SellerButton
                      className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                      label="Delete"
                      onClick={() => handleToDeleteExperienceField(index)}
                    />
                  </Suspense>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
export default SellerEductionField;
