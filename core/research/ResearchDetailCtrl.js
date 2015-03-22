'use strict';

angular.module('InstantoClient')
.controller('ResearchDetailCtrl', ['$scope', '$filter', '$stateParams', 'MembersSrv', 'NewspaperSrv', 'ResearchLineSrv',
                          function ($scope,   $filter,   $stateParams,   MembersSrv,   NewspaperSrv,   ResearchLineSrv) {

    $scope.researchLine = {};
    
    var reshapeResearchLine = function (researchLine) {
            researchLine.logo = researchLine.logo ? CONST.apiUrl + 'media/' + researchLine.logo : '';
        return researchLine;
    };

    var getResearchLineDetails = function (id) {
        ResearchLineSrv.getById(id)
            .success(function (data) {
                if (data) {
                    $scope.researchLine = reshapeResearchLine(data);
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };
                
                              
    var reshapePublication = function (publicationList, role) {
        angular.forEach(publicationList, function (publication) {            
            MembersSrv.getById(publication.primary_author)
                .success(function (data) {
                    if (data) {
                        publication.main_author = data.last_name + ', ' + data.first_name;
                    }
                })
                .error(function (data) {
                    console.error(data);
                });
        });
        return publicationList;
    };
                              
    $scope.publications = [];

    var getPublications = function (id) {
        ResearchLineSrv.getPublications(id)
            .success(function (data) {
                if (data.publications) {
                    $scope.publications = $scope.publications.concat(reshapePublication(data.publications));
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };
                            
                          
    var reshapeArticles = function (articleList) {
        angular.forEach(articleList, function (article) {
            NewspaperSrv.getById(article.id)
                .success(function (data) {
                    if (data) {
                        article.newspaper_name = data.name;
                    }
                })
                .error(function (data) {
                    console.error(data);
                });
        });
        return articleList;
    };
                              
    $scope.articles = [];

    var getArticles = function (id) {
        ResearchLineSrv.getArticles(id)
            .success(function (data) {
                if (data.articles) {
                    $scope.articles = reshapeArticles(data.articles);
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
        });
        return projectList;
    };           
                              
    $scope.financedProjects = [];

    var getFinancedProjects = function (id) {
        ResearchLineSrv.getFinancedProjects(id)
            .success(function (data) {
                if (data.financed_projects) {
                    $scope.financedProjects = reshapeFinancedProject(data.financed_projects, '');
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };


    var reshapeStudentWorks = function (workList) {
        angular.forEach(workList, function (work) {
            MembersSrv.getById(work.author)
                .success(function (data) {
                    if (data) {
                        work.work_author = data.last_name + ', ' + data.first_name;
                    }
                })
                .error(function (data) {
                    console.error(data);
                });
        });
        return workList;
    };
                            
    // TO-DO: either create an specific detaild view for student works or include here all the
    // data (currently missing volume and student_work_type)
    $scope.studentWorks = [];

    var getStudentWorks = function (id) {
        ResearchLineSrv.getStudentWorks(id)
            .success(function (data) {
                if (data.student_works) {
                    $scope.studentWorks = reshapeStudentWorks(data.student_works);
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };
                            
    
    $scope.members = [];

    var getMembers = function (id) {
        ResearchLineSrv.getMembers(id)
            .success(function (data) {
                if (data.members) {
                    $scope.members = data.members;
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };
                            
    
    $scope.partners = [];

    var getPartners = function (id) {
        ResearchLineSrv.getPartners(id)
            .success(function (data) {
                if (data.partners) {
                    $scope.partners = data.partners;
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };
    
    
    /* 401 Unauhtorized
    $scope.researchAreas = [];
                            
    var getSecondaryResearchAreas = function (id) {
        ResearchLineSrv.getSecondaryResearchAreas(id)
            .success(function (data) {
                console.log(data);
                if (data.research_areas) {
                    $scope.researchAreas = data.research_areas;
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };
    */
                        
                        
    $scope.searchTxtResearch = '';


    var researchLineId = $stateParams.id;
    getResearchLineDetails(researchLineId);
    getPublications(researchLineId);
    getArticles(researchLineId);
    getFinancedProjects(researchLineId);
    getStudentWorks(researchLineId);
    getMembers(researchLineId);
    getPartners(researchLineId);
    // getSecondaryResearchAreas(researchLineId);

}]);
