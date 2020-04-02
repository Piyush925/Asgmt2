import React from 'react';
import './popup.css';
import 'react-dropdown/style.css';
import  Dropdown from 'react-dropdown'

class Popup extends React.Component {
    data;
    constructor(props){
        super(props);
        this.state={
            index:'',
            title:'',
        }
        this.handleindex=this.handleindex.bind(this);
        this.handleadd=this.handleadd.bind(this);
        this.handle=this.handle.bind(this);
    }
    handle(e){
        this.setState({title:e.target.value})

    }
    handleindex(e){
       console.log(e)
       this.setState({index:e.value})

    }
    handleadd(){
        this.data=JSON.parse(localStorage.getItem(this.props.mail))
        if(this.state.index==='last')
        {
            this.data.Board[this.props.ikey].stages.push({name:this.state.title,task:[]})
        }
        else{
            this.data.Board[this.props.ikey].stages.splice(this.state.index,0,{name:this.state.title,task:[]})
        }
        localStorage.setItem(this.props.mail,JSON.stringify(this.data));
        alert("task Added");
        this.props.pop();

    }
    render() {
        this.data=JSON.parse(localStorage.getItem(this.props.mail))
        let options =[]
         this.data.Board[this.props.ikey].stages.map((item,key)=>{
                return ( options.push(key))
        })
        options=[...options,"last"]
        return (
            <div className='popup'>

                <div className="popup/_inner">
                
                    <input type="text" placeholder="title" value={this.state.title} 
                    onChange={this.handle} ></input><br></br>
                    <Dropdown className='cdtask' options={options} value={this.state.index}
                    onChange={this.handleindex} 
                     placeholder="Select Position of Stages" />
                    <button onClick={this.handleadd}>ADD</button> <br />
                    <button onClick={this.props.pop}>Close</button>
                   
                </div>

            </div>
        )
    }
}

export default Popup;