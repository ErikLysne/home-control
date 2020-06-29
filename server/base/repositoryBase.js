export default class RepositoryBase {
    constructor(Model) {
        this.Model = Model;
    }

    async findAll() {
        return new Promise(async (resolve, reject) => {
            await this.Model.find({}, (err, result) => {
                if (err) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async deleteAll() {
        return new Promise(async (resolve, reject) => {
            await this.Model.deleteMany({}, (err) => {
                if (err) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    async createOne(params) {
        return new Promise(async (resolve, reject) => {
            const newItem = new this.Model({ ...params });
            newItem.save((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    async deleteByProp(prop, value) {
        return new Promise(async (resolve, reject) => {
            await this.Model.deleteOne({ [prop]: value }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    async findByProp(prop, value) {
        return new Promise(async (resolve, reject) => {
            await this.Model.find({ [prop]: value }, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}
