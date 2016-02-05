var testApp = testApp || {};
testApp
    .controller('DashboardController', function (arrayService) {
        var test = 1;
        // DI
        this.arrayService = arrayService;
    });