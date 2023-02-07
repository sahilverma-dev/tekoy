import { colors } from "../constants/colors";

export const getRandomColors = () =>
  colors[Math.floor(Math.random() * colors.length)];
