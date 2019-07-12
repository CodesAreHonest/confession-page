import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Background from "../../UI/background";
import { loading, success, error, confirmation } from '../../UI/sweetalert2';

import { postSubmitConfession } from "../../../state/ducks/confession/actions";

import "./confessor.css";
import "./button.css";
import URLInput from "../../UI/input/URLInput";

class Confession extends Component {
    constructor(props) {
        super (props);

        this.state = {
            confession: '',
            displayURLInput: false,
            url: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({confession: e.target.value});
    }

    async onSubmit(e) {
        e.preventDefault();

        let form = document.getElementById('confession-form');

        if (!form.checkValidity()) {
            return false;
        }

        e.target.blur();

        let confirmSubmit = await confirmation('Are you sure?', 'Confession submitted cannot be reverted');

        if (!confirmSubmit) { return false; }

        const { confession } = this.state;
        this.props.postSubmitConfession (confession);

        let confessionDOM = document.getElementById("confession");
        confessionDOM.focus();

        loading('Submitting ... ')

    }

    componentWillReceiveProps (nextProps) {

        if (this.props.response !== nextProps.response) {
            const { response_code } = nextProps.response;

            if (response_code !== 200) {
                const { response_detail } = nextProps.response;
                error ('Your confession submitted unsuccessful', response_detail[0]);
            }
            else {
                success('Success', 'Your confession submitted successfully.');
            }

            this.setState({confession: ''});

        }
    }

    render() {

        const { confession, displayURLInput, url } = this.state;

        return (
            <div>
                <Background />

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 mt-md-5 mt-sm-3 ">
                            <div className="form">
                                <div className="form-header text-center">
                                    Asia Pacific University Confessions
                                </div>

                                <hr />

                                <form id="confession-form" onSubmit={this.onSubmit}>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="text-md-left text-sm-center text-center mb-2 mb-sm-2">
                                                <small>Your confession will be posted anonymously.</small>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="text-right">

                                                <div className="button-upload" style={{
                                                    minWidth: 'auto', display: 'inline-block'
                                                }}>
                                                    <button type="button" className="btn btn-sm button-utility"
                                                            style={{
                                                                borderRight: '1px solid lightblue',
                                                            }}>
                                                        <i className="fa fa-image" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm button-utility"
                                                        onClick={() => this.setState({displayURLInput: !this.state.displayURLInput})}
                                                    >
                                                        <i className="fa fa-link" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <textarea
                                        id="confession"
                                        className="form-control text-area"
                                        placeholder="Confess Here ..."
                                        onChange={this.onChange}
                                        value={confession}
                                        spellCheck
                                        required
                                    />

                                    { displayURLInput &&
                                    <div className="mt-1">
                                        <URLInput
                                            placeholder="https://sample.image.com"
                                            className="button-upload"
                                            value={url}
                                            onChange={e => this.setState({url: e.target.value})}
                                        />
                                    </div>
                                    }

                                    <div className="row">
                                        <div className="col-md-4 offset-md-4 text-left mt-2">
                                            <button className="btn button btn-primary btn-block pointer-cursor"
                                                    type="submit"
                                                    disabled={confession.length <= 10}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    response: state.confession.submit_confession_response
});

const mapDispatchToProps = {
    postSubmitConfession
};

export default connect(mapStateToProps, mapDispatchToProps)(Confession);

Confession.propTypes = {
    postSubmitConfession: PropTypes.func.isRequired,
    response: PropTypes.object.isRequired
};