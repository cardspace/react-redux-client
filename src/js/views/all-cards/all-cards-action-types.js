// Note - the following errors are reported using the general error events:

//   * authentication
//   * permission
//   * internal server
//   * unknown 

export const allCardsActions = {
  ADD_CARD_BEFORE_SUBMIT : 'allCards.ADD_CARD_BEFORE_SUBMIT',   // Before submitting the new card to the server
  ADD_CARD_SUCCEEDED : 'allCards.ADD_CARD_SUCCEEDED',   // If the card is succesfully created.
  ADD_CARD_FAILED_VALIDATION : 'allCards.ADD_CARD_FAILED_VALIDATION', // Service reported and error when creating a card

  EDIT_CARD : 'allCards.EDIT_CARD', // When the user want to edit a card
  EDIT_CARD_CANCELED : 'allCards.EDIT_CARD_CANCELED', // When the user changes their mind about an edit 
  EDIT_CARD_BEFORE_SUBMIT : 'allCards.EDIT_CARD_BEFORE_SUBMIT',  // Before submittin an update to the server
  EDIT_CARD_SUCCEEDED : 'allCards.EDIT_CARD_SUCCEEDED',   // If the card update was successful
  EDIT_CARD_FAILED_VALIDATION : 'allCards.EDIT_CARD_FAILED_VALIDATION',   // Service reported an error when updating a card
  EDIT_CARD_FAILED_NOT_FOUND  : 'allCards.EDIT_CARD_FAILED_NOT_FOUND',   // Service could not find the card to apply the update to

  DELETE_CARD_BEFORE_SUBMIT : 'allCards.DELETE_CARD_BEFORE_SUBMIT', // Before submitting the delete card request to the server
  DELETE_CARD_SUCCEEDED : 'allCards.DELETE_CARD_SUCCEEDED',   // Service reported that the card was delete or not found.

  CARDS_FETCHED : 'allCards.CARDS_FETCHED'
}

export const allCardsErrorMessages = {
  EDIT_CARD_FAILED_NOT_FOUND: 'This card has been deleted while you were editing it.'
}
