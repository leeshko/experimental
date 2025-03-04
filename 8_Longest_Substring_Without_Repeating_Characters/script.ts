let s="au"

const lengthOfLongestSubstring = (s: string): number => {
  let collectionSet = new Set();
  let l = 0;
  let r = 0;
  let maxLenth = 0;

  while (r < s.length) {
    if (!collectionSet.has(s[r])) {
      collectionSet.add(s[r]);
      console.log(r, collectionSet);
      maxLenth = Math.max(collectionSet.size, maxLenth);
      r++;
    } else {
      while(s[l] !== s[r]) {
        collectionSet.delete(s[l]);
        l++
      }
      collectionSet.delete(s[l]);
      l++;
    }
  }
  return maxLenth;
};

console.log(1111111, lengthOfLongestSubstring(s));
