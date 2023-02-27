import styles from './EditPost.module.scss'

import { User } from '../../types/models'

import SideBar from '../../components/SideBar/SideBar'
import AuthorPostHeader from '../../components/AuthorPostHeader/AuthorPostHeader'
import EditPostForm from '../../components/EditPostForm/EditPostForm'

interface EditPostProps {
  user: User;
}

const EditPost = (props: EditPostProps): JSX.Element => {
  const { user } = props

  return (
    <main>
      <SideBar />
      <section className={styles.container}>
        <AuthorPostHeader user={user} />
        <EditPostForm />
      </section>
    </main>
  )
}

export default EditPost
