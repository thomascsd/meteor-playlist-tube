'use strict';

angular
    .module('tubeApp')
    .controller('videoController', videoController);

videoController.$inject = ['$scope', 'userDataService'];

/** Play video controller */
function videoController($scope, userDataService) {
    const video = userDataService.currentVideo;
    const playlist = userDataService.currentPlaylist;
    const vm = this;

    vm.video = {
        id: video.id,
        index: video.index,
        playlistId: playlist.id
    };

    vm.title = video.title;

    vm.backDetail = function() {
        $scope.$emit('tube.backDetail');
    };

    vm.prev = function() {
        $scope.$broadcast('tube.prev');
    };

    vm.next = function() {
        $scope.$broadcast('tube.next');
    };

    //playlist repeat
    vm.doRepeat = function() {
        $scope.$broadcast('tube.repeat');
    };

    //Video repeat
    vm.doOne = function() {
        $scope.$broadcast('tube.repeatOne');
    };

    vm.doNone = function() {
        $scope.$broadcast('tube.repeatNone');
    };

    //Playlist shuffle
    vm.doShuffle = function() {
        $scope.$broadcast('tube.shuffle', true);
    };

    vm.doShuffleNone = function() {
        $scope.$broadcast('tube.shuffle', false);
    };
}
