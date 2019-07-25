import React ,{Component} from 'react';

class Grid extends Component{
    render(){
        //to set the container width
            const width = this.props.cols * 25;
            let rowsArray =[];
            
        //looping over the grid to create the cells and push them in rowsArraay
            for(let i=0; i<this.props.rows;i++){
                for(let j=0; j<this.props.cols; j++){

                    let cellId = i+"_"+j; //to give the unique id of each cell

                    //dynamically assigning class for dead and live cell
                    let cellClass = this.props.grid[i][j] ? "cell live": "cell dead"; 

                    rowsArray.push(
                        <div className={cellClass} key={cellId}
                            onClick={()=>{this.props.selectCell(i,j)}}>
                        </div>
                    )
                }
            }
        return(
            <div className="grid" style={{width:width}}>
                {rowsArray}
            </div>
        )
    }
}
export default Grid