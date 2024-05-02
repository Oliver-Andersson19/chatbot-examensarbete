import React from 'react'

function ChatbotItem(props) {
  return (
    <div onClick={() => props.setView(props.chatbot)}
        className='cursor-pointer'
    >
        {props.chatbot.companyName}
    </div>
  )
}

export default ChatbotItem