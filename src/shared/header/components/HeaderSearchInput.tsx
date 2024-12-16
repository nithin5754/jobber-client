import { ChangeEvent, FC, FormEvent, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { createSearchParams, NavigateFunction, useNavigate } from 'react-router-dom';
import { IButtonProps, ITextInputProps } from 'src/shared/shared.interface';

const HeaderSearchButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));

const HeaderSearchTextAreaInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));
const HeaderSearchInput: FC = (): ReactElement => {
  const [searchItem, setSearchItem] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();

  const navigateSearchPage = (): void => {
    const url = `/search/gigs?${createSearchParams({ query: searchItem.trim() })}`;
    navigate(url);
  };
  return (
    <div className="mb-4 mt-1  flex h-10 rounded-full w-full self-center bg-gray-500/40  opacity-100 md:mb-0 md:mt-0">
      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          navigateSearchPage();
        }}
        className="flex w-full self-center  rounded-full rounded-r-none  opacity-100"
      >
        <HeaderSearchTextAreaInput
          type="text"
          name="search"
          value={searchItem}
          onChange={(event: ChangeEvent) => setSearchItem((event.target as HTMLInputElement).value)}
          placeholder="What service are you looking for today?"
          className="w-full truncate px-4 text-white/50    py-[7.5px] bg-transparent rounded-full rounded-r-none "
        />
      </form>
      <HeaderSearchButton
        onClick={() => navigateSearchPage()}
        className="flex w-16  items-center rounded-l-none justify-center  "
        label={<FaSearch className="h-6 w-6  text-white/50" />}
      />
    </div>
  );
};
export default HeaderSearchInput;
