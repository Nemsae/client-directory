const config = {
  db: {
    'production': process.env.MONGODB_URI, //  on heroku
    'development': 'mongodb://localhost/client-directory',
    'test': 'mongodb://localhost/client-directory-test'
  }
};

module.exports = config;
