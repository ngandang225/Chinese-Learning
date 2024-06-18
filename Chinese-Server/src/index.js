require('dotenv');
// require('./config/connectDB');
const express = require('express');
const morgan = require('morgan'); // log các request
const cors = require('cors'); // share tài nguyên giữ các domain
const path = require('path'); // định nghĩa các đường dẫn trong thư mục, bắt đầu từ src
const route = require('./routes');
const PORT = 3001;
const app = express();
// app.use : giống sử dụng middleware
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// logger the request from client
app.use(morgan('combined'));
// handle data from client which have URL-encoded type
app.use(express.urlencoded({ extended: true })); 
// handle data from client which have JSON type
app.use(express.json());

app.use(cors(
    {
        origin: ['http://localhost:3000', 'https://trungvanthuongthuong.com', 'https://www.trungvanthuongthuong.com', 'http://trungvanthuongthuong.com', 'http://www.trungvanthuongthuong.com'],
        methods: 'GET,POST,PUT,PATCH,DELETE', // Cho phép các phương thức GET và POST
        allowedHeaders: 'Content-Type,Authorization', // Cho phép các tiêu đề yêu cầu cụ thể
        credentials: true // Cho phép truy cập với thông tin chứng thực
    }
));

route(app);

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})