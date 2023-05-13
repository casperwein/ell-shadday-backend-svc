const crypto = require("crypto");
const task_id = crypto.randomUUID()
const {logger} = require("../helper/logger")


const today = new Date()
const utc = new Date(today.getTime() + 7 * 60 * 60 * 1000)
const now = utc.toISOString().replace('Z', '').replace('T', ' ')

const response = (statusCode, message, data, res) => {
    const response_data = {
        request_date: now,
        task_id,
        isError: false,
        message,
        data,
        statusCode
    }

    // console.log(response_data)

    logger.log({
        level: "info",
        message: response_data
    })
    res.status(statusCode).json({
        response_data
    })
}
    
const resError = (statusCode, message, data, res) => {
    const response_data = {
        request_date: now,
        task_id,
        isError: true,
        response: {
            statusCode: statusCode,
            message: message,
            payload: {
                data
            }
        },
        statusCode
    }

    logger.log({
        level: "error",
        message: response_data
    })

    res.status(statusCode).json({
        response_data
    })
}


const invalidRequestRespon = (statusCode, message, data, res) => {
    const response_data = {
        request_date: now,
        task_id,
        status: "INVALID REQUEST",
        isError: true,
        response: {
            statusCode: statusCode,
            message: message,
            payload: {
                data
            }
        },
        statusCode
    }

    console.log(response_data)

    logger.log({
        level: "error",
        message: response_data
    })

    res.status(201).json({
        response_data
    })
}

const setLog = (message, data) => {
    const response_data = {
        request_date: now,
        isError: false,
        message,
        data
    }

    logger.log({
        level: "info",
        message: response_data
    })
}


module.exports = {
    response,
    resError,
    invalidRequestRespon,
    setLog
}