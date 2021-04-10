const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS, // gmail address, make sure the less secure app access is turned on in google account
    pass: process.env.EMAIL_PWD // password
  }
});

module.exports = {
  RegistrationEmail: async function(verifToken, mail, pseudo) {
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: mail,
      subject: 'You registered to Hypertube',
      html: "Hi " + pseudo + " and welcome to Hypertube ! </br> \
      Please click on the link to confirm your email : <a target='_blank' href='http://localhost:3000/confirmation/" + verifToken+ "'>click_Here</a>",
    };
    const sendMail = await transporter.sendMail(mailOptions);
    if (sendMail.error) {
      throw new Error(sendMail.error);
    } else
      return true;
  },
  NewPassword: async function(mail, verifToken) {
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: mail,
      subject: 'We heard you forgot your password !',
      html: "Here is a link to update your password : <a target='_blank' href='http://localhost:3000/changement-de-mot-de-passe/" + verifToken+ "'>click_Here</a></br>"
    };
    const sendMail = await transporter.sendMail(mailOptions);
    if (sendMail.error) {
      throw new Error(sendMail.error);
    } else {
      return true;
    }
  }
}