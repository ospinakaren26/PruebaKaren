describe('Smoke Test - Login SauceDemon', ()=>{
    
    it('login exitosocon credenciales validas', ()=>{
        cy.visit('https://www.saucedemo.com/')
        
        cy.get('[data-test ="username"]')
        .type ('standard_user')

        cy.get('[data-test ="password"]')
        .type ('secret_sauce')

        cy.get('[data-test ="login-button"]')
        .click()

        cy.url().should('include', '/inventory.html')

    })

    it('login fallido con contraseña incorrecta', ()=>{
        cy.visit('https://www.saucedemo.com/')  

        cy.get('[data-test="username"]')
        .type('standard_user')

        cy.get('[data-test="password"]')
        .type('password_incorrecta')

        cy.get('[data-test="login-button"]')
        .click()

        cy.get('[data-test="error"]')
        .should('be.visible')
    })


    it('Validación de campos obligatorios', ()=>{
       cy.visit('https://www.saucedemo.com/') 
       
       cy.get('[data-test="login-button"]')
       .click()

       cy.get('[data-test="error"]')
       .should('be.visible')
       .and('contain', 'Username is required')
    })
})


   
