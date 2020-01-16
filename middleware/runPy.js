const { spawn } = require('child_process')

let prePy = (req) => {
    req.py = []
    req.py.command = []

    // Find the coresponding script name
    if (req._parsedUrl.pathname === '/run-python' && req.method === 'GET') {
        req.py.command.push('./python/scripts/test.py')
        // Append other parameters
        for (key in req.query) {
            req.py.command.push(req.query[key])
        }
    } else if (req._parsedUrl.pathname === '/solve' && req.method === 'GET') {
        req.py.command.push('./python/scripts/sliding_puzzle.py')
        req.py.command.push('-s', req.query['method'])
        req.py.command.push('-p', req.query['puzzle'])
    }
}

let runPy = (req, res, next) => {
    prePy(req)

    let process = spawn('python', req.py.command)
    process.stdout.on('data', (data) => {
        res.write(JSON.parse(JSON.stringify(data.toString())))
    })
    process.stdout.on('end', () => {
        res.status(200).send()
    })
    process.stderr.on('data', (data) => {
        // TODO: implement logger
        console.error(`[ERROR] ${data}`)
    })
    process.on('close', (code) => {
        console.log(`[INFO] Child process exited with code ${code}`)
    })
}

module.exports = {
    runPy
}