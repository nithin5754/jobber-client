import countries, { LocalizedCountryNames } from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';



countries.registerLocale(enLocale);

export const lowerCase = (str: string): string => {
  return str.toLowerCase();
};



export const replaceSpacesWithDash = (title: string): string => {
  const lowercaseTitle: string = lowerCase(`${title}`);
  return lowercaseTitle.replace(/\/| /g, '-'); // replace / and space with -
};



export const categories =():string[]=>{
  return [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Music & Audio',
    'Programming & Tech',
    'PhotoGraphy',
    'Data',
    'Business'
  ]
}


export const countriesList = (): string[] => {
  const countriesObj: LocalizedCountryNames<{ select: 'official' }> = countries.getNames('en', { select: 'official' });
  return Object.values(countriesObj);
};



export const saveToSessionStorage = (data: string, username: string): void => {
  window.sessionStorage.setItem('isLoggedIn', data);
  window.sessionStorage.setItem('loggedInuser', username);
};

export const getDataFromSessionStorage = (key: string) => {
  const data = window.sessionStorage.getItem(key) as string;
  return JSON.parse(data);
};

export const saveToLocalStorage = (key: string, data: string): void => {
  window.localStorage.setItem(key, data);
};

export const getDataFromLocalStorage = (key: string) => {
  const data = window.localStorage.getItem(key) as string;
  return JSON.parse(data);
};

export const deleteFromLocalStorage = (key: string): void => {
  window.localStorage.removeItem(key);
};
