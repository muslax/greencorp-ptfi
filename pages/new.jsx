import useUser from 'hooks/useUser'
import Head from 'next/head'

import useConstants from 'hooks/useConstants'
import Heading from 'components/Heading'
import Responden from 'components/form/Responden'

export default function NewEntry() {
  const { user, mutateUser } = useUser({ redirectTo: "/" })
  const { constants, loadingConstants } = useConstants();

  if (!user?.isLoggedIn || loadingConstants) return null;

  return (
    <div className="bg-blue-50 min-h-screen pb-40">
      <Head>
        <title>New Responden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading user={user} mutateUser={mutateUser} />

      <div className="spacer h-36"></div>

      <div className="max-w-5xl mx-auto px-6">
        <p className="bg-pink-600 px-3 py-2 text-yellow-200 text-center font-bold">
          Perhatian: kolom desa <span className="font-bold">TIDAK</span> bisa
          diubah setelah data tersimpan.
        </p>
        <Responden user={user} responden={null} />
      </div>
    </div>
  )
}
