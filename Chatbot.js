var express =require('express');
var request=require('request');
var bodyparser=require('body-parser');
var app=express();
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.listen(8080);
const token="EAAi3JWh5GsoBAC62A49ZATq4ZBy7GbYAzRBSPdJ9cXwIEvSURF2jQFGcTVrlE5HfSfySbtygO1bgQDp6UZAZAWG2uqro57KFZCgrLpSyxmphC2DSWnMzGoSKo8jh3Txo3RZCMewA1F0AER83iLmT4yey0CHylJuoXlutQutoDMEIqZCRyuI6v7x"
app.get('/webhook',function(req,res){
    console.log(req.query);
    if(req.query['hub.verify_token']=='try')
    {
        res.send(req.query['hub.challenge']);
    }
});
app.post('/webhook',function(req,res){
    console.log(req.body)
    console.log("done");
    console.log(msg_events)
    var msg_events=req.body.entry;
    msg_events.forEach(function(pageEntry){
        pageEntry.messaging.forEach(function(msg){
            if(msg.sender.id && msg.message.text)
            {
                sendText1(msg.sender.id,msg.message.text);
                res.sendStatus(200);
            }
        });
    });
});
function sendText1(id,message)
{
const header={url:"https://graph.facebook.com/v5.0/me/messages",
                qs:{access_token:token},
                method:"POST"}


    if(message=='1'){
    request({
        header,
        json:{
            recipient:{id:id},
            message:{text:"Contact Number : 090078601 Email : ab123@yahoo.com"}
        }
    })}
    else if(message=='2'){
        request({
            header,
            json:{
                recipient:{id:id},
                message:{text:"Service Information"}
            }
        })}
    else if(message=='3'){
            request({
                header,
                json:{
                    recipient:{id:id},
                    message:{text:"Achievements"}
                }
            })}
    else{
        request({
            header,
            json:{
                recipient:{id:id},
                message:{text:"Hi Thanks for Showing Your Interest \nPress '1' for Contact Information \nPress '2' for Services \nPress '3' for Achievements"},            
            }
        })}
};
