const mongoose = require('mongoose')
let MongoClient = require("mongodb").MongoClient;

const {generateAccessToken} = require("./refreshToken") ;

var tokenData = {};

const getToken = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err); 
  });

  if (!client) {
    return;
  }
  const dbo = client.db("gphotos");
  tokenData = await dbo.collection("tokens").findOne();

  try {
    if (tokenData.expiry_date - Date.now() < 1000) {
      console.log("refreshing");
      const refreshedTokens = await generateAccessToken(
        tokenData.refresh_token
      );
      try {
        await dbo
          .collection("tokens")
          .updateOne(
            { _id: mongoose.Types.ObjectId(tokenData._id.toString()) },
            { $set: refreshedTokens }
          );
      } catch (err) {
        console.log(err);
      }
      return refreshedTokens;
    } else {
      return tokenData;
    }
  } catch (err) {
    console.log("error creating refresh token:", err);
  }
  return tokenData;
};

module.exports = {
  getToken
}