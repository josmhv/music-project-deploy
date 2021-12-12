import { hide } from './Login/Login';
// PlayList
async function postData(playlistData, url = 'http://localhost:9000/songs') {
	// POST data
	const { urls, userName, PLName } = playlistData;
	await fetch(url, {
		method: 'POST',
		body: JSON.stringify({
			urls: urls,
			userName: userName,
			PLName: PLName,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.catch((err) => console.error('Error: ', err));
}

let urlArrDB = '';
async function getData(url = 'http://localhost:9000/songs') {
	// GET data
	await fetch(url)
		.then((res) => res.json())
		.then((res) => {
			urlArrDB = res.urls;
		})
		.catch((err) => {
			new Error(err);
		});
}

// UserName
let routeUN = 'http://localhost:9000/users';
async function postUserName(userNameData, url = routeUN) {
	try {
		await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				userName: userNameData,
			}),
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err) {
		console.error('Error: ', err);
	}
}

let userNameList = [];
let unlCopy = [];
async function getUserName(url = routeUN) {
	try {
		const res = await fetch(url);
		const data = await res.json();
		await data.forEach((element) => {
			unlCopy.push(element.userName);
		});
		userNameList = [...new Set(unlCopy)];
	} catch (err) {
		console.error(`Error: ${err}`);
		alert('API no activa, no sera posible acceder a sus playlists almacenadas en la nube');
		hide();
	}
}

export { postData, getData, postUserName, getUserName };
export { urlArrDB, userNameList };
