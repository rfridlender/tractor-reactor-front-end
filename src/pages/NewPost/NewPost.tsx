import styles from './NewPost.module.scss'

import { User } from '../../types/models'

import * as postService from '../../services/postService'

import PostCard from '../../components/PostCard/PostCard'
import SideBar from '../../components/SideBar/SideBar'
import { MutableRefObject, useRef } from 'react'

interface NewPostProps {
  user: User;
}

const NewPost = (props: NewPostProps): JSX.Element => {
  const { user } = props

  return (
    <main>
      <SideBar />
      <section className={styles.container}>
        hello
      </section>
    </main>
  )
}

export default NewPost
