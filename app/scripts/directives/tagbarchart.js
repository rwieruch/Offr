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
      	hardskill: '=hardskill',
      	hovered: '=hovered'
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

        	var margin = {top: 40, right: 20, bottom: 50, left: 40},
				    	width = 525 - margin.left - margin.right,
				    	height = 300 - margin.top - margin.bottom;

					//var formatPercent = d3.format("%");

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

			    svg.append("text")
			      .attr("class", "label-big")
			      .attr("x", width/2)
			      .attr("y", -22)
			      .style("text-anchor", "middle")
			      .text("Skills");

 				  // x axis content
				  var xAxisContent = svg.append("g")
				      .attr("class", "x axis")
				      .attr("transform", "translate(0," + height + ")")
				      .call(xAxis);

	        // y axis content
				  var yAxisContent = svg.append("g")
				      .attr("class", "y axis")
				      .call(yAxis);
				  
			    yAxisContent.append("text")
				    	.attr("class", "label-mid")
				      .attr("transform", "rotate(-90)")
				      .attr("x", -height/2)
				      .attr("y", -38)
				      .attr("dy", ".71em")
				      .style("text-anchor", "middle")
				      .text("Expertise");

  			  yAxisContent.append("text")
			      .attr("class", "label-small")
			      .attr("transform", "rotate(-90)")
			      .attr("y", -22)
			      .attr("dy", ".71em")
			      .style("text-anchor", "end")
			      .text("great");

				  yAxisContent.append("text")
			      .attr("class", "label-small")
			      .attr("transform", "rotate(-90)")
			      .attr("x", -height)
			      .attr("y", -22)
			      .attr("dy", ".71em")
			      .style("text-anchor", "start")
			      .text("poor");

          scope.$watch('hardskill', function (newVal, oldVal) {

	          newVal.forEach(function(d) {
	            d.expertise = +d.expertise;
	          });

						// create or update y axis
  			  	y.domain([0, 100]);
					  svg.select(".y.axis")
					    	.transition()
					    	.delay(300)
	    					.duration(300)
					      .call(yAxis);

          	// create or update x axis
					  x.domain(newVal.map(function(d) { return d.tag; }));
					  svg.select(".x.axis")
					    	.transition()
					    	.delay(300)
	    					.duration(300)
					      .call(xAxis);

					  // rotate x axis labels
            xAxisContent.selectAll("text")  
		            .style("text-anchor", "end")
		            .attr("dx", "-.8em")
		            .attr("dy", ".15em")
		            .attr("transform", function(d) {
		                return "rotate(-35)" 
	              });

          	// inject new data to bars
            var bars = svg.selectAll(".bar")
             		.data(newVal);

				    // remove
				    bars.exit()
				    	.transition().duration(300).ease("exp")
				    		.attr("y", function(d) { return y(0); })
				        .attr("height", 0)
				        .remove();

						// update old
				    bars
					    .transition().delay(300).duration(300).ease("quad") // first adjust width and position
								.attr("x", function(d) { return x(d.tag); })
								.attr("width", x.rangeBand())
					    .transition().delay(600).duration(300).ease("quad") // second adjust height
					      .attr("class", "bar")
					      .attr("y", function(d) { return y(d.expertise); })
					      .attr("height", function(d) { return height - y(d.expertise); });

            // enter new
            bars.enter()
			        .append("rect")
				        .attr("class", "bar")
					      .attr("y", function(d) { return y(0); })
					      .attr("height", function(d) { return height - y(0); })
								.attr("x", function(d) { return x(d.tag); })
								.attr("width", x.rangeBand())
					    .transition().delay(900).duration(300).ease("quad")
					      .attr("class", "bar")
					      .attr("y", function(d) { return y(d.expertise); })
					      .attr("height", function(d) { return height - y(d.expertise); });

					  // give all bars mouse events
				    bars
				    	.on("mouseover", function() {
				        d3.select(this)
				          .style("fill", "orangered")
							})
				    	.on("mouseout", function() {
						    d3.select(this)
						      .transition()
						      .duration(250)
						      .style("fill", "orange");
							});

					  // update labels
				    var bartext = svg.selectAll(".bartext")
							.data(newVal);

				    // exit old
				    bartext.exit().remove();

						bartext
							.transition().delay(300).duration(300).ease("quad")
								.attr("text-anchor", "middle")
								.attr("fill", "white")
								.attr("x", function(d,i) {
								    return x(d.tag)+x.rangeBand()/2;
								})
							.transition().delay(600).duration(300).ease("quad")
								.attr("y", function(d,i) {
								    return y(d.expertise)+20;
								})
								.text(function(d){
								     return d.expertise;
								});

            // enter new
            bartext.enter()
				      .append("text")
				        .attr("class", "bartext")
				        .attr("text-anchor", "middle")
								.attr("fill", "white")
								.attr("opacity", 0)
								.attr("x", function(d,i) {
								    return x(d.tag)+x.rangeBand()/2;
								})
								.attr("y", function(d,i) {
								    return y(0)+20;
								})
								.text(function(d){
								     return d.expertise;
								})
							.transition().delay(900).duration(300).ease("quad")
								.attr("opacity", 1)
								.attr("y", function(d,i) {
								    return y(d.expertise)+20;
								});

          });

          scope.$watch('hovered', function (newVal, oldVal) {
          	console.log(newVal);


          });

	      });
	    }
	  };
	}]);
