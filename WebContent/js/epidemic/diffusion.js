/*
interpret the global data:
	nodeMap:{{id:pro,status},...,...} store the node status,init in the node2Map function 
										when the page load
	
	

 */
/*
		status: 0 susceptible
				1 mention
				2 retweet
				3 
				4 infected
*/

var nodeMap = {}
var activity
var cur_activity = 0

var width = 900,
	height = 600;
var edges
var nodes
var dataset
var nodes_data
var edges_data
var origin_data
var total_infected_people = 1
var isRun = false
var handle
var simulateData = [[1,1]]
var xScale,yScale
var xAxis,yAxis
var svgpanel
var svg
			/*the color which we use*/
var colors = d3.scale.category20();

		$(document).ready(function(){
			bindEvent()
			readActivity()
			var force = d3.layout.force()
				.size([width, height])
				.linkDistance([50])
				.charge([-100]);
			var zoomer = d3.behavior.zoom().scaleExtent([0.4,10]).on('zoom',rescale)
			var outer = d3.select("#main")
						.append("svg:svg")
						.attr('xmlns','http://www.w3.org/2000/svg')
						.attr("width", width)
						.attr("height", height)
						.attr("pointer-events", "all")

			outer.append('svg:g').append('svg:rect')
			    .attr('width', width)
			    .attr('height', height)
			    .attr('fill', 'none')
			    .attr('stroke','#777')
			    .attr('stroke-width','3');
			svg = outer.append('svg:g')
				    	.call(zoomer)
				    	.on("dblclick.zoom", null)
			d3.json('json/output.json',function(error,data){
				if (error){
					alert(error)
					console.log(error)
				}
				dataset = data

				nodes_data = dataset.nodes
				edges_data = dataset.edges
				force
					.nodes(nodes_data)
					.links(edges_data)
				force.start()

				edges = svg.append("svg:g").selectAll("line")
								.data(edges_data,function(d){
									return d.source.id + '-' + d.target.id
								})
								.enter()
								.append("line")
								.attr('id',function(d){return 'e'+d.source.id+'-'+d.target.id})
								.style("stroke", "#A4D3EE")
								.style("stroke-width", 3);
				//Create nodes as circles
				nodes = svg.append("svg:g").selectAll("circle")
								.data(nodes_data,function(d){ return d.id; })
								.enter()
								.append("circle")
								.attr('class','node')
								.attr("r", function(d){return Math.sqrt(d.pro+1)*5})
								.attr('id',function(d){return 'n'+d.id})
								.style("fill", function(d, i) {
									if(d.status == 4)
										return '#F00'
									else
										return colors(1);
								}).on('click',function(d){
									deleteNode(d.id)

								})
								.call(force.drag);
				nodes.append("title")
					.text(function(d) { return d.id; });
				force.on("tick", function() {

				edges.attr("x1", function(d) { return d.source.x; })
					 .attr("y1", function(d) { return d.source.y; })
					 .attr("x2", function(d) { return d.target.x; })
					 .attr("y2", function(d) { return d.target.y; });
			
				nodes.attr("cx", function(d) { return d.x; })
					 .attr("cy", function(d) { return d.y; });
			});
			/*store the status of the nodes*/
			w = 300
			h = 300
			padding = 30
			nodes2Map(nodes_data)
			xScale = d3.scale.linear()
								 .domain([0, d3.max(simulateData, function(d) { return d[0]; })])
								 .range([padding, w - padding * 2]);

			yScale = d3.scale.linear()
								 .domain([0, d3.max(simulateData, function(d) { return d[1]; })])
								 .range([h - padding, padding]);
			var formatAsPercentage = d3.format(".1%");
			//Define X axis
			xAxis = d3.svg.axis()
							  .scale(xScale)
							  .orient("bottom");
			//Define Y axis
			yAxis = d3.svg.axis()
							  .scale(yScale)
							  .orient("left");

			//Create SVG element
			svgpanel = d3.select("#simulationPanel")
						.append("svg:svg")
						.attr("width", w)
						.attr("height", h);
			svgpanel.selectAll("circle")
			   .data(simulateData)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(d[0]);
			   })
			   .attr("cy", function(d) {
			   		return yScale(d[1]);
			   })
			   .attr("r", function(d) {
			   		return 5;
			   });
			//Create X axis
			svgpanel.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + (h - padding) + ")")
				.call(xAxis);
			
			//Create Y axis
			svgpanel.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(" + padding + ",0)")
				.call(yAxis);

			})
		})
/*rescale function*/
function rescale() {
  trans=d3.event.translate;
  scale=d3.event.scale;

  svg.attr("transform",
      "translate(" + trans + ")"
      + " scale(" + scale + ")");
}
/*delete the selected node and the edges it connected*/
deleteNode = function(id){
				/*delete the selected node*/
				var i
				for(i=0;i<nodes_data.length;i++)
				{
					if(nodes_data[i].id == id)
						break;
				}
				nodes_data.splice(i,1)
				/*remember to use the key function*/
				var nodes = svg.selectAll("circle")
								.data(nodes_data,function(d){return d.id})
				nodes.exit()
					.remove()
				/*delete the edge connected to the node above*/
				edges_data = $.grep(edges_data,function(edge,i){
					if (edge.source.id == id || edge.target.id == id)
						return true
				},true)
				/*remember to use the key function*/
				var edges =  svg.selectAll("line")
								.data(edges_data,function(d){return d.source.id+'-'+d.target.id;})
				edges.exit()
					.remove()

			};
function updatePanel(){
	//Update scale domains
		xScale.domain([0, d3.max(simulateData, function(d) { return d[0]; })]);
		yScale.domain([0, d3.max(simulateData, function(d) { return d[1]; })]);

					//Update all circles
		var circles = svgpanel.selectAll("circle")
					  .data(simulateData)
		
		circles.enter()
				.append('circle')
				.attr("cx", function(d) {
						console.log(d)
					   	return xScale(d[0]);
				})
				.attr("cy", function(d) {
					   	return yScale(d[1]);
				})
				.attr("r", function(d) {
			   			return 5;
			   	});
		circles.transition()
				.attr('cx',function(d){
					return xScale(d[0])
				})
				.attr('cy',function(d){
					return yScale(d[1])
				})
				.attr('r',function(d){return 5;})

		//Update X axis
		svgpanel.select(".x.axis")
			.transition()
			.duration(1000)
			.call(xAxis);
					
		//Update Y axis
		svgpanel.select(".y.axis")
			.transition()
			.duration(1000)
			.call(yAxis);
}					
function readActivity(){
	d3.json('json/activity.json',function(error,data){
		activity = data
	})
}
function simulationSI()
{
	d3.selectAll('.new').style('fill','#F00')
	d3.selectAll('.new').classed('new',false)
	canSend = false
	edges_data.forEach(function(e){
		target = e.target.id
		source = e.source.id
		//console.log('target'+target)
		//console.log('source'+source)
		node_t = d3.select("#n"+target)
		node_s = d3.select("#n"+source)
		node_t_data = nodeMap[target]
		node_s_data = nodeMap[source]
		if(node_s_data.status == 4 && !node_s.classed('new')){
			if(node_t_data.status != 4){
				canSend = true
				pro = Math.round(Math.random()*10)/10
				if(pro >= node_t_data.pro){
					node_t.style('fill','#00E5EE')
					node_t_data.status = 4
					node_t.classed('new',true)
					total_infected_people += 1
				}
			}
		}
		if(node_t_data.status == 4 && !node_t.classed('new')){
			if(node_s_data.status != 4){
				canSend = true
				pro = Math.round(Math.random()*10)/10
				if(pro > node_s_data.pro){
					node_s.style('fill','#00E5EE')
					node_s.classed('new',true)
					node_s_data.status = 4
					total_infected_people += 1
				}
			
			}
		}

	})
	console.log('cur_people'+total_infected_people)
	i = simulateData[simulateData.length-1][0]
	simulateData.push([i+1,total_infected_people])
	updatePanel()
	if(!canSend && handle!='undefined'){
		clearInterval(handle)
	}


}
function runActivity(){
	cur = activity[cur_activity]
	var color_mt = '#7FFF00'
	var color_rt = '#FF0000'
	var sus_color = colors(1)
	color_map = {0:sus_color,1:color_mt,2:color_rt}
	$.each(cur,function(i,value){
		var color
		var status
		if(value[2] == 'MT'){//MT
			color = color_mt
			status = 1
		}
		else{//RT
			color = color_rt
			status = 2
		}
		for(var i = 0;i<2;i++)
		{
			
			id = '#n'+value[i]
			var node = d3.select(id)
			if(node.status == 2)
				continue;
			node.attr('r',15)
			node.style('fill',color)
			node.status = status
		}
	})
	cur_activity = cur_activity + 1
	console.log(cur_activity + '  '+ activity.length)
	if(cur_activity >= activity.length)
	{
		clearInterval(handle)
		console.log('clear interval')
	}

}

function nodes2Map(nodes){
	nodes.forEach(function(node){
		nodeMap[node.id] = {status:node.status,pro:node.pro}
	});
}