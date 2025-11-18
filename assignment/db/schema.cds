namespace assignment;
 
entity Books{
  key ID     : Integer;
  title      : String;
  author     : String;
  price      : Decimal(9,2);
  available  : Boolean;
  stock      : Integer;
}
 
entity Authors {
  key ID     : Integer;
  name       : String(100);
  country    : String;
}
 
entity Orders {
  key ID     : Integer;
  bookID     : Integer;
  qty        : Integer;
  amount     : Decimal(9,2);
}