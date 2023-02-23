import { NavLink } from 'react-router-dom'

import { User, Post } from '../../types/models'

import styles from './SideBar.module.scss'

const SideBar = (): JSX.Element => {
  
  return (
    <aside className={styles.container}>
      SIDEBAR HERE
    </aside>
  )
}

export default SideBar
