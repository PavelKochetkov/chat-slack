import * as filter from 'leo-profanity';

const addRussianDictionary = (dictionary) => {
  const ruDictionary = filter.getDictionary(dictionary);

  return filter.add(ruDictionary);
};

export default addRussianDictionary;
