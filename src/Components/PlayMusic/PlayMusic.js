import React from 'react';
import ReactPlayer from 'react-player/youtube';
import './PlayMusic.css';
import { urlArr } from '../UploadFiles/UploadFiles';

// let showReactPlayer = false;

class PlayMusic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playing: false,
		};
	}

	play(e) {
		// showReactPlayer = true;
		this.setState({ playing: true });
	}
	pause(e) {
		this.setState({ playing: false });
	}

	render() {
		return (
			<div className="playMusic ">
				<ReactPlayer
					className="react-player"
					url={urlArr}
					height="200px"
					width="300px"
					playing={this.state.playing}
				/>
				<button onClick={this.play.bind(this)}>></button>
				<button onClick={this.pause.bind(this)}>| |</button>
				<hr />
			</div>
		);
	}
}

export default PlayMusic;
