var GraphPkg = {};
(function() {
	////////////////////
	//edge definition //
	////////////////////

	GraphPkg.jsEdge = function(edgeKey, edgeWeight) {
		this.e_origin = null;
		this.e_destination = null;
		this.e_edgeKey = edgeKey;
		this.e_edgeWeight = edgeWeight;
		this.e_visited = false;
	};

	GraphPkg.jsEdge.prototype.getOpposite = function(vert) {
		if (vert === this.e_destination) {
			return this.e_origin;
		} else {
			return this.e_destination;
		}
	}

	GraphPkg.jsEdge.prototype.getOrigin = function() {
		return this.e_origin;
	}

	GraphPkg.jsEdge.prototype.setOrigin = function(origin) {
		this.e_origin = origin;
	}

	GraphPkg.jsEdge.prototype.getDestination = function() {
		return this.e_destination;
	}

	GraphPkg.jsEdge.prototype.setDestination = function(destination) {
		this.e_destination = destination;
	}

	GraphPkg.jsEdge.prototype.getKey = function() {
		return this.e_edgeKey;
	}

	GraphPkg.jsEdge.prototype.setKey = function(data) {
		this.e_edgeKey = data;
	}

	GraphPkg.jsEdge.prototype.getWeight = function() {
		return this.e_edgeWeight;
	}

	GraphPkg.jsEdge.prototype.setWeight = function(data) {
		this.e_edgeWeight = data;
	}

	GraphPkg.jsEdge.prototype.visited = function() {
		return this.e_visited;
	}

	GraphPkg.jsEdge.prototype.setVisited = function(bool) {
		this.e_visited = bool;
	}


	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//vertex definition. ... Spinning, cycling, channeling closer and closer together, all mass converging into a single point, my life, circling around a transparent sphere, a flat circle, a captain, taking his ship across the Atlantic, only to find his home on the other side, a captain, taking his boat across the Atlantic, only to give up and turn around three-quarters of the way there, a captain, taking his canoe across the marsh of dead trees, finding a woman there, tied to the branch of a weeping willow, she asks what he is doing there, and he says he is stuck in a vortex, oh, well, i suppose we all are, aren't we, a captain, talking to his wife in bed, was it thirteen years ago, before he left to Atlantic.  //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	GraphPkg.jsVertex = function(vertKey, vertData) {

		this.myVertKey = vertKey;
		this.myVertData = vertData;
		this.incidentEdges = {};
		this.outgoingEdges = {};
		this.incidentEdgeCounter = 0;
		this.outgoingEdgeCounter = 0;

	};

	GraphPkg.jsVertex.prototype.getKey = function() {
		return this.myVertKey;
	}

	GraphPkg.jsVertex.prototype.getData = function() {
		return this.myVertData;
	}

	GraphPkg.jsVertex.prototype.setData = function(newData) {
		this.myVertKey = newData;
	}

	GraphPkg.jsVertex.prototype.getIncidentEdges = function() {
		return this.incidentEdges;
	}

	GraphPkg.jsVertex.prototype.insertIncidentEdge = function(edge) {
		this.incidentEdges[edge.getKey().toString()] = edge;
		this.incidentEdgeCounter++;
	}

	GraphPkg.jsVertex.prototype.removeIncidentEdge = function(edge) {
		delete this.incidentEdges[edge.getKey().toString()];
		this.incidentEdgeCounter--;
	}

	GraphPkg.jsVertex.prototype.clearIncidentEdges = function() {
		this.incidentEdges = {};
		this.incidentEdgeCounter = 0;
	}

	GraphPkg.jsVertex.prototype.getNumberOfIncidentEdges = function() {
		return this.incidentEdgeCounter;
	}

	GraphPkg.jsVertex.prototype.getOutgoingEdges = function() {
		return this.outgoingEdges;
	}

	GraphPkg.jsVertex.prototype.insertOutgoingEdge = function(edge) {
		this.outgoingEdges[edge.getKey().toString()] = edge;
		this.outgoingEdgeCounter++;
	}

	GraphPkg.jsVertex.prototype.removeOutgoingEdge = function(edge) {
		delete this.outgoingEdges[edge.getKey().toString()];
		this.outgoingEdgeCounter--;
	}

	GraphPkg.jsVertex.prototype.clearOutgoingEdges = function() {
		this.outgoingEdges = {};
		this.outgoingEdgeCounter = 0;
	}

	GraphPkg.jsVertex.prototype.getNumberOfOutgoingEdges = function() {
		return this.outgoingEdgeCounter;
	}

	//////////////////////
	// graph contructor //
	/////////////////////

	GraphPkg.jsGraph = function() {

		this.graphVerts = {};
		this.graphEdges = {};
	};

	GraphPkg.jsGraph.prototype.vertices = function() {
		return this.graphVerts;
	};

	GraphPkg.jsGraph.prototype.getVertex = function(key) {
		return this.graphVerts[key.toString()];
	};

	GraphPkg.jsGraph.prototype.getEdge = function(key) {
		return this.graphEdges[key.toString()];
	};

	GraphPkg.jsGraph.prototype.edges = function() {
		return this.graphEdges;
	};

	GraphPkg.jsGraph.prototype.incidentEdges = function(vertex) {
		return vertex.getIncidentEdges();
	};

	GraphPkg.jsGraph.prototype.outgoingEdges = function(vertex) {
		return vertex.getOutgoingEdges();
	};

	GraphPkg.jsGraph.prototype.getNumberOfIncidentEdges = function(vertex) {
		return vertex.getNumberOfIncidentEdges();
	}

	GraphPkg.jsGraph.prototype.getNumberOfOutgoingEdges = function(vertex) {
		return vertex.getNumberOfOutgoingEdges();
	}
	//todo
	GraphPkg.jsGraph.prototype.areAdjacent = function(v1, v2) {
		return true;
	};

	GraphPkg.jsGraph.prototype.endVertices = function(edge) {
		var endVerts = [];
		endVerts.push(edge.getOrigin());
		endVerts.push(edge.getDestination());
		return endVerts;
	};

	GraphPkg.jsGraph.prototype.opposite = function(vertex, edge) {
		if (edge.getOrigin.getKey() === vertex.getKey()) {
			return edge.getDestination();
		} else {
			return edge.getOrigin();
		}
	};

	GraphPkg.jsGraph.prototype.insertVertex = function(vertex) {
		this.graphVerts[vertex.getKey().toString()] = vertex;
	};

	GraphPkg.jsGraph.prototype.insertEdge = function(v1, v2, edge) {
		edge.setOrigin(v1);
		edge.setDestination(v2);
		v1.insertOutgoingEdge(edge);
		v2.insertIncidentEdge(edge);
		this.graphEdges[edge.getKey().toString()] = edge;
	};

	GraphPkg.jsGraph.prototype.insertUndirectedEdge = function(v1, v2, edge) {
		edge.setOrigin(v1);
		edge.setDestination(v2);
		v1.insertOutgoingEdge(edge);
		v1.insertIncidentEdge(edge);

		v2.insertIncidentEdge(edge);
		v2.insertOutgoingEdge(edge);
		this.graphEdges[edge.getKey().toString()] = edge;
	};

	//todo need to update jsGraph's edges table
	GraphPkg.jsGraph.prototype.removeVertex = function(vertex) {
		vertex.clearIncidentEdges();
		vertex.clearOutgoingEdges();
		delete this.graphVerts[vertex.getKey().toString()];
	};

	GraphPkg.jsGraph.prototype.removeEdge = function(edge) {
		edge.getOrigin().removeOutgoingEdge(edge);
		edge.getDestination().removeIncidentEdge(edge);
		delete this.graphEdges[edge.getKey().toString()];
	};

	GraphPkg.jsGraph.prototype.removeUndirectedEdge = function(edge) {
		edge.getOrigin().removeOutgoingEdge(edge);
		edge.getOrigin().removeIncidentEdge(edge);
		edge.getDestination().removeOutgoingEdge(edge);
		edge.getDestination().removeIncidentEdge(edge);
		delete this.graphEdges[edge.getKey().toString()];
	};

}());