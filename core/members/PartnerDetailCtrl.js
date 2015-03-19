'use strict';

angular.module('InstantoClient')
.controller('PartnerDetailCtrl', ['$scope', '$filter', '$stateParams', 'CONST', 'PartnersSrv',
                         function ($scope,   $filter,   $stateParams,   CONST,   PartnersSrv) {

    var reshapeWeb = function (partner) {
        // Add "http://" at the beginning if it is not already
        partner.webLink = $filter('externalUrl')(partner.web);
        // Remove prefixes to make it shorter (and more beautiful) to display
        partner.webDisplay = partner.web.replace('www.', '')
                                        .replace('http://', '')
                                        .replace('https://', '');
        return partner;
    };
                             
    var getPartnerDetails = function (id) {
        PartnersSrv.getById(id)
            .success(function (data) {
                if (data) {
                    $scope.partner = reshapeWeb(data);
                    $scope.partner.logo = $scope.partner.logo ? CONST.apiUrl + 'media/' + $scope.partner.logo : '';
                    $scope.partner.scope = $filter('capitalize')($scope.partner.scope);
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };

    $scope.zoomPhotoOn = false;

    $scope.toggleZoomPhoto = function () {
        if ($scope.partner.logo) {
            $scope.zoomPhotoOn = !$scope.zoomPhotoOn;
        }
    };


    $scope.members = [];

    var getPartnerMembers = function (id) {
        PartnersSrv.getMembers(id)
            .success(function (data) {
                if (data.members) {
                    $scope.members = data.members;
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };


    $scope.researchLines = [];

    var getPartnerResearchLines = function (id) {
        PartnersSrv.getResearchLines(id)
            .success(function (data) {
                if (data.research_lines) {
                    $scope.researchLines = data.research_lines;
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };


    var partnerId = $stateParams.id;
    getPartnerDetails(partnerId);
    getPartnerMembers(partnerId);
    getPartnerResearchLines(partnerId);
    
}]);
