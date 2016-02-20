/**
 *
 */
import React, {Component, PropTypes, Children, cloneElement} from 'react';
import pureRender from 'pure-render-decorator';
import classNames from 'classnames';
import {uniqueId} from 'lodash';
import percentage from '../utils/percentage';



/**
 *
 */
function makeDefaultText({min, max, value}) {
	const progress = Math.round(percentage(value, max, min));
	return `${progress}%`;
}

/**
 *
 */
function makeDefaultStyle({min, max, value, orientation}) {
	const progress = percentage(value, max, min);
	const property = (orientation === 'horizontal')
		? 'width'
		: 'height';

	return {
		[property]: `${progress}%`
	};
}



/**
 *
 */
@pureRender
export default class ProgressBar extends Component {

	/**
	 *
	 */
	static propTypes = {
		orientation: PropTypes.string,
		min: PropTypes.number,
		max: PropTypes.number,
		value: PropTypes.number,
		makeText: PropTypes.func,
		makeStyle: PropTypes.func,
		children: PropTypes.element
	};

	/**
	 *
	 */
	static defaultProps = {
		orientation: 'horizontal',
		min: 0,
		max: 100,
		value: 0,
		makeText: makeDefaultText,
		makeStyle: makeDefaultStyle
	};

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.id = uniqueId('rea11y-');
	}

	/**
	 *
	 */
	renderTarget() {
		try {
			const target = Children.only(this.props.children);

			return cloneElement(target, {
				...this.props,
				progressBarId: this.id
			});
		} catch (e) {
			return undefined;
		}
	}

	/**
	 *
	 */
	render() {
		const {min, max, value, makeText, makeStyle} = this.props;

		const text = makeText(this.props);
		const style = makeStyle(this.props);

		const className = classNames([
			'rea11y-progress-bar',
			`rea11y-progress-bar-${this.props.orientation}`
		]);

		return (
			<div
				id={this.id}
				className={className}
				role="progressbar"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				aria-valuetext={text}
			>
				<div className="rea11y-progress-bar-track">
					<div
						className="rea11y-progress-bar-value"
						style={style}
					/>
				</div>

				<div className="rea11y-progress-bar-text">
					{text}
				</div>

				{this.renderTarget()}
			</div>
		);
	}
}
