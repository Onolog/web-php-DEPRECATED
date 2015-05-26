/**
 * Dummy data for UI Explorer
 */
define({

  FRIENDS: [
    { id: 4280, name: 'Paul McDonald'},
    { id: 11, name: 'Soleio'},
    { id: 509191417, name: 'Jessica Shambora'}
  ],

  SHOES: [{
    label: 'Active',
    options: [
      { value: '42', label: "Mizuno Waverider 17.4"},
      { value: "41", label: "ASICS DS Trainer 19"}
    ]
  }, {
    label: 'Inactive',
    options: [
      { value: "40", label: "Mizuno Waverider 17.3" },
      { value: "39", label: "Mizuno Waverider 17.2" },
      { value: "34", label: "Mizuno Waverider 16.1" }
    ]
  }],

  WORKOUTS: {
    '2014': {
      '9': {
        '29': [{
          id: 1398,
          user_id: 517820043,
          distance: 7.00,
          shoe_id: 40,
          notes:
            'Easy loop around Los Altos Hills w/Jess. \n\n' +
            'http://connect.garmin.com/modern/activity/577839651',
          date: 1405234800,
          time: 4001,
          friends: [{
            id: 509191417,
            name: 'Jessica Shambora'
          }]
        }]
      },
      '10': {
        '14': [{
          id: 1399,
          user_id: 517820043,
          distance: 6.71,
          shoe_id: 40,
          notes:
            'Babies, Buckles & Beer (B^3). Easy run around Los Altos Hills w/some ' +
            'of the Varsity crew and others, then lunch and beer at mexican place ' +
            'in Los Altos.\n\n' +
            'http://connect.garmin.com/modern/activity/577839638',
          date: 1404630000,
          time: 3867,
        }],
        '21': [{
          athlete: {
            id: 517820043,
            name: 'Eric Giovanola'
          },
          id: 1400,
          user_id: 517820043,
          distance: 6.54,
          shoe_id: 40,
          shoes: {
            id: 40,
            name: 'Mizuno Waverider 18.1'
          },
          notes:
            'Last couple legs of WSER with Paul, starting from Hwy 49 crossing ' +
            'around 5:45 and finishing in Auburn at 7:15.\n\n' +
            'http://connect.garmin.com/modern/activity/577839638',
          date: 1404025200,
          time: 5747,
          friends: [{
            id: 4280,
            name: 'Paul McDonald'
          }]
        }, {
          athlete: {
            id: 517820043,
            name: 'Eric Giovanola'
          },
          id: 1411,
          user_id: 517820043,
          distance: 13.78,
          shoe_id: 41,
          shoes: {
            id: 40,
            name: 'Mizuno Waverider 18.1'
          },
          notes:
            'Long run with Paul in San Carlos. First did a loop around the ' +
            'neighborhood with Patrick, then dropped him off and headed out ' +
            'to Edgewood Park. Did a loop there and came back. Remarked to ' +
            'Paul that my HR was fine, but my legs felt terrible. Need new ' +
            'shoes.\n\n' +
            'http://connect.garmin.com/modern/activity/612283575',
          date: 1413097200,
          time: 7781,
          friends: [{
            id: 4280,
            name: 'Paul McDonald'
          }, {
            id: 11,
            name: 'Soleio'
          }]
        }]
      }
    }
  }

});
