export interface Result<T> {
  code: string;
  msg: string;
  list?: Array<T>;
  count?: number;
}
