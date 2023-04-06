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

        const completion =await openai.createChatCompletion({
            model:'gpt-3.5-turbo',
            messages:[
                {
                    'role':'user',
                    'content':message
                }
            ]
        })
        // console.log(completion.data.choices[0].content)
        // const completion = await openai.createCompletion({
        //     model: "gpt-3.5-turbo",
        //     prompt: message,
        // });
        return completion.data.choices[0].message.content;
    }catch (e){
        console.log(e)
        return "Tôi đang gặp sự cố!"
    }
}

app.listen(3002)
