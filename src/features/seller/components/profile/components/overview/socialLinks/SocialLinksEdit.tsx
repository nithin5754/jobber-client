import { cloneDeep, filter, findIndex } from 'lodash';
import { ChangeEvent, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/seller/context/seller.context';
import { ISocialEditLinksProps } from 'src/features/seller/interfaces/seller.interface';
import { IButtonProps, ITextInputProps } from 'src/shared/shared.interface';

const SocialLinksButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));

const SocialLinksTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));

const SocialLinksEdit: FC<ISocialEditLinksProps> = ({
  selectedLink,
  type,
  setShowSocialLinksAddForm,
  setShowSocialLinksEditForm
}): ReactElement => {
  const { sellerProfile, setSellerProfile } = useContext(SellerContext);

  const [socialLinks, setSocialLinks] = useState<string>(selectedLink ? `${selectedLink}` : '');

  const handleUpdate = () => {
    console.log('hello', type);
    if (type === 'add') {
      const clonedSocialLinks: string[] = cloneDeep(sellerProfile.socialLinks) as string[];

      clonedSocialLinks.push(socialLinks);

      console.log(clonedSocialLinks, 'add links');

      if (sellerProfile && setShowSocialLinksAddForm && setSellerProfile) {
        setSellerProfile({ ...sellerProfile, socialLinks: clonedSocialLinks });
        setShowSocialLinksAddForm(false);
      }
    } else if (type === 'edit') {
      const itemIndex: number = findIndex(sellerProfile.socialLinks, (value: string) => value === selectedLink);

      const clonedSocialLinks: string[] = cloneDeep(sellerProfile?.socialLinks) as string[];
      clonedSocialLinks.splice(itemIndex, 1, socialLinks);
      const filtered = filter(clonedSocialLinks, (item: string) => item !== '');
      if (setSellerProfile && setShowSocialLinksEditForm && filtered.length > 0) {
        setSellerProfile({ ...sellerProfile, socialLinks: clonedSocialLinks });
        setShowSocialLinksEditForm(false);
      }
    }
  };

  const handleCancel = () => {
    if (type === 'add' && setShowSocialLinksAddForm) {
      setShowSocialLinksAddForm(false);
    } else if (type === 'edit' && setShowSocialLinksEditForm) {
      setShowSocialLinksEditForm(false);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 px-3">
        <SocialLinksTextInput
          className="border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
          placeholder="Social media link"
          type="text"
          name="socialLink"
          value={socialLinks}
          onChange={(event: ChangeEvent) => {
            setSocialLinks((event.target as HTMLInputElement).value);
          }}
        />
      </div>
      <div className="z-20 my-4 mt-10 flex cursor-pointer justify-center md:z-0 md:mt-0">
        <SocialLinksButton
          disabled={!socialLinks && type === 'add'}
          className={`md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white
        hover:bg-sky-400 focus:outline-none md:py-2 ${!socialLinks && type === 'add' ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
          label={type === 'add' ? 'Add' : 'Update'}
          onClick={handleUpdate}
        />
        &nbsp;&nbsp;
        <SocialLinksButton
          className="md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2"
          label="Cancel"
          onClick={handleCancel}
        />
      </div>
    </div>
  );
};
export default SocialLinksEdit;
