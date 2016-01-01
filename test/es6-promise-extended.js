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
});
