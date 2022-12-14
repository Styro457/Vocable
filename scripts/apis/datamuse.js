function getRelatedWords(word, topics, firstLetter, lastLetter, limit, frequencyLimit, minLenght) {
    return new Promise((resolve) => {
        let url = "https://api.datamuse.com/words?ml=" + word + "&max=" + limit + "&md=df";
        if(topics !== null && topics.length > 0) {
            let topicsString = topics[0];
            for (let i = 1; i < Math.max(topics.length, 5); i++) {
                topicsString = topicsString + "," + topics[i];
            }
            url = url + "&topics=" + topicsString;
        }
        fetch("https://api.datamuse.com/words?ml=" + word + "&max=" + limit + "&md=df").then(response => {
            return response.json()
        }).then(data => {
            const words = []
            let frequency, word;
            for(let i in data) {
                frequency = data[i]["tags"][data[i]["tags"].length-1]
                word = data[i]["word"];
                addWord(word);
                if(frequency.startsWith(frequencyLimit) && !word.includes(" ") && word.length >= minLenght) {
                    words.push(
                        {
                            word: word,
                            definitions: data[i]["defs"],
                            frequency: frequency
                        });
                }
            }
            resolve(words)
        })
    })
}