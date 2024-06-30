import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import express from 'express';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import session from 'express-session';
import helmet from 'helmet';
import csrf from 'csurf';
import { middlewareGlobal, checkCSRF, csrfMiddleware, notFound } from './src/middlewares/middlewares';

import homeRoutes from './src/routes/home.js';
import loginRoutes from './src/routes/login.js';
import signinRoutes from './src/routes/signin.js';
import signinRoutes from './src/routes/signin.js';
import explorerRoutes from './src/routes/explorer.js';
import kitchenRoutes from './src/routes/kitchen.js';
import recipeRoutes from './src/routes/recipe.js';
import searchRoutes from './src/routes/search.js';

class App {
    constructor() {
        this.app = express(); 
        this.setViews();
        this.session();
        this.middlewares();
        this.routes();
    }

    session(){
        this.app.use(session({
            secret: process.env.SESSION_SECRET,
            store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true
            }
        }));
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(express.static(resolve(__dirname, 'public')));
        this.app.use(flash());
        this.app.use(csrf());
        this.app.use(middlewareGlobal);
        this.app.use(checkCSRF);
        this.app.use(csrfMiddleware);
    }

    setViews() {
        this.app.set('views', resolve(__dirname, 'src', 'views'));
        this.app.set('view engine', 'ejs');
    }

    routes(){
        this.app.use('/', homeRoutes);
        this.app.use('/login', loginRoutes);
        this.app.use('/logout', loginRoutes);
        this.app.use('/signin', signinRoutes);
        this.app.use('/explorer', explorerRoutes);
        this.app.use('/kitchen', kitchenRoutes);
        this.app.use('/search', searchRoutes);
        this.app.use('/recipes', recipeRoutes);
        this.app.use(notFound);
    }


}

export default new App().app;