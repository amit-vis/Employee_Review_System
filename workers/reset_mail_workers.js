const queue = require('../config/kue');
const resetMailer = require('../mailers/reset_mailers');

queue.process('reset', function(job, done){
    console.log('emails workers processing the job', job.data);

    resetMailer.newMail(job.data);

    done();
})
