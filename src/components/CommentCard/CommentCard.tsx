import styles from './CommentCard.module.scss'

import defaultPhoto from '../../assets/icons/profile.png'

import { Comment, User } from '../../types/models'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'

interface CommentCardProps {
  user: User | null;
  comment: Comment;
}

const CommentCard = (props: CommentCardProps): JSX.Element => {
  const { user, comment } = props

  return (
    <article className={styles.container} >
      <img src={comment.author.photo ?? defaultPhoto} alt={comment.author.name} />
      <p>{comment.content}</p>
      {user?.id === comment.authorId && <button><FontAwesomeIcon icon={faRemove} /></button>}
    </article>
  )
}

export default CommentCard
