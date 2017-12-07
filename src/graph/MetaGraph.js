//@flow

export default class MetaGraph {

  adjacencyMatrix: Array<Array<number>>;
  distFromStart: Array<number>;
  distToRegister: Array<number>;

  constructor(adjacencyMatrix: Array<Array<number>>, distFromStart: Array<number>, distToRegister) {
    this.adjacencyMatrix = adjacencyMatrix;
    this.distFromStart = distFromStart;
    this.distToRegister = distToRegister;
  }

  solveTSP(){
    let nodes = [];
    for(let i = 0; i <this.adjacencyMatrix.length; i++){
      nodes.push(i);
    }
    return this.permutator(nodes);
  }

  permutator(inputArr: Array<number>) {
    let result = this.permute(inputArr, []);
    //console.log(result);
    return result;
  }

  permute(arr: Array<number>, m: Array<number>) {
    if (arr.length === 0) {
      return m;
    } else {
      let minLength = Infinity;
      let result = []
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        let path = this.permute(curr.slice(), m.concat(next));
        let length = this.computeDistance(path)
        if (length <= minLength) {
          result = path;
          minLength = length;
        }
      }
      return result;
    }
  }

  computeDistance(inputArr: Array<number>){
    let sum =0
    for(let i = 0; i<inputArr.length-1; i++){
      sum+=this.adjacencyMatrix[inputArr[i]][inputArr[i+1]];
    }
    //console.log(inputArr, sum);
    sum += this.distFromStart[inputArr[0]] + this.distToRegister[inputArr[inputArr.length-1]];
    return sum;
  }
}
