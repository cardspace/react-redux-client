// Configuration setting for the local dev environment.
//
//  These are aliased in the appropriate webpack config the settings
//  are accessed vi:
//
//      import config from 'config'
//
//  NOTE - these setting are for running a local copy of the client against the
//         the deployed development api.  
//
//  https://m.mattmclaugh.com/application-environment-configuration-with-webpack-238dd0015e42#.lba80s5so

export const cards_url = 'https://cardspace-api-dev.herokuapp.com/v1/cards';
export const card_url = 'https://cardspace-api-dev.herokuapp.com/v1/card';

export const auth0_client_id = 'NP5BF3hkstyAEyg1J3boW6xXmOVGnHj3';
export const auth0_domain = 'wipmoore.eu.auth0.com';
export const auth0_redirectUrl = 'http://localhost:8080/user-authenticated';