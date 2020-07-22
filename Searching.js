const {performance} = require('perf_hooks');

function linearSearch(arr,x){
    let n=arr.length;
    for (i=0;i<n;i++){
        if(arr[i]==x)
        return i;
    }
    return -1;
}//Time complexity O(n).


function binarySearch(arr,x){
    //Binary Search requires the array to be sorted.
    let n=arr.length-1;
    let mid=Math.floor(n/2);
    //we will try the recursive approach in this.
    if (n>=1){
        if (arr[mid]==x){
            //if the middle value if the required number,
            //return the middle index.
            return mid;
        }
        else if (arr[mid]<x){
            //if middle value is less than x,
            //we search the right side of the array.
            return binarySearch(arr.slice(mid+1,),x);
        }
        else if(arr[mid]>x){
            //if middle value is more than x,
            //we search the left side of the array.
            return binarySearch(arr.slice(0,mid),x);
        }
    }
    else{
        //if length of the array becomes 0,
        //x is not in array, we return -1. 
        return -1;
    }
}//T(n)=T(n/2)+c
//theta(log(n))


function interpolationSearch(arr,x){
    /*An improvement over binary search for instances where,
    the values in a sorted array are uniformly distributed.
    Binary Search always goes to the middle element to check. 
    On the other hand, interpolation search may go to 
    different locations according to the value of the key being searched.*/
    let lo=0,hi=(arr.length)-1;
    //x has to be in the range [lo,hi]
    while ((lo<=hi)&&(x>=arr[lo])&&(x<=arr[hi])){
        if(lo==hi){
            //when lo=hi the array will contain only one value.
            if(arr[lo]==x)
            //if that value is x, return the index.
                return lo;
            else
                return -1;
        }
        // The case: lo<hi
        // The idea of formula is to return higher value of pos
        // when element to be searched is closer to arr[hi]. And
        // smaller value when closer to arr[lo]
        let pos=lo + (((hi-lo)/(arr[hi]-arr[lo]))*(x - arr[lo]));
        if(arr[pos]==x){
            return pos;
        }
        else if (arr[pos]>x){
            //if x is less than the value at probe, we select pos from the left part.
            hi=pos-1;
        }
        else{
            //if x is more than the value at probe, we select pos from the right part.
            lo=pos+1;
        }
    }
    return -1;
}//If elements are uniformly distributed, 
//then O(log(log(n))).
//worst case : O(n).


let arr=[56,45,78,55,43,98,67,65,195,43,88,40,39,34,76,82,99];
let temp=[...arr];//copying an array.
let sorted=arr.sort(function(a,b){return a-b;});
//if you only use arr.sort(), it sorts the array as strings.
//So, "25" becomes greater than "100".
arr=[...temp];

let s=performance.now();
console.log(linearSearch(arr,199));
let f= performance.now();
console.log(`linearSearch took ${f-s} milliseconds`);

s=performance.now();
console.log(binarySearch(sorted,199));
f= performance.now();
console.log("binarySearch took "+(f-s)+((f-s==1)?" millisecond":" milliseconds"));

s=performance.now();
console.log(interpolationSearch(sorted,199));
f= performance.now();
console.log("interpolationSearch took "+(f-s)+((f-s==1)?" millisecond":" milliseconds"));
