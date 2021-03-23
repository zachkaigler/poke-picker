let inputForm = document.querySelector("form.pokemon-form")
let pokemonList = document.querySelector("ul#selected-pokemon")

inputForm.addEventListener("submit", function (event) {
    event.preventDefault()

    let theForm = event.target
    let theInput = theForm.pokemon
    let userInput = theInput.value
    theForm.reset() 
    
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=1118")
        .then(response => response.json())
        .then(function(json) {
            json.results.forEach(function(object) {
                if (object.name.toLowerCase() === userInput.toLowerCase()) {
                    console.log(`You captured ${object.name}!`)
                    
                    fetch(`${object.url}`)
                        .then(response => response.json())
                        .then (function(json) {
                            let spriteURL = json.sprites.front_default
                            let li = document.createElement("li")
                            let img = document.createElement("img")
                            let captureTag = document.createElement("div")
                            let button = document.createElement("button")
                            let blankDiv = document.createElement("div")
                            let lineBreak = document.createElement("div")
                            let listItemDiv = document.createElement("div")

                            listItemDiv.classList = "pokemon-list-item"

                            blankDiv.innerText = ""
                            lineBreak.innerHTML = "<br>"

                            captureTag.innerText = `You captured ${object.name}!`

                            img.src = spriteURL
                            img.classList = "captured-pokemon"

                            button.type = "button"
                            button.classList = "send-to-pc"
                            button.innerText = "Send to PC"

                            listItemDiv.append(captureTag)
                            listItemDiv.append(img)
                            listItemDiv.append(blankDiv)
                            listItemDiv.append(button)
                            listItemDiv.append(lineBreak)

                            li.append(listItemDiv)

                            pokemonList.append(li)

                            button.addEventListener("click", function (event) {
                                li.remove()
                            })

                            // debugger

                        })

                }
            })
        })
})