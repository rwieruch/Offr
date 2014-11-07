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
      scope: {
      	hardskill: '=hardskill',
      	selecteduser: '=selecteduser',
      	hoveredfrom: '&hoveredfrom',
      	hovered: '=hovered'
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

					var margin = {top: 20, right: 20, bottom: 20, left: 20},
							width = 275,
					    height = 275,
					    radius = Math.min(width, height) / 2;

			    var color = d3.scale.ordinal()
    					.range(["#FFA500", "#E69400", "#FFEDCC", "#FFE4B2", "#FFDB99", "#FFD280", "#FFC966", "#FFC04D", "#FFB733", "#FFAE19"]);

					var arc = d3.svg.arc()
					    .outerRadius(radius - 10)
					    .innerRadius(0);

					var arcLabels = d3.svg.arc()
					    .outerRadius(radius + 60)
					    .innerRadius(0);

	       	var arcOver = d3.svg.arc()
        			.outerRadius(radius - 20);

					var pie = d3.layout.pie()
					    .sort(null)
					    .value(function(d) { return d.expertise; });

					var svg = d3.select(element[0]).append('svg')
					    .attr("width", width)
					    .attr("height", height + margin.top + margin.bottom)
					  .append("g")
					    .attr("transform", "translate(" + width/2 + "," + ((height/2) + margin.top) + ")");

			    svg.append("text")
				      .attr("class", "label-big")
				      .attr("x", 0)
				      .attr("y", -height/2)
				      .style("text-anchor", "middle")
				      .text("Hardskills");

          scope.$watch('hardskill', function (newVal, oldVal) {
						if (angular.isUndefined(newVal) || newVal === null) return;

						var data = newVal;

					  data.forEach(function(d) {
					    d.expertise = +d.expertise;
					  });

					  var g = svg.selectAll(".arc")
					      .data(pie(data))
					    .enter().append("g")
					      .attr("class", "arc")	
					      .attr("id", function(d) { return "path_" + d.data.tag; })			              
					    .on("mouseover", function(d) {
			            d3.select(this).select("path")
			            		.style("fill", "#FF4500")
			            	  .transition()
			                .duration(300)
			                .attr("d", arcOver);
	                scope.hoveredfrom({args:d.data});
			        })
			        .on("mouseout", function(d, i) {
			            d3.select(this).select("path").transition()
			               .duration(300)
			               .style("fill", function(d) { return color(d.data.tag); })
			               .attr("d", arc);
	               	scope.hoveredfrom({args:null});
			        });

					  g.append("path")
					      .attr("d", arc)
					      .style("fill", function(d) { return color(d.data.tag); });

					  g.append("text")
					  		.attr("class","pietext")
					      .attr("transform", function(d) { return "translate(" + arcLabels.centroid(d) + ")"; })
					      .attr("dy", ".35em")
					      .style("text-anchor", "middle")
					      .text(function(d) { return d.data.expertise + " %"; });

	        });

          /*scope.$watch('hardskill', function (newVal, oldVal) {
						if (angular.isUndefined(newVal) || newVal === null) return;

				    pie.value(function(d) { return d[newVal]; });
				    g = g.data(pie);
				    g.attr("d", arc);

					});*/

					scope.$watch('hovered', function (newVal, oldVal) {
						if (angular.isUndefined(newVal)) return;

						if(newVal !== null) {
							d3.select("#path_" + newVal.tag).select("path")
				            		.style("fill", "#FF4500")
				            	  .transition()
				                .duration(300)
				                .attr("d", arcOver);
            } else {
							d3.select("#path_" + oldVal.tag).select("path")
										.transition()
			               .duration(300)
			               .style("fill", function(d) { return color(d.data.tag); })
			               .attr("d", arc);
            }
					});

				});
      }};
    }]);
