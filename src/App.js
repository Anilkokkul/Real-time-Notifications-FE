import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to the server

const App = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for notifications from the server
    socket.on("notification", (data) => {
      setNotifications([...notifications, data]);
    });

    // Clean up the socket connection
    return () => {
      socket.disconnect();
    };
  }, [notifications]);

  const sendNotification = () => {
    socket.emit("sendNotification", { message: "New notification!" });
  };

  return (
    <div>
      <h1>Real-time Notifications</h1>
      <button onClick={sendNotification}>Send Notification</button>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
