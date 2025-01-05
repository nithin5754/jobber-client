import { FC, ReactElement, useRef, useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IGigTopProps, ISellerGig } from "src/features/gigs/interface/gigi.interface";
import GigsCardDisplay from "./GigCardDisplay";
import { replaceSpacesWithDash } from "../utils/utils.service";
import socketService from "src/sockets/socket.service";


interface IScrollProps {
  start: boolean;
  end: boolean;
}

const TopGigViews: FC<IGigTopProps> = ({ gigs, title, subTitle, category, width, type }): ReactElement => {
  const socket=socketService.getSocket()
  const navElement = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState<IScrollProps>({
    start: false,
    end: false
  });

  // Check scroll position on mount and after content updates
  useEffect(() => {
    checkScrollPosition();
  }, [gigs]);

  const checkScrollPosition = () => {
    if (navElement.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navElement.current;
      const isStart = scrollLeft > 0;
      const isEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;
      
      setScroll({ 
        start: isStart, 
        end: isEnd 
      });
    }
  };

  const slideLeft = (): void => {
    if (navElement.current) {
      const scrollAmount = navElement.current.clientWidth * 0.8; 
      navElement.current.scrollTo({
        left: navElement.current.scrollLeft - scrollAmount,
        behavior: 'smooth'
      });
      
 
      setTimeout(checkScrollPosition, 500);
    }
  };

  const slideRight = (): void => {
    if (navElement.current) {
      const scrollAmount = navElement.current.clientWidth * 0.8; 
      navElement.current.scrollTo({
        left: navElement.current.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
      
    
      setTimeout(checkScrollPosition, 500);
    }
  };


  useEffect(() => {
    const element = navElement.current;
    if (element) {
      element.addEventListener('scroll', checkScrollPosition);
      return () => element.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  return (
    <div className="relative mx-auto my-8 flex flex-col overflow-hidden rounded-lg">
      {title && (
        <div className="flex items-start py-6">
          <div className="flex w-full flex-col justify-between">
            <div className="flex gap-2">
              <h2 className="text-base font-bold md:text-lg lg:text-2xl">{title}</h2>
              {category && (
                <span className="flex self-center text-base font-bold cursor-pointer text-customPurple md:text-lg lg:text-2xl hover:text-customViolet hover:underline">
                  <Link onClick={()=>{
                    if(socket){
                      socket.emit('getLoggedInUsers','')
                    }
                  }} to={`/categories/${replaceSpacesWithDash(category)}`}>
                    {category}
                  </Link>
                </span>
              )}
            </div>
            <h4 className="pt-1 text-left text-sm">{subTitle}</h4>
          </div>
        </div>
      )}

      <div className="">
        {!scroll.end && gigs.length > 5 ? (
          <button
            onClick={slideRight}
            className={`absolute right-0 top-1/2 z-10 h-12 w-12 -translate-y-1/2 transform rounded-l-lg 
              ${!scroll.end 
                ? 'bg-customViolet/50 hover:bg-customPurple cursor-pointer' 
                : 'bg-gray-800/50 cursor-not-allowed opacity-50'
              } transition-all duration-300`}
            aria-label="Scroll right"
          >
            <FaAngleRight size={40} className="text-2xl text-white" />
          </button>
        ):(
          <>
          {
            scroll.end&&gigs.length > 5&&(
              <button
           disabled={true}
           className={`absolute right-0 top-1/2 z-10 h-12 w-12 -translate-y-1/2 transform rounded-l-lg 
            ${!scroll.end 
              ? 'bg-customViolet/50 hover:bg-customPurple cursor-pointer' 
              : 'bg-gray-800/50 cursor-not-allowed opacity-50'
            } transition-all duration-300`}
            >
              <FaAngleRight size={40} className="text-2xl text-white" />
            </button>
            )
          }
          </>
        )}
        
        {scroll.start && gigs.length > 5? (
          <button
            onClick={slideLeft}
            className={`absolute left-0 top-1/2 z-10 h-12 w-12 -translate-y-1/2 transform rounded-l-lg 
              ${scroll.start 
                ? 'bg-customViolet/50 hover:bg-customPurple cursor-pointer' 
                : 'bg-gray-800/50 cursor-not-allowed opacity-50'
              } transition-all duration-300`}
            aria-label="Scroll left"
          >
            <FaAngleLeft size={40} className="text-2xl text-white" />
          </button>
        ):(
          <>
         {
            !scroll.start&&gigs.length>5 &&(
              <button
            disabled={true}
            className={`absolute left-0 top-1/2 z-10 h-12 w-12 -translate-y-1/2 transform rounded-l-lg 
              ${scroll.start 
                ? 'bg-customViolet/50 hover:bg-customPurple cursor-pointer' 
                : 'bg-gray-800/50 cursor-not-allowed opacity-50'
              } transition-all duration-300`}
            aria-label="Scroll lef"
            >
                  <FaAngleLeft size={40} className="text-2xl text-white" />
            </button>
            )
         }
          </>
        )}

        <div 
          className=" hide-scrollbar m-auto flex h-96 w-full overflow-x-auto scroll-smooth " 
          ref={navElement}
          onScroll={checkScrollPosition}
        >
          <div className="flex gap-x-8 pt-3 ">
            {gigs.map((gig: ISellerGig) => (
              <div key={gig.id} className={`${width} flex-shrink-0`}>
                {type === 'home' && <GigsCardDisplay gig={gig} linkTarget={false} showEditIcon={false} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopGigViews;