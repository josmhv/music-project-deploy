import React from 'react';

class Links extends React.Component {
	render() {
		return (
			<li className="links nav__item" id={this.props.id}>
				{this.props.texto}
			</li>
		);
	}
}

export default Links;
