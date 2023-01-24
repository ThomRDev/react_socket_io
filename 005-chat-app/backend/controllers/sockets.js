const Message = require("../models/Message");
const User = require("../models/User");

const connectedUser = async (uid) => {
  const user = await User.findById(uid);
  user.online = true;
  await user.save();
  return user;
};

const disconnectedUser = async (uid) => {
  const user = await User.findById(uid);
  user.online = false;
  await user.save();
  return user;
};

const getUsers = async () => {
  // const users = await User.find().sort("-online");
  const users = await User.find().sort({
    online: -1,
  });
  return users;
};

const saveMessage = async (payload) => {
  try {
    const msg = new Message(payload);
    await msg.save();
    return msg;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  connectedUser,
  disconnectedUser,
  getUsers,
  saveMessage,
};
