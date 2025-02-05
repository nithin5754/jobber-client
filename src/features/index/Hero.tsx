import {
  ChangeEvent,
  FC,
  FormEvent,
  lazy,
  LazyExoticComponent,
  ReactElement,
  RefObject,
  Suspense,
  useEffect,
  useRef,
  useState
} from 'react';
import { FaSearch } from 'react-icons/fa';
import { createSearchParams, NavigateFunction, useNavigate } from 'react-router-dom';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { categories as categoriesArray, replaceSpacesWithDash } from 'src/shared/utils/utils.service';
import Typed from 'typed.js';
import { v4 as uuidv4 } from 'uuid';
import animationMobile from 'src/assets/json/mobile.json';
import { LootieProps } from 'src/shared/lottie/interfaces/lottie.interface';

const HeroLottieAnimation: LazyExoticComponent<FC<LootieProps>> = lazy(() => import('src/shared/lottie/components/LootieAnimation'));

const categories: string[] = categoriesArray();
const Hero: FC = (): ReactElement => {
  const typedElement: RefObject<HTMLSpanElement> = useRef<HTMLSpanElement>(null);
  const navigate: NavigateFunction = useNavigate();
  const [searchItem, setSearchItem] = useState<string>('');
  const navigateToSearchPage = (): void => {
    const url: string = `/gigs/search?${createSearchParams({ query: searchItem.trim() })}`;
    navigate(url);
  };
  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [...categories, 'Video Editor', 'Teacher', 'Mechanic'],
      startDelay: 300,
      backDelay: 300,
      typeSpeed: 100,
      backSpeed: 200,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div className="relative bg-white pb-20 pt-40 dark:bg-gray-900 lg:pt-44">
      <div className="relative m-auto px-6 xl:container md:px-12 lg:px-6">
        <h3 className="mb-4 mt-4 max-w-2xl pb-2 text-center text-2xl font-normal dark:text-white lg:text-left">
          Specialize in: <span ref={typedElement}></span>
        </h3>
        <h1
          className="text-center text-4xl font-black text-customPurple-900 dark:text-white sm:mx-auto sm:w-10/12 
        sm:text-5xl md:w-10/12 md:text-5xl lg:w-auto lg:text-left xl:text-7xl"
        >
          Hire expert freelancers <br className="hidden lg:block" />{' '}
          <span
            className="relative bg-gradient-to-r from-customPurple to-fuchsia-500 bg-clip-text text-transparent
          dark:from-customViolet dark:to-customPurple"
          >
            for your Website
          </span>
          
        </h1>
        <div className="lg:flex">
          <div
            className="relative mt-8 space-y-8 text-center sm:mx-auto sm:w-10/12 md:mt-16 md:w-2/3 lg:ml-0 
          lg:mr-auto lg:w-7/12 lg:text-left"
          >
            <p className="text-gray-700 dark:text-gray-300 sm:text-lg lg:w-11/12">
              Find the right freelance service for your next Website.
            </p>
            <div className="flex w-full justify-between gap-6 lg:gap-12">
              <form
                className="mx-auto flex w-full items-center bg-white rounded-lg"
                onSubmit={(event: FormEvent) => {
                  event.preventDefault();
                  navigateToSearchPage();
                }}
              >
                <div className="w-full ">
                  <TextInput
                    value={searchItem}
                    onChange={(event: ChangeEvent) => setSearchItem((event.target as HTMLInputElement).value)}
                    type="search"
                    className="w-full rounded-full px-4 py-1 text-gray-800 focus:outline-none"
                    placeholder="search the area that you mainly focus!"
                  />
                </div>
                <div className="bg-customViolet hover:bg-customPurple transition-all m-[6px] rounded-lg">
                  <Button
                    type="submit"
                    className="flex h-12 w-16 items-center justify-center text-white rounded-r-full"
                    label={<FaSearch className="w-5 h-5" />}
                    onClick={navigateToSearchPage}
                  />
                </div>
              </form>
            </div>
            <div className="grid grid-cols-3 gap-x-2 gap-y-4 sm:flex sm:justify-center lg:justify-start ">
              {categories
                .filter((_, index) => index < 4)
                .map((category: string) => (
                  <div
                    key={uuidv4()}
                    className="w-full min-w-0 cursor-pointer rounded-full border border-gray-200 p-4 duration-300
                  hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20 dark:border-gray-700
                    dark:bg-gray-800 dark:hover:border-cyan-300/30"
                  >
                    <div className="flex justify-center">
                      <span className="block truncate font-medium dark:text-white">
                        <a href={`/search/categories/${replaceSpacesWithDash(category)}`}>{category}</a>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="-right-10 hidden lg:col-span-2 lg:mt-0 lg:flex">
            <div className="relative w-full">
              <Suspense>
                <HeroLottieAnimation animationData={animationMobile} height={400} width={500}  />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
