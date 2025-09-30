"use client";

import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function WebSocketDemo() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  
  const connect = () => {
    setIsConnected(true);
    setMessages(prev => [...prev, 'Connected to WebSocket server']);
    
    const mockMessages = [
      'Welcome to the WebSocket demo!',
      'This is a simulated real-time message',
      'WebSockets allow for bidirectional communication',
      'Messages are received instantly without polling'
    ];
    
    mockMessages.forEach((message, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, `Server: ${message}`]);
      }, (index + 1) * 1000);
    });
  };
  
  const disconnect = () => {
    setIsConnected(false);
    setMessages(prev => [...prev, 'Disconnected from WebSocket server']);
    if (wsRef.current) {
      wsRef.current.close();
    }
  };
  
  const sendMessage = () => {
    if (inputMessage.trim() && isConnected) {
      setMessages(prev => [...prev, `You: ${inputMessage}`]);
      setInputMessage('');
      
      setTimeout(() => {
        setMessages(prev => [...prev, `Server: Echo: ${inputMessage}`]);
      }, 500);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  useEffect(() => {
    const ws = wsRef.current;
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {!isConnected ? (
          <Button 
            onClick={connect} 
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-xs sm:text-sm h-8 sm:h-9"
          >
            Connect
          </Button>
        ) : (
          <Button 
            variant="destructive" 
            onClick={disconnect}
            className="text-xs sm:text-sm h-8 sm:h-9"
          >
            Disconnect
          </Button>
        )}
      </div>
      
      <div className="border rounded-lg p-3 sm:p-4 bg-gray-50 dark:bg-gray-900">
        <div className="h-32 sm:h-40 overflow-y-auto space-y-2">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`text-xs sm:text-sm p-2 rounded ${
                msg.startsWith('You:') 
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 ml-2 sm:ml-4' 
                  : msg.startsWith('Server:') 
                    ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 mr-2 sm:mr-4' 
                    : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-center'
              }`}
            >
              {msg}
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-gray-500 text-xs sm:text-sm text-center py-6 sm:py-8">
              Connect to see WebSocket messages...
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          disabled={!isConnected}
          className="text-sm h-8 sm:h-9"
        />
        <Button 
          onClick={sendMessage} 
          disabled={!isConnected || !inputMessage.trim()}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4"
        >
          Send
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground">
        <p>
          Note: This is a simulated WebSocket demo. In a real application, 
          this would connect to an actual WebSocket server.
        </p>
      </div>
    </div>
  );
}

export { WebSocketDemo };