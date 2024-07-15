const nodemailer = require("nodemailer");
async function emailSend(user) {
  try {
    console.log("process.env.SMTP_HOST", process.env.SMTP_HOST);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    console.log("trnsporter", transporter);
    const info = await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to: user,
      subject: "Welcome message",
      html: "<p>hello user , welcome at my website</p>",
    });
    console.log("info", info);
    return info;
  } catch (error) {
    console.log("runtime error: ", error);
  }
}

module.exports = emailSend;
