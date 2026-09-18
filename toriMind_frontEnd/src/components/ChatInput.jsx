// import React, { useState } from 'react'

// const ChatInput = ({ onSubmit, disabled }) => {

//     const [question, setQuestion] = useState("")

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if(!question.trim() || disabled) return
//             onSubmit(question);
//             setQuestion("");

//     }

//     const handleKeyDown = (e) => {
//       if(e.key === 'Enter' && !e.shiftKey){
//         e.preventDefault()
//         handleSubmit
//       }
//     }


//   return (
//     <div className='container my-4'>
//       <form className='chat-input-form' onSubmit={handleSubmit} >
//         <label htmlFor="question">Ask a Question</label>
        
//         <input type="text" 
//             className='chat-input'
//             id='question'
//             placeholder='Chat with ToriMind'
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             onKeyDown={handleKeyDown}
//             disabled={disabled}
//             autoFocus
//         />
//         <button type='submit' className="send-button" disabled={disabled || !question.trim()}>
//             Send
//         </button>
//       </form>

//     </div>
//   )
// }

// export default ChatInput



import React, { useState } from 'react';

const ChatInput = ({ onSubmit, disabled }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || disabled) return;
    onSubmit(question);
    setQuestion('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chat-input"
        placeholder="Message ToriMind..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoFocus
      />
      <button
        type="submit"
        className="send-button"
        disabled={disabled || !question.trim()}
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;