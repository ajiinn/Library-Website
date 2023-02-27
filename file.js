var http = require('http')

http.createServer((req, res) => {
    console.log(req.url)
    
    if(req.url === '/'){
        res.write('Hello')
        res.end()
    }
    else if(req.url === '/login'){
        res.write('login')
        res.end()
    }
    else{
        res.write('Page not found')
        res.end()
    }
}).listen(3010, () => console.log('Server is Running'))