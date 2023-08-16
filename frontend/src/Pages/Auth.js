import React from "react";
import axios from "axios";
import '../index.css';
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignup: false,
            isFieldEmpty: true,
            isSignFieldEmpty: true
        };
        this.updateFieldState = this.updateFieldState.bind(this);
        this.updateSignFieldState = this.updateSignFieldState.bind(this);
        this.login = this.login.bind(this);
    }
    
    componentDidMount() {
        if(localStorage.getItem("isLoggedIn") == 1) {
            window.location.replace('/profile');
        }
    }

    login() {
        // console.log("Trying to login");
        var username = document.getElementById("username").value;
        var password = document.getElementById("pwd").value;
        if(username == "" || password == "")
            return;
        axios.post('http://localhost:8000/signin', {
                email: username.toString(),
                password: password.toString()
              })
              .then((response) => {
                if(response.data.success == true)
                {
                    localStorage.setItem("AuthToken", response.data.token)
                    console.log(response.data.token);
                    localStorage.setItem("isLoggedIn", 1);
                    // console.log(localSt  orage.getItem("isLoggedIn"));
                    window.location.replace('/profile');
                }
                else
                    return;
                })
              .catch(function (error) {
                console.log(error);
              });
        // console.log(username);
        // console.log(password);
        // console.log(localStorage.getItem("isLoggedIn"));
        
        return;
    }

    renderLoginButton() {
        // console.log()
        if(this.state.isFieldEmpty) {
            return (
                <button className="button3" id="login" type="button" disabled>LOGIN</button>
            );
        }
        else {
            return (
                <button onClick={() => this.login()} className="button3" id="login" type="button">LOGIN</button>
            );
        }
    }

    signup() {
        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var uname = document.getElementById("uname").value;
        var email = document.getElementById("email").value;
        var age = document.getElementById("age").value;
        var contact = document.getElementById("contact").value;
        var pass = document.getElementById("pass").value;
        axios.post('http://localhost:8000/signup', {
                fname: fname.toString(),
                lname: lname.toString(),
                username: uname.toString(),
                email: email.toString(), 
                age: age.toString(),
                contact: contact.toString(),
                password: pass.toString()
              })
              .then(function (response) {
                if(response.data.success == true)
                {
                    alert("Account created successfully, please login with your credentials now.")
                    window.location.reload();
                }
                else
                    return;
                })
              .catch(function (error) {
                console.log(error);
              });
        // console.log(username);
        // console.log(password);
        // console.log(localStorage.getItem("isLoggedIn"));
        // window.location.reload();
    }

    updateSignFieldState() {
        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var uname = document.getElementById("uname").value;
        var email = document.getElementById("email").value;
        var age = document.getElementById("age").value;
        var contact = document.getElementById("contact").value;
        var pass = document.getElementById("pass").value;
        if(fname == "" || lname == "" || uname == "" || email == "" || age == "" || contact == "" || pass == "") {
            this.setState({isSignFieldEmpty:true});
        }
        else {
            this.setState({isSignFieldEmpty:false});
        }
    }

    renderSignupButton() {
        if(this.state.isSignFieldEmpty) {
            return (
                <button className="button3" id="login" type="button" disabled>SIGNUP</button>
            );
        }
        else {
            return (
                <button onClick={() => this.signup()} className="button3" id="login" type="button">SIGNUP</button>
            );
        }
    }

    updateFieldState() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("pwd").value;
        // console.log(username);
        // console.log(password);
        if(username == "" || password == "") {
            this.setState({isFieldEmpty:true});
        }
        else {
            this.setState({isFieldEmpty:false});
        }
        return;
    }

    renderForm(){
        if(!this.state.isSignup) {
            return (
                <div>
                    <form className="form1">
                        <label>Email : </label><br />
                        <input type="text" id="username" name="username" className="input1" onChange={this.updateFieldState} /><br />
                        <label>Password : </label><br />
                        <input type="password" id="pwd" name="pwd" className="input1" onChange={this.updateFieldState}/><br />
                        {this.renderLoginButton()}
                    </form>
                 </div>
            );
        }
        else {
            return(
                <form className="form1">
                    <label>First Name : </label><br />
                    <input type="text" id="fname" name="fname" className="input1" onChange={this.updateSignFieldState}/><br />
                    <label>Last Name : </label><br />
                    <input type="text" id="lname" name="lname" className="input1" onChange={this.updateSignFieldState} /><br />
                    <label>User Name : </label><br />
                    <input type="text" id="uname" name="uname" className="input1" onChange={this.updateSignFieldState} /><br />
                    <label>Email : </label><br />
                    <input type="text" id="email" name="email" className="input1" onChange={this.updateSignFieldState} /><br />
                    <label>Age : </label><br />
                    <input type="text" id="age" name="age" className="input1" onChange={this.updateSignFieldState} /><br />
                    <label>Contact Number : </label><br />
                    <input type="text" id="contact" name="contact" className="input1" onChange={this.updateSignFieldState} /><br />
                    <label>Password : </label><br />
                    <input type="password" id="pass" name="pass" className="input1" onChange={this.updateSignFieldState} /><br />
                    {/* <button className="button3" id="login" type="button">SIGNUP</button> */}
                    {this.renderSignupButton()}
                 </form>
            );
        }
    }

    render() {
        return(
            <div>
                 <h1><center>Authentication page</center></h1>
                 <button className="button1 button2" id="1" onClick={() => {
                    this.setState({isSignup:false});
                    document.getElementById("1").style.backgroundColor='yellow';
                    document.getElementById("2").style.backgroundColor='white';
                 }}>Login</button>
                 <button className="button1" id="2" onClick={() => {
                    this.setState({isSignup:true, isFieldEmpty:true});
                    document.getElementById("1").style.backgroundColor='white';
                    document.getElementById("2").style.backgroundColor='yellow';
                 }}>Signup</button>
                 <br /><br /><br />
                 {this.renderForm()}
            </div>
        );
    }
}

export default Auth;