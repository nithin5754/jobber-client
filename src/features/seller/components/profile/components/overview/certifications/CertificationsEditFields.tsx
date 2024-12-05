import { cloneDeep, findIndex } from 'lodash';
import { LazyExoticComponent, FC, lazy, ForwardRefExoticComponent, ReactElement, useState, useContext, ChangeEvent } from 'react';
import { SellerContext } from 'src/features/seller/context/seller.context';
import { ICertificate, ICertificateEditProps } from 'src/features/seller/interfaces/seller.interface';
import { IButtonProps, IDropdownProps, ITextInputProps } from 'src/shared/shared.interface';
import { yearList } from 'src/shared/utils/utils.service';


const CertificateButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const CertificateDropDown: LazyExoticComponent<FC<IDropdownProps>> = lazy(() => import('src/shared/dropdown/DropDown'));
const CertificateTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));

const CertificationsEditFields: FC<ICertificateEditProps> = ({
  type,
  selectedCertificate,
  setShowCertificateAddForm,
  setShowCertificateEditForm
}): ReactElement => {
  const { sellerProfile, setSellerProfile } = useContext(SellerContext);

  const [name, setName] = useState<string>(selectedCertificate?.name?selectedCertificate.name:'');
  const [from, setFrom] = useState<string>(selectedCertificate?.from?selectedCertificate.from:'');
  const [year, setYear] = useState<string|number>(selectedCertificate?.year?selectedCertificate.year :'');

  const onHandleUpdate = () => {
    if (type === 'add') {
      const newCertificate: ICertificate = {
        name,
        from,
        year
      };

      const clonedItem: ICertificate[] = cloneDeep(sellerProfile.certificates) as ICertificate[];

      clonedItem.push(newCertificate);

      if (sellerProfile && setShowCertificateAddForm && setSellerProfile) {
        setSellerProfile({ ...sellerProfile, certificates: clonedItem });
        setShowCertificateAddForm(false);
      }
    } else if (type === 'edit') {
      const itemIndex: number = findIndex(sellerProfile.certificates, (value: ICertificate) => value._id === selectedCertificate?._id);
      const clonedItem: ICertificate[] = cloneDeep(sellerProfile.certificates) as ICertificate[];

      const clonedCertificate: ICertificate = {
        _id: selectedCertificate?._id,
        name: name ? name : (selectedCertificate?.name as string),
        year: year ? year : (selectedCertificate?.year as string),
        from: from ? from : (selectedCertificate?.from as string)
      };
      clonedItem.splice(itemIndex, 1, clonedCertificate);

      if (setSellerProfile && setShowCertificateEditForm && clonedItem.length > 0) {
        setSellerProfile({ ...sellerProfile, certificates: clonedItem });
        setShowCertificateEditForm(false);
      }
    }
  };

  const onCancel = () => {
    if (type === 'add' && setShowCertificateAddForm) {
      setShowCertificateAddForm(false);
    } else if (type === 'edit' && setShowCertificateEditForm) {
      setShowCertificateEditForm(false);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-16 px-3">
        <CertificateTextInput
          className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
          placeholder="Certificate or Award"
          type="text"
          name="name"
          value={name}
          onChange={(e:ChangeEvent)=>{
            setName((e.target as HTMLInputElement).value)
          }}
        />
        <CertificateTextInput
          className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
          placeholder="Certificate From (e.g: Google)"
          type="text"
          name="from"
          value={from}
          onChange={(e:ChangeEvent)=>{
            setFrom((e.target as HTMLInputElement).value)
          }}
        />
        <div className="relative">
          <CertificateDropDown
            text={`${year}`}
            maxHeight="300"
            mainClassNames="absolute bg-white z-50"
            values={yearList(50)}
            onClick={(item: string) => {
              setYear(item);
            }}
          />
        </div>
      </div>
      <div className="z-20 my-4 mt-10 flex cursor-pointer justify-center md:z-0 md:mt-0">
        <CertificateButton
          disabled={(!name || !year || !from) && type === 'add'}
          className={`md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2 ${(!name || !year || !from) && type === 'add' ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
          label={type === 'add' ? 'Add' : 'Update'}
          onClick={onHandleUpdate}
        />
        &nbsp;&nbsp;
        <CertificateButton
          className="md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2"
          label="Cancel"
          onClick={onCancel}
        />
      </div>
    </div>
  );
};
export default CertificationsEditFields;
