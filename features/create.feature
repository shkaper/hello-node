Feature: Create order
  Using a web browser
  I want to create orders in CRM

  Scenario: Create an order
    Given I visit /start page
    When I enter 'something' into 'itemcreate'
    And I enter 'someone' into 'customercreate'
    And I click 'submitcreate'
    Then I should see 'something' and 'someone' in a registered order
