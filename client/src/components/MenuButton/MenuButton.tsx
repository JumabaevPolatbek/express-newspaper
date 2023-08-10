import React from 'react';
import './menubtn.css';
const MenuButton = () => {
	return (
		<div id='menuToggle'>
			<input
				id='checkbox'
				type='checkbox'
			/>
			<label
				class='toggle'
				for='checkbox'
			>
				<div class='bar bar--top'></div>
				<div class='bar bar--middle'></div>
				<div class='bar bar--bottom'></div>
			</label>
		</div>
	);
};

export default MenuButton;
