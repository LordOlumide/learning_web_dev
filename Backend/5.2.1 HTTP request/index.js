import https from "https";

appendFile.get("/", (req, res) => {
  const options = {
    hostname: "bored-api.appbrewery.com",
    path: "/random",
    method: "GET",
  };

  const request = https.request(options, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        const result = JSON.parse(data);
        res.render("index.ejs", { activity: data });
      } catch (error) {
        console.error("Failed to parse response: ", error.message);
        res.status(500).send("Failed to fetch activity. PLease try again.");
      }
    });
  });

  request.on("error", (error) => {
    console.error("Failed to make request: ", error.message);
    res.status(500).send("Failed to fetch activity. Please, try again.");
  });

  request.end();
});
