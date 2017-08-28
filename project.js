$(document).ready(() => {
  deckID = ''
  // Make the deck
  let renderDeck = $.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  renderDeck.done(function(data) {
      if (renderDeck.status !== 200) {
        return;
      }
      console.log(data);


  // Isolate the deck ID for use in further AJAX calls
  deckID = data["deck_id"]
  console.log(deckID)



  //Deal a card
  // $('hit-me').click(() => {
  let dealCard = $.getJSON('https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
  dealCard.done(function(data) {
  if (dealCard.status !== 200) {
    return;
  }
    let cardImg = (dealCard.responseJSON.cards[0].image)

    console.log(cardImg)

    $('#dealers-cards').append(<img src=cardImg>)


  })// Let the dealer play it out


  // Calculate to see who wins


  // Shuffle the deck
  // $('#new-hand').click((event) => {
  //   event.preventDefault
  //   let shuffleDeck = $.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  //   shuffleDeck.done(function(data) {
  //   if (shuffleDeck.status !== 200) {
  //     return;
  //   }
  //     console.log(data)
  //           })
  //         })
  //       })
      })
    })
  //  })
