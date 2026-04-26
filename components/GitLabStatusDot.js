import { useState, useEffect } from 'react'

export default function GitLabStatusDot() {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch('/api/gitlab-status')
        const data = await res.json()
        setStatus(data.status)
      } catch (err) {
        setStatus('down')
      }
    }
    checkStatus()
  }, [])

  const getClassName = () => {
    if (status === 'loading') return 'p-infra-dot p-infra-dot-loading'
    if (status === 'up') return 'p-infra-dot p-infra-dot-up'
    return 'p-infra-dot p-infra-dot-down'
  }

  return (
    <div 
      className={getClassName()} 
      title={status === 'loading' ? 'Checking status...' : `GitLab is ${status}`}
    />
  )
}
