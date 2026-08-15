describe('Módulo API - Reqres', () => {

    const baseUrl = 'https://reqres.in/api';
    const apiKey = 'reqres_dd22eb4b4dfe4b84b9715e10150a7d1a';

    const headers = {
        'x-api-key': apiKey
    };

    it('CP01 - Crear usuario y consultar usuario creado', () => {
   
        // 1.  Creación de usuario
        
        const user = {
            name: 'Karen ospina 1',
            job: 'Automation Engineer 1'
        };

        cy.request({
            method: 'POST',
            url: `${baseUrl}/users`,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: user
        }).then((postResponse) => {

          
            expect(postResponse.status).to.eq(201);

            expect(postResponse.body).to.have.property('id');
            expect(postResponse.body).to.have.property('createdAt');

            expect(postResponse.body.name).to.eq(user.name);
            expect(postResponse.body.job).to.eq(user.job);

           
            const userId = postResponse.body.id;

            cy.log(`Usuario creado con ID: ${userId}`);

      
            // Consultar usuario creado
            

            cy.request({
                method: 'GET',
                url: `${baseUrl}/users/${userId}`,
                headers: headers,
                failOnStatusCode: false
            }).then((getResponse) => {

                
                // Validaciones GET
                

                expect(getResponse.status).to.eq(200);

                cy.log(JSON.stringify(getResponse.body));

                expect(getResponse.body.data.name).to.eq(user.name);
                expect(getResponse.body.data.job).to.eq(user.job);

            });

        });

    });

});