'use strict';

const app = angular.module('tubeApp');

app.directive('tubeRepeat', function() {
    return {
        restrict: 'E',
        scope: {
            repeat: '&',
            one: '&',
            none: '&'
        },
        templateUrl: 'client/views/repeat.html',
        replace: true,
        controller: function($scope) {
            $scope.doRepeat = function() {
                setLinkVisible(false, true, false);
                $scope.repeat();
            };

            $scope.doRepeatOne = function() {
                setLinkVisible(false, false, true);
                $scope.one();
            };

            $scope.doRepeatNone = function() {
                setLinkVisible(true, false, false);
                $scope.none();
            }

            setLinkVisible(true, false, false);

            function setLinkVisible(noneVisible, repeatVisible, repeatOneVisible) {
                $scope.noneVisible = noneVisible;
                $scope.repeatVisible = repeatVisible;
                $scope.repeatOneVisible = repeatOneVisible;
            }

        }

    };
});
