/* global MarkerClusterer: true, google: true */
(function() {
    "use strict";

    angular.module('hippo.theme')

    /**
     * @ngdoc directive
     * @name hippo.theme.directive:map
     * @restrict A
     *
     * @description
     * Uses Google Maps to display a map with the markers provided.
     * The markers are grouped when they are close to each other.
     *
     * @scope
     * @param {Array} points A list of point objects, having a longitude- and latitude property, to be visualised. Each having a longitude and latitude property.
     */
    .directive('hippo.theme.map', [

        function() {
            return {
                restrict: 'E',
                scope: {
                    points: '=markers'
                },
                link: function(scope, elem, attrs) {
                    // map options
                    var latlng = new google.maps.LatLng(52.359448, 4.901317);
                    var options = {
                        zoom: 8,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        center: latlng
                    };
                    var map = new google.maps.Map(elem[0], options);
                    var markerCluster = new MarkerClusterer(map, []);

                    scope.$watch('points', function(points) {
                        // points to Google latLng objects
                        var latLngList = _.map(points, function(point) {
                            return new google.maps.LatLng(point.latitude, point.longitude);
                        });

                        // (re)draw map with markers
                        drawMarkers(latLngList);
                    });

                    function drawMarkers(latLngList) {
                        // create markers
                        var markers = _.map(latLngList, function(latLng) {
                            return new google.maps.Marker({
                                'position': latLng
                            });
                        });

                        // add markers to map
                        markerCluster.clearMarkers();
                        markerCluster.addMarkers(markers);
                        markerCluster.redraw();

                        // map viewpoint based on all markers
                        var bounds = new google.maps.LatLngBounds();
                        angular.forEach(latLngList, function(latLng) {
                            bounds.extend(latLng);
                        });

                        if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
                            var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.015, bounds.getNorthEast().lng() + 0.015);
                            var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.015, bounds.getNorthEast().lng() - 0.015);
                            bounds.extend(extendPoint1);
                            bounds.extend(extendPoint2);
                        }

                        //  fit these bounds to the map
                        map.fitBounds(bounds);
                    }
                }
            };
        }
    ]);
})();