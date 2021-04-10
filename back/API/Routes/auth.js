const { Router } = require('express');
const UserService = require('../../Services/User').default;
const OauthService = require('../../Services/Oauth').default;
const router = Router();

exports.default = app => {
    app.use('/auth', router);

    router.post('/register', async (req, res, next) => {
        try{
            const { user, token } = await UserService.register(req.body);
            return res.json({ user, token }).status(200);
        } catch(e) {
            console.log(e.message);
            e.status = 400; //Bad Request
            return next(e);
        }
    });

    router.post('/login', async (req, res, next) => {
        try{
            const { user, token } = await UserService.login(req.body);
            return res.json({ user, token }).status(200);
        } catch(e) {
            console.error(e);
            e.status = 400; //Bad Request
            return next(e);
        }
    });

    router.post('/verifyEmail/:verifToken', async (req, res, next) => {
      try{
        const result = await UserService.verifyEmail(req.params.verifToken);
        return res.status(200).send({ message: result });
      } catch(e){
        console.error(e);
        e.status = 400; //Bad Request
        return next(e);
      }
    });

    router.post('/forgotPassword', async (req, res, next) => {
      try{
        const result = await UserService.forgotPassword(req.body.email);
        return res.status(200).send({ message: result});
      } catch(e){
        console.error(e);
        e.status = 400; //Bad Request
        return next(e);
      }
    });

    router.put('/newPassword/:verifToken', async (req, res, next) => {
      try{
        const result = await UserService.newPassword(req);
        return res.status(200).send({ message: result});
      } catch(e) {
        console.error(e);
        e.status = 400; //Bad Request
        return next(e);
      }
    });

    router.post('/googleoauth', async (req, res, next) => {
      try{
        const { user, token } = await OauthService.googleOauth(req.body);
        return res.json({ user, token }).status(200);
      } catch(e) {
        console.error(e);
        e.status = 400; //Bad Request
        return next(e);
      }
    });

    router.post('/ftoauth', async (req, res, next) => {
      try{
        const { user, token } = await OauthService.ftOauth(req.body, next);
        return res.json({ user, token }).status(200);
      } catch(e) {
        console.error(e);
        e.status = 400; //Bad Request
        return next(e);
      }
    });
}