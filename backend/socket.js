const { Server } = require("socket.io");
const userModel = require('./models/userM');
const captainModel = require('./models/captainM');


let io = null;

/**
 * Initializes the Socket.IO server.
 * @param {http.Server} server - The HTTP server instance.
 */
function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Handle user connection
    socket.on('join',async (data)=>{
      const {userId,userType} = data;
      if(userType === 'user') {
        const user = await userModel.findById(userId);
        if (user) {
          user.socketId = socket.id;
          await user.save();
          console.log(`User ${userId} connected with socket ID: ${socket.id}`);
        }
      } else if (userType === 'captain') {
        const captain = await captainModel.findById(userId);
        if (captain) {
          captain.socketId = socket.id;
          await captain.save();
          console.log(`Captain ${userId} connected with socket ID: ${socket.id}`);
        }
      }
    })

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}

/**
 * Sends a message to a specific socket ID.
 * @param {string} socketId - The target socket ID.
 * @param {string} event - The event name.
 * @param {any} message - The message payload.
 */
function sendMessageToSocketId(socketId, event, message) {
  if (io) {
    io.to(socketId).emit(event, message);
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
