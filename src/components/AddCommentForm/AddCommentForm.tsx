import { User, Profile } from '../../types/models'
import { CommentFormData } from '../../types/forms'

import styles from './AddCommentForm.module.scss'
import defaultPhoto from '../../assets/icons/profile.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

interface AddCommentFormProps {
  user: User;
  profile: Profile;
  formData: CommentFormData;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddComment: (evt: React.FormEvent) => Promise<void>;
}

const AddCommentForm = (props: AddCommentFormProps): JSX.Element => {
  const { user, profile, formData, handleChange, handleAddComment } = props

  const { content } = formData

  return (
    <form autoComplete="off" onSubmit={handleAddComment} className={styles.container}>
      <img src={profile.photo ?? defaultPhoto} alt={user.name} />
      <input type="text" value={content} name="content" placeholder="Write a reaction..." onChange={handleChange} />
      <button disabled={!content}><FontAwesomeIcon icon={faAdd} /></button>
    </form>
  )
}

export default AddCommentForm
