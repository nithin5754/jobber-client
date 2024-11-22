import { LazyExoticComponent, FC, lazy, ForwardRefExoticComponent, ReactElement, ChangeEvent } from 'react';
import { ICertificate, ICertificateProps } from 'src/features/seller/interfaces/seller.interface';
import { IButtonProps, IDropdownProps, ITextInputProps } from 'src/shared/shared.interface';
import { yearList } from 'src/shared/utils/utils.service';
import { v4 as uuidV4 } from 'uuid';
const SellerButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const SellerDropDown: LazyExoticComponent<FC<IDropdownProps>> = lazy(() => import('src/shared/dropdown/DropDown'));

const SellerTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));

const SellerCertificate: FC<ICertificateProps> = ({ certificatesFields, setCertificatesFields }): ReactElement => {
  const addCertificateHandler = (): void => {
    const newCertificate: ICertificate = {
      id: uuidV4(),
      name: '',
      from: '',
      year: 'Year'
    };

    if (certificatesFields && setCertificatesFields && newCertificate) {
      setCertificatesFields([...certificatesFields, newCertificate]);
    }
  };

  const handleCertificateChange = (event: ChangeEvent, index: number): void => {
    const { name, value } = event.target as HTMLInputElement;

    if (certificatesFields && setCertificatesFields) {
      const data: ICertificate[] = [...certificatesFields];

      data[index][name] = value;
      setCertificatesFields([...data]);
    }
  };

  const handleDeleteCertificate = (index: number): void => {
    if (certificatesFields && setCertificatesFields && certificatesFields.length > 1) {
      const data: ICertificate[] = [...certificatesFields];
      data.splice(index, 1);
      setCertificatesFields([...data]);
    }
  };

  return (
    <div className="border-grey flex min-h-[250px] w-full flex-col border-b px-6 pb-3 pt-6">
      <div className="flex justify-between">
        <h2 className="pb-4 text-xl font-bold">Awards/Certificates</h2>
        <SellerButton
          className="md:text-md h-7 rounded bg-customPurple hover:bg-customViolet px-6 text-center text-sm font-bold text-white  focus:outline-none md:px-8"
          label="Add More"
          onClick={addCertificateHandler}
        />
      </div>

      {certificatesFields?.map((field: ICertificate, index: number) => (
        <div>
          <div className="flex flex-col">
            <SellerTextInput
              className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
              placeholder="Certificate or Award"
              type="text"
              name="name"
              value={field.name}
              onChange={(event: ChangeEvent) => handleCertificateChange(event, index)}
            />
            <SellerTextInput
              className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
              placeholder="Certificate From (e.g: Google)"
              type="text"
              name="from"
              value={field.from}
              onChange={(event: ChangeEvent) => handleCertificateChange(event, index)}
            />
          </div>
          <div className="relative flex flex-col">
            <SellerDropDown text={`${field.year}`} maxHeight="300" mainClassNames="absolute bg-white z-10" values={yearList(50)} />
            {certificatesFields && setCertificatesFields && certificatesFields.length > 1 && (
              <div className="mb-4 mt-16">
                <SellerButton
                  className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                  label="Delete"
                  onClick={() => handleDeleteCertificate(index)}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default SellerCertificate;
