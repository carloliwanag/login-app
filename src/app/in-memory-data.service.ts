import { Injectable } from '@angular/core';

import { RequestInfo } from 'angular-in-memory-web-api/interfaces';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  constructor() {}

  createDb() {
    // this can be ignored
    const users = [
      { id: 1, username: 'fred92', password: '1234' },
      { id: 2, username: 'john69', password: 'abcd' },
    ];

    const authentication = [];

    return { users, authentication };
  }

  // HTTP POST interceptor
  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'authentication')
      return this.authenticate(reqInfo);

    //  otherwise default response of In-memory DB
    return undefined;
  }

  // mocking authentication happens here
  // HTTP POST interceptor handler
  private authenticate(reqInfo: RequestInfo) {
    // return an Observable response
    return reqInfo.utils.createResponse$(() => {
      const { headers, url, req } = reqInfo;

      const { username, password } = req['body'];
      if (username === 'carlo' && password === '1234')
        return {
          status: 200,
          headers,
          url,
          body: {
            status: true,
            data: {
              token: 'your access token is here',
            },
          },
        };

      return {
        status: 401,
        headers,
        url,
        body: {
          status: false,
          data: {
            message:
              'The email address or the password you inputted is incorrect.',
          },
        },
      };
    });
  }
}
