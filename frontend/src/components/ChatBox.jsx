import { useState, useEffect, useRef } from 'react';
import '../styles/ChatBox.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Función para desplazarse al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Función para enviar mensaje al backend
  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Agregar mensaje del usuario al chat
    const userMessage = { type: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Enviar solicitud al backend
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Error en la comunicación con el servidor');
      }

      // Procesar respuesta
      const data = await response.json();
      
      // Agregar respuesta del asistente al chat
      const botMessage = { type: 'bot', content: data };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Mostrar mensaje de error en el chat
      const errorMessage = { type: 'bot', content: 'Lo siento, ha ocurrido un error al procesar tu solicitud.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para limpiar el texto de etiquetas HTML y markdown
  const cleanTextContent = (text) => {
    // Remover etiquetas HTML como <sub> y <sup>
    const withoutHtmlTags = text.replace(/<[^>]*>/g, '');
    // Remover asteriscos
    return withoutHtmlTags.replace(/\*\*/g, '');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>MathSolver AI</h2>
        <p style={{color:'white'}}>Pregúntame cualquier duda sobre matemáticas</p>
      </div>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h3>¡Bienvenido al Asistente Matemático!</h3>
            <p>MathSolver AI, tu nuevo aliado en el mundo de las matemáticas, utiliza inteligencia artificial para brindarte soluciones precisas y detalladas a tus problemas matemáticos. Con MathSolver AI, podrás:</p>
            <ul>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  setInput('¿Cómo resolver ecuaciones y problemas matemáticos?');
                }}>Resolver ecuaciones y problemas matemáticos</a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  setInput('¿Puedes explicarme conceptos de álgebra, cálculo y geometría?');
                }}>Explicar conceptos de álgebra, cálculo, geometría y más</a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  setInput('¿Me puedes dar un ejemplo paso a paso?');
                }}>Proporcionar ejemplos paso a paso</a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  setInput('¿Puedes explicarme teoremas y fórmulas matemáticas?');
                }}>Responder preguntas sobre teoremas y fórmulas</a>
              </li>
            </ul>
            <p>¿En qué puedo ayudarte hoy?</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              <div className="message-content">
                {msg.type === 'user' ? (
                  <span className="user-icon">👤</span>
                ) : (
                  <span className="bot-icon">🤖</span>
                )}
                <div className="message-text">
                  {cleanTextContent(msg.content)}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message bot">
            <div className="message-content">
              <span className="bot-icon">🤖</span>
              <div className="message-text loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="input-container" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Haz una pregunta de matemáticas..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || input.trim() === ''}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default ChatBox;