import app from "./app";

const PORT = app.get("PORT");

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


