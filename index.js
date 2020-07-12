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
    let speech = "";

    let marks =
        req.body.queryResult &&
            req.body.queryResult.parameters &&
            req.body.queryResult.parameters.HSCmarks
            ? req.body.queryResult.parameters.HSCmarks
            : "Seems like some problem. Speak again.";

    let caste = req.body.queryResult &&
        req.body.queryResult.parameters &&
        req.body.queryResult.parameters.caste
        ? req.body.queryResult.parameters.caste
        : "Seems like some problem. Speak again.";

    console.log({caste, marks});


    if (caste == "open") {
        if (marks >= 150) {
            speech = "Please Enter Your CET score"
        } else {
            speech = "Sorry, you are ineligible for admission here, please try BSC IT"
        }
    } else if (marks >= 145) {
        speech = "Please Enter Your CET score"
    } else {
        speech = "Sorry, you are ineligible for admission here, please try BSC IT"
    }

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