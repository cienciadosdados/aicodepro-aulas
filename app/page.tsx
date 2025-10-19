'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirecionar automaticamente para aula1
    router.push('/aula1');
  }, [router]);
  
  return null;
}
