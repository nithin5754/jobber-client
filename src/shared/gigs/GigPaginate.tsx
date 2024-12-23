import { Dispatch, FC, Fragment, ReactElement, SetStateAction } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ISellerGig } from 'src/features/gigs/interface/gigi.interface';


const GigPaginate: FC<{
  setCurrentPage: Dispatch<SetStateAction<string>>;
  currentPage: string;
  gigArray: ISellerGig[];
  totalSearchGig: number;
  itemPerPage: number;
}> = ({ setCurrentPage, totalSearchGig, itemPerPage, gigArray, currentPage }): ReactElement => {
  const totalPages = Math.ceil(totalSearchGig / itemPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page.toString());
    }
  };

  const indexArray: number[] = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex w-full justify-center ">
      {gigArray.length > 0 && totalPages > 1 && (
        <ul className="flex items-center gap-4">
          <li>
            <button
              className={`p-2 rounded-full border ${parseInt(currentPage, 10) === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:border-customPurple'}`}
              onClick={() => handlePageChange(parseInt(currentPage, 10) - 1)}
              disabled={parseInt(currentPage, 10) === 1}
              aria-label="Previous Page"
            >
              <FaArrowLeft />
            </button>
          </li>

      <>
      
      {indexArray.map((page,index) => (
            <Fragment key={index}>
              {page < 12 ? (
                <li >
                  <button
                    className={`px-4 py-2 rounded ${parseInt(currentPage, 10) === page ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ) : (
                <>
                  {page === parseInt(currentPage, 10) && page !== indexArray.length && page >= 12 && (
                    <li  >
                      <button
                        className={`px-4 py-2 rounded ${parseInt(currentPage, 10) === page ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  )}
                </>
              )}
            </Fragment>
          ))}

      </>
     <>
     
     {indexArray.length > 15 && (
            <li >
              <button
                className={`px-4 py-2 rounded ${parseInt(currentPage, 10) === indexArray.length ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                onClick={() => handlePageChange(indexArray.length)}
              >
                {indexArray.length}
              </button>
            </li>
          )}
     </>

       <>
       
       <li>
            <button
              className={`p-2 rounded-full border ${parseInt(currentPage, 10) === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:border-customPurple'}`}
              onClick={() => handlePageChange(parseInt(currentPage, 10) + 1)}
              disabled={parseInt(currentPage, 10) === totalPages}
              aria-label="Next Page"
            >
              <FaArrowRight />
            </button>
          </li>
       </>
        </ul>
      )}
    </div>
  );
};

export default GigPaginate;
