const { Router } = require('express');
const UserService = require('../../Services/User').default;
const router = Router();

exports.default = app => {
  app.use('/profile', router);

  router.put('/picture', async (req, res, next) => {
    try{
      const result = await UserService.uploadPicture(req, next);
      return res.status(200).send(result);
    } catch(e) {
      console.error(e);
      e.status = e.status || 400;
      return next(e);
    }
  });

  router.put('/email', async (req, res, next) => {
    try{
      const result = await UserService.updateEmail(req);
      return res.status(200).send({response: result});
    } catch(e) {
      console.error(e);
      e.status = e.status || 400;
      return next(e);
    }
  })

  router.put('/firstname', async (req, res, next) => {
    try{
      const result = await UserService.updateFirstname(req);
      return res.status(200).send({response: result});
    } catch(e) {
      console.error(e);
      e.status = e.status || 400;
      return next(e);
    }
  })

  router.put('/lastname', async (req, res, next) => {
    try{
      const result = await UserService.updateLastname(req);
      return res.status(200).send({response: result});
    } catch(e) {
      console.error(e);
      e.status = e.status || 400;
      return next(e);
    }
  })

  router.put('/password', async (req, res, next) => {
    try{
      const result = await UserService.updatePassword(req);
      return res.status(200).send({response: result});
    } catch(e) {
      console.error(e);
      e.status = e.status || 400;
      return next(e);
    }
  })

  router.get('/:pseudo', async (req, res, next) => {
    try {
      const result = await UserService.getUserProfile(req);
      return res.status(200).send({response: result});
    } catch(e) {
      console.error(e);
      e.status = e.status || 400;
      return next(e);
    }
  })

  router.get('/', async (req, res, next) => {
    try {
      const result = await UserService.getAllProfile(req);
      return res.status(200).send({response: result});
    } catch(e) {
      console.error(e);
      e.status = 400;
      return next(e);
    }
  })
}