import styles from './CommentCard.module.scss'

import defaultPhoto from '../../assets/icons/profile.png'

import { Comment, Post, User, Profile } from '../../types/models'

import { SlOptions } from 'react-icons/sl'
import { TiCancel } from 'react-icons/ti'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
import EditCommentForm from '../EditCommentForm/EditCommentForm'

import translateDate from '../../helpers/translateDate'

import { useState } from 'react'

interface CommentCardProps {
  user: User | null;
  post: Post;
  comment: Comment;
  handleDeleteComment: (evt: React.MouseEvent, commentId: number) => Promise<void>;
}

const CommentCard = (props: CommentCardProps): JSX.Element => {
  const { user, post, comment, handleDeleteComment } = props

  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleEdit = () => {
    setIsOptionsOpen(!isOptionsOpen)
    setIsEditOpen(!isEditOpen)
  }

  const createdAtAgo = translateDate(comment.createdAt)
  
  return (
    <article className={styles.container} >
      <div id={styles.spacer} className={user?.profile.id === comment.authorId ? styles.active : ''} />
      <div>
        <img src={comment.author.photo ?? defaultPhoto} alt={comment.author.name} />
        <div id={styles.content}>
          <header>
            <p>{comment.author.name}</p>
            <p>{createdAtAgo}</p>
          </header>
          {!isEditOpen ? <p>{comment.content}</p> : <EditCommentForm post={post} comment={comment} setIsEditOpen={setIsEditOpen}/>}
        </div>
        {user?.id === comment.authorId && <div id={isOptionsOpen ? styles.options : ''}>
          {!isOptionsOpen ?
            !isEditOpen ? 
              <button onClick={() => setIsOptionsOpen(true)}><SlOptions /></button>
              :
              <button onClick={() => setIsEditOpen(false)}><TiCancel /></button>
            :
            <div>
              <div onClick={() => setIsOptionsOpen(false)}>Back</div>
              <div onClick={handleEdit}>Edit</div>
              <div onClick={(evt) => handleDeleteComment(evt, comment.id)}>Delete</div>
            </div>
          }
        </div>}
      </div>
    </article>
  )
}



export default CommentCard
