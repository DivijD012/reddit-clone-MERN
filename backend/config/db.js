const  mongoose = require("mongoose");

var uri = "HandshakeError', 'ResetPool";

const  options = {
  useNewUrlParser:  true,
  useUnifiedTopology:  true
  };

mongoose.connect("mongodb+srv://divijd111:passwordstrong@newcluster.wobr631.mongodb.net/?retryWrites=true&w=majority", options).then(() => {
  console.log("Database connection established!");
  },
  err  => {
  {
  console.log("Error connecting Database instance due to:", err);
  }
  });