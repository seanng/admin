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
  regDate: Sequelize.DATE,
  username: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: { type: Sequelize.STRING, unique: true },
  phoneNumber: Sequelize.STRING,
  avatarUrl: Sequelize.STRING,
  accountStatus: Sequelize.INTEGER,
  paymentAuthStatus: Sequelize.INTEGER,
  stripeKey: Sequelize.STRING, // <-- this needs to be looked into further
  rating: Sequelize.DECIMAL,
});

const Employee = sequelize.define('employee', {
  regDate: Sequelize.DATE,
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
  regDate: Sequelize.DATE,
  name: Sequelize.STRING,
  locationAddress: Sequelize.STRING,
  locationLatitude: Sequelize.STRING,
  locationLongitude: Sequelize.STRING,
  costCurrency: Sequelize.STRING,
  costMinCharge: Sequelize.DECIMAL(10, 2),
  costPerHour: Sequelize.DECIMAL(10, 2),
  costPerMinute: Sequelize.DECIMAL(10, 2),
  photos: Sequelize.ARRAY(Sequelize.STRING), // array[0] would be the primary photoURL
  description: Sequelize.TEXT,
  amenities: Sequelize.ARRAY(Sequelize.STRING), // i.e. 'Free WiFi'
  paymentInfo: Sequelize.JSON, // <-- this needs to be looked into further
  rating: Sequelize.DECIMAL,
  roomType: Sequelize.STRING,
});

const Stay = sequelize.define('stay', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: Sequelize.STRING,
  bookingTime: Sequelize.DATE,
  checkInTime: Sequelize.DATE, // Update on check in
  checkOutTime: Sequelize.DATE, // Update on check out
  roomNumber: Sequelize.STRING, // Update on create Room
  roomType: Sequelize.STRING,
  roomCharge: Sequelize.DECIMAL(10, 2),
  totalCharge: Sequelize.DECIMAL(10, 2),
});

const Surcharge = sequelize.define('surcharge', {
  service: Sequelize.STRING,
  status: Sequelize.STRING,
  charge: Sequelize.DECIMAL(10, 2),
});

/* Relationships */
Customer.belongsToMany(Hotel, { through: Stay });
Hotel.belongsToMany(Customer, { through: Stay });

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
