/* global BinaryHeap */

var Traversal = {};
(function() {

	/**
	 * WARNING!!! This algorithm is destructive. Removes all edges of the graph.
	 * Your best bet is to reconstruct the graph in the callback.
	 * @param  {[type]} DAGraph  [description]
	 * @param  {[type]} behavior [description]
	 */
	Traversal.topsort = function(DAGraph, behavior, callback) {

		var S = [];
		var L = [];
		var vertices = DAGraph.vertices();
		for (var vertex in vertices) {
			if (vertices.hasOwnProperty(vertex)) {
				if (DAGraph.getNumberOfIncidentEdges(vertices[vertex]) === 0) {
					S.push(vertices[vertex]);
				}
			}
		}

		while (S.length > 0) {
			var v = S.pop();
			L.push(v);
			behavior(v);
			var edges = DAGraph.outgoingEdges(v);
			for (var edge in edges) {
				if (edges.hasOwnProperty(edge)) {
					var w = edges[edge].getDestination();
					DAGraph.removeEdge(edges[edge]);

					if (DAGraph.getNumberOfIncidentEdges(w) === 0) {
						S.push(w);
					}
				}
			}
		}
		callback(L);
	};

	/**
	 * To be used on a undirected graph
	 */
	Traversal.graphBFS = function(start, behavior, callback) {
		//note: not very efficient way of doing a queue because shift takes O(n)
		var Q = [];
		start.visited = true;
		Q.push(start);
		while (Q.length > 0) {
			var n = Q.shift();
			behavior(n);
			var edges = n.getOutgoingEdges();
			for (var edge in edges) {
				if (edges.hasOwnProperty(edge)) {
					var w = edges[edge].getOpposite(n);
					if (w.visited !== true) {
						w.visited = true;
						Q.push(w);
					}
				}
			}
		}
		callback();
	};

	Traversal.graphDFS = function(vertex, behavior) {
		var recurse = function(vertex) {
			vertex.visited = true;
			behavior(vertex);
			var edges = vertex.getOutgoingEdges();
			for (var edge in edges) {
				if (edges.hasOwnProperty(edge)) {
					var n = edges[edge].getOpposite(vertex);
					if (n.visited === false || n.visited === undefined) {
						recurse(n);
					}
				}
			}
		};
		recurse(vertex);
	};

	//doesn't work quite right. Or maybe just isn't sending the right info? Or maybe the heap is a max heap, not a min heap?
	Traversal.dijkstra = function(start, graph, behavior, callback) {
		//comparator... because of how heap was implemented
		var identity = function(vert) {
			return vert.dist;
		};
		var heap = new BinaryHeap(identity);
		var vertices = graph.vertices();
		var path = [];

		for (var v in vertices) {
			if (vertices.hasOwnProperty(v)) {
				vertices[v].dist = Infinity;
				vertices[v].prev = null;
			}
		}
		//need to log it to see which one it is, or if both.
		start.dist = 0;
		vertices[start.getKey().toString()].dist = 0;
		//add vertices to heap
		for (var vert in vertices) {
			if (vertices.hasOwnProperty(vert)) {
				heap.push(vertices[vert]);
			}
		}

		while (heap.size() > 0) {
			var curr_vert = heap.pop();
			behavior(curr_vert);
			var edges = curr_vert.getOutgoingEdges();
			for (var edge in edges) {
				if (edges.hasOwnProperty(edge)) {
					var w = edges[edge].getOpposite();

					if (w.dist > curr_vert.dist + edges[edge].getWeight()) {
						//really inefficient way of doing this...
						heap.remove(w);
						w.dist = curr_vert.dist + edges[edge].getWeight();
						w.prev = edges[edge];
						heap.push(w);
					}
				}
			}
			path.push(curr_vert);
		}
		callback(path);
	};

	Traversal.bell_ford = function(start, graph, behavior, callback) {

		var vertices = graph.vertices();
		var edges = graph.edges();
		var num_of_verts = 0;
		var path = [];

		for (var vert in vertices) {
			if (vertices.hasOwnProperty(vert)) {
				vertices[vert].dist = Infinity;
				vertices[vert].prev = null;
				num_of_verts++;
				path.push(vertices[vert]);
			}
		}
		start.dist = 0;
		vertices[start.getKey().toString()].dist = 0;
		for (var i = 0; i < num_of_verts - 1; i++) {
			for (var edge in edges) {
				if (edges.hasOwnProperty(edge)) {
					var u = edges[edge].getOrigin();
					var v = edges[edge].getDestination();

					if (u.dist + edges[edge].getWeight() < v.dist) {
						v.dist = u.dist + edges[edge].getWeight();
						v.prev = u;
					}
				}
			}
		}
		//check for negative weight cycles
		for (var e in edges) {
			if (edges.hasOwnProperty(e)) {
				var u2 = edges[e].getOrigin();
				var v2 = edges[e].getDestination();
				if (u2.dist + edges[e].getWeight() < v2.dist) {
					console.error('negative cycle exception');
					return;
				}
			}
		}
		//sort for lowest distance to highest TODO WHY IS EVERYTHING BEING
		//SORTED EXCEPT FOR THE 6th VERTEX?!!??!
		path.sort(function(a) {
			return a.dist;
		});

		for (i = 0; i < path.length; i++) {
			behavior(path[i]);
		}
		callback(path);
	};

	Traversal.prim_jarnik = function(graph, callback) {
		var identity = function(vert) {
			return vert.cost;
		};
		var MST = [];
		var heap = new BinaryHeap(identity);
		var vertices = graph.vertices();
		for (var vert in vertices) {
			if (vertices.hasOwnProperty(v)) {
				vertices[vert].cost = Infinity;
				vertices[vert].prev = null;
				heap.push(vertices[vert]);
			}
		}
		//start at a random (the last added to the heap in this case) vertex
		var start = heap.pop();
		start.cost = 0;
		heap.push(start);

		while (heap.size() > 0) {
			var v = heap.pop();
			if (v.prev !== null) {
				var pair = [];
				pair.push(v);
				pair.push(v.prev);
				MST.push(pair);
			}
			var edges = graph.getIncidentEdges(v);
			for (var e in edges) {
				if (edges.hasOwnProperty(e)) {
					var w = e.getOpposite(v);
					if (w.cost > e.edgeWeight) {
						heap.remove(w);
						w.cost = e.edgeWeight;
						w.prev = v;
						heap.push(w);
					}
				}
			}
		}
		callback(MST);
	};

	Traversal.kruskal = function(vertex) {
		return vertex;
	};

}());