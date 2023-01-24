// const socket = io();
const socket = io("http://localhost:3000");
const message = document.getElementById("message");
const form = document.getElementById("form");
const messages = document.getElementById("messages");

socket.on("connect", () => {
  console.log("conectado");
});

socket.on("message", (data) => {
  console.log(data);
});
socket.on("send-message", (data) => {
  messages.innerHTML += `<li>${data.text}</li>`;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("send-message", {
    text: message.value,
  });
});
