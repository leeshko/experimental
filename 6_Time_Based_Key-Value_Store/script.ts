class TimeMap {
  map: Record<string, any> = {};
  constructor() {}

  set(key: string, value: string, timestamp: number): void {
    if (!this.map[key]) {
      this.map[key] = [];
    }
    this.map[key].push({ value, timestamp });
  }

  get(key: string, timestamp: number): string {
    const arr = this.map[key];
    if (!arr?.length) {
      return "";
    }
    if (arr[0].timestamp > timestamp) {
      return "";
    }
    let l = 0;
    let r = arr.length - 1;
    let res = "";

    while (l <= r) {
      let mid = Math.floor((l + r) / 2);
      if (arr[mid]?.timestamp === timestamp) {
        return arr[mid].value;
      }
      if (arr[mid]?.timestamp > timestamp) {
        r = mid - 1;
      } else {
        res = arr[mid].value;
        l = mid + 1;
      }
    }
    return res;
  }
}

var obj = new TimeMap();
obj.set("love", "high", 10);
var param_2 = obj.set("love", "low", 20);
var param_3 = obj.get("love", 5);
var param_4 = obj.get("love", 10);
var param_5 = obj.get("love", 15);
var param_6 = obj.get("love", 20);
var param_6 = obj.get("love", 25);
