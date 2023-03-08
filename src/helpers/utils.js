const buildCreditAggregationPipeline = async (filter) => {
  return [
    { $match: { ...filter } },
    {
      $group: {
        _id: { $month: '$createdAt' },
        totalAmount: { $sum: '$amount' },
      },
    },
    { $project: { _id: 0, month: '$_id', totalAmount: '$totalAmount' } },
  ];
};

const convertToMonthlyDataArray = async (dataArray, dataField) => {
  // console.log(dataArray);
  // console.log(dataField);
  // 1 <= i <= 12 because there are 12 months in a year
  const monthlyData = [];
  // console.log(monthlyData);
  for (let i = 1; i <= 12; i++) {
    let currentMonthData = dataArray.find((data) => data.month === i);

    // console.log(currentMonthData);
    if (!currentMonthData) {
      monthlyData.push({ month: i, [dataField]: 0 });
    } else {
      monthlyData.push(currentMonthData);
      // console.log(monthlyData);
    }
  }

  return monthlyData.sort().map((data) => data[dataField]);
};

module.exports = { buildCreditAggregationPipeline, convertToMonthlyDataArray };
