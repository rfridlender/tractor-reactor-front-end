import styles from './Landing.module.scss'

import { useState } from 'react'

import video from '../../assets/video.mp4'

import { User, Post } from '../../types/models'
import { useQuery, useQueryClient } from 'react-query'

import * as postService from '../../services/postService'

import PostCard from '../../components/PostCard/PostCard'
import SideBar from '../../components/SideBar/SideBar'
import { MutableRefObject, useRef } from 'react'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  const queryClient = useQueryClient()

  const { data, error, isLoading, isError} = useQuery(['posts', user], postService.index)

  const [search, setSearch] = useState('')

  const postRefs = useRef({}) as MutableRefObject<any>

  const posts = data?.filter(post => {
    return post.variety.toLowerCase().includes(search.toLowerCase()) ||
    post.brand.toLowerCase().includes(search.toLowerCase()) ||
    post.design.toLowerCase().includes(search.toLowerCase()) ||
    post.author.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  })
  
  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(evt.target.value)
  }
  
  console.log(`POSTS:`, posts);
  
  const handleDeletePost = async (evt: React.MouseEvent, postId: number): Promise<void> => {
    evt.preventDefault()
    try {
      await postService.delete(postId)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    } catch (err) {
      console.log(err)
    }
  }

  const scrollPostIntoView = (postId: number): void => {
    postRefs.current[postId].scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main>
      <SideBar posts={posts} user={user} scrollPostIntoView={scrollPostIntoView} search={search} handleSearch={handleSearch} />
        <section className={styles.container}>
          {!user && 
            <div id={styles.video}>
              <video src={video}
                playsInline
                autoPlay
                muted
                loop
              />
              <header>
                <h1>Tractor Reactor</h1>
                <h2>fuel your passion for tractors</h2>
              </header>
            </div>
          }
        {posts?.map((post: Post) => (
          <PostCard key={post.id} post={post} user={user} postRefs={postRefs} handleDeletePost={handleDeletePost} />
        ))}
      </section>
    </main>
  )
}

export default Landing
