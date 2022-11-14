const FormData = require('form-data');
const fetch = require("node-fetch");

 const uploadToImgbb = async (link) => {
  var formdata = new FormData();
  formdata.append("image", `${link}=w1920`);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow"
  };

  let res = await fetch(
    `https://api.imgbb.com/1/upload?expiration=15551999&key=${process.env.IMGBB_API}`,
    requestOptions
  );
  res = await res.json();
  return res;
};

module.exports = {
  uploadToImgbb
}