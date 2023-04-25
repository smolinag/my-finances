const AWS = require("aws-sdk");

const insertFinancialMovement = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  let statusCode = 400;
  let newFinancialMovement = {};
  let data = JSON.parse(event.body); 

  if (data) {
    const dateStr = data.date.split("-");
    const year = dateStr[0];
    const month = dateStr[1];
    const day = dateStr[2];
    newFinancialMovement = {
      id: data.userId,
      rangeId: year + "-" + month + "-" + day + "-" + data.name + "-" + new Date().toLocaleString(),
      name: data.name,
      description: data.description,
      value: data.value,
      movementType: data.movementType,
      incomeCategory: data.incomeCategory,
      expenseCategory: data.expenseCategory,
      date: data.date
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

  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(newFinancialMovement),
  };
};

module.exports = {
  handler: insertFinancialMovement,
};
