export {};
let str = 'abcde'

const reverseString = (word: string): string => {
  
  if(word.length === 0) {
    return ''
  }

  return word[word.length -1] + reverseString(word.slice(0, -1));
};

console.log(1111111, reverseString(str));
