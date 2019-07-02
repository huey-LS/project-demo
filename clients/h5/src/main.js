import account from '@packages/account';

document.getElementById('application').innerHTML = `
  h5: ${account.getName()}, welcome.
`

// Array.from(['aaa']);