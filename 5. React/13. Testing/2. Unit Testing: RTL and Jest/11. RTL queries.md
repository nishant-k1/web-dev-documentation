# RTL Query

## What is RTL query

1. RTL is mostly used to test UI elements
2. Using RTL query we can find UI elements for testing purpose

## Why need RTL Query?

A component can have several UI elements. Using RTL query we can find those elements and test it.

## Steps in testing UI

1. Render component
2. Find element and action (action is optional)
3. Assertions

## How RTL Query finds elements?

RTL have mulitple ways to find elements: 1. By element type 2. By element name 3. By element id 4. By Test id 5. etc

## Why do we need so many types of RTL queries

Lets asuume we have button then we can find and test it using By element type but if there's are 5 buttons then we will need to use By element name. Even name can be same in that case we can use By element id
and so on.

## Type of RTL Queries?

Elements can be found out in two ways

1. Find single element

   - getBy
   - queryBy
   - findBy

2. Find multiple elements

   - getAllBy
   - queryAllBy
   - findAllBy
