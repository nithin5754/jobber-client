import { LazyExoticComponent, FC, lazy, ForwardRefExoticComponent, ReactElement, useContext, useState, ChangeEvent } from 'react';
import { SellerContext } from 'src/features/seller/context/seller.context';
import { IButtonProps, ITextInputProps } from 'src/shared/shared.interface';

const DescriptionButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));

const DescriptionTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));

const Description: FC = (): ReactElement => {
  const { sellerProfile, setSellerProfile,showEditIcons } = useContext(SellerContext);

  const [showEditDescription, setShowEditDescription] = useState<boolean>(false);

  const [description, setDescription] = useState(sellerProfile.description?sellerProfile.description:'' );

  const handleInput = () => {
    if (sellerProfile && setSellerProfile && description) {
      setSellerProfile({ ...sellerProfile, description });
      setShowEditDescription(!showEditDescription)
    }
  };

  const handleCancel = () => {

    if (setSellerProfile && sellerProfile) {
      setShowEditDescription(false);
    }
  };

  return (
    <div className="border-grey border bg-white ">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base">DESCRIPTION</h4>
        {!showEditDescription&&showEditIcons && (
          <span
            className="flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base"
            onClick={() => setShowEditDescription(!showEditDescription)}
          >
            Edit
          </span>
        )}
      </div>
      <div className="mb-0 py-1.5">
        {!showEditDescription && <p className="px-3.5 text-sm md:text-base ">{description}</p>}

        {showEditDescription && (
          <div className="flex w-full flex-col">
            <div className="mb-4 px-3">
              <DescriptionTextInput
                className="border-grey focus:border-grey block w-full rounded border p-2.5 text-sm text-gray-900 focus:ring-blue-500"
                placeholder="Write description..."
                name="description"
                value={description}
                rows={5}
                maxLength={600}
                onChange={(event: ChangeEvent) => setDescription((event.target as HTMLInputElement).value)}
              />
            </div>
            <div className="mx-3 mb-2 flex cursor-pointer justify-start">
              <DescriptionButton
                disabled={false}
                className={`md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2 ${!description ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
                label="Update"
                onClick={handleInput}
              />
              &nbsp;&nbsp;
              <DescriptionButton
                className="md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2"
                label="Cancel"
                onClick={handleCancel}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Description;
