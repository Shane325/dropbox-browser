'use strict';

var myApp = angular.module('myApp', ['ngRoute']);

myApp.controller('mainController', mainController);

mainController.$inject = ['$http', '$window', '$location'];

// Main controller
function mainController($http, $window, $location) {

    var vm = this;
    vm.auth = auth;

    init()

    // init function
    function init() {
        getAccessTokenFromUrl();
    }

    function getAccount(token) {
        $http.get('/api/dropbox/getAccount', {
                params: {
                    token: token
                }
            })
            .success(function(response) {
                vm.account = response;
            });
    }

    function getFilesAndFolders(token) {
        $http.get('/api/dropbox/getFilesAndFolders', {
                params: {
                    token: token
                }
            })
            .success(function(response) {
                vm.filesAndFolders = response;
            });
    }

    function auth() {
        $http.get('/api/dropbox/auth')
            .success(function(url) {
                $window.location.href = url;
            });
    }

    function getAccessTokenFromUrl() {
        var url = $location.url();

        if (url.indexOf('=') !== -1) {
            vm.token = url.split('=')[1].split('&')[0]
            getAccount(vm.token);
            getFilesAndFolders(vm.token);
        }
    }

}
