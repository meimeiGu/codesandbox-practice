import "./styles.css";

let oldKeyArray = ["A", "B", "C", "D"];
const newKeyArray = ["B", "E", "A", "C", "F"];
const isEqualNumber = (element, item) => {
  return element === item;
};

//找出新旧数组之间的差异
const findDiffArray = (oldArray, newArray) => {
  let lastTemp = 0;
  const changeArray = [];
  newArray.map((item, index) => {
    let mountIndex = oldArray.findIndex(element =>
      isEqualNumber(element, item)
    );

    if (mountIndex !== -1) {
      //元素在老集合中都比现在最右的元素还靠右，那么老元素在现在的位置并不影响最后正确的顺序，不移动
      if (mountIndex > index) {
        lastTemp = mountIndex;
      } else {
        //在原数组找到且位置在最右的位置前面，往后移
        let moveObj = {
          node: item,
          fromIndex: mountIndex,
          toIndex: lastTemp + 1
        };
        moveMethod(oldArray, moveObj);
        lastTemp = ++lastTemp;
      }
    } else {
      //在原数组找不到就新增节点
      let addObj = {
        node: item,
        toIndex: lastTemp + 1
      };
      addMethod(oldArray, addObj);
      lastTemp = ++lastTemp;
    }
    return null;
  });

  //删除新数组里没有的元素
  oldArray.map((data, index) => {
    let filterResult = newArray.find(item => isEqualNumber(item, data));
    if (!filterResult) {
      let deleteObj = {
        node: data,
        fromIndex: index
      };
      deleteMethod(oldArray, deleteObj);
    }
  });

  return changeArray;
};

//根据差异移动数组：旧数组——>新数组
const moveMethod = (oldArray, moveObj) => {
  console.log("移动了" + moveObj.node);
  oldArray.splice(moveObj.toIndex, 0, moveObj.node);
  oldArray.splice(moveObj.fromIndex, 1);
};

//添加元素
const addMethod = (oldArray, addObj) => {
  console.log("新增了" + addObj.node);
  oldArray.splice(addObj.toIndex, 0, addObj.node);
};

//删除元素
const deleteMethod = (oldArray, deleteObj) => {
  console.log("删除了" + deleteObj.node);
  oldArray.splice(deleteObj.fromIndex, 1);
};

//diff算法简单实现
const diffMethod = (oldArray, newArray) => {
  let changeDetailArray = findDiffArray(oldArray, newArray);
  console.log(oldArray);
};

diffMethod(oldKeyArray, newKeyArray);

document.getElementById("app").innerHTML = `
<h1>Diff算法自定义</h1>
<div>
  移动——>新增——>删除
</div>
`;
