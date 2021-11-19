const { version: appVersion } = require('./package.json');
const helmet = require('helmet');

const SERVER_PORT = process.env.PORT || 5000;

console.log(SERVER_PORT)

const express = require('express');
const app = express();

app.set('port', SERVER_PORT);

app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.get('/', (req, res) => res.status(200).json({
  appVersion,
}));

app.get('*', (req, res) => {
  res.status(404).json(null);
});

// Common error handling
app.use((error, req, res, next) => {
  return res.status(500).json({
    errors: [{ msg: 'An unexpected error occurred. Please contact us.', code: 'unknown' }],
  });
});

const server = app.listen(
  app.get('port'), () => {
    console.log('running on port', app.get('port'));
  },
);