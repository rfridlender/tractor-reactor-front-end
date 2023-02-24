import { Post, User } from '../../types/models'
import { AddCommentFormData } from '../../types/forms'

import * as postService from '../../services/postService'

import { useState } from 'react'

import CommentsList from '../CommentsList/CommentsList'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTractor } from '@fortawesome/free-solid-svg-icons'

import styles from './PostCard.module.scss'

import defaultPhoto from '../../assets/icons/profile.png'
import translateDate from '../../helpers/translateDate'


interface PostCardProps {
  post: Post;
  user: User | null;
}

const PostCard = (props: PostCardProps): JSX.Element => {
  const { user } = props

  const [post, setPost] =useState<Post>(props.post)
  const [formData, setFormData] = useState<AddCommentFormData>({content: ''})

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      const newComment = await postService.addComment(formData, post.id)
      console.log(newComment);
      
      setPost({...post, comments: [newComment, ...post.comments]})
      setFormData({content: ''})
    } catch (err) {
      console.log(err)
    }
  }
  
  const createdAtAgo = translateDate(post.createdAt)

  const ratingOptions: [ 1, 2, 3, 4, 5 ] = [ 1, 2, 3, 4, 5 ]
  
  return (
    <article className={styles.container}>
      <header>
        <div id={styles.author}>
          <img src={post.author.photo? post.author.photo : defaultPhoto} alt={post.author.name} />
          <div>{post.author.name}</div>
        </div>
        <div>{createdAtAgo}</div>
      </header>
      {post.photo && <img id={styles.photo} src={post.photo} alt={`${post.author.name}'s ${post.brand} Tractor`} />}
      <div id={styles.tractor}>
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
      <CommentsList post={post} user={user} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </article>
  )
}

export default PostCard
