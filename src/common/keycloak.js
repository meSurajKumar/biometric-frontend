// src/keycloak.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080', // Replace with your Keycloak server URL
  realm: 'biometric_realm',               // Replace with your Keycloak realm
  clientId: 'biometric-client-app',        // Replace with your Keycloak client ID
});

export default keycloak;
