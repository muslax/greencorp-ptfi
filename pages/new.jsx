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

      <div className="spacer h-24"></div>

      <div className="max-w-5xl mx-auto px-6">
        <Responden user={user} responden={null} />
      </div>
    </div>
  )
}
