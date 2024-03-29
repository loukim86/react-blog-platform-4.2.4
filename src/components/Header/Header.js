import { useDispatch, useSelector } from 'react-redux'
import { setCookie } from 'react-use-cookie'
import { Link } from 'react-router-dom'
import userImage from '../../assets/user.png'
import { setAuth, setUser } from '../../store/slices/userSlice'
import styles from './Header.module.scss'

const Header = () => {
  const dispatch = useDispatch()
  const { isAuth, user} = useSelector((state) => state.user)

  const avatar = user?.image ? user.image : userImage

  const logOut = () => {
    dispatch(setAuth(false))
    dispatch(setUser(null))
    setCookie('Token', '')
  }

  const content =
    isAuth && user?.username ? (
      <div className={styles['header__link-container']}>
        <Link to="/new-article" className={styles['header__articleCreate']}>
          Create article
        </Link>
        <Link to="/profile" className={styles['header__user-info']}>
          <p className={styles['header__user-name']}>{user.username}</p>
          <img src={avatar} className={styles['header__user-image']} alt="user avatar" />
        </Link>
        <button type="button" onClick={logOut} className={`${styles['header__link']} ${styles['header__link-logout']}`}>
          Log out
        </button>
      </div>
    ) : (
      <div className={styles['header__link-container']}>
        <Link to="/sign-in" className={styles['header__link']}>
          Sign in
        </Link>
        <Link to="/sign-up" className={`${styles['header__link']} ${styles['header__link-signup']}`}>
          Sign up
        </Link>
      </div>
    )

  return (
    <div className={styles.header}>
      <Link to="/" className={styles['header__logo']}>
        Realworld Blog
      </Link>
      {content}
    </div>
  )
}

export default Header