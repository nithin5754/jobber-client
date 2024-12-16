

import { ChangeEvent, FC, ForwardRefExoticComponent, KeyboardEvent, lazy, LazyExoticComponent, ReactElement, useState } from 'react';
import { FaX } from 'react-icons/fa6';
import { ITagsInputProps } from 'src/features/gigs/interface/gigi.interface';


import { ITextInputProps } from 'src/shared/shared.interface';
import { v4 as uuidv4 } from 'uuid';

const TextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));


const TagsInput: FC<ITagsInputProps> = (props): ReactElement => {
  const { title, placeholder, gigInfo, tags, itemName, itemInput, setItem, setItemInput, setGigInfo, counterText } = props;
  const [isKeyReleased, setIsKeyReleased] = useState<boolean>(false);

  const maxTagCount = 10;

  const onChange = (event: ChangeEvent): void => {
    const { value } = event.target as HTMLInputElement;
    setItemInput(value);
  };

  const onKeyUp = (): void => {
    setIsKeyReleased(true);
  };

  const onKeyDown = (event: KeyboardEvent, input: string, tagsList: string[]): void => {


    const { key } = event;
    const trimmedInput: string = input.trim();
    if (!trimmedInput) {
      return;
    }

    if (tagsList.length + 1 <= maxTagCount) {
      if ((key === ','|| key==='Enter') && trimmedInput.length && !tagsList.includes(trimmedInput)) {
        event.preventDefault();
        setItem((prevState: string[]) => [...prevState, trimmedInput]);
        setItemInput('');
        const gigInfoList: string[] = gigInfo[`${itemName}`] as string[];
        setGigInfo({ ...gigInfo, [`${itemName}`]: [...gigInfoList, trimmedInput] });
      }
    }

    if (key === 'Backspace' && !input.length && tagsList.length && isKeyReleased) {
      const tagsCopy: string[] = [...tagsList];
      const poppedTag: string = tagsCopy.pop() as string;
      event.preventDefault();
      setItem(tagsCopy);
      setItemInput(poppedTag);
      setGigInfo({ ...gigInfo, [`${itemName}`]: [...tagsCopy] });
    }
    setIsKeyReleased(false);
  };

  const deleteTag = (index: number): void => {
    setItem((prevState: string[]) => prevState.filter((_, i: number) => i !== index));
    const gigInfoList: string[] = gigInfo[`${itemName}`] as string[];
    setGigInfo({ ...gigInfo, [`${itemName}`]: gigInfoList.filter((_, i: number) => i !== index) });
  };

  return (
    <div className="mb-6 grid md:grid-cols-5">
      <div className="mt-6 pb-2 text-base font-medium lg:mt-0">
        {title}
        <sup className="top-[-0.3em] text-base text-red-500">*</sup>
      </div>
      <div className="col-span-4 md:w-11/12 lg:w-8/12">
        <div className="flex w-full flex-wrap py-[4px]">
          {tags.map((tags: string, index: number) => (
            <div
              key={uuidv4()}
              onClick={() => deleteTag(index)}
              className="my-[2px] mr-1 flex items-center whitespace-nowrap rounded-[50px] bg-customViolet hover:bg-customPurple px-4 text-sm font-mono text-white"
            >
              {tags}
              <sup className="top-[-0.1em] right-[-0.6em] text-base "><FaX size={10}/></sup>
              
            </div>
          ))}
        </div>
        <TextInput
          type="text"
          name={title}
          value={itemInput}
          className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
          placeholder={placeholder}
          onChange={(event: ChangeEvent) => onChange(event)}
          onKeyDown={(event: KeyboardEvent) => onKeyDown(event, itemInput, tags)}
          onKeyUp={onKeyUp}
        />
        <span className="flex justify-end text-xs text-[#95979d]">
          {maxTagCount - tags.length} {counterText}
        </span>
      </div>
    </div>
  );
};

export default TagsInput;
