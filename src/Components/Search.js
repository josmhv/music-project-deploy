async function search(searchValue) {
	try {
		var url = new URL('https://www.googleapis.com/youtube/v3/search');

		var params = {
			key: 'AIzaSyC8YYP-9xK-D8XT4rtxX9OxcIxVBcPd-Lo',
			q: searchValue,
			part: 'snippet',
			maxResults: 1,
			type: 'video',
		};

		url.search = new URLSearchParams(params).toString();

		const res = await fetch(url);
		const data = await res.json();
		const { items } = data;
		const [video] = items;
		return {
			title: video.snippet.title,
			id: video.id.videoId,
		};
	} catch (err) {
		return {
			title: searchValue,
			id: searchValue,
		};
	}
}
// const urlInput = document.querySelector('.urlInput').value;
// 		const { title, id } = await search(urlInput);
// 		console.log(title, id);
// 		this.state.urlTitles.push(title);
// 		const urlParsed = `youtu.be/${id}`;

export default search;
