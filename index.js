const settings = {
    sleepTime: null,
    forceSleepTime: null
}

const sleepFunction = async () => {
    if (!settings.forceSleepTime && settings.sleepTime >= 10000) {
        return
    }
    
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    
    await delay(settings.sleepTime)
}

module.exports.templateTags = [{
    name: 'sleepbeforerequest',
    displayName: 'Sleep Before Making Request',
    description: 'Sleep Before Making Request',
    args: [
        {
            displayName: 'Sleep Time',
            description: 'Sleep Time in ms',
            type: 'number',
            defaultValue: 1
        },
        {
            displayName: 'Force Sleep Time',
            description: 'Forces any sleep time',
            type: 'boolean',
            defaultValue: 0
        }
    ],
    async run (context, sleepTime = 1, forceSleepTime = false) {
        settings.sleepTime = sleepTime
        settings.forceSleepTime = forceSleepTime

        if (!forceSleepTime && sleepTime >= 5000) {
            throw new Error("Sleeptime is over 5 seconds");
        }
        
        return `Will sleep ${sleepTime}ms before making the Request`
    }
}];

module.exports.requestHooks = [
    async () => {
        await sleepFunction();
    }
];