import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import NewTechSlider from '../components/NewTechSlider';

export default function Home() {
  const [newTech, setNewTech] = useState([]);

  useEffect(() => {
    // Загружаем последнюю добавленную технику для слайдера
    const fetchNewTech = async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('is_new', true)
        .limit(5);
      if (!error) setNewTech(data);
    };
    fetchNewTech();
  }, []);

  const categories = [
    { name: 'Наземная техника', slug: 'ground', icon: '🚜', description: 'От легких разведывательных машин до тяжелых основных боевых танков.' },
    { name: 'Воздушная техника', slug: 'air', icon: '✈️', description: 'Истребители, бомбардировщики, вертолеты и беспилотники.' },
    { name: 'Морская техника', slug: 'naval', icon: '🚢', description: 'Надводные корабли и подводные лодки всех классов.' },
    { name: 'Боеприпасы', slug: 'munitions', icon: '💣', description: 'Все, что служит для поражения цели: от пуль до межконтинентальных ракет.' },
  ];

  return (
    <>
      <Head>
        <title>Военная Энциклопедия | IronWiki</title>
        <meta name="description" content="Современная энциклопедия военной техники и вооружений со всего мира." />
      </Head>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-accent">IRON</span>WIKI
          </h1>
          <p className="hero-subtitle">
            Самая полная и современная энциклопедия военной техники. От первых танков до новейших истребителей.
          </p>
          <Link href="/catalog">
            <a className="cta-button">Начать Исследование</a>
          </Link>
        </div>
      </section>

      {/* Новинки */}
      {newTech.length > 0 && (
        <section className="new-tech-section">
          <div className="container">
            <h2>Новейшие Добавления</h2>
            <NewTechSlider items={newTech} />
          </div>
        </section>
      )}

      {/* Категории */}
      <section className="categories-section">
        <div className="container">
          <h2>Исследуйте по Категориям</h2>
          <div className="categories-grid">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/catalog/${cat.slug}`}>
                <a className="category-card">
                  <div className="category-icon">{cat.icon}</div>
                  <h3>{cat.name}</h3>
                  <p>{cat.description}</p>
                  <div className="card-hover-effect"></div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="cta-section">
        <div className="container">
          <h2>Станьте экспертом в военной технике</h2>
          <p>Наша база данных постоянно пополняется. Исследуйте, изучайте, открывайте для себя мир военных технологий.</p>
          <Link href="/catalog">
            <a className="cta-button secondary">Перейти в Каталог</a>
          </Link>
        </div>
      </section>
    </>
  );
}
