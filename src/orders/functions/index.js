function getPagination(query) {
  const page = query.page ? Math.abs(query.page) : 1;
  const limit = query.limit ? Math.abs(query.limit) : 10;
  const skip = (page - 1) * limit;
  return {
    skip,
    limit,
  };
}

function handlePageCount(page, length, limit, total_count) {
  let current_count = (page - 1) * limit;
  current_count = current_count + length;
  let page_count = Math.ceil(total_count / limit);
  return { current_count, page_count };
}

module.exports = { getPagination, handlePageCount };
