const User = require ("../models/User");
const UserReport = require("../models/UserReport");
const PhoneNumber = require("../models/PhoneNumber");
const Location = require("../models/Location");
const Listing = require("../models/Listing");
const bcrypt = require('bcrypt');
const config = require('../../config/auth_config.js');

const searchUser = async (req, res) => {
    console.log(req.query.search);
    let users;
    await User.find({
        $text: {$search: req.query.search},
    }).select("-password").then((results) => {
        users = results;
    });

    return users;
}

const getUser = async (req, res) => {
    let user;
    await User.findById(req.query.id).select("-password").then((result) => {
        user = result;
    });

    return user;
}


const updateUserInfo = async (req, res) => {
    let updatedUser;
    await User.findOneAndUpdate({
        _id: req.userId,
    }, {
        email: req.body.email ? req.body.email : this.email,
        firstName: req.body.firstName ? req.body.firstName : this.firstName,
        lastName: req.body.lastName ? req.body.lastName : this.lastName,
    }, {
        new: true,
    }).select("-password").then((result) => {
        
        
        updatedUser = result;
    });
    return updatedUser;
}

const updateUserPassword = async (req, res) => {
    
    await User.findByIdAndUpdate(req.userId,
        {
            password: await bcrypt.hash(req.body.newPassword, config.saltRounds),
        });


}

const deleteUser = async (req, res) => {

    await PhoneNumber.deleteMany({
        user: req.userId,
    });

    await Location.deleteMany({
        user: req.userId,
    })

    await Listing.deleteMany({
        user: req.userId,
    })

    await User.findByIdAndDelete(req.userId);


}


const reportUser = async (userId, subject, reporterId) => {
    const report = new UserReport({
        reported: userId,
        reporter: reporterId,
        subject: subject,
    });
    await report.save();
    return report;
}

const getUserReports = async () => {
    let reportedUsers;
    await UserReport.find().populate("reported").then((reports) => {
        reportedUsers = reports;
    });
    return reportedUsers;
}

const deleteUserReport = async (reportId) => {
    await UserReport.findByIdAndDelete(reportId);

}

const getUserUserReport = async (userId, reportedId) => {
    let userReports;
    await UserReport.find({
        reported: reportedId,
        reporter: userId,
    }).populate("reported").then((reports) => {
        userReports = reports;
    });
    return userReports;
}



const getUserUserReports = async (userId) => {
    let userReports;
    await UserReport.find({
        reporter: userId,
    }).populate("reported").then((reports) => {
        userReports = reports;
    });
    return userReports;
}


module.exports = { searchUser, getUser, updateUserInfo, updateUserPassword, deleteUser, reportUser, getUserReports, deleteUserReport, getUserUserReport, getUserUserReports };



