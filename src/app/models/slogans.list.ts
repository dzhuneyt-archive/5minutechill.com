export const randomSlogan = () => {
  const motivationalMessages = [
    'Meditation you can fit in your lunch break.',
    'Your daily dose of chill',
    'Improve your focus and boost productivity',
    'Feeling tired?'
  ];

  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
};
