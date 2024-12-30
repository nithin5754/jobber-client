import { LazyExoticComponent, FC, lazy, ForwardRefExoticComponent, ReactElement, ChangeEvent } from 'react';
import { ILanguage, ILanguageProps } from 'src/features/seller/interfaces/seller.interface';

import { IButtonProps, IDropdownProps, ITextInputProps } from 'src/shared/shared.interface';
import { languageLevel } from 'src/shared/utils/utils.service';

const SellerButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const SellerDropDown: LazyExoticComponent<FC<IDropdownProps>> = lazy(() => import('src/shared/dropdown/DropDown'));
const SellerTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));

const SellerLangFields: FC<ILanguageProps> = ({ languageFields, setLanguageFields }): ReactElement => {
  const handleAddNewLang = (): void => {
    let newLangFields: ILanguage = {
      language: '',
      level: 'Level'
    };
    if (languageFields && setLanguageFields) {
      setLanguageFields([...languageFields, newLangFields]);
    }
  };

  const handleLangChange = (event: ChangeEvent, index: number): void => {
    const { value, name } = event.target as HTMLInputElement;

    if (languageFields && setLanguageFields) {
      const data: ILanguage[] = [...languageFields];
      data[index][name] = value;

      setLanguageFields([...data]);
    }
  };

  const deleteLanaguage = (index: number): void => {
    if (languageFields && setLanguageFields && languageFields.length > 1) {
      const data: ILanguage[] = [...languageFields];
      data.splice(index, 1);
      setLanguageFields([...data]);
    }
  };

  return (
    <div className="border-grey flex w-full flex-col border-b px-6 pb-3 pt-6">
      <div className="flex justify-between">
        <h2 className="pb-4 text-xl font-bold">Languages</h2>
        <SellerButton
          className="md:text-md h-7 rounded bg-customPurple px-6 text-center text-sm font-bold text-white hover:bg-customViolet focus:outline-none md:px-8"
          label="Add More"
          onClick={handleAddNewLang}
        />
      </div>
      {languageFields?.map((field: ILanguage, index) => (
        <div key={index} className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-2">
          <div className="">
            <SellerTextInput
              className="border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
              type="text"
              name="language"
              value={field.language}
              placeholder="Language"
              onChange={(event: ChangeEvent) => handleLangChange(event, index)}
            />
          </div>
          <div className="relative">
            <SellerDropDown
              text={field.level}
              maxHeight="300"
              mainClassNames={`absolute bg-white ${index < languageFields.length - 1 ? 'zIndexDropdown' : ''}`}
              values={languageLevel()}
              onClick={(item: string) => {
                const data: ILanguage[] = [...languageFields];
                data[index]['level'] = `${item}`;

                if (setLanguageFields) {
                  setLanguageFields([...data]);
                }
              }}
            />
          </div>
          {languageFields && setLanguageFields && languageFields.length > 1 && (
            <div className="mb-2">
              <SellerButton
                className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                label="Delete"
                onClick={() => deleteLanaguage(index)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default SellerLangFields;
