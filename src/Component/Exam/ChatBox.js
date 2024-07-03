import React from 'react';
import { useState, useEffect } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const API_KEY = "sk-proj-zGVrqu0fafn2RRcsM6d7T3BlbkFJ8451AOyne89bXUD92KGr";

const ChatBox = ({ width , height}) => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Chat Support u ! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: "ChatGPT",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { role: "system", content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  return (
    <div className="App">
      <div style={{ position:"relative", height: height, width: width,borderRadius: 5  , marginLeft : width == 1300 ? 270 : 0 , marginTop : width == 1300 ? 50 : 0}}>
        <MainContainer>
          <ChatContainer>
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message 
                  key={i} 
                  model={{
                    message: message.message,
                    sentTime: message.sentTime,
                    sender: message.sender,
                    direction: message.sender === "ChatGPT" ? "incoming" : "outgoing"
                  }} 
                />
              ))}
            </MessageList>
            <MessageInput placeholder="Send a Message" onSend={handleSendRequest} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default ChatBox;
