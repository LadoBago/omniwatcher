var channelsApp = angular.module("channelsApp", []);

var initchannels = {
    BankOnline: { dbcode: "bankonline", code: "BankOnline" },
    MobileBanking: { dbcode: "mobile-banking", code: "MobileBanking" },
    BasisNet2CC: { dbcode: "bn2cc-client", code: "BasisNet2CC" }
    };

function getDataFactory(http)
{
    var dataFactory = {
        getChannels: function () {
            return initchannels;
        },
        getSessions: function (channel, code) {
            var url = '/api/Sessions/' + channel + '/' + code;
            if (app.length > 0)
                url = '/' + app + url;

            return http({
                method: 'GET',
                url: url,
                cache: false
            });
        }
    };

    return dataFactory;
}

channelsApp.factory("dataFactory", ["$http", getDataFactory]);

function channelsController(scope, dataService, interval)
{
    var f = function () {
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
    };

    scope.channels = dataService.getChannels();
    f();
    interval(f, 10000);
}

channelsApp.controller("channelsController", ["$scope", "dataFactory", "$interval", channelsController]);

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
            var cx = 5 + (divWidth - 10) * deactMins / 3600;

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
            var cy = 5 + (divheight - 10) * existMins / 3600;

            element.attr('cy', cy);
        }
    };

    return directive;
}

channelsApp.directive("mySetCy", mySetCyAttribDirective);

function myFillColorAttribDirective() {
    var directive = {
        restrict: "A",
        link: function (scope, element, attrs, controller, transcludeFn) {
            var isEmployee = attrs.myFillColor == 'true';
            if (isEmployee)
            {
                element.attr('fill', 'orange');
            }
            else
            {
                element.attr('fill', 'lightgreen');
            }

        }
    };

    return directive;
}

channelsApp.directive("myFillColor", myFillColorAttribDirective);
