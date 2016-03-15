'use strict';

const app = angular.module('tubeApp');

app.controller('videoController', videoController);
/** Play video controller */
function videoController($scope, userDataService) {
    $scope.video = {
        id: userDataService.currentVideo.id,
        index: userDataService.currentVideo.index,
        playlistId: userDataService.currentPlaylistID
    };


    $scope.backDetail = function() {
        $scope.$emit('tube.backDetail');
    };

    $scope.prev = function() {
        $scope.$broadcast('tube.prev');
    };

    $scope.next = function() {
        $scope.$broadcast('tube.next');
    };

    //playlist repeat
    $scope.doRepeat = function() {
        $scope.$broadcast('tube.repeat');
    };

    //Video repeat
    $scope.doOne = function() {
        $scope.$broadcast('tube.repeatOne');
    };

    $scope.doNone = function() {
        $scope.$broadcast('tube.repeatNone');
    };

    //Playlist shuffle
    $scope.doShuffle = function() {
        $scope.$broadcast('tube.shuffle', true);
    };

    $scope.doShuffleNone = function() {
        $scope.$broadcast('tube.shuffle', false);
    };
}