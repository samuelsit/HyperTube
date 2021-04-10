const { Router } = require('express');

const InfoService = require('../../Services/Info').default;

const router = Router();

exports.default = app => {
    app.use('/info', router);

    router.get('/start', async (req, res, next) => {
        try {
            const result = await InfoService.start();
            return res.status(200).send(result);
        } catch(e) {
            console.log(e);
            return next(e);
        }
    });
}