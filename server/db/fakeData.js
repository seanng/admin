const {
  sequelize,
  Surcharge,
  Stay,
  Hotel,
  Customer,
  Employee,
} = require('./config');

const fakeData = {
  customers: [
    {
      firstName: 'Sean',
      lastName: 'Ng',
      password: 'abc',
      email: 'shonum@gmail.com',
      phoneNo: '96968828',
      rating: 1,
    },
    {
      firstName: 'Reggie',
      lastName: 'Miller',
      password: 'abc',
      email: 'shonum2@gmail.com',
      phoneNo: '91910404',
    },
    {
      firstName: 'Michael',
      lastName: 'Wong',
      password: 'abc',
      email: 'michaelwong@gmail.com',
      phoneNo: '91280102',
    },
    {
      firstName: 'Gigi',
      lastName: 'Wings',
      password: 'abc',
      email: 'chickenwings@gmail.com',
      phoneNo: '99830203',
    },
    {
      firstName: 'Fucking',
      lastName: 'Legend',
      password: 'abc',
      email: 'afuckinglegend@gmail.com',
      phoneNo: '12345678',
    },
  ],
  hotels: [
    {
      name: 'Regal Hotel Wanchai',
      rate: 400.0,
      currency: 'HKD',
      policies: `Lorem ipsum dolor sit amet, pro ut accusamus elaboraret. Ei quidam definitiones eum, ex eruditi tibique definiebas sed. Sed epicurei delicata consequat at. No habeo evertitur duo.

    Epicuri platonem moderatius his id. Pri audiam nominati signiferumque an, mel id mundi aliquam offendit. Ad audiam similique interesset cum, mei malis ubique epicurei ei, ei tota dignissim interpretaris vis. Corrumpit persecuti mel ne, ea eripuit denique argumentum sed, mel id quas noluisse. An aliquam graecis his, ei his malis utinam labores.

    Usu eu alii lucilius dignissim. In iisque mediocritatem pro, ad vel labore salutandi disputando, ad ius assentior instructior. Vis elitr munere ex, at malorum gubergren sit, summo definitionem ei qui. Te sit virtute nominavi persequeris, vel cu idque essent denique, eum no case nobis. Modus scripserit cu his, cum quas dolore ei.

    Nec cu wisi errem. Eu ius reque nobis, nam commune epicurei no, ut sea apeirian comprehensam mediocritatem. Sale aperiri maiestatis pri eu, ea eam dolorem maiorum efficiendi, his te mentitum detraxit. Ferri laoreet deterruisset te sea. His nostro ceteros cu, et liber semper duo.`,
      photos: [
        'https://static.pexels.com/photos/97083/pexels-photo-97083.jpeg',
        'https://static.pexels.com/photos/271639/pexels-photo-271639.jpeg',
        'https://static.pexels.com/photos/271672/pexels-photo-271672.jpeg',
        'https://static.pexels.com/photos/189293/pexels-photo-189293.jpeg',
      ],
      amenities: ['Mini Bar'],
      lat: 22.279148,
      lng: 114.186829,
      address: '88 Yee Wo St, Causeway Bay',
    },
    {
      name: 'Sheraton Hotel Kowloon',
      rate: 400.0,
      currency: 'HKD',
      policies: `Lorem ipsum dolor sit amet, pro ut accusamus elaboraret. Ei quidam definitiones eum, ex eruditi tibique definiebas sed. Sed epicurei delicata consequat at. No habeo evertitur duo.

Epicuri platonem moderatius his id. Pri audiam nominati signiferumque an, mel id mundi aliquam offendit. Ad audiam similique interesset cum, mei malis ubique epicurei ei, ei tota dignissim interpretaris vis. Corrumpit persecuti mel ne, ea eripuit denique argumentum sed, mel id quas noluisse. An aliquam graecis his, ei his malis utinam labores.

Usu eu alii lucilius dignissim. In iisque mediocritatem pro, ad vel labore salutandi disputando, ad ius assentior instructior. Vis elitr munere ex, at malorum gubergren sit, summo definitionem ei qui. Te sit virtute nominavi persequeris, vel cu idque essent denique, eum no case nobis. Modus scripserit cu his, cum quas dolore ei.

Nec cu wisi errem. Eu ius reque nobis, nam commune epicurei no, ut sea apeirian comprehensam mediocritatem. Sale aperiri maiestatis pri eu, ea eam dolorem maiorum efficiendi, his te mentitum detraxit. Ferri laoreet deterruisset te sea. His nostro ceteros cu, et liber semper duo.`,
      photos: [
        'https://static.pexels.com/photos/97083/pexels-photo-97083.jpeg',
        'https://static.pexels.com/photos/271639/pexels-photo-271639.jpeg',
        'https://static.pexels.com/photos/271672/pexels-photo-271672.jpeg',
        'https://static.pexels.com/photos/189293/pexels-photo-189293.jpeg',
      ],
      amenities: [],
      lat: 22.279148,
      lng: 114.186829,
      address: '88 Yee Wo St, Causeway Bay',
    },
    {
      name: 'Stevenage Hotel',
      rate: 400.0,
      currency: 'HKD',
      policies: `Lorem ipsum dolor sit amet, pro ut accusamus elaboraret. Ei quidam definitiones eum, ex eruditi tibique definiebas sed. Sed epicurei delicata consequat at. No habeo evertitur duo.

    Epicuri platonem moderatius his id. Pri audiam nominati signiferumque an, mel id mundi aliquam offendit. Ad audiam similique interesset cum, mei malis ubique epicurei ei, ei tota dignissim interpretaris vis. Corrumpit persecuti mel ne, ea eripuit denique argumentum sed, mel id quas noluisse. An aliquam graecis his, ei his malis utinam labores.

    Usu eu alii lucilius dignissim. In iisque mediocritatem pro, ad vel labore salutandi disputando, ad ius assentior instructior. Vis elitr munere ex, at malorum gubergren sit, summo definitionem ei qui. Te sit virtute nominavi persequeris, vel cu idque essent denique, eum no case nobis. Modus scripserit cu his, cum quas dolore ei.

    Nec cu wisi errem. Eu ius reque nobis, nam commune epicurei no, ut sea apeirian comprehensam mediocritatem. Sale aperiri maiestatis pri eu, ea eam dolorem maiorum efficiendi, his te mentitum detraxit. Ferri laoreet deterruisset te sea. His nostro ceteros cu, et liber semper duo.`,
      photos: [
        'https://static.pexels.com/photos/97083/pexels-photo-97083.jpeg',
        'https://static.pexels.com/photos/271639/pexels-photo-271639.jpeg',
        'https://static.pexels.com/photos/271672/pexels-photo-271672.jpeg',
        'https://static.pexels.com/photos/189293/pexels-photo-189293.jpeg',
      ],
      amenities: [],
      lat: 22.279148,
      lng: 114.186829,
      address: '88 Yee Wo St, Causeway Bay',
    },
    {
      name: 'Westin Hotel',
      rate: 400.0,
      currency: 'HKD',
      policies: `Lorem ipsum dolor sit amet, pro ut accusamus elaboraret. Ei quidam definitiones eum, ex eruditi tibique definiebas sed. Sed epicurei delicata consequat at. No habeo evertitur duo.

    Epicuri platonem moderatius his id. Pri audiam nominati signiferumque an, mel id mundi aliquam offendit. Ad audiam similique interesset cum, mei malis ubique epicurei ei, ei tota dignissim interpretaris vis. Corrumpit persecuti mel ne, ea eripuit denique argumentum sed, mel id quas noluisse. An aliquam graecis his, ei his malis utinam labores.

    Usu eu alii lucilius dignissim. In iisque mediocritatem pro, ad vel labore salutandi disputando, ad ius assentior instructior. Vis elitr munere ex, at malorum gubergren sit, summo definitionem ei qui. Te sit virtute nominavi persequeris, vel cu idque essent denique, eum no case nobis. Modus scripserit cu his, cum quas dolore ei.

    Nec cu wisi errem. Eu ius reque nobis, nam commune epicurei no, ut sea apeirian comprehensam mediocritatem. Sale aperiri maiestatis pri eu, ea eam dolorem maiorum efficiendi, his te mentitum detraxit. Ferri laoreet deterruisset te sea. His nostro ceteros cu, et liber semper duo.`,
      photos: [
        'https://static.pexels.com/photos/97083/pexels-photo-97083.jpeg',
        'https://static.pexels.com/photos/271639/pexels-photo-271639.jpeg',
        'https://static.pexels.com/photos/271672/pexels-photo-271672.jpeg',
        'https://static.pexels.com/photos/189293/pexels-photo-189293.jpeg',
      ],
      amenities: [],
      lat: 22.279148,
      lng: 114.186829,
      address: '88 Yee Wo St, Causeway Bay',
    },
    {
      name: 'W Hotel',
      rate: 400.0,
      currency: 'HKD',
      policies: `Lorem ipsum dolor sit amet, pro ut accusamus elaboraret. Ei quidam definitiones eum, ex eruditi tibique definiebas sed. Sed epicurei delicata consequat at. No habeo evertitur duo.

    Epicuri platonem moderatius his id. Pri audiam nominati signiferumque an, mel id mundi aliquam offendit. Ad audiam similique interesset cum, mei malis ubique epicurei ei, ei tota dignissim interpretaris vis. Corrumpit persecuti mel ne, ea eripuit denique argumentum sed, mel id quas noluisse. An aliquam graecis his, ei his malis utinam labores.

    Usu eu alii lucilius dignissim. In iisque mediocritatem pro, ad vel labore salutandi disputando, ad ius assentior instructior. Vis elitr munere ex, at malorum gubergren sit, summo definitionem ei qui. Te sit virtute nominavi persequeris, vel cu idque essent denique, eum no case nobis. Modus scripserit cu his, cum quas dolore ei.

    Nec cu wisi errem. Eu ius reque nobis, nam commune epicurei no, ut sea apeirian comprehensam mediocritatem. Sale aperiri maiestatis pri eu, ea eam dolorem maiorum efficiendi, his te mentitum detraxit. Ferri laoreet deterruisset te sea. His nostro ceteros cu, et liber semper duo.`,
      photos: [
        'https://static.pexels.com/photos/97083/pexels-photo-97083.jpeg',
        'https://static.pexels.com/photos/271639/pexels-photo-271639.jpeg',
        'https://static.pexels.com/photos/271672/pexels-photo-271672.jpeg',
        'https://static.pexels.com/photos/189293/pexels-photo-189293.jpeg',
      ],
      amenities: [],
      lat: 22.279148,
      lng: 114.186829,
      address: '88 Yee Wo St, Causeway Bay',
    },
  ],
  employees: [
    {
      hotelId: 1,
      firstName: 'BigFat',
      lastName: 'Loser',
      email: 'tester@testhotel.com',
      password: 'asdfasdf',
    },
    {
      hotelId: 1,
      firstName: 'BigFat',
      lastName: 'Winner',
      email: 'tester2@testhotel.com',
      password: 'asdfasdf',
    },
    {
      hotelId: 2,
      firstName: 'Meow',
      lastName: 'Wolfcat',
      email: 'test@sheraton.com',
      password: 'asdfasdf',
    },
  ],
  stays: [
    {
      id: 1,
      hotelId: 1,
      customerId: 1,
      status: 'Checked Out',
      roomNumber: 410,
      bookingTime: 1491015600000,
      checkInTime: 1491019200000,
      checkOutTime: 1491026400000,
      roomCharge: 800.0,
      totalCharge: 850.05,
    },
    {
      id: 2,
      hotelId: 1,
      customerId: 2,
      status: 'Checked Out',
      roomNumber: 1029,
      bookingTime: 1491026400000,
      checkInTime: 1491031800000,
      checkOutTime: 1491042600000,
      roomCharge: 1200.0,
      totalCharge: 1338.0,
    },
    {
      id: 3,
      hotelId: 1,
      customerId: 3,
      status: 'Checked Out',
      roomNumber: 1023,
      bookingTime: 1491129000000,
      checkInTime: 1491131700000,
      checkOutTime: 1491138900000,
      roomCharge: 800.0,
      totalCharge: 900.18,
    },
  ],
  surcharges: [
    {
      stayId: 1,
      service: 'Massage',
      status: 'Unsettled',
      charge: 30.05,
    },
    {
      stayId: 1,
      service: 'Room Service',
      status: 'Unsettled',
      charge: 20.0,
    },
    {
      stayId: 2,
      service: 'Room Service',
      status: 'Unsettled',
      charge: 25.5,
    },
    {
      stayId: 2,
      service: 'Room Service',
      status: 'Unsettled',
      charge: 102.5,
    },
    {
      stayId: 2,
      service: 'Pay TV',
      status: 'Unsettled',
      charge: 10.0,
    },
    {
      stayId: 3,
      service: 'Pay TV',
      status: 'Unsettled',
      charge: 100.18,
    },
  ],
};

module.exports = {
  preloadData: () => {
    sequelize.sync({ force: true }).then(() =>
      fakeData.customers
        .reduce((promiseChain, customer) => {
          const { firstName, lastName, email, phoneNo, password } = customer;
          return Customer.create({
            firstName,
            lastName,
            email,
            phoneNo,
            password,
          });
        }, Promise.resolve())
        .then(() =>
          fakeData.hotels
            .reduce((promiseChain, hotel) => {
              const {
                name,
                rate,
                currency,
                policies,
                photos,
                amenities,
                lat,
                lng,
                address,
              } = hotel;
              return Hotel.create({
                name,
                rate,
                currency,
                policies,
                photos,
                amenities,
                lat,
                lng,
                address,
              });
            }, Promise.resolve())
            .then(() =>
              fakeData.stays
                .reduce((promiseChain, stay) => {
                  const {
                    hotelId,
                    customerId,
                    status,
                    roomNumber,
                    bookingTime,
                    checkInTime,
                    checkOutTime,
                    totalCharge,
                    roomCharge,
                  } = stay;
                  return Stay.create({
                    hotelId,
                    customerId,
                    status,
                    roomNumber,
                    bookingTime,
                    checkInTime,
                    checkOutTime,
                    totalCharge,
                    roomCharge,
                  });
                }, Promise.resolve())
                .then(() =>
                  fakeData.surcharges
                    .reduce((promiseChain, surcharge) => {
                      const { stayId, service, status, charge } = surcharge;
                      return Surcharge.create({
                        stayId,
                        service,
                        status,
                        charge,
                      });
                    }, Promise.resolve())
                    .then(() =>
                      fakeData.employees.reduce((promiseChain, employee) => {
                        const {
                          hotelId,
                          email,
                          firstName,
                          lastName,
                          password,
                        } = employee;
                        return Employee.create({
                          hotelId,
                          email,
                          firstName,
                          lastName,
                          password,
                        });
                      }, Promise.resolve()),
                    ),
                ),
            ),
        ),
    );
  },
};
