// src/app/[locale]/error.js
'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>{error.message || 'Something went wrong!'}</h2>
      <button onClick={reset}>
        Try again
      </button>
    </div>
  )
}