import account from '@packages/account';
import HttpFetchClient from 'http-fetch-client';

const request = new HttpFetchClient();

document.getElementById('application').innerHTML = `
  web: ${account.getName()}, welcome.
`;


request.get('/')
  .use(() => {
    document.getElementById('application').innerHTML = document.getElementById('application').innerHTML + `
      get / completed;
    `;
  })

// Array.from(['aaa']);