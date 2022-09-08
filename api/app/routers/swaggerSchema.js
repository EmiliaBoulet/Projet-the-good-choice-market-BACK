/**
* @swagger
* components:
*  schemas:
*    Company:
*      type: object
*      properties:
*        id:
*          type: integer
*        name:
*          type: string
*    Brand:
*      type: object
*      properties:
*        id:
*          type: integer
*          exemple: 23
*          description: auto-generated id of brand
*        name:
*          type: string
*          exemple: Les gourmands verts
*          description: the name of brand
*        slogan:
*          type: string
*          exemple: tout est bon dans le végétal
*          description: the slogan of brand
*        logo:
*          type: string
*          exemple: logogourmandsverts.jpg
*          description: the logo of brand
*        activity_field:
*          type: string
*          exemple: cours de cuisine
*          description: the activity field of brand
*        delivery_cost:
*          type: integer
*          exemple: 29
*          description: the price of delivery
*        company_id:
*          type: integer
*          exemple: 3
*          description: the company id link of a brand
*        created_at:
*          type: string
*          exemple: 2022-07-20T09:24:00.419Z
*          description: the date of creation in BDD
*        updated:
*          type: string
*          exemple: 2022-07-20T09:24:00.419Z
*          description: the date of lastest update
*      required:
*        - name
*    BrandWithProduct:
*      type: object
*      properties:
*        id:
*          type: integer
*          exemple: 23
*          description: auto-generated id of brand
*        name:
*          type: string
*          exemple: Les gourmands verts
*          description: the name of brand
*        slogan:
*          type: string
*          exemple: tout est bon dans le végétal
*          description: the slogan of brand
*        logo:
*          type: string
*          exemple: logogourmandsverts.jpg
*          description: the logo of brand
*        activity_field:
*          type: string
*          exemple: cours de cuisine
*          description: the activity field of brand
*        delivery_cost:
*          type: integer
*          exemple: 29
*          description: the price of delivery
*        company_id:
*          type: integer
*          exemple: 3
*          description: the company id link of a brand
*        created_at:
*          type: string
*          exemple: 2022-07-20T09:24:00.419Z
*          description: the date of creation in BDD
*        updated:
*          type: string
*          exemple: 2022-07-20T09:24:00.419Z
*          description: the date of lastest update
*        description:
*          type: string
*          exemple: Durée 2h30
*          description: the description of product
*        image:
*          type: string
*          exemple: courscéramique.jpg
*          description: the image of product
*        location:
*          type: string
*          exemple: For de france
*          description: the location of product
*        barcode:
*          type: integer
*          exemple: 86345697
*          description: the barcode 8 or 13 number
*        expiration_date:
*          type: string
*          exemple: 2022-07-20T09:24:00.419Z
*          description: the expiration date of product
*        height:
*          type: string
*          exemple: 35cm
*          description: the height of product
*        width:
*          type: string
*          exemple: 30cm
*          description: the width of product
*        depht:
*          type: string
*          exemple: 36m
*          description: the depht of product
*        weight:
*          type: string
*          exemple: 10kg
*          description: the weight of product
*        size:
*          type: string
*          exemple: L
*          description: the size of product
*        price_ht:
*          type: integer
*          exemple: 35.6
*          description: the price ht of product
*        price_promo:
*          type: integer
*          exemple: 30.99
*          description: the price with promo
*        price_kg:
*          type: integer
*          exemple: 50.5
*          description: the price for one kilo
*      required:
*        - name
*    Product:
*      type: object
*      properties:
*        id:
*          type: integer
*          exemple: 23
*          description: auto-generated id of product
*        name:
*          type: string
*          exemple: Masque pour cheveux
*          description: the name of the product
*        Description:
*          type: string
*          exemple: masque pour cheveux secs
*          description: description of the product details
*        image:
*          type: string
*          exemple: masquecheveuxsecs.jpg
*          description: the logo of brand
*        location:
*          type: string
*          exemple: toulouse
*          description: the location of the product activity
*        barcode:
*          type: integer
*          exemple: 1258665842365
*          description: the barcode of the product
*        expiration_date:
*          type: string
*          exemple: 2022-07-20T09:24:00.419Z
*          description: the expiration_date of the alimentary product
*        height:
*          type: integer
*          exemple: 120
*          description: the height of the product
*        width:
*          type: integer
*          exemple: 100
*          description: the width of the product
*        depth:
*          type: integer
*          exemple: 60
*          description: the depth of the product
*        weight:
*          type: string
*          exemple: 250
*          description: the weight of the product
*        size:
*          type: string
*          exemple: XL
*          description: the size of the product
*        price_ht:
*          type: integer
*          exemple: 9.9
*          description: the price without the taxes of the product
*        price_promo:
*          type: integer
*          exemple: 399
*          description: the price in promotion of the product
*        price_kg:
*          type: integer
*          exemple: 24
*          description: the price per kilogramme of the product
*        tva_id:
*          type: integer
*          exemple: 2
*          description: the tva rate of the product
*        brand_id:
*          type: integer
*          exemple: 5
*          description: the brand of the product
*      required:
*        - name
*        - description
*        - image
*        - price_ht
*        - tva_id
*        - brand_id
*    Tva:
*      type: object
*      properties:
*        id:
*          type: integer
*        rate:
*          type: integer
*          exemple: 2.5
*          description: the rate of the taxes to apply to the product
*      required:
*        - rate
*    Category:
*      type: object
*      properties:
*        id:
*          type: integer
*          exemple: 23
*          description: auto-generated id of category
*        name:
*          type: string
*          exemple: Les gourmands verts
*          description: the name of category
*      required:
*        - name
*    CategoryWithProduct:
*      type: object
*      properties:
*        id:
*          type: integer
*          exemple: 23
*          description: auto-generated id of product
*        name:
*          type: string
*          exemple: Les gourmands verts
*          description: the name of product
*        description:
*          type: string
*          exemple: Durée 2h30
*          description: the description of product
*        image:
*          type: string
*          exemple: courscéramique.jpg
*          description: the image of product
*        location:
*          type: string
*          exemple: For de france
*          description: the location of product
*        barcode:
*          type: integer
*          exemple: 86345697
*          description: the barcode 8 or 13 number
*        expiration_date:
*          type: string
*          exemple: 2022-07-20T09:24:00.419Z
*          description: the expiration date of product
*        height:
*          type: string
*          exemple: 35cm
*          description: the height of product
*        width:
*          type: string
*          exemple: 30cm
*          description: the width of product
*        depht:
*          type: string
*          exemple: 36m
*          description: the depht of product
*        weight:
*          type: string
*          exemple: 10kg
*          description: the weight of product
*        size:
*          type: string
*          exemple: L
*          description: the size of product
*        price_ht:
*          type: integer
*          exemple: 35.6
*          description: the price ht of product
*        price_promo:
*          type: integer
*          exemple: 30.99
*          description: the price with promo
*        price_kg:
*          type: integer
*          exemple: 50.5
*          description: the price for one kilo
*      required:
*        - name
*    User:
*      type: object
*      properties:
*        id:
*          type: integer
*          exemple: 23
*          description: auto-generated id of category
*        firstname:
*          type: string
*          exemple: Steven
*          description: the firstname of user
*        lastname:
*          type: string
*          exemple: pasparla
*          description: the lastname of user
*        birthday:
*          type: string
*          exemple: 10/01/1974
*          description: the birthday of user
*        email:
*          type: string
*          exemple: pasparla@wanadoo.fr
*          description: the email of user
*        password:
*          type: string
*          exemple: 1234
*          description: the password of user
*        phone_number:
*          type: integer
*          exemple: 0697016300
*          description: the phone-number of user
*        address:
*          type: string
*          exemple: 46 rue de la porte dà coté
*          description: the address of user
*        postal_code:
*          type: string
*          exemple: 75007
*          description: the postal_code of user
*        city:
*          type: string
*          exemple: Paris
*          description: the city of user
*        country:
*          type: string
*          exemple: france
*          description: the counrty of user
*      required:
*        - firstname
*        - lastname
*        - email
*        - password
*    UserwithProduct:
*      type: object
*      properties:
*        id:
*          type: integer
*          exemple: 23
*          description: auto-generated id of category
*        firstname:
*          type: string
*          exemple: Steven
*          description: the firstname of user
*        lastname:
*          type: string
*          exemple: pasparla
*          description: the lastname of user
*        birthday:
*          type: string
*          exemple: 10/01/1974
*          description: the birthday of user
*        email:
*          type: string
*          exemple: pasparla@wanadoo.fr
*          description: the email of user
*        password:
*          type: string
*          exemple: 1234
*          description: the password of user
*        phone_number:
*          type: integer
*          exemple: 0697016300
*          description: the phone-number of user
*        address:
*          type: string
*          exemple: 46 rue de la porte dà coté
*          description: the address of user
*        postal_code:
*          type: string
*          exemple: 75007
*          description: the postal_code of user
*        city:
*          type: string
*          exemple: Paris
*          description: the city of user
*        country:
*          type: string
*          exemple: france
*          description: the counrty of user
*        name:
*          type: string
*          exemple: Masque pour cheveux
*          description: the name of the product
*        Description:
*          type: string
*          exemple: masque pour cheveux secs
*          description: description of the product details
*        image:
*          type: string
*          exemple: masquecheveuxsecs.jpg
*          description: the logo of brand
*        location:
*          type: string
*          exemple: toulouse
*          description: the location of the product activity
*        barcode:
*          type: integer
*          exemple: 1258665842365
*          description: the barcode of the product
*        expiration_date:
*          type: string
*          exemple: 2022-07-20T09:24:00.419Z
*          description: the expiration_date of the alimentary product
*        height:
*          type: integer
*          exemple: 120
*          description: the height of the product
*        width:
*          type: integer
*          exemple: 100
*          description: the width of the product
*        depth:
*          type: integer
*          exemple: 60
*          description: the depth of the product
*        weight:
*          type: string
*          exemple: 250
*          description: the weight of the product
*        size:
*          type: string
*          exemple: XL
*          description: the size of the product
*        price_ht:
*          type: integer
*          exemple: 9.9
*          description: the price without the taxes of the product
*        price_promo:
*          type: integer
*          exemple: 399
*          description: the price in promotion of the product
*        price_kg:
*          type: integer
*          exemple: 24
*          description: the price per kilogramme of the product
*        tva_id:
*          type: integer
*          exemple: 2
*          description: the tva rate of the product
*        brand_id:
*          type: integer
*          exemple: 5
*          description: the brand of the product
*    Image:
*      type: object
*      properties:
*        url:
*          type: string
*          exemple: https://res.cloudinary.com/drjw8g2yn/image/upload/v1658906844/visuels%20produits/Loisirs/Stone%20Ceramics/PoterieIllustration_miniature_sqebpo.jpg
*          description: Url of image in cloudinary
*      required:
*        - url
*/
