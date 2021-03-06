import {body, query} from 'express-validator/check';

export const insertValidation = [

    body ('confession')
        .exists().withMessage('is required')
        .isString().withMessage('must be a string')
        .isLength({ min: 10 }).withMessage('must be at least 10 characters.'),

    body ('url')
        .optional({nullable: true})
        .isURL().withMessage('must be an url')

];

export const getPendingListValidation = [

    query ('page')
        .exists().withMessage('is required')
        .isInt({ min: 1 }).withMessage('must be an integer with minimum one'),

    query ('limit')
        .exists().withMessage('is required')
        .isInt({ min: 1 }).withMessage('must be an integer with minimum one')
];

export const getApprovedListValidation = [

    query ('page')
        .exists().withMessage('is required')
        .isInt({ min: 1 }).withMessage('must be an integer with minimum one'),

    query ('limit')
        .exists().withMessage('is required')
        .isInt({ min: 1 }).withMessage('must be an integer with minimum one'),

    query ('search')
        .isString().withMessage('must be a string')
];

export const getRejectedListValidation = [

    query ('page')
        .exists().withMessage('is required')
        .isInt({ min: 1 }).withMessage('must be an integer with minimum one'),

    query ('limit')
        .exists().withMessage('is required')
        .isInt({ min: 1 }).withMessage('must be an integer with minimum one'),

    query ('search')
        .optional({nullable: true})
        .isString().withMessage('must be a string')
];



