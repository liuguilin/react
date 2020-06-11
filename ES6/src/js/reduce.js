//reduce 一维数组变二维数组
var arr = [1, 2, 3, 5, 6, 8, 9, 10];

//方式一
// arr = arr.reduce((prev, next, index) => {
//     if (index % 2 === 0) {
//         prev.push([]);
//     }
//     prev[prev.length - 1].push(next);
//     return prev;
// }, []);

//方式二
arr = arr.reduce((prev, next, index) => {
    return (
        (index % 2 === 0 ?
            prev.push([next]) :
            prev[prev.length - 1].push(next)) && prev
    );
}, []);

//方式三
// arr = arr.reduce(
//     (prev, next, index) =>
//         (index % 2 === 0
//             ? prev.push([next])
//             : prev[prev.length - 1].push(next)) && prev,

//     []
// );

console.log(arr);

//reduce 数组去重
// var arr2 = [
//     { value: "苹果", id: 1 },
//     { value: "香蕉", id: 2 },
//     { value: "苹果", id: 3 },
//     { value: "苹果", id: 4 },
//     { value: "香蕉", id: 5 },
// ];
// var hash = {};
// arr2 = arr2.reduce((item, next) => {
//     hash[next.value] ? "" : (hash[next.value] = true && item.push(next));
//     return item;
// }, []);