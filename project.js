$(document).ready(() => {

// Make the deck
  let renderDeck = $.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

  renderDeck.done(function(data) {
      if (renderDeck.status !== 200) {
          return;
      }

      console.log(data);

// Isolate the deck ID for use in further AJAX calls
  let deckID = data["deck_id"]
  console.log(deckID)

// Deal a card
  let dealCard = $.getJSON('https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');

  let a = 'https://deckofcardsapi.com/api/deck/' + deckID + '<<deck_id>>/draw/?count=1'
  console.log(a)
  dealCard.done(function(data) {
      if (dealCard.status !== 200) {
          return;
      }

      console.log(data);

      let newCard = data

// Shuffle the deck
  let shuffleDeck = $.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  shuffleDeck.done(function(data) {
    if (shuffleDeck.status !== 200) {
        return;
    }

    console.log(data);

    let playAgain = data



  })
  })
  })
})
