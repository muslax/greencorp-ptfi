import { useRouter } from "next/router";
import Head from 'next/head'

import useResponden from "hooks/useReponden";
import useUser from "hooks/useUser";
import useConstants from 'hooks/useConstants';

import Heading from 'components/Heading'
import Section from 'components/Section';
import Responden from 'components/form/Responden'
import AnggotaKeluarga from 'components/form/AnggotaKeluarga';
import SosialEkonomi from 'components/form/SosialEkonomi';
import AsetSumberdaya from 'components/form/AsetSumberdaya';
import KlaimAdat from "components/form/KlaimAdat";
import KesehatanMasyarakat from "components/form/KesehatanMasyarakat";
import Persepsi from "components/form/Persepsi";
import Nelayan from "components/form/Nelayan";
import LintasDarat from "components/form/LintasDarat";
import LintasAir from "components/form/LintasAir";
import Nayaro from "components/form/Nayaro";

export default function Index() {
  const { user, mutateUser } = useUser({ redirectTo: "/" });

  const router = useRouter();
  const { id } = router.query;
  const { responden, loadingResponden, mutateResponden } = useResponden(id);
  const { constants, loadingConstants } = useConstants();

  if (!user?.isLoggedIn || loadingResponden || loadingConstants) return null;

  const isOwner = user.fullname == responden.dataEntri;

  return (
    <div className="bg-blue-50 min-h-screen pb-40">
      <Head>
        <title>Responden: {responden.nama}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading user={user} mutateUser={mutateUser} responden={responden} />

      <div className="spacer h-28"></div>

      <Section>
        <Responden user={user} responden={responden} mutateResponden={mutateResponden} />
      </Section>

      {/* <p className="text-3xl text-center my-10">{responden.kelompokDesa}</p> */}

      <Section title="Anggota Keluarga">
        <AnggotaKeluarga user={user} responden={responden} />
      </Section>

      <Section title="Sosial Ekonomi">
        <SosialEkonomi
          user={user}
          isOwner={isOwner}
          responden={responden}
          constants={constants}
          mutate={mutateResponden}
        />
      </Section>

      <Section title="Aset dan Pengelolaan Sumberdaya">
        <AsetSumberdaya
          user={user}
          isOwner={isOwner}
          responden={responden}
          constants={constants}
          mutate={mutateResponden}
        />
      </Section>

      {/* Nayaro, Nawaripi, Koperapoka */}
      {/* ========= */}
      {/* <p className="text-center text-pink-600 p-10">(Sementara belum ada: bagian khusus untuk Desa Nayaro/Nawaripi/Koperapoka)</p> */}
      {(responden.desa == "Nayaro" || responden.desa == "Nawaripi" || responden.desa == "Koperapoka") &&
        <Section title="Untuk Nayaro, Nawaripi, Koperapoka">
        <Nayaro
          user={user}
          isOwner={isOwner}
          responden={responden}
          constants={constants}
        />
      </Section>}

      {responden.kelompokDesa == "B" &&
      <Section title="Dampak Lalu-lintas Darat">
        <LintasDarat
          user={user}
          isOwner={isOwner}
          responden={responden}
          constants={constants}
        />
      </Section>}

      {responden.kelompokDesa == "C" &&
      <Section title="Dampak Lalu-lintas Air">
        <LintasAir
          user={user}
          isOwner={isOwner}
          responden={responden}
          constants={constants}
        />
      </Section>}

      {(responden.kelompokDesa == "B" || responden.kelompokDesa == "C") &&
      <Section title="Dampak Terhadap Nelayan">
        <Nelayan
          user={user}
          isOwner={isOwner}
          responden={responden}
          constants={constants}
        />
      </Section>}

      {(responden.kelompokDesa == "A" || responden.kelompokDesa == "B") &&
      <Section title="Klaim Masyarakat Adat">
        <KlaimAdat
          user={user}
          isOwner={isOwner}
          responden={responden}
          constants={constants}
          mutate={mutateResponden}
        />
      </Section>}

      <Section title="Kesehatan Masyarakat">
        <KesehatanMasyarakat
          user={user}
          isOwner={isOwner}
          responden={responden}
          constants={constants}
          mutate={mutateResponden}
        />
      </Section>

      <Section title="Persepsi Masyarakat">
        <Persepsi
          user={user}
          isOwner={isOwner}
          responden={responden}
          constants={constants}
        />
      </Section>

      <div className="h-80"></div>
    </div>
  )
}