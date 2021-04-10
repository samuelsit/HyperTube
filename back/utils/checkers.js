const Joi = require('@hapi/joi');
const User = require('../Models/User');
const fs = require('fs');


module.exports = {
  RegisterValidation: function(form) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      pseudo: Joi.string().min(2).max(29).required(),
      firstname: Joi.string().max(29).required(),
      lastname: Joi.string().max(29).required(),
      password: Joi.string().min(8).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/).required(),
      repeat: Joi.ref('password')
    }).with('password', 'repeat');
    return schema.validate(form);
  },

  emailIsValid: function(form) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
    }).unknown(true);
    return schema.validate(form);
  },

  FirstnameIsValid: function(form) {
    const schema = Joi.object().keys({
      firstname: Joi.string().max(29).required(),
    }).unknown(true);
    return schema.validate(form);
  },

  LastnameIsValid: function(form) {
    const schema = Joi.object().keys({
      lastname: Joi.string().max(29).required(),
    }).unknown(true);
    return schema.validate(form);
  },

  passwordIsValid: function(form) {
    const schema = Joi.object().keys({
      password: Joi.string().min(8).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/).required(),
      repeat: Joi.ref('password')
    }).unknown(true).with('password', 'repeat');
    return schema.validate(form);
  },

  checkEmailExist: async function(email) {
    try {
        const findEmail = await User.find({ email: email});
        if (findEmail && findEmail.length > 0){
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return true;
    }
  },

  checkLoginExist: async function(login) {
    try {
        const findLogin = await User.find({ pseudo: login});
        if (findLogin && findLogin.length > 0){
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return true;
    }
  },

  renameIfPicture: function(file, pseudo) {
    uniqueId = Date.now();
    if (file.type === "image/jpeg") {
      return pseudo + uniqueId + '.jpeg';
    } else if (file.type === "image/png") {
      return pseudo + uniqueId + '.png';
    } else if (file.type === "image/gif") {
      return pseudo + uniqueId + '.gif';
    } else {
      return false;
    }
  },

  checkMoviePaths: function() {
    if (!fs.existsSync(process.env.PATH_TO_MOVIES + 'yts/'))
      fs.mkdirSync(process.env.PATH_TO_MOVIES + 'yts/', { recursive: true});
    if (!fs.existsSync(process.env.PATH_TO_MOVIES + 'eztv/'))
      fs.mkdirSync(process.env.PATH_TO_MOVIES + 'eztv/', { recursive: true});
    if (fs.existsSync(process.env.PATH_TO_MOVIES + 'yts/') && fs.existsSync(process.env.PATH_TO_MOVIES + 'eztv/'))
      return true;
    return false;
  }

}