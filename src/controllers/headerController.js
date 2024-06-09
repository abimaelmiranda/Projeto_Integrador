exports.contact = (req, res) => {
    res.render('whoWe', { 
        currentPage: 'whoWe' 
    });
}

exports.login = (req, res) => {
    if(!req.session.user){
        res.render('login', {
            currentPage: 'login'
        });
    }else {
        res.render('404', {
            currentPage: '404'
        });
    }
    }
  
exports.sigin = (req, res) => {
    res.render('signin', {
        currentPage: 'sign-in'
    });
}
exports.explorer = (req, res) => {
    res.render('explorer', {
        currentPage: 'explorer'
    } );
}

