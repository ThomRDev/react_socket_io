const {
  connectedUser,
  getUsers,
  disconnectedUser,
  saveMessage,
} = require("../controllers/sockets");
const { checkJWT } = require("../helpers/jwt");

// https://github.com/ThomRoman/Node-2022/blob/main/16-chat-typescript/src/sockets/SocketController.ts
class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", async (socket) => {
      console.log(socket.id + " conectado");

      // handshake, es el apreton de manos que se dan el cliente y el servidor la
      // primera ves que se conecto, ahi estan los headers de la request etc
      // revisar el diagrama de como funciona los websockets
      // console.log(socket.handshake);

      // TODO: VALIDAR EL JWT
      // si el token no es valido, desconectarlo
      const [isJwtValid, uid] = checkJWT(socket.handshake.query["x-token"]);
      if (!isJwtValid) {
        console.log("socket no identificado");
        return socket.disconnect();
      }

      // TODO: SABER QUE USUARIO ESTA ACTIVO, MEDIANTE EL UID QUE ESTA EN EL TOKEN
      await connectedUser(uid);

      // TODO: SOCKET JOIN
      socket.join(uid);

      // TODO: EMITIR TODOS LOS USUARIOS CONECTADOS
      this.io.emit("list-users", await getUsers());

      // TODO: ESCUCHAR CUANDO EL CLIENTE MANDA UN MENSAJE
      // MENSAJE PERSONAL
      socket.on("private-message", async (payload) => {
        const message = await saveMessage(payload);
        this.io.to(payload.to).emit("private-message", message);
        this.io.to(payload.from).emit("private-message", message);
      });

      // TODO: DISCONNECT
      // MARCAR EN LA DB QUE SE DESCONECTO
      // TODO: EMITIR TODOS LOS USUARIOS CONECTADOS
      // socket.on("send-message", (data) => {
      //   this.io.emit("send-message", data);
      // });
      socket.on("disconnect", async () => {
        console.log(socket.id + " desconectado");
        await disconnectedUser(uid);
        this.io.emit("list-user", await getUsers());
      });
    });
  }
}

module.exports = Sockets;
