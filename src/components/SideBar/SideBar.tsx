import { NavLink } from 'react-router-dom'

import { Post, User } from '../../types/models'

import styles from './SideBar.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons'

import PostPreviewCard from '../PostPreviewCard/PostPreviewCard'

export interface SideBarProps {
  posts?: Post[];
  user?: User | null;
  scrollPostIntoView?: (postId: number) => void;
}

const SideBar = (props: SideBarProps): JSX.Element => {
  const { posts, user, scrollPostIntoView } = props
  
  if (posts && scrollPostIntoView) {
    return (
      <aside className={styles.landingContainer}>
        <div id={styles.search}>
          <label htmlFor="search"><FontAwesomeIcon icon={faMagnifyingGlass} /></label>
          <input type="search" id="search" placeholder="Search by author..." autoComplete="off" />
        </div>
        <h1>Posts</h1>
        {posts?.map((post: Post)=> (
          <PostPreviewCard key={post.id} post={post} user={user} scrollPostIntoView={scrollPostIntoView} />
        ))}
      </aside>
    )
  } else {
    return (
      <aside className={styles.loginContainer}>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, ipsam. Dicta beatae recusandae asperiores voluptatibus, similique tempore nobis veritatis nemo! Dolores et assumenda quas sunt atque quo iure praesentium facere?</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, ipsam. Dicta beatae recusandae asperiores voluptatibus, similique tempore nobis veritatis nemo! Dolores et assumenda quas sunt atque quo iure praesentium facere?</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, ipsam. Dicta beatae recusandae asperiores voluptatibus, similique tempore nobis veritatis nemo! Dolores et assumenda quas sunt atque quo iure praesentium facere?</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, ipsam. Dicta beatae recusandae asperiores voluptatibus, similique tempore nobis veritatis nemo! Dolores et assumenda quas sunt atque quo iure praesentium facere?</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, ipsam. Dicta beatae recusandae asperiores voluptatibus, similique tempore nobis veritatis nemo! Dolores et assumenda quas sunt atque quo iure praesentium facere?</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, ipsam. Dicta beatae recusandae asperiores voluptatibus, similique tempore nobis veritatis nemo! Dolores et assumenda quas sunt atque quo iure praesentium facere?</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, ipsam. Dicta beatae recusandae asperiores voluptatibus, similique tempore nobis veritatis nemo! Dolores et assumenda quas sunt atque quo iure praesentium facere?</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, ipsam. Dicta beatae recusandae asperiores voluptatibus, similique tempore nobis veritatis nemo! Dolores et assumenda quas sunt atque quo iure praesentium facere?</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, ipsam. Dicta beatae recusandae asperiores voluptatibus, similique tempore nobis veritatis nemo! Dolores et assumenda quas sunt atque quo iure praesentium facere?</p>
      </aside>
    )
  }
}

export default SideBar
