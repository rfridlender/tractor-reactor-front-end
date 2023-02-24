import { Post, User, Comment } from '../../types/models'
import { AddCommentFormData } from '../../types/forms'

import styles from './CommentsList.module.scss'

import AddCommentForm from '../AddCommentForm/AddCommentForm'
import CommentCard from '../CommentCard/CommentCard'

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
      {post.comments.map((comment: Comment) => <CommentCard key={comment.id} user={user} comment={comment} />)}
      {user && <AddCommentForm user={user} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>}
    </section>
  )
}

export default CommentsList