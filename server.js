import 'dotenv/config';
import express from 'express';
import methodOverride from 'method-override';
import configViewEngine from './src/config/viewEngine.js';
import router from './src/router/web.js';
import connectDB from './src/config/database.js';
import routerApi from './src/router/api.js';
import fileUpload from 'express-fileupload'
import routerCustomer from './src/router/customers.js';

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

// kết nối MongoDB trước khi start server
await connectDB();

configViewEngine(app);

app.use(fileUpload({
  createParentPath: true, // Tự động tạo thư mục lưu trữ nếu chưa có
    limits: { 
        fileSize: 5 * 1024 * 1024 // Giới hạn kích thước file (Ví dụ: tối đa 5MB)
    },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



//Khai báo router
app.use('/', router);
app.use('/v1/api', routerApi);
app.use('/v1/customer', routerCustomer);


app.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});
