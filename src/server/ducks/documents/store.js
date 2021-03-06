import Document from './model';

class DocumentStore {

    static async getHashTag(document_type) {

        const params = {
            document_type
        };

        let document = await Document.findOne(params);

        const {
            number,
            prefix,
            document_length
        } = document;

        const numberString = number.toString();
        const documentPrefix = prefix.toUpperCase();
        const documentNumber = numberString.padStart(document_length, '0');
        const tag = `#${documentPrefix}${documentNumber}`;

        return tag;

    }

    static async updateTag(document_type) {

        const params = {
            document_type
        };

        return await Document.findOneAndUpdate(params, {
            $inc: {
                number: 1
            }
        }, {
            new: true
        })
    }

}

export default DocumentStore;