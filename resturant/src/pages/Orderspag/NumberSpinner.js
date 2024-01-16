import React from 'react';

import './NumberSpinner.css'
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";


export default function NumberSpinner () {
    
        return (
            <> 
            <div className="numberSpinnerBox">
            <span>5</span>
            <div className="btn_wrapper">
                <button className="up" > <FaAngleUp /> </button>
                <button className="down" > <FaAngleDown /> </button>
            </div>
        </div>
            </>
           
        )
    }




