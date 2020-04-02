import React from 'react';
import './popup.css';
import moment from 'moment';
import { DatePickerComponent} from '@syncfusion/ej2-react-calendars';
class Popups extends React.Component{
    data;
    constructor(props){
        super(props)
        this.state={
            title:'',
            description:'',
            created_date:'',
            startdate:'',
            enddate:''
        }
        this.handletitle=this.handletitle.bind(this);
        this.handledes=this.handledes.bind(this);
        this.handledate=this.handledate.bind(this);
        this.handlesdate=this.handlesdate.bind(this);
        this.handleenddate=this.handleenddate.bind(this);
        this.handleadd=this.handleadd.bind(this);
    }
    handletitle(e)
    {
        this.setState({title:e.target.value})
    }
    handledes(e)
    {
        this.setState({description:e.target.value})
    }
    handledate(e)
    {
        this.setState({created_date:moment(e.target.value).format('L')})
    }
    handlesdate(e)
    {
        this.setState({startdate:moment(e.target.value).format('L')})
    }
    handleenddate(e)
    {
        this.setState({enddate:moment(e.target.value).format('L')})
    }
    handleadd(){
        this.data=JSON.parse(localStorage.getItem(this.props.mail));
        if(this.state.title===''){
            alert('title is needed')
        }
        else if(this.state.created_date===''){
            alert('created date is needed')
        }
        else {
            this.data.Board[this.props.skey].stages[this.props.tkey].task.push(this.state)
            localStorage.setItem(this.props.mail,JSON.stringify(this.data))
            alert('Task added');
            this.props.pop();
             }


    }
    render(){
        return(
<div className='popup'>

<div className="popup/_inner">

    <input type="text" placeholder="title" value={this.state.title} 
    onChange={this.handletitle} ></input><br/>
    <input type="text" placeholder="description" value={this.state.description} 
    onChange={this.handledes} ></input><br/>
   <DatePickerComponent placeholder="select created date" onChange={this.handledate} value={this.state.created_date}/><br/>
   <DatePickerComponent placeholder="select start date" onChange={this.handlesdate} value={this.state.startdate}/><br/>
   <DatePickerComponent placeholder="select End date" onChange={this.handleenddate} defaultValue={this.state.enddate}/><br/>
    <button onClick={this.handleadd}>ADD</button> <br />
    <button onClick={this.props.pop}>Close</button>
   
</div>

</div>
        )
    }
}

export default Popups;