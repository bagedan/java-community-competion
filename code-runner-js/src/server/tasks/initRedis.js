const redis = require('redis');
const {promisify} = require('util');


const tasks = [
    {
        id: 'ts1',
        title: 'ts1',
        shortDesc: 'ts1',
        longDesc: "You are visiting a friend in Korea. She lives in a nice, tall building in the city centre. But oh no, she's not home yet! To lift your spirit, you decide to do some lifting. Or maybe elevating. Anyway, you want to ride the elevator up up up and away!\n" +
        "\n" +
        "So, here is how it goes.\n" +
        "\n" +
        "When you enter the elevator, a couple of the locals enter too. All of them will choose their destination; you are not pushing any buttons, you just cruising.\n" +
        "\n" +
        "The elevator starts going up. For some reason the caller buttons on the floors are not working, so people can only get in, when someone gets out. Only those people will enter, who want to go to the same direction as the elevator. Otherwise they wait. (More efficient!)\n" +
        "\n" +
        "When the elevator reaches the top floor it thinks, maybe this is the time when I just stop turning back and back and back and I fly away and see other elevators, but then it sighs and does none of it because we are all prisoners of our circumstances and there is no escape (of the elevator shaft). You just go up and down and up and down... Anyway, when the elevator reaches the top floor, it turns back, and goes down! And when it reaches a floor nobody wants to go higher of, it turs back too.\n" +
        "\n" +
        "You will immediately get out of the elevator when it's over capacity: you are polite. (I.e one person steps in then the alarm goes off.)\n" +
        "\n" +
        "You will also step out of the elevator when it becomes empty: you got _lonely_ (dee do de de). You'll wait for everyone to get in or out first.\n" +
        "\n" +
        "\n" +
        "*The task*\n" +
        "\n" +
        "```f(building: string, capacity)```\n" +
        "\n" +
        "Given the `capacity` of the elevator and the people waiting on each floor of the `building`, tell us how your travel went by printing to `STDOUT`:\n" +
        "\n" +
        "- `polite after 3 stops at 1 floor`\n" +
        "- `lonely after 1 stops at 3 floor`\n" +
        "\n" +
        "Don't forget, you are in Korea.\n" +
        "\n" +
        "\n" +
        "*The rules*\n" +
        "\n" +
        "The `building` is a multi-line string (lines are separated by `\\n`) describing the number of people and their intentions for each floor, starting with the top floor.\n" +
        "\n" +
        "Each floor is a list of tuples, each describing how many people and to which floor:\n" +
        "\n" +
        "```\n" +
        "scene =     \n" +
        "  \"1:0|1:1\\n\" +     // 1 ppl to 0, 1 ppl to 1\n" +
        "  \"3:2|5:0\\n\" +     // 3 ppl to 2, 5 ppl to 0\n" +
        "  \"1:1|2:2\";        // 1 ppl to 1, 2 ppl to 2\n" +
        "```\n" +
        "\n" +
        "You will not have invalid input, but scene can have empty lines indicating that nobody wants to travel from that floor.\n" +
        "\n" +
        "When there are more people waiting than the capacity of the lift, they form a queue and enter in the order they have arrived to the elevators (i.e. as they are defined in the input).\n" +
        "\n" +
        "\n" +
        "*Example Test-Cases*\n" +
        "> Note: you submission will be tested using a lot more inputs\n" +
        "\n" +
        "*1*\n" +
        "\n" +
        "Input:\n" +
        "```\n" +
        "capacity:6\n" +
        "1:0|1:1\n" +
        "3:2|5:0\n" +
        "1:1|2:2\n" +
        "```\n" +
        "Output: `polite after 3 stops at 1 floor`\n" +
        "\n" +
        "\n" +
        "*2*\n" +
        "\n" +
        "Input:\n" +
        "```\n" +
        "capacity: 10\n" +
        "2:1|3:2\n" +
        "1:0|1:1\n" +
        "3:2|5:0\n" +
        "1:1|2:2\n" +
        "```\n" +
        "\n" +
        "Output: `lonely after 4 stops at 0 floor`\n" +
        "\n" +
        "\n" +
        "*3*\n" +
        "\n" +
        "Input:\n" +
        "```\n" +
        "capacity: 9\n" +
        "2:2|1:5\n" +
        "3:8|1:0\n" +
        "4:2|1:5|2:0\n" +
        "1:1|2:0|4:2\n" +
        "2:0|2:7\n" +
        "1:0|1:8\n" +
        "1:5|3:6|1:0\n" +
        "1:1|1:3|2:5\n" +
        "```\n" +
        "\n" +
        "Output: `polite after 7 stops at 5 floor`\n" +
        "\n" +
        "\n" +
        "*4*\n" +
        "\n" +
        "```\n" +
        "capacity: 10\n" +
        "1:0|1:1\n" +
        "1:3|5:5|2:0\n" +
        "\n" +
        "3:2|5:0\n" +
        "1:1|2:2\n" +
        "```\n" +
        "\n" +
        "Output: lonely after 2 stops at 2 floor",
        acceptanceTests: {
            '1': '1',
            '1,2,3': '6',
            '1,2,3,4,5,6': '21',
        },
    },
    {
        id: 'ts2',
        title: 'ts2',
        shortDesc: 'ts1',
        longDesc: 'ts1',
        acceptanceTests: {
            '1,2,3,4,5,6': '21',
        },
    },
    {
        id: 'ts3',
        title: 'ts3',
        shortDesc: 'ts3',
        longDesc: 'ts3',
        acceptanceTests: {
            '1,2,3,4,5,6': '21',
        },
    },
];


const client = redis.createClient(); // this creates a new client




client.on('connect', () => {
  console.log('Redis client connected');
});
client.on('error', (err) => {
  console.log(`Something went wrong ${err}`);
});



client.keys('*', (err, replies) => {
    replies.forEach(key => client.del(key));
    tasks.forEach(task => client.set(`task:${task.id}`, JSON.stringify(task)));

    tasks.forEach(task => client.sadd('taskIds', task.id));

    client.quit();

});




