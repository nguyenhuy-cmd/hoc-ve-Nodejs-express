const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const productRouter = require('./modules/product/product.router')
// 🟢 Thêm dòng này để Express hiểu và đọc được dữ liệu JSON gửi lên
app.use(express.json());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Cài đặt views
app.set('view engine', 'ejs');
app.set('views', './views'); // ✅ Sửa từ 'view' thành 'views' và bỏ dấu hai chấm đi

/* static:
+ HTML / CSS / JavaScript (chạy ở trình duyệt)
+ Hình ảnh (.jpg, .png, .svg, .gif,...)
+ Fonts chữ, Audio, Video hoặc các tài liệu tĩnh khác.
*/
app.use(express.static('public'))

app.use('/', productRouter)
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});