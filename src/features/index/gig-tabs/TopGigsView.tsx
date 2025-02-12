import { FC } from 'react';
import { ISellerGig } from 'src/features/gigs/interface/gigi.interface';


const TopGigsView: FC<{ gigs: ISellerGig[] }> = ({ gigs }) => {
  return (
    <>
      {gigs.map((gig: ISellerGig) => (
        <div key={gig.id} className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
          <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
            <img src={gig.coverImage} />
          </div>
          <div className="p-4">
            <h6 className="mb-2 text-slate-800 text-xl font-semibold overflow-hidden ">{gig.title}</h6>
            <p className="text-slate-600 leading-normal font-light">{gig.basicDescription}</p>

          </div>
        </div>
      ))}
    </>
  );
};
export default TopGigsView;
