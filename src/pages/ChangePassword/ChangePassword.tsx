import { useState } from 'react'
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm'
import SideBar from '../../components/SideBar/SideBar'

import styles from './ChangePassword.module.scss'
import logo from '../../assets/icons/logo.png'

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
    <div id={styles.logo}>
        <div>Tractor</div>
        <img src={logo} alt="Tractor Reactor" />
        <div>Reactor</div>
      </div>
      <div id={styles.formContainer}>
        <header>
          <h1>Change Password</h1>
        </header>
        {message && <p>{message}</p>}
        <ChangePasswordForm {...props} updateMessage={updateMessage} />
      </div>
    </section>
  </main>
  )
}

export default ChangePassword
