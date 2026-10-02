const DEFAULT_PAGE_SIZE = 25;
const MAX_PAGE_SIZE = 50;
const MAX_PAGE_NUMBER = 10000;

function parsePageNumber(value) {
  if (typeof value !== "string" || !/^\d{1,8}$/.test(value)) return 1;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0
    ? Math.min(parsed, MAX_PAGE_NUMBER)
    : 1;
}

function getPagination(pageValue, total, pageSize = DEFAULT_PAGE_SIZE) {
  const safePageSize = Number.isSafeInteger(pageSize)
    ? Math.min(Math.max(pageSize, 1), MAX_PAGE_SIZE)
    : DEFAULT_PAGE_SIZE;
  const safeTotal = Number.isSafeInteger(total) && total >= 0 ? total : 0;
  const totalPages = Math.max(1, Math.ceil(safeTotal / safePageSize));
  const page = Math.min(parsePageNumber(pageValue), totalPages, MAX_PAGE_NUMBER);

  return {
    page,
    pageSize: safePageSize,
    total: safeTotal,
    totalPages,
    skip: (page - 1) * safePageSize,
  };
}

module.exports = { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, getPagination, parsePageNumber };
