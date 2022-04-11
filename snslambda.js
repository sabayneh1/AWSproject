// Loads in the AWS SDK
const AWS = require('aws-sdk'); 
const ddb = new AWS.DynamoDB.DocumentClient({region: 'ca-central-1'}); 



exports.handler = async (event, context, callback) => {
    var event_received_at = new Date().toISOString();
    console.log('Event received at: ' + event_received_at);
    console.log('Received event:', JSON.stringify(event, null, 2));
   
    await readgroup4().then(data => {
        data.Items.forEach(function(item) {
            console.log(item.group4)
        });
        callback(null, {
            
       
            
            statusCode: 200,
            body: data.Items,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
    }).catch((err) => {
      
        console.error(err);
    })
    
    
    if (event.Success) {
        console.log("Success");
        context.callbackWaitsForEmptyEventLoop = false;
        callback(null, "success");
    } else {
        console.log("Failure");
        context.callbackWaitsForEmptyEventLoop = false;