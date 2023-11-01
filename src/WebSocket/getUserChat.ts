// const getUserChat = (id: number) => {
//     // Replace 'ws://localhost:your_port' with the actual WebSocket server URL
//     const socket = new WebSocket('ws://localhost:5000');
  
//     useEffect(() => {
//       // Handle incoming messages from the WebSocket server
//       const handleMessage = (event: MessageEvent) => {
//         try {
//           const data: WebSocketMessage = JSON.parse(event.data);
  
//           // Check if the received message is of type 'chat'
          
//             // Update your state or UI with the received chat data
//             setChat(data.data);
//             console.log(data)
          
//         } catch (error) {
//           console.error('Error parsing WebSocket message:', error);
//         }
//       };
  
//       // Add the 'message' event listener
//       socket.addEventListener('message', handleMessage);
  
//       // Specify the cleanup function to close the WebSocket connection when the component unmounts
//       return () => {
//         socket.removeEventListener('message', handleMessage);
//         socket.close();
//       };
//     }, [setChat]); // Re-run the effect when 'setChat' changes
  
//     // When the component mounts or when 'id' or 'user' changes, send a request to the server to get the chat
//     useEffect(() => {
//       if (user) {
//         // Send a message to the server to get the chat for the specified 'id' and 'user.id'
//         socket.send(JSON.stringify({ type: 'getUserChat', data: { id, userId: user.id } }));
//       }
//     }, [id, user]); // Re-run the effect when 'id' or 'user' changes
  
//     return null; // Return whatever JSX you need, or null if not applicable
//   };
