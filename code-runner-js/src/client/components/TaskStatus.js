import React from 'react';


const TaskStatus = ({taskStatus, onSolvedFn}) => {
    const {totalTestCount, testsPassed, firstFailedInput, error} = taskStatus
    const solved = totalTestCount === testsPassed
    const solvedPercentage = solved ? 100 : Math.round(100 * testsPassed / totalTestCount)
    !error && solved && onSolvedFn()
    
    const _errorMessage = (error) => {
        return error ? <div className='row'>
            <div className='row'>
                <h4>Arrrrgh!!! There'a bottle with an error message inside:</h4><br/>
                <br/>
                <pre>{error}</pre>
            </div>
        </div> : null
    }

    const _successMessage = () => (
        <div className='row'>
            <h2>Conguratulations!</h2>
            <h3>Next task unlocked!</h3>
        </div>) 
    
    const _failedMessage = (msg) => (
        <div className='status'>
            <div className='row'>
                <h4>One or more tests failed. Please, revise your code and try again</h4><br/>
            </div>
        </div>)
        
        return (
            <div className='status row'>
                <div className="col-lg-12">
                    {error && _errorMessage(error)}
                    {!error && (solved ? _successMessage() : _failedMessage(firstFailedInput))}
                    {!error && <h3>Current progress</h3>}
                    {!error && <h4>Passed {testsPassed} of {totalTestCount} locks</h4>}
                    {!error && <div className='progress'>
                        <div className='progress-bar bg-success' role='progressbar' style={{width: `${solvedPercentage}%`}} aria-valuenow={solvedPercentage} aria-valuemin="0" aria-valuemax="100"></div>
                        <div className='progress-bar bg-danger' role='progressbar' style={{width: `${100 - solvedPercentage}%`}} aria-valuenow={100 - solvedPercentage} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>}
                </div>
            </div>)
}

export default TaskStatus;
