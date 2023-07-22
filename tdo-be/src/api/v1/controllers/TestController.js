exports.getTest = (req, res) => {
    res.status(200).send({
        message: 'Route đã khai báo thành công',
        status: true,
    });
};
