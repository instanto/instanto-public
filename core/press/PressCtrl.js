'use strict';

angular.module('UranusClient')
.controller('PressCtrl', ['$scope', '$filter', 'CONST', 'NewspaperSrv',
                 function ($scope,   $filter,   CONST,   NewspaperSrv) {

    $scope.general = {
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque natus inventore, alias libero quas aliquam corporis, expedita quis ipsa vitae iure dolore, soluta. Molestias earum omnis reiciendis dolorum vero dolores.'
    };
                        
    $scope.newspapers = [];
                        
    var getAll = function () {
        NewspaperSrv.getAll()
            .success(function (data) {
                if (data.newspapers) {
                    $scope.newspapers = reshapeNewspapers(data.newspapers);
                }
            })
            .error(function (data) {
                console.error(data);
            });
    };

    var reshapeNewspapers = function (newspaperList) {
        angular.forEach(newspaperList, function (newspaper, idx) {
            newspaper.genuineIdx = idx; // Allows toggling the boxes properly when the results are filtered
            var web = newspaper.web;
            newspaper.web = $filter('externalUrl')(newspaper.web);
            newspaper.logo = newspaper.logo ? CONST.apiUrl + 'media/' + newspaper.logo : '';
            // newspaper.date = $filter('date')(newspaper.date * 1000, CONST.dateFormat);
        });
        return newspaperList;
    };

    
    $scope.toggleNewspaperBox = function (i, forceOpen) {
        NewspaperSrv.getArticles($scope.newspapers[i].id)
            .success(function (data) {
                if (data.articles) {
                    $scope.newspapers[i].articles = data.articles;
                }
            })
            .error(function (data) {
                console.error(data);
            });
        
        if (forceOpen !== undefined) {
            $scope.newspapers[i].openBox = true;
        } else {
            $scope.newspapers[i].openBox = $scope.newspapers[i].openBox ? false : true;            
        }
    };
                     
                     
    $scope.stopClick = function (evt) {
        evt.stopPropagation();
    };
                        
                        
    // Search / filter options
                        
    $scope.pressSearch = {
        toggleOn: false,
        nameBox: ''
    };
    
    $scope.toggleNewspapers = function () {
        if ($scope.pressSearch.toggleOn) {
            for (var i = 0, l = $scope.newspapers.length; i < l; i++) {
                $scope.toggleNewspaperBox(i, true);
            }
        } else {
            angular.forEach($scope.newspapers, function (newspaper) {
                newspaper.openBox = false;
            });
        }
    };
    
                        
    getAll();
    
}]);