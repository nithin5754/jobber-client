import { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useState } from 'react';

const useDetectOutsideClick = (
  ref: MutableRefObject<HTMLDivElement | null>,
  initialState: boolean
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  const handleClick = useCallback(
    (event: MouseEvent): void => {
      
      if (ref.current !== null && !ref.current.contains(event.target as HTMLDivElement)) {
        setIsActive(true)
      }else {
        setIsActive(false)
      }
    },
    [ref,isActive]
  );

  useEffect(() => {
    if (isActive) {
      window.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [handleClick,ref,isActive]);

  return [isActive, setIsActive];
};

export default useDetectOutsideClick;
