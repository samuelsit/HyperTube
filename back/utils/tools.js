const Like = require('../Models/MovieLike');
const View = require('../Models/MovieView');
const https = require('https');
const fs = require('fs');
const crypto = require('crypto');


module.exports = {

  getLikes: async function(pseudo) {
    const likesData = await Like.find({patron_id: pseudo});
      let likes = [];
      likesData.map(like => {
        let likeData = {
          movie_id: like.movie_id,
          movie_src: like.movie_src,
          movie_title: like.movie_title,
          date: like.date
        }
        likes.push(likeData);
      });
    return likes;
  },
  getView: async function(pseudo) {
    const viewsData = await View.find({patron_id: pseudo});
      let views = [];
      viewsData.map(view => {
        let viewData = {
          movie_id: view.movie_id,
          movie_src: view.movie_src,
          movie_title: view.movie_title,
          date: view.date
        }
        views.push(viewData);
      });
    return views;
  }
  
}