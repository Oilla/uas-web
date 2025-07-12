// app/result/page.tsx
'use client';

import { Suspense } from 'react';
import ResultClient from 'src/components/ResultClient';

export default function ResultPageWrapper() {
  return (
    <Suspense fallback={<p>Memuat...</p>}>
      <ResultClient />
    </Suspense>
  );
}
