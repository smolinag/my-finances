const AWS = require("aws-sdk");

const getFinancialMovements = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  let statusCode = 400;
  let financialMovements = [];

  console.log(event);

  if (event["queryStringParameters"]) {
    const id = event["queryStringParameters"]["userId"];
    const year = event["queryStringParameters"]["year"];
    const month = event["queryStringParameters"]["month"];
    const type = event["queryStringParameters"]["type"];

    if (id) {
      let rangeId;
      if (year) {
        rangeId = year;
        if (month) {
          rangeId += "-" + month;
          if (type) {
            rangeId += "-" + type[0];
          }
        }
      }
      let params = {
        TableName: "FinancialMovements",
        ExpressionAttributeValues: rangeId
          ? {
              ":id": id,
              ":rangeId": rangeId,
            }
          : {
              ":id": id,
            },
        KeyConditionExpression: rangeId
          ? "id = :id and begins_with(rangeId, :rangeId)"
          : "id = :id",
      };
      console.log(params);
      await dynamoDB
        .query(params, (err, data) => {
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
    body: JSON.stringify(financialMovements),
  };
};

module.exports = {
  handler: getFinancialMovements,
};
