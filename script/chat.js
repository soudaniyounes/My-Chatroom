class Chatroom{
    constructor(username,room){
        this.user = username;
        this.room = room ;
        this.chats = DataBase.collection("chats");
        this.unsub;
    }
    async addChat(msg){
        const now = new Date();
        const chat = {
           message : msg,
           user : this.user,
           room : this.room,
           created_at : firebase.firestore.Timestamp.fromDate(now)
        }
       const response = await this.chats.add(chat) ;
       return response;
    }
    getChat(callback){
      this.unsub =  this.chats
        .where("room","==",this.room)
        .orderBy("created_at")
        .onSnapshot((snap)=>{
            snap.docChanges().forEach(change =>{
                 if(change.type === "added"){
                     callback(change.doc.data());
                 }
            });
        });
    }
    updateName(new_uesrname){
        this.user = new_uesrname;
        localStorage.setItem("username",new_uesrname);
    }
    updateRoom(new_room){
        this.room = new_room;
        console.log("update room");
        if(this.unsub){
            this.unsub();
        }

    }
}


// chatroom.addChat("hello there::!!!").then(()=>console.log("chat added"))
// .catch(err=>console.log(`we got : ${err}`));


// setTimeout(() =>{
//     chatroom.updateName("jalil") ;
//     chatroom.updateRoom("Anime");
//     chatroom.getChat(data =>{
//         console.log(data);       
//     });
//     chatroom.addChat("ahllaa")
// },3000)
