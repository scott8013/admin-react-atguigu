import { MouseEvent } from 'react'
import './index.less'
import { useEffect, useState } from 'react'
import { getWeather } from '../../api'
import { useResolvedPath, useNavigate } from 'react-router-dom'
const Header = () => {
  const [data, setData] = useState({})
  // @ts-ignore
  useEffect(() => {
    let isUnmount = false
    ;(async () => {
      // @ts-ignore
      const [msg] = await getWeather()
      !isUnmount && setData(() => ({ ...msg }))
    })()
    return () => (isUnmount = true)
  }, [])
  const { pathname } = useResolvedPath(location.pathname)
  console.log(pathname)

  const navigator = useNavigate()
  const handleExit = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    localStorage.removeItem('user_key')
    location.reload()
  }
  return (
    <div className={'header'}>
      <div className="header-top">
        <span>欢迎，{JSON.parse(localStorage.getItem('user_key') as string)?.username}</span>
        <a className={'exit-text'} href="#" onClick={(e) => handleExit(e)}>
          退出
        </a>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">首页</div>
        <div className="header-bottom-right center-horizontally flex-end">
          {/*@ts-ignore*/}
          <span className="datetime">{data?.reporttime}</span>
          {/*@ts-ignore*/}
          <span className="city">{data?.city}</span>
          {/*@ts-ignore*/}
          <span>{data?.weather}</span>
        </div>
      </div>
    </div>
  )
}

export default Header
