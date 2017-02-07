
export const spacesListActions = {

    SPACES_FETCHED: 'spaces.SPACES_FETCHED', // When the spaces have been loaded from the server

    ADD_SPACE_CANCEL: 'spaces.ADD_SPACE_CANCEL', // Clears the add card form of any data
    ADD_SPACE_BEFORE_SUBMIT: 'spaces.ADD_SPACE_BEFORE_SUBMIT', // before submitting the add to the service
    ADD_SPACE_SUCCEEDED: 'spaces.ADD_SPACE_SUCCEEDED', // if the spaces was successfully add
    ADD_SPACE_FAILED_VALIDATION: 'spaces.ADD_SPACE_FAILED_VALIDATION', // service reported an validation error

    EDIT_SPACE: 'spaces.EDIT_SPACE', // When the user want to edit a space
    EDIT_SPACE_BEFORE_SUBMIT: 'spaces.EDIT_SPACE_BEFORE_SUBMIT', // Before submitting an update to the server
    EDIT_SPACE_SUCCEEDED: 'spaces.EDIT_SPACE_SUCCEEDED', // When a update was successfull
    EDIT_SPACE_FAILED_VALIDATION: 'spaces.EDIT_SPACE_FAILED_VALIDATION', // Service reported an error
    EDIT_SPACE_FAILED_NOT_FOUND: 'space.EDIT_SPACE_FALIED_NOT_FOUND',  // Service could not find the space to apply the updates
    EDIT_SPACE_CANCELED: 'spaces.EDIT_SPACE_CANCELED', // when the user wishes to cancel an edit

    DELETE_SPACE_SUCCEEDED: 'spaces.DELETE_SPACE_SUCCEEDED', // on successfull deletion of a space

    SPACE_COMPLETE_SUCCEEDED: 'spaces.SPACE_COMPLETE_SUCCEEDED', // on completed succceeding
    SPACE_COMPLETE_FAILED_NOT_FOUND: 'spaces.SPACE_COMPLETE_FAILED_NOT_FOUND', // completed failed because the card could not be found

    SPACE_ACTIVATE_SUCCEEDED: 'space.SPACE_ACTIVATE_SUCCEEDED', // on activate succeeding
    SPACE_ACTIVATE_FAILED_NOT_FOUND: 'space.SPACE_ACTIVATE_FAILED_NOT_FOUND'

}


export const spacesListErrorMessages = {
  EDIT_SPACE_FAILED_NOT_FOUND: 'This space has been deleted while you were editing it.',
}
