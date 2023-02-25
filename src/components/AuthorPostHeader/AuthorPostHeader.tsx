import { Post, User } from '../../types/models';

import styles from './AuthorPostHeader.module.scss'
import defaultPhoto from '../../assets/icons/profile.png'

import translateDate from '../../helpers/translateDate';

interface AuthorPostHeaderProps {
  post?: Post;
  user?: User;
}

const AuthorPostHeader = (props: AuthorPostHeaderProps) => {
  const { post, user } = props

  if (post) {
    const createdAtAgo = translateDate(post.createdAt)

    return (
      <header className={styles.container}>
        <div id={styles.author}>
          <img src={post.author.photo ? post.author.photo : defaultPhoto} alt={post.author.name} />
          <div>{post.author.name}</div>
        </div>
        <div>{createdAtAgo}</div>
      </header>
    )
  } else {
    const createdNow = new Date().toString()

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