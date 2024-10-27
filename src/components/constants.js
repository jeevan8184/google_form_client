import { IoAddCircle, IoEye, IoImage } from "react-icons/io5";
import { IoMdColorPalette } from "react-icons/io";
import { LuUndo2 } from "react-icons/lu";
import { LuRedo2 } from "react-icons/lu";
import { IoMdMore } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { MdInsertLink, MdOutlineFormatItalic, MdOutlineFormatUnderlined, MdTitle } from "react-icons/md";
import { RxSection } from "react-icons/rx";
import { FaBold } from "react-icons/fa";

export const USER="currUser";
export const TOKEN="token";
export const UPDATE="update";

export const Items=[
    // {
    //     icon:<IoEye size={24} />
    // },
    {
        icon:<IoMdColorPalette size={24} />
    },
    // {
    //     icon:<LuUndo2 size={24} />
    // },
    // {
    //     icon:<LuRedo2 size={24} />
    // },
    {
        icon:<IoMdSend size={24} />
    },
    {
        icon:<IoMdMore size={24} />
    },
]

export const Colors=[
    {
        color:"#ffc1c1",
        label:"red"
    },
    {
        color:"#cce4ff",
        label:"blue"
    },
    {
        color:"#c3e6cb",
        label:"green"
    },
    {
        color:"#fff3cd",
        label:"yellow"
    },
    {
        color:"#e1ccff",
        label:"purple"
    },
    {
        color:"#ffccde",
        label:"pink"
    },
    {
        color:"#ffe5b3",
        label:"orange"
    },
    {
        color:"#ccf2f4",
        label:"teal"
    },
    {
        color:"#e0c1a5",
        label:"brown"
    },
    {
        color:"#f5f5f5",
        label:"gray"
    },
]

export const BottomIcons=[
    {
        label:"question",
        icon:<IoAddCircle size={24} />
    },
    {
        label:"image",
        icon:<IoImage size={24} />
    },
    {
        label:"title & desc",
        icon:<MdTitle size={24} />
    },
    {
        label:"section",
        icon:<RxSection size={24} />
    },
]

export const QuestionItems=[
    {
        label:"Bold",
        icon:<FaBold size={18} />
    },
    {
        label:"Underline",
        icon:<MdOutlineFormatUnderlined size={24} />
    },
    {
        label:"Italic",
        icon:<MdOutlineFormatItalic size={24} />
    },
    // {
    //     label:"Link",
    //     icon:<MdInsertLink size={24} />
    // },
]



export const fontFamilies = {
    sans: ["Roboto", "Open Sans", "sans-serif"],
    serif: ["Merriweather", "serif"],
    mono: ["Inconsolata", "monospace"],
    cursive: ['"Dancing Script"', "cursive"],
    display: ['"Playfair Display"', "serif"],
    handwritten: ['"Pacifico"', "cursive"],
    fancy: ['"Great Vibes"', "cursive"],
    body: ["Lato", "sans-serif"],
    heading: ["Montserrat", "sans-serif"],
    slab: ['"Roboto Slab"', "serif"],
};

