'use strict';

angular
.module('InstantoClient', [
    'ui.router',
    'ui.bootstrap'
])
.controller('MainCtrl', ['$scope',
                function ($scope) {

    $scope.appDetails = {
        name: 'Instanto',
        imageName: 'brand-logo.png'
    };
    
}])
.constant('CONST', {
    apiUrl: '/api/',
    dateFormat: 'MMM dd, yyyy' // e.g. Oct 29, 2010
});
