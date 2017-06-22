angular.module('restaurant', ['restaurant.controller', 'ui.router'])
    .config(function($stateProvider) {
        $stateProvider.state('getRestaurants', {
            url: '/restaurants',
            controller: 'GetRestaurants',
            templateUrl: '/views/restaurants.html',
            resolve: {
                restaurantslist: function(RestaurantListFactory) {
                    return RestaurantListFactory.getRestaurants();
                }
            }
        }).state('getRestaurant', {
            url: '/restaurant',
            controller: 'GetRestaurant',
            templateUrl: '/views/restaurant.html',
            resolve: {
                restaurant: function(RestaurantListFactory) {
                    return RestaurantListFactory.getRestaurant();
                }
            }
        });
    })
    .value('host', 'localhost:5000');