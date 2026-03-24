export const galleryData = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  image: `https://picsum.photos/300/300?random=${index + 201}`,
}));
