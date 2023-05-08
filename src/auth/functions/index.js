function handleUserResponse(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    userPin: user.userPin,
    dateOfBirth: user.dateOfBirth,
    phone: user.phone,
    address: user.address,
    state: user.state,
    userRole: user.userRole,
    photo: user.photo,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

module.exports = { handleUserResponse };
