import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import './PlayMusic.css';
import { urlArr } from '../UploadFiles/UploadFiles';
import $ from 'jquery';

function button(onClick, text) {
	return <button onClick={onClick}>{text}</button>;
}

function PlayMusic(props) {
	let [url, setUrl] = useState(null);
	let [playing, setPlaying] = useState(true);

	async function play(e) {
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
		setPlaying(true);
	}

	$([urlArr]).on('arrayChange', handleArrayChange);
	function handleArrayChange() {
		console.log('hola');
	}

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
			{button(reload, 'reload')}
			<br />
			<br />
			<hr />
		</div>
	);
}

export default PlayMusic;
