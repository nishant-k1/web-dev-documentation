# WebSockets

Understanding WebSockets for real-time bidirectional communication - WebSocket API, connection management, message handling, and React integration.

---

## Core Concept

**WebSocket** provides full-duplex communication over a single TCP connection, enabling real-time bidirectional data exchange.

**Use Cases:**
- Real-time chat
- Live notifications
- Collaborative editing
- Live data feeds
- Gaming

---

## WebSocket API

### Basic Connection

```javascript
const ws = new WebSocket('wss://api.example.com/ws');

ws.onopen = () => {
  console.log('Connected');
  ws.send('Hello Server');
};

ws.onmessage = (event) => {
  console.log('Message:', event.data);
};

ws.onerror = (error) => {
  console.error('Error:', error);
};

ws.onclose = () => {
  console.log('Disconnected');
};
```

---

## React Hook for WebSocket

```javascript
import { useEffect, useRef, useState } from 'react';

function useWebSocket(url) {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (ws.current && isConnected) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return { messages, isConnected, sendMessage };
}

// Usage
function Chat() {
  const { messages, isConnected, sendMessage } = useWebSocket('wss://api.example.com/chat');

  return (
    <div>
      <div>Status: {isConnected ? 'Connected' : 'Disconnected'}</div>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>{msg.text}</div>
        ))}
      </div>
      <button onClick={() => sendMessage({ text: 'Hello' })}>
        Send
      </button>
    </div>
  );
}
```

---

## Reconnection Strategy

```javascript
function useWebSocketWithReconnect(url) {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttempts = useRef(0);

  const connect = () => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setIsConnected(true);
      reconnectAttempts.current = 0;
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      
      // Exponential backoff
      const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
      reconnectAttempts.current++;
      
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, delay);
    };
  };

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimeoutRef.current);
      ws.current?.close();
    };
  }, [url]);

  return { isConnected };
}
```

---

## Related Topics

- [Server-Sent Events (SSE)](./5.%20Server-Sent%20Events%20(SSE).md) - One-way real-time
- [Long Polling](./6.%20Long%20Polling.md) - Fallback technique

---

## Summary

**WebSockets:**
- Full-duplex communication
- Real-time bidirectional
- Persistent connection
- Low latency

**Key Takeaway:** WebSockets enable real-time bidirectional communication. Use for chat, live updates, and collaborative features. Implement reconnection strategy for production.

