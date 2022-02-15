const { router } = require('./routes')
const express = require('express')
const server = express()
const { CronJob } = require('cron');
const { checkStatus } = require('./checkStatus')

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
.use(express.urlencoded({ extended: true }))
.use(express.static("public"))
.use(router)
.listen(process.env.PORT || 5500, () => {
    console.log('Server is running!');
});

new CronJob('0 0 * * * *', checkStatus, null, true, 'America/Sao_Paulo');