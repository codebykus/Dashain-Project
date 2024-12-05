// function findHighestConsecutiveOddNumber(num) {
//     let numStr = num.toString();
//     let longestOdd = "";
//     let currentOdd = "";

//     for (let i = 0; i < numStr.length; i++) {
//         let digit = numStr[i];
//         if (digit % 2 !== 0) {
//             currentOdd += digit;
//             if (currentOdd > longestOdd) {
//                 longestOdd = currentOdd;
//             }
//         } else {
//             currentOdd = "";
//         }
//     }

//     return longestOdd;
// }
// console.log(findHighestConsecutiveOddNumber(34512))



function isPerfectNumber(num){
    let sum =0;
    for(let i =1; i<=num/2;i++){
        if(num%i===0){
            sum=sum+i;
        }
    }
if (sum===num){
    return true;

}else{
    return false
}
}
console.log(isPerfectNumber(6));
console.log(isPerfectNumber(12))