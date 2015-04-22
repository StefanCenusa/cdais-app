/**
 * Created by Stefana on 4/22/2015.
 */
angular.module('collapsibleItem', [])
    .directive('collapsibleItem', function() {
    return {
        require: '^angAccordion',
        restrict: 'EA',
        transclude: true,
        replace: true,
        scope: {
            title: '@',
            initiallyOpen: '@'
        },
        link: function(scope, element, attrs, accordionController) {
            scope.isOpenned = (scope.initiallyOpen) ? true : false;
            accordionController.addCollapsibleItem(scope);

            if(scope.isOpenned)
                scope.icon = scope.openIcon;
            else
                scope.icon = scope.closeIcon;

            scope.toggleCollapsibleItem = function () {
                if(!scope.isOpenned) {
                    accordionController.openCollapsibleItem(this);
                    scope.icon = scope.openIcon;
                }
                else {
                    scope.isOpenned = false;
                    scope.icon = scope.closeIcon;
                }
            };

            scope.getIconUrl = function ( type ) {
                return type == 'url' ? scope.icon : null;
            };
        },
        template: '<div class="collapsible-item" ng-class="{open: isOpenned}"><div class="title" ng-click="toggleCollapsibleItem()">{{title}}<i ng-show="iconsType == \'class\'" class="{{icon}} icon" ng-class="{iconleft: iconIsOnLeft}"></i><img ng-show="iconsType == \'url\'" class="icon" ng-class="{iconleft: iconIsOnLeft}" ng-src="{{getIconUrl(iconsType)}}" /></div><div class="body"><div class="content" ng-transclude></div></div></div>'
    };
});