import React from 'react';
import {  Route } from 'react-router-dom'
import DisplayBoard from './DisplayBoard'
class Routen extends React.Component {
    data;
    render() {
        this.data = JSON.parse(localStorage.getItem(this.props.mail))

        return (
            <div>
                {
                    this.data.Board.length > 0 ?
                        <div>
                            {this.data.Board.map((item, key) => {
                                return (

                                    <Route exact path={"/" + item.boardname}>
                                        <DisplayBoard mail={this.props.mail} hello={key} toogle={this.props.toogle} />
                                    </Route>
                                )
                            })}
                        </div>
                        : null
                }
            </div>
        )
    }
}

export default Routen;