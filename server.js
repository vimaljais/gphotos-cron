var cron = require('node-cron');
const { updateMongoFromGoogle } = require('./functions/updateMongoFromGoogle');
require('dotenv').config()

cron.schedule('* * * * *', async () => {
  console.log("fetching from Google");
  const res = await updateMongoFromGoogle()
  console.log(res)
});

