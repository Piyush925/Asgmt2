import React from 'react';
import './popup.css'
import { Link } from 'react-router-dom'
import Routen from './Routen';
class Board extends React.Component {

    data;
   toogle=false;
   key=0;
    constructor(props) {
        super(props)
        this.state = {
            boardname: '',
            stages: [
                        {name:"New",task:[]},
                        {name:"Done",task:[]}
                    ]
        }
        this.handletoogle=this.handletoogle.bind(this);
        this.handleadd = this.handleadd.bind(this);
        this.handlename = this.handlename.bind(this);
        this.deleteboard=this.deleteboard.bind(this);
    }
    deleteboard(dkey){
        this.data=JSON.parse(localStorage.getItem(this.props.mail))
        this.data.Board.splice(dkey,1);
        localStorage.setItem(this.props.mail,JSON.stringify(this.data))
        this.setState({boardname:this.state.boardname})
    }
    handletoogle(){
        this.toogle=!this.toogle;
        this.setState({boardname:this.state.boardname})
    }
    handlename(e) {
        this.setState({ boardname: e.target.value })
    }
    handleadd() {
        this.data = JSON.parse(localStorage.getItem(this.props.mail));
        this.data.Board.push(this.state);
        localStorage.setItem(this.props.mail, JSON.stringify(this.data));
        this.setState({ boardname: this.state.boardname })

    }


    render() {
        this.data = JSON.parse(localStorage.getItem(this.props.mail)) 
     
        
        return (
          
            <div className='centre'>
                
                <div className='centre'>
                    Username: {this.props.mail}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={this.props.onLogout} >Logout</button>
                </div><br />
              {  this.toogle? <Routen toogle={this.handletoogle} mail={this.props.mail}/>:<div className='cenr'>
                    <input value={this.state.boardname} onChange={this.handlename} placeholder="BoardName" />
                    <button onClick={this.handleadd}>Add Board</button>
                    {
                        this.data.Board.length > 0 ?
                            <div>
                                <ul>
                                    {this.data.Board.map((item, key1) => {

                                        return (<li><Link to={"/" + item.boardname} onClick={()=>{this.key=key1;
                                        this.toogle=!this.toogle;
                                        this.setState({boardname:this.state.boardname})}}>
                                            {item.boardname}</Link>&nbsp;&nbsp;<button onClick={()=>{this.deleteboard(key1)}}>x</button></li>)
                                    })}
                                </ul>
                            </div>
                            : null
                    }
                  
                </div>}
                
               
            </div>
           
        )
    }
}

export default Board;
