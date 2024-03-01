import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export const NotAllowed = ({ path }) => {

    const router = useRouter();

    useEffect(() => {
        router.replace(path);
    },[])

  return (
    <div>
        <h1>zgFile.</h1>
    </div>
  )
}
