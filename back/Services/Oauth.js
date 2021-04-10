const User = require('../Models/User');
const checker = require('../utils/checkers');
const tools = require('../utils/tools');
const tokens = require('../utils/tokens');
const https = require('https');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const axios = require('axios');

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

async function generateNewPseudo(pseudo) {
    let i = 1;
    let newPseudo = pseudo+ i
    while(await checker.checkLoginExist(newPseudo)) {
      i++;
      newPseudo = pseudo + i;
    }
  return (newPseudo);
}

class OauthService {

  static async googleOauth(datas){
    const googleUser = await verify(datas.id_token).catch(console.error);
    if (!googleUser)
      throw new Error("authentification failed");
    const userDoc = await User.findOne({email: googleUser.email})
    if (userDoc) {
      let token = await tokens.generateToken(userDoc.pseudo);
      let user = userDoc.toObject();
      Reflect.deleteProperty(user, 'password');
      let likes = await tools.getLikes(user.pseudo);
      user.likes = likes;
      return { user, token };
    } else {
      //user doesn't exist
      let newPseudo = googleUser.name.split(" ").join("");
      let pseudoExists = await checker.checkLoginExist(newPseudo);
      if (pseudoExists) {
        newPseudo = await generateNewPseudo(newPseudo);
      }
      const user = {
        email: googleUser.email,
        pseudo: newPseudo,
        lastname: googleUser.family_name,
        firstname: googleUser.given_name,
        picture: googleUser.picture,
        isVerified: googleUser.email_verified
      }
      const newUser = await User.create(user);
      if (!newUser) {
        throw new Error("creation failed");
      }
      let token = await tokens.generateToken(newPseudo);
      return { user, token };
    }
  }

  static async ftOauth(datas, next){
    if (!datas.code)
      throw new Error("bad request");

    const ft_token = await new Promise((resolve, reject) => {
      axios.post('https://api.intra.42.fr/oauth/token', {
        'grant_type': 'authorization_code',
        'client_id': 'd3f78a661206accafdeedd5e56d51f978f145000e5ac136ad21220f0b387ae4d',
        'client_secret': '3de87b4e3489793a95658bb82258392bae2ff9c86ead13cfe23dee3f8cc75049',
        'code': datas.code,
        'redirect_uri': 'http://localhost:3000'
      })
      .then((res) => {
        resolve(res.data.access_token);
      })
      .catch((error) => {
        console.error(error)
        reject(new Error("request failed"));
      })
    });
    if (ft_token) {
      //do an 42 api request to get user infos
      const result = await new Promise((resolve, reject) => {
        axios.get('https://api.intra.42.fr/v2/me', {
          headers: {
            'Authorization': 'Bearer ' + ft_token
          }
        })
        .then(async (res) => {
          const userDoc = await User.findOne({email: res.data.email})
          if (userDoc) {
            let token = await tokens.generateToken(userDoc.pseudo);
            let user = userDoc.toObject();
            Reflect.deleteProperty(user, 'password');
            let likes = await tools.getLikes(user.pseudo);
            user.likes = likes;
            resolve({ user, token });
          } else {
            //user doesn't exist
            let newPseudo = res.data.login.split(" ").join("");
            let pseudoExists = await checker.checkLoginExist(newPseudo);
            if (pseudoExists) {
              newPseudo = await generateNewPseudo(newPseudo);
            }
            const user = {
              email: res.data.email,
              pseudo: newPseudo,
              lastname: res.data.last_name,
              firstname: res.data.first_name,
              picture: res.data.img_url === undefined ? '' : res.data.img_url, //res.data.img_url
              isVerified: true
            }
            const newUser = await User.create(user);
            if (!newUser) {
              reject(new Error("creation failed"));
            }
            let token = await tokens.generateToken(newPseudo);
            resolve({ user, token });
          }
        })
        .catch((error) => {
          console.error(error)
          reject(new Error("request failed"));
        })
      });
      if (result)
      return result;
    }
    throw new Error("request failed");
  }
}

exports.default = OauthService;