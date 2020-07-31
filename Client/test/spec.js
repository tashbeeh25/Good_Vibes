const expect = require('chai').expect;
const puppeteer = require('puppeteer');
//let server = rewire('../server.js')
const fs = require('fs');
const { doesNotMatch } = require('assert');
const pti = require('puppeteer-to-istanbul')

let browser;
let page;

before(async () => {
    try {
        browser = await puppeteer.launch({headless: true});
        page = await browser.newPage();
        const html = fs.readFileSync('index.html', {encoding: 'utf-8'});
        await page.setContent(html)
    } catch {
        done();
    }
    
});

describe('index.html', () => {

    //testing forms and their inputs 
    describe('form', () => {
        it('exists', async () => {
            const form = await page.$('section');
            expect(form).to.exist;
        });

        //testing textarea input for post titles
        describe('Post title text area', () => {
            let textAreaTitle;
            it('has an id of "postTitle""', async () => {
                textAreaTitle = await page.$('section textarea#postTitle');
                expect(textAreaTitle).to.exist;
            });

            
            it('has a max length of 300', async () => {
                const maxLength = await textAreaTitle.evaluate(el => el.getAttribute("maxlength"), textAreaTitle);
                expect(maxLength).to.equal('300');
            })
            
        })

        //testing textarea input for post body
        describe('Post body text area', () => {
            let textAreaBody;
            it('has an id of "postBody""', async () => {
                textAreaBody = await page.$('section textarea#postBody');
                expect(textAreaBody).to.exist;
            });

            
            it('has a max length of 100', async () => {
                const maxLength = await textAreaBody.evaluate(el => el.getAttribute("maxlength"), textAreaBody);
                expect(maxLength).to.equal('10000');
            })
            
        })

        describe('Post button to exist', () => {
            let postBtn;
            it('has an id of "Post""', async () => {
                postBtn = await page.$('section button#Post');
                expect(postBtn).to.exist;
            });
        })

        describe('Discard button to exist', () => {
            let discardBtn;
            it('has an id of "Discard""', async () => {
                discardBtn = await page.$('section button#Discard');
                expect(discardBtn).to.exist;
            });
        })

        describe('Add Gif button to exist', () => {
            let addGifBtn;
            it('has an id of "addGif""', async () => {
                addGifBtn = await page.$('section button#addGif');
                expect(addGifBtn).to.exist;
            });
        })

        describe('Search for Gif searchbar to exist', () => {
            let searchBar;
            it('has an id of "searchBar""', async () => {
                searchBar = await page.$('section div#searchBar');
                expect(searchBar).to.exist;
            });
        })

    });

});

after(async () => {
    await browser.close();
});
