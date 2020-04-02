import React from 'react';
import Board from './Board';
import './popup.css'
import './burger.css'


class Login extends React.Component {

    toogle = false
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: '',
            Board:[]
           
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlepassword = this.handlepassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleEmail(e) {

        this.setState({ email: e.target.value });


    }
    handlepassword(e) {
        this.setState({ password: e.target.value });
    }
    handleLogin(e) {


        if (this.state.email === null) {
            alert("Please give username")

        }
        else if (!localStorage.getItem(this.state.email)) {
            localStorage.setItem(this.state.email, JSON.stringify(this.state))
            this.toogle = !this.toogle
        }
        else if (this.state.password === (JSON.parse(localStorage.getItem(this.state.email)).password)) {
            this.toogle = !this.toogle

        }
        else {
            alert("Enter correct password")
        }

        this.setState({ email: this.state.email });


    }


    render() {
        return (
            <div  className='cd'>
                {this.toogle ? 
                <div > 
                 <Board onLogout={() => { this.toogle = !this.toogle; this.setState({ email: null }) }}
                  logout={this.toogle} mail={this.state.email} />  </div>:
                  <div className='centre'>
                   <h3 >Login</h3>
                    <p >
                        Username : <input placeholder="username" type='text' value={this.state.email} onChange={this.handleEmail}></input><br></br>
                        Password : <input placeholder="password" type='password' value={this.state.password} onChange={this.handlepassword}></input><br></br>
                         <button className="centre" onClick={this.handleLogin} >Signin</button>
                     </p>
                </div>}
                
            </div>
        )
    }
}

export default Login;
