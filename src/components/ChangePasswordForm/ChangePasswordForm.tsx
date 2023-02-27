import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import * as authService from '../../services/authService'

import styles from './ChangePasswordForm.module.scss'

import { AuthFormProps } from '../../types/props'
import { ChangePasswordFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

const ChangePasswordForm = (props: AuthFormProps): JSX.Element => {
  const {updateMessage, handleAuthEvt} = props
  const navigate = useNavigate()

  const [formData, setFormData] = useState<ChangePasswordFormData>({
    oldPassword: '',
    newPassword: '',
    newPasswordConf: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    updateMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await authService.changePassword(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, updateMessage)
    }
  }

  const { oldPassword, newPassword, newPasswordConf } = formData

  const isFormInvalid = (): boolean => {
    return !(oldPassword && newPassword && newPassword === newPasswordConf)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <label htmlFor="password" className={styles.label}>
          Current Password
        </label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          name="oldPassword"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="newPassword" className={styles.label}>
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          name="newPassword"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="newPasswordConf" className={styles.label}>
          Confirm New Password
        </label>
        <input
          type="password"
          id="newPasswordConf"
          value={newPasswordConf}
          name="newPasswordConf"
          onChange={handleChange}
        />
      </div>
      <div id={styles.buttonContainer}>
        <button id={styles.changePassword} disabled={isFormInvalid()} className={styles.button}>
          Change Password
        </button>
        <button id={styles.cancel}><Link to="/">Cancel</Link></button>
      </div>
    </form>
  )
}

export default ChangePasswordForm
