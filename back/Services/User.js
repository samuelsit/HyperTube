const User = require('../Models/User');
const Like = require('../Models/MovieLike');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const checker = require('../utils/checkers');
const tools = require('../utils/tools');
const tokens = require('../utils/tokens');
const mail = require('../utils/mails');
const formidable = require('formidable');
const fs = require('fs');

class UserService {
    static async login(userData){
        if (!userData.pseudo || !userData.password)
            throw new Error("bad request");
        const userDoc = await User.findOne({ pseudo: userData.pseudo });
        if (!userDoc)
            throw new Error("L'utilisateur n'existe pas !");

        // verifie si utilisateur a valider son addresse mail (User.isVerified)
        if (!userDoc.isVerified)
            throw new Error("Email is not verified");
        
        const validPwd = await bcrypt.compare(userData.password, userDoc.password);
        if (!validPwd)
            throw new Error("Le mot de passe n'est pas valide !");
        
        const token = await tokens.generateToken(userDoc.pseudo);

        let user = userDoc.toObject();
        Reflect.deleteProperty(user, 'password');
        let likes = await tools.getLikes(userData.pseudo);
        user.likes = likes;

        return { user, token };
    }

    static async register(userData) {
        try {
            let checkEmail = await checker.checkEmailExist(userData.email);
            if (!checkEmail){

                let checkLogin = await checker.checkLoginExist(userData.pseudo);
                if (!checkLogin){
                    let { error } = checker.RegisterValidation(userData);
                    if (error) {
                      throw new Error(error);
                    } else {
                      userData.password = await bcrypt.hashSync(userData.password, 10);
                      //create verifToken
                      const verifToken = await tokens.generateVerifToken(userData.pseudo, 'email', "30d");

                      const newUser = await User.create(userData);
                      if (!newUser){
                          throw new Error("L'utilisateur ne peut pas être crée")
                      }
                      let user = newUser.toObject();
                      Reflect.deleteProperty(user, 'password');
                      //send email for verif
                      await mail.RegistrationEmail(verifToken, userData.email, userData.pseudo);
                      return { user };
                    }
                    
                } else {
                  throw new Error("Pseudo is already used");
                }

            } else {
                throw new Error("Email is already used");
            }
        } catch (e) {
            throw e;
        }
    }

    static async verifyEmail(verifToken) {
      let decoded = jwt.verify(verifToken, config.secretVerif);

      const userDoc = await User.findOne({ pseudo: decoded.pseudo });
      if (!userDoc || decoded.usage !== "email")
          throw new Error("invalid token");
      userDoc.isVerified = true;
      await userDoc.save();
      return "email verified"
    }

    static async forgotPassword(email) {
      const userDoc = await User.findOne({ email: email });
      if (!userDoc)
        throw new Error("email not found");
      if (!userDoc.isVerified) {
        const verifToken = await tokens.generateVerifToken(userDoc.pseudo, 'email', '30d');
        await mail.RegistrationEmail(verifToken, email, userDoc.pseudo);
        return "Please verify your email first";
      } else {
        const verifToken = await tokens.generateVerifToken(userDoc.pseudo, 'newPwd', 60 * 60);
        await mail.NewPassword(email, verifToken);
        return "Email for password update has been send";
      }
    }

    static async uploadPicture(req, next) {
      //verifier si token is valid
      if (Object.keys(req.body).length) {
        throw new Error("body arguments not allowed");
      }
      let pseudo = jwt.verify(req.headers.token, config.secret).pseudo;
      const userDoc = await User.findOne({pseudo: pseudo});
      if (!userDoc || pseudo === undefined) {
        let error = new Error("Unauthorized");
        error.status = 401;
        next(error);
      }
      //get picture from req
        const form = formidable();
        const res = await new Promise((resolve, reject) => {
          form.parse(req, async (err, fields, file) => {
            try {
              if (err || !file || !file.picture) {
                return reject(new Error("bad request"));
              }
              //verifier si file is valid
              const newName = checker.renameIfPicture(file.picture, pseudo, next);
              if (!newName)
                return reject(new Error("format not valid"));
              //create folder if doest exist
              if (!fs.existsSync(process.env.PATH_TO_PICTURES))
                fs.mkdirSync(process.env.PATH_TO_PICTURES);
              //sauver file dans /front/public/picture
              fs.renameSync(file.picture.path, process.env.PATH_TO_PICTURES + newName);
              //get the name of previous picture
              let oldPicture = userDoc.picture;
              //update db with new picture name
              userDoc.picture = newName;
              await userDoc.save();
              //check if a previous picture is was saved and delete it
              if (fs.existsSync(process.env.PATH_TO_PICTURES + oldPicture))
                fs.unlinkSync(process.env.PATH_TO_PICTURES + oldPicture);
              
              resolve({pictureName: newName});

            } catch(err) {
              next(err);
            }
          })
        });
      if (res) {
        console.log(res);
        return res
      } else {
        throw new Error("request failed");
      }
    }

    static async newPassword(req) {
      const decoded = jwt.verify(req.params.verifToken, config.secretVerif);
      if (!decoded.usage || decoded.usage !== 'newPwd')
        throw new Error("invalid token");
      const userDoc = await User.findOne({pseudo: decoded.pseudo});
      if (!userDoc || userDoc.pseudo === undefined)
        throw new Error("Unauthorized");
      let { error } = checker.passwordIsValid(req.body);
      if (error)
        throw new Error(error);
      userDoc.password = await bcrypt.hashSync(req.body.password, 10);
      await userDoc.save();
      return "password updated";
    }

    static async updateEmail(req) {
      let pseudo = jwt.verify(req.headers.token, config.secret).pseudo;
      const userDoc = await User.findOne({pseudo: pseudo});
      if (!userDoc || pseudo === undefined) {
        let error = new Error("Unauthorized");
        error.status = 401;
        throw error;
      }
      let { error } = checker.emailIsValid(req.body);
      if (error)
        throw new Error(error);
      let checkEmail = await checker.checkEmailExist(req.body.email);
      if (checkEmail)
        throw new Error("email already used");
      userDoc.email = req.body.email;
      await userDoc.save();
      return ("email updated");
    }

    static async updateLastname(req) {
      let pseudo = jwt.verify(req.headers.token, config.secret).pseudo;
      const userDoc = await User.findOne({pseudo: pseudo});
      if (!userDoc || pseudo === undefined) {
        let error = new Error("Unauthorized");
        error.status = 401;
        throw error;
      }
      let { error } = checker.LastnameIsValid(req.body);
      if (error)
        throw new Error(error);
      userDoc.lastname = req.body.lastname;
      await userDoc.save();
      return ("lastname updated");
    }

    static async updateFirstname(req) {
      let pseudo = jwt.verify(req.headers.token, config.secret).pseudo;
      const userDoc = await User.findOne({pseudo: pseudo});
      if (!userDoc || pseudo === undefined) {
        let error = new Error("Unauthorized");
        error.status = 401;
        throw error;
      }
      let { error } = checker.FirstnameIsValid(req.body);
      if (error)
        throw new Error(error);
      userDoc.firstname = req.body.firstname;
      await userDoc.save();
      return ("firstname updated");
    }

    static async updatePassword(req) {
      let pseudo = jwt.verify(req.headers.token, config.secret).pseudo;
      const userDoc = await User.findOne({pseudo: pseudo});
      if (!userDoc || pseudo === undefined) {
        let error = new Error("Unauthorized");
        error.status = 401;
        throw error;
      }
      let { error } = checker.passwordIsValid(req.body);
      if (error)
        throw new Error(error);
      userDoc.password = await bcrypt.hashSync(req.body.password, 10);
      await userDoc.save();
      return "password updated";
    }

    static async getUserProfile(req) {
      let pseudo = jwt.verify(req.headers.token, config.secret).pseudo
      const userDoc = await User.findOne({pseudo: req.params.pseudo});
      if (!userDoc || pseudo === undefined) {
        let error = new Error("Unauthorized");
        error.status = 401;
        throw error;
      }
      let { email, lastname, firstname, picture } = userDoc
      let likes = await tools.getLikes(req.params.pseudo);
      let view = await tools.getView(req.params.pseudo);
      return {email, lastname, firstname, picture, likes, view}
    }

    static async getAllProfile(req) {
      let pseudo = jwt.verify(req.headers.token, config.secret).pseudo;
      var memberLog = '^' + pseudo + '$'
      var regex = new RegExp(memberLog)
      const usersDoc = await User.find({pseudo: {$not: regex}});
      if (!usersDoc || pseudo === undefined)
        throw new Error("Unauthorized");
      return {usersDoc}
    }
}

exports.default = UserService;