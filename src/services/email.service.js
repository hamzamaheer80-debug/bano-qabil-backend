const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"BACKEND" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


async function sendRegisterationEmail(userEmail, name) {
    const subject = "welcome to BACKEND!";
    const text = `hello ${name}, \n\nThank you for registering BACKEND.
    we're excited to have you on board!\n\nBest regards, \nthe BACKEND team`;
    const html = `<p>hello ${ name },</p><p>thankyou for registering at BACKEND. we're excited to have you on board!</p><p>Best regards,<br> the BACKEND team </p>`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
  const subject = "transaction Successfully!";
    const text = `hello ${name}, \n\nyour Transaction of $${amount} to account ${ toAccount } was successfull.\n\nbest regards, \n the BACKEND team;`
    const html = `<p>hello ${ name },</p><p>your transaction of $${ amount } to account ${ toAccount } was successful.</p><p>Best regards,<br> the BACKEND team </p>`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionfaliureEmail(userEmail, name, amount, toAccount) {
    const subject = "Transaction Failed!";
    const text = `Hello ${name},\n\nYour transaction of $${amount} to account ${toAccount} failed. Please check your account details or try again later.\n\nBest regards,\nThe BACKEND team`;
    const html = `<p>Hello ${name},</p><p>Your transaction of $${amount} to account ${toAccount} failed. Please check your account details or try again later.</p><p>Best regards,<br>The BACKEND team</p>`;

    await sendEmail(userEmail, subject, text, html);
}


module.exports = {
    sendRegisterationEmail,
    sendTransactionEmail,
    sendTransactionfaliureEmail
};