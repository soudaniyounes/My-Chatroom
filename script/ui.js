
class updateUI {
    constructor(list){
        this.list = list;
    }
    clear(){
        this.list.innerHTML =""; 
    }
    render(data){
        const whene = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix : true}
        )
        const html =`
        <li class="list-group-item">
             <span class="username" >${data.user}</span>
             <span class="mssg" >${data.message}</span>
             <div class="time" >${whene}</div>
        </li>
        `;
        this.list.innerHTML += html; 


        const count = Math.round(1000*60*60*24);
        setTimeout(()=>{
          this.list.innerHTML = ""; 
        },count);

    }
}