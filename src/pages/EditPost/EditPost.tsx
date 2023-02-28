import styles from './EditPost.module.scss'

import { User, Profile } from '../../types/models'

import SideBar from '../../components/SideBar/SideBar'
import AuthorPostHeader from '../../components/AuthorPostHeader/AuthorPostHeader'
import EditPostForm from '../../components/EditPostForm/EditPostForm'

interface EditPostProps {
  user: User;
  profile: Profile;
}

const EditPost = (props: EditPostProps): JSX.Element => {
  const { user, profile } = props

  return (
    <main>
      <SideBar />
      <section className={styles.container}>
        <AuthorPostHeader user={user} profile={profile} />
        <EditPostForm />
      </section>
    </main>
  )
}

export default EditPost
