// // function countVowels(string){
// //     const vowels="aeiouAEIOU";
// //     let count=0;
// //     for(let i=0;i<string.length;i++){
// //         if(vowels.includes(string[i])){
// //             count++
// //         }
// //     }
// //     return count;
// // }
// // console.log(countVowels("Hello World"));
// // console.log(countVowels("Programming")); 




// // // find the consecutive highest odd number present in 25612312 using javascript
// // function consecutiveOddNumber(){
// // const stringNum=num.toString();

// //     let oddNumber="";
// //     let tempOddNummber="" 
// // for(
// //     let i=0;i<stringNum.length;i++
// // ){
// //     let digit=stringNum[i]
// // if (
// //     digit % 2 !==0
// // ){
// //         tempOddNummber=tempOddNummber + digit;
// //         if (tempOddNummber>oddNumber){
// //             oddNumber=tempOddNummber
// //         }
// //         else {
// //             oddNumber=""
// //         }
// //     }
// // return oddNumber()

// // }
// // }
// function findHighestConsecutiveOddNumber(num) {
//     let numStr = num.toString(); // Convert the number to a string
//     let longestOddSequence = ""; // Variable to store the longest odd sequence
//     let currentOddSequence = ""; // Temporary variable for the current sequence

//     for (let i = 0; i < numStr.length; i++) {
//         let digit = parseInt(numStr[i]); // Convert each digit to a number
//         if (digit % 2 !== 0) { // Check if the digit is odd
//             currentOddSequence += digit; // Add it to the current sequence
//             if (currentOddSequence.length > longestOddSequence.length) {
//                 longestOddSequence = currentOddSequence; // Update the longest odd sequence
//             }
//         } else {
//             currentOddSequence = ""; // Reset current sequence on even digit
//         }
//     }

//     return longestOddSequence;
// }

// // Example usage
// console.log(findHighestConsecutiveOddNumber(2222351)); // Output should be 2351



// To find fibonnaci seies
// function fibonacciSeries(num) {
//     let fibNumbe = [0, 1];
//     for (let i = 2; ; i++) { 
//         let Numbe = fibNumbe[i - 1] + fibNumbe[i - 2];
//         if (Numbe > num) { 
//             break;
//         }
//         fibNumbe[i] = Numbe; 
//     }
//     return fibNumbe;
// }

// console.log(fibonacciSeries(5));  
// console.log(fibonacciSeries(3)); 
// console.log(fibonacciSeries(15)); 


// Find the sum of all multiples of 3 and 5 below 1000

function naturalNumber(num){
    let number=0;
    for(let i=0;i<num;i++){
        if (i%3===0||i%5===0)
number=number+i
    }
    return number;
}
console.log(naturalNumber(10))
console.log(naturalNumber(1000))
console.log(naturalNumber(100))