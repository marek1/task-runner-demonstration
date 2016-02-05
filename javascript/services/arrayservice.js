var testApp = testApp || {};
testApp
    .service('arrayService', function() {
        this.findObjectByProperty = function(_arr, _prop, _val) {
            var returnObject = {};
            angular.forEach(_arr, function(x, y) {
                if (x[_prop] === _val) {
                    returnObject = x;
                }
            });
            return returnObject;
        };
        this.returnArrayPosition = function (_arr, _prop, _val) {
            var position = -1;
            angular.forEach(_arr, function(x, y) {
                if (x[_prop] === _val) {
                    position = y;
                }
            });
            return position;
        };
    });