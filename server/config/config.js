// ==================================
//  Puerto
// ==================================

process.env.PORT = process.env.PORT || 3000;

// ==================================
//  enviroment
// ==================================

process.env.NODE_ENV = process.env.NODE_ENV || 'env';

// ==================================
//  database
// ==================================
let urlDB;

// if (process.env.NODE_ENV === 'dev'){
//     urlDB = 'mongodb://localhost:27017/cafe';
// } else {
//     urlDB = 'mongodb://cafe-user:Sanmarcos18@ds119422.mlab.com:19422/cafe-mendives';
// }
urlDB = 'mongodb://cafe-user:Sanmarcos18@ds119422.mlab.com:19422/cafe-mendives';
process.env.URL_DB = urlDB;