const { BotFrameworkAdapter, ActivityHandler } = require('botbuilder');
const restify = require('restify');

// Erstellen eines HTTP-Servers mit Restify
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
});

// Erstellen des Bot-Adapters
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Erstellen des Bot-Handlers
const myBot = new ActivityHandler();

myBot.onMessage(async (context, next) => {
    await context.sendActivity(`You sent: '${ context.activity.text }'`);
    await next();
});

// Bot an den Server anbinden
server.post('/api/messages', async (req, res) => {
    await adapter.processActivity(req, res, async (context) => {
        await myBot.run(context);
    });
 });
 
