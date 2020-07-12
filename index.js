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

    let menuItem = req.body.queryResult &&
        req.body.queryResult.parameters &&
        req.body.queryResult.parameters.menuItems
        ? req.body.queryResult.parameters.menuItems
        : null;

    let marks =
        req.body.queryResult &&
            req.body.queryResult.parameters &&
            req.body.queryResult.parameters.HSCmarks
            ? req.body.queryResult.parameters.HSCmarks
            : "Seems like some problem. Speak again.";

    let CET =
        req.body.queryResult &&
            req.body.queryResult.parameters &&
            req.body.queryResult.parameters.CETscore
            ? req.body.queryResult.parameters.CETscore
            : "Seems like some problem. Speak again.";

    let caste = req.body.queryResult &&
        req.body.queryResult.parameters &&
        req.body.queryResult.parameters.caste
        ? req.body.queryResult.parameters.caste
        : "Seems like some problem. Speak again.";

    if (menuItem == null) {
        console.log({ caste, marks });
        if (CET > 0) {
            if (caste == "open") {
                if (marks >= 150) {
                    speech = `Thank you for the information !

                Reply with a number to get the infromation:
                
                
                1. Form cost and where it can be purchased
                
                2. Previous year cutoff
                
                3. Placements at VIT
                
                4. Faculty at VIT
                
                5. Document Required for submission
                
                6. Deadline to submit pending documents
                
                7. Fees Related Information
                
                8. Admission related information`
                } else {
                    speech = "Sorry, you are ineligible for admission here, please try BSC IT"
                }
            } else if (marks >= 145) {
                speech = `Thank you for the information !

            Reply with a number to get the infromation:
            
            
            1. Form cost and where it can be purchased
            
            2. Previous year cutoff
            
            3. Placements at VIT
            
            4. Faculty at VIT
            
            5. Document Required for submission
            
            6. Deadline to submit pending documents
            
            7. Fees Related Information
            
            8. Admission related information`
            } else {
                speech = "Sorry, you are ineligible for admission here, please try BSC IT"
            }
        } else {
            speech = "Sorry, you are ineligible for admission here, please try BSC IT"
        }
    } else {
        switch (menuItem) {
            case '1':
                speech = "Form cost and where it can be purchased";
                break;
            case '2':
                speech = "Previous year cutoff";
                break;
            case '3':
                speech = "Placements at VIT";
                break;
            case '4':
                speech = "Faculty at VIT";
                break;
            case '5':
                speech = "Here's a document which states what documents are required for admission: https://drive.google.com/file/d/1fiaTg2ZV4LARWL2EBNLUP5sjdQhJKrgi/view?usp=sharing";
                break;
            case '6':
                speech = "Deadline to submit pending documents";
                break;
            case '7':
                speech = "Fees Related Information";
                break;
            case '8':
                speech = "Admission related information";
                break;
            default:
                speech = "Sorry! I didn't get that!"
        }
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