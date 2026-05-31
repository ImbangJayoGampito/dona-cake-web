import { useState } from 'react';
import { Button } from '@/components/ui/button'; // adjust path to your shadcn button

const CATEGORIES = ['Semua', 'Ulang Tahun', 'Pernikahan', 'Anniversary', 'Vegan Series', 'Pastry'];

export default function Categories() {
  const [active, setActive] = useState('Semua');

  return (
    <section className="w-full py-4">
      <div className="container mx-auto flex flex-wrap gap-2 justify-center md:justify-start">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={active === cat ? 'default' : 'outline'}
            onClick={() => setActive(cat)}
            className="rounded-full px-4 py-2 text-sm font-medium transition-all"
          >
            {cat}
          </Button>
        ))}
      </div>
    </section>
  );
}
