import { NavLink } from 'react-router-dom'

import { User } from '../../types/models'

import styles from './NavBar.module.scss'

import logo from '../../assets/icons/logo.png'

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
            <div><NavLink to="/">Welcome, {user.name}</NavLink></div>
            <div><NavLink to="/posts">Posts</NavLink></div>
            <div><NavLink to="/profiles">Profiles</NavLink></div>
            <div><NavLink to="" onClick={handleLogout}>Log Out</NavLink></div>
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
