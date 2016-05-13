'use strict';

angular
    .module('tubeApp')
    .factory('userDataService', userDataService);

userDataService.$inject = ['$localStorage'];

/** 記錄User的資料 */
function userDataService($localStorage) {
    const userData = {
        currentPlaylist: {},
        currentVideo: {},

        /** Set or get token data */
        tokenData: function (token) {
            if (token) {
                $localStorage.token = token;
            } else {
                return $localStorage.token;
            }
        },

        clear: function () {
            $localStorage.$reset();
        },

        /** Manage playlist */
        list: {
            add: function (item) {
                let index = 0;
                let added = false;

                if (!$localStorage.list) {
                    $localStorage.list = {};
                }

                /*
                {
                    P:[] //playlist,
                    V:[] //video
                }
                */

                _.each($localStorage.list, function (value, key) {
                    index = _.findIndex(value, function (o) {
                        return o.id === item.id;
                    });

                    //index = _.indexOf($localStorage.list, item.id);
                    added = index !== -1;

                    if (!added) {
                        $localStorage.list[key].push(item);
                    }
                });

                return added;
            },
            getItems: function () {
                return $localStorage.list;
            },
            deleteItem: function (type, item) {
                $localStorage.list = _.without($localStorage.list[type], item);
            },
            deleteItems: function () {
                delete $localStorage.list;
            }
        }
    };

    return userData;
}