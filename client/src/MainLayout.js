import React, { Component } from 'react';

import logo from './movie.ico';
import './MainLayout.css';

class MainLayout extends Component {

  render() {
    return (
      <div className="MainLayout">
        <div className="MainLayout__header">
          <img src={logo} className="MainLayout__logo" alt="logo" />
          <h1 className="MainLayout__Text">Moviezzz</h1>
        </div>

        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default MainLayout;
