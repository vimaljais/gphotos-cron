const { google } = require("googleapis");

 const generateAccessToken = async (
  refreshToken = "1//0gRSLvqKrKIEkCgYIARAAGBASNwF-L9Ir0-jvgiqMLUIhfyiQLqmGhGA5JS4RzLn6lI2NTnuGu_SeH_VSQ0ZnqvmXa_rkY5O6AD8"
) => {
  const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID, // ClientID
    process.env.GOOGLE_CLIENT_SECRET, // Client Secret
    process.env.NEXTAUTH_URL // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken
  });

  const accessToken = await oauth2Client.getAccessToken();
  return accessToken.res.data;
};

module.exports = {
  generateAccessToken
}