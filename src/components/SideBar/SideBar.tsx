import { NavLink, useLocation } from 'react-router-dom'

import { Post, User } from '../../types/models'

import styles from './SideBar.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons'

import PostPreviewCard from '../PostPreviewCard/PostPreviewCard'
import { useState } from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

export interface SideBarProps {
  posts?: Post[];
  isLoading?: boolean;
  user?: User | null;
  scrollPostIntoView?: (postId: number) => void;
  search?: string;
  handleSearch?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const SideBar = (props: SideBarProps): JSX.Element => {
  const { posts, isLoading, user, scrollPostIntoView, search, handleSearch } = props

  const { pathname } = useLocation()

  if (isLoading) {
    return (
      <aside className={styles.loading}>
        <LoadingSpinner />
      </aside>
    )
  } else if (posts && scrollPostIntoView) {
    return (
      <aside className={styles.landingContainer}>
        <div id={styles.search}>
          <label htmlFor="search"><FontAwesomeIcon icon={faMagnifyingGlass} /></label>
          <input type="search" id="search" placeholder="Search..." autoComplete="off" onChange={handleSearch} value={search}/>
        </div>
        <h1>Posts</h1>
        {posts?.map((post: Post)=> (
          <PostPreviewCard key={post.id} post={post} user={user} scrollPostIntoView={scrollPostIntoView} />
        ))}
      </aside>
    )
  } else if (pathname === '/login') {
    return (
      <aside className={styles.container}>
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
  } else if (pathname === '/signup') {
    return (
      <aside className={styles.container}>
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
  } else if (pathname === '/change-password') {
    return (
      <aside className={styles.container}>
        <header>
          <h1>At <span>Tractor Reactor</span>,</h1>
        </header>
        <p>
          <span>Security</span> is our utmost priority.
        </p>
        <p>
          We believe in keeping all of your <span>tractor</span> related data safe and secure.
        </p>
        <footer>
          <h1><span>Thank you</span></h1>
          <h2>for believing the same.</h2>
        </footer>
      </aside>
    )
  } else {
    return (
      <aside className={styles.container}>
        <header>
          <h1>What <span>tractors</span> or <span>tractor-related</span> equipment are on your mind?</h1>
        </header>
        <p>
          Share it with the <span>world</span>.
        </p>
        <p>
          <span>Tractor Reactor</span> is devoted to fostering an enviroment free of scrutiny for <span>tractor fanatics</span>.
        </p>
        <footer>
          <h1><span>Thank you</span></h1>
          <h2>for making that possible.</h2>
        </footer>
      </aside>
    )
  }
}

export default SideBar
