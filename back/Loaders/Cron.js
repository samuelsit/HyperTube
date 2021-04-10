const CronJob = require('cron').CronJob;
const fs = require('fs');
const Movie = require('../Models/Movie');
const Subtitle = require('../Models/Subtitle');

exports.default = async () => {
  var job = new CronJob('00 00 00 * * *', async () => {

    console.log('Task executed every day at midnight');

    // 1 list every movie ids + source where last view date is > 30 days
    const moviesToDelete = await Movie.find({ lastViewDate: { $lt: new Date(Date.now() - 30*24*60*60 * 1000)}}); //30 days ago

    moviesToDelete.forEach(async (movie) => {
      console.log(movie.movie_id);

      // 2 remove subtitle, and movie from db
      await Subtitle.deleteMany({ patron_id: movie.movie_id, movie_src: movie.movie_src });
      console.log('subtitle deleted from db');
      await Movie.deleteMany({ movie_id: movie.movie_id, movie_src: movie.movie_src });
      console.log('movies deleted from db');

       // 3 remove id folder from source folder
      let pathToDirectory = process.env.PATH_TO_MOVIES + '/' + movie.movie_src + '/' + movie.movie_id;
      fs.rmdir(pathToDirectory, { recursive: true }, (err) => {
        if (err) {
          console.log('error: ', err);
        }
        console.log(pathToDirectory, " is deleted !");
      })

    })
  });
  job.start();
}