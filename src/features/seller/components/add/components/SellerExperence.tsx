import { ChangeEvent, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement, Suspense, useCallback } from 'react';
import { IExperience, IExperienceProps } from 'src/features/seller/interfaces/seller.interface';

import { IButtonProps, IDropdownProps, ITextInputProps } from 'src/shared/shared.interface';
import { yearList } from 'src/shared/utils/utils.service';
import { v4 as uuidV4 } from 'uuid';

const SellerButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const SellerDropDown: LazyExoticComponent<FC<IDropdownProps>> = lazy(() => import('src/shared/dropdown/DropDown'));
const SellerTextAreaInput: LazyExoticComponent<FC<ITextInputProps>> = lazy(() => import('src/shared/inputs/TextAreaInput'));
const SellerTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));

const SellerExperience: FC<IExperienceProps> = ({ experienceFields, setExperienceFields }): ReactElement => {
  const handleExperienceChange = useCallback(
    (event: ChangeEvent, index: number): void => {
      if (experienceFields && setExperienceFields) {
        const data: IExperience[] = [...experienceFields];

        const { value, name, checked } = event.target as HTMLInputElement;

        if (name === 'currentlyWorkingHere') {
          data[index]['currentlyWorkingHere'] = checked;
          data[index]['endDate'] = checked ? '' : 'Present';
          updatePresentEndDate(data, index);
        } else {
          data[index][name] = value;
        }

        setExperienceFields([...data]);
      }
    },
    [setExperienceFields, experienceFields]
  );

  /**
   * @description this function handle add new experience section
   */

  const handleToAddNewExperienceField = () => {
    const newExperienceFields: IExperience = {
      _id: uuidV4(),
      title: '',
      company: '',
      startDate: 'Start Year',
      endDate: 'End Year',
      description: '',
      currentlyWorkingHere: false
    };
    if (setExperienceFields && experienceFields) {
      setExperienceFields([...experienceFields, newExperienceFields]);
    }
  };

  const handleToDeleteExperienceField = (index: number) => {
    if (experienceFields && setExperienceFields && experienceFields.length > 1) {
      const data: IExperience[] = [...experienceFields];

      data.splice(index, 1);

      setExperienceFields([...data]);
    }
  };

  const updatePresentEndDate = (data: IExperience[], index: number): void => {
    if (setExperienceFields) {
      if (!data[index]['currentlyWorkingHere']) {
        if (data[index]['endDate'] === 'Present') {
          data[index]['endDate'] = 'End Year';
          setExperienceFields(data);
        } else {
          data[index]['endDate'] = `${data[index]['endDate'] ?? 'End Year'}`;
          setExperienceFields([...data]);
        }
      } else {
        if (setExperienceFields && experienceFields) {
          const data: IExperience[] = [...experienceFields];
          data[index]['endDate'] = 'Present';
          setExperienceFields([...data]);
        }
      }
    }
  };

  return (
    <div className="border-grey flex w-full flex-col border-b px-6 pb-3 pt-6">
      <div className="flex justify-between">
        <h2 className="pb-4 text-xl font-bold">Experience</h2>
        <Suspense fallback={'loading..'}>
          <SellerButton
            className="md:text-md h-7 rounded bg-customPurple hover:bg-customViolet px-6 text-center text-sm font-bold text-white  focus:outline-none md:px-8"
            label="Add More"
            onClick={handleToAddNewExperienceField}
          />
        </Suspense>
      </div>

      {experienceFields?.map((input: IExperience, index: number) => (
        <div key={index} className="mb-4">
          <Suspense fallback={'loading...'}>
            <SellerTextInput
              className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 cursor-pointer"
              name="title"
              value={input.title}
              onChange={(event: ChangeEvent) => handleExperienceChange(event, index)}
              placeholder="Title (E.g: CEO)"
            />
          </Suspense>
          <Suspense fallback={'loading...'}>
            <SellerTextInput
              className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 cursor-pointer"
              placeholder="Company name"
              name="company"
              value={input.company}
              onChange={(event: ChangeEvent) => handleExperienceChange(event, index)}
            />
          </Suspense>
          <div className="mb-16 grid h-1/5 grid-cols-2 gap-x-2 gap-y-3">
            <div className="relative">
              <Suspense fallback={'loading..'}>
                <SellerDropDown
                  text={input.startDate}
                  maxHeight="300"
                  mainClassNames="absolute bg-white"
                  values={yearList(50)}
                  onClick={(item: string) => {
                    const data: IExperience[] = [...experienceFields];
                    data[index]['startDate'] = `${item}`;
                    if (setExperienceFields) {
                      setExperienceFields(data);
                    }
                  }}
                />
              </Suspense>
            </div>
            <div
              className="relative"
              style={{
                cursor: `${input.currentlyWorkingHere ? 'none' : 'pointer'}`,
                pointerEvents: `${input.currentlyWorkingHere ? 'none' : 'auto'}`
              }}
            >
              <Suspense fallback={'loading'}>
                <SellerDropDown
                  text={input.endDate}
                  maxHeight="300"
                  mainClassNames="absolute bg-white"
                  values={yearList(50)}
                  onClick={(item: string) => {
                    const data: IExperience[] = [...experienceFields];
                    data[index]['endDate'] = `${item}`;
                    if (setExperienceFields) {
                      setExperienceFields(data);
                    }
                  }}
                />
              </Suspense>
            </div>
          </div>
          <div className="mb-4 mt-2 flex items-center">
            <Suspense fallback={'loading'}>
              <SellerTextInput
                id="default-checkbox"
                type="checkbox"
                name="currentlyWorkingHere"
                checked={input.currentlyWorkingHere}
                value={`${input.currentlyWorkingHere}`}
                onChange={(event: ChangeEvent) => handleExperienceChange(event, index)}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
              />
            </Suspense>
            <label htmlFor="default-checkbox" className="ml-2 text-sm font-normal">
              I am currently working here
            </label>
          </div>
          <div className="flex items-center">
            <Suspense fallback={'loading..'}>
              <SellerTextAreaInput
                className="border-grey focus:border-grey block w-full rounded border p-2.5 text-sm text-gray-900 focus:ring-blue-500"
                name="description"
                rows={5}
                placeholder="Write description..."
                value={input.description}
                onChange={(event: ChangeEvent) => handleExperienceChange(event, index)}
              />
            </Suspense>
          </div>
          {experienceFields && setExperienceFields && experienceFields.length > 1 && (
            <div className="mt-2">
              <Suspense fallback={'loading..'}>
                <SellerButton
                  className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 cursor-pointer md:px-8"
                  label="Delete"
                  onClick={() => handleToDeleteExperienceField(index)}
                />
              </Suspense>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default SellerExperience;
