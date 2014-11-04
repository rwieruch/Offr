'use strict';

/**
 * @ngdoc directive
 * @name offrApp.directive:tagBarChart
 * @description
 * # tagBarChart
 */
angular.module('offrApp')
  .directive('tagBarChart', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: { 
      	hardskill: '='
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

          // Hard coded data
          /*scope.data = [
            {tag: 'JavaScript', expertise: 34},
            {tag: 'D3', expertise: 45},
            {tag: 'Angular', expertise: 37},
            {tag: 'Ember', expertise: 56},
            {tag: 'Backbone', expertise: 50},
            {tag: 'Grunt', expertise: 77}
          ];*/
          

          scope.hardskill.forEach(function(d) {
            d.expertise = +d.expertise;
          });

          var margin = {top: 40, right: 20, bottom: 100, left: 40},
				    width = 500 - margin.left - margin.right,
				    height = 300 - margin.top - margin.bottom;

					var formatPercent = d3.format("%");

					var x = d3.scale.ordinal()
					    .rangeRoundBands([0, width], .1);

					var y = d3.scale.linear()
					    .range([height, 0]);

					var xAxis = d3.svg.axis()
					    .scale(x)
					    .orient("bottom");

					var yAxis = d3.svg.axis()
					    .scale(y)
					    .tickFormat("")
					    .ticks("")
					    .orient("left");

					var svg = d3.select(element[0]).append('svg')
					    .attr("width", width + margin.left + margin.right)
					    .attr("height", height + margin.top + margin.bottom)
					  .append("g")
					    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				  x.domain(scope.hardskill.map(function(d) { return d.tag; }));
				  y.domain([0, d3.max(scope.hardskill, function(d) { return d.expertise; })]);

				  svg.append("g")
				      .attr("class", "x axis")
				      .attr("transform", "translate(0," + height + ")")
				      .call(xAxis)
           	.selectAll("text")  
	            .style("text-anchor", "end")
	            .attr("dx", "-.8em")
	            .attr("dy", ".15em")
	            .attr("transform", function(d) {
	                return "rotate(-65)" 
              });

				  var yAxis = svg.append("g")
				      .attr("class", "y axis")
				      .call(yAxis);
				  
				  // append y axis labels
			    yAxis.append("text")
			    	.attr("class", "label-mid")
			      .attr("transform", "rotate(-90)")
			      .attr("x", -height/2)
			      .attr("y", -38)
			      .attr("dy", ".71em")
			      .style("text-anchor", "middle")
			      .text("Expertise");

  			  yAxis.append("text")
			      .attr("class", "label-small")
			      .attr("transform", "rotate(-90)")
			      .attr("y", -22)
			      .attr("dy", ".71em")
			      .style("text-anchor", "end")
			      .text("great");

				  yAxis.append("text")
			      .attr("class", "label-small")
			      .attr("transform", "rotate(-90)")
			      .attr("x", -height)
			      .attr("y", -22)
			      .attr("dy", ".71em")
			      .style("text-anchor", "start")
			      .text("poor");

				  svg.selectAll(".bar")
				      .data(scope.hardskill)
				    .enter().append("rect")
				      .attr("class", "bar")
				      .attr("x", function(d) { return x(d.tag); })
				      .attr("width", x.rangeBand())
				      .attr("y", function(d) { return y(d.expertise); })
				      .attr("height", function(d) { return height - y(d.expertise); })
			      .on("mouseover", function() {
			        d3.select(this)
			          .style("fill", "orangered")
						}).on("mouseout", function() {
					    d3.select(this)
					      .transition()
					      .duration(250)
					      .style("fill", "orange");
						});
	      });
	    }
	  };
	}]);
