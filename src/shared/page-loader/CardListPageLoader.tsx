import { FC, ReactElement } from 'react';
import CardLoader from './CardLoader';
import { FaCircleNotch } from 'react-icons/fa';

const CardListPageLoader: FC = (): ReactElement => {
  return (
    <>
      <div className="relative  pb-20 pt-40 lg:pt-44 container mx-auto items-center ">
        <div className="flex flex-col mx-auto gap-4">
          <div className="flex flex-1 items-center mx-auto gap-4 ">
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </div>
          <div className="flex flex-1 items-center mx-auto gap-2">
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </div>
          
        </div>
      </div>
      <div className="fixed inset-0 bg-white/60 flex justify-center items-center z-50">
        <FaCircleNotch className="animate-spin text-purple-600" size={40} />
      </div>
    </>
  );
};
export default CardListPageLoader;
