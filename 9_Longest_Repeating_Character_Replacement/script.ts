export {};
let s = "AAABABB";
let k = 1;

const characterReplacement = (s: string, k: number): number => {
  let lib = new Map();
  let l = 0;
  let r = 0;
  let maxRes = 0;

  while (r < s.length) {
    lib.set(s[r], lib.get(s[r]) + 1 || 1);
    r++;
    let values = Array.from(lib.values());
    let currentCountLetters = values.reduce((acc, a) => acc + a, 0);
    let mostFreqLetter = Math.max(...values);
    if (currentCountLetters - mostFreqLetter > k) {
      lib.set(s[l], lib.get(s[l]) - 1);
      l++;
    }

    let newValues = Array.from(lib.values());
    let newCurrentCountLetters = newValues.reduce((acc, a) => acc + a, 0);
    if (newCurrentCountLetters > maxRes) {
      maxRes = newCurrentCountLetters;
    }
  }

  return maxRes;
};

console.log(1111111, characterReplacement(s, k));
