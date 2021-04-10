const Like = require('../Models/MovieLike');
const Comment = require('../Models/Comment');
const Movie = require('../Models/Movie');
const View = require('../Models/MovieView');
const User = require('../Models/User');
const Subtitle = require('../Models/Subtitle');
const checker = require('../utils/checkers');
const tokens = require('../utils/tokens');
const jwt = require('jsonwebtoken');
const config = require('../config');
const fs = require('fs');
const path = require('path');
const torrentStream =require('torrent-stream');
var srt2vtt = require('srt-to-vtt')
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
// const pump = require('pump')
const ReadableStreamClone = require("readable-stream-clone");


class MovieService {

  static async getLike(req){
    let pseudo = jwt.verify(req.headers.token, config.secret).pseudo;
    const userDoc = await User.findOne({pseudo: pseudo});
    if (!userDoc || pseudo === undefined) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    const isLiked = await Like.findOne({patron_id: pseudo, movie_id: req.params.movie_id, movie_src: req.params.movie_src});
    if (isLiked)
      return { liked: true };
    else
      return { liked: false };
  }

  static async like(req){
    let pseudo = jwt.verify(req.headers.token, config.secret).pseudo;
    const userDoc = await User.findOne({pseudo: pseudo});
    if (!userDoc || pseudo === undefined) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    const isLiked = await Like.findOne({patron_id: pseudo, movie_id: req.body.movie_id, movie_src: req.body.movie_src});
    if (isLiked)
      throw new Error("You already like this movie !");
    const likeData = {
      patron_id: pseudo,
      movie_id: req.body.movie_id,
      movie_src: req.body.movie_src,
      movie_title: req.body.movie_title,
      date: new Date()
    }
    const newLike = await Like.create(likeData);
    if (!newLike) {
      throw new Error("Like not added");
    }
    return "Like added";
  }

  static async unLike(req){
    let pseudo = jwt.verify(req.headers.token, config.secret).pseudo;
    const userDoc = await User.findOne({pseudo: pseudo});
    if (!userDoc || pseudo === undefined) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    const isLiked = await Like.findOne({patron_id: pseudo, movie_id: req.body.movie_id, movie_src: req.body.movie_src});
    if (isLiked) {
      await Like.deleteOne({patron_id: pseudo, movie_id: req.body.movie_id, movie_src: req.body.movie_src})
      return "Like removed";
    } else {
      throw new Error("Request failed");
    }
  }

  static async comment(req) {
    let pseudo = jwt.verify(req.headers.token, config.secret).pseudo;
    const userDoc = await User.findOne({pseudo: pseudo});
    if (!userDoc || pseudo === undefined) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    const commentData = {
      patron_id: pseudo,
      movie_id: req.body.movie_id,
      movie_src: req.body.movie_src,
      // movie_title: req.body.movie_title,
      value: req.body.value,
      date: new Date()
    }
    const newComment = await Comment.create(commentData);
    if (!newComment) {
      throw new Error("Comment not added");
    }
    return "Comment added";
  }

  static async removeComment(req) {
    let pseudo = jwt.verify(req.headers.token, config.secret).pseudo;
    const userDoc = await User.findOne({pseudo: pseudo});
    if (!userDoc || pseudo === undefined) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    if (!req.body.comment_id)
      throw new Error("must provide comment ID");
    const comment = await Comment.findOne({patron_id: pseudo, _id: req.body.comment_id, movie_src: req.body.movie_src});
    if (comment) {
      await Comment.deleteOne({patron_id: pseudo, _id: req.body.comment_id, movie_src: req.body.movie_src});
      return "Comment removed";
    } else {
      throw new Error("Request failed");
    }
  }

  static async getComment(req) {
    let pseudo = jwt.verify(req.headers.token, config.secret).pseudo;
    const userDoc = await User.findOne({pseudo: pseudo});
    if (!userDoc || pseudo === undefined) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    const commentsDatas = await Comment.find({movie_id: req.params.movie_id, movie_src: req.params.movie_src});
    let comments = [];
    commentsDatas.map( comment => {
      let commentData = {
        patron_id: comment.patron_id,
        comment_id: comment._id,
        comment_src: comment.movie_src,
        movie_id: comment.movie_title,
        value: comment.value,
        date: comment.date
      }
      comments.push(commentData);
    });
    return comments;
  }

  static async getFile(req) {
    //verify token
    let pseudo = jwt.verify(req.headers.token, config.secret).pseudo;
    const userDoc = await User.findOne({pseudo: pseudo});
    if (!userDoc || pseudo === undefined) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    //verify if movie id is in db and get name of file
    let movie = await Movie.findOne({movie_id: req.params.movie_id, movie_src: req.params.source, torrent_v: req.params.torrent_v});
    //if true verify if movie is in front/public/movies
    let reqSubtitles = await Subtitle.find({patron_id: req.params.movie_id, movie_src: req.params.source});
    if (movie && fs.existsSync(process.env.PATH_TO_MOVIES + movie.movie_src + "/" + req.params.movie_id + 'v_' + req.params.torrent_v + "/" +  movie.fileName)) {
      return {
        movie_path: "movies/" + movie.movie_src + "/" + req.params.movie_id + 'v_' + req.params.torrent_v + "/" + movie.fileName,
        subtitles: reqSubtitles
      }
    }
    return reqSubtitles ? {reqSubtitles} : false;
  }

  static async addToDb(movie_id, movie_src, torrent_v, title, fileName, date) {
    const newMovie = await Movie.create({
      movie_id: movie_id,
      movie_src: movie_src,
      torrent_v: torrent_v,
      title: title,
      uploadDate: date,
      lastViewDate: date,
      fileName: fileName
    })
    if (!newMovie) {
      return false;
    } else {
      return true;
    }
  }


  static streamMovie = async (req, res) => {
    console.log(req.query);
    //CHECK USER
    let pseudo = jwt.verify(req.query.token, config.secret).pseudo;
    const userDoc = await User.findOne({pseudo: pseudo});
    if (!userDoc || pseudo === undefined) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    //SET MAGNET
    let magnet;
    if (req.query.source === "yts") {
      magnet = "magnet:?xt=urn:btih:" + req.query.hash;
    } else if (req.query.source === "eztv") {
      magnet = "magnet:?xt=urn:btih:" + req.query.hash;
    } else {
      return(new Error('bad source')); 
    }

    //CHECK FOLDER
    const fileCheck = checker.checkMoviePaths();
    if (!fileCheck) {
      console.log("error with fileCheck");
      return(new Error('fileCheck'));
    }
    const pathToDirectory = process.env.PATH_TO_MOVIES + req.query.source + "/" + req.query.movie_id + 'v_' + req.query.torrent_v;
    if (fs.existsSync(pathToDirectory)) {
      fs.rmdirSync(pathToDirectory, { recursive: true });
      fs.mkdirSync(pathToDirectory);
    } else {
      fs.mkdirSync(pathToDirectory);
    }


    //STREAM & WRITE
    const engine = torrentStream(magnet);

    engine.on('ready', async () => {
      engine.files.forEach(async (file) => {

        console.log("file length = ", file.length);

        let fileExt = path.extname(file.path);
        console.log(fileExt)
        
        let path_mov = process.env.PATH_TO_MOVIES + req.query.source + "/" + req.query.movie_id + 'v_' + req.query.torrent_v + "/video.mp4";
        file.select()
        if (fileExt === '.mp4') {
          let writer = fs.createWriteStream(path_mov);
          let stream = file.createReadStream();
          const streamClone = new ReadableStreamClone(stream);
          stream.pipe(writer);
          let today = new Date();

          let isStreaming = false;
          let printSize = setInterval(async function () {
            if (fs.existsSync(path_mov)) {
              let stats = fs.statSync(path_mov);
              let fileSizeInBytes = stats["size"]
              let percentDownloaded = fileSizeInBytes / file.length * 100;
              console.log(req.query.title, " => ", parseInt(percentDownloaded), "%");
              if (!isStreaming && percentDownloaded >= 1) {
                streamClone.pipe(res);
                isStreaming = true;
              }
              if (fileSizeInBytes === file.length) {
                console.log("movie is 100% downloaded !");
                try {
                  let movieInDb = await Movie.findOne({"movie_id": req.query.movie_id, "movie_src": req.query.source});
                  if (!movieInDb) {
                    let movieAdded = MovieService.addToDb(req.query.movie_id, req.query.source, req.query.torrent_v, req.query.title, "video" + fileExt, today);
                    if (!movieAdded) {
                      console.log("error: failed to add to db");
                      if (fs.existsSync(pathToDirectory)) {
                        fs.rmdirSync(pathToDirectory, { recursive: true });
                    }
                    return(new Error("Failed to add to db"));
                    }
                  }
                } catch (err) {
                  console.log(err);
                }
                try {
                  let viewAdded = MovieService.addView(pseudo, req.query.movie_id, req.query.source, req.query.title, today);
                  if (!viewAdded) {
                    console.log("error: failed to add view in db");
                    return(new Error("Failed to add view in db"));
                  }
                } catch (err) {
                  console.log(err);
                }
                clearInterval(printSize);
              }
            }
          }, 10000);

          stream.on('end', async () => {
            engine.destroy(err => {console.log(err)});
          })

          } else if (fileExt === '.srt') {
              let parsedFile = path.parse(file.name);
              let stream = file.createReadStream();
              let writerPath = process.env.PATH_TO_MOVIES + req.query.source + "/" + req.query.movie_id + 'v_' + req.query.torrent_v + "/" + parsedFile.name + ".vtt";
              stream.pipe(srt2vtt()).pipe(fs.createWriteStream(writerPath));
              stream.on('end', async () => {
              let lang = parsedFile.name.split('.')[0];
              let reqSubtitle = await Subtitle.findOne({patron_id: req.query.movie_id, movie_src: req.query.source, language: lang});
              if (!reqSubtitle) {
                let newSubtitle = await Subtitle.create({
                  patron_id: req.query.movie_id,
                  movie_src: req.query.source,
                  language: lang,
                  file: "movies/" + req.query.source + "/" + req.query.movie_id + 'v_' + req.query.torrent_v + "/" + file.name.substring(0, file.name.length - 3) + 'vtt'
                })
                  if (!newSubtitle) {
                    console.log("error: subtitle failed to ba added in db");
                    return(new Error("subtitle failed to be added in db."));
                  }
                  //Try to send subtitle in first download
                  // res.write({Subtitle: [newSubtitle]})
              }
              })
            } else if (fileExt !== '.jpg' && fileExt !== '.JPG' && fileExt !== '.jpeg' && fileExt !== '.JPEG') {
               
                  ffmpeg()
                  .input(file.createReadStream())
                  .output(path_mov)
                  .on('start', () => {
                    let isStreaming = false;
                    let printSize = setInterval(async function () {
                      if (fs.existsSync(path_mov)) {
                        let stats = fs.statSync(path_mov);
                        let fileSizeInBytes = stats["size"]
                        let percentDownloaded = fileSizeInBytes / file.length * 100;
                        console.log(req.query.title, " => ", parseInt(percentDownloaded), "%");
                        if (!isStreaming && percentDownloaded >= 1) {
                          console.log('should be streaming !')
                          let stream = file.createReadStream(path_mov)
                          isStreaming = true;
                          stream.pipe(res)
                        }
                        if (fileSizeInBytes === file.length) {
                          console.log("movie is 100% downloaded !");
                          try {
                            let movieInDb = await Movie.findOne({"movie_id": req.query.movie_id, "movie_src": req.query.source});
                            if (!movieInDb) {
                              let movieAdded = MovieService.addToDb(req.query.movie_id, req.query.source, req.query.torrent_v, req.query.title, "video" + fileExt, today);
                              if (!movieAdded) {
                                console.log("error: failed to add to db");
                                if (fs.existsSync(pathToDirectory)) {
                                  fs.rmdirSync(pathToDirectory, { recursive: true });
                              }
                              return(new Error("Failed to add to db"));
                              }
                            }
                          } catch (err) {
                            console.log(err);
                          }
                          try {
                            let viewAdded = MovieService.addView(pseudo, req.query.movie_id, req.query.source, req.query.title, today);
                            if (!viewAdded) {
                              console.log("error: failed to add view in db");
                              return(new Error("Failed to add view in db"));
                            }
                          } catch (err) {
                            console.log(err);
                          }
                          clearInterval(printSize);
                        }
                      }
                    }, 10000);
                  })
                  .on('end', () => console.log('translation done!'))
                  .on('error', function(err) {
                    console.log('An error occurred: ' + err.message);
                  })
                  .run();
                }
        })
      })
      engine.on('download', (piece) => {
        console.log("piece = ", piece);
      })
  }


  static async addView(pseudo, movie_id, movie_src, movie_title, date) {
    const newView = await View.create({
      patron_id: pseudo,
      movie_id: movie_id,
      movie_src: movie_src,
      movie_title: movie_title,
      date: date
    })
    if (!newView) {
      return false;
    } else {
      return true;
    }
  }

  static async newView(req) {
    let pseudo = jwt.verify(req.headers.token, config.secret).pseudo;
    const userDoc = await User.findOne({pseudo: pseudo});
    if (!userDoc || pseudo === undefined) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    //update lastViewDate in collection movies
    let movie = await Movie.findOne({movie_id: req.body.movie_id, movie_src: req.body.movie_src});
    if (!req.body.movie_id || !req.body.movie_src || !movie)
      throw new Error('Bad request');
    let today = Date();
    movie.lastViewDate = today;
    await movie.save();

    //add new data in views collection
    let viewAdded = await MovieService.addView(pseudo, req.body.movie_id, req.body.movie_src, movie.title, today);
    if (!viewAdded)
      throw new Error("fail to add view in DB");
    return "view updated";
  }

}

exports.default = MovieService;