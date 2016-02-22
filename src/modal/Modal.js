/**
 *
 */
import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import {ESCAPE} from 'offkey';
import {noop} from 'lodash';
import offset from 'dom-helpers/query/offset';
import FocusTrap from './FocusTrap';



/**
 *
 */
function makeDefaultStyle(modal, backdrop) {
	const modalRect = offset(modal);
	const backdropRect = offset(backdrop);
	const margin = (backdropRect.height - modalRect.height) / 2;

	return {
		marginTop: `${margin}px`
	};
}



/**
 *
 */
@pureRender
export default class Modal extends Component {

	/**
	 *
	 */
	static propTypes = {
		role: PropTypes.oneOf([
			'dialog',
			'alertdialog'
		]),
		label: PropTypes.string,
		labelId: PropTypes.string,
		makeStyle: PropTypes.func,
		onClose: PropTypes.func,
		children: PropTypes.any.isRequired
	};

	/**
	 *
	 */
	static defaultProps = {
		role: 'dialog',
		label: '',
		labelId: '',
		makeStyle: makeDefaultStyle,
		onClose: noop
	};

	/**
	 *
	 */
	componentDidMount() {
		this.updateStyle();
	}

	/**
	 *
	 */
	componentDidUpdate() {
		this.updateStyle();
	}

	/**
	 *
	 */
	updateStyle() {
		const {modal, backdrop} = this.refs;

		Object.assign(
			modal.style,
			this.props.makeStyle(
				findDOMNode(modal),
				findDOMNode(backdrop)
			)
		);
	}

	/**
	 *
	 */
	@autoBind
	handleKeyDown(event) {
		if (event.keyCode === ESCAPE) {
			this.props.onClose();
		}
	}

	/**
	 *
	 */
	render() {
		const {role, label, labelId, children} = this.props;

		const props = {
			role,
			tabIndex: 0,
			ref: 'backdrop',
			className: 'rea11y-modal-backdrop',
			onKeyDown: this.handleKeyDown
		};

		if (labelId) {
			props['aria-labelledby'] = labelId;
		} else if (label) {
			props['aria-label'] = label;
		}

		return (
			<FocusTrap>
				<div {...props}>
					<div className="rea11y-modal" ref="modal">
						{children}
					</div>
				</div>
			</FocusTrap>
		);
	}
}