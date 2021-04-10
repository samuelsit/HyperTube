const { Router } = require('express');
const infos = require('./Routes/infos.js').default;
const auth = require('./Routes/auth').default;
const profile = require('./Routes/profile').default;
const movies = require('./Routes/movies').default;

exports.default = () => {
    const app = Router();

    infos(app);
    auth(app);
    profile(app);
    movies(app);

    return app;
};