import React, { useEffect } from "react";
import useUserStore from "../zustand/useUserStore";
import { useNavigate, Navigate } from "react-router-dom";


const AuthProtected = (props: any) => {
  const { isLoggedIn, user } = useUserStore()
  if (isLoggedIn) {
    return <>{props.children}</>;
  }
  else {
    return <Navigate to={"/login"} />
  }

};


export default AuthProtected;



// import React, { useEffect } from "react";
// import { Navigate, Route } from "react-router-dom";
// import { setAuthorization } from "../helpers/api_helper";
// import { useDispatch } from "react-redux";

// import { useProfile } from "../Components/Hooks/UserHooks";

// import { logoutUser } from "../slices/thunks";

// const AuthProtected = (props : any) => {
//   const dispatch = useDispatch();
//   const { userProfile, loading, token } = useProfile();
//   useEffect(() => {
//     if (userProfile && !loading && token) {
//       setAuthorization(token);
//     } else if (!userProfile && loading && !token) {
//       dispatch(logoutUser());
//     }
//   }, [token, userProfile, loading, dispatch]);

//   /*
//     redirect is un-auth access protected routes via url
//     */

//   if (!userProfile && loading && !token) {
//     return (
//       <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
//     );
//   }

//   return <>{props.children}</>;
// };

// const AccessRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         return (<> <Component {...props} /> </>);
//       }}
//     />
//   );
// };

// export { AuthProtected, AccessRoute };