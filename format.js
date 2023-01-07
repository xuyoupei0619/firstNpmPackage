/*
版权声明：本文为CSDN博主「水香木鱼」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_48337566/article/details/125123357
*/

/*算法封装*/
/*
* 在页面使用方法：
* 1、 引用 Tool 工具插件
*     import { Tool } from '../../plugins/tool'
* 2、 打印 console.log(Tool.selectionSort(arr2))
*     arr2 数组或者是接口中数据
* */

const tool = {}

// 数组排序   (冒泡排序) 方法1

// *简明解释*
// 通过依次比较、交换相邻的元素大小（按照由小到大的顺序，如果符合这个顺序就不用交换）。
// 1次这样的循环可以得到一个最大值，n - 1 次这样的循环可以排序完毕。

// *属性*
// 1.稳定
// 2.时间复杂度 O(n²)
// 3.交换 O(n²)
// 4.对即将排序完成的数组进行排序 O(n)（但是这种情况下不如插入排序块）

// *核心概念*
// 1.利用交换，将最大的数冒泡到最后
// 2.使用缓存 postion 来优化
// 3.使用双向遍历来优化

tool.arrSort = arr => {
    if (tool.adugeType(arr) === 'Array') {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[i]) {
                    let tmp = arr[i]
                    arr[i] = arr[j]
                    arr[j] = tmp
                }
            }
        }
        return arr
    }
}

// 数组排序   (冒泡排序) 方法2
tool.arrSort2 = arr => {
    if (tool.adugeType(arr) === 'Array') {
        for (let i = 1; i < arr.length; i++) {
            let j = i - 1
            let key = arr[i]
            while (arr[j] > key) {
                arr[j + 1] = arr[j]
                j--
            }
            arr[j + 1] = key
        }
        return arr
    }
}

// 常用swap函数(配合下面的排序函数使用)
tool.swap = (arr, indexA, indexB) => {
    ;[arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]]
}

// 数组排序   (冒泡排序 进阶 缓存 pos)
// 设置一标志性变量 pos,用于记录每趟排序中最后一次进行交换的位置。
// 由于 pos 位置之后的记录均已交换到位,故在进行下一趟排序时只要扫描到 pos 位置即可。
tool.arrSort3 = arr => {
    let i = arr.length - 1
    while (i > 0) {
        let pos = 0
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                pos = j
                tool.swap(arr, j, j + 1)
            }
        }
        i = pos
    }
    return arr
}

// 数组排序   (冒泡排序 进阶 双向遍历)
// 传统冒泡排序中每一趟排序操作只能找到一个最大值或最小值,
// 我们可以 在每趟排序中进行正向和反向两遍冒泡 ，
// 一次可以得到两个最终值（最大和最小）,从而使外排序趟数几乎减少了一半。
tool.arrSort4 = arr => {
    if (tool.adugeType(arr) === 'Array') {
        let start = 0
        let end = arr.length - 1
        while (start < end) {
            for (let i = start; i < end; i++) {
                if (arr[i] > arr[i + 1]) {
                    tool.swap(arr, i, i + 1)
                }
            }
            end -= 1
            for (let i = end; i > start; i--) {
                if (arr[i - 1] > arr[i]) {
                    tool.swap(arr, i - 1, i)
                }
            }
            start += 1
        }
        return arr
    }
}

// 数组排序   (冒泡排序 进阶 前两种优化方式（缓存 pos、双向遍历）的结合)
tool.arrSort5 = arr => {
    let start = 0
    let end = arr.length - 1
    while (start < end) {
        let endPos = 0
        let startPos = 0
        for (let i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                endPos = i
                tool.swap(arr, i, i + 1)
            }
        }
        end = endPos
        for (let i = end; i > start; i--) {
            if (arr[i - 1] > arr[i]) {
                startPos = i
                tool.swap(arr, i - 1, i)
            }
        }
        start = startPos
    }
    return arr
}

// 数组排序   (冒泡排序 ，传入第二个参数（参数为函数），来控制升序和降序 array.sort() )
// compareFunc   →  升序  (a, b) => a - b  ， 降序  (a, b) => b - a
tool.arrSort6 = (arr, compareFunc) => {
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (compareFunc(arr[j], arr[j + 1]) > 0) {
                tool.swap(arr, j, j + 1)
            }
        }
    }
    return arr
}

// 数组排序   (选择排序 selectionSort)

// *简明解释*
// 每一次内循环遍历寻找最小的数，记录下 minIndex，并在这次内循环结束后交换 minIndex 和 i 的位置。
// 重复这样的循环 n - 1 次即得到结果。

// *属性*
// 1.不稳定
// 2.Θ(n²) 无论什么输入，均为 Θ(n²)
// 3.Θ(n) 交换: 注意，这里只有 n 次的交换，选择排序的唯一优点*
// 可见即使是我们觉得最慢的选择排序，也有它的用武之地。

// *核心概念*
// 1.“可预测”的时间复杂度，什么进来都是 O(n²)，但不稳定，唯一的优点是减少了 swap 次数

tool.selectionSort = arr => {
    for (let i = 0, len = arr.length; i < len - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        if (i !== minIndex) {
            tool.swap(arr, i, minIndex)
        }
    }
    return arr
}

// 数组排序   (插入排序 insertionSort)

// *简明解释*
// 默认 a[0] 为已排序数组中的元素，从 arr[1] 开始逐渐往已排序数组中插入元素，从后往前一个个比较，如果待插
// 入元素小于已排序元素，则已排序元素往后移动一位，直到待插入元素找到合适的位置并插入已排序数组。
// 经过 n - 1 次这样的循环插入后排序完毕。

// *属性*
// 1.稳定
// 2.适合场景：对快要排序完成的数组时间复杂度为 O(n)
// 3.非常低的开销
// 4.时间复杂度 O(n²)
// 由于它的优点（自适应，低开销，稳定，几乎排序时的O（n）时间），插入排序通常用作递归基本情况（当问题规模较小
// 时）针对较高开销分而治之排序算法， 如希尔排序或快速排序。

// *核心概念*
// 1.高性能（特别是接近排序完毕时的数组），低开销，且稳定
// 2.利用二分查找来优化

tool.insertionSort = arr => {
    for (let i = 1, len = arr.length; i < len; i++) {
        const temp = arr[i]
        let preIndex = i - 1
        while (arr[preIndex] > temp) {
            arr[preIndex + 1] = arr[preIndex]
            preIndex -= 1
        }
        arr[preIndex + 1] = temp
    }
    return arr
}
// 二分查找算法
tool.binarySearch = (arr, maxIndex, value) => {
    let min = 0
    let max = maxIndex
    while (min <= max) {
        const mid = Math.floor((min + max) / 2)
        if (arr[mid] <= value) {
            min = mid + 1
        } else {
            max = mid - 1
        }
    }
    return min
}
// 数组排序   (插入排序 insertionSort  进阶 二分查找算法)  在查找插入位置时使用二分查找的方式来优化性能
tool.insertionSort2 = arr => {
    for (let i = 1, len = arr.length; i < len; i++) {
        const temp = arr[i]
        const insertIndex = tool.binarySearch(arr, i - 1, arr[i])
        for (let preIndex = i - 1; preIndex >= insertIndex; preIndex--) {
            arr[preIndex + 1] = arr[preIndex]
        }
        arr[insertIndex] = temp
    }
    return arr
}

// 数组排序   (希尔排序 shellSort)

// *简明解释*
// 希尔排序是插入排序的改进版，它克服了插入排序只能移动一个相邻位置的缺陷（希尔排序可以一次移动 gap 个距离），
// 利用了插入排序在排序几乎已经排序好的数组的非常快的优点。
// 使用可以动态定义的 gap 来渐进式排序，先排序距离较远的元素，再逐渐递进，而实际上排序中元素最终位置距离初始
// 位置远的概率是很大的，所以希尔排序大大提升了性能（尤其是 reverse 的时候非常快，想象一下这时候冒泡排序和插入排
// 序的速度）。
// 而且希尔排序不仅效率较高（比冒泡和插入高），它的代码相对要简短，低开销（继承插入排序的优点），追求这些特点（
// 效率要求过得去就好，代码简短，开销低，且数据量较小）的时候希尔排序是好的 O(n·log(n)) 算法的替代品。
// 总而言之：希尔排序的性能优化来自增量队列的输入和 gap 的设定。

// *属性*
// 不稳定
// 在快要排序完成的数组有 O(n·log(n)) 的时间复杂度（并且它对于反转数组的速度非常快）
// O(n^3/2)
// 关于不稳定:我们知道, 单次直接插入排序是稳定的，它不会改变相同元素之间的相对顺序，但在多次不同的插入排序过程中, 相同的
// 元素可能在各自的插入排序中移动，可能导致相同元素相对顺序发生变化。因此, 希尔排序并不稳定。

// *核心概念*
// 希尔排序是基于插入排序的以下两点性质而提出改进方法的：
// 1.插入排序在对几乎已经排好序的数据操作时，效率高，即可以达到 O(n) 的效率；
// 2.但插入排序一般来说是低效的，因为插入排序每次只能将数据移动一位 ；

tool.shellSort = arr => {
    const len = arr.length
    let gap = 1
    while (gap < len / 3) {
        gap = gap * 3 + 1
    }
    while (gap > 0) {
        for (let i = gap; i < len; i++) {
            const temp = arr[i]
            let preIndex = i - gap
            while (arr[preIndex] > temp) {
                arr[preIndex + gap] = arr[preIndex]
                preIndex -= gap
            }
            arr[preIndex + gap] = temp
        }
        gap = Math.floor(gap / 2)
    }
    return arr
}

// 数组排序   (归并排序 mergeSort 基本实现)  以迭代的方式来实现（但要注意防止函数调用过深导致 JavaScript 的运行栈溢出）

// *简明解释*
// 归并排序使用分而治之的思想，以折半的方式来递归/迭代排序元素，利用空间来换时间，做到了时间复杂度
// O(n·log(n)) 的同时保持了稳定。
// 这让它在一些更考虑排序效率和稳定性，次考虑存储空间的场合非常适用（如数据库内排序，和堆排序相比，归并排序的稳
// 定是优点）。并且归并排序非常适合于链表排序。

// *属性*
// 1.稳定 (在 O(n·log(n)) 时间复杂度的排序算法中，归并排序是唯一稳定的)
// 2.时间复杂度 O(n·log(n))
// 3.对于数组需要 Θ(n) 的额外空间 注意：归并排序需要额外的空间，这是它的不完美之处
// 4.对于链表需要 O(log(n)) 的额外空间，所以归并排序非常适合列表的排序
// 5.Does not require random access to data 因为这个特点，归并排序很适合用来排序列表

// *核心概念*
// 1.分而治之的思想
// 2.空间换时间，并且稳定，保持稳定性这一点是它的亮点
// 3.二分思想

tool.mergeSort = arr => {
    const len = arr.length
    if (len < 2) {
        return arr
    }
    const mid = Math.floor(len / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    return tool.merge(tool.mergeSort(left), tool.mergeSort(right))
}

//快速排序
tool.merge = (left, right) => {
    const result = []
    while (left.length > 0 && right.length > 0) {
        result.push(left[0] <= right[0] ? left.shift() : right.shift())
    }
    return result.concat(left, right)
}

// 数组排序   (归并排序  mergeSort2 进阶 空间优化)  用 array.splice 取代 array.slice，减少一半的空间消耗。
tool.mergeSort2 = arr => {
    const len = arr.length
    if (len < 2) {
        return arr
    }
    const mid = Math.floor(len / 2)
    const left = arr.splice(0, mid)
    const right = arr
    return tool.merge(tool.mergeSort(left), tool.mergeSort(right))
}

// 数组排序   (堆排序 heapSort 基本实现)

// *简明解释*
// 堆排序可以认为是选择排序的改进版，像选择排序一样将输入划分为已排序和待排序。
// 不一样的是堆排序利用堆这种近似完全二叉树的良好的数据结构来实现排序，本质上使用了二分的思想。
// 1.先将所有的数据堆化
// 2.然后移动 arr[0] 到数组末尾（已排序区域）
// 3.再重新堆化，依次这样循环来排序
// 利用堆这种良好的数据结构，它在拥有良好的可预测性的同时（不管输入什么都是 O(n·log(n)) 时间复杂度），但它的
// 缺点也有：即不稳定，而且 O(n·log(n)) 的平均效率决定了它的效率不如快速排序。适用于数据库内引擎排序（需要这样
// 的可预测性性能）。

// *属性*
// 1.不稳定
// 2.O(n·log(n)) time

// *核心概念*
// 1.利用良好的数据结构——堆，来排序
// 2.二分的思想
// 3.选择排序的改进版，继承了”可预测性”（什么数据输入都为 O(n·log(n) time）

tool.heapSort = arr => {
    let size = arr.length
    // 初始化堆，i 从最后一个父节点开始调整，直到节点均调整完毕
    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
        tool.heapify(arr, i, size)
    }
    // 堆排序：先将第一个元素和已拍好元素前一位作交换，再重新调整，直到排序完毕
    for (let i = size - 1; i > 0; i--) {
        tool.swap(arr, 0, i)
        size -= 1
        tool.heapify(arr, 0, size)
    }
    return arr
}


tool.heapify = (arr, index, size) => {
    let largest = index
    let left = 2 * index + 1
    let right = 2 * index + 2
    if (left < size && arr[left] > arr[largest]) {
        largest = left
    }
    if (right < size && arr[right] > arr[largest]) {
        largest = right
    }
    if (largest !== index) {
        tool.swap(arr, index, largest)
        tool.heapify(arr, largest, size)
    }
}

// 数组排序   (快速排序 quickSort 基本实现)

// *简明解释*
// 1.从数列中挑出一个元素，称为”基准”（pivot），
// 2.重新排序数列，所有比基准值小的元素摆放在基准前面，所有比基准值大的元素摆在基准后面（相同的数可以到
// 任何一边）。在这个分区结束之后，该基准就处于数列的中间位置。这个称为分区（partition）操作。
// 3.递归地（recursively）把小于基准值元素的子数列和大于基准值元素的子数列排序。

// *属性*
// 1.不稳定
// 2.O(n²) time, 但是通常都是 O(n·log(n)) time (或者更快)
// 3.O(log(n)) extra space

// *核心概念*
// 1.使用了分而治之的思想

tool.quickSort = arr => {
    const pivot = arr[0]
    const left = []
    const right = []
    if (arr.length < 2) {
        return arr
    }
    for (let i = 1, len = arr.length; i < len; i++) {
        arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
    }
    return tool.quickSort(left).concat([pivot], tool.quickSort(right))
}

const Tool = tool

export { Tool }
