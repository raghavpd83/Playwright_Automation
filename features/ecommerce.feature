 Feature: Ecommerce validation

    Scenario: Placing the order
        Given login to eccomerce application with "raghavpd83@gmail.com" and "P@ssw0rd123"
        When Add "ZARA COAT 3" is added to cart
        Then Verify "ZARA COAT 3" is displayed in the cart

        When Add valid details and place the order
        Then Verify the order in the order history page