import Link from 'next/link';

export default function NewTechSlider({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="new-tech-slider">
      {items.map((item) => (
        <Link key={item.id} href={`/item/${item.slug}`}>
          <a className="new-tech-item">
            <div className="new-badge">NEW</div>
            {item.image_url && (
              <img 
                src={item.image_url} 
                alt={item.name}
                className="tech-image"
                loading="lazy"
              />
            )}
            <h4>{item.name}</h4>
            <p>{item.short_description}</p>
          </a>
        </Link>
      ))}
    </div>
  );
}
