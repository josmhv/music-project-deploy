import React from 'react';
import NavBar from './NavBar/NavBar';
import { UploadFiles } from './UploadFiles/UploadFiles';
import PlayMusic from './PlayMusic/PlayMusic';
// import { Login } from './Login/Login';

function App() {
	return (
		<div className="app ">
			<NavBar />
			<UploadFiles />
			<PlayMusic />
			{/* <Login /> */}
			{/* <div className="overlay"></div> */}
		</div>
	);
}

export default App;
