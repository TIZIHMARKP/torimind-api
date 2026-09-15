import React from 'react'
import ReactMarkdown from 'react-markdown'

const ChatResponse = ({ response }) => {
    if(!response){
        return null;
    }

    const {choices, usage } = response

    if (!choices || choices.length === 0) {
    return <p>No response received</p>
  }

  return (
    <div className='container my-4'>
      <h3>Response</h3>
      {choices.map((choice, index) => (
        <div className='card mb-3' key={index}>
            <div className="card-body">

                <h5 className="card-title">Answer {index + 1}</h5>
                {/* <p className="card-text" style={{ whiteSpace: 'pre-wrap' }}>
                    {choice.message.content}
                </p> */}
                <div className="card-text">
                    <ReactMarkdown>
                        {choice.message.content}
                    </ReactMarkdown>
                </div>

                {usage && (
                    <>
                    <h4>Usage Metadata</h4>
                    <p>Prompt Tokens: {usage.prompt_tokens}</p>
                    <p>ProResponse Tokens: {usage.completion_tokens}</p>
                    <p>Total Tokens: {usage.total_tokens}</p>
                    </>
                )}
                
            </div>
        </div>
      ) )}

    </div>
  )
}

export default ChatResponse
