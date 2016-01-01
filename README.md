# es6-promise-extended
As extension to the [es6-promise](https://www.npmjs.com/package/es6-promise) library, which brings the finally method and deferred promises.

## Building and testing
* To install all dependencies: `npm install`
* To run the tests: `npm test`
* To run the tests and watch the code for changes: `npm run watch-tests`
* To lint the code: `npm run lint`

## Usage
To install:
```javascript
npm install es6-promise-extended
```

To use:
```javascript
var ExtendedPromise = require('es6-promise-extended');
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
