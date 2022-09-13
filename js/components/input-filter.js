import Alert from "./alert.js";

export default class Filter {
    constructor(){
        this.word = document.getElementById('filter-input');
        this.btn = document.getElementById('filterBtn');
        this.alert = new Alert();
       
    }

    onClick(callback){
        this.btn.onclick = () => {
            if( this.word.value === '' ){
               //this.alert.show('Word filter is required');
               callback(this.word.value);
            }else{
                this.alert.hide();
                callback(this.word.value);
            }
        }
        
    }
}