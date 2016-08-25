var channelsApp = angular.module("channelsApp", []);

var dataFactory = {
    getChannels: function() {
        return [
            { code: "BankOnline", dbcode: "bankonline" },
            { code: "MobileBanking", dbcode: "mobile-banking" },
            { code: "BasisNet2CC", dbcode: "bn2cc-client" }];
    }
}

function getDataFactory()
{
    return dataFactory;
}

channelsApp.factory("dataFactory", getDataFactory);

function channelsController(scope, dataService)
{
    scope.channels = dataService.getChannels();
}

channelsApp.controller("channelsController", ["$scope", "dataFactory", channelsController]);

