import { ChangeEvent, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement } from 'react';
import { ISkillProps } from 'src/features/seller/interfaces/seller.interface';
import { IButtonProps, ITextInputProps } from 'src/shared/shared.interface';

const SellerButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const SellerTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));

const SellerSkillsField: FC<ISkillProps> = ({ skillsFields, setSkillsFields }): ReactElement => {
  const handleSkillChange = (event: ChangeEvent, index: number): void => {
    const { value } = event.target as HTMLInputElement;

    if (skillsFields && setSkillsFields) {
      const data: string[] = [...skillsFields];

      data[index] = value;
      setSkillsFields([...data]);
    }
  };

  const addNewSkills = () => {
    if (skillsFields && setSkillsFields) {
      setSkillsFields([...skillsFields, '']);
    }
  };

  const deleteSkill = (index: number) => {
    if (skillsFields && setSkillsFields && skillsFields.length > 1) {
      const data: string[] = [...skillsFields];

      data.splice(index, 1);

      setSkillsFields([...data]);
    }
  };

  return (
    <div className="border-grey flex w-full flex-col border-b px-6 pb-3 pt-6">
      <div className="flex justify-between">
        <h2 className="pb-4 text-xl font-bold">Skills</h2>
        <SellerButton
          className="md:text-md h-7 rounded bg-customPurple px-6 text-center text-sm font-bold text-white hover:bg-customViolet focus:outline-none md:px-8"
          label="Add More"
          disabled={skillsFields && skillsFields[skillsFields.length - 1] === ''}
          onClick={addNewSkills}
        />
      </div>
      {skillsFields?.map((field: string, index: number) => (
        <div key={index}>
          <SellerTextInput
            className="border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="Skill E.g: Front End Developer"
            type="text"
            name="skill"
            value={field}
            onChange={(event: ChangeEvent) => {
              handleSkillChange(event, index);
            }}
          />
          {skillsFields && setSkillsFields && skillsFields.length > 1 && (
            <div className="my-3">
              <SellerButton
                className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                label="Delete"
                onClick={() => deleteSkill(index)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default SellerSkillsField;
