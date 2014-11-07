'use strict';

/**
 * @ngdoc directive
 * @name offrApp.directive:pieChart
 * @description
 * # pieChart
 */
angular.module('offrApp')
  .directive('pieChart', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

					var width = 275,
					    height = 275,
					    radius = Math.min(width, height) / 2;

			    var color = d3.scale.ordinal()
    					.range(["#FFA500", "#ffae1a", "#ffb733", "#ffc04d"]);

					var arc = d3.svg.arc()
					    .outerRadius(radius - 10)
					    .innerRadius(0);

					var pie = d3.layout.pie()
					    .sort(null)
					    .value(function(d) { return d.population; });

					var svg = d3.select(element[0]).append('svg')
					    .attr("width", width)
					    .attr("height", height)
					  .append("g")
					    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

					var data = [
						{ population: 5667456, age: "5-13" },
						{ population: 7067456, age: "14-17" },
						{ population: 9867456, age: "17-21" }
					];

				  data.forEach(function(d) {
				    d.population = +d.population;
				  });

				  var g = svg.selectAll(".arc")
				      .data(pie(data))
				    .enter().append("g")
				      .attr("class", "arc");

				  g.append("path")
				      .attr("d", arc)
				      .style("fill", function(d) { return color(d.data.age); });

				  g.append("text")
				  		.attr("class","pietext")
				      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
				      .attr("dy", ".35em")
				      .style("text-anchor", "middle")
				      .text(function(d) { return d.data.age; });

        });
      }};
    }]);
