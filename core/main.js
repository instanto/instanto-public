'use strict';

angular
.module('UranusClient', [
    'ui.router',
    'ui.bootstrap'
])
.controller('MainCtrl', ['$scope',
                function ($scope) {

    $scope.appDetails = {
        name: 'Uranus',
        imageName: 'brand-logo.png'
    };
    
}])
.constant('CONST', {
    apiUrl: 'http://localhost:3000/api/',
    dateFormat: 'MMM dd, yyyy' // e.g. Oct 29, 2010
});