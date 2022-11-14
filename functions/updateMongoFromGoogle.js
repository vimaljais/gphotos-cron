const fetch = require("node-fetch");

const { getToken } = require("../auth/getToken");
const {createHeader} = require("../utils/createHeader");
const {uploadToMongo} = require("../utils/uploadToMongo");

 const  updateMongoFromGoogle = async () => {
  console.log("fetching")
  let albumId;
  if (process.env.IS_PROD === "YES") {
    albumId = process.env.BONKY_ALBUM_ID; //BONKY
  } else {
    albumId = process.env.TEST_ALBUM_ID; //test
  }
  var apiResponse = [];
  const tokens = await getToken();

  const googleCallAPI = async (pageToken) => {
    const requestOptions = await createHeader(tokens, pageToken, albumId);
    let response = await fetch(
      "https://photoslibrary.googleapis.com/v1/mediaItems:search",
      requestOptions
    );
    response = await response.json();

    apiResponse = apiResponse.concat(response?.mediaItems);

    if (response["nextPageToken"]) {
      console.log("next page available, already fetched", apiResponse.length);
      await googleCallAPI(response["nextPageToken"]);
    }
  };

  try {
    await googleCallAPI();
    const chunkSize = 50;
    for (let i = 0; i < apiResponse.length; i += chunkSize) {
      const chunk = apiResponse.slice(i, i + chunkSize);
      await uploadToMongo(chunk, albumId);
    }
    return { status: "success" };
  } catch (err) {
    console.log(err);
    return { status: "error" };
  }
}

module.exports = {
  updateMongoFromGoogle
}