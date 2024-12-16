import { LazyExoticComponent, ForwardRefExoticComponent, lazy, FC, ReactElement, ChangeEvent, useState, useRef } from "react";
import { FaCamera } from "react-icons/fa"
import { IGigCreateCoverImg, IShowGigModal } from "src/features/gigs/interface/gigi.interface";
import { ITextInputProps } from "src/shared/shared.interface";
import { readAsBase64 } from "src/shared/utils/image-utils.service";

const CoverImageInput: LazyExoticComponent<ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>> =
  lazy(() => import('src/shared/inputs/TextInput'));


const CoverImage:FC<IGigCreateCoverImg> = ({setGig,gig,isCoverPage,setIsCoverPage}):ReactElement => {

  const [coverPic,setCoverPic]=useState<string>('')

  const fileRef=useRef<HTMLInputElement|null>(null)

  const [showGigModal,setShowGigModal]=useState<IShowGigModal>({
    cancel:false,
    image:false
  })


  const handleChange = async (event: ChangeEvent): Promise<void> => {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    if (target.files) {
      let file: File = target.files[0];
      const dataImage: string | ArrayBuffer | null = await readAsBase64(file);

setCoverPic(`${dataImage}`)
setIsCoverPage(file)      
 
    }
    setShowGigModal({...showGigModal,image:false})

  
  };

  return (
    <div className="mb-6 grid md:grid-cols-5">
    <div className="mt-6 pb-2 text-base font-medium lg:mt-0">
      Cover image<sup className="top-[-0.3em] text-base text-red-500">*</sup>
    </div>
    <div className="relative col-span-4 cursor-pointer md:w-11/12 lg:w-8/12"
    onMouseEnter={()=>{
      setShowGigModal((item:IShowGigModal)=>({...item,image:!item.image}))

    }}
    onMouseLeave={()=>{
      setShowGigModal((item:IShowGigModal)=>({...item,image:false}))

    }}
    >
    {
      coverPic&&(
        <img
        src={coverPic}
        alt="Cover Image"
        className="left-0 top-0 h-[220px] w-[320px] bg-white object-cover"
      />
      )
    }
    {
      !coverPic&&(
        <div className="left-0 top-0 flex h-[220px] w-[320px] cursor-pointer justify-center bg-[#dee1e7]"></div>

      )
    }


    {
      showGigModal.image&&(
        <div onClick={()=>fileRef.current?.click()} className="absolute left-0 top-0 flex h-[220px] w-[320px] cursor-pointer justify-center bg-[#dee1e7]">
        <FaCamera className="flex self-center" />
      </div>
      )
    }
    
      <CoverImageInput name="image" ref={fileRef} type="file" style={{display:'none'}} onClick={()=>{
        if(fileRef.current){
          fileRef.current.value=''
        }
   
      }}
      onChange={handleChange}
      
      />
    </div>
  </div>
  )
}
export default CoverImage