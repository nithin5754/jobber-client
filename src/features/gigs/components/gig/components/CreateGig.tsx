import { ChangeEvent, Dispatch, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement, useRef, useState } from 'react';
import { IQuilDescription, GIG_MAX_LENGTH, IAllowedGigItem, ICreateGig } from 'src/features/gigs/interface/gigi.interface';
import { ITextInputProps, IDropdownProps } from 'src/shared/shared.interface';
import { categories, expectedGigDelivery } from 'src/shared/utils/utils.service';
import CoverImage from './CoverImage';
import TagsInput from './TagsInput';

const GigTextInput: LazyExoticComponent<ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>> =
  lazy(() => import('src/shared/inputs/TextInput'));

const GigTextAreaInput: LazyExoticComponent<FC<ITextInputProps>> = lazy(() => import('src/shared/inputs/TextAreaInput'));

const GigDropdown: LazyExoticComponent<FC<IDropdownProps>> = lazy(() => import('src/shared/dropdown/DropDown'));

const QuilDescription: LazyExoticComponent<FC<IQuilDescription>> = lazy(
  () => import('src/features/gigs/components/gig/components/QuilDescription')
);

export interface ICreateGigArea {
  setGig: Dispatch<React.SetStateAction<ICreateGig>>;
  gig: ICreateGig;
  setIsCoverPage: Dispatch<React.SetStateAction<File | null>>;
  isCoverPage: File | null;
}

const CreateGigArea: FC<ICreateGigArea> = ({ setGig, gig, isCoverPage, setIsCoverPage }): ReactElement => {
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [subCategoriesInput, setSubCategoriesInput] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  

  const [allowedLength, setAllowedLength] = useState<IAllowedGigItem>({
    basicDescription: '100/100',
    basicTitle: '40/40',
    descriptionCharacters: '1200/1200',
    gigTitle: '80/80'
  });
  return (
    <>
      <div className="mb-6 grid md:grid-cols-5">
        <div className="pb-2 text-base font-medium">
          Gig title<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="col-span-4 md:w-11/12 lg:w-8/12">
          <GigTextInput
            className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            type="text"
            name="gigTitle"
            value={gig.title}
            placeholder="I will build something I'm good at."
            maxLength={80}
            onChange={(e) => {
              const gigTitle: string = (e.target as HTMLInputElement).value;
              setGig({ ...gig, title: gigTitle });
              const counter: number = GIG_MAX_LENGTH.gigTitle - gigTitle.length;

              setAllowedLength({ ...allowedLength, gigTitle: `${counter}/80` });
            }}
          />
          <span className="flex justify-end text-xs text-[#95979d]">{allowedLength.gigTitle} Characters</span>
        </div>
      </div>
      <div className="mb-6 grid md:grid-cols-5">
        <div className="pb-2 text-base font-medium">
          Basic title<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="col-span-4 md:w-11/12 lg:w-8/12">
          <GigTextInput
            className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="Write what exactly you'll do in short."
            type="text"
            name="basicTitle"
            value={gig.basicTitle}
            maxLength={40}
            onChange={(e) => {
              const gigBasicTitle: string = (e.target as HTMLInputElement).value;
              setGig({ ...gig, basicTitle: gigBasicTitle });
              const counter: number = GIG_MAX_LENGTH.basicTitle - gigBasicTitle.length;

              setAllowedLength({ ...allowedLength, basicTitle: `${counter}/40` });
            }}
          />
          <span className="flex justify-end text-xs text-[#95979d]">{allowedLength.basicTitle}Characters</span>
        </div>
      </div>
      <div className="mb-6 grid md:grid-cols-5">
        <div className="pb-2 text-base font-medium">
          Brief description<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="col-span-4 md:w-11/12 lg:w-8/12">
          <GigTextAreaInput
            className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="Write a brief description..."
            name="basicDescription"
            value={gig.basicDescription}
            rows={5}
            maxLength={100}
            onChange={(e) => {
              const gigBasicDescription: string = (e.target as HTMLInputElement).value;
              setGig({ ...gig, basicDescription: gigBasicDescription });
              const counter: number = GIG_MAX_LENGTH.basicDescription - gigBasicDescription.length;

              setAllowedLength({ ...allowedLength, basicDescription: `${counter}/100` });
            }}
          />
          <span className="flex justify-end text-xs text-[#95979d]">{allowedLength.basicDescription} Characters</span>
        </div>
      </div>
      <div className="mb-6 grid md:grid-cols-5">
        <div className="pb-2 text-base font-medium">
          Full description<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <QuilDescription setAllowedLength={setAllowedLength} allowedLength={allowedLength} gig={gig} setGig={setGig} />
      </div>
      <div className="mb-12 grid md:grid-cols-5">
        <div className="pb-2 text-base font-medium">
          Category<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="relative col-span-4 md:w-11/12 lg:w-8/12">
          <GigDropdown
            text={gig.categories}
            maxHeight="300"
            mainClassNames="absolute bg-white"
            values={categories()}
            onClick={(item: string) => {
              setGig({ ...gig, categories: item });
            }}
          />
        </div>
      </div>

      <TagsInput
        title={'SubCategory'}
        placeholder={'E.g. Website development , Mobile apps'}
        gigInfo={gig}
        tags={subCategories}
        itemName={'subCategories'}
        itemInput={subCategoriesInput}
        inputErrorMessage={false}
        counterText={'SubCategories'}
        setItem={setSubCategories}
        setItemInput={setSubCategoriesInput}
        setGigInfo={setGig}
      />

      <TagsInput
        title="Tags"
        placeholder="Enter search terms for your gig"
        gigInfo={gig}
        setGigInfo={setGig}
        tags={tags}
        itemInput={tagsInput}
        itemName="tags"
        counterText="Tags"
        inputErrorMessage={false}
        setItem={setTags}
        setItemInput={setTagsInput}
      />

      <div className="mb-6 grid md:grid-cols-5">
        <div className="pb-2 text-base font-medium">
          Price<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="col-span-4 md:w-11/12 lg:w-8/12">
          <GigTextInput
            type="number"
            className="border-grey mb-1 w-full rounded border p-3.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="Enter minimum price"
            name="price"
            value={`${gig.price}`}
            onChange={(event: ChangeEvent) => {
              const value: string = (event.target as HTMLInputElement).value;
              setGig({ ...gig, price: parseInt(value) > 0 ? parseInt(value) : 0 });
            }}
          />
        </div>
      </div>
      <div className="mb-12 grid md:grid-cols-5">
        <div className="pb-2 text-base font-medium">
          Expected delivery<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="relative col-span-4 md:w-11/12 lg:w-8/12">
          <GigDropdown
            text={gig.expectedDelivery}
            maxHeight="300"
            mainClassNames="absolute bg-white z-40"
            values={expectedGigDelivery()}
            onClick={(item: string) => {
              setGig({ ...gig, expectedDelivery: item });
            }}
          />
        </div>
      </div>
      <CoverImage gig={gig} setGig={setGig} setIsCoverPage={setIsCoverPage} isCoverPage={isCoverPage} />
    </>
  );
};
export default CreateGigArea;
