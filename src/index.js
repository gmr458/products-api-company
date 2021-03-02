import "dotenv/config"
import app from "./app";
import "./database/connection";

const PORT = app.get("PORT");

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
