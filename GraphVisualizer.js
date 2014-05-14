/* global Traversal, GraphPkg */
var vert_key_writer = 0;
var edge_key_writer = 0;
var new_graph = {
	'vertices': {},
	'edges': {}
};
var visualizer_graph = {
	'vertices': {},
	'edges': {}
};

Visualizer = {};
Visualizer.getGraph = function() {
	return new_graph;
}

Visualizer.markEdge = function(edge) {
	console.log(edge.getKey());
	var ek = edge.getKey();
	visualizer_graph.edges[ek.toString()].strokeColor = 'red';
}

selected_vertices = [];

function onMouseDown(event) {
	var vert_key = 'vert' + vert_key_writer;
	vert_key_writer++;
	curr_center = event.point;
	var myCircle = new Path.Circle({
		center: event.point,
		radius: 10
	});
	myCircle.center = event.point;
	myCircle.vert_key = vert_key;

	console.log(myCircle.position);
	var vert_text = new PointText(myCircle.position._x, myCircle.position._y-12);
	vert_text.justification = 'center';
	vert_text.fillColor = 'black';
	vert_text.content = vert_key.toString();

	//make a new vertex in the graph
	var newVert = new GraphPkg.jsVertex(vert_key, myCircle);

	new_graph.vertices[vert_key] = newVert;
	visualizer_graph.vertices[vert_key] = myCircle;

	myCircle.strokeColor = 'black';
	myCircle.fillColor = 'white';

	myCircle.onMouseEnter = function(event) {
		if (Key.isDown('shift')) {
			myCircle.fillColor = 'red';
			if (selected_vertices.length < 1) {
				selected_vertices.push(myCircle);
			} else {
				if (myCircle.vert_key === selected_vertices[0].vert_key) {
					console.error('cannot connect a vertex to itself.');
				} else {
					selected_vertices.push(myCircle);
					var vert1 = selected_vertices[0];
					var vert2 = selected_vertices[1];

					newEdgePath = new Path();
					var edge_key = 'edge' + edge_key_writer;
					edge_key_writer++;
					newEdgePath.strokeColor = 'black';
					newEdgePath.add(new Point(vert1.center), new Point(vert2.center));
					visualizer_graph.edges[edge_key] = newEdgePath;
					var randWeight = Math.floor(Math.random() * 100);
					newEdge = new GraphPkg.jsEdge(edge_key, randWeight);
					newEdge.setOrigin(new_graph.vertices[vert1.vert_key]);
					newEdge.setDestination(new_graph.vertices[vert2.vert_key]);
					new_graph.edges[edge_key] = newEdge;

					var edge_text = new PointText(newEdgePath.position._x, newEdgePath.position._y-12);
					edge_text.justification = 'center';
					edge_text.fillColor = 'black';
					edge_text.content = edge_key.toString() + ': ' + randWeight;

					vert1.fillColor = 'white';
					vert2.fillColor = 'white';
					selected_vertices = [];

				}
			}
		}
	}
}