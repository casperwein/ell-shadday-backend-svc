const winston = require("winston")
const DailyRotateFile = require("winston-daily-rotate-file")


const logger = winston.createLogger({
    level: "info",
    // format: winston.format.printf(log => {
    //     return(`${new Date()}: ${log.level.toUpperCase()}: ${log.message}`)
    // }),
    format: winston.format.combine(
        winston.format.ms(),
        winston.format.json(),
        winston.format.timestamp()
    ),
    transports: [
        new winston.transports.File({
            filename: "../log/application.log"
        }),
        new DailyRotateFile({
            filename: "../log/app-%DATE%.log",
            maxSize: '100m'
        })
    ]
})

module.exports = {
    logger
}