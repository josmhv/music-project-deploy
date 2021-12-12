import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import './PlayMusic.scss';
import { urlArr } from '../UploadFiles/UploadFiles';
import $ from 'jquery';

function button(onClick, text, source) {
	return (
		<button onClick={onClick} className={text}>
			{text}
		</button>
	);
}
function PlayMusic(props) {
	let [url, setUrl] = useState(null);
	let [playing, setPlaying] = useState(true);

	async function play(e) {
		if (urlArr.length < 1) return;

		await setUrl(urlArr);
		await setPlaying(true);
	}

	function pause() {
		setPlaying(false);
	}

	function stop() {
		setUrl(null);
		setPlaying(false);
	}

	async function reload() {
		await setUrl(null);

		if (urlArr.length < 1) return;

		setUrl(urlArr);
	}

	useEffect(() => {
		const [uploadFiles] = $('.uploadFiles');
		uploadFiles.addEventListener('click', (e) => {
			setTimeout(() => {
				if (
					e.target.className === 'inputBtn' ||
					e.target.className === 'delPLButton' ||
					e.target.className === 'delSong'
				) {
					reload();
				}
			}, 20);
		});
	}, []);

	return (
		<div className="playMusic hidden">
			<ReactPlayer
				className="react-player"
				url={url}
				height="400px"
				width="500px"
				playing={playing}
			/>
			{button(play, 'play')}
			{button(pause, 'pause')}
			{button(stop, 'stop')}
		</div>
	);
}

export default PlayMusic;
