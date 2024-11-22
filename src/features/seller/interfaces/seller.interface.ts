import { SetStateAction, Dispatch } from 'react';

export interface IPersonalInfoData {
  [key: string]: string;
  fullName: string;
  description: string;
  profilePicture: string;
  responseTime: string;
  oneliner: string;
}

export interface IPersonalInfoProps {
  personalInfo: IPersonalInfoData;
  setPersonalInfo: Dispatch<SetStateAction<IPersonalInfoData>>;
  personalInfoErrors:IPersonalInfoData[]
}



export interface IAllowedCharacters {
  descriptionAllowed:string;
  oneLineAllowed:string
}



export interface IExperience {
  [key: string]: string | number | boolean | undefined;
  id?: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  currentlyWorkingHere: boolean | undefined;
}

export interface IEducation {
  [key: string]: string | number | undefined;
  id?: string;
  country: string;
  university: string;
  title: string;
  major: string;
  year: string;
}



export interface ILanguage {
  [key: string]: string | number | undefined;
  id?: string;
  language: string;
  level: string;
}

export interface ICertificate {
  [key: string]: string | number | undefined;
  id?: string;
  name: string;
  from: string;
  year: number | string;
}


export interface IExperienceProps {
  selectedField?: IExperience;
  experienceFields?: IExperience[];
  experienceErrors?: IExperience[];
  setExperienceFields?: Dispatch<SetStateAction<IExperience[]>>;
  setShowExperienceAddForm?: Dispatch<SetStateAction<boolean>>;
  setShowExperienceEditForm?: Dispatch<SetStateAction<boolean>>;
}


export interface IEducationProps {
  selectedField?: IEducation;
  educationFields?: IEducation[];
  educationErrors?: IEducation[];
  setEducationFields?: Dispatch<SetStateAction<IEducation[]>>;
  setShowEducationAddForm?: Dispatch<SetStateAction<boolean>>;
  setShowEducationEditForm?: Dispatch<SetStateAction<boolean>>;
}


export interface ISkillProps {
  type?: string;
  selectedField?: string[];
  skillsFields?: string[];
  skillsErrors?: string[];
  setSkillsFields?: Dispatch<SetStateAction<string[]>>;
  setShowSkillEditForm?: Dispatch<SetStateAction<boolean>>;
  setShowSkillAddForm?: Dispatch<SetStateAction<boolean>>;
}


export interface ILanguageProps {
  languageEdit?: ILanguage;
  languageFields?: ILanguage[];
  languagesErrors?: ILanguage[];
  setLanguageFields?: Dispatch<SetStateAction<ILanguage[]>>;
  setShowLanguageEditForm?: Dispatch<SetStateAction<boolean>>;
  setShowLanguageAddForm?: Dispatch<SetStateAction<boolean>>;
}


export interface ISocialLinksProps {
  socialFields?: string[];
  type?: string;
  setSocialFields?: Dispatch<SetStateAction<string[]>>;
  setShowSocialLinksAddForm?: Dispatch<SetStateAction<boolean>>;
  setShowSocialLinksEditForm?: Dispatch<SetStateAction<boolean>>;
}



export interface ICertificateProps {
  selectedField?: ICertificate;
  certificatesFields?: ICertificate[];
  setCertificatesFields?: Dispatch<SetStateAction<ICertificate[]>>;
  setShowCertificateAddForm?: Dispatch<SetStateAction<boolean>>;
  setShowCertificateEditForm?: Dispatch<SetStateAction<boolean>>;
}