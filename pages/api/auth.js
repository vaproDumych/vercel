import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/* JWT secret key */
const KEY = process.env.JWT_KEY;
/* Users collection sample */
const USERS = [
  {
    id: 1,
    email: 'kk@tdes.com.ua',
    password: '$2y$12$luUj9b6fwUfnqdS/L4U41.ovMC9qemrH8QqJqNdZLFmCI6FNP5vnW', // password
    fullName: 'Колодій Костянтин',
  },
  {
    id: 2,
    email: 'vp@tdes.com.ua',
    password: '$2y$12$JDYVpyLH1MOm2wwcQkYSM.87XbIwZp70msINduZMwIhv5FuMWo0wO', // password
    fullName: 'Проховник Володимир',
  },
  {
    id: 3,
    email: 'va@tdes.com.ua',
    password: '$2y$12$DSNuLYeMgJBGhPFjhSmMO.PTDPIoXrnH58dMDi19DnQSV3sYZYkla', // password
    fullName: 'Албатов Василь',
  },
  {
    id: 4,
    email: 'vg@tdes.com.ua',
    password: '$2y$12$p/o9OfYeLG/YVuL7I5aTiubA4eNzzgkdoeqMsznqOvWozTCN/JfzC', // password
    fullName: 'Гук Василь',
  },
  {
    id: 5,
    email: 'sales@tdes.com.ua',
    password: '$2y$12$YOf3Gq947NvpsodWFuENPewdb5..sd/tPZbrn3SjMRf4qtBuw4xKK', // password
    fullName: 'Інтернет',
  },
];

export default (req, res) => {
  return new Promise(resolve => {
    const { method } = req;
    try {
      switch (method) {
        case 'POST':
          /* Get Post Data */
          const { email, password } = req.body;
          /* Any how email or password is blank */
          if (!email || !password) {
            return res.status(400).json({
              status: 'error',
              error: 'Request missing username or password',
            });
          }
          /* Check user email in database */
          const user = USERS.find(user => {
            return user.email === email;
          });
          /* Check if exists */
          if (!user) {
            /* Send error with message */
            res.status(400).json({ status: 'error', error: 'User Not Found' });
          }
          /* Define variables */
          const userId = user.id,
            userEmail = user.email,
            userPassword = user.password,
            userFullName = user.fullName;
          /* Check and compare password */
          bcrypt.compare(password, userPassword).then(isMatch => {
            /* User matched */
            if (isMatch) {
              /* Create JWT Payload */
              const payload = {
                id: userId,
                email: userEmail,
                fullName: userFullName,
              };
              /* Sign token */
              jwt.sign(
                payload,
                KEY,
                {
                  expiresIn: 31556926, // 1 year in seconds
                },
                (err, token) => {
                  /* Send succes with token */
                  res.status(200).json({
                    success: true,
                    token: 'Bearer ' + token,
                  });
                },
              );
            } else {
              /* Send error with message */
              res
                .status(400)
                .json({ status: 'error', error: 'Password incorrect' });
            }
          });
          break;
        case 'PUT':
          break;
        case 'PATCH':
          break;
        default:
          break;
      }
    } catch (error) {
      throw error;
    }
    return resolve();
  });
};
