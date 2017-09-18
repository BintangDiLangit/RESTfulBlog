var mongoose = require('mongoose');

// schema
var commentSchema = new mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  created: {type: Date, default: Date.now}
});
// model


module.exports = mongoose.model("Comment", commentSchema);
