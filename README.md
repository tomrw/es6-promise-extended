# es6-promise-extended
A lightweight extension to the [es6-promise](https://www.npmjs.com/package/es6-promise) library, which brings a finally clause and deferred promises, alongside the es6-promise Promise object and static methods.

## Building and testing
* `npm install` To install all dependencies
* `npm test` To run the tests
* `npm run watch-tests` To run the tests and watch the code for changes
* `npm run lint` To lint the code

## Usage
To install:
```javascript
npm install es6-promise-extended
```

To use:
```javascript
var ExtendedPromise = require('es6-promise-extended');
```

### Promise
Promises are created as shown:
```javascript
var promise = new ExtendedPromise.Promise(function (resolve, reject) {
	resolve('someValue');
	// OR
	reject('someError');
});
```

### finally
Finally is always called after the rejection or fulfillment of a promise, as shown:
```javascript
var promise = new ExtendedPromise.Promise(function (resolve, reject) {
	resolve(10);
});

promise
	.then(function (result) {
		return result * 2;
	})
	.finally(function (result) {
		console.log('Finally!', result);
	});

// Finally! 20
```

```javascript
var promise = new ExtendedPromise.Promise(function (resolve, reject) {
	reject();
});

promise
	.catch(function (result) {
		return 'Error!';
	})
	.finally(function (result) {
		console.log('Finally!', result);
	});

// Finally! Error!
```

### defer
defer allows you to pass the control of the promise onto a consumer, who can control when to resolve or reject the promise, as shown:

##### Resolve
```javascript
var deferred = ExtendedPromise.defer();

deferred.promise
	.then(function (msg) {
		console.log('Resolved!', msg);
	});

deferred.resolve('yo!');

// Resolved! yo!

```

##### Reject
```javascript
var deferred = ExtendedPromise.defer();

deferred.promise
	.catch(function (msg) {
		console.log('Rejected!', msg);
	});

deferred.reject('Something went wrong..');

// Rejected! Something went wrong..

```

#### Finally
It is compatible with the finally method too:
```javascript
var deferred = ExtendedPromise.defer();

deferred.promise
	.finally(function (msg) {
		console.log('Finally!', msg);
	});

deferred.resolve('I always run.');

// Finally! I always run.
```

### all
all resolves when all the promises passed to it have resolved or rejected
```javascript
var promise1 = new ExtendedPromise.Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(10);
	}, 1);
});
var promise2 = new ExtendedPromise.Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(20);
	}, 2);
});

ExtendedPromise.all([ promise1, promise2 ], function (result) {
	console.log('Resolved!', result[0], result[1]);
});

// Resolved! 10 20
```

### race
race resolves as soon as a promise passed to it has been resolved or rejected
```javascript
var promise1 = new ExtendedPromise.Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(10);
	}, 1);
});
var promise2 = new ExtendedPromise.Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(20);
	}, 2);
});

ExtendedPromise.race([ promise1, promise2 ], function (result) {
	console.log('Resolved!', result);
});

// Resolved! 10
```
