const enrollService = require('../services/enrollService');

const createCharge = async (req, res) => {
    try {
        const data = await paymentService.createCharge(req.body);
        return res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const webhook = async (req, res) => {
    try {
        const data = await paymentService.webhook(req);
        return res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}