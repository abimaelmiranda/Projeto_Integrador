const User = require('../models/UserModel');

class SignInController {

    index(req, res) {
        res.render('signin', { currentPage: 'sign-in' })
    }

    async store(req, res) {
        try{
            const signin = new User(req.body);
            await signin.register();
        
            if(signin.errors.length > 0){
                req.flash('errors', signin.errors);
                req.session.save(() => { 
                    return res.redirect('/signin')
                });
                return
            }
    
            req.flash('success', 'Usuário criado com sucesso');
            req.session.save(() => { 
                return res.redirect('/signin')
            });
        }catch(err){
            console.log(err)
            res.render('404', { currentPage: '404'}) 
        }
    }
}

export default new SignInController()