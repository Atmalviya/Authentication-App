const nodeMailer = require("nodemailer");
const mailGen = require("mailgen");
require("dotenv").config();

let nodeConfig = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

let transporter = nodeMailer.createTransport(nodeConfig);
let mailGenerator = new mailGen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  const email = {
    body: {
      name: username,
      intro: text || "Welcome to Authentication App! We're very excited to have you on board.",
      outro: "Thank you for using Authentication App!",
      signature: "Best Regards,"
        
    }
  };

  var emailBody = mailGenerator.generate(email);

  let message = {
    from: process.env.MAIL,
    to: userEmail,
    subject: subject || `Hello ${username}, Welcome to Authentication App!`,
    html: emailBody,
  };

  let info = await transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).json({ message: "Email sent successfully" });
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal server error", error });
    });
};

module.exports = { registerMail };
