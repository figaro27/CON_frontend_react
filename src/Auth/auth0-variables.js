const production = !(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
);

console.debug('In Production', production);

export const AUTH_CONFIG = {
  domain: 'blockchainnordic.eu.auth0.com',
  clientID:       production ? 'Z4Zb84WmJ3nS4JG44ArGJtUwe88v6POv'     : '3siX1uaYETUcCX3K6Gzrsor1GTKp67o4',
  redirectUri:    production ? 'https://s3-eu-west-1.amazonaws.com/btcn.user.frontend/callback.html' : 'http://localhost:3000/callback_local.html',
  logoutUri:      production ? 'https://blockchainnordic.dk' : 'http://localhost:3000/logout',
  redirectOrigin: production ? 'https://s3-eu-west-1.amazonaws.com'   : 'http://localhost:3000',
  connection:     production ? 'Blockchain-Nordic-DK-NemID-POCES'     : 'Criipto-DK-NemID-POCES',
  audience: 'https://authAPI.nordicblockchain.com/',
}
