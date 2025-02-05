import { FC, ReactElement } from "react"



const Contact:FC = ():ReactElement => {
  return (
<body className=" ">
    <div className="container w-full  p-6 ">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg mb-2">If you have any queries, feel free to reach out!</p>
        <p className="text-gray-600 text-lg mb-2">For any assistance and queries, mail us at:</p>
        <p className="text-blue-600 text-lg font-semibold"><a href="mailto:support@jobber.phaseex.live">support@jobber.phaseex.live</a></p>
        <div className="border-t border-gray-300 my-4"></div>
        <p className="text-gray-600 text-lg mb-2">Our Operational Address:</p>
        <p className="text-gray-800 text-lg font-medium">kottayam, kerala,india - 686582</p>
    </div>
</body>
  )
}
export default Contact