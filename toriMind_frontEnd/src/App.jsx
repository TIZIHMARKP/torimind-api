import { useEffect, useRef, useState } from 'react'
import './App.css'
import ChatInput from './components/ChatInput'
// import ChatResponse from './components/ChatResponse'
import { fetchChatResponse } from './services/api'
import ChatMessage from './components/ChatMessage'

function App() {
  // const [response, setResponse] = useState(0)
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null)

  // Auto scrolling to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth'});
  }, [messages, loading])

  const handleQuestionSubmit = async (question) => {
    // adding the users question immedialty
    const userMessage = { role: 'user', content: question}
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    // setResponse(null);

    try {
      const apiResponse = await fetchChatResponse(question);
      const answer = apiResponse?.choices?.[0]?.message?.content || 'No response' 
      const usage = apiResponse?.usage;

      const assistantMessage = { role: 'assistant', content: answer, usage };
      setMessages((prev) => [...prev, assistantMessage]);

      // setResponse(apiResponse)
    } catch (error) {
      alert("Failed to get Response")
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again' },
      ]);
    }finally{
      setLoading(false)
    }

  }

  // if(loading){
  //   return (<h1>Loading...</h1>)
  // }

  return (
    <>
      <div className="App">
        <header className="bg-primary text-white text-center py-4">
          <h1>ToriMind ChatBot</h1>
        </header>

        <main className='chat-window'>
          {messages.length === 0 && (
            <div className="empty-state">
              <p>Ask ToriMind anything to get started</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} usage={msg.usage} />
          ))}

          {loading && (
            <div className="message-row assistant">
              <div className="bubble assistant-bubble typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />

        </main>


        {/* INPUT */}
        <footer className="input-bar">
          <ChatInput onSubmit={handleQuestionSubmit} disabled={loading}/>
          {/* {loading &&
            <h3>Loading...</h3>
          } */}
        </footer>
        
      </div>
    </>
  )
}

export default App

