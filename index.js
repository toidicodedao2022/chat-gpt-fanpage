require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");

const express = require('express')
const app = express()

app.get('/v1/chat-gpt', function (req, res) {

    response(req.query['message'],req.query['api-key']).then(message=>{
        res.json({
            "messages": [
                {"text": message},
            ]
        })
    })
})


async function response(message,apiKey){
    try{
        const configuration = new Configuration({
            apiKey: apiKey,
        });
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
        });
        return completion.data.choices[0].text;
    }catch (e){
        return "Tôi đang gặp sự cố!"
    }
}

app.listen(3000)
