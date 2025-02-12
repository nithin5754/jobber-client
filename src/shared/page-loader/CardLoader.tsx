

import { FaCircleNotch } from "react-icons/fa";

const CardLoader = () => {
  return (
    <div className="w-80 h-60 flex justify-center items-center bg-white rounded-lg shadow-md border-none">
      <FaCircleNotch className="animate-spin  h-10 w-10 mr-3 " size={40} color="rgb(184, 44, 180)"/>
    </div>
  );
};

export default CardLoader;
