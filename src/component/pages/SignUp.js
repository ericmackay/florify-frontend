import React, {Component} from 'react';
import auth from '../../auth'
import './SignUp.css';
import FontAwesome from 'react-fontawesome';

const ENTER = 13;

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _handleSignup = () => {
        // deep destructuring equivalent to (let email = this.refs.email.value;)
        let { email: {value: email}, password: {value: password}, phone: {value: phone} } = this.refs;
        if (email && password) {
            auth.signup({
              email: email,
              password: password,
              phone: phone
            })
                .then(res => this.props.router.push('/login'))
                .catch(console.error)
        }
        // else {
        //     this.setState({ error: "Please enter an email and password"})
        // }
    }

    _handleTyping = (e) => {
        if (this.state && this.state.error) {
            this.setState({ error: null })
        }
        if (e.keyCode===ENTER) {
            this._handleSignup()
        }
    }

    render() {
        return (
          <div className="sign__up">
            <div className="sign__up-content">
              <h1>Sign Up</h1>
              <input type="text" placeholder="Email" ref="email" onKeyUp={this._handleTyping}/><br/>
              <input type="password" placeholder="Password" ref="password" onKeyUp={this._handleTyping}/><br/>
              <input type="text" placeholder="Phone Number" ref="phone" onKeyUp={this._handleTyping}/><br/>
              <div className="sign__up-button">
                <button onClick={this._handleSignup}>Sign Up</button>
              </div>
            </div>
          </div>
        );
    }

}
