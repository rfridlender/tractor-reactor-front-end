import styles from './AddCommentForm.module.scss'

import defaultPhoto from '../../assets/icons/profile.png'

import { User } from '../../types/models'
import { AddCommentFormData } from '../../types/forms'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

interface AddCommentFormProps {
  user: User;
  formData: AddCommentFormData;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: ((evt: React.FormEvent) => Promise<void>);
}

const AddCommentForm = (props: AddCommentFormProps): JSX.Element => {
  const { user, formData, handleChange, handleSubmit } = props

  const { content } = formData

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className={styles.container}>
      <img src={user.profile.photo ?? defaultPhoto} alt={user.name} />
      <input type="text" value={content} name="content" placeholder="Write a comment..." onChange={handleChange} />
      <button disabled={!content}><FontAwesomeIcon icon={faAdd} /></button>
    </form>
  )
}

export default AddCommentForm
