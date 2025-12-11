# Server-Sent Events (SSE)

Understanding Server-Sent Events for one-way real-time communication - EventSource API, server implementation, and when to use SSE vs WebSockets.

---

## Core Concept

**Server-Sent Events (SSE)** enables servers to push data to clients over HTTP. One-way communication (server → client).

**Use Cases:**
- Live notifications
- Real-time updates
- Progress tracking
- Live feeds

---

## EventSource API

### Basic Usage

```javascript
const eventSource = new EventSource('/api/events');

eventSource.onmessage = (event) => {
  console.log('Message:', event.data);
};

eventSource.onerror = (error) => {
  console.error('Error:', error);
};

eventSource.close(); // Close connection
```

---

## React Hook for SSE

```javascript
import { useEffect, useState } from 'react';

function useServerSentEvents(url) {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    eventSource.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      eventSource.close();
    };
  }, [url]);

  return { data, isConnected };
}
```

---

## SSE vs WebSockets

| Aspect | SSE | WebSockets |
|--------|-----|------------|
| **Direction** | Server → Client | Bidirectional |
| **Protocol** | HTTP | WS/WSS |
| **Reconnection** | Automatic | Manual |
| **Use Case** | Notifications, updates | Chat, gaming |

---

## Summary

**SSE:**
- One-way (server → client)
- Automatic reconnection
- Simpler than WebSockets
- HTTP-based

**Key Takeaway:** Use SSE for one-way real-time updates (notifications, feeds). Use WebSockets for bidirectional communication (chat).

