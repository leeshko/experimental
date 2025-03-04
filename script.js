let user = {
    firstName: "Vasya",
    sayHi() {
      console.log(`Hello, ${this.firstName}!`);
    }
  };
  user.sayHi()
  setTimeout(user.sayHi, 1000); 