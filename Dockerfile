# Sử dụng image Node.js phiên bản Alpine (nhỏ gọn)
FROM node:18-alpine

# Tạo và đặt thư mục làm việc bên trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json (nếu có) trước để tận dụng Docker cache
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn còn lại của dự án vào container
COPY . .

# Mở cổng 3000 (hoặc cổng ứng dụng của bạn)
EXPOSE 3000

# Lệnh để khởi chạy ứng dụng (ví dụ: chạy bằng lệnh dev hoặc start trong package.json)
CMD ["npm", "run", "start:dev"]