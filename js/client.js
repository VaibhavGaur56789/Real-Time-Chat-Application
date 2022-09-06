const socket = io('http://localhost:8000')

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container") //message container k andar dalne hai

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add('position');
    messageContainer.append(messageElement);
}

//whenever user will join
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

//user joins
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})