import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


const particlesOptions = { 
  "particles":{
    "number":{
      "value":60,
      "density":{
        "enable":true,
        "value_area":600
      }
    }
  }  
};


//kjo krijohet qe mos ti ngelin informacionet ne fornt-end personit para nesh
const initialState = {
   input: '', //1.i deklarojm kto
      imageUrl: '', //2.i deklarojm kto
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}
class App extends Component {
  constructor() {
    super(); 
    this.state = initialState;
  }

  loadUser = (data) => {  //kjo ndodh kur rregjistrohen userat ecila duhet ta vendosim dhe posht si funksion tek register
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


//lidhja front-end me back-end. 
//ps. eheqim kur marojm pun
  // componentDidMount() {
  //   fetch('http://localhost:3000/') //fetch na ndimon me komunikuar me outsideword
  //   .then(response => response.json())
  //   .then(console.log)
  // }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = 
    data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return { //formula per katrrorin
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    }
  }

displayFaceBox = (box) => {
  this.setState({box: box});
}

  onInputChange = (event) => {
    this.setState({input: event.target.value}); //kjo mer vleren nga eventi
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input }); //3. i deklarojm ktu
      fetch('https://sheltered-waters-28891.herokuapp.com/imageurl', { //lidhet me serverin 
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: this.state.user.input
        }) 
      })
      .then(response => response.json()) 

    .then(response => { 
      if (response) {
        fetch('https://sheltered-waters-28891.herokuapp.com/image', { //lidhet me serverin 
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.state.user.id
          }) 
        })  
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response)) 
    })
    .catch(err => console.log( err));
  }

  onRouteChange = (route) => { // kjo bohet qe ti japim mundsi dhe sign in dhe sign out
    if (route === 'signout') { //kjo bohet per me heq sign out na faqja par
      this.setState(initialState)// kjo initial state futet qe mos ti shofi tjt infot e tjt
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route }); //dueht {} sepse esht nje objekt
  }

  render() {
    const { isSignedIn, imageUrl, box } = this.state; //kjo bohet q mos ti shrujm statement posht this.state
    return (
      <div className="App particles.js">
        <Particles className='particles'
                params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/> {/*//ajo e dyta bon qe kur je bo sign in del log out lart, ate para e this.state sepse esh statement*/}
        { this.state.route === 'home'  //nese kjo esht e vertet kthe sign in nese jo lgo component
          ?<div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={ box } imageUrl={ imageUrl } /> 
          </div> 
        :(
        this.state.route === 'signin'  
        ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
        :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
        }   
      </div>  
    );
  }
}

export default App;
