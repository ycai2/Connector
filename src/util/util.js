export const reduceRequirement = (requirement, elimination) => {
  Object.keys(requirement).forEach((color) => {
    if (color in elimination && requirement[color] > 0) {
      requirement[color] -= elimination[color];
    }
  });
  return requirement;
};
