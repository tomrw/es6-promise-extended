var Promise = require('es6-promise').Promise;
var inherits = require('inherits');

function ExtendedPromise() {
	Promise.apply(this, arguments);
}
inherits(ExtendedPromise, Promise);

ExtendedPromise.prototype['finally'] = function (onResolveOrReject) {
	return this['catch'](function (result) {
		return result;
	}).then(onResolveOrReject);
};

function defer() {
	var deferred = {};

	deferred.promise = new ExtendedPromise(function (resolve, reject) {
		deferred.resolve = resolve;
		deferred.reject = reject;
	});

	return deferred;
}

exports.defer = defer;
exports.Promise = ExtendedPromise;
exports.all = Promise.all.bind(Promise);
exports.race = Promise.race.bind(Promise);
exports.resolve = Promise.resolve.bind(Promise);
exports.reject = Promise.reject.bind(Promise);
