class Info {

    static async start() {
        try {
            const message = "You are on Hypertube's API !";
            return message;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}

exports.default = Info;