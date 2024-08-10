import * as filter from 'leo-profanity';

const filteredText = (text) => filter.clean(text);

export default filteredText;
