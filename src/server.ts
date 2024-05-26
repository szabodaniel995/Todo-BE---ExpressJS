import app from ".";
import dotenv from "dotenv";

const ip = require("ip");

dotenv.config();

const ipAddress = ip.address();
const port = process.env.PORT;

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
	console.log(`IP: ${ipAddress}`);
});
