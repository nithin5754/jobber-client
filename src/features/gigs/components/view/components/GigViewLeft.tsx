import { FC, ReactElement } from "react"
"src/features/gigs/context/gig.context"
import GigOverview from "./GigLeft/GigOverview"
import GigAboutLeft from "./GigLeft/GigAboutLeft"
import GigReviewOverview from "./GigLeft/GigReviewOverview"


const GigViewLeft:FC = ():ReactElement => {

  return (
<>

<GigOverview/>
<GigAboutLeft/>
<GigReviewOverview/>
</>
  )
}
export default GigViewLeft