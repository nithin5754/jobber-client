import { FC, lazy, LazyExoticComponent, ReactElement, useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/seller/context/seller.context';
import { ILanguage, ILanguageEditFieldsProps } from 'src/features/seller/interfaces/seller.interface';

const LanguageField: LazyExoticComponent<FC<ILanguageEditFieldsProps>> = lazy(
  () => import('src/features/seller/components/profile/components/overview/language/LanguageField')
);

const Language: FC = (): ReactElement => {
  const [showLanguageEditForm, setShowLanguageEditForm] = useState<boolean>(false);
  const [showLanguageAddForm, setShowLanguageAddForm] = useState<boolean>(false);

  const { sellerProfile, showEditIcons } = useContext(SellerContext);



  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>();

  return (
    <div className="border-grey border bg-white">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base">LANGUAGE SKILLS</h4>
        {showEditIcons && !showLanguageAddForm && (
          <span
            className="flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base"
            onClick={() => {
              setShowLanguageAddForm(!showLanguageAddForm);
              setShowLanguageEditForm(false);
            }}
          >
            Add New
          </span>
        )}
      </div>
      <ul className="mb-0 list-none pt-1.5">
        {showLanguageAddForm && (
          <li className="flex justify-between">
            <LanguageField type={'add'} setShowLanguageAddForm={setShowLanguageAddForm} />
          </li>
        )}
        {!showLanguageAddForm && (
          <>
            {sellerProfile.languages.map((lang: ILanguage) => (
              <li key={lang._id} className="mb-2 flex justify-between">
                {!showLanguageEditForm && (
                  <div className="col-span-3 ml-4 flex pb-3 text-sm md:text-base">
                    <div className="mr-3 font-bold">{lang.language}</div>
                    <div className="mr-3">-</div>
                    <div>{lang.level}</div>
                  </div>
                )}
                {showLanguageEditForm && selectedLanguage?._id === lang._id && (
                  <LanguageField type={'edit'} setShowLanguageEditForm={setShowLanguageEditForm} selectedLanguage={selectedLanguage} />
                )}
                <div className="mr-4">
                  {showEditIcons && !showLanguageEditForm && (
                    <FaPencilAlt
                      size="12"
                      className="ml-1 mt-1.5 cursor-pointer lg:ml-2.5 lg:mt-2"
                      onClick={() => {
                        setShowLanguageEditForm(!showLanguageEditForm);
                        setSelectedLanguage(lang);
                        setShowLanguageAddForm(false);
                      }}
                    />
                  )}
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};
export default Language;
