'use strict';

const app = angular.module('tubeApp');

app.directive('tubeShuffle', function() {
    return {
        restrict: 'E',
        scope: {
            shuffle: '&',
            none: '&'
        },
        templateUrl: 'client/views/shuffle.html',
        replace: true,
        controller: function($scope) {
            $scope.doShuffle = function() {
                setLinkVisible(false, true);
                $scope.shuffle();
            };

            $scope.doShuffleNone = function() {
                setLinkVisible(true, false);
                $scope.none();
            }

            setLinkVisible(true, false);

            function setLinkVisible(noneVisible, shuffleVisible) {
                $scope.shuffleNoneVisible = noneVisible;
                $scope.shuffleVisible = shuffleVisible;
            }

        }

    };
});
