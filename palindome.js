// function palindromeNum(num){
// //     let str=num.toString();
// //     return str === str.split('').reverse().join('')
// // }
// // console.log(palindromeNum(121));
// // console.log(palindromeNum(2323))

// // without string
function palindromeNum(num){
    if (num<0)
        return false;

    let originalNum=num;
    let reverseNum=0;
    while(num >0){
        let digit=num%10;
        reverseNum=reverseNum*10+digit;
        num=Math.floor(num/10);

    }
return originalNum===reverseNum;
}

console.log(palindromeNum(121))
console.log(palindromeNum(-121))                        