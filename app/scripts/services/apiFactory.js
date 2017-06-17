angular.module("apiFactory", [])
    .factory('API', function ($http) {
        'use strict'
        var API = {};

        API.getPublico = function () {
            var url = '/publico_values.json';
            return $http.get(url);
        };

        API.getConsola = function () {
            var url = '/consola_values.json';
            return $http.get(url);
        };

        API.getGenero = function () {
            var url = '/genero_values.json';
            return $http.get(url);
        };

        return API;

    });