import React from 'react';
import NavBar from './NavBar/NavBar';
import { UploadFiles } from './UploadFiles/UploadFiles';
import PlayMusic from './PlayMusic/PlayMusic';
import { Login } from './Login/Login';
// import Search from './Search';

function App() {
	return (
		<div className="app ">
			<NavBar />
			<UploadFiles />
			<PlayMusic />
			{/* <Search /> */}
			<Login />
			<div className="overlay"></div>
		</div>
	);
}

export default App;
