import styles from './Landing.module.scss'

import { User, Post } from '../../types/models'
import { useQuery } from 'react-query'

import * as postService from '../../services/postService'

import PostCard from '../../components/PostCard/PostCard'
import SideBar from '../../components/SideBar/SideBar'
import { MutableRefObject, useRef } from 'react'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  const { data, error, isLoading, isError} = useQuery(['profiles', user], postService.index)

  const postRefs = useRef({}) as MutableRefObject<any>

  const scrollPostIntoView = (postId: number): void => {
    postRefs.current[postId].scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main>
      <SideBar posts={data} user={user} scrollPostIntoView={scrollPostIntoView} />
      <section className={styles.container}>
        {data?.map(post => (
          <PostCard key={post.id} post={post} user={user} postRefs={postRefs} />
        ))}
      </section>
    </main>
  )
}

export default Landing
