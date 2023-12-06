import React, { useState } from "react";
import {SvgIcon} from "@mui/material";

function CalendarIcon(){
    return (
        <SvgIcon>
            <svg width="20" height="20" 
                viewBox="0 0 20 20" 
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                    fill-rule="evenodd" 
                    clip-rule="evenodd" 
                    d="M6 0C6.55228 0 7 0.447715 7 1V2H13V1C13 0.447715 13.4477 0 14 0C14.5523 0 15 0.447715 15 1V2H17C18.6569 2 20 3.34315 20 5V17C20 18.6569 18.6569 20 17 20H3C1.34315 20 0 18.6569 0 17V5C0 3.34315 1.34315 2 3 2H5V1C5 0.447715 5.44772 0 6 0ZM5 4H3C2.44772 4 2 4.44772 2 5V17C2 17.5523 2.44772 18 3 18H17C17.5523 18 18 17.5523 18 17V5C18 4.44772 17.5523 4 17 4H15V5C15 5.55228 14.5523 6 14 6C13.4477 6 13 5.55228 13 5V4H7V5C7 5.55228 6.55228 6 6 6C5.44772 6 5 5.55228 5 5V4ZM4 9C4 8.44772 4.44772 8 5 8H15C15.5523 8 16 8.44772 16 9C16 9.55229 15.5523 10 15 10H5C4.44772 10 4 9.55229 4 9Z" fill="white"/>
            </svg>
        </SvgIcon>
    );
}

export default CalendarIcon;