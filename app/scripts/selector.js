var app = angular.module("gameDevApp", ['apiFactory', 'ui.select', 'ngSanitize']);

app.controller("gameDevController", function ($scope, API) {
    'use strict'
    $scope.game_params = {};
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

    $scope.getPublicoConsola = function(consola){
        if($scope.game_params.publico){
            var publico = $scope.game_params.publico.nombre.toLowerCase();
            return consola.publico[publico];
        }
        return null;

    };
});