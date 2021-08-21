import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => { // me u kthy ne signin . kto ktu mrena jan variabla. isSingedIn (funksioni jon)bon te mundur qe mos te dali ne fillim sigout
		if (isSignedIn) {
			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			   	    <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'> Sign Out </p>
		   		</nav>
	   		);
	    } else {
	    	return (
		    	<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			   	    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'> Sign In </p>
			   		<p onClick={() => onRouteChange('Register')} className='f3 link dim black underline pa3 pointer'> Register </p>
		   		</nav>
	   		);
	    }
}

export default Navigation;