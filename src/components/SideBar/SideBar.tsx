import { NavLink } from 'react-router-dom'

import { User, Post } from '../../types/models'

import styles from './SideBar.module.scss'

interface SideBarProps {
  user: User | null;
  posts: Post[];
}

const SideBar = (props: SideBarProps): JSX.Element => {
  const { user, posts } = props
  
  return (
    <nav className={styles.container}>
      
    </nav>
  )
}

export default SideBar
