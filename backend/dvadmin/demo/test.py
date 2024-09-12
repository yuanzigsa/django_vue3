# @Author  : yuanzi
# @Time    : 2024/8/4 15:43
# Website: https://www.yzgsa.com
# Copyright (c) <yuanzigsa@gmail.com>

x = 2
def func():
    x = 3
    print('func x ---> ',x)

func()
print('out of func x ---> ',x)

g1 = (x for x in range(10))

# 使用 next 函数获取生成器的下一个值
print(next(g1))
print(next(g1))
print(next(g1))