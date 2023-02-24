import { NavLink } from 'react-router-dom'

import { Post } from '../../types/models'

import styles from './SideBar.module.scss'

export interface SideBarProps {
  posts?: Post[];
}

const SideBar = (props: SideBarProps): JSX.Element => {
  const { posts } = props
  
  return (
    <aside className={styles.container}>
      {posts?.map((post: Post)=> (
        <div key={post.id}>{post.variety}</div>
      ))}
    </aside>
  )
}

export default SideBar
