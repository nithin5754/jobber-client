import { FC, MutableRefObject, useRef } from "react";
import ReactQuill, { UnprivilegedEditor } from "react-quill";
import { GIG_MAX_LENGTH, IQuilDescription } from "src/features/gigs/interface/gigi.interface";
import { reactQuilUtils } from "src/shared/utils/utils.service";


const QuilDescription:FC<IQuilDescription> = ({setAllowedLength,allowedLength,gig,setGig}) => {
  const ReactQuilRef: MutableRefObject<ReactQuill | null> = useRef<ReactQuill | null>(null);
  return (
    <div className="col-span-4 md:w-11/12 lg:w-8/12">
    <ReactQuill
      theme="snow"
      value={gig.description}
      className="border-grey border rounded"
      modules={reactQuilUtils().modules}
      formats={reactQuilUtils().formats}
      ref={(element: ReactQuill | null) => {
        ReactQuilRef.current = element;
        const reactQuilEditor = ReactQuilRef.current?.getEditor();

        reactQuilEditor?.on('text-change', () => {
          if (reactQuilEditor.getLength() > GIG_MAX_LENGTH.fullDescription) {   
            reactQuilEditor.deleteText(GIG_MAX_LENGTH.fullDescription, reactQuilEditor.getLength());
          }
        });
      }}
      onChange={(event: string, _, __, editor: UnprivilegedEditor) => {
        setGig({ ...gig, description: event });

        const counter: number = GIG_MAX_LENGTH.fullDescription -( editor.getText().length-1);

        setAllowedLength({...allowedLength,descriptionCharacters:`${counter}/1200`})
      }}
    />
    <span className="flex justify-end text-xs text-[#95979d]">{allowedLength.descriptionCharacters} Characters</span>
  </div>
  )
}
export default QuilDescription