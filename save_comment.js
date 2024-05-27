const fs = require('fs');
const path = require('path');
const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en'], forceNER: true });
manager.load();

const saveComment = async (comment) => {
    try {
        const response = await manager.process('en', comment);
        let color;

        switch (response.intent) {
            case 'offensive.comment':
                color = 'red';
                break;
            default:
                color = 'green';
                break;
        }

        const commentData = {
            text: comment,
            color: color,
            timestamp: new Date().toISOString()
        };

        fs.appendFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(commentData) + '\n', 'utf8');
        console.log(`Comment saved: ${JSON.stringify(commentData)}`);
    } catch (error) {
        console.error(`Failed to save comment: ${comment}`, error);
    }
};

// Example usage
saveComment('fuck');
saveComment('hello world');
saveComment('damn');
saveComment('bastard');
saveComment('bye bye take care');
saveComment('okay see you later');

