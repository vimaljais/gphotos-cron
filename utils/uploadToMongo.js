const { uploadToImgbb } = require("./uploadToImgbb") ;
let MongoClient = require("mongodb").MongoClient;


const uploadToMongo = async (albumData, albumId) => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }
  const dbo = client.db("gphotos");

  const uploadAndPushToMongo = async () => {
    await Promise.all(
      albumData.map(async (singleImageData, i) => {
        var album = await dbo
          .collection(albumId)
          .findOne({ id: singleImageData.id });
        if (!album) {
          console.log("pushing new");
          const imgurData = await uploadToImgbb(singleImageData.baseUrl);
          albumData[i]["imgurData"] = imgurData;
          try {
            dbo.collection(albumId).insertOne(albumData[i]);
          } catch (err) {
            console.log("error pushing singledata to db", err);
          }
        } else {
          console.log("already available");
        }
      })
    );
  };
  await uploadAndPushToMongo();
  console.log("Response of pushing to db uploaded");
}

module.exports = {
  uploadToMongo
}