import React,{Component} from 'react';
import logo from './logo.svg';
import Grid from './Component/Grid'
import './App.css';
import cloneDeep from 'lodash/cloneDeep'

class App extends Component {
  constructor(){
      super();
      this.rows = 10;
      this.cols = 10;

      this.state ={
        grid: Array(this.rows).fill().map(()=> Array(this.cols).fill(false))
      }
  }
  selectCell = (i,j)=>{
    //clone the grid bcz we cant change the state directly
    let gridClone = cloneDeep(this.state.grid);

    gridClone[i][j] = !gridClone[i][j] //doing negation of current value for toggle between true and false

    this.setState({
      grid: gridClone
    })
    
  }

  start = ()=>{
    let gridOriginal = this.state.grid;
    let gridClone = cloneDeep(this.state.grid);
    //looping over all the cells and setting them true & false acc to the rules
    for(let i=0; i<this.rows;i++){
      for(let j=0; j<this.cols; j++){
        let count = 0;
        // logic to count the surrounding live cells
        // top cell
        if (i > 0) {
          if (gridOriginal[i - 1][j]){
            count++;
          } 
        }

        // top left diagonal
        if (i > 0 && j > 0) {
          if (gridOriginal[i - 1][j - 1]) {
            count++;
          } 
        }

        // top right diagonal
        if (i > 0 && j < this.cols - 1) { 
          if (gridOriginal[i - 1][j + 1]) {
            count++;
          } 
        }

        // right cell
        if (j < this.cols - 1) {
          if (gridOriginal[i][j + 1]) {
            count++;
          }
        }

        // left cell
        if (j > 0) {
          if (gridOriginal[i][j - 1]){
            count++;
          } 
        } 

        // bottom cell
        if (i < this.rows - 1) {
          if (gridOriginal[i + 1][j]) {
            count++;
          }
        }

        // bottom left diagonal cell
        if (i < this.rows - 1 && j > 0) {
          if (gridOriginal[i + 1][j - 1]) {
            count++;
          }
        }

        // bottom right diagonal cell                                                                                                       
        if (i < this.rows - 1 && j < this.cols - 1) {
          if (gridOriginal[i + 1][j + 1]) {
            count++;
          }
        }


        //logic for cell to die in case of over population and under population
        if(gridOriginal[i][j] && (count < 2 || count > 3)){
          gridClone[i][j] = false;
        }
        //logic for cell to get alive
        if(!gridOriginal[i][j] && count===3){
          gridClone[i][j] = true;
        }
         
      }
    }
    this.setState({
      grid: gridClone
    })
  }

  onclickHandler = ()=>{
    setInterval(this.start, 500);
  }

  render(){
    return (
      <div className="App">
        <h4>Please select the cells & press the Start button</h4>
        <Grid
          rows={this.rows}
          cols={this.cols}
          grid={this.state.grid}
          selectCell = {this.selectCell}
        />
        <div className="start-btn"><button onClick={this.onclickHandler}>Start</button></div>
      </div>
    );
  }
  
}

export default App;
