
const response = await fetchData();
// Expecting the data to match

expect(response.data).toEqual(someGeneratedData);
