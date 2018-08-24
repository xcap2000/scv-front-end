export interface AntiForgeryModel<T> {
  token: string;
  model: T;
}