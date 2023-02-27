import { Post, User } from '../../types/models';

import styles from './AuthorPostHeader.module.scss'
import defaultPhoto from '../../assets/icons/profile.png'

import translateDate from '../../helpers/translateDate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
import { MdEdit } from 'react-icons/md'

interface AuthorPostHeaderProps {
  post?: Post;
  handleDeletePost?: (evt: React.MouseEvent, postId: number) => void;
  user?: User | null;
}

const AuthorPostHeader = (props: AuthorPostHeaderProps) => {
  const { post, handleDeletePost, user } = props

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
          {user?.profile.id === post.authorId &&
            <>
              <button><MdEdit /></button>
              <button onClick={(evt) => handleDeletePost(evt, post.id)}>
                <FontAwesomeIcon icon={faRemove} />
              </button>
            </>
          }
        </div>
      </header>
    )
  } else {
    const createdNow = new Date().toDateString()

    return (
      <header className={styles.container}>
        <div id={styles.author}>
          <img src={user?.profile.photo ? user.profile.photo : defaultPhoto} alt={user?.name} />
          <div>{user?.name}</div>
        </div>
        <div>{createdNow}</div>
      </header>
    )
  }
}
 
export default AuthorPostHeader;