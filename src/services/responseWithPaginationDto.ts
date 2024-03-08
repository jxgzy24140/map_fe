export default interface IResponseWithPagination<T> {
  result: T | T[];
  total: number;
  pageSize: number;
  currentPage: number;
}
