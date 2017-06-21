angular.module("apiFactory", [])
    .factory('API', function ($http) {
        'use strict'
        var API = {};

        API.getAudience = function () {
            var url = '/audience_values.json';
            return $http.get(url);
        };

        API.getGameSystem = function () {
            var url = '/system_values.json';
            return $http.get(url);
        };

        API.getGenre = function () {
            var url = '/genre_values.json';
            return $http.get(url);
        };

        API.getTopic = function () {
            var url = '/topic_values.json';
            return $http.get(url);
        };

        return API;

    });