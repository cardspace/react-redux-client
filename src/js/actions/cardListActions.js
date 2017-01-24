export function editCardInCardList( cardId ) {

    return { type: 'EDIT_CARD_IN_CARD_LIST', payload: cardId }

}

export function cancelEditCarInCardList( cardId ) {

    return { type: 'CANCEL_EDIT_CARD_IN_CARD_LIST', payload: cardId }
}