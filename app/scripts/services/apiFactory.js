angular.module("apiFactory", [])
    .factory('API', function ($http) {
        'use strict'
        var API = {};

        API.getItems = function(game_param){
            var param_dict = {
                'audience': '/audience_values.json',
                'game_system': '/system_values.json',
                'genre': '/genre_values.json',
                'topic': '/topic_values.json'
            };
            if(game_param in param_dict){
                return $http.get(param_dict[game_param]);
            }
            return null;
        }

        return API;

    });