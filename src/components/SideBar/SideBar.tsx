import { NavLink, useLocation } from 'react-router-dom'

import { Post, User } from '../../types/models'

import styles from './SideBar.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons'

import PostPreviewCard from '../PostPreviewCard/PostPreviewCard'
import { useState } from 'react'

export interface SideBarProps {
  posts?: Post[];
  user?: User | null;
  scrollPostIntoView?: (postId: number) => void;
  search?: string;
  handleSearch?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const SideBar = (props: SideBarProps): JSX.Element => {
  const { posts, user, scrollPostIntoView, search, handleSearch } = props

  const { pathname } = useLocation()

  if (posts && scrollPostIntoView) {
    return (
      <aside className={styles.landingContainer}>
        <div id={styles.search}>
          <label htmlFor="search"><FontAwesomeIcon icon={faMagnifyingGlass} /></label>
          <input type="search" id="search" placeholder="Search by author..." autoComplete="off" onChange={handleSearch} value={search}/>
        </div>
        <h1>Posts</h1>
        {posts?.map((post: Post)=> (
          <PostPreviewCard key={post.id} post={post} user={user} scrollPostIntoView={scrollPostIntoView} />
        ))}
      </aside>
    )
  } else if (pathname === "/login") {
    return (
      <aside className={styles.loginContainer}>
        <header>
          <h2>Welcome back to</h2>
          <h1><span>Tractor Reactor</span></h1>
        </header>
        <p>Keeping you up to date with the latest and greatest in tractor trends.</p>
        <p>Need a new plow? Looking for some sweet tractor accessories? Want to stay on top of the hottest new tractor models?</p>
        <footer>
          <h1>Log into <span>Tractor Reactor</span> now!</h1>
        </footer>
      </aside>
    )
  } else {
    return (
      <aside className={styles.loginContainer}>
        <header>
          <h2>Welcome to</h2>
          <h1><span>Tractor Reactor</span></h1>
        </header>
        <p>
          The app that lets <span>farmers</span> unleash their inner tractor fanatic without having to suffer the judgmental glares of their neighbors.
        </p>
        <p>
          Because let's face it, there's no better feeling than posting endless pictures of your trusty John Deere on social media. And with <span>Tractor Reactor</span>, you can do just that.
        </p>
        <footer>
          <h1>Join <span>Tractor Reactor</span></h1>
          <h2>and start reacting now!</h2>
        </footer>
      </aside>
    )
  }
}

export default SideBar
