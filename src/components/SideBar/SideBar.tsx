import { NavLink } from 'react-router-dom'

import { Post, User } from '../../types/models'

import styles from './SideBar.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons'

import PostPreviewCard from '../PostPreviewCard/PostPreviewCard'

export interface SideBarProps {
  posts?: Post[];
  user?: User | null;
}

const SideBar = (props: SideBarProps): JSX.Element => {
  const { posts, user } = props
  
  return (
    <aside className={styles.container}>
      <div id={styles.search}>
        <label htmlFor="search"><FontAwesomeIcon icon={faMagnifyingGlass} /></label>
        <input type="search" id="search" placeholder="Search by author..." />
      </div>
      <h1>Posts</h1>
      {posts?.map((post: Post)=> (
        <PostPreviewCard key={post.id} post={post} user={user} />
      ))}
    </aside>
  )
}

export default SideBar
