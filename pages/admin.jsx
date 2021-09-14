import { useEffect, useState } from 'react'
import Head from 'next/head'

import useUser from 'hooks/useUser'
import useConstants from 'hooks/useConstants'
import fetchJson from 'lib/fetchJson'
import { generatePOSTData } from 'lib/utils'

import Heading from 'components/Heading'
import ConstantsEditor from 'components/ConstatsEditor'

export default function AdminPage() {
  const { user, mutateUser } = useUser({ redirectTo: "/" })
  const { constants, loadingConstants, mutateConstants } = useConstants();

  const [selected, setSelected] = useState({})
  const [localConstants, setLocalConstants] = useState(null)

  useEffect(() => {
    if (constants) setLocalConstants(constants)
  }, [constants])

  async function updateConstants(e) {
    try {
      let array = [...constants[selected.key]]
      array[selected.index] = selected.value
      console.log({ key: selected.key, value: array })
      // return;
      await fetchJson("/api/post?q=update-constants", generatePOSTData({
        key: selected.key,
        value: array
      }));
      setSelected(null)
      mutateConstants();
    } catch (error) {
      alert("ERROR");
    }
  }

  function handleClick(e, key, index, value) {
    // e.stopPropagation();
    setSelected({ key: key, index: index, value: value })
  }

  if (!user?.isLoggedIn || loadingConstants || !localConstants) return null;

  if (user?.type != "admin") return (
    <div className="bg-blue-50 min-h-screen pb-40">
      <Head>
        <title>New Responden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="text-center my-20">
        <span className="block py-2">UNAUTHORIZED ACCESS</span>
      </p>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </div>
  )

  return (
    <div className="bg-blue-50 min-h-screen pb-40">
      <Head>
        <title>New Responden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading user={user} mutateUser={mutateUser} />

      <div className="max-w-5xl mx-auto px-6 pt-28">
        <div className="flex">
          {/* left */}
          <div className="w-[125px] border-r border-blue-200">
            <div className="fixed w-[125px] pt-3 text-xs font-medium">
              <p className="py-2 border-b border-blue-200">Desa</p>
              <p className="py-2 border-b border-transparent hover:border-blue-200">Enumerator</p>
              <p className="py-2 border-b border-transparent hover:border-blue-200">Data Entri</p>
              <p className="py-2 border-b border-transparent hover:border-blue-200">Supervisor</p>
              <p className="py-2 border-b border-transparent hover:border-blue-200">Konstanta</p>
              <pre>
                {/* {Object.keys(constants).map(k => <p key={k}>{k}</p>)} */}
              </pre>
            </div>
          </div>
          {/* main */}
          <div className="flex-grow min-h-screen pl-6">
            <h2 className="text-xl font-bold mb-4">Daftar Desa</h2>
            <div className="border-l-4 border-blue-500 pl-4">
              {localConstants?.Desa.map(d => (
                <p key={d.nama} className="mb-2">Kelompok {d.kelompok} - {d.nama}</p>
              ))}
            </div>

            <h2 className="text-xl font-bold mt-8 mb-4">Daftar Enumertor</h2>
            <ConstantsEditor
              keyName="Enumerator"
              constants={constants}
              localConstants={localConstants}
              setLocalConstants={setLocalConstants}
              selected={selected}
              setSelected={setSelected}
              handleClick={handleClick}
              updateConstants={updateConstants}
              mutate={mutateConstants}
            />

            <h2 className="text-xl font-bold mt-8 mb-4">Konstanta Hubungan Keluarga</h2>
            <ConstantsEditor
              keyName="Hubungan"
              constants={constants}
              localConstants={localConstants}
              setLocalConstants={setLocalConstants}
              selected={selected}
              setSelected={setSelected}
              handleClick={handleClick}
              updateConstants={updateConstants}
              mutate={mutateConstants}
            />

            <h2 className="text-xl font-bold mt-8 mb-4">Konstanta Hubungan Pendidikan</h2>
            <ConstantsEditor
              keyName="Pendidikan"
              constants={constants}
              localConstants={localConstants}
              setLocalConstants={setLocalConstants}
              selected={selected}
              setSelected={setSelected}
              handleClick={handleClick}
              updateConstants={updateConstants}
              mutate={mutateConstants}
            />

            <h2 className="text-xl font-bold mt-8 mb-4">Konstanta Pekerjaan Utama</h2>
            <ConstantsEditor
              keyName="Pekerjaan"
              constants={constants}
              localConstants={localConstants}
              setLocalConstants={setLocalConstants}
              selected={selected}
              setSelected={setSelected}
              handleClick={handleClick}
              updateConstants={updateConstants}
              mutate={mutateConstants}
            />

            <h2 className="text-xl font-bold mt-8 mb-4">Konstanta Pekerjaan Lain</h2>
            <ConstantsEditor
              keyName="PekerjaanLain"
              constants={constants}
              localConstants={localConstants}
              setLocalConstants={setLocalConstants}
              selected={selected}
              setSelected={setSelected}
              handleClick={handleClick}
              updateConstants={updateConstants}
              mutate={mutateConstants}
            />

            <h2 className="text-xl font-bold mt-8 mb-4">Konstanta Agama</h2>
            <ConstantsEditor
              keyName="Agama"
              constants={constants}
              localConstants={localConstants}
              setLocalConstants={setLocalConstants}
              selected={selected}
              setSelected={setSelected}
              handleClick={handleClick}
              updateConstants={updateConstants}
              mutate={mutateConstants}
            />

            <h2 className="text-xl font-bold mt-8 mb-4">Konstanta Suku</h2>
            <ConstantsEditor
              keyName="Suku"
              constants={constants}
              localConstants={localConstants}
              setLocalConstants={setLocalConstants}
              selected={selected}
              setSelected={setSelected}
              handleClick={handleClick}
              updateConstants={updateConstants}
              mutate={mutateConstants}
            />

            <h2 className="text-xl font-bold mt-8 mb-4">Konstanta Bidang Usaha</h2>
            <ConstantsEditor
              keyName="BidangUsaha"
              constants={constants}
              localConstants={localConstants}
              setLocalConstants={setLocalConstants}
              selected={selected}
              setSelected={setSelected}
              handleClick={handleClick}
              updateConstants={updateConstants}
              mutate={mutateConstants}
            />

            <h2 className="text-xl font-bold mt-8 mb-4">Konstanta Pendapatan Usaha</h2>
            <ConstantsEditor
              keyName="PendapatanUsaha"
              constants={constants}
              localConstants={localConstants}
              setLocalConstants={setLocalConstants}
              selected={selected}
              setSelected={setSelected}
              handleClick={handleClick}
              updateConstants={updateConstants}
              mutate={mutateConstants}
            />

            <h2 className="text-xl font-bold mt-8 mb-4">Konstanta Kendala Usaha</h2>
            <ConstantsEditor
              keyName="KendalaUsaha"
              constants={constants}
              localConstants={localConstants}
              setLocalConstants={setLocalConstants}
              selected={selected}
              setSelected={setSelected}
              handleClick={handleClick}
              updateConstants={updateConstants}
              mutate={mutateConstants}
            />

            <h2 className="text-xl font-bold mt-8 mb-4">Konstanta Pelatihan Usaha</h2>
            <ConstantsEditor
              keyName="PelatihanUsaha"
              constants={constants}
              localConstants={localConstants}
              setLocalConstants={setLocalConstants}
              selected={selected}
              setSelected={setSelected}
              handleClick={handleClick}
              updateConstants={updateConstants}
              mutate={mutateConstants}
            />

            <h2 className="text-xl font-bold mt-8 mb-4">Konstanta Sumber Pemasukan</h2>
            <ConstantsEditor
              keyName="SumberPemasukan"
              constants={constants}
              localConstants={localConstants}
              setLocalConstants={setLocalConstants}
              selected={selected}
              setSelected={setSelected}
              handleClick={handleClick}
              updateConstants={updateConstants}
              mutate={mutateConstants}
            />

            <h2 className="text-xl font-bold mt-8 mb-4">Konstanta Tingkat Pemasukan</h2>
            <ConstantsEditor
              keyName="TingkatPemasukan"
              constants={constants}
              localConstants={localConstants}
              setLocalConstants={setLocalConstants}
              selected={selected}
              setSelected={setSelected}
              handleClick={handleClick}
              updateConstants={updateConstants}
              mutate={mutateConstants}
            />

            <h2 className="text-xl font-bold mt-8 mb-4">Konstanta Tingkat Pengeluaran</h2>
            <ConstantsEditor
              keyName="TingkatPengeluaran"
              constants={constants}
              localConstants={localConstants}
              setLocalConstants={setLocalConstants}
              selected={selected}
              setSelected={setSelected}
              handleClick={handleClick}
              updateConstants={updateConstants}
              mutate={mutateConstants}
            />
            {/* <pre>{JSON.stringify(constants, null, 2)}</pre> */}
          </div>
        </div>
      </div>
    </div>
  )
}
