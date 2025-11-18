using assignment as my from '../db/schema';
 
service catalog @(path:'/catalog'){
 
 entity Books as projection on my.Books;
 entity Authors as projection on my.Authors;
 entity Orders as projection on my.Orders;
   
 
action orderSubmit(bookID : Integer, qty : Integer) returns String;
}