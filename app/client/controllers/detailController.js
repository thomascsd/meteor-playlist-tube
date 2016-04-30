'use strict';

angular
    .module('tubeApp')
    .controller('detailController', detailController);

detailController.$inject = ['$scope', 'youtubeService', 'userDataService'];

/** Playlist detail controller */
function detailController($scope, youtubeService, userDataService) {
    const vm = this;
    const data = userDataService.tokenData();
    const playlist = userDataService.currentPlaylist;

    vm.detail = youtubeService.getPlaylistDetail(data.token, playlist.id);
    vm.title = playlist.snippet.title;
    vm.goBack = goBack;
    vm.playVideo = playVideo;

    function goBack() {
        $scope.$emit('tube.goBack');
    }

    function playVideo(item) {
        userDataService.currentVideo = {
            id: item.snippet.resourceId.videoId,
            index: item.snippet.position,
            title: item.snippet.title
        };
        //Go to play video page
        $scope.$emit('tube.video');
        //$location.path('video/' + item.snippet.resourceId.videoId);
    }

}
