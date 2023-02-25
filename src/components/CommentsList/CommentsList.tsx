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
  handleSubmit: (evt: React.FormEvent) => Promise<void>;
  handleDeleteComment: (evt: React.MouseEvent, commentId: number) => Promise<void>;
}

const CommentsList = (props: CommentsListProps): JSX.Element => {
  const { post, user, formData, handleChange, handleSubmit, handleDeleteComment } = props

  return (
    <section className={styles.container}>
      {post.comments.length ? 
        post.comments.map((comment: Comment) => (
          <CommentCard key={comment.id} user={user} comment={comment} handleDeleteComment={handleDeleteComment} />
        ))
        :
        <article>No reactions yet...</article>
      }
      {user && <AddCommentForm user={user} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>}
    </section>
  )
}

export default CommentsList
