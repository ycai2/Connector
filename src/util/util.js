export const reduceRequirement = (requirement, elimination) => {
  Object.keys(requirement).forEach((color) => {
    if (color in elimination) {
      requirement[color] -= elimination[color];
    }
  });
  return requirement;
};
