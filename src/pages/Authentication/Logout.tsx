import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";


const Logout = (props : any) => {
 /*  const dispatch : any = useDispatch(); */


  // Inside your component
/*   const isUserLogout = useSelector(logoutData); */

 /*  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]); */

  if (true) {
    return <Navigate to="/login" />;
  }

  return <></>;
};


export default withRouter(Logout);