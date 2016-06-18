module.exports = function getIdFromPath() {
  const id = document.location.pathname.split('/').pop();
  return parseInt(id, 10);
};
