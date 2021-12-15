import React from 'react';
import ReactPlayer from 'react-player/youtube';
import $ from 'jquery';
import { postData, getData, urlArrDB } from '../APIConnect';
import './UploadFiles.css';
import search from '../Search';

let root = document.documentElement;
let html = '';
let showLstDReptext;
let urlArr = [];

class UploadFiles extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			html: '',
			value1: 'https://www.youtube.com/watch?v=fDWpSQYmZqM',
			value2: '',
			urlArr: [],
			urlTitles: [],
		};
	}

	async inputBtnOnClick(e) {
		// Renderizar y actualizar el contido del html despues del div original
		const urlInput = document.querySelector('.urlInput').value;
		const { title, id } = await search(urlInput);
		const urlParsed = `youtu.be/${id}`;
		const isPlayable = ReactPlayer.canPlay(urlParsed);
		if (!isPlayable) {
			this.renderError('Texto no válido.');
		} else {
			this.handleClick(e, urlParsed);
			// this.state.urlTitles.push(title);
			this.setState({ urlTitles: [...this.state.urlTitles, title] });
		}
	}

	handleClick(e, value) {
		$('.playMusic').removeClass('hidden');
		this.changeOutPutLog('green', 'Hecho!');

		this.state.urlArr.push(value);
		urlArr.push(value);

		showLstDReptext = true;
	}

	handleDelClick(e) {
		this.state.urlArr.splice(+e.target.getAttribute('data-key'), 1);
		this.state.urlTitles.splice(+e.target.getAttribute('data-key'), 1);
		urlArr.splice(+e.target.getAttribute('data-key'), 1);
		this.changeOutPutLog('gray', 'Borrado');

		if (this.state.urlArr.length < 1) {
			$('.playMusic').addClass('hidden');
			showLstDReptext = false;
			this.changeOutPutLog('red', 'Playlist Borrada');
		} else showLstDReptext = true;
	}
	handleClearPlaylist(e) {
		$('.playMusic').addClass('hidden');
		this.changeOutPutLog('red', 'Playlist Borrada');
		showLstDReptext = false;

		this.setState({ urlArr: [] });
		this.setState({ urlTitles: [] });

		urlArr = [];
	}
	changeOutPutLog(color, text) {
		root.style.setProperty('--output-color', color);
		this.setState({ html: (html = `${text}<br />`) });
		setTimeout(() => {
			this.setState({ html: (html = `<br />`) });
		}, 5 * 1000);
	}

	handleChange(e) {
		// Funcion ajuro para que el .value funcione
		this.setState({ value1: e.target.value });
	}
	handleChangeSave(e) {
		this.setState({ value2: e.target.value });
	}

	urlInputOnKeyDown(e) {
		// Funciones al presionar teclas
		if (e.key === 'Enter') {
			// Funciones al presionar Enter
			this.inputBtnOnClick(e);
			this.clearInputs(e);
		}
	}

	async GETdata() {
		await getData();
		if (!urlArrDB) return;
		this.setState({ urlArr: urlArrDB });
		this.setState({ urlTitles: urlArr });
		urlArr = urlArrDB;
		// this.changeOutPutLog('green', 'Playlist Guardada!');
	}

	async POSTdata(e) {
		if (urlArr.length < 1) return;
		let playlistData = {
			urls: urlArr,
			userName: 'Jose',
			PLName: document.querySelector('.savePlaylistInput').value,
		};
		postData(playlistData);
		this.changeOutPutLog('green', 'Playlist Guardada!');
		this.clearInputs(e);
	}

	saveHandleKeyDown(e) {
		if (e.key === 'Enter') {
			// Funciones al presionar Enter
			this.POSTdata(e);
		}
	}

	clearInputs(e) {
		// Limpiar los contenedores de texto
		this.setState({ value1: '', value2: '' });
	}

	renderError(mensaje) {
		this.changeOutPutLog('red', mensaje);
	}

	render() {
		return (
			<div className="uploadFiles ">
				<p className="p1">Canción/playlist para añadir a la cola:</p>
				<input
					className="urlInput"
					type="url"
					onKeyDown={this.urlInputOnKeyDown.bind(this)}
					onFocus={this.clearInputs.bind(this)}
					onChange={this.handleChange.bind(this)}
					value={this.state.value1}
				/>
				<button className="inputBtn" onClick={this.inputBtnOnClick.bind(this)}>
					Añadir
				</button>
				<div className="outPutUrl" dangerouslySetInnerHTML={{ __html: html }}></div>
				<br />
				{showLstDReptext && (
					<div>
						Lista de reproducción
						<button className="delPLButton" onClick={this.handleClearPlaylist.bind(this)}>
							Borrar Playlist
						</button>
					</div>
				)}
				<ul className="songsList">
					{this.state.urlTitles.map((url, i) => (
						<li className="songUrl" key={i} data-key={i}>
							{url}{' '}
							<button
								className="delSong"
								key={i}
								data-key={i}
								onClick={this.handleDelClick.bind(this)}
							>
								Eliminar{' '}
							</button>
						</li>
					))}
				</ul>
				<div className="apiGUI hidden">
					<div>
						Guardar Playlist con nombre:
						<input
							className="savePlaylistInput"
							type="text"
							value={this.state.value2}
							onChange={this.handleChangeSave.bind(this)}
							onFocus={this.clearInputs.bind(this)}
							onKeyDown={this.saveHandleKeyDown.bind(this)}
						/>
						<button className="savePlaylist" onClick={this.POSTdata.bind(this)}>
							Guardar
						</button>
					</div>
					<div>
						Obtener Playlist por nombre:
						<input type="text" className="getPlaylistInput" />
						<button className="getPlaylist" onClick={this.GETdata.bind(this)}>
							Obtener
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export { UploadFiles, urlArr };
