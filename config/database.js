// config/database.js
module.exports = {

    'url' :  process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'mongodb://localhost/album' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};
