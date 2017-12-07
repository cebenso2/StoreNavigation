//@flow

import MetaGraph from './MetaGraph'
export type Location = {
  row: number;
  col: number;
}

export default class StoreGraph {

  layout: Array<Array<number>>;
  foodLocations: Map<string, Array<number>>;
  adjacenctList: Map<string, Array<Location>>;
  registers: Array<Array<number>>;
  metaGraph: MetaGraph;
  metaGraphMapping: Map<number, string>;

  constructor(layout: Array<Array<number>>, foodLocations: Map<string, Array<number>>, registers: Array<Array<number>>) {
    this.layout = layout;
    this.foodLocations = foodLocations;
    this.registers = registers;
    this.constructAdjacencyList();
  }

  constructAdjacencyList(){
    this.adjacenctList = new Map();
    for (let row = 0; row < this.layout.length; row++) {
      for(let col = 0; col < this.layout[row].length; col++) {
        let adjLocations = [];
        if (this.layout[row][col] === 0) {
          if(row+1 < this.layout.length && this.layout[row+1][col] === 0){
            adjLocations.push(this.createLocation(row+1, col));
          }
          if( row-1 >=0 && this.layout[row-1][col] === 0){
            adjLocations.push(this.createLocation(row-1, col));
          }
          if(col+1 < this.layout[row].length && this.layout[row][col+1] === 0){
            adjLocations.push(this.createLocation(row, col+1));
          }
          if(col-1 >= 0 &&this.layout[row][col-1] === 0){
            adjLocations.push(this.createLocation(row, col-1));
          }
        }
        this.adjacenctList.set(this.createLocationString(row,col), adjLocations);
      }
    }
  }

  createLocation(row: number, col: number){
    return {
      row: row,
      col: col,
    };
  }

  createLocationFromString(rep: string){
    return {
      row: parseInt(rep.split(",")[0]),
      col: parseInt(rep.split(",")[1]),
    }
  }

  createLocationString(row:number, col: number){
    return row+","+col;
  }

  getAdjacentLocations(row: number, col: number) {
    let node = this.createLocationString(row, col);
    return this.adjacenctList.get(node);
  }

  buildPath(parents: Map<string, string>, targetNode: string) {
    let result = [targetNode];
    while (parents.get(targetNode) !== undefined) {
      targetNode = parents.get(targetNode) || "fail";
      result.push(targetNode);
    }
    return result.reverse();
  }

  findClosestRegister(location: Array<number>){
    let result = this.registers[0];
    let minDist = Infinity;
    for (let i = 0; i<this.registers.length; i++) {
      let path = this.shortestPath(location[0], location[1], this.registers[i][0], this.registers[i][0]);
      if(path && path.length < minDist){
        minDist = path.length;
        result = this.registers[i]
      }
    }
    return result;
  }

  createDistFromLocation(location: Array<number>){
    let dists = [];
    for (let food in this.foodLocations){
      let dest = this.foodLocations[food];
      let path = this.shortestPath(location[0],location[1],dest[0],dest[1]);
      if (path) {
        dists.push(path.length);
      } else {
        dists.push(Infinity);
      }
    }
    return dists;
  }

  createMetaGraph(startLocation: Array<number>, foods: Array<string>){
    this.metaGraphMapping = new Map();
    let numFoods = foods.length;
    let adjacencyMatrix = Array(numFoods).fill().map(() => Array(numFoods));
    let dist;
    let row = 0;
    for (let start of foods){
      let col = 0;
      this.metaGraphMapping[row] = start;
      for (let end of foods){
        if (start !== end){
          let sl = this.foodLocations[start];
          let el = this.foodLocations[end];
          let path = this.shortestPath(sl[0],sl[1],el[0],el[1]);
          if (!path){
            dist = Infinity;
          } else {
            dist = path.length;
          }
          adjacencyMatrix[row][col] = dist;
        } else {
          adjacencyMatrix[row][col] = 0;
        }
        col++;
      }
      row++;
    }
    let distFromStart = this.createDistFromLocation(startLocation);
    let distToRegister = this.createDistFromLocation(this.findClosestRegister(startLocation));
    this.metaGraph = new MetaGraph(adjacencyMatrix, distFromStart, distToRegister);
  }

  shortestPath(startRow: number, startCol: number, endRow: number, endCol: number){
    let parents = new Map();
    let queue = [];
    let visited = [];
    let current;
    let startNode = this.createLocationString(startRow, startCol);
    let targetNode = this.createLocationString(endRow, endCol);
    queue.push(startNode);
    visited.push(startNode);
    while (queue.length) {
      current = queue.shift();
      if (current === targetNode) {
        return this.buildPath(parents, targetNode);
      }
      let neighbors = this.adjacenctList.get(current) || [];
      for (let i = 0; i < neighbors.length; i += 1) {
        let next = this.createLocationString(neighbors[i].row, neighbors[i].col);
        if (!visited.includes(next)) {
          parents.set(next, current);
          visited.push(next);
          queue.push(next);
        }
      }
    }
    return null;
  }

  getNavigation(startLocation: Array<number>, foods: Array<string>){
    let navigation = Array(this.layout.length).fill().map(() => Array(this.layout[0].length).fill(-1));
    this.createMetaGraph(startLocation, foods);
    let order = this.metaGraph.solveTSP();
    let dest;
    let shortestPath = [];
    let enterLeft;
    let enterRight;
    let enterTop;
    let enterBottom;
    let exitLeft;
    let exitRight;
    let exitTop;
    let exitBottom;
    let start;
    for (let i = -1; i < order.length; i++) {
      if(i >= 0){
        start = this.foodLocations[this.metaGraphMapping[order[i]]];
      } else {
        start = startLocation;
      }
      if (i < order.length - 1) {
        dest = this.foodLocations[this.metaGraphMapping[order[i+1]]];
      } else {
        dest = this.findClosestRegister(startLocation);
      }
      //console.log(start[0],start[1],dest[0],dest[1]);
      shortestPath = this.shortestPath(start[0],start[1],dest[0],dest[1]) || [];
      for (let i=1;i<shortestPath.length-1; i+=1) {
        let prev = this.createLocationFromString(shortestPath[i-1]);
        let current = this.createLocationFromString(shortestPath[i]);
        let next = this.createLocationFromString(shortestPath[i+1]);
        enterTop = prev.row === current.row - 1;
        enterBottom = prev.row === current.row + 1;
        enterLeft = prev.col === current.col - 1;
        enterRight = prev.col === current.col + 1;
        exitTop = current.row === next.row + 1;
        exitBottom = current.row === next.row - 1;
        exitLeft = current.col === next.col + 1;
        exitRight = current.col === next.col - 1;

        if((enterTop && exitBottom)|| (enterBottom && exitTop)){
          navigation[current.row][current.col] = 0;
        } else if((enterLeft && exitRight)|| (enterRight && exitLeft)){
          navigation[current.row][current.col] = 1;
        } else if((enterLeft && exitTop)|| (enterTop && exitLeft)){
          navigation[current.row][current.col] = 2;
        } else if((enterTop && exitRight)|| (enterRight && exitTop)){
          navigation[current.row][current.col] = 3;
        } else if((enterRight && exitBottom)|| (enterBottom && exitRight)){
          navigation[current.row][current.col] = 4;
        } else if((enterBottom && exitLeft)|| (enterLeft && exitBottom)){
          navigation[current.row][current.col] = 5;
        }
      }
    }
    let foodOrder = order.map( i => this.metaGraphMapping[i]);
    return [navigation,foodOrder, dest] ;
  }

}
