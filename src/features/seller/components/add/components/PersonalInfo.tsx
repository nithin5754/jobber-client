import {
  ChangeEvent,
  FC,
  ForwardRefExoticComponent,
  KeyboardEvent,
  lazy,
  LazyExoticComponent,
  ReactElement,
  Suspense,
  useCallback,
  useState
} from 'react';
import { IAllowedCharacters, IPersonalInfoData, IPersonalInfoProps } from 'src/features/seller/interfaces/seller.interface';

import { ITextInputProps } from 'src/shared/shared.interface';

const PersonalInfoTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));

const PersonalInfoTextAreaInput: LazyExoticComponent<FC<ITextInputProps>> = lazy(() => import('src/shared/inputs/TextAreaInput'));

const PersonalInfo: FC<IPersonalInfoProps> = ({ personalInfo, setPersonalInfo }): ReactElement => {
  const [allowedLength, setAllowedLength] = useState<IAllowedCharacters>({
    descriptionAllowed: '0/600',
    oneLineAllowed: '0/70'
  });

  const descriptionAllowedCharacters = 600;
  const oneLineAllowedCharacters = 70;

  const handleChangeOneLiner = useCallback(
    (e: ChangeEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;

      if (!targetValue) {
        setPersonalInfo((prev: IPersonalInfoData) => ({ ...prev, oneliner: '' }));
        setAllowedLength((prev: IAllowedCharacters) => ({ ...prev, oneLineAllowed: '0/70' }));
        return;
      }

      if (targetValue.length > oneLineAllowedCharacters) {
        const truncatedValue = targetValue.slice(0, oneLineAllowedCharacters);
        setPersonalInfo((prev: IPersonalInfoData) => ({ ...prev, oneliner: truncatedValue }));
        setAllowedLength((prev: IAllowedCharacters) => ({ ...prev, oneLineAllowed: `${truncatedValue.length}/70` }));
        return;
      }

      setPersonalInfo((prev: IPersonalInfoData) => ({ ...prev, oneliner: targetValue }));
      setAllowedLength((prev: IAllowedCharacters) => ({ ...prev, oneLineAllowed: `${targetValue.length}/70` }));
    },
    [setPersonalInfo, setAllowedLength, oneLineAllowedCharacters]
  );

  const handleKeyDownOneLiner = useCallback(
    (event: KeyboardEvent) => {
      const value = (event.target as HTMLInputElement).value;

      if (value.length >= oneLineAllowedCharacters && event.key !== 'Backspace') {
        event.preventDefault();
      }
    },
    [oneLineAllowedCharacters]
  );

  //handle description handlechange and keydown events

  const handleChangeDescription = useCallback(
    (event: ChangeEvent) => {
      const targetValue = (event.target as HTMLInputElement).value;

      if (!targetValue) {
        setPersonalInfo((prev: IPersonalInfoData) => ({
          ...prev,
          description: ''
        }));

        setAllowedLength((prev: IAllowedCharacters) => ({
          ...prev,
          descriptionAllowed: '0/600'
        }));

        return;
      }

      if (targetValue.length >= descriptionAllowedCharacters) {
        const value = targetValue.slice(0, descriptionAllowedCharacters);

        setPersonalInfo((prev: IPersonalInfoData) => ({
          ...prev,
          description: value
        }));

        setAllowedLength((prev: IAllowedCharacters) => ({
          ...prev,
          descriptionAllowed: `${value.length}/600`
        }));

        return;
      }

      setPersonalInfo((prev: IPersonalInfoData) => ({
        ...prev,
        description: targetValue
      }));

      setAllowedLength((prev: IAllowedCharacters) => ({
        ...prev,
        descriptionAllowed: `${targetValue.length}/600`
      }));
    },
    [descriptionAllowedCharacters, setAllowedLength, setPersonalInfo]
  );

  const handleKeyDownDescription = useCallback(
    (event: KeyboardEvent) => {
      const value = (event.target as HTMLInputElement).value;

      if (value.length >= descriptionAllowedCharacters && event.key !== 'Backspace') {
        event.preventDefault();
      }
    },
    [descriptionAllowedCharacters]
  );

  //handle response change events function down here

  const handleResponseTime = useCallback(
    (event: ChangeEvent) => {
      const targetValue = (event.target as HTMLInputElement).value;

      if (!targetValue) {
        setPersonalInfo((prev: IPersonalInfoData) => ({
          ...prev,
          responseTime: ''
        }));

        return;
      }

      const numericValue = targetValue.replace(/[^0-9]/g, '');

      const parsedValue = parseInt(numericValue, 10);

      if (isNaN(parsedValue) || parsedValue < 1) {
        setPersonalInfo((prev: IPersonalInfoData) => ({
          ...prev,
          responseTime: ''
        }));

        return;
      }

      setPersonalInfo((prev: IPersonalInfoData) => ({
        ...prev,
        responseTime: numericValue
      }));
    },
    [personalInfo.responseTime, setPersonalInfo]
  );

  return (
    <div className="border-b border-grey p-6">
      <div className="mb-6 grid md:grid-cols-5">
        <div className="pb-2 text-base font-medium">
          Fullname<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="col-span-4 w-full">
          <Suspense fallback={'loading...'}>
            <PersonalInfoTextInput
              className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
              type="text"
              name="fullname"
              value={personalInfo.fullName}
              onChange={(e: ChangeEvent) => {
                const usernameValue: string = (e.target as HTMLInputElement).value;
                setPersonalInfo({ ...personalInfo, fullName: usernameValue });
              }}
            />
          </Suspense>
        </div>
      </div>
      <div className="grid md:grid-cols-5 mb-6">
        <div className="text-base font-medium pb-2 mt-6 md:mt-0">
          Oneliner<sup className="text-red-500 text-base top-[-0.3em]">*</sup>
        </div>
        <div className="w-full col-span-4">
          <Suspense fallback={'loading...'}>
            <PersonalInfoTextInput
              className="w-full rounded border border-grey p-2.5 mb-1 text-sm font-normal text-gray-600 focus:outline-none"
              type="text"
              name="oneliner"
              value={personalInfo.oneliner}
              placeholder="E.g. Expert Mobile and Web Developer"
              onChange={handleChangeOneLiner}
              onKeyDown={handleKeyDownOneLiner}
            />
          </Suspense>

          <span className="flex justify-end text-[#95979d] text-xs">{allowedLength.oneLineAllowed} Characters</span>
        </div>
      </div>
      <div className="grid md:grid-cols-5 mb-6">
        <div className="text-base font-medium pb-2">
          Description<sup className="text-red-500 text-base top-[-0.3em]">*</sup>
        </div>
        <div className="w-full col-span-4">
          <Suspense fallback={'loading...'}>
            <PersonalInfoTextAreaInput
              className="w-full rounded border border-grey p-2.5 mb-1 text-sm font-normal text-gray-600 focus:outline-none"
              name="description"
              value={personalInfo.description}
              rows={5}
              onChange={handleChangeDescription}
              onKeyDown={handleKeyDownDescription}
            />
          </Suspense>

          <span className="flex justify-end text-[#95979d] text-xs">{allowedLength.descriptionAllowed} Characters</span>
        </div>
      </div>
      <div className="grid md:grid-cols-5 mb-6">
        <div className="text-base font-medium pb-2">
          Response Time<sup className="text-red-500 text-base top-[-0.3em]">*</sup>
        </div>
        <div className="w-full col-span-4">
          <Suspense fallback={'loading...'}>
            <PersonalInfoTextInput
              className="w-full rounded border border-grey p-2.5 mb-1 text-sm font-normal text-gray-600 focus:outline-none"
              type="text"
              name="responseTime"
              placeholder="E.g. 1"
              value={personalInfo.responseTime}
              onChange={handleResponseTime}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
