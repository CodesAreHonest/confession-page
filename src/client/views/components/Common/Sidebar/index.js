import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./sidebar.css";

class Sidebar extends Component {
    constructor(props) {
        super (props);
    }

    render() {
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading text-center">
                    APUCP
                </div>
                <div className="list-group list-group-flush">
                    {/*<Link to="/admin/dashboard" className="list-group-item list-group-item-action bg-light">*/}
                    {/*    Dashboard*/}
                    {/*</Link>*/}
                    <Link to="/admin/pending/confessions" className="list-group-item list-group-item-action bg-light">
                        Pending Confession
                    </Link>
                    <Link to="/admin/approved/confessions" className="list-group-item list-group-item-action bg-light">
                        Approved Confession
                    </Link>
                    <Link to="/admin/rejected/confessions" className="list-group-item list-group-item-action bg-light">
                        Rejected Confession
                    </Link>
                </div>
            </div>
        )
    }
}

export default Sidebar;