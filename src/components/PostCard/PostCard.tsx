import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { Post, User, Profile } from '../../types/models'
import { CommentFormData } from '../../types/forms'
import CommentsList from '../CommentsList/CommentsList'
import AuthorPostHeader from '../AuthorPostHeader/AuthorPostHeader'
import * as postService from '../../services/postService'

import styles from './PostCard.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTractor } from '@fortawesome/free-solid-svg-icons'

interface PostCardProps {
  post: Post;
  user: User | null;
  profile: Profile | null;
  postRefs: any;
  handleDeletePost: (evt: React.MouseEvent, postId: number) => void
}

const PostCard = (props: PostCardProps): JSX.Element => {
  const { post, user, profile, postRefs, handleDeletePost } = props

  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState<CommentFormData>({content: ''})

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleAddComment = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await postService.addComment(formData, post.id)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setFormData({content: ''})
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteComment = async (evt: React.MouseEvent, commentId: number): Promise<void> => {
    evt.preventDefault()
    try {
      await postService.deleteComment(post.id, commentId)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    } catch (err) {
      console.log(err)
    }
  }

  const ratingOptions: [ 1, 2, 3, 4, 5 ] = [ 1, 2, 3, 4, 5 ]
  
  return (
    <article className={styles.container} ref={(el) => postRefs.current[post.id] = el}>
      {<AuthorPostHeader post={post} handleDeletePost={handleDeletePost} user={user} />}
      {post.photo && <img id={styles.photo} src={post.photo} alt={`${post.author.name}'s ${post.brand} Tractor`} />}
      <div id={styles.tractor}>
        <div>{post.year}</div>
        <div>{post.brand}</div>
        <div>{post.design}</div>
      </div>
      <div id={styles.specs}>
        <div>{post.variety}</div>
        <div id={styles.rating}>
          {ratingOptions.map((rating: number): JSX.Element => (
            <FontAwesomeIcon className={rating <= post.rating ? styles.rated : styles.unrated} key={rating} icon={faTractor} />
          ))}
        </div>
        <div>{`${post.horsepower} HP`}</div>
      </div>
      <p>{post.reaction}</p>
      <CommentsList post={post} user={user} profile={profile} formData={formData} handleChange={handleChange} handleAddComment={handleAddComment} handleDeleteComment={handleDeleteComment} />
    </article>
  )
}

export default PostCard
