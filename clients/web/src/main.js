import account from '@packages/account';

document.getElementById('application').innerHTML = `
  web: ${account.getName()}, welcome.
`

// Array.from(['aaa']);