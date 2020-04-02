import React from 'react';
import './App.css';
import './popup.css'
import { Card, CardHeader, CardBody, CardFooter } from 'react-simple-card';
import {ScrollArea} from 'react-scrollbar'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Popups from './PopUpt'
import { Scrollbars } from 'react-custom-scrollbars';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown'

class DisplayStages extends React.Component {
    data; tkey;
    constructor(props) {
        super(props)
        this.state = {
            popup: false,
            inp: '',
            ekey: '',
            index: ''
        }
        this.handlepop = this.handlepop.bind(this);
        this.dlt = this.dlt.bind(this);
        this.handleinput = this.handleinput.bind(this);
        this.handleedit = this.handleedit.bind(this);
        //this.handleindex=this.handleindex.bind(this);
        this.mov = this.mov.bind(this);
    }

    mov(to, curr) {
       
        if (curr !== to) {
            this.data = JSON.parse(localStorage.getItem(this.props.mail));
            this.data.Board[this.props.skey].stages.splice(to < curr ? to : to + 1, 0, this.data.Board[this.props.skey].stages[curr])
            this.data.Board[this.props.skey].stages.splice(to < curr ? curr + 1 : curr, 1)
            localStorage.setItem(this.props.mail, JSON.stringify(this.data));
            this.setState({ index: this.state.index })
        }
    }
    handleedit() {
        this.data = JSON.parse(localStorage.getItem(this.props.mail));
        this.data.Board[this.props.skey].stages[this.state.ekey].name = this.state.inp;
        localStorage.setItem(this.props.mail, JSON.stringify(this.data));
        this.setState({ ekey: '' })
    }
    handleinput(e) {
        this.setState({ inp: e.target.value })
    }
    handlepop() {
        this.setState({ popup: !this.state.popup })
    }
    dlt(dkey) {
        this.data = JSON.parse(localStorage.getItem(this.props.mail));

        this.data.Board[this.props.skey].stages[dkey].task.map((item) => {
            if (dkey === 0) {
                return this.data.Board[this.props.skey].stages[dkey + 1].task.push(item)
            }
            else {
                return this.data.Board[this.props.skey].stages[dkey - 1].task.push(item)
            }
        })

        this.data.Board[this.props.skey].stages.splice(dkey, 1);
        localStorage.setItem(this.props.mail, JSON.stringify(this.data));
        this.setState({ popup: this.state.popup })
    }

    render() {
        this.data = JSON.parse(localStorage.getItem(this.props.mail))
        let options = []
        this.data.Board[this.props.skey].stages.map((item, key) => {
            return (options.push(key + 1))
        })


        return (
            <div >
              
                <Container>
                    <div class='row'>
                   
                        {
                            this.data.Board[this.props.skey].stages.map((item, key) => {
                                return (
                                    
                                    <div class='col-md-6'>
                                   
                                    <Card >
                                        <CardHeader>
                                            <label class={this.state.ekey === key ? 'hide' : ''} onClick={() => { this.setState({ inp: item.name, ekey: key }) }}>{item.name}</label>
                                            <div class={this.state.ekey === key ? '' : 'hide'}>
                                                <input value={this.state.inp} onChange={this.handleinput} type="text"></input>
                                                <button onClick={this.handleedit}>Save</button>
                                            </div>
                                            {this.data.Board[this.props.skey].stages.length > 1 ? <Dropdown className={this.state.ekey === key ? 'hide' : 'cdtasks'}
                                                options={options} value={this.state.index}
                                                onChange={(e) => { this.mov(e.label - 1, key) }}
                                                placeholder="Move to" /> : null}
                                            {this.data.Board[this.props.skey].stages.length > 1 ?
                                                <button onClick={() => { this.dlt(key) }}>x</button> : null}</CardHeader>
                                        <CardBody> <Scrollbars style={{ width: 220, height: 200 }}> {item.task.map((item1, key1) => {
                                            return (<div>{key1 === 0 ? null : <hr></hr>}
                                                <p>Title:{item1.title}</p>
                                                <p>Description:{item1.description}</p>
                                                <p>Created Date:{item1.created_date}</p>
                                                <p>StartDate:{item1.startdate}</p>
                                                <p>EndDate:{item1.enddate}</p>
                                            </div>)
                                        })}</Scrollbars> </CardBody>
                                        <CardFooter><button onClick={() => { this.tkey = key; this.setState({ popup: !this.state.popup }) }}>Add Task
                                        </button></CardFooter>
                                    </Card>
                                  
                                        </div>
                                        
                                )
                            })
                        }
                         
                    </div>
                </Container>
                {this.state.popup ? <Popups pop={this.handlepop} mail={this.props.mail}
                    skey={this.props.skey} tkey={this.tkey} /> : null}
         
            </div>
        )
    }
}

export default DisplayStages;