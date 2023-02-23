import { Post, User, Comment } from '../../types/models'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons'

import styles from './CommentsList.module.scss'

import defaultPhoto from '../../assets/icons/profile.png'
import AddCommentForm from '../AddCommentForm/AddCommentForm'
import { AddCommentFormData } from '../../types/forms'

interface CommentsListProps {
  post: Post;
  user: User | null;
  formData: AddCommentFormData;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: ((evt: React.FormEvent) => Promise<void>);
}

const CommentsList = (props: CommentsListProps): JSX.Element => {
  const { post, user, formData, handleChange, handleSubmit } = props

  return (
    <section className={styles.container}>
      {user && <AddCommentForm user={user} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>}
      {post.comments.map((comment: Comment) => (
        comment.content
      ))}
    </section>
  )
}

export default CommentsList
