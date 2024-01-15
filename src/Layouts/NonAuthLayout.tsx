import React, { useEffect } from 'react';
import withRouter from '../Components/Common/withRouter';
import useLayoutStore from '../zustand/useLayoutStore';

const NonAuthLayout = ({ children }: any) => {
    const { layoutModeType, backgroundImageType } = useLayoutStore()
    useEffect(() => {

        if (layoutModeType === "dark") {
            document.body.setAttribute("data-bs-theme", "dark");
            document.documentElement.setAttribute("data-bs-theme", "dark");
            document.documentElement.setAttribute("data-body-image", backgroundImageType);

        } else {
            document.body.setAttribute("data-bs-theme", "light");
            document.documentElement.setAttribute("data-bs-theme", "light");
            document.documentElement.setAttribute("data-body-image", backgroundImageType);
        }
        return () => {
            document.body.removeAttribute("data-bs-theme");
            document.documentElement.removeAttribute("data-bs-theme");
            document.documentElement.removeAttribute("data-body-image");
        }
    }, [layoutModeType, backgroundImageType]);
    return (
        <div>
            {children}
        </div>
    );
};

export default withRouter(NonAuthLayout);