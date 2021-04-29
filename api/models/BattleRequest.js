const mongoose = require("mongoose");

const RequestBattle = mongoose.Schema({
  requested: String,
  requester: String,
  cryptureId: String,
  cherishAmount: Number,
});

module.exports = mongoose.model("RequestBattle", RequestBattle);
