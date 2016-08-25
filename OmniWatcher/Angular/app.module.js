var channelsApp = angular.module("channelsApp", []);

function getDataFactory(http)
{
    var dataFactory = {
        getChannels: function () {
            return [
                { code: "BankOnline", dbcode: "bankonline" },
                { code: "MobileBanking", dbcode: "mobile-banking" },
                { code: "BasisNet2CC", dbcode: "bn2cc-client" }];
        },
        getSessions: function (channel) {
            var res;
            var url = '/api/Session/' + channel;

            http({
                method: 'GET',
                url: url
            }).then(function (response) {
                res = response.data;
            }, function (response) {

            });

            return res;
        }
    };

    return dataFactory;
}

channelsApp.factory("dataFactory", ["$http", getDataFactory]);

function channelsController(scope, dataService)
{
    scope.channels = dataService.getChannels();
    scope.sessions = dataService.getSessions('bankonline');
}

channelsApp.controller("channelsController", ["$scope", "dataFactory", channelsController]);

