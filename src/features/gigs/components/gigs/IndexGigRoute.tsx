import { FC, ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { IAuthUser } from "src/features/auth/interfaces/auth.interface";
import { useAuthDetails } from "src/features/auth/reducers/auth.reducer";
import { useAppSelector } from "src/store/store";

const IndexGigRoute: FC<{ children: ReactNode }> = ({ children }): ReactElement => {
  const authDetails: IAuthUser = useAppSelector(useAuthDetails);

  if (authDetails && authDetails.username) {
    return <Navigate to="/" />;
  }

  return <>{children}</>; 
};

export default IndexGigRoute;
