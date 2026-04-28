export type GalleryItem = {
  id: number;
  image: string;
};

const GALLERY_SIZE = 8;

export function createGalleryItem(photoId: number): GalleryItem {
  return {
    id: photoId,
    image: `https://picsum.photos/seed/react-native-labs-${photoId}/300/300`,
  };
}

export function createRandomGallery(size = GALLERY_SIZE): GalleryItem[] {
  const photoIds = new Set<number>();

  while (photoIds.size < size) {
    photoIds.add(Math.floor(Math.random() * 100000) + 1000);
  }

  return Array.from(photoIds, createGalleryItem);
}

export const galleryData: GalleryItem[] = Array.from(
  { length: 8 },
  (_, index) => createGalleryItem(index + 1),
);
