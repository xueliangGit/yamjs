/*
 * @Author: xuxueliang
 * @Date: 2020-03-08 01:42:47
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-03-08 02:19:48
 */
export default async function testResult (url) {
  let result = await import(url)
  console.log(result)
}
