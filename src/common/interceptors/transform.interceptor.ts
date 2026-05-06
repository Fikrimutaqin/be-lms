import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

/**
 * Interceptor Global untuk mengubah struktur response aplikasi.
 * Semua response dari Controller akan dibungkus dalam object:
 * {
 *   message: string,
 *   data: any,
 *   meta: object (optional, untuk pagination)
 * }
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data): ApiResponse<T> => {
        // Jika hasil dari service kosong, tetap kembalikan struktur yang rapi
        if (!data) {
          return {
            message: 'Request successful',
            data: null,
          };
        }

        // Cek apakah data yang dikirim service sudah memiliki struktur pagination (berisi data & meta)
        const hasMeta =
          data &&
          typeof data === 'object' &&
          'data' in data &&
          'meta' in data;

        return {
          // Ambil message dari data jika ada, jika tidak pakai default
          message: data.message || 'Request successful',
          // Jika ada meta, berarti data aslinya ada di dalam properti data.data
          data: hasMeta ? data.data : data,
          meta: hasMeta ? data.meta : undefined,
        };
      }),
    );
  }
}
