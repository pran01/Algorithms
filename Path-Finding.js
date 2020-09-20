class Queue {
  constructor() {
    this.items = [];
    this.head = -1;
    this.tail = -1;
  }
  enqueue(x) {
    if (this.head == -1) {
      this.head++;
    }
    this.tail++;
    this.items[this.tail] = x;
  }
  dequeue() {
    let item = this.items[this.head];
    this.head++;
    return item;
  }
  isEmpty() {
    if (this.head > this.tail) return true;
    return false;
  }
  display() {
    let str = "";
    if (this.head == -1 && this.tail == -1) {
      str = "No items.";
    } else {
      for (let i = this.head; i <= this.tail; i++) {
        str += this.items[i];
      }
    }
    console.log(`Items in the queue: ${str}`);
  }
  front() {
    console.log(`Item at front of queue: ${this.items[this.head]}`);
  }
  clear() {
    this.items = [];
    this.head = -1;
    this.tail = -1;
    console.log("Queue Cleared");
  }
}

class Stack {
  constructor() {
    this.elements = [];
    this.top = -1;
  }

  //Inserting a number at the top of stack.
  push(num) {
    this.top++;
    this.elements[this.top] = num;
  }

  //Return and remove the element at top.
  //return undefinned if stack is empty.
  pop() {
    if (this.top == -1) return undefined;
    let num = this.elements[this.top];
    this.top--;
    return num;
  }

  //prints the element at top
  peek() {
    if (this.top == -1) {
      console.log("Stack Empty");
    } else
      console.log(
        `The element at the top of stack: ${this.elements[this.top]}`
      );
  }

  //Check if the stack is empty.
  isEmpty() {
    if (this.top == -1) {
      console.log(`The stack is empty`);
      return true;
    } else {
      console.log(`The stack is not empty.`);
      return false;
    }
  }

  //Print the size of Stack.
  size() {
    console.log(`Size of the stack: ${this.top + 1}`);
  }

  //Display the elements of stack.
  display() {
    let str = "";
    for (let i = 0; i <= this.top; i++) {
      str += this.elements[i] + " ";
    }
    console.log(`Elements in the stack: ${str}`);
  }

  //Clear the whole stack.
  clear() {
    this.elements = [];
    this.top = -1;
    console.log(`Stack Cleared`);
  }
}

class Graph {
  constructor() {
    this.numOfVertices = 0;
    this.adjList = new Map();
  }
  addVertex(v) {
    this.numOfVertices++;
    this.adjList.set(v, []);
  }
  addEdge(to, from, weight) {
    this.adjList.get(to).push({ node: from, weight: weight });
    this.adjList.get(from).push({ node: to, weight: weight });
  }
  getWeight(to, from) {
    let dests = this.adjList.get(to);
    for (let dest of dests) {
      if (dest["node"] == from) {
        return dest["weight"];
      }
    }
  }
  printGraph() {
    let keys = this.adjList.keys();
    for (let key of keys) {
      let destsList = "";
      let dests = this.adjList.get(key);
      for (let dest of dests) {
        destsList += `${dest["node"]}(${dest["weight"]})` + ", ";
      }
      console.log(`${key} ==> ${destsList}`);
    }
  }
  bfs(start) {
    let visited = new Map();
    for (let vertex of this.adjList.keys()) {
      visited.set(vertex["node"], false);
    }
    let q = new Queue();
    visited.set(start, true);
    q.enqueue(start);
    while (!q.isEmpty()) {
      let vertex = q.dequeue();
      console.log(vertex);
      let dests = this.adjList.get(vertex);
      for (let i in dests) {
        let dest = dests[i];
        if (!visited.get(dest["node"])) {
          visited.set(dest["node"], true);
          q.enqueue(dest["node"]);
        }
      }
    }
  }

  dfs(start) {
    let visited = new Map();
    for (let vertex of this.adjList.keys()) {
      visited.set(vertex["node"], false);
    }
    visited.set(start, true);
    this.dfsUtil(start, visited);
  }
  dfsUtil(start, visited) {
    console.log(start);
    let dests = this.adjList.get(start);
    for (let i in dests) {
      let dest = dests[i];
      if (!visited.get(dest["node"])) {
        visited.set(dest["node"], true);
        this.dfsUtil(dest["node"], visited);
      }
    }
  }
  getMinNode(sp, dist) {
    let min = Infinity;
    let node;
    for (let i of dist.keys()) {
      if (sp[i] == false && dist.get(i) < min) {
        min = dist.get(i);
        node = i;
      }
    }
    return node;
  }
  djikstraPath(s, d) {
    let sp = new Map();
    let dist = new Map();
    let parent = new Map();
    for (let key of this.adjList.keys()) {
      if (key == s) dist.set(key, 0);
      else dist.set(key, Infinity);
    }
    let minNode = this.getMinNode(sp, dist);
    let count = 0;
    while (minNode != undefined) {
      minNode = this.getMinNode(sp, dist);
      console.log(minNode);
      sp.set(minNode, true);
      let adjNodes = this.adjList.get(minNode);
      for (let i in adjNodes) {
        let adjNode = adjNodes[i];
        if (
          dist.get(minNode) + this.getWeight(minNode, adjNode) <
          dist.get(adjNode)
        ) {
          dist.set(
            adjNode,
            dist.get(minNode) + this.getWeight(minNode, adjNode)
          );
          parent.set(adjNode, minNode);
        }
      }
      if (minNode == d) break;
    }
    let path = new Stack();
    let child = d;
    while (child != s) {
      path.push(child);
      child = parent.get(child);
    }
    path.push(s);
    path.display();
  }
}

let g = new Graph();
g.addVertex("Patna");
g.addVertex("Delhi");
g.addVertex("Gurgaon");
g.addVertex("Vellore");
g.addVertex("Coimbatore");
g.addVertex("Mumbai");
g.addEdge("Patna", "Delhi", 1);
g.addEdge("Patna", "Mumbai", 1);
g.addEdge("Patna", "Vellore", 1);
g.addEdge("Delhi", "Gurgaon", 1);
g.addEdge("Delhi", "Mumbai", 1);
g.addEdge("Vellore", "Coimbatore", 1);
g.printGraph();
// console.log("-----BFS:-----");
// g.bfs("Vellore");
// console.log("-----DFS:-----");
// g.dfs("Vellore");
g.djikstraPath("Patna", "Gurgaon");
