import { Post, User } from '../../types/models'

import styles from './PostPreviewCard.module.scss'
import defaultPhoto from '../../assets/icons/profile.png'

interface PostPreviewCardProps {
  post: Post;
  user?: User | null;
  scrollPostIntoView: ((postId: number) => void);
}

const PostPreviewCard = (props: PostPreviewCardProps): JSX.Element => {
  const { post, user, scrollPostIntoView } = props

  return (
    <article className={styles.container} onClick={() => scrollPostIntoView(post.id)}>
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
