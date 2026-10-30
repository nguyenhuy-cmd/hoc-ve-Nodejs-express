// 1. Nạp các biến môi trường từ file .env vào process.env (PORT, HOST, DB_HOST,...)
import 'dotenv/config';

// 2. Import framework Express để khởi tạo ứng dụng web và RESTful API
import express from 'express';

// 3. Import method-override để hỗ trợ các phương thức HTTP như PUT, DELETE từ form HTML (vốn chỉ hỗ trợ GET/POST)
import methodOverride from 'method-override';

// 4. Import hàm cấu hình View Engine (như EJS) và phục vụ các file tĩnh (static files: css, js, images)
import configViewEngine from './src/config/viewEngine.js';

// 5. Import router xử lý các route giao diện Web truyền thống (SSR)
import router from './src/router/web.js';

// 6. Import hàm kết nối cơ sở dữ liệu MongoDB
import connectDB from './src/config/database.js';

// 7. Import router xử lý các API người dùng/upload (v1/api)
import routerApi from './src/router/api.js';

// 8. Import middleware express-fileupload để tiếp nhận và xử lý file upload từ client
import fileUpload from 'express-fileupload';

// 9. Import router xử lý các API liên quan đến khách hàng (Customer)
import routerCustomer from './src/router/customers.js';
import routerProject from './src/router/project.js';

// Khởi tạo một đối tượng (instance) ứng dụng Express
const app = express();

// Lấy cổng (port) từ file .env, nếu không có thì mặc định chạy port 3000
const port = process.env.PORT || 3000;

// Lấy địa chỉ host từ file .env, nếu không có thì mặc định là 'localhost'
const host = process.env.HOST || 'localhost';

// Kết nối đến MongoDB trước khi server bắt đầu nhận request (dùng top-level await trong ES Module)
await connectDB();

// Cấu hình View Engine (EJS) và thư mục chứa file tĩnh (public) cho ứng dụng
configViewEngine(app);

// Cấu hình middleware upload file
app.use(fileUpload({
    createParentPath: true, // Tự động tạo thư mục lưu trữ nếu thư mục đích chưa tồn tại
    limits: { 
        fileSize: 5 * 1024 * 1024 // Giới hạn kích thước tối đa của mỗi file (5MB = 5 * 1024 * 1024 bytes)
    },
}));

// Middleware phân tích (parse) dữ liệu gửi lên dưới dạng JSON (req.body)
app.use(express.json());

// Middleware phân tích dữ liệu gửi từ form HTML (application/x-www-form-urlencoded) vào req.body
app.use(express.urlencoded({ extended: true }));

// Middleware cho phép ghi đè phương thức HTTP thông qua tham số query hoặc body ?_method=PUT / ?_method=DELETE
app.use(methodOverride('_method'));

// --- Khai báo các Router (Định tuyến) ---
// Route gốc '/' cho các trang web hiển thị giao diện HTML
app.use('/', router);

// Route tiền tố '/v1/api' cho các API người dùng, upload ảnh,...
app.use('/v1/api', routerApi);

// Route tiền tố '/v1/customer' cho các API nghiệp vụ quản lý khách hàng
app.use('/v1/customer', routerCustomer);

app.use('/v1/project', routerProject)

// Bắt đầu lắng nghe các kết nối tới server trên host và port đã cấu hình
app.listen(port, host, () => {
    console.log(`Listening on http://${host}:${port}`);
});

