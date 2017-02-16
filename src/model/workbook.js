
export const Answer = () => ({
    sectionIndex: 0,
    questionIndex: 0,
    results: [], // array of integers 0 to 4
});



export const Workbook = topic => ({
    topic: topic,
    currentSectionIndex: 0,
    currentQuestionIndex: 0,
    startedAt: new Date(),
    lastAccessed: new Date(),
    completed: 0.0,
    answers: [],
});