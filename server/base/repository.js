export default class Repository {
    constructor(Model) {
        this.Model = Model;
    }

    async findAll() {
        return await performRepositoryAction(
            this.Model.find.bind(this.Model),
            {}
        );
    }

    async deleteAll() {
        return await performRepositoryAction(
            this.Model.deleteMany.bind(this.Model),
            {}
        );
    }

    async find(criteria, value) {
        return await performRepositoryAction(this.Model.find.bind(this.Model), {
            [criteria]: value
        });
    }

    async create(params) {
        return await performRepositoryAction(
            this.Model.create.bind(this.Model),
            params
        );
    }

    async update(criteria, value, params) {
        return await performRepositoryAction(
            this.Model.updateOne.bind(this.Model),
            { [criteria]: value },
            params
        );
    }

    async updateAll(params) {
        return await performRepositoryAction(
            this.Model.updateMany.bind(this.Model),
            {},
            params
        );
    }

    async delete(criteria, value) {
        return await performRepositoryAction(
            this.Model.deleteOne.bind(this.Model),
            { [criteria]: value }
        );
    }
}

async function performRepositoryAction(action, ...args) {
    return new Promise(async (resolve, reject) => {
        await action(...args)
            .then((result) => {
                resolve(result || true);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
