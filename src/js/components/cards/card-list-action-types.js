
export const cardListActions = {

  CARD_ACTIVATE_SUCCEEDED : 'CARD_ACTIVATE_SUCCEEDED', // When complete card request was succefull
  CARD_ACTIVATE_FAILED_NOT_FOUND : 'CARD_ACTIVATE_FAILED_NOT_FOUND', // Service could not find the card to complete

  CARD_COMPLETE_SUCCEEDED : 'CARD_COMPLETE_SUCCEEDED', // When complete card request was succefull
  CARD_COMPLETE_FAILED_NOT_FOUND : 'CARD_COMPLETE_FAILED_NOT_FOUND', // Service could not find the card to complete

  CARDS_FILTER_CHANGED : 'CARDS_FILTER_CHANGED',
  
  CARDS_FETCHED : 'CARDS_FETCHED',

  DELETE_CARD_BEFORE_SUBMIT : 'DELETE_CARD_BEFORE_SUBMIT', // Before submitting the delete card request to the server
  DELETE_CARD_SUCCEEDED : 'DELETE_CARD_SUCCEEDED',   // Service reported that the card was delete or not found.

  EDIT_CARD : 'EDIT_CARD', // When the user want to edit a card
  EDIT_CARD_CANCELED : 'EDIT_CARD_CANCELED', // When the user changes their mind about an edit 
  EDIT_CARD_BEFORE_SUBMIT : 'EDIT_CARD_BEFORE_SUBMIT',  // Before submittin an update to the server
  EDIT_CARD_SUCCEEDED : 'EDIT_CARD_SUCCEEDED',   // If the card update was successful
  EDIT_CARD_FAILED_VALIDATION : 'EDIT_CARD_FAILED_VALIDATION',   // Service reported an error when updating a card
  EDIT_CARD_FAILED_NOT_FOUND  : 'EDIT_CARD_FAILED_NOT_FOUND'   // Service could not find the card to apply the update to
}
