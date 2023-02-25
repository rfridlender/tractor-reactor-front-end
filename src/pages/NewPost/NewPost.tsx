import styles from './NewPost.module.scss'

import { User } from '../../types/models'

import SideBar from '../../components/SideBar/SideBar'
import AuthorPostHeader from '../../components/AuthorPostHeader/AuthorPostHeader'
import NewPostForm from '../../components/NewPostForm/NewPostForm'

interface NewPostProps {
  user: User;
}

const NewPost = (props: NewPostProps): JSX.Element => {
  const { user } = props

  return (
    <main>
      <SideBar />
      <section className={styles.container}>
        <AuthorPostHeader user={user} />
        <NewPostForm />
      </section>
    </main>
  )
}

export default NewPost
