'use strict';

angular.module('InstantoClient')
.controller('ProjectsCtrl', ['$scope', '$filter', '$stateParams', 'CONST', 'ProjectsSrv', 'MembersSrv',
                    function ($scope,   $filter,   $stateParams,   CONST,   ProjectsSrv,   MembersSrv) {

    $scope.general = {
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque natus inventore, alias libero quas aliquam corporis, expedita quis ipsa vitae iure dolore, soluta. Molestias earum omnis reiciendis dolorum vero dolores.'
    };
                        
    $scope.financedProjects = [];
                        
    var getAll = function () {
        ProjectsSrv.getAll()
            .success(function (data) {
                if (data.financed_projects) {
                    $scope.financedProjects = reshapeFinancedProject(data.financed_projects);
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };

    var reshapeFinancedProject = function (projectList) {
        angular.forEach(projectList, function (project, idx) {
            project.genuineIdx = idx; // Allows toggling the boxes properly when the results are filtered
            project.ended = $filter('dateMs')(project.ended);
            project.started = $filter('dateMs')(project.started);
        });
        return projectList;
    };

    
    $scope.toggleProjectBox = function (i, forceOpen) {
        var fundingBodies = [];
        
        ProjectsSrv.getPrimaryFundingBody($scope.financedProjects[i].primary_funding_body)
            .success(function (data) {
                if (data) {
                    fundingBodies = fundingBodies.concat([ data.name + ' (' + data.scope + ')' ]);
                    $scope.financedProjects[i].fundingBodies = fundingBodies.join(', ');
                }
            })
            .error(function (data) {
                console.error(data);
            });
        
        ProjectsSrv.getSecondaryFundingBodies($scope.financedProjects[i].id)
            .success(function (data) {
                if (data.funding_bodies) {
                    angular.forEach(data.funding_bodies, function (body) {
                        fundingBodies = fundingBodies.concat([ body.name + ' (' + body.scope + ')' ]);
                    });
                    $scope.financedProjects[i].fundingBodies = fundingBodies.join(', ');
                }
            })
            .error(function (data) {
                console.error(data);
            });
        
        var leaders = [];
        
        MembersSrv.getById($scope.financedProjects[i].primary_leader)
            .success(function (data) {
                if (data) {
                    leaders = leaders.concat({
                                  id: $scope.financedProjects[i].primary_leader,
                                  name: data.first_name + ' ' + data.last_name,
                                  role: ' (Primary)'
                              });
                    $scope.financedProjects[i].projectLeaders = leaders;
                }
            })
            .error(function (data) {
                console.error(data);
            });
        
        ProjectsSrv.getSecondaryLeaders($scope.financedProjects[i].id)
            .success(function (data) {
                if (data.members) {
                    angular.forEach(data.members, function (member) {
                        leaders = leaders.concat({
                                      id: member.id,
                                      name: member.first_name + ' ' + member.last_name
                                  });
                    });
                    $scope.financedProjects[i].projectLeaders = leaders;
                }
            })
            .error(function (data) {
                console.error(data);
            });
        
        if (forceOpen !== undefined) {
            $scope.financedProjects[i].openBox = true;
        } else {
            $scope.financedProjects[i].openBox = $scope.financedProjects[i].openBox 
                                               ? false : true;            
        }
    };
                        
                        
    // Search / filter options
                        
    $scope.projectSearch = {
        toggleOn: false,
        nameBox: '',
        criteria: 'title',
        reversed: false,
        reversedTmp: 'false'
    };
    
    // The orderBy filter only accepts booleans, so...
    $scope.$watch('projectSearch.reversedTmp', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.projectSearch.reversed = newVal === 'true' ? true : false;
        }
    });
    
    $scope.toggleProjects = function () {
        if ($scope.projectSearch.toggleOn) {
            for (var i = 0, l = $scope.financedProjects.length; i < l; i++) {
                $scope.toggleProjectBox(i, true);
            }
        } else {
            angular.forEach($scope.financedProjects, function (project) {
                project.openBox = false;
            });
        }
    };
    

    getAll();
    
                        
    // To be able to call a particular project
    if ($stateParams.title) {
        $scope.projectSearch.nameBox = $stateParams.title;
    }
    
}]);
