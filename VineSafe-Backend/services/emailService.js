const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (email, numbers) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "VineSafe Password Reset Verification",

    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #2E7D32;">VineSafe</h2>

        <p>Password reset verification</p>

        <p>
          Choose the correct verification number
          from the VineSafe application.
        </p>

        <div style="
          padding: 15px;
          background-color: #F1F8F2;
          border-radius: 10px;
          margin: 20px 0;
          text-align: center;
        ">
          <h2>${numbers.join(" &nbsp;&nbsp; ")}</h2>
        </div>

        <p>
          If you did not request a password reset,
          please ignore this email.
        </p>

        <p>
          Regards,<br>
          VineSafe Team
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
};