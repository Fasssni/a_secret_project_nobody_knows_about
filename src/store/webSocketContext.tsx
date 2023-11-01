// // WebSocketContext.tsx
// import React, { createContext, useContext, useEffect } from 'react';

// interface WebSocketContextProps {
//   socket: WebSocket | null;
// }

// const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

// export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const socket = new WebSocket('ws://localhost:5000'); // Adjust the WebSocket URL accordingly

//   useEffect(() => {
//     return () => {
//       socket.close();
//     };
//   }, [socket]);

//   return <WebSocketContext.Provider value={{ socket }}>{children}</WebSocketContext.Provider>;
// };

// export const useWebSocket = () => {
//   const context = useContext(WebSocketContext);
//   if (!context) {
//     throw new Error('useWebSocket must be used within a WebSocketProvider');
//   }
//   return context;
// };
