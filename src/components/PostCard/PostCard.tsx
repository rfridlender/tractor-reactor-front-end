import { Post, User, Comment } from '../../types/models'
import { AddCommentFormData } from '../../types/forms'

import * as postService from '../../services/postService'

import { useState } from 'react'

import CommentsList from '../CommentsList/CommentsList'
import AuthorPostHeader from '../AuthorPostHeader/AuthorPostHeader'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTractor } from '@fortawesome/free-solid-svg-icons'

import styles from './PostCard.module.scss'

interface PostCardProps {
  post: Post;
  user: User | null;
  postRefs: any;
  handleDeletePost: (evt: React.MouseEvent, postId: number) => void
}

const PostCard = (props: PostCardProps): JSX.Element => {
  const { user, postRefs, handleDeletePost } = props

  const [post, setPost] =useState<Post>(props.post)
  const [formData, setFormData] = useState<AddCommentFormData>({content: ''})

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      const newComment = await postService.addComment(formData, post.id)
      setPost({...post, comments: [...post.comments, newComment]})
      setFormData({content: ''})
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteComment = async (evt: React.MouseEvent, commentId: number): Promise<void> => {
    evt.preventDefault()
    try {
      await postService.deleteComment(post.id, commentId)
      setPost({...post, comments: post.comments.filter((comment: Comment) => comment.id!== commentId)})
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
      <CommentsList post={post} user={user} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} handleDeleteComment={handleDeleteComment} />
    </article>
  )
}

export default PostCard
