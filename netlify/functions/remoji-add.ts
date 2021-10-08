// // optionally configure local env vars
// require('dotenv').config()

// // details in https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget
const process = require("process");
const axios = require("axios");
const FormData = require("form-data");
const fetch = require("node-fetch");
const fs = require("fs");
import { RemoveBgResult, RemoveBgError, removeBackgroundFromImageUrl } from "remove.bg";
 
const url = "https://www.remove.bg/example.jpg";
const { REMOVE_BG_KEY } = process.env;

const handler = async (event) => {
  console.log(`get it this time???`);

  removeBackgroundFromImageUrl({
    url,
    apiKey: REMOVE_BG_KEY,
    size: "regular",
    type: "person"
  }).then((result: RemoveBgResult) => {
    const base64img = result.base64img;
    console.log('got here');
    console.log(base64img);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/png",
      },
      body: base64img,
      isBase64Encoded: true,
    };
    
  }).catch((errors: Array<RemoveBgError>) => {
   console.log(JSON.stringify(errors));
  });

  // const subject = event.queryStringParameters.name || "World";

  // const formData = new FormData();
  // formData.append("size", "auto");
  // formData.append("image_url", "https://www.remove.bg/example.jpg");

  // axios({
  //   method: "post",
  //   url: "https://api.remove.bg/v1.0/removebg",
  //   data: formData,
  //   responseType: "arraybuffer",
  //   headers: {
  //     ...formData.getHeaders(),
  //     "X-Api-Key": REMOVE_BG_KEY,
  //   },
  //   encoding: null,
  // })
  //   .then((response) => {
  //     if (response.status != 200)
  //       console.error("Error:", response.status, response.statusText);

  //     console.log("we good");
  //     console.log(response.data);
  //     return { statusCode: 200, body: JSON.stringify(response.data) };
  //     // fs.writeFileSync("no-bg.png", response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Request failed:", error);
  //     return { statusCode: 500 };
  //   });

  // return {
  //   statusCode: 200,
  //   body: `Hello ${subject}!`,
  // };

  // try {
  //   const response = await fetch("https://api.remove.bg/v1.0/removebg", {
  //     method: "POST",
  //     headers: {
  //       "X-Api-Key": REMOVE_BG_KEY,
  //     },
  //     body: formData,
  //   });

  //   let keys = Object.keys(response);
  //   keys.forEach((k) => console.log(k));

    
  // } catch (error) {
  //   console.log("uh oh");
  //   return { statusCode: 422, body: String(error) };
  // }
};

module.exports = { handler };
