import { useState } from 'react'

import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm'
import SideBar from '../../components/SideBar/SideBar';

import styles from './ChangePassword.module.scss'

interface ChangePasswordProps {
  handleAuthEvt: () => void;
}

const ChangePassword = (props: ChangePasswordProps): JSX.Element => {
  const [message, setMessage] = useState('')

  const updateMessage = (msg: string): void => setMessage(msg)

  return (
    <main>
      <SideBar />
      <section className={styles.container}>
        <h1>Change Password</h1>
        <p>{message}</p>
        <ChangePasswordForm {...props} updateMessage={updateMessage} />
      </section>
    </main>
  )
}

export default ChangePassword
