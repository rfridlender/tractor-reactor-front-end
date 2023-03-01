import { NavLink } from 'react-router-dom'
import { User, Profile } from '../../types/models'

import styles from './NavBar.module.scss'
import logo from '../../assets/icons/logo.png'
import defaultProfile from '../../assets/icons/profile.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus, faSignOut } from '@fortawesome/free-solid-svg-icons'

interface NavBarProps {
  user: User | null;
  profile: Profile | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, profile, handleLogout } = props
  
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
            <NavLink to="/"><FontAwesomeIcon icon={faHome} /></NavLink>
            <NavLink to="/posts/new"><FontAwesomeIcon icon={faPlus} /></NavLink>
            <NavLink to="/change-password"><img src={profile?.photo ?? defaultProfile} alt={user.name} /></NavLink>
            <NavLink to="" onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} /></NavLink>
          </div>
        :
          <div id={styles.subnav}>
            <NavLink className={styles.noUser} to="/login">LOGIN</NavLink>
            <NavLink className={styles.noUser} to="/signup">SIGN UP</NavLink>
          </div>
        }
      </div>
    </nav>
  )
}

export default NavBar
