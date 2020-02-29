/*
 * @Author: xuxueliang
 * @Date: 2020-02-23 12:35:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-02-29 23:37:48
 */
// eslint-disable-next-line no-extend-native
Array.prototype.flat = Array.prototype.flat || function () {
  return this.reduce((acc, val) => Array.isArray(val) ? acc.concat(val.flat()) : acc.concat(val), [])
}
if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign (target, varArgs) {
      // .length of function is 2
      'use strict'
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object')
      }
      let to = Object(target)
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index]

        if (nextSource != null) {
          // Skip over if undefined or null
          for (let nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
}

// if (!Array.prototype.includes) {
//   /* eslint no-extend-native: ["error", { "exceptions": ["Array"] }] */
//   Object.defineProperty(Array.prototype, 'includes', {
//     value: function (valueToFind, fromIndex) {
//       if (this == null) {
//         throw new TypeError('"this" is null or not defined')
//       }

//       // 1. Let O be ? ToObject(this value).
//       var o = Object(this)

//       // 2. Let len be ? ToLength(? Get(O, "length")).
//       var len = o.length >>> 0

//       // 3. If len is 0, return false.
//       if (len === 0) {
//         return false
//       }

//       // 4. Let n be ? ToInteger(fromIndex).
//       //    (If fromIndex is undefined, this step produces the value 0.)
//       var n = fromIndex | 0

//       // 5. If n ≥ 0, then
//       //  a. Let k be n.
//       // 6. Else n < 0,
//       //  a. Let k be len + n.
//       //  b. If k < 0, let k be 0.
//       var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

//       function sameValueZero (x, y) {
//         return (
//           x === y ||
//           (typeof x === 'number' &&
//             typeof y === 'number' &&
//             isNaN(x) &&
//             isNaN(y))
//         )
//       }

//       // 7. Repeat, while k < len
//       while (k < len) {
//         // a. Let elementK be the result of ? Get(O, ! ToString(k)).
//         // b. If SameValueZero(valueToFind, elementK) is true, return true.
//         if (sameValueZero(o[k], valueToFind)) {
//           return true
//         }
//         // c. Increase k by 1.
//         k++
//       }

//       // 8. Return false
//       return false
//     }
//   })
// }
