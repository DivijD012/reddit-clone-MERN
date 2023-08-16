const Report = require('../models/reportModel')

exports.createReport = (req, res) => {
    let {userid, username, otheruserid, otherusername, redditid, redditname, text, postid, complaint} = req.body;
    // console.log(req.body);
    // console.log(userid);
    const report = new Report({
        userReportedId:otheruserid,
        userReportingId:userid,
        userReportedName:otherusername,
        userReportingName:username,
        redditId:redditid,
        postId:postid,
        redditName:redditname,
        postText:text,
        complaint:complaint
    });
    report.save()
    .then(response => {
        console.log(report)
        res.status(200).json({
        success: true,
        result: response
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
        errors: [{ error: err }]
        });
    });
}

exports.getReport = (req, res) => {
    let {pageid} = req.body;
    Report.find({redditId:pageid}, (err, report) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(report);
    })
}

exports.ignoreReport = (req, res) => {
    let {reportid} = req.body;
    Report.findByIdAndDelete(reportid, (err, report) => {
        if(err) {
            console.log(err)
            res.status(500).send(err)
        }
        res.status(200).json(report)
    })
}