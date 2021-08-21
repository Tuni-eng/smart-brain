import React from 'react';

//const Signin = ({onRouteChange}) => { //funskioni te app.js per me u fut te faqja pas log init

class Signin extends React.Component {

    constructor(props) { //duhet te krijom kete state ne funksion te onemailchange dhe onpasswordchange. 
    	super(props);
        this.state = {
        	signInEmail: '',
        	signInPassword: ''
        }
    }

	onEmailChange = (event) => {    //per me mor vlerat e inputeve
	    this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {    //per me mor vlerat e inputeve
		this.setState({signInPassword: event.target.value})
	}

	//nese kto lart funksjonojn athere bojm kte posht
	onSubmitSignIn = () => {
		// kjo bon lidhjen front-end me back-end
		fetch('https://sheltered-waters-28891.herokuapp.com/signin', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())  // kjo bohn loginin  
      .then(user => {
        if(user.id){ // does the user exist? Did we receive a user with a property of id?
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
	}

	render() {
		const { onRouteChange } = this.props; // ne funksion te onclick posht
		return(
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        onChange={this.onEmailChange} // kjo bohet qe te meret ajo qe shkruhet ne input(jo dergimi ne server)
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        name="email-address"  
			        id="email-address" 
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        onChange={this.onPasswordChange} // kjo bohet qe te meret ajo qe shkruhet ne input(jo dergimi ne server)
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password"  
			        id="password" 
			        />
			      </div>
			    </fieldset>
			    <div className="">
			      <input
			      //kjo bohet per ate lart onSubmitSignIn
                  onClick={this.onSubmitSignIn} //kjo ka ndrryshu nga ajo e para qe ka qen.e kjthejm e funksion qe sa her ti japim run tna japi ate q do 
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
			      type="submit" 
			      value="Sign in" 
			      />
			    </div>
			    <div className="lh-copy mt3">
			      <p 
			        //this.props. --> bohet per me mar disa props
				    onClick={() => onRouteChange('register')} 
				    className="f6 link dim black pointer db">Register</p> {/*e bojm <p> sepse kur i japim register ndrroj rrug jo me me tagun <a>*/} 
			    </div>
			  </div>
			</main>
			</article>
		);
	}	
}

export default Signin;