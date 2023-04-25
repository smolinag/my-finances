const AWS = require("aws-sdk");

const updateFinancialMovement = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  let statusCode = 400;
  let newFinancialMovement = {};
  let data = JSON.parse(event.body);

  console.log(event);

  if (data) {
    const id = data.userId;
    const rangeId = data.rangeId;
    const dateStr = data.date.split("-");
    const year = dateStr[0];
    const month = dateStr[1];
    const day = dateStr[2];

    let params = {
      Key: { id: id, rangeId: rangeId },
      TableName: "FinancialMovements",
    };
    console.log(params);
    await dynamoDB
      .delete(params, (err, data) => {
        if (err) {
          console.log(err);
        } 
      })
      .promise();

    newFinancialMovement = {
      id: data.userId,
      rangeId:
        year + "-" + month + "-" + day + "-" + data.name + "-" + new Date().toLocaleString(),
      name: data.name,
      description: data.description,
      value: data.value,
      movementType: data.movementType,
      incomeCategory: data.incomeCategory,
      expenseCategory: data.expenseCategory,
      date: data.date,
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
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(newFinancialMovement),
  };
};

module.exports = {
  handler: updateFinancialMovement,
};
