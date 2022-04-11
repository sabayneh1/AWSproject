const AWS = require('aws-sdk')
const s3 = new AWS.S3()
let ddb = new AWS.DynamoDB.DocumentClient({region: 'ca-central-1'});

exports.handler = async (event,context,callback) => {
  const Key = event.Records[0].s3.object.key;

    // Read the object from S3
    const data = await s3.getObject({
        Bucket: event.Records[0].s3.bucket.name,
        Key
    }).promise();
    const s3data = data.Body.toString('utf-8');
    console.log(s3data)
    const s3split = s3data.split("\n");
    console.log(s3split);
    s3split.shift()
    console.log(s3split);
    for (var i = 0; i < s3split.length; i++) {
        var row = s3split[i];
        var rowsplit = row.split(",")
        console.log(rowsplit)
        var params = {
        TableName: "node",
        Item: {
            'store_id':rowsplit[0],
            'Item':rowsplit[2],
            'count':rowsplit[3],
            'Country':rowsplit[1]
        }
    }
        await ddb.put(params).promise();
    }
    return;
};