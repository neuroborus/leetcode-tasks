class Graph {
  private _vertices: Set<string> = new Set();
  private _edges: Map<string, Map<string, number>> = new Map();

  public get vertices() {
    return this._vertices;
  }
  public get edges() {
    return this._edges;
  }

  addVertex(vertex: string): void {
    this._vertices.add(vertex);
    this.edges.set(vertex, new Map());
  }

  addEdge(source: string, destination: string, weight: number): void {
    if (!this._vertices.has(source) || !this._vertices.has(destination)) {
      throw new Error(
        "Both vertices must be added to the graph before adding an edge."
      );
    }
    this.edges.get(source)?.set(destination, weight);
    this.edges.get(destination)?.set(source, weight);
  }
}

function dijkstra(
  start: string,
  vertices: Set<string>,
  edges: Map<string, Map<string, number>>
): Map<string, number> {
  // Init
  const minDistances: Map<string, number> = new Map();
  const visited: Set<string> = new Set();
  const priorityQueue: { vertex: string; distance: number }[] = [];

  for (const vertex of vertices) {
    minDistances.set(vertex, Infinity);
  }
  minDistances.set(start, 0);
  priorityQueue.push({ vertex: start, distance: 0 });
  //

  while (priorityQueue.length > 0) {
    // Shift minimal distance vertex
    const { vertex: currentVertex, distance: currentDistance } =
      priorityQueue.shift()!;

    if (visited.has(currentVertex)) {
      continue;
    }
    visited.add(currentVertex);

    // Update distance to the nearest vertices
    for (const [neighbor, weight] of edges.get(currentVertex)!) {
      const newDistance = currentDistance + weight;
      if (newDistance < (minDistances.get(neighbor) || Infinity)) {
        minDistances.set(neighbor, newDistance);
        priorityQueue.push({ vertex: neighbor, distance: newDistance });
        // Sort queue by distance
        priorityQueue.sort((a, b) => a.distance - b.distance);
      }
    }
  }

  return minDistances;
}

function createGraph() {
  const graph = new Graph();
  graph.addVertex("A");
  graph.addVertex("B");
  graph.addVertex("C");
  graph.addVertex("D");
  graph.addVertex("E");

  graph.addEdge("A", "B", 1);
  graph.addEdge("A", "C", 4);
  graph.addEdge("B", "C", 2);
  graph.addEdge("B", "D", 5);
  graph.addEdge("C", "D", 1);
  graph.addEdge("D", "E", 3);

  return graph;
}

const graph = createGraph();
const distances = dijkstra("A", graph.vertices, graph.edges);
for (const [vertex, distance] of distances) {
  console.log(`Distance from A to ${vertex} is ${distance}`);
}
