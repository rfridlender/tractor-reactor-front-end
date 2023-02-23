import { NavLink } from 'react-router-dom'

import { User } from '../../types/models'

import styles from './NavBar.module.scss'
import logo from '../../assets/icons/logo.png'
import defaultProfile from '../../assets/icons/profile.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSignOut, faUserGroup } from '@fortawesome/free-solid-svg-icons'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  
  return (
    <nav className={styles.container}>
      <div id={styles.nav}>
          <div id={styles.logo}>
            <NavLink to="/">
              <div>Tractor</div>
              <img src={logo} alt="Tractor Reactor" />
              <div>Reactor</div>
            </NavLink>
          </div>
        {user ?
          <div id={styles.subnav}>
            <div><NavLink to="/"><FontAwesomeIcon icon={faHome} /></NavLink></div>
            <div><NavLink to="/profiles"><FontAwesomeIcon icon={faUserGroup} /></NavLink></div>
            <div><NavLink to="/"><img src={user.profile.photo ? user.profile.photo : defaultProfile} alt="" /></NavLink></div>
            <div><NavLink to="" onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} /></NavLink></div>
          </div>
        :
          <div id={styles.subnav}>
            <div><NavLink to="/login">LOGIN</NavLink></div>
            <div><NavLink to="/signup">SIGN UP</NavLink></div>
          </div>
        }
      </div>
    </nav>
  )
}

export default NavBar
