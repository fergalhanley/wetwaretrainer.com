
const emptyTopics = {
    userTopics: [],
    communityTopics: [],
};

const topicsReducer = (state=emptyTopics, actions) => {
    switch (actions.type) {
        default:
            return state;
    }
};


export default topicsReducer;
