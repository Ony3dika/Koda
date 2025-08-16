import user from "../../public/user.jpg";
import male from "../../public/scar.jpg";
export const MaleBodyType = [
  {
    id: 1,
    type: "Rectangle",
    value: "rectangle",
    description: " Straight Silhouette, minimal curves",
    figure: male,
  },
  {
    id: 2,
    type: "Apple",
    value: "apple",
    description: "Fuller mid-section, broader shoulders",
    figure: male,
  },

  {
    id: 3,
    type: "Pear",
    value: "pear",
    description: "Wider hips, narrower shoulders",
    figure: male,
  },
  {
    id: 4,
    type: "Hourglass",
    value: "hourglass",
    description: "Balanced hips, defined waist",
    figure: male,
  },
  {
    id: 5,
    type: "Inverted Triangle",
    value: "inverted triangle",
    description: "Broader shoulders, narrower hips",
    figure: male,
  },
];

export const FemaleBodyType = [
  {
    id: 1,
    type: "Rectangle",
    value: "rectangle",
    description: " Straight Silhouette, minimal curves",
    figure: user,
  },
  {
    id: 2,
    type: "Apple",
    value: "apple",
    description: "Fuller mid-section, broader shoulders",
    figure: user,
  },

  {
    id: 3,
    type: "Pear",
    value: "pear",
    description: "Wider hips, narrower shoulders",
    figure: user,
  },
  {
    id: 4,
    type: "Hourglass",
    value: "hourglass",
    description: "Balanced hips and bust, defined waist",
    figure: user,
  },
  {
    id: 5,
    type: "Inverted Triangle",
    value: "inverted triangle",
    description: "Broader shoulders, narrower hips",
    figure: user,
  },
];

export const styles = [
  { id: 1, value: "casual" },
  { id: 2, value: "formal" },
  { id: 3, value: "streetwear" },
  { id: 4, value: "sporty" },
  { id: 5, value: "minimalist" },
  { id: 6, value: "bohemian" },
  { id: 7, value: "old money" },
  { id: 8, value: "business casual" },
];
