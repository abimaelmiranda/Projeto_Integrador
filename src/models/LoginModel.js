const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model('login', LoginSchema, 'users');

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }


  async login(){
    this.cleanUp()

    this.user = await LoginModel.findOne({username: this.body.username});

    if(!this.user){
        this.errors.push('Usuário não existe');
        return 
    }
    if (this.errors.length > 0) return; 

    if(!bcrypt.compareSync(this.body.password, this.user.password)){
        this.errors.push('Senha incorreta');
        this.user = null;
        return;
    }
    if (this.errors.length > 0) return;  

  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      name: this.body.name,
      lastName: this.body.lastName,
      username: this.body.username,
      email: this.body.email,
      password: this.body.password,
    };
  }

}

module.exports = Login;
