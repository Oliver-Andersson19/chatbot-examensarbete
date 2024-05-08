import React from 'react'

function ChatbotItem(props) {
  return (
    <div onClick={() => props.setView(props.chatbot)}
        className='cursor-pointer border w-1/2 mb-4 rounded-sm shadow-lg p-2
        flex items-center gap-4'
    >
      <button className='grid place-items-center bg-primary rounded-full p-4'>
        <span className="text-white material-symbols-outlined">chat_bubble</span>
      </button>
      <div className="">
        <h3 className='self-baseline'>{props.chatbot.companyName}</h3>
        <p>DATE</p>
      </div>
    </div>
  )
}

export default ChatbotItem