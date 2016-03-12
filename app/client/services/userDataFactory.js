'use strict';

const app = angular.module('tubeApp');

/** 記錄User的資料 */
app.factory('userDataService', ['$localStorage', function($localStorage) {
    const userData = {
        currentPlaylistID: '',
        currentVideo: {},

        /** Save token data */
        token: function(token) {
            if (token) {
                $localStorage.token = token;
            }
            else {
                return $localStorage.token;
            }
        },

        /** Manage playlist */
        list: {
            add: function(item) {
                var index = 0;
                var added = false;

                if (!$localStorage.list) {
                    $localStorage.list = [];
                }

                index = _.findIndex($localStorage.list, function(o) {
                    return o.id === item.id;
                });
                added = index !== -1;

                if (!added) {
                    $localStorage.list.push(item);
                }

                return added;
            },
            getItems: function() {
                return $localStorage.list;
            },
            deleteItems: function() {
                delete $localStorage.list;
            }
        }
    };

    return userData;
}]);
