import { useLottie } from "lottie-react";

import { LootieProps } from "../interfaces/lottie.interface";



export const LottieAnimation = ({ animationData, height, width }: LootieProps) => {
  const styles = {
    height: height,
    width: width
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    },
  
 
  };
  const { View } = useLottie(defaultOptions, styles);
  return View;
};