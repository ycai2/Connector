export const reduceRequirement = (requirement, elimination) => {
  Object.keys(requirement).forEach((color) => {
    if (color in elimination) {
      requirement[color] -= elimination[color];
      if (requirement[color] < 0) {
        requirement[color] = 0;
      }
    }
  });
  return requirement;
};
