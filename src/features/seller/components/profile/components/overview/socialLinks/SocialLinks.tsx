import { FC, ReactElement, useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import SocialLinksEdit from './SocialLinksEdit';
import { SellerContext } from 'src/features/seller/context/seller.context';

const SocialLinks: FC = (): ReactElement => {
  const [showSocialLinksEditForm, setShowSocialLinksEditForm] = useState<boolean>(false);
  const [showSocialLinksAddForm, setShowSocialLinksAddForm] = useState<boolean>(false);

  const [selectedLink,setSelectedLink]=useState<string>('')

  const { sellerProfile,showEditIcons } = useContext(SellerContext);



  return (
    <div className="border-grey border bg-white mt-6">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base">SOCIAL LINKS</h4>
        {!showSocialLinksAddForm &&showEditIcons&& (
          <span
            className="flex cursor-pointer items-center pr-3.5 text-[#00698c] text-sm md:text-base"
            onClick={() => {
              setShowSocialLinksAddForm(!showSocialLinksAddForm);
              setShowSocialLinksEditForm(false);
            }}
          >
            Add New
          </span>
        )}
      </div>
      <ul className="mb-0 list-none pt-1.5">
        {showSocialLinksAddForm && (
          <li className="flex justify-between">
            <SocialLinksEdit type={'add'} setShowSocialLinksAddForm={setShowSocialLinksAddForm} />
          </li>
        )}

        {!showSocialLinksAddForm&& (
          <>
            {sellerProfile&&sellerProfile.socialLinks.length>0 ? (
              <>
                {sellerProfile.socialLinks.map((link: string,index:number) => (
                            <li key={index} className="flex justify-between mb-2">
                              {!showSocialLinksEditForm && (
                  <div className="col-span-3 ml-4 flex pb-3 text-sm md:text-base">
                    <a href={link} target="_blank" className="mr-3 text-sky-500 no-underline hover:underline">
                      {link}
                    </a>
                  </div>
                )}
                            {showSocialLinksEditForm&&link===selectedLink && <SocialLinksEdit type={'edit'} setShowSocialLinksEditForm={setShowSocialLinksEditForm} selectedLink={selectedLink} />}
                            {!showSocialLinksEditForm&&showEditIcons && (
                              <div className="mr-4">
                                <FaPencilAlt
                                  size="12"
                                  className="ml-1 mt-1.5 cursor-pointer lg:ml-2.5 lg:mt-2"
                                  onClick={() => {
                                    setShowSocialLinksEditForm(!showSocialLinksEditForm);
                                    setShowSocialLinksAddForm(false);
                                    setSelectedLink(link)
                                  }}
                                />
                              </div>
                            )}
                          </li>
                ))}
              </>
            ) : (
              <li className="flex justify-between mb-2 ml-4">No information</li>
            )}
          </>
        )}
      </ul>
    </div>
  );
};
export default SocialLinks;
