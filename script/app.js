const ul = document.querySelector(".chat-list");
const newformChat = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateNameMssg = document.querySelector(".up-msg");
const rooms = document.querySelector(".chat-rooms");

// send a message and save in firebase
newformChat.addEventListener("submit",e =>{

    e.preventDefault();
    const message = newformChat.message.value.trim();
    chatroom.addChat(message).then(()=>{
        newformChat.reset();
    }).catch(err => console.log(err));

});
//update the name
newNameForm.addEventListener("submit",e =>{

     e.preventDefault();
     const newuserName = newNameForm.name.value.trim();
     chatroom.updateName(newuserName);
     newNameForm.reset();
     //send message for update
     updateNameMssg.innerText = `Your Name Was Updated to : ${newuserName}`;
     setTimeout(()=>{
        updateNameMssg.innerText ="";
     },3000);
});

rooms.addEventListener("click", e =>{
    if(e.target.tagName === "BUTTON"){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute("id"));
        chatroom.getChat(data =>{
            chatUI.render(data);
        })
    }
});



const userName = localStorage.username ? localStorage.username :"anon";

const chatUI = new updateUI(ul);
const chatroom = new Chatroom(userName,"Anime");

chatroom.getChat(data =>{
    chatUI.render(data);
});