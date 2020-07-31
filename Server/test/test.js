const chai = require('chai');
const expect  = chai.expect;
const promised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const rewire = require('rewire')


chai.use(chaiHttp);
chai.use(promised);
let server = rewire('../server.js')

describe('GET API Request', () => {
    it('GET "/"', done => {
        chai.request(server)
        .get('/')
        .end((err,res) => {
            expect(res).to.be.html
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object') 
            expect(res.text).to.equal('Hello')
            done();
        });
    });

    it('Should have a status code of 200', done => {
        chai.request(server)
        .get('/posts')
        .end((err,res) => {
            expect(res).to.be.html
            expect(res.body).to.be.an('object')
            expect(res).to.have.status(200)
            done();
        });
    });
})

describe('POST API Request', () => {
    it('Response body should be JSON and have a status code of 200', ()  => {
        chai.request(server)
        .post('/posts')
        .type('ContentType', 'application/json')
        .then(res => {
            expect(res).to.have.status(200); 
            expect(res.body).to.be.json; 
            expect(Promise.reject).to.eventually.throw(Error)
            expect(Promise.resolve()).to.be.a('promise'); 
            expect('posts').to.include('title')
        })
        .catch( error => { return error } )
    });

    it('Should be able to make a new post', ()  => {
        chai.request(server)
        .post('/posts')
        .send(JSON.stringify({title: 'test', body: 'testing', gifUrl: 'url', comments: ['test'], laughEmoji: 0,likeEmoji: 0, loveEmoji: 0, cryEmoji: 0, angryEmoji: 0}))
        .type('ContentType', 'application/json')
        .then(res => {
            expect(res).to.have.status(200); 
            expect(res.body).to.be.json; 
            expect(Promise.reject).to.eventually.throw(Error)
            expect(Promise.resolve()).to.be.a('promise'); 
            expect('posts').to.include('title')
        })
        .catch( error => { return error } )
    });


    it('Should not POST with wrong URI"', done => {
        chai.request(server)
        .post('/post')
        .then(res => {
            expect(res).to.have.status(404); 
        })
        .catch((error) => {
            return error})
        done();
    });   
})