import Admin from './model';
import Facebook from "./facebook";
import { formatMessage } from "../../helpers/confession";
import ConfessionStore from "../confession/store";
import { readImageFileInArray } from "../../util/image";

class AdminStore {

    async register (personal_access_token, page_access_token, req) {

        const facebook = new Facebook();

        try {
            const information = await facebook.information (personal_access_token);
            const { id: user_id, name, email } = information;

            const params = {
                user_id, name, email, access_token: personal_access_token, page_access_token
            };

            req.session.name = name;

            return new Promise ((resolve, reject) => {
                Admin.findOneAndUpdate({user_id}, params, {upsert: true, setDefaultsOnInsert: true}, err => {

                    if (err) {
                        return reject({
                            'response_code': 500,
                            'response_msg': 'error on mongoose',
                            'data': err
                        });
                    }

                    return resolve({
                        'response_code': 200,
                        'response_msg': 'success'
                    });
                })
            });
        }
        catch (err) {
            return err;
        }

    }

    async verify_facebook_page_permission (fb_personal_access_token) {

        let facebook = new Facebook();

        return new Promise((resolve, reject) => {

            facebook.accounts(fb_personal_access_token).then (response => {

                let page_access = response.find(account => account.id === '121412055027319');

                if (!page_access) {
                    return reject({
                        response_code: 403,
                        response_msg: `The user doesn't possess permission on page`
                    });
                }

                let { tasks } = page_access;

                let required_task = tasks.find(account => account === 'CREATE_CONTENT');

                if (!required_task) {
                    return reject({
                        response_code: 403,
                        response_msg: `User doesn't possess permission to CREATE CONTENT in page.`
                    })
                }

                let { access_token } = page_access;

                return resolve({
                    response_code: 200,
                    response_msg: 'Verification success. ',
                    fb_page_access_token: access_token
                });
            }).catch (err => {

                return reject ({
                    response_code: 500,
                    response_msg: 'Facebook Graph API Accounts Error',
                    error: err.error
                })
            });

        })

    }

    async postConfession (page_access_token, pending_confessions, name) {

        if (!page_access_token) {
            throw 'Session Expired';
        }

        if (pending_confessions.length === 0) {
            throw 'Confession not found. ';
        }

        const facebook = new Facebook();

        let pendingConfession = pending_confessions.map( async confession => {
            const { _id, tags, content, images } = confession;
            const message = formatMessage(tags, content);

            let imageBase64Array = readImageFileInArray(images);
            let uploadImageActions = [];

            imageBase64Array.forEach( image => {
                uploadImageActions.push(facebook.uploadPhotoToAlbum(page_access_token, {file: image}));
            });

            let fbImageIdArray = await Promise.all(uploadImageActions);
            let fbImageId = fbImageIdArray.map(imageId => ({ media_fbid: imageId }));

            return facebook.submitConfession(page_access_token, message, fbImageId)
                .then (postId => ConfessionStore.approveConfession(_id, postId, name)
                    .then (response => response)
                )
                .catch (err => {
                    return {
                        response_code: 500,
                        response_msg: err
                    }
                });

        });


        return Promise.all(pendingConfession).then (value => {
            return value;
        }).catch (err => ({
            response_code: 500,
            response_msg: err
        }))
    }
}



export default AdminStore;