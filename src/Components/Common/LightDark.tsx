import React from 'react';
import { FaRegMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
//constants
import { layoutModeTypes } from "../constants/layout";

const LightDark = ({ layoutMode, onChangeLayoutMode } : any) => {

    const mode = layoutMode === layoutModeTypes['DARKMODE'] ? layoutModeTypes['LIGHTMODE'] : layoutModeTypes['DARKMODE'];

    return (
        <div className="ms-1 header-item d-none d-sm-flex">
            <button
                onClick={() => onChangeLayoutMode(mode)}
                type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode">
                {
                    mode=="dark" ? <FaRegMoon /> : <MdOutlineWbSunny />
                }
            </button>
        </div>
    );
};

export default LightDark;