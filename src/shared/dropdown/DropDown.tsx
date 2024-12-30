import { ChangeEvent, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, MouseEvent, ReactElement, Suspense, useState } from 'react';
import { IButtonProps, IDropdownProps, ITextInputProps } from '../shared.interface';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { filter } from 'lodash';
import { v4 as uuidV4 } from 'uuid';
const DropDownButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('../button/Button'));
const DropDownTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('../inputs/TextInput'));

const DropDown: FC<IDropdownProps> = ({
  maxHeight,
  text,
  values,
  dropdownClassNames,
  mainClassNames,
  onClick,
  setValue,
  showSearchInput,
  style
}): ReactElement => {
  const [dropdownItem, setDropItems] = useState<string[]>(values);
  const [inputText, setInputText] = useState<string>();

  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);

  const onHandleSelect = (event: MouseEvent): void => {
    const selectedItem: string = (event.target as HTMLLIElement).textContent as string;
    if (setValue) {
      setValue(selectedItem);
    }
    setInputText(selectedItem);
    setDropItems(values);
    setToggleDropDown(false);
    if (onClick) {
      onClick(selectedItem);
    }
  };
  return (
    <div className={`w-full divide-y  divide-gray-100 rounded border ${mainClassNames}`} style={style}>
      {(!showSearchInput || showSearchInput) && !toggleDropDown && (
        <Suspense fallback={<div>Loading button...</div>}>
          <DropDownButton
            className="bg-teal flex w-full justify-between rounded px-3 py-2 text-white"
            label={
              <>
                <span className="truncate text-slate-900">{text}</span>
                {!toggleDropDown ? (
                  <FaChevronDown className="float-right h-4 mt-1 fill-current text-slate-900" />
                ) : (
                  <FaChevronUp className="float-right mt-1 h-4 fill-current text-slate-900" />
                )}
              </>
            }
            onClick={() => setToggleDropDown(!toggleDropDown)}
          />
        </Suspense>
      )}
      <div className="flex  w-full">
        {showSearchInput && toggleDropDown && (
          <div className="flex justify-between w-full">
            <DropDownTextInput
              type="text"
              name="search"
              value={inputText}
              className="h-10 w-full items-center rounded pl-3 text-sm font-normal text-gray-600 focus:outline-none lg:text-base"
              placeholder="Search..."
              onChange={(event: ChangeEvent) => {
                const inputValue: string = (event.target as HTMLInputElement).value;
                setInputText(inputValue);
                const filtered: string[] = filter(dropdownItem, (item: string) => item.toLowerCase().includes(inputValue.toLowerCase()));
                setDropItems(filtered);
                if (!inputValue) {
                  setDropItems(values);
                }
              }}
            />
            <div className="flex self-center " onClick={() => setToggleDropDown(!toggleDropDown)}>
              <FaTimes className="mx-3 h-4 fill-current text-slate-900" />
            </div>
          </div>
        )}
      </div>

      {toggleDropDown && (
        <ul
          className={`z-40 cursor-pointer overflow-y-scroll py-2 text-sm text-gray-700 dark:text-gray-200
          ${dropdownClassNames}`}
          style={{ maxHeight: `${maxHeight}px` }}
        >
          {dropdownItem &&
            dropdownItem.length > 0 &&
            dropdownItem.map((value: string) => (
              <li key={uuidV4()} onClick={onHandleSelect}>
                <div className="block px-4 py-2 text-slate-900 dark:hover:bg-gray-200">{value}</div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
export default DropDown;
