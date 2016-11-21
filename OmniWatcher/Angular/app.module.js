var channelsApp = angular.module("channelsApp", []);

var initchannels = {
        BankOnline: { dbcode: "bankonline" },
        MobileBanking: { dbcode: "mobile-banking" },
        BasisNet2CC: { dbcode: "bn2cc-client" }
    };

function getDataFactory(http)
{
    var dataFactory = {
        getChannels: function () {
            return initchannels;
        },
        getSessions: function (channel, code) {
            var url = '/api/Sessions/' + channel + '/' + code;

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
    for (var ch in scope.channels) {
        var channel = scope.channels[ch];
        dataService.getSessions(channel.dbcode, ch)
            .then(function (response) {
                if (response.data.Code != undefined) {
                    scope.channels[response.data.Code].sessions = response.data.SessionsList;
                }
            }, function (response) {

            });
    }
}

channelsApp.controller("channelsController", ["$scope", "dataFactory", channelsController]);

function mySetCxAttribDirective()
{
    var directive = {
        restrict: "A",
        link: function (scope, element, attrs, controller, transcludeFn) {
            var id = attrs.id;
            var channel = id.substring(7);
            channel = channel.substring(0, channel.indexOf("-"));
            var divId = 'div-' + channel;
            var el = document.getElementById(divId).getElementsByClassName("channel-activity")[0];
            var divWidth = el.clientWidth;
            var deactMins = attrs.mySetCx;
            var cx = 10 + (divWidth - 20) * deactMins / 60;

            element.attr('cx', cx);
        }
    };

    return directive;
}

channelsApp.directive("mySetCx", mySetCxAttribDirective);

function mySetCyAttribDirective() {
    var directive = {
        restrict: "A",
        link: function (scope, element, attrs, controller, transcludeFn) {
            var id = attrs.id;
            var channel = id.substring(7);
            channel = channel.substring(0, channel.indexOf("-"));
            var divId = 'div-' + channel;
            var el = document.getElementById(divId).getElementsByClassName("channel-activity")[0];
            var divheight = el.clientHeight;
            var existMins = attrs.mySetCy;
            var cy = 5 + (divheight - 10) * existMins / 60;

            element.attr('cy', cy);
        }
    };

    return directive;
}

channelsApp.directive("mySetCy", mySetCyAttribDirective);
