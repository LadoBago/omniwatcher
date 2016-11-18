var channelsApp = angular.module("channelsApp", []);

var initchannels = [
                { code: "BankOnline", dbcode: "bankonline" },
                { code: "MobileBanking", dbcode: "mobile-banking" },
                { code: "BasisNet2CC", dbcode: "bn2cc-client" }];

function getDataFactory(http)
{
    var dataFactory = {
        getChannels: function () {
            return initchannels;
        },
        getSessions: function (channel) {
            var res;
            var url = '/api/Session/' + channel;

            return http({
                method: 'GET',
                url: url
            });
        }
    };

    return dataFactory;
}

channelsApp.factory("dataFactory", ["$http", getDataFactory]);

function channelsController(scope, dataService)
{
    scope.channels = dataService.getChannels();
    dataService.getSessions('bankonline')
        .then(function (response) {
            scope.sessions = response.data;
        }, function (response) {

        });
}

channelsApp.controller("channelsController", ["$scope", "dataFactory", channelsController]);

