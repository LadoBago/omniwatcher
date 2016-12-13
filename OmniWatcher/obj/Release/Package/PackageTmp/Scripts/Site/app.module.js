var channelsApp = angular.module("channelsApp", []);

var initchannels = {
    BankOnline: { dbcode: "bankonline", code: "BankOnline", chart: [], charte: [] },
    MobileBanking: { dbcode: "mobile-banking", code: "MobileBanking", chart: [], charte: [] },
    BasisNet2CC: { dbcode: "bn2cc-client", code: "BasisNet2CC", chart: [], charte: [] }
};

var maxChartLen = 300
    , maxSessionsCnt = 200;

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
        },
        getSession: function (channel, sessionId) {
            var url = '/api/Session/' + channel + '/' + sessionId;
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
    var afterMaxSessionsAssignCounter = 0, maxSessionsCntNew = maxSessionsCnt;
    var f = function () {
        afterMaxSessionsAssignCounter++;
        for (var ch in scope.channels) {
            var channel = scope.channels[ch];
            dataService.getSessions(channel.dbcode, ch)
                .then(function (response) {
                    if (response.data.Code != undefined) {
                        var ch = scope.channels[response.data.Code];
                        ch.sessions = response.data.SessionsList;

                        var employees = 0;
                        for (var i = 0; i < ch.sessions.length; i++) {
                            if (ch.sessions[i].IsEmployee)
                            {
                                employees++;
                            }
                        }

                        if (maxSessionsCntNew - 30 < ch.sessions.length) {
                            afterMaxSessionsAssignCounter = 0;
                        }
                        if (maxSessionsCntNew < ch.sessions.length) {
                            maxSessionsCntNew += 30;
                        }
                        if (afterMaxSessionsAssignCounter > maxChartLen) {
                            maxSessionsCntNew = Math.max(maxSessionsCntNew - 30, maxSessionsCnt);
                            afterMaxSessionsAssignCounter = 0;
                        }

                        ch.ssnCnt = ch.sessions.length;
                        ch.eSsnCnt = employees;
                        ch.chart.push(ch.sessions.length);
                        ch.charte.push(employees);
                        if (ch.chart.length > maxChartLen)
                        {
                            ch.chart.splice(0, ch.chart.length - maxChartLen);
                            ch.charte.splice(0, ch.chart.length - maxChartLen);
                        }

                        var el = document.getElementById("canvas-" + ch.code);
                        var h = el.height;
                        var w = el.width;

                        var ctx = el.getContext("2d");
                        ctx.clearRect(0, 0, w, h);
                        ctx.lineWidth = 3;

                        var chart = ch.chart;
                        var charte = ch.charte;

                        var scalex = Math.min(Math.max(ch.chart.length, 5), maxChartLen);
                        
                        var getx = function (fi)
                        {
                            return 2 + fi * (w - 5) / (scalex - 1);
                        }
                        var gety = function (cnt)
                        {
                            return 2 + (h - 4) * (1 - Math.min(cnt / maxSessionsCntNew, 1));
                        }


                        for (var i = 0; i < chart.length; i++) {
                            if (i == 0)
                                continue;
                            var x = getx(i);
                            var y = gety(chart[i]);

                            ctx.beginPath();
                            ctx.moveTo(getx(i - 1), gety(chart[i - 1]));
                            ctx.lineTo(x, y);
                            ctx.strokeStyle = "black";
                            ctx.stroke();

                            y = gety(charte[i]);
                            ctx.beginPath();
                            ctx.moveTo(getx(i - 1), gety(charte[i - 1]));
                            ctx.lineTo(x, y);
                            ctx.strokeStyle = "orange";
                            ctx.stroke();

                            y = gety(chart[i] - charte[i]);
                            ctx.beginPath();
                            ctx.moveTo(getx(i - 1), gety(chart[i - 1] - charte[i - 1]));
                            ctx.lineTo(x, y);
                            ctx.strokeStyle = "lightgreen";
                            ctx.stroke();
                        }
                    }
                }, function (response) {

                });
        }
    };

    scope.channels = dataService.getChannels();
    f();
    interval(f, 5000);

    scope.circleClick = function () {
        var scopeObj = this;
        dataService.getSession(scopeObj.session.Channel, scopeObj.session.SessionId)
            .then(function (response) {
                scopeObj.$parent.selectedSession = response.data;
            },
            function (response) {

            });
    };
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
