const AWS = require("aws-sdk");

const insertFinancialMovement = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  let statusCode = 400;
  let newFinancialMovement = {};

  if (event["queryStringParameters"]) {
    const id = event["queryStringParameters"]["userId"];
    const name = event["queryStringParameters"]["name"];
    const description = event["queryStringParameters"]["description"];
    const value = event["queryStringParameters"]["value"];
    const movementType = event["queryStringParameters"]["movementType"];
    const incomeType = event["queryStringParameters"]["incomeType"];
    const expenseType = event["queryStringParameters"]["expenseType"];
    const date = event["queryStringParameters"]["date"];

    if (id && name && value && movementType && date) {
      const dateStr = date.split("-");
      const year = dateStr[0];
      const month = dateStr[1];
      newFinancialMovement = {
        id,
        rangeId: year + "-" + month + "-" + type[0],
        name,
        description: description != null ? description : "",
        value,
        movementType,
        incomeType,
        expenseType,
        date,
      };
      console.log(newFinancialMovement);
      await dynamoDB
        .put({
          TableName: "FinancialMovements",
          Item: newFinancialMovement,
        })
        .promise();
      statusCode = 200;
    }
  }

  return {
    statusCode,
    body: JSON.stringify(newFinancialMovement),
  };
};

module.exports = {
  handler: insertFinancialMovement,
};
