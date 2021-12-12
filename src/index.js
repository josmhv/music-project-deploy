import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import './styles/global.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<div className="">
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</div>,
	document.getElementById('root')
);
