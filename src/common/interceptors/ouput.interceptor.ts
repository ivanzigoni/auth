// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { Observable, tap } from 'rxjs';

// @Injectable()
// export class OutputInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     console.log('Before...');

//     const now = Date.now();
//     return next.handle().pipe(
//       tap((teste) => {

//         return teste;
//       }),
//     );
//   }
// }
