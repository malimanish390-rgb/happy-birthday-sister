// Edit this file to change the website text.
// Save the file, and Vite will refresh the page automatically while the dev server is running.

export const birthdayPages = {
  homePage: {
    smallLabel: 'For my sister',
    title: 'Happy Birthday',
    subtitle: 'Answer one simple question to unlock your birthday letter.',
    inputPlaceholder: 'By what name do I call you the most?',
    unlockButton: 'Unlock',
    wrongAnswer: "Hmm... I don't usually call you that.",
  },

  mailboxPage: {
    //smallLabel: 'Birthday mailbox',
    titlePrefix: 'To',
    //message: 'Your mailbox has a special birthday message waiting. Open it below.',
  },

  letterPopup: {
    titlePrefix: 'To',
    closeButtonLabel: 'Close letter',
  },
};

// The answer typed on the first page chooses which letter opens.
// Example: if the key is "sister", typing sister unlocks that letter.
export const birthdayLetters = {
  moti: {
    name: 'Moti',
    theme: {
      backgroundOne: '#e8a7a1',
      backgroundTwo: '#fceeed',
      accent: '#5b4b8a',
    },
    message: `Dear Sister,

Happy birthday to the person who makes life warmer, louder, funnier, and better just by being in it.

I hope this year brings you the kind of happiness that stays. The kind that shows up in small moments, in quiet confidence, in big dreams, and in all the little things that make you smile.

You are special to me in ways I do not always say properly, but I hope this little page says at least a part of it.

May your birthday be beautiful, and may the year ahead be even more beautiful.

With love,
Your brother`,
  },
};
