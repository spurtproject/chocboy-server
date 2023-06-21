const getEnumsArray = (object) => {
  return [...Object.values(object)];
};

const USER_ROLE = Object.freeze({ USER: "user", ADMIN: "admin" });

const TRANSACTION_STATUS = Object.freeze({
  SUCCESSFUL: "successful",
  PENDING: "pending",
  FAILED: "failed",
});

const PLATFORM = Object.freeze({
  PAYSTACK: "paystack",
});

const PAYMENT_STATUS = Object.freeze({
  PENDING: "pending",
  PAID: "paid",
});

const BLOG_CLASS = Object.freeze({
  ARTICLE: "article",
  RECIPE: "recipe",
});

module.exports = {
  USER_ROLE,
  TRANSACTION_STATUS,
  getEnumsArray,
  PLATFORM,
  PAYMENT_STATUS,
  BLOG_CLASS,
};
