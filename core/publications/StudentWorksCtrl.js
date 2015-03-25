'use strict';

angular.module('InstantoClient')
.controller('StudentWorksCtrl', 
        ['$scope', '$stateParams', 'CONST', 'StudentWorksSrv', 'StudentWorksTypesSrv', 'MembersSrv',
function ($scope,   $stateParams,   CONST,   StudentWorksSrv,   StudentWorksTypesSrv,   MembersSrv) {

    $scope.general = {
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque natus inventore, alias libero quas aliquam corporis, expedita quis ipsa vitae iure dolore, soluta. Molestias earum omnis reiciendis dolorum vero dolores.'
    };
                        
    $scope.studentWorks = [];
                        
    var getAll = function (openFirst) {
        StudentWorksSrv.getAll()
            .success(function (data) {
                if (data.student_works) {
                    $scope.studentWorks = reshapeWorks(data.student_works);
                    if (openFirst) {
                        $scope.studentWorks[0].openBox = true;
                    }
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };

    var reshapeWorks = function (workList) {
        angular.forEach(workList, function (work, idx) {
            work.genuineIdx = idx; // Allows toggling the boxes properly when the results are filtered
        });
        return workList;
    };

    
    $scope.toggleWorkBox = function (i, forceOpen) {
        StudentWorksSrv.getResearchLines($scope.studentWorks[i].id)
            .success(function (data) {
                if (data.research_lines) {
                    $scope.studentWorks[i].researchLines = data.research_lines;
                }
            })
            .error(function (data) {
                console.error(data);
            });
        
        MembersSrv.getById($scope.studentWorks[i].author)
            .success(function (data) {
                if (data) {
                    $scope.studentWorks[i].author_name = data.first_name + ' ' + data.last_name;
                }
            })
            .error(function (data) {
                console.error(data);
            });
        
        StudentWorksTypesSrv.getById($scope.studentWorks[i].student_work_type)
            .success(function (data) {
                if (data) {
                    $scope.studentWorks[i].type_name = data.name;
                }
            })
            .error(function (data) {
                console.error(data);
            });
        
        if (forceOpen !== undefined) {
            $scope.studentWorks[i].openBox = true;
        } else {
            $scope.studentWorks[i].openBox = $scope.studentWorks[i].openBox 
                                               ? false : true;            
        }
    };
                        
                        
    // Search / filter options
                        
    $scope.studentWorkSearch = {
        toggleOn: false,
        nameBox: '',
        criteria: 'title',
        reversed: false,
        reversedTmp: 'false'
    };
    
    // The orderBy filter only accepts booleans, so...
    $scope.$watch('studentWorkSearch.reversedTmp', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.studentWorkSearch.reversed = newVal === 'true' ? true : false;
        }
    });
    
    $scope.toggleWorks = function () {
        if ($scope.studentWorkSearch.toggleOn) {
            for (var i = 0, l = $scope.studentWorks.length; i < l; i++) {
                $scope.toggleWorkBox(i, true);
            }
        } else {
            angular.forEach($scope.studentWorks, function (work) {
                work.openBox = false;
            });
        }
    };
    
                        
    // To be able to call a particular work
    if ($stateParams.title) {
        $scope.studentWorkSearch.nameBox = $stateParams.title;
        getAll(true);
    } else {
        getAll(false);        
    }
    
}]);
