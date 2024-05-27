const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en'], forceNER: true });


manager.addDocument('en', 'goodbye for now', 'greetings.bye');
manager.addDocument('en', 'bye bye take care', 'greetings.bye');
manager.addDocument('en', 'okay see you later', 'greetings.bye');
manager.addDocument('en', 'bye for now', 'greetings.bye');
manager.addDocument('en', 'i must go', 'greetings.bye');

manager.addDocument('en', 'hello', 'greetings.hello');
manager.addDocument('en', 'hi', 'greetings.hello');
manager.addDocument('en', 'howdy', 'greetings.hello');


manager.addDocument('en', 'fuck', 'offensive.comment');
manager.addDocument('en', 'shit', 'offensive.comment');
manager.addDocument('en', 'damn', 'offensive.comment');
manager.addDocument('en', 'bastard', 'offensive.comment');
manager.addDocument('en', 'dumbass', 'offensive.comment');
manager.addDocument('en', 'idiot', 'offensive.comment');


manager.addAnswer('en', 'greetings.bye', 'Till next time');
manager.addAnswer('en', 'greetings.bye', 'see you soon!');
manager.addAnswer('en', 'greetings.hello', 'Hey there!');
manager.addAnswer('en', 'greetings.hello', 'Greetings!');


manager.addAnswer('en', 'offensive.comment', 'Your comment has been flagged as offensive.');


(async() => {
    await manager.train();
    manager.save();

    console.log("\n ------------- \n\n");
    let response = await manager.process('en', 'I should go now');
    console.log(response);

    console.log("\n ------------- \n\n");
    response = await manager.process('en', 'Hello world');
    console.log(response);

    console.log("\n ------------- \n\n");
    response = await manager.process('en', 'fuck');
    console.log(response);
})();