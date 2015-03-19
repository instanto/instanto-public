'use strict';

angular.module('UranusClient')
.controller('PublicationsCtrl', ['$scope', '$stateParams', 'PublicationsSrv', 'MembersSrv', 'PublisherSrv', 
                        function ($scope,   $stateParams,   PublicationsSrv,   MembersSrv,   PublisherSrv) {

    $scope.general = {
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque natus inventore, alias libero quas aliquam corporis, expedita quis ipsa vitae iure dolore, soluta. Molestias earum omnis reiciendis dolorum vero dolores.'
    };
    
    $scope.setFontSize = function (title) {
        var words = title.split(' ').length,
            size;
        
             if (words < 10) size = 26;
        else if (words < 20) size = 22;
        else if (words < 30) size = 20;
        else if (words < 40) size = 16;
        else                 size = 14;
        
        return {
            'font-size': size + 'px'
        };
    };
    

    $scope.publications = [];
                            
    var getAllPublications = function () {
        PublicationsSrv.getAll()
            .success(function (data) {
                if (data.publications) {
                    $scope.publications = data.publications;
                    getPublicationTypes();
                    changeIdsByNames();
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };
    
    
    var getTypeName = function (types, id) {
        var name = '';
        angular.forEach(types, function (type) {
            if (type.id === id) {
                name = type.name;
            }
        });
        return name;
    };
    
    // This way we avoid several AJAX requests to get the same type name (not done
    // on the other requests, where caching was preferred)
    var getPublicationTypes = function () {
        PublicationsSrv.getAllTypes()
            .success(function (data) {
                if (data.publication_types) {
                    angular.forEach($scope.publications, function (item) {
                        item.publication_type = getTypeName(data.publication_types,
                                                            item.publication_type);
                    });
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };


    var changeIdsByNames = function () {
        angular.forEach($scope.publications, function (item) {
            MembersSrv.getById(item.primary_author)
                .success(function (data) {
                    if (data) {
                        item.author_name = data.first_name + ' ' + data.last_name;
                    }
                })
                .error(function (data) {
                    console.error(data);
                });
            
            PublisherSrv.getById(item.publisher)
                .success(function (data) {
                    if (data) {
                        item.publisher = data.name;
                    }
                })
                .error(function (data) {
                    console.error(data);
                });            
        });
    };
                            
                            
    // Search / filter options
                        
    $scope.publicationSearch = {
        nameBox: '',
        criteria: 'year',
        reversed: true,
        reversedTmp: 'true'
    };
    
    // The orderBy filter only accepts booleans, so...
    $scope.$watch('publicationSearch.reversedTmp', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.publicationSearch.reversed = newVal === 'true' ? true : false;
        }
    });

                            
    getAllPublications();


    // To be able to call a particular project
    if ($stateParams.title) {
        $scope.publicationSearch.nameBox = $stateParams.title;
    }
                            
}]);