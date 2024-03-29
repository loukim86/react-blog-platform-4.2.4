import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCookie } from "react-use-cookie"
import { Pagination, Spin, Alert } from 'antd'
import { setArticles, setArticlesCount } from '../../store/slices/articleSlice'
import { setLoading } from '../../store/slices/uiSlice'
import ArticleCard from '../ArticleCard/ArticleCard'
import BlogService from '../../blog-service/blogService'
import styles from './ArticleList.module.scss'


const ArticleList = () => {
    const [pageNumer, togglePageNumber] = useState(1)
    const [isError, setError] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoading(true))
        const token = getCookie('Token') ? getCookie('Token') : null
        BlogService.getArticles(pageNumer * 10 - 10, token)
          .then((data) => {
            dispatch(setArticles(data))
            dispatch(setArticlesCount(data))
            dispatch(setLoading(false))
          })
          .catch(() => {
            dispatch(setLoading(false))
            setError(true)
            setTimeout(() => setError(false), 5000)
          })
      }, [pageNumer, dispatch])

      const onChange = (page) => {
        togglePageNumber(page)
      }
      const errorAlert = <Alert message="Server error! Please try later" type="error" />
      const { articles, articlesCount } = useSelector((state) => state.article)
      const { isLoading } = useSelector((state) => state.ui)
      const content =
        !isLoading && articles.length ? (
          <>
            <ul className={styles.list}>
              {isError && errorAlert}
              {articles.map((item) => (
                <ArticleCard key={item.slug} data={item} />
              ))}
            </ul>
            <Pagination
          className={styles['list__pagination']}
          onChange={onChange}
          current={pageNumer}
          size="small"
          total={articlesCount}
        />
      </>
    ) : (
      <Spin className={styles['list__spin']} size="large" />
    )
  return content
 
}

export default ArticleList