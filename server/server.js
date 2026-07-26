import 'dotenv/config';

import app from "./src/app.js";

import connectDB from "./src/db/db.js";


connectDB();

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});




