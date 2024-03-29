import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { getCookie } from "react-use-cookie"
import { Spin } from 'antd'
import { withRouter } from "react-router-dom"
import { setLoading } from "../../store/slices/uiSlice"
import ArticleForm from "../../components/ArticleForm/ArticleForm"
import BlogService from '../../blog-service/blogService'
import styles from '../ArticlePage/ArticlePage.module.scss'

const CreateArticle = ({ history }) => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.ui)
    const [isError, setError] = useState(false)
    const onSubmit = ({ title, description, body, tags }) => {
    const dataArticle = {
      title,
      description,
      body,
      tagList: tags,
    }
    const token = getCookie('Token')
    dispatch(setLoading(true))
    BlogService.createArticle(dataArticle, token)
      .then((data) => {
        dispatch(setLoading(false))
        history.push(`/articles/${data.article.slug}`)
      })
      .catch(() => {
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 5000)
      })
  }
  const content = !isLoading && <ArticleForm title="Create new article" onSubmit={onSubmit} isError={isError} />
  return isLoading ? <Spin className={styles['articlePage__spin']} size="large" /> : content
}

export default withRouter(CreateArticle)

