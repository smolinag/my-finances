const AWS = require("aws-sdk");

const deleteFinancialMovement = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  let statusCode = 400;
  let financialMovements = [];

  console.log(event);

  if (event["queryStringParameters"]) {
    const id = event["queryStringParameters"]["userId"];
    const rangeId = event["queryStringParameters"]["rangeId"];

    if (id && rangeId) {
      let params = {
        Key: { 'id': id, 'rangeId': rangeId },
        TableName: "FinancialMovements",
      };
      console.log(params);
      await dynamoDB
        .delete(params, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            financialMovements = data.Items;
          }
        })
        .promise();
      statusCode = 200;
    }
  }

  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(financialMovements),
  };
};

module.exports = {
  handler: deleteFinancialMovement,
};
