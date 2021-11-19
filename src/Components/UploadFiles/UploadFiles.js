import React from 'react';
import ReactPlayer from 'react-player/youtube';
import './UploadFiles.css';

let root = document.documentElement;
let html = '';
let showLstDReptext;
let urlArr = [
	'https://www.youtube.com/watch?v=dI0B87vSl9Y',
	'https://www.youtube.com/watch?v=3K7E8npAkjc',
];

class UploadFiles extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			html: '',
			value: 'Introduce el link de tu cancion',
		};
	}

	async inputBtnOnClick(e) {
		// Renderizar y actualizar el contido del html despues del div original
		const urlInput = document.querySelector('.urlInput');
		const isPlayable = ReactPlayer.canPlay(urlInput.value);
		if (!isPlayable) {
			this.renderError('URL no válida.');
		} else {
			this.handleClick(e, urlInput.value);
		}
	}

	handleClick(e, value) {
		this.changeOutPutLog('green', 'Hecho!');

		urlArr.push(value);

		showLstDReptext = true;

		ReactPlayer.url = urlArr;
	}

	handleDelClick(e) {
		urlArr.splice(+e.target.getAttribute('data-key'), 1);
		this.changeOutPutLog('gray', 'Borrado');

		if (urlArr.length < 1) {
			showLstDReptext = false;
			this.changeOutPutLog('red', 'Playlist Borrada');
		} else showLstDReptext = true;
	}
	handleClearPlaylist(e) {
		this.changeOutPutLog('red', 'Playlist Borrada');
		showLstDReptext = false;

		urlArr = [];
	}
	changeOutPutLog(color, text) {
		root.style.setProperty('--output-color', color);
		this.setState({ html: `${text}<br />` });
		setTimeout(() => {
			this.setState({ html: `<br />` });
		}, 5 * 1000);
	}

	handleChange(e) {
		// Funcion ajuro para que el .value funcione
		this.setState({ value: e.target.value });
	}

	urlInputOnKeyDown(e) {
		// Funciones al presionar teclas
		if (e.key === 'Enter') {
			// Funciones al presionar Enter
			this.inputBtnOnClick(e);
			this.clearInputs(e);
		}
	}

	clearInputs(e) {
		// Limpiar los contenedores de texto
		this.setState({ value: '' });
	}

	renderError(mensaje) {
		this.changeOutPutLog('red', mensaje);
	}

	render() {
		return (
			<div className="uploadFiles hidden">
				<br />
				<p>Enlace de canción/playlist para añadir a la cola:</p>
				<input
					className="urlInput"
					type="url"
					onKeyDown={this.urlInputOnKeyDown.bind(this)}
					onFocus={this.clearInputs.bind(this)}
					onChange={this.handleChange.bind(this)}
					value={this.state.value}
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
							Borrar playlist
						</button>
					</div>
				)}
				<ul className="songsList">
					{urlArr.map((url, i) => (
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
				<br />
				<hr />
			</div>
		);
	}
}

export { UploadFiles, urlArr };
