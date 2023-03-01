import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthFormProps } from '../../types/props'
import { SignupFormData, PhotoFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'
import * as authService from '../../services/authService'

import styles from './SignupForm.module.scss'
import defaultProfile from '../../assets/icons/profile.png'

const SignupForm = (props: AuthFormProps): JSX.Element => {
  const {updateMessage, handleAuthEvt} = props
  const navigate = useNavigate()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  })
  const [photoData, setPhotoData] = useState<PhotoFormData>({ photo: null })
  const [photoPreview, setPhotoPreview] = useState<string>('')

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    updateMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    if (evt.target.files) reader.readAsDataURL(evt.target.files[0])
    reader.onload = () => {
      const imageUrl = reader.result as string
      setPhotoPreview(imageUrl)
    }
    if (evt.target.files) setPhotoData({ photo: evt.target.files.item(0) })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    if(isSubmitted) return
    try {
      setIsSubmitted(true)
      await authService.signup(formData, photoData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, updateMessage)
      setIsSubmitted(false)
    }
  }

  const { name, email, password, passwordConf } = formData
  const { photo } = photoData

  const isFormInvalid = (): boolean => {
    return !(name && email && password && password === passwordConf && photo)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          name="name"
          onChange={handleChange}
          placeholder="Name"
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="email">Email address</label>
        <input
          type="text"
          id="email"
          value={email}
          name="email"
          onChange={handleChange}
          placeholder="Email address"
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="confirm">Confirm Password</label>
        <input
          type="password"
          id="confirm"
          value={passwordConf}
          name="passwordConf"
          onChange={handleChange}
          placeholder="Confirm Password"
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="photo-upload">Upload Profile Photo</label>
        <div id={styles.photoUpload}>
          <label htmlFor="photo-upload" className={photoData.photo?.name && styles.active}>{!photoData.photo ? 'No file chosen' : photoData.photo.name}</label>
          <img src={!photo ? defaultProfile : photoPreview} alt="Profile Picture" />
          <input
            type="file"
            id="photo-upload"
            name="photo"
            onChange={handleChangePhoto}
          />
        </div>
      </div>
      <div id={styles.buttonContainer}>
        <button id={styles.signup} disabled={isFormInvalid() || isSubmitted} className={styles.button}>
          {!isSubmitted ? "Sign Up" : "Sending..."}
        </button>
        <button id={styles.cancel}><Link to="/">Cancel</Link></button>
      </div>
    </form>
  )
}

export default SignupForm
