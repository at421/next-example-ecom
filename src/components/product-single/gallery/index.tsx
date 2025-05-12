import Image from "next/image";

type GalleryProductType = {
  images: string[];
};

const Gallery = ({ images }: GalleryProductType) => {
  const featImage = images[0];

  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {images.map((image) => (
          <div key={image} className="product-gallery__thumb" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image src={image} alt="" fill />
          </div>
        ))}
      </div>

      <div className="product-gallery__image" style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image src={featImage} alt="" fill />
      </div>
    </section>
  );
};

export default Gallery;