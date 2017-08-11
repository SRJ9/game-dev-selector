var GameParamScore = (function () {
    'use strict'
    function GameParamScore() {

    }

    GameParamScore.prototype = Array.prototype;

    GameParamScore.prototype.pushIfNotNull = function (value) {
        if (value !== null) {
            this.push(value);
        }
    };

    GameParamScore.prototype.getMin = function(){
        var min_value = Math.min.apply(null, this);
        if(min_value === Infinity) {
            min_value = 0;
        }
        return min_value;
    };
    return GameParamScore;
}());

var app = angular.module("gameDevApp", ['apiFactory', 'ui.select', 'ngSanitize', 'selectDirective']);
app.controller("GameDevController", function ($scope, API) {
    'use strict'
    $scope.game_params = {};

    var pluralize_params = {
        'audience': 'audiences',
        'game_system': 'game_systems',
        'genre': 'genres',
        'topic': 'topics'
    }

    angular.forEach(pluralize_params, function(pluralize_param, game_param){
        API.getItems(game_param).then(function(response){
            $scope[pluralize_param] = response.data;
        }, function (err){
            $scope.err = err;
        });
    })

    $scope.getScore = function(param_key_1, param_key_2, param_val_1, param_val_2){
        param_val_1 = param_val_1 || $scope.game_params[param_key_1];
        param_val_2 = param_val_2 || $scope.game_params[param_key_2];
        if(param_val_1 && param_val_2){
            return param_val_1[param_key_2][param_val_2.name.toLowerCase()];
        }
        return null;
    }

    $scope.evalAudience = function (audience) {
        var values = new GameParamScore();
        values.pushIfNotNull($scope.getScore('game_system', 'audience', null, audience));
        values.pushIfNotNull($scope.getScore('topic', 'audience', null, audience));
        return values.getMin();
    };

    $scope.evalGameSystem = function (game_system) {
        var values = new GameParamScore();
        values.pushIfNotNull($scope.getScore('game_system', 'audience', game_system, null));
        values.pushIfNotNull($scope.getScore('game_system', 'genre', game_system, null));
        return values.getMin();
    };

    $scope.evalGenre = function (genre) {
        var values = new GameParamScore();
        values.pushIfNotNull($scope.getScore('topic', 'genre', null, genre));
        values.pushIfNotNull($scope.getScore('game_system', 'genre', null, genre));
        return values.getMin();
    };


    $scope.evalTopic = function (topic) {
        var values = new GameParamScore();
        values.pushIfNotNull($scope.getScore('topic', 'genre', topic, null));
        values.pushIfNotNull($scope.getScore('topic', 'audience', topic, null));
        return values.getMin();
    };


    $scope.evalFullGame = function () {
        $scope.evalAudience();
        $scope.evalGameSystem();
        $scope.evalGenre();
        $scope.evalTopic();
    }
});