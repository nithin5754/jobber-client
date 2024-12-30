import { cloneDeep, filter, findIndex } from 'lodash';
import { ChangeEvent, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/seller/context/seller.context';
import { ILanguage, ILanguageEditFieldsProps } from 'src/features/seller/interfaces/seller.interface';
import { IButtonProps, IDropdownProps, ITextInputProps } from 'src/shared/shared.interface';
import { languageLevel, showErrorToast } from 'src/shared/utils/utils.service';

const SellerButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const SellerDropDown: LazyExoticComponent<FC<IDropdownProps>> = lazy(() => import('src/shared/dropdown/DropDown'));
const SellerTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));

const LanguageField: FC<ILanguageEditFieldsProps> = ({
  type,
  selectedLanguage,
  setShowLanguageAddForm,
  setShowLanguageEditForm
}): ReactElement => {
  const { sellerProfile, setSellerProfile } = useContext(SellerContext);
  const [level, setLevel] = useState<string>(selectedLanguage ? `${selectedLanguage.level}` : '');
  const [language, setLanguage] = useState<string>(selectedLanguage ? `${selectedLanguage.language}` : '');

  const handleUpdate = (): void => {
    if (type === 'add') {
      const newLang: ILanguage = {
        language,
        level
      };

      const clonedLanguage: ILanguage[] = cloneDeep(sellerProfile.languages) as ILanguage[];

      clonedLanguage.push(newLang);

      if (sellerProfile && setShowLanguageAddForm && setSellerProfile) {
        setSellerProfile({ ...sellerProfile, languages: clonedLanguage });
        setShowLanguageAddForm(false);
      }
    } else {
      const itemIndex: number = findIndex(sellerProfile.languages, (value: ILanguage) => value._id === selectedLanguage?._id);
      const clonedItem: ILanguage = { level: !language ? '' : level, language, _id: selectedLanguage?._id };
      const clonedLanguages: ILanguage[] = cloneDeep(sellerProfile?.languages) as ILanguage[];
      clonedLanguages.splice(itemIndex, 1, clonedItem);
      const filtered = filter(clonedLanguages, (item: ILanguage) => item.language !== '');
      if (setSellerProfile && setShowLanguageEditForm && filtered.length > 0) {
        setSellerProfile({ ...sellerProfile, languages: clonedLanguages });
        setShowLanguageEditForm(false);
      } else {
        showErrorToast('You need to have at least one language.');
      }
    }
  };

  const handleCancel = () => {
    if (type === 'add' && setShowLanguageAddForm) {
      setShowLanguageAddForm(false);
    } else if (type === 'edit' && setShowLanguageEditForm) {
      setShowLanguageEditForm(false);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 grid grid-cols-1 gap-y-3 px-3 md:grid-cols-2 md:gap-x-2">
        <div className="">
          <SellerTextInput
            className="border-grey w-full rounded border
             p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="Language"
            type="text"
            name="language"
            value={language}
            onChange={(event: ChangeEvent) => setLanguage((event.target as HTMLInputElement).value)}
          />
        </div>
        <div className="relative">
          <SellerDropDown
            text={level}
            maxHeight="300"
            mainClassNames="absolute bg-white z-50"
            values={languageLevel()}
            onClick={(item: string) => {
              setLevel(item);
            }}
          />
        </div>
      </div>
      <div className="z-20 my-4 mt-10 flex cursor-pointer justify-center md:z-0 md:mt-0">
        <SellerButton
          disabled={(level === 'Level' || !language) && type === 'add'}
          className={`md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2 ${(level === 'Level' || !language) && type === 'add' ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
          label={`${type === 'add' ? 'Add' : 'Update'}`}
          onClick={handleUpdate}
        />
        &nbsp;&nbsp;
        <SellerButton
          className="md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2"
          label="Cancel"
          onClick={handleCancel}
        />
      </div>
    </div>
  );
};
export default LanguageField;
