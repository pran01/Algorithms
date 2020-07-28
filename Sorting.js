const {performance} = require('perf_hooks');

function selectionSort(arr1){
    /*The selection sort algorithm sorts an array 
    by repeatedly finding the minimum element 
    (considering ascending order) 
    from unsorted part and putting it at the beginning.*/
    let arr=[...arr1]//copying the array so that the original one remain unchanged.
    const n=arr.length;
    for (let i=0;i<n;i++){//[<--sorted--> i <--unsorted-->]
        let min=i;
        //find the minimum number in the unsorted part.
        for(let j=i+1;j<n;j++){
            if (arr[j]<arr[min])
            min=j;
        }
        //swap the minimum value with the value at index i.
        let temp=arr[i];
        arr[i]=arr[min];
        arr[min]=temp;
    }
    //return the sorted array.
    return arr;
}//Time Complexity: O(n^2)
//It never makes more than O(n) swaps, and can be useful when memory write is very costly.


function bubbleSort(arr){
    //simplest sorting algorithm.
    //keeps swapping the adjacent elements if they are in wrong order.
    //Optimised Bubble sort:
    let sorted=[...arr];//copying the array
    let n=sorted.length;
    for(let i=0;i<n-1;i++){
        let swapped=false;
        for(let j=0;j<n-1-i;j++){//everytime the last element will become sorted.Hence, j<n-1-i
            if(sorted[j]>sorted[j+1]){
                //swap arr[j] and arr[j+1]
                let temp=sorted[j];
                sorted[j]=sorted[j+1];
                sorted[j+1]=temp;
                swapped=true;
            }
        }
        if(swapped==false){
            //it means the array was already sorted.
            return sorted;
        }
    }
    return sorted;
}//worst and average case: O(n*n)
//best case: O(n) -> when already sorted


function insertionSort(arr){
    /*The array is virtually split into a sorted and an unsorted part. 
    Values from the unsorted part are picked,
    and inserted at the correct position in the sorted part.*/
    let sorted=[...arr];
    let n=sorted.length;
    for(let i=1;i<n;i++){
        //selecting the elements starting from the 1st one.
        let key=sorted[i];
        let j=i-1;
        while(j>=0 && sorted[j]>key){
            //shifting all element greater than the key,
            //to the right by one index.
            sorted[j+1]=sorted[j];
            j-=1;
        }
        //inserting the key at its place.
        sorted[j+1]=key;
    }
    return sorted;
}//Time Complexity: O(n*2)


function mergeSort(unsorted){
    let a=[...unsorted];
    if(a.length<=1)
        return a;
    
    let mid=Math.floor(a.length/2);
    let left=a.slice(0,mid);
    let right=a.slice(mid);
    return merge(mergeSort(left),mergeSort(right));
}

function merge(left,right){
    let resultArray=[],leftIndex=0,rightIndex=0;
    let k=0;
    while(leftIndex<left.length && rightIndex<right.length){
        if(left[leftIndex]<=right[rightIndex]){
            resultArray.push(left[leftIndex]);
            leftIndex++;
        }
        else{
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }
    while(leftIndex<left.length){
        resultArray.push(left[leftIndex]);
        leftIndex++;
    }
    while(rightIndex<right.length){
        resultArray.push(right[rightIndex]);
        rightIndex++;
    }
    return resultArray;
}



let arr=[67,87,45,69,98,123,564,77,35,56,46,84,107,125,22];

// let s=performance.now();
// let sorted=selectionSort(arr);
// console.log(`\nsorted array: ${sorted}`);
// let f=performance.now();
// console.log(`\nselectionSort took ${f-s} ${((f-s)==1)?" millisecond":" milliseconds"}`)

// s=performance.now();
// sorted=bubbleSort(arr);
// console.log(`\n\nsorted array: ${sorted}`);
// f=performance.now();
// console.log(`\nbubbleSort took ${f-s} ${((f-s)==1)?" millisecond":" milliseconds"}`)


// s=performance.now();
// sorted=insertionSort(arr);
// console.log(`\n\nsorted array: ${sorted}`);
// f=performance.now();
// console.log(`\ninsertionSort took ${f-s} ${((f-s)==1)?" millisecond":" milliseconds"}`)


let s=performance.now();
let sorted=mergeSort(arr);
console.log(`\n\nsorted array: ${sorted}`);
let f=performance.now();
console.log(`\nmergeSort took ${f-s} ${((f-s)==1)?" millisecond":" milliseconds"}`)