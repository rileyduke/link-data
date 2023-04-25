// append array b to array a
// if there is overlap, merge the overlapped portion
function joinArrays(a, b) {
    if (a.length == 0) return b;
    if (b.length == 0) return a;

    let end = a[a.length-1]
    let iEndB = 0
    for (let i = 0; i < b.length; i++) {
        if (b[i] == end){
            for (let j = 0; j <= i; j++) {
                if (b[i-j] != a[a.length - 1 - j]) {
                    continue;
                }
            }

            iEndB = i;
            break;
        }
    }
    
    if(iEndB != 0) iEndB++;
    return a.concat(b.slice(iEndB))
}

const input1 = [1, 2, 3, 4];
const input2 = [5, 6, 7, 8];
const input3 = [1, 2, 3, 4];
const input4 = [3, 4, 5, 6];
const input4_2 = [2, 3, 4, 5, 6, 7, 8];

const input5 = [1, 2, 1, 2];
const input6 = [1, 2, 7, 8];

const input7 = [5, 5, 1, 2];
const input8 = [5, 1, 7, 8];

console.log(joinArrays(input1, input2))
console.log(joinArrays(input1, input3))
console.log(joinArrays(input1, input4))
console.log(joinArrays(input1, input4_2))
console.log(joinArrays(input5, input6))
console.log(joinArrays(input7, input8))

