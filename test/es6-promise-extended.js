var expect = require('chai').expect;
var ExtendedPromise = require('../');
var globlPromise = require('es6-promise').Promise;

describe('es6-promise-extended', function () {

	after(function () {
		delete globlPromise.prototype.finally;
	});

	describe('defer', function () {
		it('should be able to resolve a deferred promise', function (done) {
			var deferred = ExtendedPromise.defer();

			deferred.promise
				.then(function () {
					done();
				});

			deferred.resolve();
		});

		it('should be able to reject a deferred promise', function (done) {
			var deferred = ExtendedPromise.defer();

			deferred.promise
				.catch(function () {
					done();
				});

			deferred.reject();
		});

		it('should be able to resolve a deferred promise with an argument', function (done) {
			var deferred = ExtendedPromise.defer();

			deferred.promise
				.then(function (result) {
					expect(result).to.equal(1);

					done();
				});

			deferred.resolve(1, 2);
		});

		it('should be able to reject a deferred promise with an argument', function (done) {
			var deferred = ExtendedPromise.defer();

			deferred.promise
				.catch(function (result) {
					expect(result).to.equal(1);

					done();
				});

			deferred.reject(1, 2);
		});
	});

	describe('finally', function () {
		it('should call a promises `finally` function after resolving a promise', function (done) {
			var promise = new ExtendedPromise.Promise(function (resolve, reject) {
				resolve(1);
			});

			promise
				.then(function (result) {
					return result * 2;
				})
				.then(function (result) {
					return result * 2;
				})
				.finally(function (result) {
					expect(result).to.equal(4);

					done();
				});
		});

		it('should call a promises `finally` function after rejecting a promise', function (done) {
			var promise = new ExtendedPromise.Promise(function (resolve, reject) {
				reject(1);
			});

			promise
				.then(function (result) {
					return result * 2;
				})
				.catch(function (result) {
					return result * 10;
				})
				.finally(function (result) {
					expect(result).to.equal(10);

					done();
				});
		});

		it('should call a promises `finally` method if an exception is thrown in a `then` method', function (done) {
			var msg = 'error...';
			var promise = new ExtendedPromise.Promise(function (resolve, reject) {
				resolve(1);
			});

			promise
				.then(function (result) {
					throw Error(msg);
				})
				.finally(function (result) {
					expect(result.message).to.equal(msg);
					done();
				});
		});

		it('should call a promises `finally` method when resolving a deferred function', function (done) {
			var deferred = ExtendedPromise.defer();

			deferred.promise
				.then(function (result) {
					return result * 20;
				})
				.finally(function (result) {
					expect(result).to.equal(20);
					done();
				});

			deferred.resolve(1);
		});

		it('should not pollute the global promise', function () {
			expect(globlPromise.prototype.finally).to.equal(undefined);
		});
	});

	describe('Promise', function () {
		it('should provide access to Promise.all', function (done) {
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

			ExtendedPromise.all([ promise1, promise2 ]).then(function (result) {
				expect(result[0]).to.equal(10);
				expect(result[1]).to.equal(20);

				done();
			});
		});

		it('should provide access to Promise.race', function (done) {
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

			ExtendedPromise.race([ promise1, promise2 ]).then(function (result) {
				expect(result).to.equal(10);

				done();
			});
		});

		it('should provide access to Promise.resolve', function (done) {
			ExtendedPromise.resolve('Success!')
				.then(function (msg) {
					expect(msg).to.equal('Success!');

					done();
				});
		});

		it('should provide access to Promise.reject', function (done) {
			ExtendedPromise.reject('Error')
				.catch(function (msg) {
					expect(msg).to.equal('Error');

					done();
				});
		});
	});
});
