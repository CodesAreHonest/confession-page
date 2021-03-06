import * as type from './types';
import axios from 'axios';
import { paramEncoding } from "../../util/encoding";

export const postSubmitConfession = formData => dispatch => {

    axios({
        method: 'POST',
        url: '/api/confession/postInsert',
        data: formData,
        config: {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    }).then (response => {
        dispatch ({
            type: type.POST_SUBMIT_CONFESSION,
            payload: response.data
        })
    }).catch (err => {
        dispatch ({
            type: type.POST_SUBMIT_CONFESSION,
            payload: err.response.data
        })
    });

};

export const getPendingConfession = (page, limit)  => dispatch => {

    const params = {
        page, limit
    };

    const queryString = paramEncoding(params);

    fetch (`/api/confession/getPendingList?${queryString}`)
        .then (response => response.json())
        .then(response => {

            dispatch({
                type: type.GET_PENDING_CONFESSIONS,
                payload: response
            })
        })
        .catch (err => {
            dispatch({
                type: type.GET_PENDING_CONFESSIONS,
                payload: err.response.data
            })
        })
};

export const getApprovedConfession = (page, limit, search = '') => dispatch => {

    const params = { page, limit, search };

    const queryString = paramEncoding(params);

    fetch (`/api/confession/getApprovedList?${queryString}`)
        .then (response => response.json())
        .then(response => {

            dispatch({
                type: type.GET_APPROVED_CONFESSIONS,
                payload: response
            })
        })
        .catch (err => {
            dispatch({
                type: type.GET_APPROVED_CONFESSIONS,
                payload: err.response.data
            })
        })

};

export const getRejectedConfession = (page, limit, search = '') => dispatch => {

    const params = { page, limit, search };

    const queryString = paramEncoding(params);

    fetch (`/api/confession/getRejectedList?${queryString}`)
        .then (response => response.json())
        .then(response => {

            dispatch({
                type: type.GET_REJECTED_CONFESSIONS,
                payload: response
            })
        })
        .catch (err => {
            dispatch({
                type: type.GET_REJECTED_CONFESSIONS,
                payload: err.response.data
            })
        })

};

export const incrementActivePage = activePage => dispatch => {

    const INCREMENTED_ACTIVE_PAGE = activePage + 1;

    dispatch ({
        type: type.INCREMENT_ACTIVE_PAGE,
        payload: INCREMENTED_ACTIVE_PAGE
    })

};

export const decrementActivePage = activePage => dispatch => {

    const DECREMENTED_ACTIVE_PAGE = activePage - 1;

    dispatch ({
        type: type.DECREMENT_ACTIVE_PAGE,
        payload: DECREMENTED_ACTIVE_PAGE
    })
};

export const selectPendingConfession = (confessionId) => dispatch => {

    dispatch ({
        type: type.SELECT_PENDING_CONFESSION,
        confessionId: confessionId
    });

};

export const deselectPendingConfession = (confessionId) => dispatch => {

    dispatch ({
        type: type.DESELECT_PENDING_CONFESSION,
        confessionId: confessionId
    });

};

export const postApproveConfessions = pendingConfession => dispatch => {

    axios.post ('/api/admin/confessions/approve', {
        pendingConfession
    }).then (response => {
        dispatch ({
            type: type.POST_APPROVE_CONFESSIONS,
            payload: response.data
        })
    }).catch (err => {
        dispatch ({
            type:type.POST_APPROVE_CONFESSIONS,
            payload: err.response.data
        })
    })
};

export const postRejectConfessions = pendingConfession => dispatch => {

    axios.post ('/api/admin/confessions/reject', {
        'rejectConfession': pendingConfession
    }).then (response => {
        dispatch ({
            type: type.POST_REJECT_CONFESSIONS,
            payload: response.data
        })
    }).catch (err => {
        dispatch ({
            type:type.POST_REJECT_CONFESSIONS,
            payload: err.response.data
        })
    })
};

export const setDisplayImage = images => dispatch => {
    dispatch({
        type: type.SET_DISPLAY_IMAGES,
        payload: images
    })
};

export const clearDisplayImage = () => dispatch => {
    dispatch ({
        type: type.REMOVE_DISPLAY_IMAGES
    })
};




