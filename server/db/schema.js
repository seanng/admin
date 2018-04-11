const { getConfigurationValue } = require('../config').env;
const Sequelize = require('sequelize');

const dbConfig = getConfigurationValue('postgres');
const sequelize = new Sequelize(
  dbConfig.dbName,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: 'postgres',
  }
);

/* Schema Definitions */
const Customer = sequelize.define('customer', {
  username: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
  facebookId: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: { type: Sequelize.STRING, unique: true },
  phoneNumber: Sequelize.STRING,
  avatarUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://d30y9cdsu7xlg0.cloudfront.net/png/547789-200.png',
  },
  accountStatus: Sequelize.INTEGER,
  paymentAuthStatus: Sequelize.INTEGER,
  rating: Sequelize.FLOAT,
  stripeId: Sequelize.STRING,
});

const Employee = sequelize.define('employee', {
  username: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
  verified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  inviterId: Sequelize.INTEGER,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: { type: Sequelize.STRING, unique: true },
  phoneNumber: Sequelize.STRING,
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://d30y9cdsu7xlg0.cloudfront.net/png/547789-200.png',
  },
  adminLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  }, // level 1: staff, level 2: admin, level 3: super-user? (i.e. customer service)
});

const Hotel = sequelize.define('hotel', {
  name: Sequelize.STRING,
  locationAddress: Sequelize.STRING,
  locationLatitude: Sequelize.STRING,
  locationLongitude: Sequelize.STRING,
  costCurrency: Sequelize.STRING,
  costMinCharge: Sequelize.FLOAT,
  costPerHour: Sequelize.FLOAT,
  costPerMinute: Sequelize.FLOAT,
  photos: Sequelize.ARRAY(Sequelize.STRING), // array[0] would be the primary photoURL
  description: Sequelize.TEXT,
  amenities: Sequelize.ARRAY(Sequelize.STRING), // i.e. 'Free WiFi'
  paymentInfo: Sequelize.JSON, // <-- this needs to be looked into further
  rating: Sequelize.DECIMAL,
  roomType: Sequelize.STRING,
  stripeAccount: Sequelize.STRING,
});

const Stay = sequelize.define('stay', {
  status: Sequelize.STRING, // AVAILABLE, BOOKED, CANCELLED?, CHECKED IN, CHECKED OUT,
  bookingTime: Sequelize.DATE,
  checkInTime: Sequelize.DATE, // Update on check in
  checkOutTime: Sequelize.DATE, // Update on check out
  roomNumber: Sequelize.STRING, // Update on create Room
  roomType: Sequelize.STRING,
  roomCharge: Sequelize.FLOAT,
  totalCharge: Sequelize.FLOAT,
});

const Surcharge = sequelize.define('surcharge', {
  service: Sequelize.STRING,
  status: Sequelize.STRING,
  charge: Sequelize.FLOAT,
});

/* Relationships */
Customer.hasMany(Stay);
Stay.belongsTo(Customer);

Hotel.hasMany(Stay);
Stay.belongsTo(Hotel);

Stay.hasMany(Surcharge);
Surcharge.belongsTo(Stay);

Hotel.hasMany(Employee);
Employee.belongsTo(Hotel);

module.exports = {
  sequelize,
  Customer,
  Hotel,
  Stay,
  Employee,
  Surcharge,
};
