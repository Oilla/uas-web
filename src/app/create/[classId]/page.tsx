import ClientCreatePage from './CreatePage';

export default function Page({ params }: { params: { classId: string } }) {
  return <ClientCreatePage classId={params.classId} />;
}