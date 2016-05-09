var should = require('should');
var assert = require('assert');
var request = require('supertest');


describe('api', function() {
    var url = 'http://localhost:8080';
    before(function(done) {
        // In our tests we use the test db
        done();
    });
    describe('upload', function() {
        it('should return 200 ok when it is given a valid file', function(done) {
            request(url)
                .post('/uploads')
                .attach('file', './test/test.txt')
                .end(function(err, res) {
                    should(res).have.property('status', 200);
                    done();
                });
        });
        it('should return \'["use case 0: 1,0,0,0,0","use case 1: Impossible"]\'', function(done){
            request(url)
                .post('/uploads')
                .attach('file', './test/test.txt')
                .end(function(err, res) {
                    result =res.text;
                    result.should.be.a.String().and.match('["use case 0: 1,0,0,0,0","use case 1: Impossible"]');
                    done();
                });
        });
        it('should fail when you pass a file with invalid characters', function(done){
            request(url)
                .post('/uploads')
                .attach('file', './test/failtest.txt')
                .end(function(err, res) {

                    result =res.text;
                    result.should.be.a.String().and.match('[]');
                    done();
                });
        })
    });
});
