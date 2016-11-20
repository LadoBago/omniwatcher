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

function mySetCxAttribDirective(parse)
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
            var cx = 10 + (divWidth - 20) * deactMins / 50;

            element.attr('cx', cx);
        }
    };

    return directive;
}

channelsApp.directive("mySetCx", ["$parse", mySetCxAttribDirective]);

function mySetCyAttribDirective(parse) {
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
            var cy = 5 + (divheight - 10) * existMins / 50;

            element.attr('cy', cy);
        }
    };

    return directive;
}

channelsApp.directive("mySetCy", ["$parse", mySetCyAttribDirective]);
