const rateLimiter=require('express-rate-limit');


const limiter=rateLimiter({
    windowMs:60*1000,
    max:5,
    message:'Max Request Limit Has Been Exceeded'
});

module.exports=limiter;