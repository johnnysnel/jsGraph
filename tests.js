/* global GraphPkg, Traversal, Mustache, $, Visualizer */

var li_template = '<li class="list-group-item">{{vertKey}}</li>';

$(document).ready(function() {


	//topsort
	$('#topsort-go').click(function() {
		var myGraph = init_DAG();
		$('#topsort-results').empty();
		Traversal.topsort(myGraph, function(v) {
			var rend_template = Mustache.render(li_template, v);
			$('#topsort-results').append(rend_template);
		}, function(l) {
			console.log('topsorted list: ', l);
			//reconstruct graph
			myGraph = init_DAG();
		});
	});

	$('#g-bfs-go').click(function() {
		$('#g-bfs-results').empty();
		var myGraph = init_UAG();
		var start = myGraph.getVertex('vertOne');
		Traversal.graphBFS(start, function(v) {
			var rend_template = Mustache.render(li_template, v);
			$('#g-bfs-results').append(rend_template);
		}, function() {
			console.log('finished with BFS');
			//reconstruct UAG... don't really need to do this anymore.
			myGraph = init_UAG();
		});
	});

	$('#g-dfs-go').click(function() {
		$('#g-dfs-results').empty();
		var myGraph = init_UAG();
		var start = myGraph.getVertex('vertOne');
		Traversal.graphDFS(start, function(v) {
			var rend_template = Mustache.render(li_template, v);
			$('#g-dfs-results').append(rend_template);
		});

	});

	$('#dijkstra-go').click(function() {
		$('#dijkstra-results').empty();
		var myGraph = init_canvas_graph();
		var start_name= $('#di-input').val();
		var start = myGraph.getVertex(start_name);
		Traversal.dijkstra(start, myGraph, function(v) {
			//var rend_template = Mustache.render(li_template, v);
			//$('#dijkstra-results').append(rend_template);
			//console.log(v);
		}, function(path) {
			console.log('finished with dijkstras: ', path);
			for (var i = 0; i < path.length; i++) {
				console.log("path: ",path[i].prev);
				//Visualizer.markEdge(path[i].prev);
				var rend_template = Mustache.render(li_template, path[i]);
				$('#dijkstra-results').append(rend_template);
			}
		});

	});

	$('#bell-ford-go').click(function() {
		$('#bell-ford-results').empty();
		var myGraph = init_canvas_graph();
		var start = myGraph.getVertex('vert0');
		Traversal.bell_ford(start, myGraph, function(v) {
			var rend_template = Mustache.render(li_template, v);
			$('#bell-ford-results').append(rend_template);
		}, function(path) {
			console.log('finished with bell_ford: ', path);
		});

	});

	$('#init-graph').click(function() {
		init_canvas_graph();
	});


});

/**
 * this builds a simple graph with
 * three vertices and two directed edges
 * from v1 –> v2, and v3 –> v2
 */
function init_DAG() {
	var myGraph = new GraphPkg.jsGraph();
	var v1 = new GraphPkg.jsVertex('vertOne');
	var v2 = new GraphPkg.jsVertex('vertTwo');
	var v3 = new GraphPkg.jsVertex('vertThree');

	var e1 = new GraphPkg.jsEdge('edgeOne');
	var e2 = new GraphPkg.jsEdge('edgeTwo');


	myGraph.insertVertex(v1);
	myGraph.insertVertex(v2);
	myGraph.insertVertex(v3);
	myGraph.insertEdge(v1, v2, e1);
	myGraph.insertEdge(v3, v2, e2);

	return myGraph;
}

/**
 * Initializes whatever graph is drawn on the canvas
 * as a undirected graph with random weights
 * @return {[type]} [description]
 */
function init_canvas_graph() {
	var g_data = Visualizer.getGraph();
	var myGraph = new GraphPkg.jsGraph();

	for (var vert in g_data.vertices) {
		if (g_data.vertices.hasOwnProperty(vert)) {
			myGraph.insertVertex(g_data.vertices[vert]);
		}
	}
	for (var edge in g_data.edges) {
		if (g_data.edges.hasOwnProperty(edge)) {
			myGraph.insertUndirectedEdge(g_data.edges[edge].getOrigin(), g_data.edges[edge].getDestination(), g_data.edges[edge]);
		}
	}

	return myGraph;
}

/**
 * builds a simple undirected graph
 */
function init_UAG() {
	var myGraph = new GraphPkg.jsGraph();
	var v1 = new GraphPkg.jsVertex('vertOne');
	var v2 = new GraphPkg.jsVertex('vertTwo');
	var v3 = new GraphPkg.jsVertex('vertThree');

	var e1 = new GraphPkg.jsEdge('edgeOne');
	var e2 = new GraphPkg.jsEdge('edgeTwo');


	myGraph.insertVertex(v1);
	myGraph.insertVertex(v2);
	myGraph.insertVertex(v3);
	myGraph.insertUndirectedEdge(v1, v2, e1);

	myGraph.insertUndirectedEdge(v3, v2, e2);

	return myGraph;
}

function init_weighted_graph() {
	var myGraph = new GraphPkg.jsGraph();
	var v1 = new GraphPkg.jsVertex('vertOne');
	var v2 = new GraphPkg.jsVertex('vertTwo');
	var v3 = new GraphPkg.jsVertex('vertThree');
	var v4 = new GraphPkg.jsVertex('vertFour');
	var v5 = new GraphPkg.jsVertex('vertFive');
	var v6 = new GraphPkg.jsVertex('vertSix');



	var e1 = new GraphPkg.jsEdge('edgeOne', 50);
	var e2 = new GraphPkg.jsEdge('edgeTwo', 12);
	var e3 = new GraphPkg.jsEdge('edgeThree', 52);
	var e4 = new GraphPkg.jsEdge('edgeFour', 31);
	var e5 = new GraphPkg.jsEdge('edgeFive', 60);
	var e6 = new GraphPkg.jsEdge('edgeSix', 2);
	var e7 = new GraphPkg.jsEdge('edgeSeven', 20);
	var e8 = new GraphPkg.jsEdge('edgeEight', 4);
	var e9 = new GraphPkg.jsEdge('edgeNine', 16);
	var e10 = new GraphPkg.jsEdge('edgeTen', 24);


	myGraph.insertVertex(v1);
	myGraph.insertVertex(v2);
	myGraph.insertVertex(v3);
	myGraph.insertVertex(v4);
	myGraph.insertVertex(v5);
	myGraph.insertVertex(v6);


	myGraph.insertUndirectedEdge(v1, v2, e1);
	myGraph.insertUndirectedEdge(v1, v3, e2);
	myGraph.insertUndirectedEdge(v1, v4, e3);
	myGraph.insertUndirectedEdge(v1, v5, e4);
	myGraph.insertUndirectedEdge(v1, v6, e5);

	myGraph.insertUndirectedEdge(v2, v3, e6);
	myGraph.insertUndirectedEdge(v2, v4, e7);
	myGraph.insertUndirectedEdge(v3, v5, e8);
	myGraph.insertUndirectedEdge(v4, v6, e9);
	myGraph.insertUndirectedEdge(v6, v5, e10);



	return myGraph;
}