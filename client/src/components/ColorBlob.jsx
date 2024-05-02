import React from 'react'

function ColorBlob(props) {
  return (
    <div
        className='inline-block rounded-full p-5 cursor-pointer'
        style={{backgroundColor: props.color}}
        onClick={() => props.changeColor(props.name, props.color)}
    >

    </div>
  )
}

export default ColorBlob