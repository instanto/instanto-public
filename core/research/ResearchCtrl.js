'use strict';

angular.module('UranusClient')
.controller('ResearchCtrl', ['$scope', 'ResearchLineSrv',
                    function ($scope,   ResearchLineSrv) {

    $scope.general = {
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque natus inventore, alias libero quas aliquam corporis, expedita quis ipsa vitae iure dolore, soluta. Molestias earum omnis reiciendis dolorum vero dolores.'
    };

                        
    $scope.researchLines = [];
    
    var reshapeResearchLines = function (researchLinesList) {
        angular.forEach(researchLinesList, function (researchLine) {
            researchLine.logo = researchLine.logo ? CONST.apiUrl + 'media/' + researchLine.logo : '';
        });
        return researchLinesList;
    };

    var getAllResearchLines = function () {
        ResearchLineSrv.getAll()
            .success(function (data) {
                if (data.research_lines) {
                    $scope.researchLines = reshapeResearchLines(data.research_lines);
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };
                        
    
    $scope.searchTxtResearch = '';


    getAllResearchLines();

}]);