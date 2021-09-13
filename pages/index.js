import Head from 'next/head'
import Link from 'next/link'
import useUser from 'hooks/useUser'
import fetchJson from 'lib/fetchJson'

import Login from 'components/Login'

export default function Home() {
  const { user, mutateUser } = useUser()

  async function handleLogout(e) {
    e.preventDefault()
    await mutateUser(fetchJson("/api/logout", { method: 'POST' }))
  }

  if (!user || !user.isLoggedIn) return <Login mutateUser={mutateUser} />

  return (
    <div className="bg-blue-50 min-h-screen pb-40">
      <Head>
        <title>Survey AMDAL PTFI 2021</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white border-b border-blue-200">
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-3xl font-bold mt-2 mb-4">
            Survey Rumah Tangga<br/>AMDAL PTFI 2021
          </h1>
          <div className="flex items-end space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-blue-600 h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            <p className="flex-grow text-2xl font-bold">{user.fullname}</p>
            <Link href="/new">
              <a
              className="rounded bg-blue-500 text-white font-medium px-4 py-2 focus:outline-none focus:bg-blue-600 hover:bg-blue-600 active:bg-blue-700"
              >New Responden</a>
            </Link>
            <button onClick={handleLogout}
            className="rounded bg-gray-200 font-medium focus:outline-none hover:text-red-600 px-4 py-2"
            >Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">

        <p className="mb-4">
        Imperdiet magnis massa mauris egestas pulvinar blandit quam tristique
        mattis, luctus finibus suspendisse lacus dignissim mus maecenas rutrum
        vehicula, at ligula suscipit habitasse fermentum erat sed risus
        interdum, maximus non vel volutpat habitant dictum litora himenaeos.
        Quis ultrices porta volutpat habitant massa purus elit cras nisi
        dignissim, aenean dolor nec augue justo magna urna eleifend tortor, dui
        penatibus amet lacinia est platea ex interdum id, vel netus libero ad
        condimentum commodo sagittis integer erat. Magna commodo netus mollis
        ultricies parturient pulvinar ridiculus hac accumsan, habitant platea
        montes nostra laoreet rutrum vivamus finibus eu, sem dapibus sociosqu
        condimentum consequat dignissim dolor orci, lectus viverra ex urna lorem
        vehicula metus integer. Scelerisque etiam egestas torquent aliquet a
        feugiat at potenti efficitur, malesuada cras imperdiet ornare cursus
        eleifend arcu eu dui, ultrices amet dolor sem dis duis magna vehicula
        inceptos suspendisse, nisi fusce parturient accumsan leo consequat
        bibendum pharetra. Ullamcorper vel condimentum montes neque felis quis
        ipsum facilisis adipiscing, maecenas lectus aliquam senectus vitae ex
        risus tincidunt vestibulum, finibus suscipit ad blandit ligula lobortis
        vivamus mollis, netus metus pretium etiam tempor torquent nam a.
        </p>
        {/* <MyResponden user={user} /> */}
      </div>
    </div>
  )
}
