const socket = io()

//get all of our elements
const chat = document.querySelector('#chat')
// const form = document.querySelector('form')
const form = document.getElementsById('chat-form')
const name = form.name
const message = form.message
const send = form.send

form.addEventListener('submit', e => {
    e.preventDefault()

    //disable while the message is being sent.
    send.classList.remove('bg-purple-700')
    send.classList.add('cursor-not-allowed', 'bg-purple-500')

    socket.emit('sendMessage', {
        name: name.value,
        message: message.value
    })

    message.value = ''
    message.focus()
})




//Just creating a new element for our message and appending it to the chat and re-enabling the send button.
socket.on('showMessage', message => {
    const newMessage = document.createElement('div')
    const user = document.createElement('h3')
    const text = document.createElement('p')

    newMessage.classList.add('flex', 'items-center', 'mt-5')
    user.classList.add('bg-blue-600', 'p-3', 'mr-10', 'w-40', 'rounded', 'self-start')
    user.innerHTML = message.name
    text.classList.add('w-4/5')
    text.innerHTML = message.message

    newMessage.appendChild(user)
    newMessage.appendChild(text)
    chat.appendChild(newMessage)

    //Undisable button after message is received
    send.classList.remove('cursor-not-allowed', 'bg-purple-500')
    send.classList.add('bg-purple-700')
})