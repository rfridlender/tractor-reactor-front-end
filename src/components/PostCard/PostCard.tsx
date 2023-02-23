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
  const minuteDifference = (nowValue - createdAtValue) / 60000
  console.log(minuteDifference / 60);
  
  const createdAtAgo = 
    minuteDifference <= 60 ? `${Math.floor(minuteDifference)} minutes ago` :
    minuteDifference / 60 <= 24 ? `${Math.floor(minuteDifference / 60)} hours ago` :
    `${Math.floor(minuteDifference / 60 / 24)} days ago`
  
  return (
    <article className={styles.container}>
      <header>
        <div id={styles.author}>
          <img src={post.author.photo? post.author.photo : defaultPhoto} alt={post.author.name} />
          <div>{post.author.name}</div>
        </div>
        <div>{createdAtAgo}</div>
      </header>
      {post.photo && <img id={styles.photo} src={post.photo} alt={`${post.author.name}'s ${post.brand} Tractor`} />}
      <div id={styles.tractor}>
        <div>{post.brand}</div>
        <div>{post.design}</div>
      </div>
      <div id={styles.specs}>
        <div>{post.variety}</div>
        <div>{post.rating}</div>
        <div>{`${post.horsepower} HP`}</div>
      </div>
      <p>{post.reaction}</p>
    </article>
  )
}

export default PostCard
