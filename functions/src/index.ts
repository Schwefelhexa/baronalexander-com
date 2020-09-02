import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

interface MailConfig {
  host: string;
  port: string;
  email: string;
  username: string;
  password: string;
}

export const contact = functions.https.onRequest((req, res) => {
  const { title, message, email } = req.query;

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (!title || !message || !email) {
    res.status(400).send('Please provide title, message and email as query parameters!');
    return;
  }

  const { mail: config } = functions.config() as { mail: MailConfig };

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: Number.parseInt(config.port, 10),
    requireTLS: true,
    auth: {
      user: config.username,
      pass: config.password,
    },
  });

  transporter.sendMail({
    to: 'me@baronalexander.com',
    subject: `Portfolio Contact Request: '${title}'`,
    // eslint-disable-next-line prefer-template
    text: 'THIS IS A REQUEST SENT FROM https://baronalexander.com/contact\n'
              + '==============================================================\n\n'
              + message
              + '\n\n==============================================================\n'
              + `This message has been sent by ${email}`,
    from: 'baronalexander.com noreply@baronalexander.com',
    replyTo: `${email}`,
  }, (err, info) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(info);
    }
  });
});
