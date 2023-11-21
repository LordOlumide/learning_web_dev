/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([{ name: "question 1", message: "Enter the website url: " }])
  .then((answers) => {
    var qr_png = qr.imageSync(answers["question 1"], { type: "png" });

    fs.writeFile("qr_img_generated.png", qr_png, (err, data) => {
      if (err) throw err;
      console.log(data);
    });
    fs.writeFile("URL_generated.txt", answers["question 1"], (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  })
  .catch((err) => {
    if (err.isTtyError) {
      console.log("Prompt could not be rendered in the current environment,");
    } else {
      console.log(err);
    }
  });
