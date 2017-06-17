var app = angular.module("gameDevApp", ['apiFactory']);

app.controller("gameDevController", function($scope, API){
    'use strict'
    API.getPublico().then(function(response){
        $scope.publicos = response.data;
    }, function(err){
        $scope.err = err;
    });
});