const getEnumsArray = (object) => {
  return [...Object.values(object)];
};

const USER_ROLE = { USER: 'user', ADMIN: 'admin' };

module.exports = { USER_ROLE, getEnumsArray };
