const sendButton = document.querySelector('.sendButton')
const sendGeolocation = document.querySelector('.sendGeolocation')
const chat = document.querySelector('.chat')

const wsUri = "wss://echo.websocket.org/"
let websocket

sendButton.addEventListener('click', () => {
    let input = document.querySelector("input").value
    writeToScreen(input, "right", "left")
    webSocket = new WebSocket(wsUri)
    webSocket.onopen = () => {
        webSocket.send(input)
    }
    webSocket.onmessage = async function (evt) {
        writeToScreen(evt.data, "left", "right")
        await webSocket.close()
    }

})

sendGeolocation.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const {
                coords
            } = position;
            let geolocationString = `<a href="https://www.openstreetmap.org/#map=15/${coords.latitude}/${coords.longitude}" target="_blank">Моя геолокация</a>`
            webSocket = new WebSocket(wsUri)
            writeToScreen(geolocationString, "right", "left")
            webSocket.onopen = async () => {
                webSocket.send(geolocationString)
                await webSocket.close()
            }
        })
    } else {
        alert("Доступ к геолокации закрыт!")
    }
})

function writeToScreen(text, textPos, margin) {
    let pre = document.createElement("div");
    pre.classList.add("chatbox")
    pre.style.wordWrap = "break-word";
    pre.innerHTML = text;
    pre.style.textAlign = textPos
        if (margin === "left") {
        pre.style.marginLeft = "300px"
        pre.style.marginRight = "10px"
    } else {
        pre.style.marginLeft = "10px"
        pre.style.marginRight = "300px"
    }
    chat.appendChild(pre);
}