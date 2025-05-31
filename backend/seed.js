const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: 'Apple iPhone 14',
    price: 999,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-gold-select?wid=940&hei=1112&fmt=png-alpha&.v=1660753619946',
    category: 'Smartphones',
    stock: 20,
  },
  {
    name: 'Samsung Galaxy S22',
    price: 899,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/in/sm-s901elgdinu/gallery/in-galaxy-s22-s901-412296-sm-s901elgdinu-530668095?$650_519_PNG$',
    category: 'Smartphones',
    stock: 15,
  },
  {
    name: 'Sony WH-1000XM4',
    price: 350,
    image: 'https://cdn.mos.cms.futurecdn.net/TNfPpPZCGD3YkbKCu4ceJi.jpg',
    category: 'Headphones',
    stock: 30,
  },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Product.deleteMany({});
    console.log('Existing products deleted');

    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted');

    mongoose.connection.close();
    console.log('Connection closed, done');
  } catch (err) {
    console.error('Error:', err);
  }
}

seedDB();
