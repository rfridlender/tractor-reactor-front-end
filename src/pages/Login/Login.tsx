import { useState } from 'react'

import { Link } from 'react-router-dom';

import LoginForm from '../../components/LoginForm/LoginForm'
import SideBar from '../../components/SideBar/SideBar';

import styles from './Login.module.scss'

import logo from '../../assets/icons/logo.png'

interface LoginPageProps {
  handleAuthEvt: () => void;
} 

const LoginPage = (props: LoginPageProps): JSX.Element => {
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
            <h1>Log into <span>Tractor Reactor</span></h1>
            <h2>Stay updated on the world of tractors</h2>
          </header>
          <p>{message}</p>
          <LoginForm {...props} updateMessage={updateMessage} />
        </div>
        <h1>New to <span>Tractor Reactor</span>? <Link to="/signup">Join now</Link></h1>
      </section>
    </main>
  )
}

export default LoginPage
