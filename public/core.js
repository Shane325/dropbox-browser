'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'chart.js']);

myApp.controller('mainController', mainController);

mainController.$inject = ['$http', '$window', '$location'];

// Main controller
function mainController($http, $window, $location) {

    var vm = this;
    vm.auth = auth;
    vm.getFilesAndFolders = getFilesAndFolders;
    vm.convertBytesToGB = convertBytesToGB;

    init()

    // init function
    function init() {
        getAccessTokenFromUrl();
    }

    function convertBytesToGB(bytes, decimalPoint) {
        if (bytes == 0) return '0 Bytes';
        var k = 1000,
            dm = decimalPoint || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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

    function getFilesAndFolders(token, path) {
        $http.get('/api/dropbox/getFilesAndFolders', {
                params: {
                    token: token,
                    path: path
                }
            })
            .success(function(response) {
                vm.filesAndFolders = response;
            });
    }

    function getUsage(token) {
        $http.get('/api/dropbox/getUsage', {
                params: {
                    token: token
                }
            })
            .success(function(response) {
                vm.usage = response;
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
            getFilesAndFolders(vm.token, '');
            getUsage(vm.token);
        }
    }

}
