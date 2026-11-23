---
title: "Java实现模拟栈"
date: "2022-09-30"
category: 开发笔记
cover: ./assets/cover-notes-data-structure.webp
---

这几天除了要准备CCPC，还参加了一个蓝桥云课的小比赛。一般这种小比赛都是没人参加的，我也不会管它，也没证书、也没用，但是，上次我因为无聊参加了它的那个python比赛，那一场打的真的难，因为都是我不擅长的领域，各种技术应用，各种库的调用，我没学过都是一个一个去网上搜😂。虽然难，但是那一场比赛我真的学到了很多实用的东西，感觉比我自己半个月学的都多。话不多说有时间再好好聊聊。

## 栈

> **栈（stack）**又名堆栈，它是一种运算受限的线性表。限定仅在表尾进行插入和删除操作的线性表。这一端被称为栈顶，相对地，把另一端称为栈底。向一个栈插入新元素又称作进栈、入栈或压栈，它是把新元素放到栈顶元素的上面，使之成为新的栈顶元素；从一个栈删除元素又称作出栈或退栈，它是把栈顶元素删除掉，使其相邻的元素成为新的栈顶元素。

^以上是百度百科的解释，总而言之，栈就像一个桶，每次往里放东西都会摞在最上面，每次从里面拿东西也只能从最上面拿，是一个先进后出的数据结构。

## Java实现

这里使用数组实现模拟栈。

首先定义一个`ArrayStack` 类，里面需要一个数组`datas`来存储所有数据，然后`arraysize` 用来记录目前栈占用的大小，`size` 记录目前栈中的元素个数。

``` java
import java.util.Arrays;

public class ArrayStack<T> {
    private Object[] datas;
    private int size, arraySize;
}
```

栈一般有五种操作：

1. 判断是否为空：`isEmpty()`
2. 压栈：`push()`
3. 弹出：`pop()`
4. 获取栈顶元素：`top()`
5. 获取栈中元素个数：`size()`

### 代码

``` java
import java.util.Arrays;

public class ArrayStack<T> {
    private Object[] datas;
    private int size, arraySize;
    public ArrayStack() {
        // 构造方法，默认栈的大小为2
        this.datas = new Object[2];
        this.size = 0;
        this.arraySize = 2;
    }
    public boolean isEmpty() {
        // 判断栈是否为空
        if (this.size == 0) {return true;}
        else {return false;}
    }

    public void push(T value) {
        // 压栈
        // 栈满了，把栈的空间扩至原先的两倍大
        if (this.size == this.arraySize) {
            this.datas = Arrays.copyOf(this.datas, 2 * this.arraySize);
            this.arraySize *= 2;
        }
        this.datas[this.size++] = value;
    }
    public T pop() {
        // 弹出栈顶元素并返回元素值
        // 栈为空无法弹出，返回null
        if (this.size == 0) {return null;}
        this.size--;
        return (T) this.datas[this.size];
    }
    public T top() {
        // 返回栈顶元素
        // 栈为空返回null
        if (this.size == 0) {return null;}
        return (T) this.datas[this.size - 1];
    }
    public int size() {
        // 返回栈中元素个数
        return this.size;
    }
}
```
