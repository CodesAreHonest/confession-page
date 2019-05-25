import React, {Component} from "react";

import FacebookLogin from '../../../components/facebook';

import "./index.css";

class AdminLogin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-6">
                        <div className="layout">
                            <FacebookLogin />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminLogin;