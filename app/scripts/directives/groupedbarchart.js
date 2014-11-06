'use strict';

/**
 * @ngdoc directive
 * @name offrApp.directive:groupedBarChart
 * @description
 * # groupedBarChart
 */
angular.module('offrApp')
  .directive('groupedBarChart', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: { 
      	selecteduser: '=selecteduser',
      	hovered: '=hovered'
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

        	var users = [];
        	users.push(scope.selecteduser);

        	var margin = {top: 40, right: 20, bottom: 50, left: 40},
				    	width = 525 - margin.left - margin.right,
				    	height = 300 - margin.top - margin.bottom;

			    var color = d3.scale.ordinal()
    					.range(["#FFA500", "#B27500", "#7E5300"]);

					var svg = d3.select(element[0]).append('svg')
					    .attr("width", width + margin.left + margin.right)
					    .attr("height", height + margin.top + margin.bottom)
					  .append("g")
					    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					// initialization
					var x0 = d3.scale.ordinal().rangeRoundBands([0, width], 0.1); 
					var x1 = d3.scale.ordinal();
					var y  = d3.scale.linear().range([height, 0]);

					y.domain([0,100]);

					var xAxis = d3.svg.axis()
					    .scale(x0)
					    .orient("bottom");

					var yAxis = d3.svg.axis()
					    .scale(y)
					    .tickFormat("")
					    .ticks("")
					    .orient("left");

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

          scope.$watch('hovered', function (newVal, oldVal) {
						if (angular.isUndefined(newVal)) return;

						if(newVal === null) {
							if(users.length > 1)
								users.pop();
						} else {
							users.push(newVal);
						}

						adjustChart('hovered');
					});

          scope.$watch('selecteduser', function (newVal, oldVal) {
						if (angular.isUndefined(newVal) || null) return;

						users = [];
						users.push(newVal);

						adjustChart('selecteduser');
					});

					function adjustChart(mode) {

						if(mode === 'hovered')
							var delay = 0;
						if(mode === 'selecteduser')
							var delay = 300;

				    var data = [];
				    for(var i in users) {
				    	var id = users[i].id;
					    for(var m in users[i].hardskill) {
								data.push({ _id: id, "tag": users[i].hardskill[m].tag, "expertise": users[i].hardskill[m].expertise })
					    }
					  }

  	      	data.forEach(function(d) {
						  d.expertise = +d.expertise;
						});

          	// create or update x axis
						x0.domain(data.map( function(d) { return d.tag; } ));
						x1.domain(data.map(function(d) { return d._id; } ))
					       .rangeRoundBands([0, x0.rangeBand() ], 0);
					  svg.select(".x.axis")
  					  	.transition().duration(delay).ease("quad")
					      .call(xAxis);

					  // rotate x axis labels
            xAxisContent.selectAll("text")  
		            .style("text-anchor", "end")
		            .attr("dx", "-.8em")
		            .attr("dy", ".15em")
		            .attr("transform", function(d) {
		                return "rotate(-35)"
                }); 

						var nested = d3.nest()
					    .key(function(d) { return d._id; })
					    .entries(data);

						var bar = svg.selectAll(".bars")
					    	.data(nested)
					    .enter().append("g")
					    	.attr("class", function(d){ return d.key;})
					    	.style("fill", function(d, i) { return color(i); });

  		    	svg.selectAll("rect").remove(); // Remove all old rects

						bar.selectAll("rect")
						    .data(function(d) { return d.values; })
						  .enter().append("rect")
						  	.attr("class", "rect")
						    .attr("transform", function(d) {
						          return "translate(" + x0(d.tag) + ",0)"; 
						     })
						    .attr("x", function(d) { return x1(d._id); })
						    // before transition attr
						    .attr("y", function(d) { return y(0); })
						    .attr("height", function(d) { return height - y(0); })
					  	.transition().duration(delay).ease("quad")
						    .attr("width", x1.rangeBand())
						    .attr("y", function(d) { return y(d.expertise); })
						    .attr("height", function(d) { return height - y(d.expertise); });

				    svg.selectAll(".bartext").remove(); // Remove all old bartext

				    var bartext = bar.selectAll(".bartext")
							.data(function(d) { return d.values; })
						.enter().append("text")
			        .attr("class", "bartext")
			        .attr("text-anchor", "middle")
							.attr("fill", "white")
							.attr("opacity", 0)
							.attr("x", function(d,i) {
									if(nested.length > 1) {
										return x0(d.tag)+x0.rangeBand()/2+x1(d._id)-x1.rangeBand()/2;
							    } else {
										return x0(d.tag)+x0.rangeBand()/2+x1(d._id);
							    }
							})
							.attr("y", function(d,i) {
							    return y(0)+20;
							})
							.text(function(d){
						      return d.expertise;
							})
						.transition().duration(delay).ease("quad")
							.attr("opacity", 1)
							.attr("y", function(d,i) {
							    return y(d.expertise)+20;
							});
					}

      });
    }
  };
}]);
