import { useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { ISellerGig } from "src/features/gigs/interface/gigi.interface";
import { IOffer } from "../interfaces/order.interface";



const Checkout = () => {
  const [searchParams] = useSearchParams({});
  const { state }: { state: ISellerGig } = useLocation();
  const [offer] = useState<IOffer>(JSON.parse(`${searchParams.get('offer')}`));
  return (
    <div>
      <p>{state.basicDescription}</p>
 <p>{offer.price}</p>
    </div>
  )
}
export default Checkout