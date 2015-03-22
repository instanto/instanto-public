angular.module('InstantoClient')
.controller('MemberDetailCtrl', ['$scope', '$filter', '$stateParams', 'CONST', 'MembersSrv', 'StatusesSrv',
                        function ($scope,   $filter,   $stateParams,   CONST,   MembersSrv,   StatusesSrv) {

    var getMemberDetails = function (id) {
        MembersSrv.getById(id)
            .success(function (data) {
                if (data) {
                    $scope.member = MembersSrv.reshape([data])[0];
                    StatusesSrv.getById($scope.member.primary_status)
                        .success(function (data) {
                            $scope.member.primary_status = data.name;
                            $scope.member.status_description = data.description;
                        })
                        .error(function (data) {
                            console.error(data);
                        });
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };

    $scope.zoomPhotoOn = false;

    $scope.toggleZoomPhoto = function () {
        if ($scope.member.photo) {
            $scope.zoomPhotoOn = !$scope.zoomPhotoOn;
        }
    };

                            
    var reshapePublication = function (publicationList, role) {
        angular.forEach(publicationList, function (publication) {
            publication.edition = publication.edition ? ' (Edition ' + publication.edition + ')' : '';
            publication.role = role ? ' – ' + role : '';
        });
        return publicationList;
    };

    $scope.publications = [];

    var getMemberPublications = function (id) {
        MembersSrv.getPrimaryPublications(id)
            .success(function (data) {
                if (data.publications) {
                    $scope.publications = $scope.publications.concat(reshapePublication(data.publications, 'Main author'));
                }
            })
            .error(function (data) {
                console.error(data);
            });

         MembersSrv.getSecondaryPublications(id)
            .success(function (data) {
                if (data.publications) {
                    $scope.publications = $scope.publications.concat(reshapePublication(data.publications, 'Co-author'));
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };


    $scope.studentWorks = [];

    var getMemberStudentWorks = function (id) {
        MembersSrv.getStudentWorks(id)
            .success(function (data) {
                if (data.student_works) {
                    $scope.studentWorks = data.student_works;
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };


    $scope.financedProjects = [];

    var getMemberFinancedProjects = function (id) {
        MembersSrv.getFinancedProjects(id)
            .success(function (data) {
                console.warn(data); // TO-DO: review
                if (data.financed_projects) {
                    $scope.financedProjects = $scope.financedProjects.concat(reshapeFinancedProject(data.financed_projects, ''));
                }
            })
            .error(function (data) {
                console.error(data);
            });

        MembersSrv.getPrimaryLeaderedFinancedProjects(id)
            .success(function (data) {
                if (data.financed_projects) {
                    $scope.financedProjects = $scope.financedProjects.concat(reshapeFinancedProject(data.financed_projects, 'Primary leader'));
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };

    var reshapeFinancedProject = function (projectList, role) {
        angular.forEach(projectList, function (project) {
            var end = project.ended ? $filter('dateMs')(project.ended) : 'Unfinished';
            project.dateRange = ' (' + $filter('dateMs')(project.started) + ' – ' + end + ')';
            project.role = role ? ' – ' + role : '';
        });
        return projectList;
    };
    
    
    $scope.researchLines = [];
                            
    var getMemberResearchLines = function (id) {
        MembersSrv.getResearchLines(id)
            .success(function (data) {
                if (data.research_lines) {
                    $scope.researchLines = data.research_lines;
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };
                            
    
    $scope.partners = [];

    var getMemberPartners = function (id) {
        MembersSrv.getPartners(id)
            .success(function (data) {
                if (data.partners) {
                    $scope.partners = data.partners;
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };


    var memberId = $stateParams.id;
    getMemberDetails(memberId);
    getMemberPublications(memberId);
    getMemberStudentWorks(memberId);
    getMemberFinancedProjects(memberId);
    getMemberResearchLines(memberId);
    getMemberPartners(memberId);
    
}]);
