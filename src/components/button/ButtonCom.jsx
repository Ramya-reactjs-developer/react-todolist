import React from 'react'
import "../../assets/scss/components/button.scss"

export const ButtonCom = ({label,onClick}) => {
  return (
    <div>
           <button className="update-button" onClick={onClick} >
            {label}
         </button>
          
    </div>
  )
}
