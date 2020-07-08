const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    return res.json({
        status: "working"
    });
});

app.post("/api/sendResponse", async (req, res) => {
    let speech =
        req.body.queryResult &&
            req.body.queryResult.parameters &&
            req.body.queryResult.parameters.HSCmarks
            ? req.body.queryResult.parameters.HSCmarks
            : "Seems like some problem. Speak again.";

    console.log(speech);

    let speechResponse = {
        google: {
            expectUserResponse: true,
            richResponse: {
                items: [
                    {
                        simpleResponse: {
                            textToSpeech: speech
                        }
                    }
                ]
            }
        }
    };

    return res.json({
        payload: speechResponse,
        //data: speechResponse,
        fulfillmentText: speech,
        speech: speech,
        displayText: speech,
        source: "webhook-vit"
    });
});

app.listen(process.env.PORT || 3000);
console.log("Service Running");