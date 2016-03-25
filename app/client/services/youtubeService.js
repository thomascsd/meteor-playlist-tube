'use strict';
const app = angular.module('tubeApp');

/** 連結Youtube的service */
app.factory('youtubeService', ['$http', '$q', function($http, $q) {
    const appscopes = [
        encodeURIComponent('https://www.googleapis.com/auth/youtube'),
        encodeURIComponent('https://www.googleapis.com/auth/youtube.readonly'),
        encodeURIComponent('https://www.googleapis.com/auth/youtubepartner')
    ];

    function PlaylistDetail(token, playlistID) {
        this.items = [];
        this.pageToken = '';
        this.isBusy = false;
        this.token = token;
        this.playlistID = playlistID;
        this.totalResults = 0;
        this.position = 0;
    }

    PlaylistDetail.prototype.list = function() {
        var self = this;
        if (this.isBusy) {
            return;
        }
        this.isBusy = true;

        if (this.totalResults !== 0 &&
            this.position !== 0 &&
            this.position === (this.totalResults - 1)) {
            //目前item的index到達集合的長度時，不取得資料
            this.isBusy = false;
            return;
        }

        var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=' + this.playlistID +
            '&access_token=' + this.token;

        if (this.pageToken) {
            url += '&pageToken=' + this.pageToken;
        }

        $http.get(url).then(function(data) {
            var yitems = data.data.items;
            Array.prototype.push.apply(self.items, yitems);
            self.pageToken = data.data.nextPageToken;
            self.isBusy = false;
            self.totalResults = data.data.pageInfo.totalResults;

            var lastItem = yitems[yitems.length - 1];
            self.position = lastItem.snippet.position;
        });

    }

    const service = {
        clientID: Meteor.settings.public.clientID,
        secretID: Meteor.settings.public.secretID,
        host: Meteor.settings.public.host,
        login: function() {
            let requestToken;
            let debug = true;
            const host = '';
            const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' + service.clientID +
                '&redirect_uri=' + service.host + '/callback&scope=' + appscopes.join(" ") +
                '&approval_prompt=force&response_type=code';

            if (Meteor.isCordova) {
                var defer = $q.defer();
                //return $cordovaOauth.google(clientID, appscopes);
                var ref = window.open(url, '_blank', 'location=no');

                ref.addEventListener('loadstart', function(event) {
                    if ((event.url).startsWith("http://localhost/callback")) {
                        requestToken = (event.url).split("access_token=")[1];

                        //alert('request token:' + requestToken);
                        //alert('appConfig.clientID:' + appConfig.clientID);
                        //alert('appConfig.clientSecret:' + appConfig.clientSecret);

                        return service.getToken(requestToken);

                        ref.close();
                    }
                });

                return defer.promise;
            }
            else {
                window.location.href = url;
            }

        },
        getToken: function(requestToken) {
            const defer = $q.defer();
            let data = '';

            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

            if (!requestToken) {
                const url = location.href;
                requestToken = url.split("code=")[1];
            }

            data = "client_id=" + service.clientID + "&client_secret=" + service.secretID +
                "&redirect_uri=" + service.host + "/callback" + "&grant_type=authorization_code" +
                "&code=" + requestToken;

            $http({
                    method: "post",
                    url: "https://www.googleapis.com/oauth2/v4/token",
                    data: data
                })
                .success(service.getTokenSuccess(defer))
                .error(service.getTokenError(defer));

            return defer.promise;
        },

        getTokenSuccess: function(defer, refreshToken) {
            return function(data) {
                let time = new Date();
                time.setSeconds(time.getSeconds() + data.expire_in);

                if (!refreshToken) {
                    refreshToken = data.refresh_token;
                }

                defer.resolve({
                    token: data.access_token,
                    refreshToken: refreshToken,
                    expire: time
                });
            };
        },
        getTokenError: function(defer) {
            return function(data, status) {
                defer.reject("ERROR: " + JSON.stringify(data));
            };
        },

        isLogingIn: function() {
            const url = location.href;
            return url.indexOf('callback') !== -1;
        },

        /** Check wheler token is expired */
        isExpired: function(data) {
            let now = new Date();
            if (data) {
                now.setMinutes(now.getMinutes() - 2);

                if (now >= data.expire) {
                    return true;
                }

            }

            return false;
        },

        reGetToken: function(tokenData) {
            let defer = $q.defer();
            const data = 'client_id=' + service.clientID + '&client_secret=' + service.secretID + '&' +
                'refresh_token=' + tokenData.refreshToken + '&grant_type=refresh_token';

            $http({
                    method: 'post',
                    url: 'https://www.googleapis.com/oauth2/v4/token',
                    data: data
                })
                .success(service.getTokenSuccess(defer, tokenData.refreshToken))
                .error(service.getTokenError(defer));

            return defer.promise;
        },

        /** Get user's playlist */
        getPlaylists: function(token) {
            const url = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&mine=true&access_token=' + token;

            return $http.get(url);
        },

        /** Get playlist item list */
        getPlaylistDetail: function(token, playlistID) {
            return new PlaylistDetail(token, playlistID);
        },

        search: function() {

        }
    };

    return service;
}]);

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(str) {
        return this.indexOf(str) === 0;
    };
}
