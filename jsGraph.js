var GraphPkg = {};
(function() {
	////////////////////
	//edge definition //
	////////////////////

	GraphPkg.jsEdge = function(edgeKey, edgeWeight) {
		this.edgeType = 'undirected';
		this.origin = null;
		this.destination = null;
		this.edgeKey = edgeKey;
		this.edgeWeight = edgeWeight;
		this.visited = false;
	};

	GraphPkg.jsEdge.prototype.getOpposite = function(vert) {
		if (vert === this.destination) {
			return this.origin;
		} else {
			return this.destination;
		}
	};

	GraphPkg.jsEdge.prototype.getOrigin = function() {
		return this.origin;
	};

	GraphPkg.jsEdge.prototype.setOrigin = function(origin) {
		this.origin = origin;
	};

	GraphPkg.jsEdge.prototype.getDestination = function() {
		return this.destination;
	};

	GraphPkg.jsEdge.prototype.setDestination = function(destination) {
		this.destination = destination;
	};

	GraphPkg.jsEdge.prototype.getKey = function() {
		return this.edgeKey;
	};

	GraphPkg.jsEdge.prototype.setKey = function(data) {
		this.edgeKey = data;
	};

	GraphPkg.jsEdge.prototype.getWeight = function() {
		return this.edgeWeight;
	};

	GraphPkg.jsEdge.prototype.setWeight = function(data) {
		this.edgeWeight = data;
	};

	GraphPkg.jsEdge.prototype.visited = function() {
		return this.visited;
	};

	GraphPkg.jsEdge.prototype.setVisited = function(bool) {
		this.visited = bool;
	};


	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//vertex definition. ... Spinning, cycling, channeling closer and closer together, all mass converging into a single point, my life, circling around a transparent sphere, a flat circle, a captain, taking his ship across the Atlantic, only to find his home on the other side, a captain, taking his boat across the Atlantic, only to give up and turn around three-quarters of the way there, a captain, taking his canoe across the marsh of dead trees, finding a woman there, tied to the branch of a weeping willow, she asks what he is doing there, and he says he is stuck in a vortex, oh, well, i suppose we all are, aren't we, a captain, talking to his wife in bed, was it thirteen years ago, before he left to Atlantic.  //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	GraphPkg.jsVertex = function(vertKey, vertData) {

		this.vertKey = vertKey;
		this.vertData = vertData;
		this.incidentEdges = {};
		this.outgoingEdges = {};
		this.incidentEdgeCounter = 0;
		this.outgoingEdgeCounter = 0;

	};

	GraphPkg.jsVertex.prototype.getKey = function() {
		return this.vertKey;
	};

	GraphPkg.jsVertex.prototype.getData = function() {
		return this.vertData;
	};

	GraphPkg.jsVertex.prototype.setData = function(newData) {
		this.vertKey = newData;
	};

	GraphPkg.jsVertex.prototype.getIncidentEdges = function() {
		return this.incidentEdges;
	};

	GraphPkg.jsVertex.prototype.insertIncidentEdge = function(edge) {
		this.incidentEdges[edge.getKey().toString()] = edge;
		this.incidentEdgeCounter++;
	};

	GraphPkg.jsVertex.prototype.removeIncidentEdge = function(edge) {
		delete this.incidentEdges[edge.getKey().toString()];
		this.incidentEdgeCounter--;
	};

	GraphPkg.jsVertex.prototype.clearIncidentEdges = function() {
		var tempEdges = this.incidentEdges;
		this.incidentEdges = {};
		this.incidentEdgeCounter = 0;
		return tempEdges;
	};

	GraphPkg.jsVertex.prototype.getNumberOfIncidentEdges = function() {
		return this.incidentEdgeCounter;
	};

	GraphPkg.jsVertex.prototype.getOutgoingEdges = function() {
		return this.outgoingEdges;
	};

	GraphPkg.jsVertex.prototype.insertOutgoingEdge = function(edge) {
		this.outgoingEdges[edge.getKey().toString()] = edge;
		this.outgoingEdgeCounter++;
	};

	GraphPkg.jsVertex.prototype.removeOutgoingEdge = function(edge) {
		delete this.outgoingEdges[edge.getKey().toString()];
		this.outgoingEdgeCounter--;
	};

	GraphPkg.jsVertex.prototype.clearOutgoingEdges = function() {
		var tempEdges = this.outgoingEdges;
		this.outgoingEdges = {};
		this.outgoingEdgeCounter = 0;
		return tempEdges;
	};

	GraphPkg.jsVertex.prototype.getNumberOfOutgoingEdges = function() {
		return this.outgoingEdgeCounter;
	};

	//////////////////////
	// graph contructor //
	/////////////////////

	GraphPkg.jsGraph = function() {

		this.graphVerts = {};
		this.graphEdges = {};
		this.altEdgeKeys = {};
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

	GraphPkg.jsGraph.prototype.getConnectingEdge = function(v1, v2) {
		var key = this.altEdgeKeys[v1.getKey() + v2.getKey()];
		return this.graphEdges[key];
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
	};

	GraphPkg.jsGraph.prototype.getNumberOfOutgoingEdges = function(vertex) {
		return vertex.getNumberOfOutgoingEdges();
	};
	//todo
	GraphPkg.jsGraph.prototype.areAdjacent = function(v1, v2) {
		return this.getConnectingEdge(v1, v2) !== undefined;
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
		edge.edgeType = 'directed';
		edge.setOrigin(v1);
		edge.setDestination(v2);
		v1.insertOutgoingEdge(edge);
		v2.insertIncidentEdge(edge);
		this.graphEdges[edge.getKey().toString()] = edge;
		this.altEdgeKeys[v1.getKey() + v2.getKey()] = edge.getKey().toString();
		this.altEdgeKeys[v2.getKey() + v1.getKey()] = edge.getKey().toString();

	};

	GraphPkg.jsGraph.prototype.insertUndirectedEdge = function(v1, v2, edge) {
		edge.edgeType = 'undirected';
		edge.setOrigin(v1);
		edge.setDestination(v2);
		v1.insertOutgoingEdge(edge);
		v1.insertIncidentEdge(edge);

		v2.insertIncidentEdge(edge);
		v2.insertOutgoingEdge(edge);
		this.graphEdges[edge.getKey().toString()] = edge;
		this.altEdgeKeys[v1.getKey() + v2.getKey()] = edge.getKey().toString();
		this.altEdgeKeys[v2.getKey() + v1.getKey()] = edge.getKey().toString();
	};

	GraphPkg.jsGraph.prototype.removeVertex = function(vertex) {
		var inEdges = vertex.clearIncidentEdges();
		for (var edge in inEdges) {
			if (inEdges.hasOwnProperty(edge)) {
				if (inEdges[edge].edgeType === 'directed') {
					this.removeEdge(inEdges[edge]);
				} else {
					this.removeUndirectedEdge(inEdges[edge]);
				}
			}
		}
		var outEdges = vertex.clearOutgoingEdges();
		for (var edgey in outEdges) {
			if (outEdges.hasOwnProperty(edgey)) {
				if (outEdges[edgey].edgeType === 'directed') {
					this.removeEdge(outEdges[edgey]);
				} else {
					this.removeUndirectedEdge(outEdges[edgey]);
				}
			}
		}
		delete this.graphVerts[vertex.getKey().toString()];
	};

	GraphPkg.jsGraph.prototype.removeEdge = function(edge) {
		var v1 = edge.getOrigin();
		var v2 = edge.getDestination();
		v1.removeOutgoingEdge(edge);
		v2.removeIncidentEdge(edge);
		delete this.graphEdges[edge.getKey().toString()];
		delete this.altEdgeKeys[v1.getKey() + v2.getKey()];
		delete this.altEdgeKeys[v2.getKey() + v1.getKey()];
	};

	GraphPkg.jsGraph.prototype.removeUndirectedEdge = function(edge) {
		var v1 = edge.getOrigin();
		var v2 = edge.getDestination();
		v1.removeOutgoingEdge(edge);
		v1.removeIncidentEdge(edge);
		v2.removeOutgoingEdge(edge);
		v2.removeIncidentEdge(edge);
		delete this.graphEdges[edge.getKey().toString()];
		delete this.altEdgeKeys[v1.getKey() + v2.getKey()];
		delete this.altEdgeKeys[v2.getKey() + v1.getKey()];
	};

}());