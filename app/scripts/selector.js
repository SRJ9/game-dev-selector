var app = angular.module("gameDevApp", ['apiFactory']);

app.controller("gameDevController", function ($scope, API) {
    'use strict'
    API.getPublico().then(function (response) {
        $scope.publicos = response.data;
    }, function (err) {
        $scope.err = err;
    });

    API.getConsola().then(function (response) {
        $scope.consolas = response.data;
    }, function (err) {
        $scope.err = err;
    });
});