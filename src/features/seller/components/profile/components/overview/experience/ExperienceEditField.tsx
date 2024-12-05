import { cloneDeep, findIndex } from 'lodash';
import { ChangeEvent, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/seller/context/seller.context';
import { IExperience, IExperienceEditProps } from 'src/features/seller/interfaces/seller.interface';
import { IButtonProps, IDropdownProps, ITextInputProps } from 'src/shared/shared.interface';
import { yearList } from 'src/shared/utils/utils.service';

const EducationButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const EducationDropDown: LazyExoticComponent<FC<IDropdownProps>> = lazy(() => import('src/shared/dropdown/DropDown'));
const EducationTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));


const EducationTextAreaInput:LazyExoticComponent<FC<ITextInputProps>>=lazy(()=>import('src/shared/inputs/TextAreaInput'))

const ExperienceEditField:FC<IExperienceEditProps> = ({type,selectedExperience,setShowExperienceAddForm,setShowExperienceEditForm}):ReactElement => {


    const { sellerProfile, setSellerProfile } = useContext(SellerContext);

    const [experienceItem,setExperienceItem]=useState<IExperience>({
        _id:selectedExperience?._id??'',
        title: selectedExperience?.title ?? '',
        company: selectedExperience?.company ?? '',
        startDate: selectedExperience?.startDate ?? 'Start Year',
        endDate: selectedExperience?.endDate ?? 'End Year',
        description: selectedExperience?.description ?? '',
        currentlyWorkingHere: selectedExperience?.currentlyWorkingHere ?? false
    })
    const [startDate, setStartDate] = useState<string>(selectedExperience?.startDate ?? 'Start Year');
    const [endDate, setEndDate] = useState<string>(selectedExperience?.endDate ?? 'End Year');


    const onHandleUpdate = () => {
        if (type === 'add') {
          const item = {
            title: experienceItem.title,
            company: experienceItem.company,
            startDate,
            endDate,
            description: experienceItem.description,
            currentlyWorkingHere: experienceItem.currentlyWorkingHere
          };
          const clonedExperience: IExperience[] = cloneDeep(sellerProfile?.experience) as IExperience[];
          clonedExperience.push(item);
          if (setSellerProfile && setShowExperienceAddForm) {
            setSellerProfile({ ...sellerProfile, experience: clonedExperience });
            setShowExperienceAddForm(false);
          }
        } else {
          const itemIndex: number = findIndex(sellerProfile?.experience, (value: IExperience) => value._id === selectedExperience?._id);
          const clonedExperience: IExperience[] = cloneDeep(sellerProfile?.experience) as IExperience[];
          const clonedItem: IExperience = {
            _id: selectedExperience?._id,
            title: experienceItem.title,
            company: experienceItem.company,
            startDate: `${startDate}`,
            endDate: experienceItem.currentlyWorkingHere ? 'Present' : `${endDate}`,
            description: experienceItem.description,
            currentlyWorkingHere: experienceItem.currentlyWorkingHere
          };
          clonedExperience.splice(itemIndex, 1, clonedItem);
          const filtered: IExperience[] = clonedExperience.filter((item: IExperience) => item.title !== '' && item.company !== '');
          if (setSellerProfile && setShowExperienceEditForm) {
            setSellerProfile({ ...sellerProfile, experience: filtered });
            setShowExperienceEditForm(false);
          }
        }
      };

  return (
    <div className="flex w-full flex-col">
    <div className="mb-6 px-3 md:mb-16">
        <EducationTextInput
            className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="Title (E.g: CEO)" type="text" name="title" value={experienceItem.title}          onChange={(event: ChangeEvent) => setExperienceItem({ ...experienceItem, title: (event.target as HTMLInputElement).value })}/>

        <EducationTextInput
            className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="Company name" type="text" name="company" value={experienceItem.company}  onChange={(event: ChangeEvent) => setExperienceItem({ ...experienceItem, company: (event.target as HTMLInputElement).value })}/>
        <div className="grid h-1/5 grid-cols-2 gap-x-2 gap-y-3">
            <div className="relative">
                <EducationDropDown text={startDate} maxHeight="300" mainClassNames="absolute bg-white" values={yearList(50)} setValue={setStartDate} />
            </div>
            <div className="relative"    style={{
                cursor: `${experienceItem.currentlyWorkingHere ? 'none' : 'pointer'}`,
                pointerEvents: `${experienceItem.currentlyWorkingHere ? 'none' : 'auto'}`
              }}>
                <EducationDropDown text={endDate} maxHeight="300" mainClassNames="absolute bg-white" values={yearList(100)} setValue={setEndDate} />
            </div>
        </div>
        <div className="mb-4 mt-2 flex items-center">
            <EducationTextInput id="default-checkbox" type="checkbox" name="currentlyWorkingHere"
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"   value={`${experienceItem.currentlyWorkingHere}`}
                checked={experienceItem.currentlyWorkingHere}        onChange={(event: ChangeEvent) => {
                    setEndDate((event.target as HTMLInputElement).checked ? 'Present' : 'End Year');
                    setExperienceItem({ ...experienceItem, currentlyWorkingHere: (event.target as HTMLInputElement).checked });
                  }} />
            <label htmlFor="default-checkbox" className="ml-2 text-sm font-normal">
                I am currently working here
            </label>
        </div>
        <div className="mb-5 flex items-center">
            <EducationTextAreaInput
                className="border-grey focus:border-grey block w-full rounded border p-2.5 text-sm text-gray-900 focus:ring-blue-500"
                placeholder="Write description..." name="description"      value={experienceItem.description}
                rows={5}
                onChange={(event: ChangeEvent) =>
                  setExperienceItem({ ...experienceItem, description: (event.target as HTMLInputElement).value })
                } />
        </div>
    </div>
    <div className="z-20 mx-3 my-4 mt-10 flex cursor-pointer justify-start md:z-0 md:mt-0">
        <EducationButton    disabled={
              (startDate === 'Start Year' ||
                endDate === 'End Year' ||
                !experienceItem.title ||
                !experienceItem.company ||
                !experienceItem.description) &&
              type === 'add'
            }
            className={`md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2 ${
                (startDate === 'Start Year' ||
                  endDate === 'End Year' ||
                  !experienceItem.title ||
                  !experienceItem.company ||
                  !experienceItem.description) &&
                type === 'add'
                  ? 'cursor-not-allowed opacity-40'
                  : 'cursor-pointer'
              }`}
              onClick={onHandleUpdate}
              label={`${type === 'edit' ? 'Update' : 'Add'}`} />
        &nbsp;&nbsp;
        <EducationButton
            className="md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2"
            label="Cancel"     onClick={() => {
                if (type === 'add' && setShowExperienceAddForm) {
                  setShowExperienceAddForm(false);
                } else if (type === 'edit' && setShowExperienceEditForm) {
                  setShowExperienceEditForm(false);
                }
              }}/>
    </div>
</div>
  )
}
export default ExperienceEditField