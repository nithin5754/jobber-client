


const Footer = () => {
  return (
   

<footer className="bg-white shadow-sm dark:bg-gray-800 opacity-100 ">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
       
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Codehirepro</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-white/50">
                <li>
                    <a href="/refund_policy" className="hover:underline me-4 md:me-6">Refund Policy</a>
                </li>
                <li>
                    <a href="/privacy" className="hover:underline me-4 md:me-6" >Privacy Policy</a>
                </li>
                <li>
                    <a href="/terms-of-service" className="hover:underline me-4 md:me-6">Terms of Service</a>
                </li>
                <li>
                    <a href='/delivery-policy' className="hover:underline">Delivery Policy</a>
                </li>
                <li>
                    <a href="/contact" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-white/50">© 2025 <a href="/" className="hover:underline">codehirepro™</a>. All Rights Reserved.</span>
    </div>
</footer>


  )
}
export default Footer