const ApiError = require("../../helpers/error");

const verifyStatus = (event) => {
  if (!event) {
    throw new ApiError("Did not get an event");
  }

  let eventResult;
  if (event.event === "customeridentification.failed") {
    eventResult = "Event failed";
  } else if (event.event === "charge.dispute.create") {
    eventResult = "Event has a dispute issue";
  } else if (event.event === "customeridentification.success") {
    eventResult = "Event Successful";
  }

  // eventData = event.data
  return eventResult;
};

module.exports = verifyStatus;
