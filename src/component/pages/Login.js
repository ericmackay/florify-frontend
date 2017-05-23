import React, {Component} from 'react';
import auth from '../../auth'
import './login.css';
import FontAwesome from 'react-fontawesome';

const ENTER = 13;

export default class Login extends Component {

    _handleLogin = () => {
        // deep destructuring equivalent to (let email = this.refs.email.value;)
        let { email: {value: email}, password: {value: password} } = this.refs;
        if (email && password) {
            auth.login(email, password)
                .then(res => this.props.router.push('/'))
                .catch(console.error)
        }
        else {
            this.setState({ error: "Please enter an email and password"})
        }
    };

    _handleTyping = (e) => {
        if (this.state && this.state.error) {
            this.setState({ error: null })
        }
        if (e.keyCode===ENTER) {
            this._handleLogin()
        }
    };

    render() {
        return (
          <div className="login">
          <div className="login-content">
            <h1>Login</h1>
            <input type="text" placeholder="Email" ref="email" onKeyUp={this._handleTyping}/><br/>
            <input type="password"  placeholder="Password" ref="password" onKeyUp={this._handleTyping}/><br/>
          <div className="login-button">
            <button onClick={this._handleLogin}>Login</button>
          </div>
          </div>
        </div>
        );
    }

}
