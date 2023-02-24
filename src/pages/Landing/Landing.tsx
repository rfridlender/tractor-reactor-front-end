import styles from './Landing.module.scss'

import { User } from '../../types/models'
import { useQuery } from 'react-query'

import * as postService from '../../services/postService'

import PostCard from '../../components/PostCard/PostCard'
import SideBar from '../../components/SideBar/SideBar'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  const { data, error, isLoading, isError} = useQuery('profiles', postService.index)

  return (
    <>
      <SideBar posts={data} user={user} />
      <section className={styles.container}>
        {data?.map(post => (
          <PostCard key={post.id} post={post} user={user}/>
        ))}
      </section>
    </>
  )
}

export default Landing
