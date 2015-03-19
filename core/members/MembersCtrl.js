'use strict';

angular.module('UranusClient')
.controller('MembersCtrl', ['$scope', 'MembersSrv',
                   function ($scope,   MembersSrv) {

    $scope.general = {
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque natus inventore, alias libero quas aliquam corporis, expedita quis ipsa vitae iure dolore, soluta. Molestias earum omnis reiciendis dolorum vero dolores.'
    };

    $scope.members = [];

    var getAllMembers = function () {
        MembersSrv.getAll()
            .success(function (data) {
                if (data.members) {
                    $scope.members = MembersSrv.reshape(data.members);
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };


    $scope.partners = [];

    var getAllPartners = function () {
        MembersSrv.getAllPartners()
            .success(function (data) {
                if (data.partners) {
                    $scope.partners = MembersSrv.reshapePartners(data.partners);
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };


    getAllMembers();
    getAllPartners();
    
}]);