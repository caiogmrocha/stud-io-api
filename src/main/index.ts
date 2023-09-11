import { app } from "./http";

const HOST = process.env.HTTP_HOST;
const PORT = process.env.HTTP_PORT;

app.listen(PORT, () => console.log(`Server is running at http://${HOST}:${PORT}`));
