import styles from './Landing.module.css'

import { User } from '../../types/models'

interface LandingProps {
  user: User | null
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className={styles.container}>
      Landing
    </main>
  )
}

export default Landing
