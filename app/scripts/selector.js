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


    var gameparamscore = new GameParamScore();
    gameparamscore.pushIfNotNull(1);


    API.getItems('audience').then(function (response) {
        $scope.audiences = response.data;
    }, function (err) {
        $scope.err = err;
    });

    API.getItems('game_system').then(function (response) {
        $scope.game_systems = response.data;
    }, function (err) {
        $scope.err = err;
    });

    API.getItems('genre').then(function (response) {
        $scope.genres = response.data;
    }, function (err) {
        $scope.err = err;
    });

    API.getItems('topic').then(function (response) {
        $scope.topics = response.data;
    }, function (err) {
        $scope.err = err;
    });


    $scope.getGameSystemByGenre = function (game_system, genre) {
        game_system = game_system || $scope.game_params.game_system;
        genre = genre || $scope.game_params.genre;
        if (game_system && genre) {
            return game_system.genre[genre.name.toLowerCase()];
        }
        return null;
    };

    $scope.getTopicByGenre = function (topic, genre) {
        topic = topic || $scope.game_params.topic;
        genre = genre || $scope.game_params.genre;
        if (topic && genre) {
            return topic.genre[genre.name.toLowerCase()];
        }
        return null;
    };

    $scope.getGameSystemByAudience = function (game_system, audience) {
        game_system = game_system || $scope.game_params.game_system;
        audience = audience || $scope.game_params.audience;
        if (game_system && audience) {
            return game_system.audience[audience.name.toLowerCase()];
        }
        return null;
    };

    $scope.getTopicByAudience = function (topic, audience) {
        topic = topic || $scope.game_params.topic;
        audience = audience || $scope.game_params.audience;
        if (topic && audience) {
            return topic.audience[audience.name.toLowerCase()];
        }
        return null;
    };

    $scope.evalAudience = function (audience) {
        var values = new GameParamScore();
        values.pushIfNotNull($scope.getGameSystemByAudience(null, audience));
        values.pushIfNotNull($scope.getTopicByAudience(null, audience));
        return values.getMin();
    };

    $scope.evalGameSystem = function (game_system) {
        var values = new GameParamScore();
        values.pushIfNotNull($scope.getGameSystemByAudience(game_system, null));
        values.pushIfNotNull($scope.getGameSystemByGenre(game_system, null));
        return values.getMin();
    };

    $scope.evalGenre = function (genre) {
        var values = new GameParamScore();
        values.pushIfNotNull($scope.getTopicByGenre(null, genre));
        values.pushIfNotNull($scope.getGameSystemByGenre(null, genre));
        return values.getMin();
    };


    $scope.evalTopic = function (topic) {
        var values = new GameParamScore();
        values.pushIfNotNull($scope.getTopicByGenre(topic, null));
        values.pushIfNotNull($scope.getTopicByAudience(topic, null));
        return values.getMin();
    };


    $scope.evalFullGame = function () {
        $scope.evalAudience();
        $scope.evalGameSystem();
        $scope.evalGenre();
        $scope.evalTopic();
    }
});