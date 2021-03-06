import React from 'react'
import "./Modal.css"
const Modal = ({ children, titleTxt, setOpen }) => {
  return (
    <div className='modal'>
      <div className="container">
        <h3>{titleTxt}</h3>
        { children }
        <span className='close'
        onClick={() => setOpen(false)}>X</span>
      </div>
    </div>
  )
}

export default Modal