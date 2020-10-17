import Image from "../models/Image";

export default {
  render(images: Image) {
    return {
      id: images.id,
      url: `http://localhost:3333/uploads/${images.path}`,
    };
  },
  renderMany(images: Image[]) {
    return images.map((image) => this.render(image));
  },
};
