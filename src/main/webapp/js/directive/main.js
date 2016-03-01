var direc = angular.module('mainDirective', []);
direc.directive('navTop', [function () {
        return {
            restrict: 'AE',
            templateUrl: 'template/part/nav.html',
            scope: {
                center: '@',
                left: '@',
                right: '@',
                fnLeft: '&',
                fnRight: '&',
                loading: '@'
            },
            link: function (scope, element, attrs) {
                scope['showLeft'] = true;
                scope['showRight'] = true;
                //scope.watch()
            }
        }
    }])
    .directive('changeFile', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeHandler = scope.$eval(attrs.changeFile);
                element.bind('change', onChangeHandler);
            }
        };
    }])
    .directive('listBottom', [function () {
        return {
            restrict: 'AEC',
            templateUrl: 'template/part/list_bottom.html'
        };
    }]).directive('laddaButton', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            // Create ladda instance.
            var l = Ladda.create(element[0]);
            // Watch laddButton attribute;
            scope.$watch(attributes.laddaButton, function (value) {
                // If directive value is number show progress bar
                if (typeof value === "number") {
                    if (!l.isLoading()) {
                        l.start();
                    }
                    l.setProgress(value / 100);
                } else if (value === true) {
                    // If directive value is true start loading
                    l.start();
                } else if (value === false) {
                    // If directive value is true start loading
                    l.stop();
                }
            });
        }
    };
});