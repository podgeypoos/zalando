var should = require('should');
var assert = require('assert');
var request = require('supertest');

var paintFactory = require('../paintFactory');

describe('api', function () {
    var url = 'http://localhost:8080';
    before(function (done) {
        // In our tests we use the test db
        done();
    });
    describe('upload', function () {
        it('should return 200 ok when it is given a valid file', function (done) {
            request(url)
                .post('/uploads')
                .attach('file', './test/test.txt')
                .end(function (err, res) {
                    should(res).have.property('status', 200);
                    done();
                });
        });
        it('should return \'["use case 0: 1,0,0,0,0","use case 1: Impossible"]\'', function (done) {
            request(url)
                .post('/uploads')
                .attach('file', './test/test.txt')
                .end(function (err, res) {
                    result = res.text;
                    result.should.be.a.String().and.match('["use case 0: 1,0,0,0,0","use case 1: Impossible"]');
                    done();
                });
        });
        it('should return [] when you pass a file with invalid characters', function (done) {
            request(url)
                .post('/uploads')
                .attach('file', './test/failtest.txt')
                .end(function (err, res) {

                    result = res.text;
                    result.should.be.a.String().and.match('[]');
                    done();
                });
        })
    });
    describe('Paint factory', function () {
        it('should return 111 when given 1 1 1', function (done) {
            result = paintFactory.cleanUpFile("1 1 1 ");
            result.should.be.eql('111');
            done();
        });
        it(' should return 1,0,0,0,0 when passed a batch of [ [ [ 0, 1 ] ], [ [ 0, 0 ], [ 1, 0 ] ], [ [ 4, 0 ] ] ]', function (done) {
            batchs=[ [ [ 0, 1 ] ], [ [ 0, 0 ], [ 1, 0 ] ], [ [ 4, 0 ] ] ];
            numberOfPaintColors=5;
            result = paintFactory.processBatch(numberOfPaintColors, batchs);
            result.should.be.eql([ 1, 0, 0, 0, 0 ]);
            done();
        });
        it(' should return Impossible when passed a batch of [ [ [ 0, 0 ] ], [ [ 0, 1 ] ] ]', function (done) {
            batchs=[ [ [ 0, 0 ] ], [ [ 0, 1 ] ] ];
            numberOfPaintColors=1;
            result = paintFactory.processBatch(numberOfPaintColors, batchs);
            result.should.be.eql('Impossible');
            done();
        });
        it(' should return a zerod out array of size 5 when given a size of 5', function (done) {
            result = paintFactory.createEmptyBatch(5);
            result.should.be.eql([0, 0, 0, 0, 0]);
            done();
        });
    });

});
