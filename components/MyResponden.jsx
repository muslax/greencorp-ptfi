import Link from 'next/link'
import fetchJson from 'lib/fetchJson';
import { generatePOSTData } from 'lib/utils';

import useMyResponden from "hooks/useMyResponden"
import useDaftarResponden from 'hooks/useDaftarResponden';
import { useState } from 'react';
import DeleteActionButton from './DeleteActionButton';

export default function MyResponden({ user }) {
  const { daftar, loadingDaftar } = useMyResponden();
  const { daftarResponden, loadingDaftarResponden, mutateDaftarResponden } = useDaftarResponden();

  const [selected, setSelected] = useState(null);

  async function deleteResponden(e) {
    try {
      await fetchJson("/api/post?q=delete-responden", generatePOSTData({ id: selected._id }))
      mutateDaftarResponden()
    } catch (error) {
      alert("ERROR")
    }

    setSelected(null);
  }

  if (loadingDaftarResponden) return (
    <div>
      <h2 className="text-3xl font-bold mt-16 mb-6">Daftar Responden Saya</h2>
      <p>LOADING...</p>
    </div>
  );

  const myDataLength = daftarResponden.filter(d => d.dataEntri == user.fullname ).length;

  return (
    <div>
      <h2 className="text-3xl font-bold mt-16 mb-6">Daftar Responden</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-t border-blue-200" style={{ }}>
          <thead>
          <tr className="border-b border-blue-200 bg-blue-100 font-medium">
              <td className="p-2 w-12">#</td>
              <td className="p-2">Nama Responden</td>
              <td className="p-2 hidden sm:table-cell">Desa</td>
              <td className="p-2 hidden md:table-cell">Enumerator</td>
              <td className="p-2 hidden md:table-cell w-32">Data Entri</td>
              <td className="p-2 w-12">...</td>
            </tr>
          </thead>

          {daftarResponden.filter(d => d.dataEntri == user.fullname )
          .map((item, index) => (
            <tbody key={item._id} >
              <tr className="border-b border-blue-200">
                <td className="p-2 w-12">{index + 1}</td>
                <td className="p-2 font-bold">
                  <Link href={`/res/${item._id}`}>
                    <a className="hover:text-blue-500">{item.nama}</a>
                  </Link>
                </td>
                <td className="p-2 hidden sm:table-cell">{item.desa}</td>
                <td className="p-2 hidden md:table-cell">{item.enumerator}</td>
                <td className="p-2 hidden md:table-cell">{item.dataEntri}</td>
                <td className="p-2">
                  <button
                    className="block w-6 h-6 m-0 p-0 hover:text-red-500"
                    onClick={e => setSelected(item)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
              {selected?._id == item._id && (
                <tr className="border-b border-blue-200 bg-gradient-to-b from-blue-100 bg-opacity-30">
                <td colSpan="6" className="py-4 text-center">
                  <DeleteActionButton
                    onCancel={e => setSelected(null)}
                    onDelete={deleteResponden}
                  />
                </td>
                </tr>
              )}
            </tbody>
          ))}
          <tbody>
            {myDataLength > 0 && (daftarResponden.length - myDataLength) > 0 && (
            <tr className="border-b border-blue-200 bg-blue-100 bg-opacity-30">
              <td colSpan="6" className="py-2 text-center">
                Data dari petugas data entri lainnya
              </td>
            </tr>
            )}
            {daftarResponden.filter(d => d.dataEntri != user.fullname )
              .map((item, index) => (
              <tr key={item._id} className="border-b border-blue-200">
                <td className="p-2 w-12">{myDataLength + index + 1}</td>
                <td className="p-2 font-bold">
                  <Link href={`/res/${item._id}`}>
                    <a className="hover:text-blue-500">{item.nama}</a>
                  </Link>
                </td>
                <td className="p-2 hidden sm:table-cell">{item.desa}</td>
                <td className="p-2 hidden md:table-cell">{item.enumerator}</td>
                <td className="p-2 hidden md:table-cell">{item.dataEntri}</td>
                <td className="p-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}