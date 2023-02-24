import styles from './PostPreviewCard.module.scss'

import defaultPhoto from '../../assets/icons/profile.png'

import { Post, User } from '../../types/models'

interface PostPreviewCardProps {
  post?: Post;
  user?: User | null;
  scrollPostIntoView: ((evt: React.MouseEvent) => void);
}

const PostPreviewCard = (props: PostPreviewCardProps): JSX.Element => {
  const { post, user, scrollPostIntoView } = props

  return (
    <article className={styles.container} onClick={(evt) => scrollPostIntoView(evt)} id={`post${post?.id}`}>
      <div id={styles.spacer} className={user?.profile.id === post?.authorId ? styles.active : ''} />
      <div id={styles.preview}>
        <img src={post?.photo ?? defaultPhoto} alt={post?.author.name} />
        <div id={styles.tractor}>
          <div>{post?.brand}</div>
          <div className={styles.tractorSpacer} />
          <div>{post?.design}</div>
        </div>
      </div>
    </article>
  )
}

export default PostPreviewCard
