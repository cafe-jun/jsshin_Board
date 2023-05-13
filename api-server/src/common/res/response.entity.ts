import { Exclude, Expose } from 'class-transformer';
import { ResponseStatus } from './responose-status.enum';

export class ResponseEntities<T> {
  @Exclude() private readonly _res_code: number;
  @Exclude() private readonly _res_msg: string;
  @Exclude() private readonly _data: T;
  @Exclude() private readonly _pageCount: number;
  @Exclude() private readonly _totalCount: number;
  private constructor(
    status: ResponseStatus,
    message: string,
    data: T,
    pageCount: number,
    totalCount: number,
  ) {
    this._res_code = status;
    this._res_msg = message;
    this._data = !data ? null : data;
    this._pageCount = !pageCount ? 1 : pageCount;
    this._totalCount = totalCount;
  }

  static OK_WITH<T>(data: T): ResponseEntities<T> {
    return new ResponseEntities<T>(ResponseStatus.OK, 'success', data, 0, 0);
  }
  static OK_WITH_PAGINATION<T>(
    data: T,
    pageCount: number,
  ): ResponseEntities<T> {
    return new ResponseEntities<T>(
      ResponseStatus.OK,
      'success',
      data,
      pageCount,
      0,
    );
  }
  static OK_WITH_PAGINATION_TOTAL_COUNT<T>(
    data: T,
    pageCount: number,
    totalCount: number,
  ): ResponseEntities<T> {
    return new ResponseEntities<T>(
      ResponseStatus.OK,
      'success',
      data,
      pageCount,
      totalCount,
    );
  }

  static OK_WITH_ITEM_NULL<T>(): ResponseEntities<T> {
    return new ResponseEntities<T>(ResponseStatus.OK, 'success', null, 0, 0);
  }

  static SERVER_ERROR<T>(error): ResponseEntities<T> {
    return new ResponseEntities<T>(
      ResponseStatus.SERVER_ERROR,
      error.message,
      null,
      0,
      0,
    );
  }
  static APP_SERVER_ERROR<T>(code, error): ResponseEntities<T> {
    return new ResponseEntities<T>(code, error, null, 0, 0);
  }
  @Expose()
  get pageCount(): number {
    return this._pageCount || undefined;
  }

  @Expose()
  get totalCount(): number {
    return this._totalCount;
  }

  @Expose()
  get data(): T {
    return this._data || null;
  }

  @Expose()
  get res_code(): number {
    return this._res_code;
  }

  @Expose()
  get res_msg(): string {
    return this._res_msg;
  }
}
