

import { Context, createContext } from 'react';
import { emptyGigData, emptySellerData } from 'src/shared/utils/static.data';
import { IGigContext } from '../interface/gigi.interface';


export const GigContext: Context<IGigContext> = createContext({
  gig: emptyGigData,
  seller: emptySellerData

}) as unknown  as Context<IGigContext>
