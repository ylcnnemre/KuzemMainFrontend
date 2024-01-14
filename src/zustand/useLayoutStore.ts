import { create } from 'zustand';

// Sabit tipleri ve değerleri
import {
    layoutTypes,
    layoutModeTypes,
    leftSidebarTypes,
    layoutWidthTypes,
    layoutPositionTypes,
    topbarThemeTypes,
    leftsidbarSizeTypes,
    leftSidebarViewTypes,
    leftSidebarImageTypes,
    preloaderTypes,
    backgroundImageTypes,
    sidebarVisibilitytypes
} from '../Components/constants/layout';

// Sabit tiplerin birleşimi için tip tanımları
type LayoutType = typeof layoutTypes[keyof typeof layoutTypes];
type LayoutModeType = typeof layoutModeTypes[keyof typeof layoutModeTypes];
type LeftSidebarType = typeof leftSidebarTypes[keyof typeof leftSidebarTypes];
type LayoutWidthType = typeof layoutWidthTypes[keyof typeof layoutWidthTypes];
type LayoutPositionType = typeof layoutPositionTypes[keyof typeof layoutPositionTypes];
type TopbarThemeType = typeof topbarThemeTypes[keyof typeof topbarThemeTypes];
type LeftsidbarSizeType = typeof leftsidbarSizeTypes[keyof typeof leftsidbarSizeTypes];
type LeftSidebarViewType = typeof leftSidebarViewTypes[keyof typeof leftSidebarViewTypes];
type LeftSidebarImageType = typeof leftSidebarImageTypes[keyof typeof leftSidebarImageTypes];
type PreloaderType = typeof preloaderTypes[keyof typeof preloaderTypes];
type BackgroundImageType = typeof backgroundImageTypes[keyof typeof backgroundImageTypes];
type SidebarVisibilityType = typeof sidebarVisibilitytypes[keyof typeof sidebarVisibilitytypes];



// Durum arayüzü ve değişiklik yapma metodları
interface LayoutState {
    layoutType: LayoutType;
    layoutModeType: LayoutModeType;
    leftSidebarType: LeftSidebarType;
    layoutWidthType: LayoutWidthType;
    layoutPositionType: LayoutPositionType;
    topbarThemeType: TopbarThemeType;
    leftsidbarSizeType: LeftsidbarSizeType;
    leftSidebarViewType: LeftSidebarViewType;
    leftSidebarImageType: LeftSidebarImageType;
    preloader: PreloaderType;
    backgroundImageType: BackgroundImageType;
    sidebarVisibilitytype: SidebarVisibilityType;

    changeLayout: (layoutType: LayoutType) => void;
    changeLayoutMode: (layoutModeType: LayoutModeType) => void;
    changeSidebarTheme: (leftSidebarType: LeftSidebarType) => void;
    changeLayoutWidth: (layoutWidthType: LayoutWidthType) => void;
    changeLayoutPosition: (layoutPositionType: LayoutPositionType) => void;
    changeTopbarTheme: (topbarThemeType: TopbarThemeType) => void;
    changeLeftsidebarSizeType: (leftsidbarSizeType: LeftsidbarSizeType) => void;
    changeLeftsidebarViewType: (leftSidebarViewType: LeftSidebarViewType) => void;
    changeSidebarImageType: (leftSidebarImageType: LeftSidebarImageType) => void;
    changePreLoader: (preloader: PreloaderType) => void;
    changeBackgroundImageType: (backgroundImageType: BackgroundImageType) => void;
    changeSidebarVisibility: (sidebarVisibilitytype: SidebarVisibilityType) => void;
}

const changeHTMLAttribute = (attribute: any, value: any) => {
    if (document.documentElement) {
        document.documentElement.setAttribute(attribute, value);
    }
};


// Zustand mağazası
const useLayoutStore = create<LayoutState>((set) => ({
    layoutType: layoutTypes.VERTICAL,
    layoutModeType: layoutModeTypes.DARKMODE,
    leftSidebarType: leftSidebarTypes.DARK,
    layoutWidthType: layoutWidthTypes.FLUID,
    layoutPositionType: layoutPositionTypes.FIXED,
    topbarThemeType: topbarThemeTypes.LIGHT,
    leftsidbarSizeType: leftsidbarSizeTypes.DEFAULT,
    leftSidebarViewType: leftSidebarViewTypes.DEFAULT,
    leftSidebarImageType: leftSidebarImageTypes.NONE,
    preloader: preloaderTypes.DISABLE,
    backgroundImageType: backgroundImageTypes.IMG3,
    sidebarVisibilitytype: sidebarVisibilitytypes.SHOW,

    changeLayout: (layoutType: LayoutType) => {
        try {
            console.log("layoutTypee ==>",layoutType)
            if (layoutType === "twocolumn") {
                document.documentElement.removeAttribute("data-layout-width");
            } else if (layoutType === "horizontal") {
                document.documentElement.removeAttribute("data-sidebar-size");
            } else if (layoutType === "semibox") {
                changeHTMLAttribute("data-layout-width", "fluid");
                changeHTMLAttribute("data-layout-style", "default");
            }
            changeHTMLAttribute("data-layout", layoutType);
            set(() => ({ layoutType }))
        } catch (error) { }
    },
    changeLayoutMode: (layoutModeType: LayoutModeType) => {
        changeHTMLAttribute("data-bs-theme", layoutModeType);
        set(() => ({ layoutModeType }))
    },

    changeSidebarTheme: (leftSidebarType: LeftSidebarType) => {
        console.log("leftSidebar ==>",leftSidebarType)
        changeHTMLAttribute("data-sidebar", leftSidebarType)
        set(() => ({ leftSidebarType }))
    },

    changeLayoutWidth: (layoutWidthType: LayoutWidthType) => {
        try {
            if (layoutWidthType === 'lg') {
                changeHTMLAttribute("data-layout-width", "fluid");
            } else {
                changeHTMLAttribute("data-layout-width", "boxed");
            }
            set(() => ({ layoutWidthType }))
        } catch (error) {
            return error;
        }
    },

    changeLayoutPosition: (layoutPositionType: LayoutPositionType) => {
        
        changeHTMLAttribute("data-layout-position", layoutPositionType);
        set(() => ({ layoutPositionType }))
    },

    changeTopbarTheme: (topbarThemeType: TopbarThemeType) => {
        changeHTMLAttribute("data-topbar", topbarThemeType);
        set(() => ({ topbarThemeType }))
    },

    changeLeftsidebarSizeType: (leftsidbarSizeType: LeftsidbarSizeType) => {
        try {
            
            switch (leftsidbarSizeType) {

                case 'lg':
                    changeHTMLAttribute("data-sidebar-size", "lg");
                    break;
                case 'md':
                    changeHTMLAttribute("data-sidebar-size", "md");
                    break;
                case "sm":
                    changeHTMLAttribute("data-sidebar-size", "sm");
                    break;
                case "sm-hover":
                    changeHTMLAttribute("data-sidebar-size", "sm-hover");
                    break;
                default:
                    changeHTMLAttribute("data-sidebar-size", "lg");
            }
            set(() => ({ leftsidbarSizeType }))

        } catch (error) {
            // console.log(error);
        }

    },

    changeLeftsidebarViewType: (leftSidebarViewType: LeftSidebarViewType) => {
        changeHTMLAttribute("data-layout-style", leftSidebarViewType)
        set(() => ({ leftSidebarViewType }))
    },


    changeSidebarImageType: (leftSidebarImageType: LeftSidebarImageType) => {
        changeHTMLAttribute("data-sidebar-image", leftSidebarImageType)
        set(() => ({ leftSidebarImageType }))
    },
    changePreLoader: (preloader: PreloaderType) => {
        changeHTMLAttribute("data-preloader", preloader)
        set(() => ({ preloader }))
    },
    changeBackgroundImageType: (backgroundImageType: BackgroundImageType) => {
        changeHTMLAttribute("data-body-image", backgroundImageType)
        set(() => ({ backgroundImageType }))
    },

    changeSidebarVisibility: (sidebarVisibilitytype: SidebarVisibilityType) => {
        changeHTMLAttribute("data-sidebar-visibility", sidebarVisibilitytype)
        set(() => ({ sidebarVisibilitytype }))
    }

}));

export default useLayoutStore;
