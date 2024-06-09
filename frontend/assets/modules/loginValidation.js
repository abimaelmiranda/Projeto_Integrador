import axios from "axios";

export default class LoginValidation {
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

    init(){
        this.events();
    }

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })
    }

    async validate(e){

        const username = document.querySelector('.user-input-field').value;
        const password = document.querySelector('.passwd-input-field').value;
        const csrf = document.querySelector('input[name=_csrf]').value;
        
        // let error = false;

       await axios.post('/login/submit', {username, password, _csrf: csrf})
        .then(response => {
            const userId = response.data.userId;
            window.location.href = `/kitchen/${userId}`
        }).catch(e =>{
            console.log(e)
        });

   

    }
}


