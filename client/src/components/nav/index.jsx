import React from 'react';
import MaterialIcon from 'material-icons-react';
import PropTypes from 'prop-types';
import axios from 'axios';

import GoogleLogin from './GoogleLogin';
import ShareModal from './ShareModal';
import DeleteModal from './DeleteModal';
import { deleteNote } from '../../util/noteHelpers';
import logo from '../../assets/pigeon-logo.svg';

class Nav extends React.Component {
  static propTypes = {
    userData: PropTypes.object,
  }

  static defaultProps = {
    userData: {}
  }

  NavItem = (icon, tooltip, modalName) => (
    <li className="nav-item">
      <div data-toggle="modal" data-target={`#${modalName}`}>
        <span 
          className="nav-link"
          data-toggle="tooltip"
          data-placement="bottom"
          title={tooltip}
        >
          <MaterialIcon icon={icon} />
        </span>
      </div>
    </li>
  )

  LoginButton = () => {
    const { userData, setUserData } = this.props;

    return (
      <li className="nav-item">
        <div>
          { userData.email
              ? (<img src={userData.image} />)
              : (<GoogleLogin setUserData={setUserData} />)
          }
        </div>
      </li>
    )
  }

  render() {
    const { userData } = this.props;

    return (
      <div>
        { !userData.email && (
          <div className="alert alert-warning" role="alert">
            Sign in to start saving notes, it'll only take a second!
          </div>
        )}
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="Pigeon" />
            </a>
            <div className="mr-auto" />
            <ul className="navbar-nav">
              { this.NavItem('share', 'Share note', 'shareModal') }
              { this.NavItem('delete', 'Delete note', 'deleteModal') }
              { this.LoginButton() }
            </ul>
          </div>
        </nav>
        <ShareModal updateNotes={this.props.updateNotes} />
        <DeleteModal handleClick={this.props.delete} />
      </div>
    );
  }
}

export default Nav;