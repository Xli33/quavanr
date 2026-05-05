/// <reference types="vite/client" />

declare module '@yellowspot/vite-plugin-externals' {
  import type { PluginOption } from 'vite';
  export default function (param: Obj): PluginOption;
}


declare interface Obj {
  [x: string]: any;
}

declare type nullish = undefined | null;

/**
 * 设置对象中某些属性为可选
 * @param T 对象类型
 * @param P 需要可选的属性集合
 */
type Optional<T, P extends keyof T> = Omit<T, P> & { [K in P]?: T[K] };

/**
 * 设置对象中某些属性为必填
 * @param T 对象类型
 * @param K 需要必填的属性集合
 */
type SetRequired<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: T[P] };

type TimeoutID = ReturnType<typeof setTimeout> | null;