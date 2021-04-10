const ExpressLoader = require('./Express').default;
const MongooseLoader = require('./MongoClient').default;
const CronLoader = require('./Cron').default;

exports.default = async ({ app }) => {
    const mongo = await MongooseLoader();
    console.log("✅	Mongo loaded and connected.");

    await ExpressLoader({ app });
    console.log("✅	Express loaded.");

    await CronLoader();
    console.log("✅	Cron started.")

}