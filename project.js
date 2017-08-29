$(document).ready(() => {
      deckID = ''
      playerScore = []
      dealerScore = []
      totalPlayerScore = 0
      totalDealerScore = 0

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

              console.log(cardImg)
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
              let cardImg = ('backside-card.jpg')
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

              console.log(cardImg)
              console.log(dealerScore)

              $('#dealers-cards').append(`<img src="${cardImg}">`)
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

              console.log(playerScore)

              $('#players-cards').append(`<img src="${cardImg}">`)
            })
          }


          // Hit me
          $('#hit-me').click(() => {
            totalPlayerScore = playerScore.reduce(function(sum, value) {
              return sum + value
            }, 0)
            if (totalPlayerScore < 22) {
              toPlayer()
              totalPlayerScore = playerScore.reduce(function(sum, value) {
                return sum + value
              }, 0)
            } else if (totalPlayerScore > 21) {
              console.log(totalPlayerScore)
              window.alert('You busted...you lose!')
              location.reload()
            }
          })



          // Stay and see who wins
          $('#stay').click(() => {
            totalPlayerScore = playerScore.reduce(function(sum, value) {
              return sum + value
            }, 0)
            console.log(totalPlayerScore)

            totalDealerScore = dealerScore.reduce(function(sum, value) {
              return sum + value
            }, 0)
            console.log(totalDealerScore)

            if (totalDealerScore < 16) {
              toDealer()
              totalDealerScore = dealerScore.reduce(function(sum, value) {
                return sum + value
                console.log(totalDealerScore)
              })
            }
            whoWon()
          })

          function whoWon() {
            if (totalDealerScore > 21) {
              window.alert('Dealer busts, you win!')
              location.reload()
            }
            if (totalDealerScore > 16 && totalDealerScore < 22) {
              if (totalDealerScore < totalPlayerScore) {
                window.alert('You win!')
                location.reload()
              } else if (totalDealerScore > totalPlayerScore) {
                window.alert('Dealer wins!')
                location.reload()
              } else if (totalDealerScore = totalPlayerScore) {
                window.alert("It's a tie, dealer wins!")
                location.reload()
              }
            }
          }

          $('#new-hand').click((event) => {
              location.reload()
            })
          })
      })



    // $('#new-hand').click((event) => {
    //   event.preventDefault
