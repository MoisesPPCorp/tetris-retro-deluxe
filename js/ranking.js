export function saveScore(name, score) {

    let ranking = JSON.parse(localStorage.getItem("tetrisRanking")) || []

    ranking.push({ name, score })

    ranking.sort((a, b) => b.score - a.score)

    ranking = ranking.slice(0, 5)

    localStorage.setItem("tetrisRanking", JSON.stringify(ranking))

}

export function loadRanking() {

    const ranking = JSON.parse(localStorage.getItem("tetrisRanking")) || []

    const list = document.getElementById("rankingList")

    list.innerHTML = ""

    ranking.forEach(player => {

        const li = document.createElement("li")

        li.textContent = player.name + " - " + player.score

        list.appendChild(li)

    })

}

export function isHighScore(score) {

    const ranking = JSON.parse(localStorage.getItem("tetrisRanking")) || []

    if (ranking.length < 5) return true

    return score > ranking[ranking.length - 1].score

}