import * as filter from 'leo-profanity';
import russianProfanity from '../dictionary/russianProfanity.json';

filter.add(russianProfanity);

const filteredText = (text) => filter.clean(text);

export default filteredText;
