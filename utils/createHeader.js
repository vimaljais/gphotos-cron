const fetch = require("node-fetch");

const createHeader = async (tokens, pageToken,albumId) => {
    const tok = "Bearer " + tokens.access_token;
    var myHeaders = new fetch.Headers();
    myHeaders.append(
      "Accept",
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
    );
  
    myHeaders.append("Authorization", tok);
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      pageSize: "100",
      albumId: albumId, 
      ...(pageToken && { pageToken: pageToken })
    });
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    return requestOptions;
  };


  module.exports = {
    createHeader
  }