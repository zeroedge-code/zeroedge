
'use client';
import { useEffect, useState } from 'react';

export function LivePrice() {
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchPrice() {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=aster&vs_currencies=usd', { cache: 'no-store' });
      const data = await res.json();
      if (data?.aster?.usd !== undefined) {
        setPrice(data.aster.usd);
        setError(null);
      } else {
        setError('N/A');
      }
    } catch (e) {
      setError('N/A');
    }
  }

  useEffect(() => {
    fetchPrice();
    const id = setInterval(fetchPrice, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-sm text-white/70 mt-2">
      {error && !price ? 'ASTER: N/A' : price !== null ? <>ASTER: <span className="text-accent">${price.toFixed(4)}</span></> : 'Loading...'}
    </div>
  );
}
