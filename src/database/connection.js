import { connect, connection } from "mongoose";
import isOnline from "is-online";

const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_NAME_DB } = process.env;

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
};

isOnline().then((isConnected) => {

  let uris = "";

  if (isConnected) {
    if (MONGO_USER && MONGO_PASSWORD && MONGO_HOST && MONGO_NAME_DB) {
      uris = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_NAME_DB}?retryWrites=true&w=majority`;
    } else {
      console.log("The required environment variables are undefined.");
      process.exit(0);
    }
  } else {
    if (MONGO_USER && MONGO_PASSWORD && MONGO_HOST && MONGO_NAME_DB) {
      uris = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_NAME_DB}`;
    } else {
      uris = "mongodb://localhost/products-api-company";
    }
  }

  connect(uris, connectionOptions);

  const conn = connection;

  conn
    .once("open", () =>
      console.log("The connection to the database was established")
    )
    .on("error", (error) => {
      console.log(error);
      process.exit(0);
    });
    
});
