const { spawn } = require('child_process')

let prePy = (req) => {
    req.py = []
    req.py.command = []

    // Find the coresponding script name
    if (req._parsedUrl.pathname === '/run-python' && req.method === 'GET') {
        req.py.command.push('./python/scripts/test.py')
    } else if (req._parsedUrl.pathname === '/solve' && req.method === 'GET') {
        req.py.command.push('./python/scripts/sliding_puzzle.py', '-s', 'astar', '-p')
    }

    // Append the parameters
    for (key in req.query) {
        req.py.command.push(req.query[key])
    }
}

let runPy = (req, res, next) => {
    prePy(req)

    // TODO: Error handling
    let process = spawn('python', req.py.command)
    process.stdout.on('data', (data) => {
        res.status(200).send(JSON.parse(data.toString()))
    })
}

module.exports = {
    runPy
}