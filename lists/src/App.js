import React, { Component } from 'react';
import Admin from './admin/Admin.js';

class App extends Component {
    constructor() {
        super();
    }

    goAdmin(e) {
        window.location.href = window.location.href + 'admin';
    }

    /**
     * Renders the component.
     */
    render() {
        return (
            <div className="App">
                <div>
                    <button onClick={this.goAdmin.bind(this)}>Admin</button>
                </div>
            </div>
        );
    }

}

export default App;
