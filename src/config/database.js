import 'dotenv/config';// lấy từ file .env
import mysql from 'mysql2/promise';

// Thiết lập kết nối tới cơ sở dữ liệu
const connection = await mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'nguyenanhhuy',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // số lượng kết nối nhàn rỗi tối đa; giá trị mặc định bằng với `connectionLimit`
  idleTimeout: 60000, // thời gian chờ cho các kết nối nhàn rỗi (tính bằng mili giây), giá trị mặc định là 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export default connection;
