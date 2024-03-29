import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Spin } from 'antd'
import { getCookie } from 'react-use-cookie'
import { setLoading } from '../../store/slices/uiSlice'
import { setArticle } from '../../store/slices/articleSlice'
import ArticleCard from '../../components/ArticleCard/ArticleCard'
import BlogService from '../../blog-service/blogService'
import styles from './ArticlePage.module.scss'

const ArticlePage = ({ slug }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const token = getCookie('Token') ? getCookie('Token') : null
        dispatch(setLoading(true))
        BlogService.getArticle(slug, token).then((data) => dispatch(setArticle(data)))
        dispatch(setLoading(false))
      }, [dispatch, slug])
const { isLoading } = useSelector((state) => state.ui)
const { article } = useSelector((state) => state.article)

const content =
article?.slug === slug && !isLoading ? (
  <div className={styles.articlePage}>
    <ArticleCard data={article} slug={slug} />
  </div>
) : (
  <Spin className={styles['articlePage__spin']} size="large" />
)

return content
}

export default ArticlePage