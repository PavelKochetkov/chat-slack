import * as filter from 'leo-profanity';

const ruDictionary = filter.getDictionary('ru');
filter.add(ruDictionary);

const filteredText = (text) => filter.clean(text);

export default filteredText;
