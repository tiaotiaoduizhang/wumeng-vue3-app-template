class类学习：
极简代码（认知）
- clas 不是一个实物，想象成一个能设计汽车的图纸
- color 普通属性（属于实例：每辆车的专属颜色）
- static 静态属性（属于类：图纸的版本号，所有车共用）
- constructor 构造函数：造具体车时，给这辆车指定颜色
class car{
     color:string;
     static version = "2026款";
     constructor(color:string){
        this.color = color;
     }
      // 普通方法（属于实例：这辆车踩油门的动作）
     run() {
         console.log(`我是${this.color}的车，正在跑！`);
     }
       // 静态方法（属于类：用图纸规则算理论最高速度，不用造车就能算）
     static calcMaxSpeed(wheelSize: number) {
         return wheelSize * 100; // 假设公式：轮毂尺寸 × 100 = 理论极速
     }
}
普通类型（非static）需要new实例（先造车）
const redCar=new car("红色");
redCar.run(); //输出我是红色的车，正在跑
console.log(redCar.color); // 输出：红色

static成员 ：有成品，直接调用 （推荐：static简洁写法）
console.log(car.version); // 输出：2026款
console.log(car.calcMaxSpeed(18)); // 输出：1800（假设18寸轮毂）



class类是es6 引入的面向对象编程语法（构造函数）
- class 定义一个类（模版），描述事物的属性和行为
- static 关键字修饰的方法 / 属性，类本身（不用实例化就能调用）
- 普通方法/属性 属于类的实例（必须new出实例才能调用）

 export class Env { ... }:
- class Env 定义一个名为Env的类(专门处理环境变量的工具类)
- export :导出类 其他文件通过 import { Env } from '文件路径' 使用

 static get<T>(key: keyof ImportMetaEnv, defaultValue?: T): T | string { ... }
- 静态方法 static get
- static 表示 get 方法属于Env类本身,不需要创建实例（不用写new Env（））,直接Env.get()就能使用
- <T> ts泛型，作用是动态适配类型 传什么返回什么
- key: keyof ImportMetaEnv ：参数 key 的类型被限定为 ImportMetaEnv 的键名（比如：VITE_APP_API_URL）
- defaultValue?: T ：可选参数，默认值，类型和泛型T一致
- : T | string ：返回值类型，要么是泛型T类型，要么是字符串类型

方法内部逻辑：
- import.meta.env：Vite 项目中获取环境变量的内置对象
- ??：空值合并运算符 只在 value 是 null 或 undefined 时，才返回后面的 defaultValue


