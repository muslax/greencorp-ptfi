import Head from 'next/head'
import fetchJson from "lib/fetchJson";

const Login = ({ mutateUser }) => {
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const body = {
        username: e.currentTarget.username.value.toLowerCase(),
        password: e.currentTarget.password.value,
      }
      await mutateUser(
        fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(body),
        })
      )
      // router.push('/protected') // ROUTES.Dashboard
    } catch (error) {
      console.error('An unexpected error happened:', error)
      // setErrorMessage(error.data.message)
    }
  }

  const inputStyle = `w-full mb-3 px-3 py-2 rounded border-2 border-gray-300
  font-extrabold tracking-wide focus:outline-none focus:border-blue-400`

  return (
    <>
      <Head>
        <title>ACES</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg--yellow-50 flex flex-col items-center justify-center min-h-screen">
        <div className="w-72 bg-white p-3">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              required={true}
              placeholder="username"
              className="w-full bg-blue-50 font-bold h-10 mb-3"
            />

            <input
              type="password"
              name="password"
              required={true}
              placeholder="password"
              className="w-full bg-blue-50 font-bold h-10 mb-3"
            />
            <button
              className={`w-full rounded py-2 bg-blue-500 text-white font-extrabold tracking-wide
              border-2 border-transparent focus:outline-none focus:border-blue-700
              `}
            >Submit</button>
          </form>
        </div>
      </main>
    </>
  )
}

export default Login