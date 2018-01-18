export const findColor = (props, colors) => {
  const color = Object.keys(props).find(k => colors[k]);

  return colors[color || 'primary'];
};
