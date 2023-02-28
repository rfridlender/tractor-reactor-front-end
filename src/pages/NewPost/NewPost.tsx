import styles from './NewPost.module.scss'

import { User, Profile } from '../../types/models'

import SideBar from '../../components/SideBar/SideBar'
import AuthorPostHeader from '../../components/AuthorPostHeader/AuthorPostHeader'
import NewPostForm from '../../components/NewPostForm/NewPostForm'

interface NewPostProps {
  user: User;
  profile: Profile;
}

const NewPost = (props: NewPostProps): JSX.Element => {
  const { user, profile } = props

  return (
    <main>
      <SideBar />
      <section className={styles.container}>
        <AuthorPostHeader user={user} profile={profile} />
        <NewPostForm />
      </section>
    </main>
  )
}

export default NewPost
