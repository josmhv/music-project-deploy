import React from 'react';

async function Test() {
	const res = await fetch('https://www.googleapis.com/youtube/v3');
	const data = res.json();
	console.log(data);
}

const Search = (props) => {
	Test();
	return <div>hola</div>;
};

export default Search;
