const Message = require("../models/Message");

const getChat = async (req, res) => {
  const from = req.uid;
  // /:to
  const to = req.params.to;

  const last30 = await Message.find({
    $or: [
      {
        // mensajes que from envio a to
        from,
        to,
      },
      {
        // mensajes que to envio a from
        from: to,
        to: from,
      },
    ],
  })
    .sort({ createdAt: -1 })
    // .sort({ _id: -1 })
    .limit(30);

  res.json({
    ok: true,
    messages: last30.reverse(),
    // messages: last30.slice(last30.length <= 30 ? 0 : last30.length - 30),
  });
};

module.exports = {
  getChat,
};
