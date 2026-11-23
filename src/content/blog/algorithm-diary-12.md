---
title: "刷题日记day12-Balance"
date: "2022-09-26"
category: 算法练习
cover: ./assets/cover-coding-training.webp
---

今天做一道简单的dp题，因为临近CCPC省赛，根据往年的情况到时候大概率碰到很多dp题和数据结构，还有大模拟，所以加紧复习一下dp，虽然dp真的好难😂。

> [POJ-1837 Balance](https://vjudge.net/problem/POJ-1837)

## 题面

Gigel has a strange "balance" and he wants to poise it. Actually, the device is different from any other ordinary balance.
It orders two arms of negligible weight and each arm's length is 15. Some hooks are attached to these arms and Gigel wants to hang up some weights from his collection of G weights (1 <= G <= 20) knowing that these weights have distinct values in the range 1..25. Gigel may droop any weight of any hook but he is forced to use all the weights.
Finally, Gigel managed to balance the device using the experience he gained at the National Olympiad in Informatics. Now he would like to know in how many ways the device can be balanced.

Knowing the repartition of the hooks and the set of the weights write a program that calculates the number of possibilities to balance the device.
It is guaranteed that will exist at least one solution for each test case at the evaluation.

### input

> The input has the following structure:
> • the first line contains the number C (2 <= C <= 20) and the number G (2 <= G <= 20);
> • the next line contains C integer numbers (these numbers are also distinct and sorted in ascending order) in the range -15..15 representing the repartition of the hooks; each number represents the position relative to the center of the balance on the X axis (when no weights are attached the device is balanced and lined up to the X axis; the absolute value of the distances represents the distance between the hook and the balance center and the sign of the numbers determines the arm of the balance to which the hook is attached: '-' for the left arm and '+' for the right arm);
> • on the next line there are G natural, distinct and sorted in ascending order numbers in the range 1..25 representing the weights' values.

### output

> The output contains the number M representing the number of possibilities to poise the balance.

### Sample

```
// input
2 4
-2 3
3 4 5 8
// output
2
```

### 代码

```cpp
#include <iostream>

using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
const int N = 20 + 5, M = 6e3 + 5, INF = 0x3f3f3f3f;
int c, g;
int ho[N], we[N];
int dp[N][M * 2];
int main ()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    cin >> c >> g;
    for (int i = 1; i <= c; i++) cin >> ho[i];
    for (int i = 1; i <= g; i++) cin >> we[i];
    dp[0][6000] = 1;
    for (int i = 1; i <= g; i++)
        for (int j = 1; j <= 12000; j++)
            for (int k = 1; k <= c; k++)
                dp[i][j] += dp[i - 1][j - we[i] * ho[k]];
    cout << dp[g][6000];
    return 0;
}
```

## 思路

题目的意思是给你一个杠杆，然后给你很多钩子的位置，还有很多重量不同的砝码，问你挂上所有砝码，有多少种平衡的方式。

首先定义一下平衡度：
$$
balance = \sum_{i=1}^{g} w[i] *h[k]
$$
当平衡度是0时杠杆是平衡的，接下来是dp式子，由于数组下标不能取负所以所有纵坐标加上6000：
$$
dp[i][j] = dp[i][j] + dp[i - 1][j - w[i] * h[k]]
$$
dp\[i][j]代表用上前i个砝码，平衡度是j的方案个数。
