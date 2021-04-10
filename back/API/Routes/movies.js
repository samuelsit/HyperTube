const { Router } = require('express');
const MovieService = require('../../Services/Movie').default;

const router = Router();

exports.default = app => {
  app.use('/film', router);

  //token updated !
  router.get('/like/:movie_src/:movie_id', async (req, res, next) => {
    try{
      const result = await MovieService.getLike(req);
      return res.status(200).send(result);
    } catch(err) {
      console.log(err);
      err.status = err.status || 400;
      return next(err);
    }
  });

  router.post('/like', async (req, res, next) => {
    try{
      const result = await MovieService.like(req);
      return res.status(200).send(result);
    } catch(err) {
      console.log(err);
      err.status = err.status || 400;
      return next(err);
    }
  });

  router.delete('/dislike', async (req, res, next) => {
    try{
      const result = await MovieService.unLike(req);
      return res.status(200).send(result);
    } catch(err) {
      console.log(err);
      err.status = err.status || 400;
      return next(err);
    }
  });

  router.post('/comment', async (req, res, next) => {
    try{
      const result = await MovieService.comment(req);
      return res.status(200).send(result);
    } catch(err) {
      console.log(err);
      err.status = err.status || 400;
      return next(err);
    }
  });

  router.delete('/comment', async (req, res, next) => {
    try{
      const result = await MovieService.removeComment(req);
      return res.status(200).send(result);
    } catch(err) {
      console.log(err);
      err.status = err.status || 400;
      return next(err);
    }
  })

  router.get('/comment/:movie_src/:movie_id', async (req, res, next) => {
    try{
      const result = await MovieService.getComment(req);
      return res.status(200).send(result);
    } catch(err) {
      console.log(err);
      err.status = err.status || 400;
      return next(err);
    }
  });

  router.get('/file/:source/:movie_id/:torrent_v', async (req, res, next) => {
    try{
      const result = await MovieService.getFile(req);
      return res.status(200).send(result);
    } catch (err) {
      console.error(err);
      err.status = err.status || 400;
      return next(err);
    }
  })

  router.get('/stream', async (req, res) => {
    try {
      MovieService.streamMovie(req, res);
    } catch(e) {
      console.log('error streaming: ', e.message)
      res.status(200).json(ERRORS.STREAM(e.message))
    }
  })

  router.put('/view', async (req, res, next) => {   //need movie_id and movie_src
    try {
      console.log("request put new view");
      const result = await MovieService.newView(req);
      return res.status(200).send(result);
    } catch(err) {
      console.log(err);
      err.status = err.status || 400;
      return next(err);
    }
  })

  router.get('/view/:pseudo', async (req, res, next) => {
    try {
      const result = await MovieService.getViews(req);
      return res.status(200).send(result);
    } catch (err){
      console.log(err);
      err.status = err.status || 400;
      return next(err);
    }
  })
}