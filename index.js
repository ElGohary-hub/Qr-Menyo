const express = require('express');
const qrcode = require('qrcode');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let menuItems = [];
const restaurantName = "اسم المطعم بتاعك"; 

// المسار الجديد: توجيه تلقائي لصفحة المنيو
app.get('/', (req, res) => {
  res.redirect('/menu');
});

app.get('/admin', async (req, res) => {
  const menuUrl = `${req.protocol}://${req.get('host')}/menu`;
  const qrImage = await qrcode.toDataURL(menuUrl);
  res.render('admin', { items: menuItems, qrImage, menuUrl, restaurantName });
});

app.post('/admin/add', (req, res) => {
  const { name, desc, price, image } = req.body;
  menuItems.push({ name, desc, price, image });
  res.redirect('/admin');
});

app.get('/menu', (req, res) => {
  res.render('menu', { items: menuItems, restaurantName });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running');
});
