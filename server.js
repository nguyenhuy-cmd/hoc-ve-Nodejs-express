import 'dotenv/config';
import express from 'express';
const app = express(); // app express
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

// config template engine(ejs)
app.set('views', './src/views')
// Cài đặt EJS làm template engine chính cho ứng dụng(ejs)
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  res.send('Hello World!\n');
});

app.get('/abc', (req, res) => {
  res.send('Chào bạn');
});

app.get('/huy', (req, res) => {
  res.render('index.ejs');
});

app.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});
