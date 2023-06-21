function getSlug(input) {
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

  return slug;
}

module.exports = getSlug;
