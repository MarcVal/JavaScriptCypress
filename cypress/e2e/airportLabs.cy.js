

describe('first test suite', () =>{
    it('I. Check page title value', ()=>{
        cy.visit('https://airportlabs.com/')
        // 1.
        cy.title('head > title').should('eq','AirportLabs - Making Aviation More Efficient')
      
        //2.
        let expTitle='AirportLabs - Making Aviation More Efficient'
        cy.get('head > title').then((x)=>{
        let actTitle=x.text()
        assert.equal(expTitle,actTitle)
       })

       //3.
       let expectedTitle='AirportLabs - Making Aviation More Efficient'
       cy.get('head > title').invoke('text').then((actualTitle)=>{
       // cy.log(actualTitle)
        expect(actualTitle).to.equal(expectedTitle)

       })     

    })
    it('II. Verify the statistic',()=>{
        cy.visit('https://airportlabs.com/')
        let expText='5.1K'
        cy.xpath('/html/body/section[1]/div[3]/div/div[2]/div[2]/div[1]/div[1]').invoke('prop','textContent').then((actText)=>{
            cy.log(actText)
             expect(actText).to.equal(expText)
     
            })
            let expColor='rgb(20, 163, 188)'
        cy.get('.product--va .stats__num').invoke('css','color').then((actColor)=>{
            cy.log(actColor)
            expect(actColor).to.equal(expColor)
     
            })     
    }) 

    it('III. Verify Get in touch',()=>{
        cy.visit('https://airportlabs.com/')
        cy.scrollTo('bottom')
        cy.get('body > footer > div > div.footer__item-wp > div:nth-child(1) > span')
        .should('be.visible')
        .and('have.text','GET IN TOUCH')
        
        cy.get('a.mail')
        .should('exist').and('have.text','contact@airportlabs.com')
        .invoke('attr','href').should('eq','mailto:contact@airportlabs.com')
        //cy.get('a.mail').click()

    })

    it('IV. Verify Social Media Links',()=>{
        cy.visit('https://airportlabs.com/')
        cy.get('body > footer > div > div.footer__item-wp > div:nth-child(2) > div > a:nth-child(1)')
        .then((link)=>{
            cy.request(link.prop('href'))
            .its('status')
            .should('eq',200)
        })
        //or
        cy.get('body > footer > div > div.footer__item-wp > div:nth-child(2) > div > a:nth-child(1)')
        cy.url('eq','https://twitter.com/airportlabs')
   
        // same for FB and Linkedin
    
})
    it('V. Verify Logo Image',()=>{
    cy.visit('https://airportlabs.com/')
    cy.get('img.logo')
    //.should('be.visible')
    //.should(([img])=>{
        //expect(img.naturalWidth).to.equal(80);
        //expect(img.naturalHeight).to.equal(52);
        //expect(img.src).to.equal("https://airportlabs.com/img/al-white.svg");
    //})
    .should(([img])=>{
        expect(img.complete).to.be.true;
    })
    .then(([img])=>{
        cy.fixture('airLogo.svg').then(content => {
            let expectedLogo = new Image();
            expectedLogo.src = 'data:image/svg;base64,${content}';
            expectedLogo.onload=()=>{
                expect(img.naturalWidth).to.equal(expectedLogo.naturalWidth);
                expect(img.naturalHeight).to.equal(expectedLogo.naturalHeight);    
            }
        })
    })

    })

})
