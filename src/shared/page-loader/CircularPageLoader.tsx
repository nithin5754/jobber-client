import { FaCircleNotch } from "react-icons/fa";

const FullPageLoader = () => {
  return (
    <div
      className="fixed inset-0 bg-white/60 flex justify-center items-center z-50"
    >
      <FaCircleNotch
        className="animate-spin text-purple-600"
        size={40}
      />
    </div>
  );
};

export default FullPageLoader;
