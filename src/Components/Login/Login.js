import React, { useEffect } from 'react';
import './Login.scss';
import $ from 'jquery';
import { postUserName, getUserName, userNameList } from '../APIConnect';

let signingUp = false;
let userNameGlobal;

async function submitUserName() {
	const userName = document.querySelector('.userName').value;

	if (userName.length < 1) return;

	let formatted = formatUserName(userName);

	if (signingUp) {
		if (await checkIfUserNameExist(formatted)) throw new Error('Usuario ya existente');
		saveUserName(userName);
		userNameGlobal = userName;
		hide();
	} else {
		if (!(await checkIfUserNameExist(formatted))) throw new Error('Usuario no existente');
		userNameGlobal = userName;
		hide();
	}
}

async function checkIfUserNameExist(userName) {
	try {
		await getUserName();
		return userNameList?.includes(userName);
	} catch (err) {
		alert('');
		console.error(err);
		hide();
	}
}

function hide() {
	$('.overlay').addClass('opacityZero hidden');
	$('.login').addClass('opacityZero hidden');
}

function formatUserName(userName = String) {
	return userName.toLowerCase().replace(' ', '_');
}

function saveUserName(userName) {
	postUserName(userName);
}

function checkSUP() {
	const supInput = document.querySelector('.sup-input');
	const supText = document.querySelector('#sup-text');
	if (supInput.checked) {
		supText.style.setProperty('--bg-sup', '#537674');
		supText.style.setProperty('--hover-sup', 'rgba(71, 71, 71, 0.788)');
		signingUp = true;
	} else {
		supText.style.setProperty('--bg-sup', 'black');
		supText.style.setProperty('--hover-sup', '#53767488');
		signingUp = false;
	}
}

function Login(props) {
	useEffect(() => {
		const supInput = document.querySelector('.sup-input');
		supInput.addEventListener('change', () => {
			checkSUP();
		});
	}, []);

	return (
		<div className="login">
			<div id="nombreUsuario">
				<p>Nombre de Usuario: </p>
				<input className="userName" type="text"></input>
				<button onClick={submitUserName}>Enter</button>
			</div>
			<div id="signup">
				<p id="miniText">No tienes cuenta? </p>
				<label className="sup-checkbox">
					<input type="checkbox" className="sup-input" />
					<span id="sup-text">Signing Up</span>
				</label>
			</div>
		</div>
	);
}

export { Login, userNameGlobal, hide };
