import Link from 'next/link'
import fetchJson from "lib/fetchJson";

const Heading = ({ user, mutateUser, responden }) => {
  async function handleLogout(e) {
    e.preventDefault()
    await mutateUser(fetchJson("/api/logout", { method: 'POST' }))
  }

  return (
    <div className="fixed w-full top-0 h-auto bg-white border-b border-blue-200 z-50">
      <div className="flex space-x-2 max-w-5xl mx-auto py-4 px-6 items-center">
        <div className="flex-grow flex items-center space-x-2">
          <Link href="/">
            <a className="group flex items-center space-x-2 text-gray-600 hover:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <p className="border-l-4 border-gray-200 hover:border-yellow-400 pl-2 text-lg leading-tight font-bold text-blue-600 group-hover:text-pink-600">
                Survei Rumah Tangga<br/>
                AMDAL PTFI - 2021
              </p>
            </a>
          </Link>
          <div className="flex-grow"></div>
        </div>
        {/* <div className="flex-grow">
          <p className="inline-block text-lg leading-tight font-bold text-blue-600">Survei Rumah Tangga<br/>AMDAL PTFI - 2021</p>
        </div> */}
        <div className="flex items-center space-x-4">
          <span className="font-bold">{user.fullname}</span>
          <button onClick={handleLogout} className="rounded border border-gray-300 focus:outline-none focus:border-red-500 hover:border-red-500 hover:text-red-500 px-4 py-1">Logout</button>
        </div>
      </div>
      <div className="bg-blue-800 py-2">
        <div className="flex space-x-2 max-w-5xl mx-auto px-6 items-center">
          <p className="flex-grow text-3xl text-white font-bold">{responden?.nama ? responden.nama : "New Responden"}</p>
          {responden && <div className="flex items-center">
            <p className="text-xl text-blue-300 font-bold pr-3">{responden.desa}</p>
            <p className="text-3xl text-white font-bold pl-3 border-l border-blue-400">{responden.kelompokDesa}</p>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Heading