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

  //Return the size of Stack.
  size() {
    return this.top + 1;
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
    let visited = new Map(); //To store the information that if a vertex is visited.
    for (let vertex of this.adjList.keys()) {
      //set all vertex as not visited.
      visited.set(vertex["node"], false);
    }
    let q = new Queue();
    //set the start vertex as visited.
    visited.set(start, true);
    //and enqueue that vertex.
    q.enqueue(start);
    while (!q.isEmpty()) {
      //get the vertex at the front of queue
      let vertex = q.dequeue();
      //dequeue it and print that vertex.
      console.log(vertex);
      let dests = this.adjList.get(vertex);
      //for all the adjacent vertices of that vertex,
      for (let i in dests) {
        let dest = dests[i];
        //if its not in the visited array,
        if (!visited.get(dest["node"])) {
          //insert it in the visited array
          visited.set(dest["node"], true);
          //and enqueue that.
          q.enqueue(dest["node"]);
        }
      }
    }
  }
  //The main function that calls dfs.
  dfs(start) {
    /*Depth First Traversal for a graph is similar to Depth First Traversal of a tree. 
    The only catch here is, unlike trees, graphs may contain cycles, 
    a node may be visited twice. To avoid processing a node more than once, 
    use a boolean visited array.*/
    let visited = new Map(); //we are using a map here instead of boolean array.
    for (let vertex of this.adjList.keys()) {
      //for all the vertices, set  visited to false.
      visited.set(vertex["node"], false);
    }
    visited.set(start, true); //set the start node as visited.
    this.dfsUtil(start, visited);
  }
  /* Time complexity:O(V + E), V: no. of vertices
                               E: no. of edges */

  //The utility function for performing DFS.
  dfsUtil(start, visited) {
    console.log(start); //printing the start node.
    let dests = this.adjList.get(start); //get all its adjacent nodes.
    for (let i in dests) {
      //for each of those adjacent nodes,
      let dest = dests[i];
      if (!visited.get(dest["node"])) {
        //if its not in the visited list
        visited.set(dest["node"], true); //insert it in visited list.
        this.dfsUtil(dest["node"], visited);
        //recursively call the utility function, making
        //the adjacent node the starting node.
      }
    }
  }
  //Function to get the node with minimum distance.
  getMinNode(sp, dist) {
    let min = Infinity;
    let node;
    for (let i of dist.keys()) {
      //for each of the vertices in distance array.
      if (sp.get(i) == false && dist.get(i) < min && dist.get(i) != Infinity) {
        //if its not in the shortest path and its distance is less than minimum.
        min = dist.get(i);
        node = i;
      }
    }
    //return the node which is not in shortest path and has a minimum distance.
    return node;
  }
  //The main function to call the Dijkstra's algorithm.
  djikstraPath(s, d) {
    let sp = new Map(); //To store if a vertex is included in shortest path.
    let dist = new Map(); //To store the distance of each node from start.
    let parent = new Map(); //To store information of a parent of a node in shortest path.
    for (let key of this.adjList.keys()) {
      //set the distance of start node 0
      if (key == s) dist.set(key, 0);
      //and every other node as Infinity
      else dist.set(key, Infinity);
    }
    for (let key of this.adjList.keys()) {
      sp.set(key, false);
    }
    //select the node which is not in shortest path and has minimum distance.
    let minNode = this.getMinNode(sp, dist);
    if (minNode != undefined) {
      while (minNode != undefined) {
        //select the node which is not in shortest path and has minimum distance.
        minNode = this.getMinNode(sp, dist);
        //include that node in the shortest path.
        sp.set(minNode, true);
        let adjNodes = this.adjList.get(minNode);
        for (let i in adjNodes) {
          //for all adjacent nodes of that node,
          let adjNode = adjNodes[i];
          if (
            dist.get(minNode) + this.getWeight(minNode, adjNode["node"]) <
            dist.get(adjNode["node"])
          ) {
            //if sum of distance value of u and weight of edge u-v,
            //is less than the distance value of v, then update the distance value of v.
            dist.set(
              adjNode["node"],
              dist.get(minNode) + this.getWeight(minNode, adjNode["node"])
            );
            //set the parent of that adjacent node as minNode.
            parent.set(adjNode["node"], minNode);
          }
        }
        //if the minimum node is the goal, then break the loop
        if (minNode == d) break;
      }
    }
    //For printing the path.
    let path = new Stack();
    let child = d;
    while (child != s && child != undefined) {
      path.push(child);
      child = parent.get(child);
    }
    path.push(s);
    let pathPrint = "";
    while (path.size() != 1) {
      pathPrint += path.pop() + " ==> ";
    }
    pathPrint += path.pop();
    console.log(pathPrint);
  } //Time complexity: O(E log V)

  //Function to get the node in the open list
  //having minimum value of f.
  getMinOpenNode(open, f) {
    let minInd = 0;
    let min = Infinity;
    for (let i in open) {
      let a = open[i];
      if (f.get(a) < min && f.get(a) != Infinity) {
        min = f.get(a);
        minInd = i;
      }
    }
    //return the node and the index of that node.
    return [open[minInd], minInd];
  }
  //Function to calculate manhattan distance for our heuristic.
  manhattanDistance(from, to) {
    //For a 25X15 grid where names of the node denote its position
    from = parseInt(from); //converting to integer.
    to = parseInt(to);
    let fromX = from % 25;
    let toX = to % 25;
    let fromY = 351 - (from - fromX + 1) / 25;
    let toY = 351 - (to - toX + 1) / 25;
    let h = Math.abs(fromX - toX) + Math.abs(fromY - toY);
    return h;
  }
  //The main function to perform A* search on the graph.
  aStarSearch(start, goal) {
    //Formula: f(n)=g(n)+h(n)
    let open = new Array(),
      closed = new Array();
    let f = new Map(),
      g = new Map(), //Distance between start and that node
      h = new Map(), //approx. distance between that node and goal.
      parent = new Map(); //To store information of parent.
    for (let key of this.adjList.keys()) {
      //set f, g, and h as infinity for all
      f.set(key, Infinity);
      g.set(key, Infinity);
      h.set(key, Infinity);
    }
    //set f,g,and h 0 for start node.
    f.set(start, 0);
    g.set(start, 0);
    h.set(start, 0);

    //push the start node in open list.
    open.push(start);
    while (open.length > 0) {
      let [q, ind] = this.getMinOpenNode(open, f);
      open.splice(ind, 1); //deleting the node with min f.
      closed.push(q); //pushing that node in closed list.
      let successors = this.adjList.get(q);
      for (let successor of successors) {
        //For all its successors,
        if (successor["node"] == goal) {
          //if that successor is our final goal,
          //end the function.
          parent.set(successor["node"], q);
          let path = new Stack();
          let child = goal;
          while (child != start && child != undefined) {
            path.push(child);
            child = parent.get(child);
          }
          path.push(start);
          let pathPrint = "";
          while (path.size() != 1) {
            pathPrint += path.pop() + " ==> ";
          }
          pathPrint += path.pop();
          console.log(pathPrint);
          return;
        } else if (!closed.includes(successor["node"])) {
          //if the successor is not in closed list,
          let gNew = g.get(q) + this.getWeight(q, successor["node"]);
          let hNew = this.manhattanDistance(successor["node"], goal);
          let fNew = gNew + hNew;
          if (
            f.get(successor["node"]) == Infinity ||
            f.get(successor["node"]) > fNew
          ) {
            open.push(successor["node"]);
            f.set(successor["node"], fNew);
            g.set(successor["node"], gNew);
            h.set(successor["node"], hNew);
            parent.set(successor["node"], q);
          }
        }
      }
    } //Time-complexity: O(E)
  }

  //For the node in the open list with minimum h
  getMinOpenNodeGreedy(open, h) {
    let minInd = 0;
    let min = Infinity;
    for (let i in open) {
      let a = open[i];
      if (h.get(a) < min && h.get(a) != Infinity) {
        min = h.get(a);
        minInd = i;
      }
    }
    //return the node and the index of the node.
    return [open[minInd], minInd];
  }
  //The main function for performing greedy search.
  greedyBestFirstSearch(start, goal) {
    let open = new Array(),
      closed = new Array();
    let h = new Map(), //containing the approx. value of distance to goal.
      parent = new Map();
    for (let key of this.adjList.keys()) {
      //set heuristic measure for all nodes as Infinity.
      h.set(key, Infinity);
    }
    //set the heuristic for start node as 0.
    h.set(start, 0);
    open.push(start); //push the start node in open list
    while (open.length > 0) {
      let [q, ind] = this.getMinOpenNodeGreedy(open, h);
      open.splice(ind, 1); //delete the min node from open list.
      //push the min node in closed list.
      closed.push(q);
      let successors = this.adjList.get(q);
      for (let successor of successors) {
        //for all successors of that node,
        if (successor["node"] == goal) {
          //if that successor is goal, end the function.
          parent.set(successor["node"], q);
          let path = new Stack();
          let child = goal;
          while (child != start && child != undefined) {
            path.push(child);
            child = parent.get(child);
          }
          path.push(start);
          let pathPrint = "";
          while (path.size() != 1) {
            pathPrint += path.pop() + " ==> ";
          }
          pathPrint += path.pop();
          console.log(pathPrint);
          return;
        } else if (!closed.includes(successor["node"])) {
          //if that successor is not included in closed list,
          let hNew = this.manhattanDistance(successor["node"], goal);
          if (
            h.get(successor["node"]) == Infinity ||
            h.get(successor["node"]) > hNew
          ) {
            open.push(successor["node"]);
            h.set(successor["node"], hNew);
            parent.set(successor["node"], q);
          }
        }
      }
    }
  } //Time complexity: O(n log n)
}

let g = new Graph();
for (let i = 1; i <= 375; i++) {
  g.addVertex(`${i}`);
}
for (let i = 1; i <= 374; i++) {
  if (i % 25 != 0) g.addEdge(i + "", i + 1 + "", 1);
  if (i < 351) g.addEdge(i + "", i + 25 + "", 1);
}
g.greedyBestFirstSearch("43", "170");
