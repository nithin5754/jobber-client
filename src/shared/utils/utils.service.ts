

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