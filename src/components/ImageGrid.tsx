import { type ImageCell } from '@/core';

type ImageGridProps = {
  images: ImageCell[];
  onClick?: (image: ImageCell) => void;
};

export const ImageGrid = ({ images, onClick }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-5 gap-5">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition"
          onClick={() => onClick?.(image)}
        >
          <img src={image.imageUrl} alt={image.primaryText} />
          <div className="p-3 text-center">
            <p className="text-sm font-semibold truncate">{image.primaryText}</p>
            {image.secondaryText && <p className="text-blue-400 font-semibold text-sm truncate">{image.secondaryText}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};