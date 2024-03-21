# NodeMaterial

材质,可视化编程工具

使用技术
* Tailwindcss
* WebComponents
* GLSL
* THREE.js


## 技术细节


### 函数式编程

在现代编程范式中，函数式编程是经过大量实践的一种重要的编程范式。一个大型程序可以看作一个顶层函数调用若干底层函数，这些被调用的函数又可以调用其他函数，即大任务被一层层拆解并执行，而节点式编辑器的核心思想也是将程序看作是一系列节点的组合。所以函数式编程是节点式编辑器的理论基础。

CPS风格(Continuation-passing style)




### 编译相关



### 有向无环图

在设计上,整个工具的节点连接部分被设计为一个有向无环图(Directed Acyclic Graph，DAG),

[有向无环图 (DAG) 的拓扑排序](https://xie.infoq.cn/article/3b478d3129b642af3fe497f58)


### 节点定义与涌现式设计

函数是一种最基本的任务，所以函数就是面向过程的程序设计的基本单元。

## 参考项目

[babylonjs 材质编辑器](https://doc.babylonjs.com/toolsAndResources/nme)

[使用Webgl+React+TypeScript实现UE4中的材质节点](http://s.mecg.me/tool.html?id=t6)

[刘小刘](https://www.zhihu.com/people/liu-fei-69/posts)

[刘小刘的博客](http://mecg.me/wiki/doku.php?id=utils:nginx)