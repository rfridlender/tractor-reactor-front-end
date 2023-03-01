import { Post, User, Comment, Profile } from '../../types/models'
import { CommentFormData } from '../../types/forms'
import AddCommentForm from '../AddCommentForm/AddCommentForm'
import CommentCard from '../CommentCard/CommentCard'

import styles from './CommentsList.module.scss'

interface CommentsListProps {
  user: User | null;
  profile: Profile | null;
  post: Post;
  formData: CommentFormData;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddComment: (evt: React.FormEvent) => Promise<void>;
  handleDeleteComment: (evt: React.MouseEvent, commentId: number) => Promise<void>;
}

const CommentsList = (props: CommentsListProps): JSX.Element => {
  const { user, profile, post, formData, handleChange, handleAddComment, handleDeleteComment } = props

  return (
    <section className={styles.container}>
      {post.comments.length ? 
        post.comments.map((comment: Comment) => (
          <CommentCard key={comment.id} user={user} post={post} comment={comment} handleDeleteComment={handleDeleteComment} />
        ))
        :
        <article>No reactions yet...</article>
      }
      {user && profile && <AddCommentForm user={user} profile={profile} formData={formData} handleChange={handleChange} handleAddComment={handleAddComment}/>}
    </section>
  )
}

export default CommentsList
