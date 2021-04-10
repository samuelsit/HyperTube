const mongoose = require('mongoose');

exports.default = async () => {
    const db = await mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    return db.connection;
}