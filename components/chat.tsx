import React, { useState, useEffect, useRef } from 'react';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Scroll to the latest message when a new message is added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (input.trim()) {
            const newMessage: Message = { sender: 'user', text: input };
            setMessages([...messages, newMessage]);
            setInput('');

            // Simulate bot response
            setTimeout(() => {
                const botMessage: Message = { sender: 'bot', text: 'This is a bot response.' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }, 1000);
        }
    };

    return (
        <div style={{
            maxWidth: '600px',
            margin: '20px auto',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '16px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
            <div style={{
                height: '400px',
                overflowY: 'scroll',
                padding: '12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                backgroundColor: '#ffffff'
            }}>
                {messages.map((message, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                        margin: '10px 0',
                    }}>
                        <div style={{
                            maxWidth: '75%',
                            padding: '10px',
                            borderRadius: '8px',
                            color: '#ffffff',
                            backgroundColor: message.sender === 'user' ? '#007bff' : '#6c757d',
                            textAlign: message.sender === 'user' ? 'right' : 'left',
                        }}>
                            {message.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div style={{ display: 'flex', marginTop: '16px' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                        fontSize: '16px',
                        outline: 'none',
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                    onClick={handleSend}
                    style={{
                        marginLeft: '10px',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: '#ffffff',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
