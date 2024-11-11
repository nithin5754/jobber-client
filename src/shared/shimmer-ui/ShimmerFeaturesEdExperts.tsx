


const ShimmerFeaturesEdExperts = () => {
  return (
    <div className="mx-auto my-8 flex flex-col w-full">
    <div className="flex w-full flex-col justify-between self-center">
        <h2 className="flex self-center text-base font-bold md:text-2xl lg:text-3xl"></h2>
        <h4 className="pt-1 text-center text-sm md:text-base lg:text-lg"></h4>
    </div>
    <div className="mt-6">
        <div className="grid gap-8 pt-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1,2,3,4,5,6,7,8].map((item: number) => (
                <div key={item} className="w-full rounded-lg border border-grey bg-white shadow">
                    <div className="flex flex-col items-center pb-10 pt-5">
                        <img className="mb-3 h-24 w-24 rounded-full shadow-lg"
                            src="https://placehold.co/330x220?text=Profile+Image" alt="Profile image" />
                        <h5 className="mb-1 xl:text-xl font-medium text-gray-900 "></h5>
                        <span className="text-sm w-[90%] mb-1 text-gray-500 text-center dark:text-gray-500"></span>
                        <div className="flex justify-center w-full gap-x-1 self-center h-6">
                            <div className="mt-1 w-20 gap-x-2">
                                {/* <!-- Star rating component --> */}
                            </div>
                            <div className="ml-2 flex self-center gap-1 rounded bg-orange-400 px-1 text-xs">
                                <span className="font-bold text-white">
                             
                                </span>
                            </div>

                        </div>
                 
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>
  )
}
export default ShimmerFeaturesEdExperts