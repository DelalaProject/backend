const {
    getUser,
    updateUserInfo,
    updateUserPassword,
    deleteUser,
    searchUser,
    reportUser,
    getUserReports,
    deleteUserReport,
    getUserUserReport, 
    getUserUserReports 
} = require("../services/userService");


const getUserHandler = async (req, res) => {
    try {
        const user = await getUser(req, res);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const updateUserInfoHandler = async (req, res) => {
    try {
        const updatedUser = await updateUserInfo(req, res);
        return res.status(200).json({message: "user info updated successfully", updatedUser});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const updateUserPasswordHandler = async (req, res) => {
    try {
        await updateUserPassword(req, res);
        return res.status(200).json({message: "user password updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}


const deleteUserHandler = async (req, res) => {
    try {
        await deleteUser(req, res);
        return res.status(200).json({message: "user deleted successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const searchUserHandler = async (req, res) => {
    try {
        const users = await searchUser(req, res);
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const reportUserHandler = async (req, res) => {
    try {
        const report = await reportUser(req.body.userId, req.body.subject, req.userId);
        return res.status(200).json({message: "user reported successfully", report});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const getUserReportsHandler = async (req, res) => {
    try {
        const users = await getUserReports();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const deleteUserReportHandler = async (req, res) => {
    try {
        await deleteUserReport(req.body.reportId);
        return res.status(200).json({message: "report deleted successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }

}

const getUserUserReportHandler = async (req, res) => {
    try {
        const reports = await getUserUserReport(req.userId, req.query.reportedId);
        return res.status(200).json(reports);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const getUserUserReportsHandler = async (req, res) => {
    try {
        const reports = await getUserUserReports(req.userId);
        return res.status(200).json(reports);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}


module.exports = {getUserHandler, updateUserInfoHandler, updateUserPasswordHandler, deleteUserHandler, searchUserHandler, reportUserHandler, getUserReportsHandler, deleteUserReportHandler, getUserUserReportHandler, getUserUserReportsHandler};