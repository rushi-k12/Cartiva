
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env');
console.log('[DEBUG] Attempting to load .env from:', envPath);

if (fs.existsSync(envPath)) {
  console.log('[DEBUG] .env file found ✅');
  require('dotenv').config({ path: envPath });
} else {
  console.log('[ERROR] .env file not found ❌');
}


// Check if CLIENT_URL is loaded
console.log('[DEBUG] CLIENT_URL:', process.env.CLIENT_URL); // <== add this!
// Step 2: Check if MONGO_URI is loaded
console.log('[DEBUG] MONGO_URI from process.env:', process.env.MONGO_URI);

require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');

const keys = require('./config/keys');
const routes = require('./routes');
const socket = require('./socket');
const setupDB = require('./utils/db');

const { port } = keys;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true
  })
);
app.use(cors());

setupDB();
require('./config/passport')(app);
app.use('/', routes);

const server = app.listen(port, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});

socket(server);
