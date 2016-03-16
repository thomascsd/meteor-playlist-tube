'use strict';

const app = angular.module('tubeApp');

app.controller('mainController', ['$scope', 'youtubeService', mainController]);

/** 主畫面的Controller */
function mainController($scope, youtubeService) {
    let enableLocal = true;
    $scope.playlistUrl = '';
    $scope.detailUrl = '';
    $scope.videoUrl = '';
    $scope.detailVisible = false;
    $scope.mainVisible = true;
    $scope.videoVisible = false;

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

    /*if (true) { //appConfig.debug
        //debug
        var accessToken = youtubeService.getToken();

        if (accessToken) {
            enableLocal = false;
        }
    }

    if (enableLocal) {
        $scope.localSelected();
    }
    else {
        $scope.playlistSelected();
    }*/

    function goDetail(e, data) {
        $scope.detailVisible = true;
        $scope.mainVisible = false;
        $scope.videoVisible = false;
        $scope.detailUrl = 'templates/detailTemplate.html';
    }

    function goVideo(e, data) {
        $scope.videoVisible = true;
        $scope.mainVisible = false;
        $scope.detailVisible = false;
        $scope.videoUrl = 'templates/videoTemplate.html';
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
