
export const Question = () => ({
    question: '',
    correctAnswer: '',
});

export const Section = () => ({
    title: '',
    source: '',
    questions: [new Question()], // initialise with one empty question
});

export const Topic = (user) => ({
    name: '',
    description: '',
    author: user.displayName,
    authorUid: user.uid,
    opened: 0,
    rating: 0, // average rating out of 5
    rated: 0, // number of people that rated
    created: new Date(),
    modified: new Date(),
    sections: [new Section()],
    published: false,
});