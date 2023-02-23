import { Post } from '../../types/models'

import styles from './PostCard.module.scss'

import defaultPhoto from '../../assets/icons/profile.png'

interface PostCardProps {
  post: Post;
}

// export interface Post {
//   id: number;
//   variety: string;
//   brand: string;
//   design: string;
//   horsepower: number;
//   reaction: string;
//   rating: number;
//   authorId: number;
//   photo?: string;
//   createdAt: string;
//   updatedAt: string;
//   comments: Comment[];
//   author: Profile
// }

const PostCard = (props: PostCardProps): JSX.Element => {
  const { post } = props

  const createdAtValue = new Date(post.createdAt).valueOf()
  const nowValue = new Date().valueOf()
  const hourDifference = (nowValue - createdAtValue) / 600000
  const createdAtAgo = hourDifference <= 12 ?
    `${Math.floor(hourDifference)} hours ago` :
    hourDifference <= 24 ? `Over 12 hours ago` :
    `${Math.floor(hourDifference / 24)} days ago`
  
  return (
    <article className={styles.container}>
      <header>
        <div id={styles.author}>
          <img src={post.author.photo? post.author.photo : defaultPhoto} alt={post.author.name} />
          <div>{post.author.name}</div>
        </div>
        <div>{createdAtAgo}</div>
      </header>
      {post.photo && <img src={post.photo} alt={`${post.author.name}'s ${post.brand} Tractor`} />}
      <div>
        <div>{post.variety}</div>
        <div>{post.brand}</div>
        <div>{post.design}</div>
        <div>{post.horsepower}</div>
        <div>{post.rating}</div>
      </div>
      <p>{post.reaction}</p>
    </article>
  )
}

export default PostCard
