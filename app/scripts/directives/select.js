var module = angular.module("selectDirective", ['ui.select', 'ngSanitize']);

module.directive("paramSelector", function () {
    'use strict'
    return {
        restrict: 'E',
        templateUrl: '/scripts/directives/select.html',
        controller: 'ParamSelectorController',
        scope: {
            matchPlaceholder: '@',
            paramTitle: '@',
            paramValue: '=',
            items: '=',
            funcEval: '&'
        },
        link: function (scope) {
            scope.setSelectedItem = function (paramValue) {
                scope.paramValue = paramValue;
            };
            scope.hasHighScore = function(item){
                return (scope.funcEval()(item) === 3);
            }
        }

    }
});

module.controller("ParamSelectorController", function ($scope) {

    $scope.scope = $scope;

    $scope.$watch('paramValue', function () {
        $scope.setSelectedItem($scope.paramValue);
    });


});