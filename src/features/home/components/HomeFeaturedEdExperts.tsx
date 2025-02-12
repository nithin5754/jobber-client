import { FC, lazy, LazyExoticComponent, ReactElement, Suspense } from 'react';
import { IFeaturedEdExpertsProps } from '../interface/home.interfce';
import { Link } from 'react-router-dom';

import { IStartRatingProps } from 'src/shared/shared.interface';

import { ISeller } from 'src/features/seller/interfaces/seller.interface';
import { CLOUDINARY_PICTURE_URL } from 'src/shared/utils/constant.api';
import { rating } from 'src/shared/utils/utils.service';


const StarRating: LazyExoticComponent<FC<IStartRatingProps>> = lazy(() => import('src/shared/rating/StarRating'));

const HomeFeaturedEdExperts: FC<IFeaturedEdExpertsProps> = ({ sellers }): ReactElement => {
  return (
    <div className="mx-auto my-8 flex flex-col w-full">
      <div className="flex w-full flex-col justify-between self-center">
        <h2 className="flex self-center text-base font-bold md:text-2xl lg:text-3xl">Featured Experts</h2>
        <h4 className="pt-1 text-center text-sm md:text-base lg:text-lg">Work with talented people for the best possible result.</h4>
      </div>
      <div className="mt-6">
        <div className="container pt-3 flex flex-wrap justify-center gap-4">
          {sellers &&
            sellers.map((seller: ISeller) => {
              return (
                <div className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg my-6 w-96">
                  <div className="m-2.5 overflow-hidden rounded-md h-76 flex justify-center items-center">
                    <img
                      className="w-full h-full object-contain"
                      src={CLOUDINARY_PICTURE_URL(`${seller.profilePublicId}`)}
                      alt={seller.fullName}
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="mb-1 text-xl font-semibold text-slate-800">{seller.fullName}</h4>
                    <p className="text-sm font-semibold text-slate-500 uppercase">
                      {seller && seller.ratingSum && seller.ratingsCount && (
                        <Suspense fallback={'loading...'}>
                          <StarRating value={rating(seller.ratingSum / seller?.ratingsCount)} size={14} />
                        </Suspense>
                      )}
                    </p>
                    <p className="text-base text-slate-600 mt-4 font-light ">{seller.oneliner}</p>
                  </div>
                  <div className="flex justify-center p-6 pt-2 gap-7">
                    <Link to={`/seller_profile/${seller.username}/${seller.id}/view`}>
                      <div className="min-w-32  rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        <span> view more</span>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default HomeFeaturedEdExperts;
