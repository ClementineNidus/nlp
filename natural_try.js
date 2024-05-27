let natural = require('natural');
let tokenizer = new natural.WordTokenizer();
let wordnet = new natural.WordNet();

let sentence = "Fuck";
let tokens = tokenizer.tokenize(sentence);


function getRelatedWords(token) {
    wordnet.lookup(token, function(results) {
        results.forEach(function(result) {
            console.log(`Token: ${token}`);
            console.log(`\t Word: ${result.synsetOffset}: ${result.synonyms}`);
        });
    });
}


tokens.forEach(function(token) {

    getRelatedWords(token);
});