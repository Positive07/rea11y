import {configure, setAddon} from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

import '../css/Field.css';
import '../css/NumberInput.css';
import '../css/Modal.css';
import '../css/ProgressBar.css';
import '../css/Slider.css';
import '../css/Tab.css';
import '../css/TabPanel.css';
import '../css/Tabs.css';



/**
 *
 */
setAddon(infoAddon);

/**
 *
 */
configure(() => {
	const req = require.context('../stories', true, /\.js$/);
	req.keys().forEach(req);
}, module);
