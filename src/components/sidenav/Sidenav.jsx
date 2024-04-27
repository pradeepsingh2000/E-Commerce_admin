import React from 'react'
import {navData} from '../navbar/navbar'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import './sidenav.css'
export default function Sidenav() {
  return (
    <div>
         <button className="menuBtn">
        <KeyboardDoubleArrowLeftIcon />
    </button>
    {navData.map(item =>{
        return <div key={item.id} className="sideitem">
 {item.icon}
 <span className="linkText">{item.text}</span>
 </div>
        })}
    </div>
  )
}
