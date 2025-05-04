import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: "http://localhost:8080", // Keycloak base URL
  realm: "biometric_realm",
  clientId: "biometric-client-app"
});

const initKeycloak = () => {
  return new Promise((resolve, reject) => {
    keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false
    }).then(authenticated => {
      if (authenticated) {
        resolve(keycloak);
      } else {
        reject("User is not authenticated");
      }
    }).catch(reject);
  });
};

export { keycloak, initKeycloak };
