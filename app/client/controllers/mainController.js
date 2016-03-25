'use strict';

const app = angular.module('tubeApp');

app.controller('mainController', ['$scope', 'youtubeService', 'userDataService', mainController]);

/** 主畫面的Controller */
function mainController($scope, youtubeService, userDataService) {
    let enableLocal = true;
    let data = userDataService.tokenData();
    const isExpired = youtubeService.isExpired(data);
    $scope.playlistUrl = '';
    $scope.detailUrl = '';
    $scope.videoUrl = '';
    $scope.detailVisible = false;
    $scope.mainVisible = true;
    $scope.videoVisible = false;
    $scope.tabSelectedIndex = 0;

    if (data && isExpired) {
        youtubeService.reGetToken(data).then((newData) => {
            userDataService.tokenData(newData);
        });
    } else if (!data && youtubeService.isLogingIn()) {
        youtubeService.getToken().then((data) => {
            $scope.tabSelectedIndex = 1;
            userDataService.tokenData(data);
        });
    }

    $scope.localSelected = function() {
        $scope.tab1 = true;
        $scope.tab2 = false;

        $scope.$broadcast('tube.reloadLocal');
        //$location.path('local');
    };

    $scope.playlistSelected = function() {
        $scope.tab1 = false;
        $scope.tab2 = true;

        if ($scope.playlistUrl === '') {
            $scope.playlistUrl = 'client/views/myYoutube.html';
        }
    };

    function goDetail(e, data) {
        $scope.detailVisible = true;
        $scope.mainVisible = false;
        $scope.videoVisible = false;
        $scope.detailUrl = 'client/views/detail.html';
    }

    function goVideo(e, data) {
        $scope.videoVisible = true;
        $scope.mainVisible = false;
        $scope.detailVisible = false;
        $scope.videoUrl = 'client/views/video.html';
    }

    function goBack(e) {
        $scope.mainVisible = true;
        $scope.detailVisible = false;
        $scope.videoVisible = false;
        $scope.detailUrl = '';
        $scope.videoUrl = '';
        //$window.history.go(-1);
    }

    function backDetail() {
        $scope.mainVisible = false;
        $scope.detailVisible = true;
        $scope.videoVisible = false;
        $scope.videoUrl = '';
    }

    $scope.$on('tube.detail', goDetail);
    $scope.$on('tube.video', goVideo);
    $scope.$on('tube.goBack', goBack);
    $scope.$on('tube.backDetail', backDetail);
}
