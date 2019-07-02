import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {isToday, twelveHoursClock, standardDateTimeFormat} from "../../../../helpers/time";
import "../ListGroupItem.css";

class RejectedListGroupItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            show: false,
        };

        this._onClick = this._onClick.bind(this);
        this._updateTime = this._updateTime.bind(this);

    }

    componentDidMount() {
        this._updateTime();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.time !== this.props.time) {
            this._updateTime();
        }
    }

    _onClick() {
        this.setState({show: !this.state.show});
    }

    _updateTime() {

        let date = standardDateTimeFormat(this.props.time);
        this.setState({date});
    }

    render() {
        const {text, action_by, tags} = this.props;
        const {date, show} = this.state;

        const fullMessage = show ? 'show' : '';
        const shortMessage = show ? 'd-none' : '';
        const chevronIcon = show ? 'down': 'up';
        const active = show ? 'active' : '';

        return (
            <li style={{padding: '5px 15px', borderBottom: '1px solid #e4e2e2', listStyleType: 'none', cursor: 'pointer'}}
                className={`confession-content ${active}`}
            >
                <div className="row">
                    <div className="col-md-2 col-sm-6 col-6 order-md-1 order-sm-1 order-1">
                        <div style={{fontWeight: 'bold'}}>{tags}</div>

                        <div className={`collapse ${fullMessage} text-left`}>
                            <small><b>{ action_by }</b></small>
                        </div>
                    </div>
                    <div className="col-md-7 col-sm-12 col-12 order-md-2 order-sm-3 order-3" style={{color: '#000000c7'}}
                         onClick={this._onClick}
                    >
                        <div className={`confession-text ${shortMessage}`}>
                            { text }
                        </div>

                        <div className={`collapse ${fullMessage}`}>
                            { text }
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6 col-6 order-md-3 order-sm-2 order-2 text-right"
                         onClick={this._onClick}
                    >
                        <i className={`fa fa-chevron-${chevronIcon}`} style={{marginRight: '10px'}}/>
                        <span style={{fontWeight: 'bold'}}>{ date }</span>
                    </div>
                </div>

            </li>
        )
    }
}


export default RejectedListGroupItem;

RejectedListGroupItem.propTypes = {
    action_by: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    id:   PropTypes.string.isRequired,
};

RejectedListGroupItem.defaultProps = {
    text: '',
    time: ''
};