import React from 'react';
import './App.css';
import './popup.css'

import './burger.css';
import DisplayStages from './DisplaySatges'
import Popup from './PopUp';
class DisplayBoard extends React.Component{
    data;
    constructor(props){
        super(props)
        this.state={
            popup:false
        }
        this.handlepop=this.handlepop.bind(this);
        this.handleadd=this.handleadd.bind(this);
    }
    handlepop(){
        this.setState({popup:!this.state.popup})
    }
    handleadd(){
        this.setState({popup:!this.state.popup})
    }
    render(){
        this.data=JSON.parse(localStorage.getItem(this.props.mail))
        
        return(
            <div className='cd'>
                <button onClick={this.props.toogle}>Back</button>
                <div className="centre">
                <h4>Board:{this.data.Board[this.props.hello].boardname}</h4>
                <button onClick={this.handleadd}>Add Stages</button>
                <div>
                <DisplayStages mail={this.props.mail} skey={this.props.hello} />
                {this.state.popup?<Popup mail={this.props.mail} ikey={this.props.hello} pop={this.handlepop}/>:null}
                </div>
                </div>
                

            </div>
        )
    }
}
export default DisplayBoard;