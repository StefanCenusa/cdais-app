/**
 * Created by Stefana on 4/22/2015.
 */
angular.module('angAccordion', ['collapsibleItem'])
    .controller('angAccordionController', ['$scope', function($scope){
        var collapsibleItems = [];

        this.openCollapsibleItem = function(collapsibleItemToOpen) {
            if( $scope.oneAtATime ) {
                angular.forEach(collapsibleItems, function(collapsibleItem) {
                    collapsibleItem.isOpenned = false;
                    collapsibleItem.icon = collapsibleItem.closeIcon;
                });
            }
            collapsibleItemToOpen.isOpenned = true;
        };

        this.addCollapsibleItem = function(collapsibleItem) {
            collapsibleItems.push(collapsibleItem);

            if ( $scope.closeIconClass !== undefined || $scope.openIconClass !== undefined ) {
                collapsibleItem.iconsType = 'class';
                collapsibleItem.closeIcon = $scope.closeIconClass;
                collapsibleItem.openIcon = $scope.openIconClass;
            }
            else if ( $scope.closeIconUrl !== undefined || $scope.openIconUrl !== undefined ) {
                collapsibleItem.iconsType = 'url';
                collapsibleItem.closeIcon = $scope.closeIconUrl;
                collapsibleItem.openIcon = $scope.openIconUrl;
            }

            collapsibleItem.iconIsOnLeft = $scope.iconPosition == 'left' ? true: false;
        };

    }])
    .directive('angAccordion', function() {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            scope: {
                oneAtATime: '@',
                closeIconUrl: '@',
                openIconUrl: '@',
                closeIconClass: '@',
                openIconClass: '@',
                iconPosition: '@'
            },
            controller: 'angAccordionController',
            template: '<div class="accordion" ng-transclude></div>'
        };
    });