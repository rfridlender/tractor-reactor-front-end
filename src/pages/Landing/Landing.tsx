import styles from './Landing.module.css'

import { User } from '../../types/models'
import { useQuery } from 'react-query'

import * as postService from '../../services/postService'

import PostCard from '../../components/PostCard/PostCard'

interface LandingProps {
  user: User | null
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  const { data, error, isLoading, isError} = useQuery('profiles', postService.index)

  return (
    <main className={styles.container}>
      {data?.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  )
}

export default Landing
