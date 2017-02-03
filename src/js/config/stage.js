// Configuration setting for the local dev environment.
//
//  These are aliased in the appropriate webpack config the settings
//  are accessed vi:
//
//  import config from 'config'
//
//  https://m.mattmclaugh.com/application-environment-configuration-with-webpack-238dd0015e42#.lba80s5so


export const cards_url = 'https://cardspace-api-stage.herokuapp.com/v1/cards';
export const card_url = 'https://cardspace-api-stage.herokuapp.com/v1/card';

export const spaces_url = 'https://cardspace-api-stage.herokuapp.com/v1/spaces';
export const space_url = 'https://cardspace-api-stage.herokuapp.com/v1/space';

export const space_cards_url = 'https://cardspace-api-stage.herokuapp.com/v1/space/:id/cards';

export const auth0_client_id = 'Al6e64WfXSjkVWBuXUEInJldOYDB4pkx';
export const auth0_domain = 'wipmoore.eu.auth0.com';
export const auth0_redirectUrl = 'https://cardspace-stage.firebaseapp.com/user-authenticated';