import { LazyExoticComponent, FC, lazy, ForwardRefExoticComponent, ReactElement, ChangeEvent } from 'react';
import { ISocialLinksProps } from 'src/features/seller/interfaces/seller.interface';
import { IButtonProps, ITextInputProps } from 'src/shared/shared.interface';

const SellerButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));

const SellerTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));

const SellerSocialFields: FC<ISocialLinksProps> = ({ socialFields, setSocialFields }): ReactElement => {
  const addSocial = () => {
    if (socialFields && setSocialFields) {
      setSocialFields([...socialFields, '']);
    }
  };

  const handleChange = (event: ChangeEvent, index: number) => {
    const { value } = event.target as HTMLInputElement;

    if (socialFields && setSocialFields) {
      const data: string[] = [...socialFields];
      data[index] = value;
      setSocialFields([...data]);
    }
  };

  const handleDelete = (index: number): void => {
    if (socialFields && setSocialFields && socialFields.length > 1) {
      const data: string[] = [...socialFields];
      data.splice(index, 1);
      setSocialFields([...data]);
    }
  };

  return (
    <div className="flex w-full flex-col px-6 pb-3 pt-6">
      <div className="flex justify-between">
        <h2 className="pb-4 text-xl font-bold">Social Links</h2>
        <SellerButton
          className="md:text-md h-7 rounded bg-customPurple px-6 text-center text-sm font-bold text-white hover:bg-customViolet focus:outline-none md:px-8"
          label="Add More"
          onClick={addSocial}
        />
      </div>

      {socialFields?.map((field: string, index: number) => (
        <div>
          <SellerTextInput
            className="border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="Social media link"
            type="text"
            name="url"
            value={field}
            onChange={(event: ChangeEvent) => handleChange(event, index)}
          />

          {socialFields && setSocialFields && socialFields.length > 1 && (
            <div className="my-4">
              <SellerButton
                className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                label="Delete"
                onClick={() => handleDelete(index)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default SellerSocialFields;
