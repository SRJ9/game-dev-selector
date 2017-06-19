var app = angular.module("gameDevApp", ['apiFactory', 'ui.select', 'ngSanitize', 'selectDirective']);
app.controller("GameDevController", function ($scope, API) {
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

    API.getGenero().then(function (response) {
        $scope.generos = response.data;
    }, function (err) {
        $scope.err = err;
    });

    API.getTema().then(function (response) {
        $scope.temas = response.data;
    }, function (err) {
        $scope.err = err;
    });

    $scope.getPublicoConsola = function (consola) {
        if ($scope.game_params.publico) {
            var publico = $scope.game_params.publico.nombre.toLowerCase();
            return consola.publico[publico];
        }
        return null;

    };

    $scope.getConsolaGenero = function (genero) {
        if ($scope.game_params.consola) {
            return $scope.game_params.consola.genero[genero.nombre.toLowerCase()];
        }
        return null;

    };

    $scope.getGeneroTema = function (tema) {
        if ($scope.game_params.genero) {
            var genero = $scope.game_params.genero.nombre.toLowerCase();
            return tema.genero[genero];
        }
        return null;

    };
});