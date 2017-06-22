angular.module('restaurant.service')
    .factory('RestaurantListFactory', function($q , $http, host) {
        return {
            getRestaurants: function() {
                var defer = $q.defer();
                $http.get(host + '/restaurants').success(function(response) {
                    defer.resolve(response);
                });
                return defer.promise;
            },
            getRestaurant: function() {
                var defer = $q.defer();
                $http.get(host + '/restaurant').success(function(response) {
                    defer.resolve(response);
                });
                return defer.promise;
            }
        }
    });