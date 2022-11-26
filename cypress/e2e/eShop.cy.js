

describe('first test suite', () =>{
    it('Add most expensive TV to cart', ()=>{
        cy.visit('https://www.emag.ro/televizoare/c?ref=hp_menu_quick-nav_190_1&type=category')
          
        cy.xpath('/html/body/div[11]/div/div[2]/button[1]').click()
        cy.get('i.em.em-close').eq(0).click()
        cy.get('.js-dismiss-login-notice-btn > .em').click()
        cy.get('h1.title-phrasing,title-phrasing-xl').should('contain','Televizoare')

        //Select brand
        cy.xpath('//*[@id="main-container"]/section[1]/div/div[3]/div[2]/div[1]/div[3]/div/div/div/div/div/div[1]/button').should('contain','Samsung').click()
        

        //sort by descending price
        cy.get(':nth-child(2) > .sort-control-btn-dropdown > .btn > .sort-control-btn-option').click()
        cy.get('a.js-sort-option')
        .each(($el,index,list)=>{
            cy.log($el.text())
            if($el.text()=='Pret descrescator'){
                cy.wrap($el).contains('Pret descrescator').click({force: true})
                Cypress.on('uncaught:exception', (err, runnable) => {
                    return false
                  })
            }
        })

        //verify the largest price
       
        /*cy.get('p.product-new-price')
        .eq(0).invoke('text')
        .then(parseFloat).should('be.gt',?)*/
     

        function getPrices(element){
             const text = element.innerText
            const matched = element.innerText.match(/(?<Lei>)/)
            const priceText = Cypress._.get(matched, 'groups.Lei')
            return priceText
            
        }
       
        cy.get('p.product-new-price')
        .then($list =>{
            const maxEl = Cypress._.maxBy($list, getPrices)
                 return maxEl
                 
        })
        .should('contain', 'Lei')
     })
       
 })



