import { useState, useContext, LazyExoticComponent, FC, lazy, ReactElement } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/seller/context/seller.context';
import { ICertificate, ICertificateEditProps } from 'src/features/seller/interfaces/seller.interface';

const CertificationsEditFields: LazyExoticComponent<FC<ICertificateEditProps>> = lazy(() => import('./CertificationsEditFields'));

const Certifications:FC = ():ReactElement => {
  const [showCertificateEditForm, setShowCertificateEditForm] = useState<boolean>(false);
  const [showCertificateAddForm, setShowCertificateAddForm] = useState<boolean>(false);

  const { sellerProfile, showEditIcons } = useContext(SellerContext);

  const [selectedCertificate, setSelectedCertificate] = useState<ICertificate>();
  return (
    <div className="border-grey mt-6 border bg-white">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base">CERTIFICATIONS</h4>
        {showEditIcons && !showCertificateAddForm && (
          <span
            className="flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base"
            onClick={() => {
              setShowCertificateAddForm(!showCertificateAddForm);
              setShowCertificateEditForm(false);
            }}
          >
            Add New
          </span>
        )}
      </div>
      <ul className="mb-0 list-none pt-1.5">
        {showCertificateAddForm && (
          <li className="flex justify-between">
            <CertificationsEditFields type={'add'} setShowCertificateAddForm={setShowCertificateAddForm} />
          </li>
        )}
        {sellerProfile && sellerProfile.certificates.length > 0&&!showCertificateAddForm ? (
          <>
            {sellerProfile.certificates.map((certificate: ICertificate) => (
              <li key={certificate._id} className="mb-2 flex justify-between">
                <div className="col-span-3 ml-4 flex flex-col pb-3 text-sm md:text-base">
                  <div className="mr-3 font-bold ">{certificate.name}</div>
                  <div className="mr-3 font-normal">
                    {certificate.from} - {certificate.year}
                  </div>
                </div>
                {showCertificateEditForm &&selectedCertificate?._id===certificate._id && (
                  <CertificationsEditFields
                    type={'edit'}
                    selectedCertificate={selectedCertificate}
                    setShowCertificateEditForm={setShowCertificateEditForm}
                  />
                )}

                {!showCertificateEditForm && showEditIcons && (
                  <div className="mr-4">
                    <FaPencilAlt
                      size="12"
                      className="ml-1 mt-1.5 cursor-pointer lg:ml-2.5 lg:mt-2"
                      onClick={() => {
                        setShowCertificateAddForm(false);
                        setShowCertificateEditForm(!showCertificateEditForm);
                        setSelectedCertificate(certificate);
                      }}
                    />
                  </div>
                )}
              </li>
            ))}
          </>
        ) : (
         <>
         {
            !showCertificateAddForm&& <li className="flex justify-between mb-2 ml-4">No information</li>
         }
         </>
        )}
      </ul>
    </div>
  );
};
export default Certifications;
