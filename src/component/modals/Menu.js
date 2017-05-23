import enhanceWithClickOutside from 'react-click-outside';
import React, { Component } from 'react';
import { Link } from 'react-router';
//import onClickOutside from 'react-onclickoutside';
import auth from '../../auth';
import api from '../../api';
import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpened: false
      }
    }

    _handleClickOutside = () => {
    this.setState({ isOpened: true });
    }

    render() {
    let { closeMenu, show } = this.props;

    return (
      <div className={`menu ${show?"show":""}`}>

        <div className="menu__list">

          <Link to="/" className="menu__item" onClick={closeMenu}>
            Home
          </Link>

        </div>

      </div>
    );
  }
}
 // menu component

export default enhanceWithClickOutside(Menu);
