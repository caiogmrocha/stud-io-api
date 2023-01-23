import { app } from "./server";

const port = process.env.HTTP_SERVER_PORT;

app.listen(port, () => console.log(`Server is running at http://127.0.0.1:${port}`));
