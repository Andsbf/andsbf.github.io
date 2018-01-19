import React, { Component } from 'react';
import axios from 'axios';
import 'whatwg-fetch'
import './App.css';
import userJpg from './images/user.jpg'
import wheat from './images/wheat.png'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      pending: false
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ time: Date.now() })
      if(!this.state.pending) this.fetchData()
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchData() {
    const address = window.location.href.split('?q=')[1]
    this.setState({  pending: true });

    fetch(`http://${address}:80`,  { method: "GET"})
      .then(res => res.json())
      .then(res => {
                            this.setState({ data: res.data, pending: false });
                          });
  }
  render() {


    return (
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Home</span>
            <div className="mdl-layout-spacer"></div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
              <label className="mdl-button mdl-js-button mdl-button--icon" for="search">
                <i className="material-icons">search</i>
              </label>
              <div className="mdl-textfield__expandable-holder">
                <input className="mdl-textfield__input" type="text" id="search"/>
                  <label className="mdl-textfield__label" for="search">Enter your query...</label>
              </div>
            </div>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
              <i className="material-icons">more_vert</i>
            </button>
            <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
              <li className="mdl-menu__item">About</li>
              <li className="mdl-menu__item">Contact</li>
              <li className="mdl-menu__item">Legal information</li>
            </ul>
          </div>
        </header>
        <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
          <header className="demo-drawer-header">
            <img src={userJpg} className="demo-avatar"/>
            <div className="demo-avatar-dropdown">
              <span>hello@example.com</span>
              <div className="mdl-layout-spacer"></div>
              <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                <i className="material-icons" role="presentation">arrow_drop_down</i>
                <span className="visuallyhidden">Accounts</span>
              </button>
              <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
                <li className="mdl-menu__item">hello@example.com</li>
                <li className="mdl-menu__item">info@example.com</li>
                <li className="mdl-menu__item"><i className="material-icons">add</i>Add another account...</li>
              </ul>
            </div>
          </header>
          <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</a>
            <div className="mdl-layout-spacer"></div>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span className="visuallyhidden">Help</span></a>
          </nav>
        </div>
        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="mdl-grid demo-content">
            {this.state.data &&
             <div className=" mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid">
               <div style={{ textAlign: 'center', paddingRight: '10px' }}>
                 <img style={{ width: '36px', height: '36px' }} src={wheat} className="demo-avatar"/>
                 <p>Wheat</p>
               </div>
               <progress value={parseInt(this.state.data)} max="1000"></progress>
               <div style={{padding: '20px 0 0 20px'}}>
                 {this.state.data} grams
               </div>
             </div>
            }
          </div>
        </main>
      </div>
    );
  }
}

export default App;
