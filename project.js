$(document).ready(() => {
  deckID = ''
  playerScore = []
  dealerScore = []
  totalPlayerScore = 0
  totalDealerScore = 0
  revealCard = null
  hiddenCardImg = null
  hiddenCard = []

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


    // Initialize game, deal first cards to dealer and player
    toDealerHiddenCard()
    toPlayer()
    toDealer()
    toPlayer()


    // Meat and taters of dealing to the dealer
    function toDealer() {
      let dealCard = $.getJSON('https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
      dealCard.done(function(data) {
        if (dealCard.status !== 200) {
          return;
        }
        let cardImg = (dealCard.responseJSON.cards[0].image)
        let cardValue = (dealCard.responseJSON.cards[0]['value'])
        if (cardValue === "JACK") {
          cardValue = "10"
        }
        if (cardValue === "QUEEN") {
          cardValue = "10"
        }
        if (cardValue === "KING") {
          cardValue = "10"
        }
        if (cardValue === "ACE") {
          cardValue = prompt('Do you want your ace to be valued at 1 or 11?')
          if (cardValue !== "1" && cardValue !== '11') {
            prompt('Nice try, please pick either 1 or 11')
          }
        } else {
          cardValue = cardValue
        }

        cardValue = parseInt(cardValue)
        dealerScore.push(cardValue)
        totalDealerScore = dealerScore.reduce(function(sum, value) {
          return sum + value
        })
        console.log(dealerScore)
        $('#dealers-cards').append(`<img src="${cardImg}">`)
      })
    }


    // Dealer's first card face down
    function toDealerHiddenCard() {
      let dealCard = $.getJSON('https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
      dealCard.done(function(data) {
        if (dealCard.status !== 200) {
          return;
        }
        let revealCard = (dealCard.responseJSON.cards[0].image)
        let hiddenCardImg = ('img/backside-card.jpg')
        let hiddenCardValue = (dealCard.responseJSON.cards[0]['value'])
        if (hiddenCardValue === "JACK") {
          hiddenCardValue = "10"
        }
        if (hiddenCardValue === "QUEEN") {
          hiddenCardValue = "10"
        }
        if (hiddenCardValue === "KING") {
          hiddenCardValue = "10"
        }
        if (hiddenCardValue === "ACE") {
          hiddenCardValue = prompt('Do you want your ace to be valued at 1 or 11?')
          if (hiddenCardValue !== "1" && hiddenCardValue !== '11') {
            prompt('Nice try, please pick either 1 or 11')
          }
        } else {
          hiddenCardValue = hiddenCardValue
        }

        hiddenCardValue = parseInt(hiddenCardValue)
        dealerScore.push(hiddenCardValue)
        hiddenCard.push(hiddenCardValue)
        totalDealerScore = dealerScore.reduce(function(sum, value) {
          return sum + value
        })
        console.log(dealerScore)
        console.log(hiddenCardValue)
        console.log(hiddenCard)
        $('#dealers-cards').append(`<img src="${hiddenCardImg}">`)
        // $('#dealers-cards').append(`<img src="${revealCard}">`)
      })
    }

    // Meat and taters of dealing a card to the player
    function toPlayer() {
      let dealCard = $.getJSON('https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
      dealCard.done(function(data) {
        if (dealCard.status !== 200) {
          return;
        }
        let cardImg = (dealCard.responseJSON.cards[0].image)
        let cardValue = (dealCard.responseJSON.cards[0]['value'])
        if (cardValue === "JACK") {
          cardValue = "10"
        }
        if (cardValue === "QUEEN") {
          cardValue = "10"
        }
        if (cardValue === "KING") {
          cardValue = "10"
        }
        if (cardValue === "ACE") {
          cardValue = prompt('Do you want your ace to be valued at 1 or 11?')
          if (cardValue !== "1" && cardValue !== '11') {
            prompt('Nice try, please pick either 1 or 11')
          }
        } else {
          cardValue = cardValue
        }
        cardValue = parseInt(cardValue)
        playerScore.push(cardValue)
        totalPlayerScore = playerScore.reduce(function(sum, value) {
          return sum + value
        }, 0)
        $('#players-cards').append(`<img src="${cardImg}">`)
        if (totalPlayerScore > 21) {
          window.alert('You busted...you lose!')
          location.reload()
        }
      })
    }


    // Hit me
    $('#hit-me').click(() => {
      if (totalPlayerScore < 22) {
        toPlayer()
      }
      console.log(totalPlayerScore)
    })



    // Stay and see who wins
    $('#stay').click(() => {
      if (totalDealerScore < 16) {
        toDealer()
      }
      whoWon()
    })


    // Figure out who won
    function whoWon() {
      if (totalDealerScore > 21) {
        window.alert("The dealer had a hidden " + hiddenCard[0] + ".  The dealer busts, you win!")
        location.reload()
      }
      if (totalDealerScore > 16 && totalDealerScore < 22) {
        if (totalDealerScore < totalPlayerScore) {
          window.alert("The dealer had a hidden " + hiddenCard[0] + ".  You win!")
          location.reload()
        } else if (totalDealerScore > totalPlayerScore) {
          window.alert("The dealer had a hidden " + hiddenCard[0] + ".  Dealer wins!")
          location.reload()
        } else if (totalDealerScore = totalPlayerScore) {
          window.alert("The dealer had a hidden " + hiddenCard[0] + ".  It's a tie, dealer wins!")
          location.reload()
        }
      }
    }

    $('#new-hand').click((event) => {
      location.reload()
    })
  })
})
