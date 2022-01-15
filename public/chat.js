const socket = io.connect('http://localhost:3000/')
const sender = document.getElementById('sender');
const message = document.getElementById('message');
const submitButton = document.getElementById('submitButton');
const output = document.getElementsByClassName('output')[0];
const feedback = document.getElementsByClassName('feedback')[0];

submitButton.addEventListener('click', () => {
     socket.emit('chat', {
         message: message.value,
         sender: sender.value,
     })
})

socket.on('chat', data => {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.sender} : </strong>${data.message}</p>`;
})

message.addEventListener('keypress', () => {
    socket.emit('typing', sender.value)
})

socket.on('typing', (data) => {
    feedback.innerHTML = `<p>${data} yazıyor...</p>`
})
