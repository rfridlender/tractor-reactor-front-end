import { useState } from 'react'
import { Link } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar'
import SignupForm from '../../components/SignupForm/SignupForm'

import styles from './Signup.module.scss'
import logo from '../../assets/icons/logo.png'

interface SignupProps {
  handleAuthEvt: () => void;
}

const Signup = (props: SignupProps): JSX.Element => {
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
            <h1>Sign up with <span>Tractor Reactor</span></h1>
            <h2>Stay updated on the world of tractors</h2>
          </header>
          {message && <p>{message}</p>}
          <SignupForm {...props} updateMessage={updateMessage} />
        </div>
        <h1>Already have an account? <Link to="/login">Log in</Link></h1>
      </section>
    </main>
  )
}

export default Signup
