'use strict';

angular
    .module('tubeApp')
    .controller('localController', localController);

localController.$inject = ['$scope', '$mdDialog', 'youtubeService', 'userDataService'];

/** Local controller */
function localController($scope, $mdDialog, youtubeService, userDataService) {
    const vm = this;
    const list = userDataService.list;

    vm.items = list.getItems();
    vm.clear = clear;
    vm.goDetail = goDetail;
    vm.delete = deleteItem;
    vm.openSearchDialog = openSearchDialog;

    $scope.$on('tube.reloadLocal', reloadLocal);
    //$location.path('local');

    function clear() {
        userDataService.clear();
        vm.items = list.getItems();
    }

    function goDetail(item) {
        userDataService.currentPlaylist = item;
        //Go to playlist items
        $scope.$emit('tube.detail');
        //$location.path('detail/' + item.id);
    }

    function deleteItem(item) {
        list.deleteItem(item);
        reloadLocal();
    }

    function openSearchDialog() {
        $mdDialog.show({
            templateUrl: 'client/views/search.html',
            controller: 'searchController',
            controllerAs: 'search'
        });
    }

    /** local playlist reload*/
    function reloadLocal() {
        vm.items = list.getItems();
    }


}
