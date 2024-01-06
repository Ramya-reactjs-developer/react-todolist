import React from 'react'
import "../../assets/scss/components/button.scss"
export const CancelButton = ({onClick}) => {
  return (
    <div>
          <button className="cancel-button" onClick={onClick} >
              Cancel
          </button>
    </div>
  )
}
