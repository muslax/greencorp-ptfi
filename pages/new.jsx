import Head from 'next/head'
import Link from 'next/link'
import useUser from "hooks/useUser";
import Heading from 'components/Heading';

export default function NewEntry() {
  const { user, mutateUser } = useUser({ redirectTo: "/" })

  if (!user?.isLoggedIn) return null

  return (
    <div className="bg-blue-50 min-h-screen pb-40">
      <Head>
        <title>New Responden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading user={user} mutateUser={mutateUser} />

      <div className="spacer h-24"></div>

      <div className="max-w-5xl mx-auto px-6">
        {/* <Responden user={user} responden={null} /> */}
      </div>
    </div>
  )
}