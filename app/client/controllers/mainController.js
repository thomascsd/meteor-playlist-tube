'use strict';

angular
    .module('tubeApp')
    .controller('mainController', mainController);

mainController.$inject = ['$scope', 'youtubeService', 'userDataService'];

/** 主畫面的Controller */
function mainController($scope, youtubeService, userDataService) {
    const vm = this;
    let data = userDataService.tokenData();
    const isExpired = youtubeService.isExpired(data);

    vm.playlistUrl = '';
    vm.detailUrl = '';
    vm.videoUrl = '';
    vm.detailVisible = false;
    vm.mainVisible = true;
    vm.videoVisible = false;
    vm.tabSelectedIndex = 0;

    if (data && isExpired) {
        youtubeService.reGetToken(data).then((newData) => {
            userDataService.tokenData(newData);
        });
    }
    else if (!data && youtubeService.isLogingIn()) {
        youtubeService.getToken().then((data) => {
            vm.tabSelectedIndex = 1;
            userDataService.tokenData(data);
        });
    }

    vm.localSelected = localSelected;
    vm.playlistSelected = playlistSelected;

    function localSelected() {
        vm.tab1 = true;
        vm.tab2 = false;

        $scope.$broadcast('tube.reloadLocal');
        //$location.path('local');
    }

    function playlistSelected() {
        vm.tab1 = false;
        vm.tab2 = true;

        if (vm.playlistUrl === '') {
            vm.playlistUrl = 'client/views/myYoutube.html';
        }
    }

    function goDetail(e, data) {
        vm.detailVisible = true;
        vm.mainVisible = false;
        vm.videoVisible = false;
        vm.detailUrl = 'client/views/detail.html';
    }

    function goVideo(e, data) {
        vm.videoVisible = true;
        vm.mainVisible = false;
        vm.detailVisible = false;
        vm.videoUrl = 'client/views/video.html';
    }

    function goBack(e) {
        vm.mainVisible = true;
        vm.detailVisible = false;
        vm.videoVisible = false;
        vm.detailUrl = '';
        vm.videoUrl = '';
        //$window.history.go(-1);
    }

    function backDetail() {
        vm.mainVisible = false;
        vm.detailVisible = true;
        vm.videoVisible = false;
        vm.videoUrl = '';
    }

    $scope.$on('tube.detail', goDetail);
    $scope.$on('tube.video', goVideo);
    $scope.$on('tube.goBack', goBack);
    $scope.$on('tube.backDetail', backDetail);
}
