import { Post, User, Profile } from '../../types/models'

import { useState } from 'react'

import styles from './AuthorPostHeader.module.scss'
import defaultPhoto from '../../assets/icons/profile.png'

import translateDate from '../../helpers/translateDate'

import { SlOptions } from 'react-icons/sl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
import { MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'

interface AuthorPostHeaderProps {
  user?: User | null;
  profile?: Profile | null;
  post?: Post;
  handleDeletePost?: (evt: React.MouseEvent, postId: number) => void;
}

const AuthorPostHeader = (props: AuthorPostHeaderProps) => {
  const { user, profile, post, handleDeletePost } = props

  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  if (post && handleDeletePost) {
    const createdAtAgo = translateDate(post.createdAt)

    return (
      <header className={styles.container}>
        <div id={styles.author}>
          <img src={post.author.photo ? post.author.photo : defaultPhoto} alt={post.author.name} />
          <div>{post.author.name}</div>
        </div>
        <div id={styles.optionsContainer}>
          <div>{createdAtAgo}</div>
          {user?.id === post.authorId && <div id={isOptionsOpen ? styles.options : ''}>
            {!isOptionsOpen ?
              <button onClick={() => setIsOptionsOpen(true)}><SlOptions /></button>
              :
              <div>
                <div onClick={() => setIsOptionsOpen(false)}>Back</div>
                <div><Link to={`/posts/${post.id}/edit`} state={post}>Edit</Link></div>
                <div onClick={(evt) => handleDeletePost(evt, post.id)}>Delete</div>
              </div>
            }
          </div>}
        </div>
      </header>
    )
  } else {
    const createdNow = new Date().toDateString()

    return (
      <header className={styles.container}>
        <div id={styles.author}>
          <img src={profile?.photo ? profile.photo : defaultPhoto} alt={user?.name} />
          <div>{user?.name}</div>
        </div>
        <div>{createdNow}</div>
      </header>
    )
  }
}
 
export default AuthorPostHeader;