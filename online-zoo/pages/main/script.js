
// "use strict";


// const details = {
//     message: 'Hello!',
// }
// function getMessage() {
//     return this.message;
// }
// console.log(getMessage.call(details));


// var name = 'John';

// var user = {
//     name: "Peter",
//     printMessage() {
//         console.log(`Hello, ${this.name}!`);
//     }
// };

// var printMessage = user.printMessage;
// printMessage();


// function getThis() {
//     return this;
// }

// console.log(getThis());

// console.log(message);
// var message = 'Hello!';


// for (var index = 0; index < 3; index++) {
//     setTimeout(function () {
//       console.log(index) ;
//     }, 1000)
// }

// let name = 'John';

// function printName() {
//     let name = 'Peter';
//     console.log(name);
// }
// printName();


// function foo(x) {
//     console.log(arguments);
// }
// foo(10);


// let f = function g() {return 23;};
// console.log(typeof g());

// var name = 'John';

// function printName() {
//     console.log(name);
//     var name = 'Peter';
//     console.log(name);
// }
// printName();

// console.log(message);
// let message = 'Hello';


// function getThis() {
//     return this;
// }
// console.log(getThis());


// const foo = bar();

// const number = 2;


// function bar() {return number;}



// for (let i = 0; i < 10; i++) {
    
// }

// console.log(i);


// printMessage()
// function printMessage() {
//     console.log('hello')
// }



// let f = new Function("a", "b", "return a+b")

// console.log(f(2,3))


// function foo() {
//     return {bar:1};
// }

// console.log(typeof foo().bar)

// (
//     function(a) {
//         arguments[0] = 10;
//         return a;
//     }
// )(5);  


// let name = 'John';

// function printName() {
//     console.log(name);
// }


// setTimeout(() => {
//     let name = "Peter";
//     printName();
// }, 1000)


// var a = 1,
// b = function a(x) {
//     x&&a(--x);
// }

// console.log(a)


// function foo() {
//     console.log(this);
// }

// foo.call(null)


const details = {
    name: 'John!'
}

function getMessage(message) {
    return `${message} ${this.name}`;
}

console.log(getMessage.apply(details, ['Hello!']))


// function foo(a,b) {
//     return a*b;
// }

// const bar = foo.bind(null, 2)
// bar(2)