const socket = io('http://localhost:8000')

//Get DOM elements in a respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container") //message container k andar dalne hai
var audio = new Audio('ting.mp3'); //audio that will play on receiving msgs

//func which will apend event info to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left') {
        audio.play();
    }
}

//whenever user will join
//ask user for his/her name and let the server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

//user joins
//when user joins, receive his name from the server
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

//if server sends a message receive it
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

//if user leave the chat append the info to the container
socket.on('left', name => {
    append(`${data.name} left the chat`, 'right')
})

//if form get submitted send server the message
form.addEventListener('submit', (e)=>{
    e.preventDefault(); //page will not reload after submission of msg
    const message = messageInput.value;
    append(`You: ${message}`, 'right'); // ` -> template literals use: we can use variables in string
    socket.emit('send', message);
    messageInput.value = ''
})
