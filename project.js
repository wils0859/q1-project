$(document).ready(() => {

  // Global variables
  deckID = ''
  playerScore = []
  dealerScore = []
  totalPlayerScore = 0
  totalDealerScore = 0
  revealCard = null
  hiddenCardImg = null
  backOfCard = null
  frontOfCard = null


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
    blackjack()


    // Check for a blackjack
    function blackjack() {
      if (totalPlayerScore === 21) {
        window.alert('You were dealt a BLACKJACK, you WIN!')
        location.reload()
      }
    }


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
          cardValue = "11"

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
        automateAce()
        console.log('dealer score is :' + totalDealerScore)
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
          hiddenCardValue = "11"
        } else {
          hiddenCardValue = hiddenCardValue
        }

        hiddenCardValue = parseInt(hiddenCardValue)
        dealerScore.push(hiddenCardValue)
        totalDealerScore = dealerScore.reduce(function(sum, value) {
          return sum + value
        })

        console.log(dealerScore)
        console.log('hiddenCardValue is ' + hiddenCardValue)
        backOfCard = $('#dealers-cards').append(`<img src="${hiddenCardImg}" class="card-back">`)
        frontOfCard = $('#dealers-cards').append(`<img src="${revealCard}" class="card-front">`)
        $('.card-front').hide()
      })
    }


    // Deal a card to the player
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
          cardValue = "11"
        } else {
          cardValue = cardValue
        }
        cardValue = parseInt(cardValue)
        playerScore.push(cardValue)
        totalPlayerScore = playerScore.reduce(function(sum, value) {
          return sum + value
        }, 0)

        console.log(playerScore)
        $('#players-cards').append(`<img src="${cardImg}">`)
        automateAce()
        console.log('player score is :' + totalPlayerScore)
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
        let gameAudio = new Audio('audio/card.wav')
        $(gameAudio).bind(() => {
          gameAudio.currentTime = 0;
          gameAudio.play()
        })
        gameAudio.play()
      }
    })


    // Stay and play out the dealer to see who wins
    $('#stay').click(() => {
      $('.card-back').hide()
      $('.card-front').show()
      if (totalDealerScore < 16) {
        toDealer()
        let gameAudio = new Audio('audio/card.wav')
        $(gameAudio).bind(() => {
          gameAudio.currentTime = 0;
          gameAudio.play()
        })
        gameAudio.play()
      }
      whoWon()
    })


    // Figure out who won
    function whoWon() {
      if (totalDealerScore > 21) {
        window.alert("The dealer busts, you win!")
        location.reload()
      }
      if (totalDealerScore > 15 && totalDealerScore < 22) {
        if (totalDealerScore < totalPlayerScore) {
          window.alert("You win!")
          location.reload()
        } else if (totalDealerScore > totalPlayerScore) {
          window.alert("Dealer wins!")
          location.reload()
        } else if (totalDealerScore = totalPlayerScore) {
          window.alert("It's a tie, dealer wins!")
          location.reload()
        }
      }
    }


    // Make it so the game knows how to value the ace
    function automateAce() {
      if (dealerScore.includes(11) && totalDealerScore > 22) {
        totalDealerScore = (totalDealerScore - 10)
      }
      if (playerScore.includes(11) && totalPlayerScore > 22) {
        totalPlayerScore = (totalPlayerScore - 10)
      }
    }


    // Start a new hand before the old one ended
    $('#new-hand').click((event) => {
      location.reload()
    })
  })
})
