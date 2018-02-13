const { sequelize } = require('./config');
const { Surcharge, Stay, Hotel, Customer, Employee } = require('./models');

const fakeData = {
  customers: [
    {
      firstName: 'Sean',
      lastName: 'Ng',
      password: 'abc',
      email: 'shonum@gmail.com',
      phoneNumber: '96968828',
      rating: 1,
    },
    {
      firstName: 'Reggie',
      lastName: 'Miller',
      password: 'abc',
      email: 'shonum2@gmail.com',
      phoneNumber: '91910404',
    },
    {
      firstName: 'Michael',
      lastName: 'Wong',
      password: 'abc',
      email: 'michaelwong@gmail.com',
      phoneNumber: '91280102',
    },
    {
      firstName: 'Gigi',
      lastName: 'Wings',
      password: 'abc',
      email: 'chickenwings@gmail.com',
      phoneNumber: '99830203',
    },
    {
      firstName: 'Fucking',
      lastName: 'Legend',
      password: 'abc',
      email: 'afuckinglegend@gmail.com',
      phoneNumber: '12345678',
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
      amenities: ['miniBar'],
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
      phoneNumber: '(852) 9193-4810',
      password: 'asdfasdf',
      verified: true,
      photoUrl:
        'https://upload.wikimedia.org/wikipedia/en/5/5e/Avatar%28Neytiri%29.jpg',
      adminLevel: 2,
    },
    {
      hotelId: 1,
      firstName: 'Andrew',
      lastName: 'Stevenson',
      email: 'tester2@testhotel.com',
      phoneNumber: '(852) 9193-4810',
      password: 'asdfasdf',
      verified: true,
      inviterId: 1,
      photoUrl:
        'https://upload.wikimedia.org/wikipedia/en/5/5e/Avatar%28Neytiri%29.jpg',
      adminLevel: 1,
    },
    {
      hotelId: 1,
      firstName: 'Thierry',
      lastName: 'Henry',
      email: 'tester3@testhotel.com',
      phoneNumber: '(852) 9193-4810',
      password: 'asdfasdf',
      verified: true,
      inviterId: 1,
      photoUrl:
        'https://upload.wikimedia.org/wikipedia/en/5/5e/Avatar%28Neytiri%29.jpg',
      adminLevel: 1,
    },
    {
      hotelId: 1,
      firstName: 'Danny',
      lastName: 'Welbeck',
      email: 'tester4@testhotel.com',
      phoneNumber: '(852) 9193-4810',
      password: 'asdfasdf',
      inviterId: 1,
      photoUrl:
        'https://upload.wikimedia.org/wikipedia/en/5/5e/Avatar%28Neytiri%29.jpg',
      adminLevel: 1,
    },
    {
      hotelId: 1,
      firstName: 'Sherlock',
      lastName: 'Holmes',
      email: 'tester5@testhotel.com',
      phoneNumber: '(852) 9193-4810',
      password: 'asdfasdf',
      inviterId: 1,
      verified: true,
      photoUrl:
        'https://upload.wikimedia.org/wikipedia/en/5/5e/Avatar%28Neytiri%29.jpg',
      adminLevel: 1,
    },
    {
      hotelId: 1,
      firstName: 'Dikembe',
      lastName: 'Wjinaldum',
      email: 'tester6@testhotel.com',
      phoneNumber: '(852) 9193-4810',
      password: 'asdfasdf',
      verified: false,
      inviterId: 1,
      photoUrl:
        'https://upload.wikimedia.org/wikipedia/en/5/5e/Avatar%28Neytiri%29.jpg',
      adminLevel: 2,
    },
    {
      hotelId: 1,
      firstName: 'Shaquille',
      lastName: "O'Neal",
      email: 'tester7@testhotel.com',
      phoneNumber: '(852) 9193-4810',
      password: 'asdfasdf',
      verified: true,
      inviterId: 2,
      photoUrl:
        'https://upload.wikimedia.org/wikipedia/en/5/5e/Avatar%28Neytiri%29.jpg',
      adminLevel: 2,
    },
    {
      hotelId: 2,
      firstName: 'Meow',
      lastName: 'Wolfcat',
      email: 'test@sheraton.com',
      verified: true,
      phoneNumber: '(852) 9193-4810',
      photoUrl:
        'https://upload.wikimedia.org/wikipedia/en/5/5e/Avatar%28Neytiri%29.jpg',
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

module.exports = () =>
  sequelize
    .sync({ force: true })
    .then(() =>
      fakeData.customers
        .reduce(
          (promiseChain, customer) => Customer.create(customer),
          Promise.resolve()
        )
        .then(() =>
          fakeData.hotels
            .reduce(
              (promiseChain, hotel) => Hotel.create(hotel),
              Promise.resolve()
            )
            .then(() =>
              fakeData.stays
                .reduce(
                  (promiseChain, stay) => Stay.create(stay),
                  Promise.resolve()
                )
                .then(() =>
                  fakeData.surcharges
                    .reduce(
                      (promiseChain, surcharge) => Surcharge.create(surcharge),
                      Promise.resolve()
                    )
                    .then(() =>
                      fakeData.employees.reduce(
                        (promiseChain, employee) => Employee.create(employee),
                        Promise.resolve()
                      )
                    )
                )
            )
        )
    );
