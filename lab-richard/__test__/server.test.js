'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
require('jest');

describe('Server Integration Testing', function() {
    beforeAll(() => server.start(4001, () => console.log(`Listening on 4001`)));
    afterAll(() => server.stop());

    describe('Valid Requests', () => {
        describe('POST /api/v1/note', () => {
            let resPost;

            beforeAll(() => {
                return superagent.post(':4001/api/v1/note')
                    .send({title: 'Chocolate', content: 'Wombat'})
                    .then(res => {
                        resPost = res;
                    });
            });

            it('should create and post a new record', () => {
                expect(resPost.body.title).toEqual('Chocolate');
                expect(resPost.body.content).toEqual('Wombat');
            });

            it('should respond with a 201', () => {
                expect(resPost.status).toBe(201);
            });

            it('should have an _id property', () => {
                expect(resPost.body).toHaveProperty('_id');
            });
        });

        // describe('GET /api/v1/note', () => {
        //     let resPost = {};

        //     beforeAll(() => {
        //         return superagent.get(':4001/api/v1/note?_id=' + resPost._id)
        //             .then() => {
                        
        //             });
        //     });

        //     it('should create and post a new record');
            
        // });
        // describe('GET /api/v1/note?_id<record id>', () => {
        //     it('should create and post a new record');
            
    }); 
});

//     describe('Invalid Requests', () => {
//         describe('POST /api/v1/note', () => {
//             it('should create and post a new record');

//         });
//         describe('GET /api/v1/note', () => {
//             it('should create and post a new record');
            
//         });
//         describe('GET /api/v1/note', () => {
//             it('should create and post a new record');
            
//         }); 
//     });
// });