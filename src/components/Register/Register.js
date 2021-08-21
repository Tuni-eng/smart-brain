import React from 'react';

//const Register = ({onRouteChange}) => { //para se te lidhet me back-end. funskioni te app.js per me u fut te faqja pas log init
class Register extends React.Component {
	constructor(props) { //duhet te krijom kete state ne funksion te onemailchange dhe onpasswordchange. 
    	super(props);
        this.state = {
        	email: '',
        	password: '',
        	name:''
        }
    }

	onNameChange = (event) => {    //per me mor vlerat e inputeve
	    this.setState({name: event.target.value})
	}

	onEmailChange = (event) => {    //per me mor vlerat e inputeve
	    this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {    //per me mor vlerat e inputeve
		this.setState({password: event.target.value})
	}

	onSubmitSignIn = () => {
		// kjo bon lidhjen front-end me back-end
		fetch('https://sheltered-waters-28891.herokuapp.com/register', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials" : true
			},
			'mode' : 'no-cors',
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
		.then(response => response.json()) 
		.then(user => {
			if(user.id) {
				this.props.loadUser(user)
		        this.props.onRouteChange('home'); //this.props. --> bohet per me mar disa props
			}
		})
	}
	render() {
		return(
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
				        <input 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="name" 
				        name="name"  
				        id="name" 
				        onChange = {this.onNameChange}
				        />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address" 
				        onChange = {this.onEmailChange}
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        type="password" 
				        name="password"  
				        id="password" 
				        onChange = {this.onPasswordChange}
				        />
				      </div>
				    </fieldset>
				    <div className="">
				      <input
	                  onClick={this.onSubmitSignIn} //e kjthejm e funksion qe sa her ti japim run tna japi ate q do 
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Register" 
				      />
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}	

export default Register;