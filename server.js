import 'dotenv/config';
import express from 'express';
import configViewEngine from './src/config/viewEngine.js';
import router from './src/router/web.js';
import connection from './src/config/database.js';
const app = express(); // app express
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

// công cụ tạo cấu hình theo mẫu ở giao diện
configViewEngine(app);

// cấu hình req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// khai báo route
app.use('/', router);



app.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});
