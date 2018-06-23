const requireFromString = require('require-from-string');
const { getUserTasks, unlockNextTaskForUser } = require('./dataService');


const REQUIRED_PASS_PERCENT = 100;

module.exports = (taskId, userId, source, language) => {
  const userTasks = getUserTasks(userId);

  const task = userTasks.find(task => task.id === taskId);

  if (!task) {
    return {
      status: 'Task not found',
    };
  }

  let result;
  if (language === 'java') {
    console.log(`Provided java code for taskId ${taskId}`);
    console.log(JSON.stringify({ source: sourceFile.data.toString('utf8') }));

    try {
      result = axios.post(`http://localhost:8090/task/${taskId}`, { source: sourceFile.data.toString('utf8') });
    } catch (e) {
      console.log(e);
      return {
        error: e.message,
      };
    }
  } else {
    const functionToTest = requireFromString(source);
    result = {
      totalTestCount: Object.keys(task.acceptanceTests).length,
      testsPassed: 0,

    };

    Object.keys(task.acceptanceTests).forEach((input) => {
      const expectedOutput = task.acceptanceTests[input];
      const actualOutput = functionToTest(input);
      if (expectedOutput == actualOutput) {
        result.testsPassed += 1;
      } else if (!result.firstFailedInput) {
        console.log(`Test failed for user ${userId}: expected: ${expectedOutput}, actual: ${actualOutput}`);
        result.firstFailedInput = input;
      }
    });
  }


  if (result.testsPassed / result.totalTestCount >= REQUIRED_PASS_PERCENT / 100) {
    const nextTaskId = unlockNextTaskForUser(userId, taskId);
    result.nextTaskId = nextTaskId;
  }
  return result;
};