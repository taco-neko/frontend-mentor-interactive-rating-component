//Handle tabIndex and blur

const ratingBtns = document.querySelectorAll(".rating__button button");
const firstBtn = ratingBtns[ratingBtns.length - 1]
const firstListItem = firstBtn.parentElement
const lastBtn = ratingBtns[0]
const lastListItem = lastBtn.parentElement
const submitBtn = document.querySelector(".submit-button")

ratingBtns.forEach((btn) => btn.tabIndex = -1)
firstBtn.tabIndex = 0

function focusNextBtn(e) {
  const listItem = e.target.parentElement

  if (e.key === "Tab" && !e.shiftKey) {
    e.preventDefault()

    const nextListItem = listItem.previousElementSibling || submitBtn 
    const nextBtn = nextListItem.querySelector("button") || submitBtn

    nextBtn.tabIndex = 0
    nextBtn.focus()

    ratingBtns.forEach((btn) => {
      if (btn !== nextBtn) btn.tabIndex = -1
    })
  }
  else if (e.key === "Tab" && e.shiftKey) {
    e.preventDefault()

    const prevListItem = listItem.nextElementSibling || lastListItem
    const prevBtn = prevListItem.querySelector("button")

    prevBtn.tabIndex = 0
    prevBtn.focus()

    ratingBtns.forEach((btn) => {
      if (btn !== prevBtn) btn.tabIndex = -1
    })
  }
}

ratingBtns.forEach((btn) => btn.addEventListener("keydown", focusNextBtn))

function resetTabIndexes() {
  ratingBtns.forEach((btn) => {
    btn.tabIndex = -1
    firstBtn.tabIndex = 0
  })
}

ratingBtns.forEach((btn) => btn.addEventListener("blur", resetTabIndexes))

submitBtn.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && e.shiftKey) {
    e.preventDefault()
    lastBtn.tabIndex = 0
    lastBtn.focus()
  }
})

submitBtn.addEventListener("blur", resetTabIndexes)

// Styling the rating buttons on click and hover

function generateThanksHTML(rating) {
  return `
  <div class="container thanks-state">
    <img class="thanks-image" src="images/illustration-thank-you.svg" alt="">
    <p class="selected">You selected ${rating} out of 5</p>
    <h1>Thank you!</h1>
    <p>We appreciate you taking the time to give a rating. If you ever need more support, don't hesitate to get in touch!</p>
  </div>`
}

let thanksHTML = ""

let ratingChosen = false

ratingBtns.forEach((btn, index1) => {
  //click
  btn.addEventListener("click", () => {
    ratingBtns.forEach((btn, index2) => {
      index1 <= index2 ? btn.classList.add("active") : btn.classList.remove("active")
      thanksHTML = generateThanksHTML(ratingBtns[index1].textContent)
      btn.blur()
      ratingChosen = true
    })
    
  })
  //hover
  btn.addEventListener("mouseover", () => {
    ratingBtns.forEach((btn, index2) => {
      index1 <= index2 ? btn.classList.add("hovered") : btn.classList.remove("hovered")
      btn.blur()
    })
  })
  //mouse out
  btn.addEventListener("mouseout", () => {
    ratingBtns.forEach((btn, index2) => {
      if (index1 <= index2) {
        btn.classList.remove("hovered")
      }
      btn.blur()
    })
  })
})

function logcurrent() {
  console.log(currentRating)
}

// Switching state on submit

const main = document.querySelector("main")

submitBtn.addEventListener("click", () => {
  if (ratingChosen) {
    main.innerHTML = thanksHTML
  }  
})




