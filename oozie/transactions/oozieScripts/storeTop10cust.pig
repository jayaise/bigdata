transactions = LOAD 'TransactionsData' USING PigStorage(',') as (id:chararray,chain:chararray,dept:chararray,category:chararray,company:chararray,brand:chararray,date:chararray, productsize:float, productmeasure:chararray, purchasequantity:int, purchaseamount:float);

chainGroupCust = GROUP transactions BY (chain,id);

chainGroupCustSpedings1 = FOREACH chainGroupCust GENERATE group, SUM(transactions.purchaseamount) as spendings;

chainGroupCustSpendings2= FOREACH chainGroupCustSpedings1 generate group.chain as chain,group.id as id, spendings;

chainGroupCustSpendings3= GROUP chainGroupCustSpendings2 BY chain;

chainTop10Cust = FOREACH chainGroupCustSpendings3{			  chainGroupCustSpedingsSort = ORDER chainGroupCustSpendings2 BY spendings DESC;
top10Cust1 = LIMIT chainGroupCustSpedingsSort  10;			
GENERATE top10Cust1;			
}

chainTop10Cust = FOREACH chainTop10Cust GENERATE FLATTEN(top10Cust1);

STORE chainTop10Cust INTO 'chainTop10Cust';
