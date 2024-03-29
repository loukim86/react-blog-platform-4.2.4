import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { getCookie, setCookie } from 'react-use-cookie'

import { setAuth, setUser } from '../../store/slices/userSlice'
import Header from '../Header/Header'
import ArticleList from '../ArticleList/ArticleList'
import ArticlePage from '../../pages/ArticlePage/ArticlePage'
import LogInPage from '../../pages/SignPage/LogInPage'
import SignUpPage from '../../pages/SignPage/SignUpPage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import CreateArticle from '../../pages/CreateArticle/CreateArticle'
import UpdateArticle from '../../pages/UpdateArticle/UpdateArticle'
import BlogService from '../../blog-service/blogService'
import styles from './App.module.scss'

const App = () => {
  const dispatch = useDispatch()
  const token = getCookie('Token')
  useEffect(() => {
    if (token) {
      BlogService.getCurrentUser(token)
        .then((data) => {
          const { email, username, image = null } = data.user
          dispatch(setAuth(true))
          dispatch(setUser({ username, email, image }))
        })
        .catch(() => setCookie('Token', ''))
    }
  }, [token, dispatch])
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Route path="/" component={ArticleList} exact />
        <Route path="/articles" component={ArticleList} exact />
        <Route
          path="/articles/:slug"
          render={({ match }) => {
            const { slug } = match.params
            return <ArticlePage slug={slug} />
          }}
          exact
        />
        <Route path="/sign-in" component={LogInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/new-article" component={CreateArticle} />
        <Route
          path="/articles/:slug/edit"
          render={({ match }) => {
            const { slug } = match.params
            return <UpdateArticle slug={slug} />
          }}
          exact
        />
      </div>
    </Router>
  )
}

export default App