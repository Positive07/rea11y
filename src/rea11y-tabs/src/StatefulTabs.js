/**
 *
 */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import noop from 'no-op';
import Tabs from './Tabs';



/**
 *
 */
@pureRender
export default class StatefulTabs extends Component {

	/**
	 *
	 */
	static propTypes = {
		defaultActive: PropTypes.string,
		onActive: PropTypes.func
	}

	/**
	 *
	 */
	static defaultProps = {
		onActive: noop
	}

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.state = {
			active: this.props.defaultActive
		};
	}

	/**
	 *
	 */
	handleActive(name) {
		this.setState({
			active: name
		}, () => {
			this.props.onActive(name);
		});
	}

	/**
	 *
	 */
	render() {
		return (
			<Tabs
				{...this.props}
				active={this.state.active}
				onActive={::this.handleActive}
			>
				{this.props.children}
			</Tabs>
		);
	}
}
