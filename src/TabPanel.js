import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import classNames from 'classnames';



/**
 *
 */
const TabPanel = ({id, tabId, name, active = false, children}) => {
	const className = classNames({
		'rea11y-TabPanel': true,
		'rea11y-TabPanel--active': active,
		[`rea11y-TabPanel-${name}`]: true
	});

	return (
		<div
			id={id}
			className={className}
			role="tabpanel"
			aria-hidden={!active}
			aria-labelledby={tabId}
			tabIndex={active ? 0 : -1}
		>
			{children}
		</div>
	);
};

TabPanel.propTypes = {
	id: PropTypes.string,
	tabId: PropTypes.string,
	name: PropTypes.string,
	active: PropTypes.bool,
	children: PropTypes.node.isRequired
};


export default pure(TabPanel);
