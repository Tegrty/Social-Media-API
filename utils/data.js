// Data to seed the user collection

// Social media usernames arrays
const adjectives = ['happy', 'friendly', 'silly', 'bubbly', 'crazy', 'cool', 'dope', 'epic', 'funky', 'geeky', 'happy', 'jazzy', 'lively', 'mellow', 'quirky', 'rockin', 'sassy', 'sweet', 'trendy', 'vibrant'];
const nouns = ['panda', 'unicorn', 'tiger', 'lion', 'kitten', 'puppy', 'dolphin', 'octopus', 'monkey', 'koala', 'eagle', 'owl', 'dragon', 'mermaid', 'pirate', 'ninja', 'robot', 'alien', 'wizard', 'viking'];

// Generate random usernames
const usernames = [];
for (let i = 0; i < 10; i++) {
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]; // Math.floor(Math.random() * adjectives.length) will return a random number between 0 and the length of the adjectives array
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]; // Math.floor(Math.random() * nouns.length) will return a random number between 0 and the length of the nouns array
  usernames.push(`${randomAdjective}_${randomNoun}_${Math.floor(Math.random() * 100)}`); // Math.floor(Math.random() * 100) will return a random number between 0 and 99 and we'll add that to the end of the username
};








// Email domains array
const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com'];

// Generate random email addresses
function generateRandomEmail() {
  const randomName = Math.random().toString(36).substring(2, 8);
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${randomName}@${randomDomain}`;
}

// Generate 10 random email addresses
const emails = [];
for (let i = 0; i < 10; i++) {
  emails.push(generateRandomEmail());
}







// Generate 10 random thoughts
const thoughts = [];
for (let i = 0; i < 10; i++) {
    thoughts.push({
        thoughtText: `This is thought ${i + 1}`,
        username: usernames[Math.floor(Math.random() * usernames.length)],
        createdAt: new Date()
    });
};




module.exports = { usernames, emails, thoughts};