const { performance } = require("perf_hooks");

function selectionSort(arr1) {
  /*The selection sort algorithm sorts an array 
    by repeatedly finding the minimum element 
    (considering ascending order) 
    from unsorted part and putting it at the beginning.*/
  let arr = [...arr1]; //copying the array so that the original one remain unchanged.
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    //[<--sorted--> i <--unsorted-->]
    let min = i;
    //find the minimum number in the unsorted part.
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    //swap the minimum value with the value at index i.
    let temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
  }
  //return the sorted array.
  return arr;
} //Time Complexity: O(n^2)
//It never makes more than O(n) swaps, and can be useful when memory write is very costly.

function bubbleSort(arr) {
  //simplest sorting algorithm.
  //keeps swapping the adjacent elements if they are in wrong order.
  //Optimised Bubble sort:
  let sorted = [...arr]; //copying the array
  let n = sorted.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      //everytime the last element will become sorted.Hence, j<n-1-i
      if (sorted[j] > sorted[j + 1]) {
        //swap arr[j] and arr[j+1]
        let temp = sorted[j];
        sorted[j] = sorted[j + 1];
        sorted[j + 1] = temp;
        swapped = true;
      }
    }
    if (swapped == false) {
      //it means the array was already sorted.
      return sorted;
    }
  }
  return sorted;
} //worst and average case: O(n*n)
//best case: O(n) -> when already sorted

function insertionSort(arr) {
  /*The array is virtually split into a sorted and an unsorted part. 
    Values from the unsorted part are picked,
    and inserted at the correct position in the sorted part.*/
  let sorted = [...arr];
  let n = sorted.length;
  for (let i = 1; i < n; i++) {
    //selecting the elements starting from the 1st one.
    let key = sorted[i];
    let j = i - 1;
    while (j >= 0 && sorted[j] > key) {
      //shifting all element greater than the key,
      //to the right by one index.
      sorted[j + 1] = sorted[j];
      j -= 1;
    }
    //inserting the key at its place.
    sorted[j + 1] = key;
  }
  return sorted;
} //Time Complexity: O(n*2)

//the main function for calling mergesort on an array
function mergeSortRecursive(unsorted) {
  /*Merge Sort is a Divide and Conquer algorithm.
    It divides input array in two halves, 
    calls itself for the two halves and,
    then merges the two sorted halves.*/
  let a = [...unsorted];
  if (a.length <= 1)
    //if a contains only 1 or 0 element,
    //no need to do anything.
    return a;

  //finding middle index of array.
  let mid = Math.floor(a.length / 2);
  //slicing the array and copying the
  //two halves in different arrays.
  let left = a.slice(0, mid);
  let right = a.slice(mid);
  //merging the arrays after recursively calling
  //itself on left and right part and then returning
  //the merged array.
  return mergeRecursive(mergeSortRecursive(left), mergeSortRecursive(right));
} //Time complexity: ⊖(nLogn).(best,average,worst).

//The function for the key process of merging
//the two arrays.
function mergeRecursive(left, right) {
  let resultArray = [],
    leftIndex = 0,
    rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    //picking the lesser one
    if (left[leftIndex] <= right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }
  while (leftIndex < left.length) {
    resultArray.push(left[leftIndex]);
    leftIndex++;
  }
  while (rightIndex < right.length) {
    resultArray.push(right[rightIndex]);
    rightIndex++;
  }
  return resultArray;
}

function mergeSortIterative(arr) {
  let sorted = [...arr]; //copying the array so that original remains unchanged.
  let n = sorted.length;
  let currSize;
  let leftStart;
  for (currSize = 1; currSize <= n - 1; currSize = 2 * currSize) {
    for (leftStart = 0; leftStart < n - 1; leftStart += 2 * currSize) {
      let mid = Math.min(leftStart + currSize, n);
      let rightEnd = Math.min(leftStart + 2 * currSize, n);
      mergeIterative(sorted, leftStart, mid, rightEnd);
    }
  }
  return sorted;
}
function mergeIterative(sorted, leftStart, mid, rightEnd) {
  let left = sorted.slice(leftStart, mid);
  let right = sorted.slice(mid, rightEnd);
  let leftIndex = 0,
    rightIndex = 0,
    k = leftStart;
  while (leftIndex < left.length && rightIndex < right.length) {
    //picking the lesser one
    if (left[leftIndex] <= right[rightIndex]) {
      sorted[k] = left[leftIndex];
      leftIndex++;
      k++;
    } else {
      sorted[k] = right[rightIndex];
      rightIndex++;
      k++;
    }
  }
  while (leftIndex < left.length && k < sorted.length) {
    sorted[k] = left[leftIndex];
    leftIndex++;
    k++;
  }
  while (rightIndex < right.length && k < sorted.length) {
    sorted[k] = right[rightIndex];
    rightIndex++;
    k++;
  }
}

function merge(arr, l, m, r) {
  // Find sizes of two subarrays to be merged
  let n1 = m - l + 1;
  let n2 = r - m;
  /* Create temp arrays */
  let L = arr.slice(l, m + 1);
  let R = arr.slice(m + 1, r + 1);

  /* Merge the temp arrays */

  // Initial indexes of first and second subarrays
  let i = 0,
    j = 0;

  // Initial index of merged subarry array
  let k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
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
function mergeSort(arr, l, r) {
  if (l == r) return;
  // Find the middle point
  let m = Math.floor((l + r) / 2);
  // Sort first and second halves
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  // Merge the sorted halves
  merge(arr, l, m, r);
}

//The main function to call quick sort on an array.
function quickSort(arr) {
  /*Like Merge Sort, 
    QuickSort is a Divide and Conquer algorithm.
    It picks an element as pivot and 
    partitions the given array around the picked pivot.*/
  let a = [...arr]; //copying the array.
  let l = 0; //low index
  let h = a.length - 1; //high index
  quickSortHelper(a, l, h);
  return a;
}
//T(n) = T(k) + T(n-k-1) + ⊖(n)
//The first two terms are for two recursive calls,
//the last term is for the partition process.
//k is the number of elements which are smaller than pivot.

//The helper function for quick sort.
function quickSortHelper(a, l, h) {
  //the base condition
  //to end the recursion.
  if (l - h >= 0) return;
  //select the Pivot index
  //after partitioning.
  let pi = partition(a, l, h);
  //call the same function
  //to do partition on the left side
  //array of pivot index.
  quickSortHelper(a, l, pi - 1);
  //to do partition on the right side
  //array of pivot index.
  quickSortHelper(a, pi + 1, h);
}

function partition(a, l, h) {
  /*Target of partitions is, 
    given an array and an element x of array as pivot, 
    put x at its correct position in sorted array 
    and put all smaller elements (smaller than x) before x, 
    and put all greater elements (greater than x) after x. 
    All this should be done in linear time.*/

  //select the element at high index as pivot.
  let pivot = a[h];
  //i=index with lower element.
  let i = l - 1;
  let temp;
  for (let j = l; j < h; j++) {
    //check every element of array from low to high-1.
    if (a[j] < pivot) {
      //if the number is less than pivot
      //swap the number with number at index i.
      i++;
      temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
  }
  //after swapping all the elements less than pivot,
  //put pivot at the next index.
  temp = a[i + 1];
  a[i + 1] = a[h];
  a[h] = temp;
  //return the index of pivot.
  return i + 1;
}

//Function to turn the array into a
//max heap with root at index i.
function heapify(arr, length, i) {
  //largest is the index with the
  //largest element.
  let largest = i;
  //pointing to the left child
  let left = i * 2 + 1;
  //pointing to the right child
  let right = left + 1;
  //if left child has the greater value,
  //let largest point to the left child
  if (left < length && arr[left] > arr[largest]) largest = left;
  //similarly check the right child.
  if (right < length && arr[right] > arr[largest]) largest = right;
  //if at last, largest is pointing to
  //either of the child, swap it with the parent.
  if (largest != i) {
    [arr[largest], arr[i]] = [arr[i], arr[largest]];
    //and then call heapify recursively
    //to make sure all the nodes below are in order.
    heapify(arr, length, largest);
  }
}

//The main function that sorts the array.
function heapSort(a) {
  /*Heap sort is a comparison based 
    sorting technique based on Binary Heap data structure. 
    It is similar to selection sort where we first find 
    the maximum element and place the maximum element 
    at the end. We repeat the same process for 
    the remaining elements.*/
  let arr = [...a];
  let length = arr.length;
  //last parent of the heap is always
  //equal to (arr.length/2)-1 in the array.
  let i = Math.floor(length / 2 - 1);
  //last child of the heap is always in
  //the last index of the array.
  let j = length - 1;
  while (i >= 0) {
    //starting from the last parent
    //heapify the way back up to convert
    //the array into a max-heap.
    heapify(arr, length, i);
    i--;
  }

  while (j >= 0) {
    //swap the last element with the root
    //node.
    [arr[0], arr[j]] = [arr[j], arr[0]];
    //as j indicates the last element, it
    //can also be used as the decremented length.
    heapify(arr, j, 0);
    //decrease the length by 1, as the
    //last element is considered removed.
    j--;
  }
  return arr;
}

//Find the Minimum length Unsorted Subarray, sorting which, makes the complete array sorted.
function minimumUnsortedSubarray(arr) {
  let n = arr.length;
  let s = 0,
    e = n - 1;
  //start from the beginning and travel left to right
  while (s < n - 1) {
    //find the first number that is greater than the next one.
    if (arr[s] > arr[s + 1]) break;
    s++;
  }
  //similarly now traverse from right to left.
  while (e > 0) {
    //find the first number from the right which is
    //less than its left one.
    if (arr[e] < arr[e - 1]) break;
    e--;
  }
  //Now check if sorting the subarray contained between
  //indices s and e sorts the whole array or not.

  //First, find the minimum and maximum number in subarray.
  let min = arr[s],
    max = arr[e];
  for (let i = s; i <= e; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }
  //now, check the left side of the array,
  //If theres a number that is greater than the min,
  //s will be equal to that number.
  //Logic:If a number is greater than the minimum number in subarray,
  //and its in the left side of subarray,it should be contained in
  //that subarray and needs to be sorted.
  for (let j = 0; j < s; j++) {
    if (arr[j] > min) s = j;
  }
  //similarly check the right side of subarray and
  //find the number that is lesser than the maximum of that subarray.
  for (let j = e + 1; j < n; j++) {
    if (arr[j] < max) e = j;
  }
  //Finally, the s and e we have are the required indices.
  console.log(`The minimum length subarray,sorting which makes
    the complete array sorted lies between index ${s} and ${e}`);
}

/* There are two ways to sort an array in waveform.
Waveform is like(+,-,+,-,+,-...), when + denotes increase and - denotes decrease.*/
function sortInWaveForm_1(arr) {
  //First way is to sort the array,
  //and swap alternate elements.
  let a = mergeSortRecursive(arr);
  let n = 0;
  while (n + 2 <= a.length) {
    [a[n], a[n + 1]] = [a[n + 1], a[n]];
    n = n + 2;
  }
  return a;
} //It takes O(nlogn) when sorting is done with
//algorithms of O(nlogn).
function sortInWaveForm_2(arr) {
  //Second way to do that is make very element at even indices greater than
  //the elements at its alternate positions.
  let a = [...arr];
  let n = 0;
  while (n < a.length) {
    if (n - 1 >= 0 && a[n - 1] > a[n]) [a[n - 1], a[n]] = [a[n], a[n - 1]];
    if (n + 1 < a.length && a[n + 1] > a[n])
      [a[n + 1], a[n]] = [a[n], a[n + 1]];
    n = n + 2;
  }
  return a;
} //It takes O(n) time as the array is traversed only once.

//Given two sorted arrays and a number x,
//find the pair whose sum is closest to x and the pair has an element from each array.
function closestPair(arr1, arr2, x) {
  //Both arrays should be sorted.
  let n1 = arr1.length,
    n2 = arr2.length,
    less1,
    less2;
  for (let i = 0; i < n1; i++) {
    if (arr1[i] < x) less1 = arr1[i];
  }
  for (let i = 0; i < n2; i++) {
    if (arr2[i] < x) less2 = arr2[i];
  }
  let less = Math.max(less1, less2);
  if (less == less1) {
    let i = 0;
    while (i < n2 && arr2[i] + less < x) {
      i++;
    }
    let add1 = arr2[i - 1] + less;
    let add2 = arr2[i] + less;
    if (Math.abs(add1 - x) > Math.abs(add2 - x)) {
      console.log(
        `From Array 1 choose ${less} and from Array 2 choose ${arr2[i]}`
      );
    } else
      console.log(
        `From Array 1 choose ${less} and from Array 2 choose ${arr2[i - 1]}`
      );
  } else {
    let i = 0;
    while (i < n1 && arr1[i] + less < x) {
      i++;
    }
    let add1 = arr1[i - 1] + less;
    let add2 = arr1[i] + less;
    if (Math.abs(add1 - x) > Math.abs(add2 - x)) {
      console.log(
        `From Array 1 choose ${arr1[i]} and from Array 2 choose ${less}`
      );
    } else
      console.log(
        `From Array 1 choose ${arr1[i - 1]} and from Array 2 choose ${less}`
      );
  }
} //My own algorithm for doing that with linear time complexity O(n).

let arr1 = [10, 12, 20, 30, 25, 40, 32, 31, 35, 50, 60];
let arr = [67, 87, 45, 69, 98, 123, 564, 77, 35, 56, 46, 84, 107, 125, 22];
let arr2 = [1, 4, 5, 7];
let arr3 = [10, 20, 30, 40];

// let s=performance.now();
// let sorted=selectionSort(arr);
// console.log(`\nsorted array: ${sorted}`);
// let f=performance.now();
// console.log(`\nselectionSort took ${f-s} ${((f-s)==1)?" millisecond":" milliseconds"}`)
closestPair(arr2, arr3, 50);
