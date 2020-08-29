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


//the main function for calling mergesort on an array
function mergeSortRecursive(unsorted){
    /*Merge Sort is a Divide and Conquer algorithm.
    It divides input array in two halves, 
    calls itself for the two halves and,
    then merges the two sorted halves.*/
    let a=[...unsorted];
    if(a.length<=1)
        //if a contains only 1 or 0 element,
        //no need to do anything.
        return a;

    //finding middle index of array.
    let mid=Math.floor(a.length/2);
    //slicing the array and copying the
    //two halves in different arrays.
    let left=a.slice(0,mid);
    let right=a.slice(mid);
    //merging the arrays after recursively calling
    //itself on left and right part and then returning
    //the merged array.
    return mergeRecursive(mergeSortRecursive(left),mergeSortRecursive(right));
}//Time complexity: ⊖(nLogn).(best,average,worst).

//The function for the key process of merging
//the two arrays.
function mergeRecursive(left,right){
    let resultArray=[],leftIndex=0,rightIndex=0;
    while(leftIndex<left.length && rightIndex<right.length){
        //picking the lesser one 
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


function mergeSortIterative(arr){
    let sorted=[...arr];//copying the array so that original remains unchanged.
    let n=sorted.length;
    let currSize;
    let leftStart;
    for(currSize=1;currSize<=n-1;currSize=2*currSize){
        for(leftStart=0;leftStart<n-1;leftStart+=2*currSize){
            let mid=Math.min(leftStart+currSize,n);
            let rightEnd=Math.min(leftStart+2*currSize,n);
            mergeIterative(sorted,leftStart,mid,rightEnd);
        }
    }
    return sorted;
}
function mergeIterative(sorted,leftStart,mid,rightEnd){
    let left=sorted.slice(leftStart,mid);
    let right=sorted.slice(mid,rightEnd);
    let leftIndex=0,rightIndex=0,k=leftStart;
    while(leftIndex<left.length && rightIndex<right.length){
        //picking the lesser one 
        if(left[leftIndex]<=right[rightIndex]){
            sorted[k]=left[leftIndex];
            leftIndex++;
            k++;
        }
        else{
            sorted[k]=right[rightIndex];
            rightIndex++;
            k++;
        }
    }
    while(leftIndex<left.length && k<sorted.length){
        sorted[k]=left[leftIndex];
        leftIndex++;
        k++;
    }
    while(rightIndex<right.length && k<sorted.length){
        sorted[k]=right[rightIndex];
        rightIndex++;
        k++;
    }
}


function merge(arr, l, m, r) 
    { 
        // Find sizes of two subarrays to be merged 
        let n1 = m - l + 1; 
        let n2 = r - m; 
        /* Create temp arrays */
        let L = arr.slice(l,m+1); 
        let R = arr.slice(m+1,r+1);

        /* Merge the temp arrays */

        // Initial indexes of first and second subarrays 
        let i = 0, j = 0; 

        // Initial index of merged subarry array 
        let k = l; 
        while (i < n1 && j < n2) { 
            if (L[i] <= R[j]) { 
                arr[k] = L[i]; 
                i++; 
            } 
            else { 
                arr[k] = R[j]; 
                j++; 
            } 
            k++; 
        } 
        /* Copy remaining elements of L[] if any */
        while (i < n1) { 
            arr[k] = L[i]; 
            i++; 
            k++; 
        } 
        /* Copy remaining elements of R[] if any */
        while (j < n2) { 
            arr[k] = R[j]; 
            j++; 
            k++; 
        } 
    } 
    // Main function that sorts arr[l..r] using 
    // merge() 
function mergeSort(arr, l, r) 
{ 
    if (l==r)
    return;
    // Find the middle point 
    let m = Math.floor((l + r) / 2); 
    // Sort first and second halves 
    mergeSort(arr, l, m); 
    mergeSort(arr, m + 1, r); 
    // Merge the sorted halves 
    merge(arr, l, m, r); 
}

//The main function to call quick sort on an array.
function quickSort(arr){
    /*Like Merge Sort, 
    QuickSort is a Divide and Conquer algorithm.
    It picks an element as pivot and 
    partitions the given array around the picked pivot.*/
    let a=[...arr];//copying the array.
    let l=0;//low index
    let h=a.length-1;//high index
    quickSortHelper(a,l,h);
    return a;
}
//T(n) = T(k) + T(n-k-1) + ⊖(n)
//The first two terms are for two recursive calls, 
//the last term is for the partition process. 
//k is the number of elements which are smaller than pivot.

//The helper function for quick sort.
function quickSortHelper(a,l,h){
    //the base condition
    //to end the recursion.
    if(l-h>=0)
    return;
    //select the Pivot index
    //after partitioning.
    let pi=partition(a,l,h);
    //call the same function
    //to do partition on the left side
    //array of pivot index.
    quickSortHelper(a,l,pi-1);
    //to do partition on the right side
    //array of pivot index.
    quickSortHelper(a,pi+1,h);
}

function partition(a,l,h){
    /*Target of partitions is, 
    given an array and an element x of array as pivot, 
    put x at its correct position in sorted array 
    and put all smaller elements (smaller than x) before x, 
    and put all greater elements (greater than x) after x. 
    All this should be done in linear time.*/

    //select the element at high index as pivot.
    let pivot=a[h];
    //i=index with lower element.
    let i=l-1;
    let temp;
    for (let j=l;j<h;j++){
        //check every element of array from low to high-1.
        if(a[j]<pivot){
            //if the number is less than pivot
            //swap the number with number at index i.
            i++;
            temp=a[i];
            a[i]=a[j];
            a[j]=temp;
        }
    }
    //after swapping all the elements less than pivot,
    //put pivot at the next index.
    temp=a[i+1];
    a[i+1]=a[h];
    a[h]=temp;
    //return the index of pivot.
    return i+1;
}


function heapify(arr,length,i){
    let largest=i;
    let left=i*2+1;
    let right=left+1;
    if (left<length && arr[left]>arr[largest])
        largest=left;
    else if (right<length && arr[right]>arr[largest])
        largest=right;
    if(largest!=i){
        [arr[largest],arr[i]]=[arr[i],arr[largest]];
        heapify(arr,length,largest);
    }
    return arr;
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


// let s=performance.now();
// let sorted=mergeSortRecurisve(arr);
// console.log(`\n\nsorted array: ${sorted}`);
// let f=performance.now();
// console.log(`\nmergeSort took ${f-s} ${((f-s)==1)?" millisecond":" milliseconds"}`)


// let s=performance.now();
// mergeSort(arr,0,arr.length-1);
// console.log(`\n\nsorted array: ${arr}`);
// let f=performance.now();
// console.log(`\nmergeSort took ${f-s} ${((f-s)==1)?" millisecond":" milliseconds"}`)


let s=performance.now();
let sorted=quickSort(arr);
console.log(`\n\nsorted array: ${sorted}`);
let f=performance.now();
console.log(`\nmergeSort took ${f-s} ${((f-s)==1)?" millisecond":" milliseconds"}`)