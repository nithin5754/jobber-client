import countries, { LocalizedCountryNames } from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { NavigateFunction } from 'react-router-dom';
import { clearAuthUser } from 'src/features/auth/reducers/auth.reducer';
import { logout } from 'src/features/auth/reducers/logout.reducer';
import { authApi } from 'src/features/auth/services/auth.service';
import { apiSlice } from 'src/store/api';
import { AppDispatch } from 'src/store/store';
import { ISliderImagesText } from '../shared.interface';
import { emptyBuyer } from 'src/features/buyer/reducer/buyer.reducer';
import { emptySeller } from 'src/features/seller/reducers/seller.reducer';
import millify from 'millify';
import { toast } from 'react-toastify';
import { IOrder } from 'src/features/order/interfaces/order.interface';
import { filter } from 'lodash';
import { updateCategoryContainer } from '../header/reducer/category.reducer';
import { updateHeader } from '../header/reducer/header.reducer';

countries.registerLocale(enLocale);

export const lowerCase = (str: string): string => {
  return str.toLowerCase();
};

export const replaceSpacesWithDash = (title: string): string => {
  const lowercaseTitle: string = lowerCase(`${title}`);
  return lowercaseTitle.replace(/\/| /g, '-'); // replace / and space with -
};

export const replaceDashWithSpaces = (title: string): string => {
  const lowercaseTitle: string = lowerCase(`${title}`);
  return lowercaseTitle.replace(/-|\/| /g, ' '); // replace - / and space with -
};

export const replaceAmpersandWithSpace = (title: string): string => {
  return title.replace(/&/g, '');
};

export const replaceAmpersandAndDashWithSpace = (title: string): string => {
  const titleWithoutDash = replaceDashWithSpaces(title);
  return titleWithoutDash.replace(/&| /g, ' ');
};

export const categories = (): string[] => {
  return [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Music & Audio',
    'Programming & Tech',
    'PhotoGraphy',
    'Data',
    'Business'
  ];
};
export const expectedGigDelivery = (): string[] => {
  return [
    '1 Day Delivery',
    '2 Days Delivery',
    '3 Days Delivery',
    '4 Days Delivery',
    '5 Days Delivery',
    '6 Days Delivery',
    '7 Days Delivery',
    '10 Days Delivery',
    '14 Days Delivery',
    '21 Days Delivery',
    '30 Days Delivery',
    '45 Days Delivery',
    '60 Days Delivery',
    '75 Days Delivery',
    '90 Days Delivery'
  ];
};
export const countriesList = (): string[] => {
  const countriesObj: LocalizedCountryNames<{ select: 'official' }> = countries.getNames('en', { select: 'official' });
  return Object.values(countriesObj);
};

export const saveToSessionStorage = (data: string, username: string): void => {
  window.sessionStorage.setItem('isLoggedIn', data);
  window.sessionStorage.setItem('loggedInUserName', username);
};

export const getDataFromSessionStorage = (key: string) => {
  const data = window.sessionStorage.getItem(key) as string;
  return JSON.parse(data);
};

// export const saveToLocalStorage = (key: string, p0: boolean, data: string): void => {
//   window.localStorage.setItem(key, data);
// };

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

export const applicationLogout = (dispatch: AppDispatch, navigate: NavigateFunction): void => {
  dispatch(logout({}));
  dispatch(apiSlice.util.resetApiState());
  dispatch(authApi.endpoints.logout.initiate() as never);
  dispatch(clearAuthUser(undefined));
  dispatch(emptyBuyer(undefined));
  dispatch(emptySeller(undefined));
  dispatch(updateCategoryContainer(false))
  dispatch(updateHeader('index'))
  dispatch(apiSlice.util.resetApiState());

  saveToSessionStorage(JSON.stringify(false), JSON.stringify(''));

  navigate('/');
};

export const sliderImages: string[] = [
  'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_1400,dpr_1.0/v1/attachments/generic_asset/asset/50218c41d277f7d85feeaf3efb4549bd-1599072608122/bg-signup-1400-x1.png',
  'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_1160,dpr_1.0/v1/attachments/generic_asset/asset/b49b1963f5f9008f5ff88bd449ec18f7-1608035772453/logo-maker-banner-wide-desktop-1352-2x.png',
  'https://fiverr-res.cloudinary.com/image/upload/w_430/q_auto,f_auto/v1/attachments/generic_asset/asset/10f680cb84a2f3ef4473ecfdede3a1ba-1593438129320/business%20logo%20design-fiverr%20guide.jpg',
  'https://fiverr-res.cloudinary.com/image/upload/w_430/f_auto,q_auto/v1/attachments/generic_asset/asset/b9495125dbb3432bf13275690d91a4f8-1656002118855/how%20to%20make%20a%20logo.jpg',
  'https://img.freepik.com/free-photo/woman-asian-happy-smiling-while-her-using-laptop-sitting-white-chair-looking-copy-space_74952-2257.jpg?t=st=1731242821~exp=1731246421~hmac=2e97929552831d7287ab4007038db9b3557621691653d57f2592f6346193b69e&w=826'
];

export const sliderImagesText: ISliderImagesText[] = [
  { header: 'Leading the Way to Excellence', subHeader: 'Your Journey, Our Expertise' },
  { header: 'Turning Ideas into Impactful Content', subHeader: 'Innovate. Create. Elevate.' },
  { header: 'Turning Magic into Results', subHeader: 'Spelling Success, One Task at a Time' },
  { header: 'Creating Futures, Delivering Now', subHeader: 'Your Vision, Our Innovation' },

  { header: 'Creating online Market Place', subHeader: 'Convert Traditional Business to Modern' }
];

export const degreeList = (): string[] => {
  return ['Associate', 'B.A.', 'B.Sc.', 'M.A.', 'M.B.A.', 'M.Sc.', 'J.D.', 'M.D.', 'Ph.D.', 'LLB', 'Certificate', 'Other'];
};

export const languageLevel = (): string[] => {
  return ['Basic', 'Conversational', 'Fluent', 'Native'];
};

export const yearList = (maxOffSet: number): string[] => {
  const years: string[] = [];

  const currentYear: number = new Date().getFullYear();

  for (let index = 0; index < maxOffSet; index++) {
    const year = currentYear - index;

    years.push(`${year}`);
  }

  return years;
};

export const shortLongNumbers = (data: number | undefined): string => {
  if (data === undefined) {
    return '0';
  } else {
    return millify(data, { precision: 0 });
  }
};

export const rating = (num: number): number => {
  if (num) {
    return Math.round(num * 10) / 10;
  } else {
    return 0.0;
  }
};

export const showSuccessToast = (message: string): void => {
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored'
  });
};

export const showErrorToast = (message: string): void => {
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored'
  });
};

export const orderTypes = (status: string, orders: IOrder[]): number => {
  const orderList: IOrder[] = filter(orders, (order: IOrder) => lowerCase(order.status) === lowerCase(status));
  return orderList.length;
};

export const sellerOrderList = (status: string, orders: IOrder[]): IOrder[] => {
  const orderList: IOrder[] = filter(orders, (order: IOrder) => lowerCase(order.status) === lowerCase(status));
  return orderList;
};



export const reactQuilUtils=()=>{
  const modules={
    toolbar:[
      ['bold','italic'],
      [{list:'ordered'},{list:'bullet'}]
    ]
  };
  const formats:string[]=['bold','italic','list','bullet'];

  return {
    modules,
    formats
  }
}



export const extractTextFromHTML = (htmlString:string):string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
};

