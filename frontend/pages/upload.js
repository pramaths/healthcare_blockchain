import dynamic from 'next/dynamic';

const UploadHealthDataWithNoSSR = dynamic(
  () => import('../components/UploadHelathdata'),
  { ssr: false }  
);

export default function Page() {
  return <UploadHealthDataWithNoSSR />;
}
