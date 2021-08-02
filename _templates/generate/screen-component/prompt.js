module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter component name...',
  },
  {
    type: 'select',
    name: 'folder',
    message: 'Select screen folder...',
    choices: [
      'Login',
      'Home',
      'Bonuses',
      'Profile',
      'Promotions',
      'Stations',
      'CodeConfirm',
      'Onboarding',
      'Registration',
      'BonusCardCheck',
      //ADD MORE SCREENS
    ],
  },
];
