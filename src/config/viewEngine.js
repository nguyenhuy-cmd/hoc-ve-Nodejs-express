import express from 'express';

// Cấu hình ejs và thư mục static files (public)
const configViewEngine = (app) => {
    // config template engine (ejs)
    app.set('views', './src/views');
    // Cài đặt EJS làm template engine chính cho ứng dụng
    app.set('view engine', 'ejs');
    // config static files (public: css, js, imgs)
    app.use(express.static('./src/public'));
};

export default configViewEngine;