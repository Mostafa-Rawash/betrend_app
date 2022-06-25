(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/quagga/dist/quagga.js
  var require_quagga = __commonJS({
    "node_modules/quagga/dist/quagga.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory(factory.toString()).default;
        else if (typeof exports === "object")
          exports["Quagga"] = factory(factory.toString()).default;
        else
          root["Quagga"] = factory(factory.toString()).default;
      })(exports, function(__factorySource__) {
        return function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId])
              return installedModules[moduleId].exports;
            var module2 = installedModules[moduleId] = {
              i: moduleId,
              l: false,
              exports: {}
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.l = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.i = function(value) {
            return value;
          };
          __webpack_require__.d = function(exports2, name, getter) {
            if (!__webpack_require__.o(exports2, name)) {
              Object.defineProperty(exports2, name, {
                configurable: false,
                enumerable: true,
                get: getter
              });
            }
          };
          __webpack_require__.n = function(module2) {
            var getter = module2 && module2.__esModule ? function getDefault() {
              return module2["default"];
            } : function getModuleExports() {
              return module2;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "/";
          return __webpack_require__(__webpack_require__.s = 166);
        }([
          function(module2, exports2) {
            function isObject(value) {
              var type = typeof value;
              return value != null && (type == "object" || type == "function");
            }
            module2.exports = isObject;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__common_array_helper__ = __webpack_require__(3);
            function BarcodeReader(config, supplements) {
              this._row = [];
              this.config = config || {};
              this.supplements = supplements;
              return this;
            }
            BarcodeReader.prototype._nextUnset = function(line, start) {
              var i;
              if (start === void 0) {
                start = 0;
              }
              for (i = start; i < line.length; i++) {
                if (!line[i]) {
                  return i;
                }
              }
              return line.length;
            };
            BarcodeReader.prototype._matchPattern = function(counter, code, maxSingleError) {
              var i, error = 0, singleError = 0, sum = 0, modulo = 0, barWidth, count, scaled;
              maxSingleError = maxSingleError || this.SINGLE_CODE_ERROR || 1;
              for (i = 0; i < counter.length; i++) {
                sum += counter[i];
                modulo += code[i];
              }
              if (sum < modulo) {
                return Number.MAX_VALUE;
              }
              barWidth = sum / modulo;
              maxSingleError *= barWidth;
              for (i = 0; i < counter.length; i++) {
                count = counter[i];
                scaled = code[i] * barWidth;
                singleError = Math.abs(count - scaled) / scaled;
                if (singleError > maxSingleError) {
                  return Number.MAX_VALUE;
                }
                error += singleError;
              }
              return error / modulo;
            };
            BarcodeReader.prototype._nextSet = function(line, offset) {
              var i;
              offset = offset || 0;
              for (i = offset; i < line.length; i++) {
                if (line[i]) {
                  return i;
                }
              }
              return line.length;
            };
            BarcodeReader.prototype._correctBars = function(counter, correction, indices) {
              var length = indices.length, tmp = 0;
              while (length--) {
                tmp = counter[indices[length]] * (1 - (1 - correction) / 2);
                if (tmp > 1) {
                  counter[indices[length]] = tmp;
                }
              }
            };
            BarcodeReader.prototype._matchTrace = function(cmpCounter, epsilon) {
              var counter = [], i, self2 = this, offset = self2._nextSet(self2._row), isWhite = !self2._row[offset], counterPos = 0, bestMatch = {
                error: Number.MAX_VALUE,
                code: -1,
                start: 0
              }, error;
              if (cmpCounter) {
                for (i = 0; i < cmpCounter.length; i++) {
                  counter.push(0);
                }
                for (i = offset; i < self2._row.length; i++) {
                  if (self2._row[i] ^ isWhite) {
                    counter[counterPos]++;
                  } else {
                    if (counterPos === counter.length - 1) {
                      error = self2._matchPattern(counter, cmpCounter);
                      if (error < epsilon) {
                        bestMatch.start = i - offset;
                        bestMatch.end = i;
                        bestMatch.counter = counter;
                        return bestMatch;
                      } else {
                        return null;
                      }
                    } else {
                      counterPos++;
                    }
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                  }
                }
              } else {
                counter.push(0);
                for (i = offset; i < self2._row.length; i++) {
                  if (self2._row[i] ^ isWhite) {
                    counter[counterPos]++;
                  } else {
                    counterPos++;
                    counter.push(0);
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                  }
                }
              }
              bestMatch.start = offset;
              bestMatch.end = self2._row.length - 1;
              bestMatch.counter = counter;
              return bestMatch;
            };
            BarcodeReader.prototype.decodePattern = function(pattern) {
              var self2 = this, result;
              self2._row = pattern;
              result = self2._decode();
              if (result === null) {
                self2._row.reverse();
                result = self2._decode();
                if (result) {
                  result.direction = BarcodeReader.DIRECTION.REVERSE;
                  result.start = self2._row.length - result.start;
                  result.end = self2._row.length - result.end;
                }
              } else {
                result.direction = BarcodeReader.DIRECTION.FORWARD;
              }
              if (result) {
                result.format = self2.FORMAT;
              }
              return result;
            };
            BarcodeReader.prototype._matchRange = function(start, end, value) {
              var i;
              start = start < 0 ? 0 : start;
              for (i = start; i < end; i++) {
                if (this._row[i] !== value) {
                  return false;
                }
              }
              return true;
            };
            BarcodeReader.prototype._fillCounters = function(offset, end, isWhite) {
              var self2 = this, counterPos = 0, i, counters = [];
              isWhite = typeof isWhite !== "undefined" ? isWhite : true;
              offset = typeof offset !== "undefined" ? offset : self2._nextUnset(self2._row);
              end = end || self2._row.length;
              counters[counterPos] = 0;
              for (i = offset; i < end; i++) {
                if (self2._row[i] ^ isWhite) {
                  counters[counterPos]++;
                } else {
                  counterPos++;
                  counters[counterPos] = 1;
                  isWhite = !isWhite;
                }
              }
              return counters;
            };
            BarcodeReader.prototype._toCounters = function(start, counter) {
              var self2 = this, numCounters = counter.length, end = self2._row.length, isWhite = !self2._row[start], i, counterPos = 0;
              __WEBPACK_IMPORTED_MODULE_0__common_array_helper__["a"].init(counter, 0);
              for (i = start; i < end; i++) {
                if (self2._row[i] ^ isWhite) {
                  counter[counterPos]++;
                } else {
                  counterPos++;
                  if (counterPos === numCounters) {
                    break;
                  } else {
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                  }
                }
              }
              return counter;
            };
            Object.defineProperty(BarcodeReader.prototype, "FORMAT", {
              value: "unknown",
              writeable: false
            });
            BarcodeReader.DIRECTION = {
              FORWARD: 1,
              REVERSE: -1
            };
            BarcodeReader.Exception = {
              StartNotFoundException: "Start-Info was not found!",
              CodeNotFoundException: "Code could not be found!",
              PatternNotFoundException: "Pattern could not be found!"
            };
            BarcodeReader.CONFIG_KEYS = {};
            __webpack_exports__["a"] = BarcodeReader;
          },
          function(module2, exports2) {
            var isArray = Array.isArray;
            module2.exports = isArray;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__["a"] = {
              init: function init(arr, val) {
                var l = arr.length;
                while (l--) {
                  arr[l] = val;
                }
              },
              shuffle: function shuffle(arr) {
                var i = arr.length - 1, j, x;
                for (i; i >= 0; i--) {
                  j = Math.floor(Math.random() * i);
                  x = arr[i];
                  arr[i] = arr[j];
                  arr[j] = x;
                }
                return arr;
              },
              toPointList: function toPointList(arr) {
                var i, j, row = [], rows = [];
                for (i = 0; i < arr.length; i++) {
                  row = [];
                  for (j = 0; j < arr[i].length; j++) {
                    row[j] = arr[i][j];
                  }
                  rows[i] = "[" + row.join(",") + "]";
                }
                return "[" + rows.join(",\r\n") + "]";
              },
              threshold: function threshold(arr, _threshold, scoreFunc) {
                var i, queue = [];
                for (i = 0; i < arr.length; i++) {
                  if (scoreFunc.apply(arr, [arr[i]]) >= _threshold) {
                    queue.push(arr[i]);
                  }
                }
                return queue;
              },
              maxIndex: function maxIndex(arr) {
                var i, max = 0;
                for (i = 0; i < arr.length; i++) {
                  if (arr[i] > arr[max]) {
                    max = i;
                  }
                }
                return max;
              },
              max: function max(arr) {
                var i, max2 = 0;
                for (i = 0; i < arr.length; i++) {
                  if (arr[i] > max2) {
                    max2 = arr[i];
                  }
                }
                return max2;
              },
              sum: function sum(arr) {
                var length = arr.length, sum2 = 0;
                while (length--) {
                  sum2 += arr[length];
                }
                return sum2;
              }
            };
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ = __webpack_require__(28);
            var __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_merge__);
            var __WEBPACK_IMPORTED_MODULE_1__barcode_reader__ = __webpack_require__(1);
            var _extends = Object.assign || function(target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }
              return target;
            };
            function EANReader(opts, supplements) {
              opts = __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default()(getDefaulConfig(), opts);
              __WEBPACK_IMPORTED_MODULE_1__barcode_reader__["a"].call(this, opts, supplements);
            }
            function getDefaulConfig() {
              var config = {};
              Object.keys(EANReader.CONFIG_KEYS).forEach(function(key) {
                config[key] = EANReader.CONFIG_KEYS[key].default;
              });
              return config;
            }
            var properties = {
              CODE_L_START: { value: 0 },
              CODE_G_START: { value: 10 },
              START_PATTERN: { value: [1, 1, 1] },
              STOP_PATTERN: { value: [1, 1, 1] },
              MIDDLE_PATTERN: { value: [1, 1, 1, 1, 1] },
              EXTENSION_START_PATTERN: { value: [1, 1, 2] },
              CODE_PATTERN: { value: [[3, 2, 1, 1], [2, 2, 2, 1], [2, 1, 2, 2], [1, 4, 1, 1], [1, 1, 3, 2], [1, 2, 3, 1], [1, 1, 1, 4], [1, 3, 1, 2], [1, 2, 1, 3], [3, 1, 1, 2], [1, 1, 2, 3], [1, 2, 2, 2], [2, 2, 1, 2], [1, 1, 4, 1], [2, 3, 1, 1], [1, 3, 2, 1], [4, 1, 1, 1], [2, 1, 3, 1], [3, 1, 2, 1], [2, 1, 1, 3]] },
              CODE_FREQUENCY: { value: [0, 11, 13, 14, 19, 25, 28, 21, 22, 26] },
              SINGLE_CODE_ERROR: { value: 0.7 },
              AVG_CODE_ERROR: { value: 0.48 },
              FORMAT: { value: "ean_13", writeable: false }
            };
            EANReader.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_1__barcode_reader__["a"].prototype, properties);
            EANReader.prototype.constructor = EANReader;
            EANReader.prototype._decodeCode = function(start, coderange) {
              var counter = [0, 0, 0, 0], i, self2 = this, offset = start, isWhite = !self2._row[offset], counterPos = 0, bestMatch = {
                error: Number.MAX_VALUE,
                code: -1,
                start,
                end: start
              }, code, error;
              if (!coderange) {
                coderange = self2.CODE_PATTERN.length;
              }
              for (i = offset; i < self2._row.length; i++) {
                if (self2._row[i] ^ isWhite) {
                  counter[counterPos]++;
                } else {
                  if (counterPos === counter.length - 1) {
                    for (code = 0; code < coderange; code++) {
                      error = self2._matchPattern(counter, self2.CODE_PATTERN[code]);
                      if (error < bestMatch.error) {
                        bestMatch.code = code;
                        bestMatch.error = error;
                      }
                    }
                    bestMatch.end = i;
                    if (bestMatch.error > self2.AVG_CODE_ERROR) {
                      return null;
                    }
                    return bestMatch;
                  } else {
                    counterPos++;
                  }
                  counter[counterPos] = 1;
                  isWhite = !isWhite;
                }
              }
              return null;
            };
            EANReader.prototype._findPattern = function(pattern, offset, isWhite, tryHarder, epsilon) {
              var counter = [], self2 = this, i, counterPos = 0, bestMatch = {
                error: Number.MAX_VALUE,
                code: -1,
                start: 0,
                end: 0
              }, error, j, sum;
              if (!offset) {
                offset = self2._nextSet(self2._row);
              }
              if (isWhite === void 0) {
                isWhite = false;
              }
              if (tryHarder === void 0) {
                tryHarder = true;
              }
              if (epsilon === void 0) {
                epsilon = self2.AVG_CODE_ERROR;
              }
              for (i = 0; i < pattern.length; i++) {
                counter[i] = 0;
              }
              for (i = offset; i < self2._row.length; i++) {
                if (self2._row[i] ^ isWhite) {
                  counter[counterPos]++;
                } else {
                  if (counterPos === counter.length - 1) {
                    sum = 0;
                    for (j = 0; j < counter.length; j++) {
                      sum += counter[j];
                    }
                    error = self2._matchPattern(counter, pattern);
                    if (error < epsilon) {
                      bestMatch.error = error;
                      bestMatch.start = i - sum;
                      bestMatch.end = i;
                      return bestMatch;
                    }
                    if (tryHarder) {
                      for (j = 0; j < counter.length - 2; j++) {
                        counter[j] = counter[j + 2];
                      }
                      counter[counter.length - 2] = 0;
                      counter[counter.length - 1] = 0;
                      counterPos--;
                    } else {
                      return null;
                    }
                  } else {
                    counterPos++;
                  }
                  counter[counterPos] = 1;
                  isWhite = !isWhite;
                }
              }
              return null;
            };
            EANReader.prototype._findStart = function() {
              var self2 = this, leadingWhitespaceStart, offset = self2._nextSet(self2._row), startInfo;
              while (!startInfo) {
                startInfo = self2._findPattern(self2.START_PATTERN, offset);
                if (!startInfo) {
                  return null;
                }
                leadingWhitespaceStart = startInfo.start - (startInfo.end - startInfo.start);
                if (leadingWhitespaceStart >= 0) {
                  if (self2._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
                    return startInfo;
                  }
                }
                offset = startInfo.end;
                startInfo = null;
              }
            };
            EANReader.prototype._verifyTrailingWhitespace = function(endInfo) {
              var self2 = this, trailingWhitespaceEnd;
              trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start);
              if (trailingWhitespaceEnd < self2._row.length) {
                if (self2._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
                  return endInfo;
                }
              }
              return null;
            };
            EANReader.prototype._findEnd = function(offset, isWhite) {
              var self2 = this, endInfo = self2._findPattern(self2.STOP_PATTERN, offset, isWhite, false);
              return endInfo !== null ? self2._verifyTrailingWhitespace(endInfo) : null;
            };
            EANReader.prototype._calculateFirstDigit = function(codeFrequency) {
              var i, self2 = this;
              for (i = 0; i < self2.CODE_FREQUENCY.length; i++) {
                if (codeFrequency === self2.CODE_FREQUENCY[i]) {
                  return i;
                }
              }
              return null;
            };
            EANReader.prototype._decodePayload = function(code, result, decodedCodes) {
              var i, self2 = this, codeFrequency = 0, firstDigit;
              for (i = 0; i < 6; i++) {
                code = self2._decodeCode(code.end);
                if (!code) {
                  return null;
                }
                if (code.code >= self2.CODE_G_START) {
                  code.code = code.code - self2.CODE_G_START;
                  codeFrequency |= 1 << 5 - i;
                } else {
                  codeFrequency |= 0 << 5 - i;
                }
                result.push(code.code);
                decodedCodes.push(code);
              }
              firstDigit = self2._calculateFirstDigit(codeFrequency);
              if (firstDigit === null) {
                return null;
              }
              result.unshift(firstDigit);
              code = self2._findPattern(self2.MIDDLE_PATTERN, code.end, true, false);
              if (code === null) {
                return null;
              }
              decodedCodes.push(code);
              for (i = 0; i < 6; i++) {
                code = self2._decodeCode(code.end, self2.CODE_G_START);
                if (!code) {
                  return null;
                }
                decodedCodes.push(code);
                result.push(code.code);
              }
              return code;
            };
            EANReader.prototype._decode = function() {
              var startInfo, self2 = this, code, result = [], decodedCodes = [], resultInfo = {};
              startInfo = self2._findStart();
              if (!startInfo) {
                return null;
              }
              code = {
                code: startInfo.code,
                start: startInfo.start,
                end: startInfo.end
              };
              decodedCodes.push(code);
              code = self2._decodePayload(code, result, decodedCodes);
              if (!code) {
                return null;
              }
              code = self2._findEnd(code.end, false);
              if (!code) {
                return null;
              }
              decodedCodes.push(code);
              if (!self2._checksum(result)) {
                return null;
              }
              if (this.supplements.length > 0) {
                var ext = this._decodeExtensions(code.end);
                if (!ext) {
                  return null;
                }
                var lastCode = ext.decodedCodes[ext.decodedCodes.length - 1], endInfo = {
                  start: lastCode.start + ((lastCode.end - lastCode.start) / 2 | 0),
                  end: lastCode.end
                };
                if (!self2._verifyTrailingWhitespace(endInfo)) {
                  return null;
                }
                resultInfo = {
                  supplement: ext,
                  code: result.join("") + ext.code
                };
              }
              return _extends({
                code: result.join(""),
                start: startInfo.start,
                end: code.end,
                codeset: "",
                startInfo,
                decodedCodes
              }, resultInfo);
            };
            EANReader.prototype._decodeExtensions = function(offset) {
              var i, start = this._nextSet(this._row, offset), startInfo = this._findPattern(this.EXTENSION_START_PATTERN, start, false, false), result;
              if (startInfo === null) {
                return null;
              }
              for (i = 0; i < this.supplements.length; i++) {
                result = this.supplements[i].decode(this._row, startInfo.end);
                if (result !== null) {
                  return {
                    code: result.code,
                    start,
                    startInfo,
                    end: result.end,
                    codeset: "",
                    decodedCodes: result.decodedCodes
                  };
                }
              }
              return null;
            };
            EANReader.prototype._checksum = function(result) {
              var sum = 0, i;
              for (i = result.length - 2; i >= 0; i -= 2) {
                sum += result[i];
              }
              sum *= 3;
              for (i = result.length - 1; i >= 0; i -= 2) {
                sum += result[i];
              }
              return sum % 10 === 0;
            };
            EANReader.CONFIG_KEYS = {
              supplements: {
                "type": "arrayOf(string)",
                "default": [],
                "description": "Allowed extensions to be decoded (2 and/or 5)"
              }
            };
            __webpack_exports__["a"] = EANReader;
          },
          function(module2, exports2, __webpack_require__) {
            var freeGlobal = __webpack_require__(38);
            var freeSelf = typeof self == "object" && self && self.Object === Object && self;
            var root = freeGlobal || freeSelf || Function("return this")();
            module2.exports = root;
          },
          function(module2, exports2) {
            function isObjectLike(value) {
              return value != null && typeof value == "object";
            }
            module2.exports = isObjectLike;
          },
          function(module2, exports2) {
            module2.exports = clone;
            function clone(a) {
              var out = new Float32Array(2);
              out[0] = a[0];
              out[1] = a[1];
              return out;
            }
          },
          function(module2, exports2, __webpack_require__) {
            var Symbol2 = __webpack_require__(11), getRawTag = __webpack_require__(119), objectToString = __webpack_require__(146);
            var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
            var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
            function baseGetTag(value) {
              if (value == null) {
                return value === void 0 ? undefinedTag : nullTag;
              }
              return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
            }
            module2.exports = baseGetTag;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__["a"] = {
              drawRect: function drawRect(pos, size, ctx, style) {
                ctx.strokeStyle = style.color;
                ctx.fillStyle = style.color;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.strokeRect(pos.x, pos.y, size.x, size.y);
              },
              drawPath: function drawPath(path, def, ctx, style) {
                ctx.strokeStyle = style.color;
                ctx.fillStyle = style.color;
                ctx.lineWidth = style.lineWidth;
                ctx.beginPath();
                ctx.moveTo(path[0][def.x], path[0][def.y]);
                for (var j = 1; j < path.length; j++) {
                  ctx.lineTo(path[j][def.x], path[j][def.y]);
                }
                ctx.closePath();
                ctx.stroke();
              },
              drawImage: function drawImage(imageData, size, ctx) {
                var canvasData = ctx.getImageData(0, 0, size.x, size.y), data = canvasData.data, imageDataPos = imageData.length, canvasDataPos = data.length, value;
                if (canvasDataPos / imageDataPos !== 4) {
                  return false;
                }
                while (imageDataPos--) {
                  value = imageData[imageDataPos];
                  data[--canvasDataPos] = 255;
                  data[--canvasDataPos] = value;
                  data[--canvasDataPos] = value;
                  data[--canvasDataPos] = value;
                }
                ctx.putImageData(canvasData, 0, 0);
                return true;
              }
            };
          },
          function(module2, exports2, __webpack_require__) {
            var listCacheClear = __webpack_require__(133), listCacheDelete = __webpack_require__(134), listCacheGet = __webpack_require__(135), listCacheHas = __webpack_require__(136), listCacheSet = __webpack_require__(137);
            function ListCache(entries) {
              var index = -1, length = entries == null ? 0 : entries.length;
              this.clear();
              while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
              }
            }
            ListCache.prototype.clear = listCacheClear;
            ListCache.prototype["delete"] = listCacheDelete;
            ListCache.prototype.get = listCacheGet;
            ListCache.prototype.has = listCacheHas;
            ListCache.prototype.set = listCacheSet;
            module2.exports = ListCache;
          },
          function(module2, exports2, __webpack_require__) {
            var root = __webpack_require__(5);
            var Symbol2 = root.Symbol;
            module2.exports = Symbol2;
          },
          function(module2, exports2, __webpack_require__) {
            var eq = __webpack_require__(17);
            function assocIndexOf(array, key) {
              var length = array.length;
              while (length--) {
                if (eq(array[length][0], key)) {
                  return length;
                }
              }
              return -1;
            }
            module2.exports = assocIndexOf;
          },
          function(module2, exports2, __webpack_require__) {
            var isArray = __webpack_require__(2), isKey = __webpack_require__(130), stringToPath = __webpack_require__(154), toString = __webpack_require__(165);
            function castPath(value, object) {
              if (isArray(value)) {
                return value;
              }
              return isKey(value, object) ? [value] : stringToPath(toString(value));
            }
            module2.exports = castPath;
          },
          function(module2, exports2, __webpack_require__) {
            var isKeyable = __webpack_require__(131);
            function getMapData(map, key) {
              var data = map.__data__;
              return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
            }
            module2.exports = getMapData;
          },
          function(module2, exports2) {
            var MAX_SAFE_INTEGER = 9007199254740991;
            var reIsUint = /^(?:0|[1-9]\d*)$/;
            function isIndex(value, length) {
              length = length == null ? MAX_SAFE_INTEGER : length;
              return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
            }
            module2.exports = isIndex;
          },
          function(module2, exports2, __webpack_require__) {
            var getNative = __webpack_require__(22);
            var nativeCreate = getNative(Object, "create");
            module2.exports = nativeCreate;
          },
          function(module2, exports2) {
            function eq(value, other) {
              return value === other || value !== value && other !== other;
            }
            module2.exports = eq;
          },
          function(module2, exports2, __webpack_require__) {
            var baseIsArguments = __webpack_require__(96), isObjectLike = __webpack_require__(6);
            var objectProto = Object.prototype;
            var hasOwnProperty = objectProto.hasOwnProperty;
            var propertyIsEnumerable = objectProto.propertyIsEnumerable;
            var isArguments = baseIsArguments(function() {
              return arguments;
            }()) ? baseIsArguments : function(value) {
              return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
            };
            module2.exports = isArguments;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__cluster__ = __webpack_require__(50);
            var __WEBPACK_IMPORTED_MODULE_1__array_helper__ = __webpack_require__(3);
            __webpack_exports__["b"] = imageRef;
            __webpack_exports__["f"] = otsuThreshold;
            __webpack_exports__["g"] = cluster;
            __webpack_exports__["h"] = topGeneric;
            __webpack_exports__["c"] = grayAndHalfSampleFromCanvasData;
            __webpack_exports__["d"] = computeGray;
            __webpack_exports__["i"] = halfSample;
            __webpack_exports__["a"] = hsv2rgb;
            __webpack_exports__["e"] = calculatePatchSize;
            __webpack_exports__["j"] = computeImageArea;
            var vec2 = {
              clone: __webpack_require__(7)
            };
            var vec3 = {
              clone: __webpack_require__(83)
            };
            function imageRef(x, y) {
              var that = {
                x,
                y,
                toVec2: function toVec2() {
                  return vec2.clone([this.x, this.y]);
                },
                toVec3: function toVec3() {
                  return vec3.clone([this.x, this.y, 1]);
                },
                round: function round() {
                  this.x = this.x > 0 ? Math.floor(this.x + 0.5) : Math.floor(this.x - 0.5);
                  this.y = this.y > 0 ? Math.floor(this.y + 0.5) : Math.floor(this.y - 0.5);
                  return this;
                }
              };
              return that;
            }
            ;
            function computeIntegralImage2(imageWrapper, integralWrapper) {
              var imageData = imageWrapper.data;
              var width = imageWrapper.size.x;
              var height = imageWrapper.size.y;
              var integralImageData = integralWrapper.data;
              var sum = 0, posA = 0, posB = 0, posC = 0, posD = 0, x, y;
              posB = width;
              sum = 0;
              for (y = 1; y < height; y++) {
                sum += imageData[posA];
                integralImageData[posB] += sum;
                posA += width;
                posB += width;
              }
              posA = 0;
              posB = 1;
              sum = 0;
              for (x = 1; x < width; x++) {
                sum += imageData[posA];
                integralImageData[posB] += sum;
                posA++;
                posB++;
              }
              for (y = 1; y < height; y++) {
                posA = y * width + 1;
                posB = (y - 1) * width + 1;
                posC = y * width;
                posD = (y - 1) * width;
                for (x = 1; x < width; x++) {
                  integralImageData[posA] += imageData[posA] + integralImageData[posB] + integralImageData[posC] - integralImageData[posD];
                  posA++;
                  posB++;
                  posC++;
                  posD++;
                }
              }
            }
            ;
            function computeIntegralImage(imageWrapper, integralWrapper) {
              var imageData = imageWrapper.data;
              var width = imageWrapper.size.x;
              var height = imageWrapper.size.y;
              var integralImageData = integralWrapper.data;
              var sum = 0;
              for (var i = 0; i < width; i++) {
                sum += imageData[i];
                integralImageData[i] = sum;
              }
              for (var v = 1; v < height; v++) {
                sum = 0;
                for (var u = 0; u < width; u++) {
                  sum += imageData[v * width + u];
                  integralImageData[v * width + u] = sum + integralImageData[(v - 1) * width + u];
                }
              }
            }
            ;
            function thresholdImage(imageWrapper, threshold, targetWrapper) {
              if (!targetWrapper) {
                targetWrapper = imageWrapper;
              }
              var imageData = imageWrapper.data, length = imageData.length, targetData = targetWrapper.data;
              while (length--) {
                targetData[length] = imageData[length] < threshold ? 1 : 0;
              }
            }
            ;
            function computeHistogram(imageWrapper, bitsPerPixel) {
              if (!bitsPerPixel) {
                bitsPerPixel = 8;
              }
              var imageData = imageWrapper.data, length = imageData.length, bitShift = 8 - bitsPerPixel, bucketCnt = 1 << bitsPerPixel, hist = new Int32Array(bucketCnt);
              while (length--) {
                hist[imageData[length] >> bitShift]++;
              }
              return hist;
            }
            ;
            function sharpenLine(line) {
              var i, length = line.length, left = line[0], center = line[1], right;
              for (i = 1; i < length - 1; i++) {
                right = line[i + 1];
                line[i - 1] = center * 2 - left - right & 255;
                left = center;
                center = right;
              }
              return line;
            }
            ;
            function determineOtsuThreshold(imageWrapper, bitsPerPixel) {
              if (!bitsPerPixel) {
                bitsPerPixel = 8;
              }
              var hist, threshold, bitShift = 8 - bitsPerPixel;
              function px(init, end) {
                var sum = 0, i;
                for (i = init; i <= end; i++) {
                  sum += hist[i];
                }
                return sum;
              }
              function mx(init, end) {
                var i, sum = 0;
                for (i = init; i <= end; i++) {
                  sum += i * hist[i];
                }
                return sum;
              }
              function determineThreshold() {
                var vet = [0], p1, p2, p12, k, m1, m2, m12, max = (1 << bitsPerPixel) - 1;
                hist = computeHistogram(imageWrapper, bitsPerPixel);
                for (k = 1; k < max; k++) {
                  p1 = px(0, k);
                  p2 = px(k + 1, max);
                  p12 = p1 * p2;
                  if (p12 === 0) {
                    p12 = 1;
                  }
                  m1 = mx(0, k) * p2;
                  m2 = mx(k + 1, max) * p1;
                  m12 = m1 - m2;
                  vet[k] = m12 * m12 / p12;
                }
                return __WEBPACK_IMPORTED_MODULE_1__array_helper__["a"].maxIndex(vet);
              }
              threshold = determineThreshold();
              return threshold << bitShift;
            }
            ;
            function otsuThreshold(imageWrapper, targetWrapper) {
              var threshold = determineOtsuThreshold(imageWrapper);
              thresholdImage(imageWrapper, threshold, targetWrapper);
              return threshold;
            }
            ;
            function computeBinaryImage(imageWrapper, integralWrapper, targetWrapper) {
              computeIntegralImage(imageWrapper, integralWrapper);
              if (!targetWrapper) {
                targetWrapper = imageWrapper;
              }
              var imageData = imageWrapper.data;
              var targetData = targetWrapper.data;
              var width = imageWrapper.size.x;
              var height = imageWrapper.size.y;
              var integralImageData = integralWrapper.data;
              var sum = 0, v, u, kernel = 3, A, B, C, D, avg, size = (kernel * 2 + 1) * (kernel * 2 + 1);
              for (v = 0; v <= kernel; v++) {
                for (u = 0; u < width; u++) {
                  targetData[v * width + u] = 0;
                  targetData[(height - 1 - v) * width + u] = 0;
                }
              }
              for (v = kernel; v < height - kernel; v++) {
                for (u = 0; u <= kernel; u++) {
                  targetData[v * width + u] = 0;
                  targetData[v * width + (width - 1 - u)] = 0;
                }
              }
              for (v = kernel + 1; v < height - kernel - 1; v++) {
                for (u = kernel + 1; u < width - kernel; u++) {
                  A = integralImageData[(v - kernel - 1) * width + (u - kernel - 1)];
                  B = integralImageData[(v - kernel - 1) * width + (u + kernel)];
                  C = integralImageData[(v + kernel) * width + (u - kernel - 1)];
                  D = integralImageData[(v + kernel) * width + (u + kernel)];
                  sum = D - C - B + A;
                  avg = sum / size;
                  targetData[v * width + u] = imageData[v * width + u] > avg + 5 ? 0 : 1;
                }
              }
            }
            ;
            function cluster(points, threshold, property) {
              var i, k, cluster2, point, clusters = [];
              if (!property) {
                property = "rad";
              }
              function addToCluster(newPoint) {
                var found = false;
                for (k = 0; k < clusters.length; k++) {
                  cluster2 = clusters[k];
                  if (cluster2.fits(newPoint)) {
                    cluster2.add(newPoint);
                    found = true;
                  }
                }
                return found;
              }
              for (i = 0; i < points.length; i++) {
                point = __WEBPACK_IMPORTED_MODULE_0__cluster__["a"].createPoint(points[i], i, property);
                if (!addToCluster(point)) {
                  clusters.push(__WEBPACK_IMPORTED_MODULE_0__cluster__["a"].create(point, threshold));
                }
              }
              return clusters;
            }
            ;
            var Tracer = {
              trace: function trace(points, vec) {
                var iteration, maxIterations = 10, top = [], result = [], centerPos = 0, currentPos = 0;
                function trace2(idx, forward) {
                  var from, to, toIdx, predictedPos, thresholdX = 1, thresholdY = Math.abs(vec[1] / 10), found = false;
                  function match(pos, predicted) {
                    if (pos.x > predicted.x - thresholdX && pos.x < predicted.x + thresholdX && pos.y > predicted.y - thresholdY && pos.y < predicted.y + thresholdY) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                  from = points[idx];
                  if (forward) {
                    predictedPos = {
                      x: from.x + vec[0],
                      y: from.y + vec[1]
                    };
                  } else {
                    predictedPos = {
                      x: from.x - vec[0],
                      y: from.y - vec[1]
                    };
                  }
                  toIdx = forward ? idx + 1 : idx - 1;
                  to = points[toIdx];
                  while (to && (found = match(to, predictedPos)) !== true && Math.abs(to.y - from.y) < vec[1]) {
                    toIdx = forward ? toIdx + 1 : toIdx - 1;
                    to = points[toIdx];
                  }
                  return found ? toIdx : null;
                }
                for (iteration = 0; iteration < maxIterations; iteration++) {
                  centerPos = Math.floor(Math.random() * points.length);
                  top = [];
                  currentPos = centerPos;
                  top.push(points[currentPos]);
                  while ((currentPos = trace2(currentPos, true)) !== null) {
                    top.push(points[currentPos]);
                  }
                  if (centerPos > 0) {
                    currentPos = centerPos;
                    while ((currentPos = trace2(currentPos, false)) !== null) {
                      top.push(points[currentPos]);
                    }
                  }
                  if (top.length > result.length) {
                    result = top;
                  }
                }
                return result;
              }
            };
            var DILATE = 1;
            var ERODE = 2;
            function dilate(inImageWrapper, outImageWrapper) {
              var v, u, inImageData = inImageWrapper.data, outImageData = outImageWrapper.data, height = inImageWrapper.size.y, width = inImageWrapper.size.x, sum, yStart1, yStart2, xStart1, xStart2;
              for (v = 1; v < height - 1; v++) {
                for (u = 1; u < width - 1; u++) {
                  yStart1 = v - 1;
                  yStart2 = v + 1;
                  xStart1 = u - 1;
                  xStart2 = u + 1;
                  sum = inImageData[yStart1 * width + xStart1] + inImageData[yStart1 * width + xStart2] + inImageData[v * width + u] + inImageData[yStart2 * width + xStart1] + inImageData[yStart2 * width + xStart2];
                  outImageData[v * width + u] = sum > 0 ? 1 : 0;
                }
              }
            }
            ;
            function erode(inImageWrapper, outImageWrapper) {
              var v, u, inImageData = inImageWrapper.data, outImageData = outImageWrapper.data, height = inImageWrapper.size.y, width = inImageWrapper.size.x, sum, yStart1, yStart2, xStart1, xStart2;
              for (v = 1; v < height - 1; v++) {
                for (u = 1; u < width - 1; u++) {
                  yStart1 = v - 1;
                  yStart2 = v + 1;
                  xStart1 = u - 1;
                  xStart2 = u + 1;
                  sum = inImageData[yStart1 * width + xStart1] + inImageData[yStart1 * width + xStart2] + inImageData[v * width + u] + inImageData[yStart2 * width + xStart1] + inImageData[yStart2 * width + xStart2];
                  outImageData[v * width + u] = sum === 5 ? 1 : 0;
                }
              }
            }
            ;
            function subtract(aImageWrapper, bImageWrapper, resultImageWrapper) {
              if (!resultImageWrapper) {
                resultImageWrapper = aImageWrapper;
              }
              var length = aImageWrapper.data.length, aImageData = aImageWrapper.data, bImageData = bImageWrapper.data, cImageData = resultImageWrapper.data;
              while (length--) {
                cImageData[length] = aImageData[length] - bImageData[length];
              }
            }
            ;
            function bitwiseOr(aImageWrapper, bImageWrapper, resultImageWrapper) {
              if (!resultImageWrapper) {
                resultImageWrapper = aImageWrapper;
              }
              var length = aImageWrapper.data.length, aImageData = aImageWrapper.data, bImageData = bImageWrapper.data, cImageData = resultImageWrapper.data;
              while (length--) {
                cImageData[length] = aImageData[length] || bImageData[length];
              }
            }
            ;
            function countNonZero(imageWrapper) {
              var length = imageWrapper.data.length, data = imageWrapper.data, sum = 0;
              while (length--) {
                sum += data[length];
              }
              return sum;
            }
            ;
            function topGeneric(list, top, scoreFunc) {
              var i, minIdx = 0, min = 0, queue = [], score, hit, pos;
              for (i = 0; i < top; i++) {
                queue[i] = {
                  score: 0,
                  item: null
                };
              }
              for (i = 0; i < list.length; i++) {
                score = scoreFunc.apply(this, [list[i]]);
                if (score > min) {
                  hit = queue[minIdx];
                  hit.score = score;
                  hit.item = list[i];
                  min = Number.MAX_VALUE;
                  for (pos = 0; pos < top; pos++) {
                    if (queue[pos].score < min) {
                      min = queue[pos].score;
                      minIdx = pos;
                    }
                  }
                }
              }
              return queue;
            }
            ;
            function grayArrayFromImage(htmlImage, offsetX, ctx, array) {
              ctx.drawImage(htmlImage, offsetX, 0, htmlImage.width, htmlImage.height);
              var ctxData = ctx.getImageData(offsetX, 0, htmlImage.width, htmlImage.height).data;
              computeGray(ctxData, array);
            }
            ;
            function grayArrayFromContext(ctx, size, offset, array) {
              var ctxData = ctx.getImageData(offset.x, offset.y, size.x, size.y).data;
              computeGray(ctxData, array);
            }
            ;
            function grayAndHalfSampleFromCanvasData(canvasData, size, outArray) {
              var topRowIdx = 0;
              var bottomRowIdx = size.x;
              var endIdx = Math.floor(canvasData.length / 4);
              var outWidth = size.x / 2;
              var outImgIdx = 0;
              var inWidth = size.x;
              var i;
              while (bottomRowIdx < endIdx) {
                for (i = 0; i < outWidth; i++) {
                  outArray[outImgIdx] = (0.299 * canvasData[topRowIdx * 4 + 0] + 0.587 * canvasData[topRowIdx * 4 + 1] + 0.114 * canvasData[topRowIdx * 4 + 2] + (0.299 * canvasData[(topRowIdx + 1) * 4 + 0] + 0.587 * canvasData[(topRowIdx + 1) * 4 + 1] + 0.114 * canvasData[(topRowIdx + 1) * 4 + 2]) + (0.299 * canvasData[bottomRowIdx * 4 + 0] + 0.587 * canvasData[bottomRowIdx * 4 + 1] + 0.114 * canvasData[bottomRowIdx * 4 + 2]) + (0.299 * canvasData[(bottomRowIdx + 1) * 4 + 0] + 0.587 * canvasData[(bottomRowIdx + 1) * 4 + 1] + 0.114 * canvasData[(bottomRowIdx + 1) * 4 + 2])) / 4;
                  outImgIdx++;
                  topRowIdx = topRowIdx + 2;
                  bottomRowIdx = bottomRowIdx + 2;
                }
                topRowIdx = topRowIdx + inWidth;
                bottomRowIdx = bottomRowIdx + inWidth;
              }
            }
            ;
            function computeGray(imageData, outArray, config) {
              var l = imageData.length / 4 | 0, i, singleChannel = config && config.singleChannel === true;
              if (singleChannel) {
                for (i = 0; i < l; i++) {
                  outArray[i] = imageData[i * 4 + 0];
                }
              } else {
                for (i = 0; i < l; i++) {
                  outArray[i] = 0.299 * imageData[i * 4 + 0] + 0.587 * imageData[i * 4 + 1] + 0.114 * imageData[i * 4 + 2];
                }
              }
            }
            ;
            function loadImageArray(src, callback, canvas) {
              if (!canvas) {
                canvas = document.createElement("canvas");
              }
              var img = new Image();
              img.callback = callback;
              img.onload = function() {
                canvas.width = this.width;
                canvas.height = this.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);
                var array = new Uint8Array(this.width * this.height);
                ctx.drawImage(this, 0, 0);
                var data = ctx.getImageData(0, 0, this.width, this.height).data;
                computeGray(data, array);
                this.callback(array, {
                  x: this.width,
                  y: this.height
                }, this);
              };
              img.src = src;
            }
            ;
            function halfSample(inImgWrapper, outImgWrapper) {
              var inImg = inImgWrapper.data;
              var inWidth = inImgWrapper.size.x;
              var outImg = outImgWrapper.data;
              var topRowIdx = 0;
              var bottomRowIdx = inWidth;
              var endIdx = inImg.length;
              var outWidth = inWidth / 2;
              var outImgIdx = 0;
              while (bottomRowIdx < endIdx) {
                for (var i = 0; i < outWidth; i++) {
                  outImg[outImgIdx] = Math.floor((inImg[topRowIdx] + inImg[topRowIdx + 1] + inImg[bottomRowIdx] + inImg[bottomRowIdx + 1]) / 4);
                  outImgIdx++;
                  topRowIdx = topRowIdx + 2;
                  bottomRowIdx = bottomRowIdx + 2;
                }
                topRowIdx = topRowIdx + inWidth;
                bottomRowIdx = bottomRowIdx + inWidth;
              }
            }
            ;
            function hsv2rgb(hsv, rgb) {
              var h = hsv[0], s = hsv[1], v = hsv[2], c = v * s, x = c * (1 - Math.abs(h / 60 % 2 - 1)), m = v - c, r = 0, g = 0, b = 0;
              rgb = rgb || [0, 0, 0];
              if (h < 60) {
                r = c;
                g = x;
              } else if (h < 120) {
                r = x;
                g = c;
              } else if (h < 180) {
                g = c;
                b = x;
              } else if (h < 240) {
                g = x;
                b = c;
              } else if (h < 300) {
                r = x;
                b = c;
              } else if (h < 360) {
                r = c;
                b = x;
              }
              rgb[0] = (r + m) * 255 | 0;
              rgb[1] = (g + m) * 255 | 0;
              rgb[2] = (b + m) * 255 | 0;
              return rgb;
            }
            ;
            function _computeDivisors(n) {
              var largeDivisors = [], divisors = [], i;
              for (i = 1; i < Math.sqrt(n) + 1; i++) {
                if (n % i === 0) {
                  divisors.push(i);
                  if (i !== n / i) {
                    largeDivisors.unshift(Math.floor(n / i));
                  }
                }
              }
              return divisors.concat(largeDivisors);
            }
            ;
            function _computeIntersection(arr1, arr2) {
              var i = 0, j = 0, result = [];
              while (i < arr1.length && j < arr2.length) {
                if (arr1[i] === arr2[j]) {
                  result.push(arr1[i]);
                  i++;
                  j++;
                } else if (arr1[i] > arr2[j]) {
                  j++;
                } else {
                  i++;
                }
              }
              return result;
            }
            ;
            function calculatePatchSize(patchSize, imgSize) {
              var divisorsX = _computeDivisors(imgSize.x), divisorsY = _computeDivisors(imgSize.y), wideSide = Math.max(imgSize.x, imgSize.y), common = _computeIntersection(divisorsX, divisorsY), nrOfPatchesList = [8, 10, 15, 20, 32, 60, 80], nrOfPatchesMap = {
                "x-small": 5,
                "small": 4,
                "medium": 3,
                "large": 2,
                "x-large": 1
              }, nrOfPatchesIdx = nrOfPatchesMap[patchSize] || nrOfPatchesMap.medium, nrOfPatches = nrOfPatchesList[nrOfPatchesIdx], desiredPatchSize = Math.floor(wideSide / nrOfPatches), optimalPatchSize;
              function findPatchSizeForDivisors(divisors) {
                var i = 0, found = divisors[Math.floor(divisors.length / 2)];
                while (i < divisors.length - 1 && divisors[i] < desiredPatchSize) {
                  i++;
                }
                if (i > 0) {
                  if (Math.abs(divisors[i] - desiredPatchSize) > Math.abs(divisors[i - 1] - desiredPatchSize)) {
                    found = divisors[i - 1];
                  } else {
                    found = divisors[i];
                  }
                }
                if (desiredPatchSize / found < nrOfPatchesList[nrOfPatchesIdx + 1] / nrOfPatchesList[nrOfPatchesIdx] && desiredPatchSize / found > nrOfPatchesList[nrOfPatchesIdx - 1] / nrOfPatchesList[nrOfPatchesIdx]) {
                  return { x: found, y: found };
                }
                return null;
              }
              optimalPatchSize = findPatchSizeForDivisors(common);
              if (!optimalPatchSize) {
                optimalPatchSize = findPatchSizeForDivisors(_computeDivisors(wideSide));
                if (!optimalPatchSize) {
                  optimalPatchSize = findPatchSizeForDivisors(_computeDivisors(desiredPatchSize * nrOfPatches));
                }
              }
              return optimalPatchSize;
            }
            ;
            function _parseCSSDimensionValues(value) {
              var dimension = {
                value: parseFloat(value),
                unit: value.indexOf("%") === value.length - 1 ? "%" : "%"
              };
              return dimension;
            }
            ;
            var _dimensionsConverters = {
              top: function top(dimension, context) {
                if (dimension.unit === "%") {
                  return Math.floor(context.height * (dimension.value / 100));
                }
              },
              right: function right(dimension, context) {
                if (dimension.unit === "%") {
                  return Math.floor(context.width - context.width * (dimension.value / 100));
                }
              },
              bottom: function bottom(dimension, context) {
                if (dimension.unit === "%") {
                  return Math.floor(context.height - context.height * (dimension.value / 100));
                }
              },
              left: function left(dimension, context) {
                if (dimension.unit === "%") {
                  return Math.floor(context.width * (dimension.value / 100));
                }
              }
            };
            function computeImageArea(inputWidth, inputHeight, area) {
              var context = { width: inputWidth, height: inputHeight };
              var parsedArea = Object.keys(area).reduce(function(result, key) {
                var value = area[key], parsed = _parseCSSDimensionValues(value), calculated = _dimensionsConverters[key](parsed, context);
                result[key] = calculated;
                return result;
              }, {});
              return {
                sx: parsedArea.left,
                sy: parsedArea.top,
                sw: parsedArea.right - parsedArea.left,
                sh: parsedArea.bottom - parsedArea.top
              };
            }
            ;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__subImage__ = __webpack_require__(53);
            var __WEBPACK_IMPORTED_MODULE_1__common_cv_utils__ = __webpack_require__(19);
            var __WEBPACK_IMPORTED_MODULE_2__common_array_helper__ = __webpack_require__(3);
            var vec2 = {
              clone: __webpack_require__(7)
            };
            function ImageWrapper(size, data, ArrayType, initialize) {
              if (!data) {
                if (ArrayType) {
                  this.data = new ArrayType(size.x * size.y);
                  if (ArrayType === Array && initialize) {
                    __WEBPACK_IMPORTED_MODULE_2__common_array_helper__["a"].init(this.data, 0);
                  }
                } else {
                  this.data = new Uint8Array(size.x * size.y);
                  if (Uint8Array === Array && initialize) {
                    __WEBPACK_IMPORTED_MODULE_2__common_array_helper__["a"].init(this.data, 0);
                  }
                }
              } else {
                this.data = data;
              }
              this.size = size;
            }
            ImageWrapper.prototype.inImageWithBorder = function(imgRef, border) {
              return imgRef.x >= border && imgRef.y >= border && imgRef.x < this.size.x - border && imgRef.y < this.size.y - border;
            };
            ImageWrapper.sample = function(inImg, x, y) {
              var lx = Math.floor(x);
              var ly = Math.floor(y);
              var w = inImg.size.x;
              var base = ly * inImg.size.x + lx;
              var a = inImg.data[base + 0];
              var b = inImg.data[base + 1];
              var c = inImg.data[base + w];
              var d = inImg.data[base + w + 1];
              var e = a - b;
              x -= lx;
              y -= ly;
              var result = Math.floor(x * (y * (e - c + d) - e) + y * (c - a) + a);
              return result;
            };
            ImageWrapper.clearArray = function(array) {
              var l = array.length;
              while (l--) {
                array[l] = 0;
              }
            };
            ImageWrapper.prototype.subImage = function(from, size) {
              return new __WEBPACK_IMPORTED_MODULE_0__subImage__["a"](from, size, this);
            };
            ImageWrapper.prototype.subImageAsCopy = function(imageWrapper, from) {
              var sizeY = imageWrapper.size.y, sizeX = imageWrapper.size.x;
              var x, y;
              for (x = 0; x < sizeX; x++) {
                for (y = 0; y < sizeY; y++) {
                  imageWrapper.data[y * sizeX + x] = this.data[(from.y + y) * this.size.x + from.x + x];
                }
              }
            };
            ImageWrapper.prototype.copyTo = function(imageWrapper) {
              var length = this.data.length, srcData = this.data, dstData = imageWrapper.data;
              while (length--) {
                dstData[length] = srcData[length];
              }
            };
            ImageWrapper.prototype.get = function(x, y) {
              return this.data[y * this.size.x + x];
            };
            ImageWrapper.prototype.getSafe = function(x, y) {
              var i;
              if (!this.indexMapping) {
                this.indexMapping = {
                  x: [],
                  y: []
                };
                for (i = 0; i < this.size.x; i++) {
                  this.indexMapping.x[i] = i;
                  this.indexMapping.x[i + this.size.x] = i;
                }
                for (i = 0; i < this.size.y; i++) {
                  this.indexMapping.y[i] = i;
                  this.indexMapping.y[i + this.size.y] = i;
                }
              }
              return this.data[this.indexMapping.y[y + this.size.y] * this.size.x + this.indexMapping.x[x + this.size.x]];
            };
            ImageWrapper.prototype.set = function(x, y, value) {
              this.data[y * this.size.x + x] = value;
              return this;
            };
            ImageWrapper.prototype.zeroBorder = function() {
              var i, width = this.size.x, height = this.size.y, data = this.data;
              for (i = 0; i < width; i++) {
                data[i] = data[(height - 1) * width + i] = 0;
              }
              for (i = 1; i < height - 1; i++) {
                data[i * width] = data[i * width + (width - 1)] = 0;
              }
            };
            ImageWrapper.prototype.invert = function() {
              var data = this.data, length = data.length;
              while (length--) {
                data[length] = data[length] ? 0 : 1;
              }
            };
            ImageWrapper.prototype.convolve = function(kernel) {
              var x, y, kx, ky, kSize = kernel.length / 2 | 0, accu = 0;
              for (y = 0; y < this.size.y; y++) {
                for (x = 0; x < this.size.x; x++) {
                  accu = 0;
                  for (ky = -kSize; ky <= kSize; ky++) {
                    for (kx = -kSize; kx <= kSize; kx++) {
                      accu += kernel[ky + kSize][kx + kSize] * this.getSafe(x + kx, y + ky);
                    }
                  }
                  this.data[y * this.size.x + x] = accu;
                }
              }
            };
            ImageWrapper.prototype.moments = function(labelcount) {
              var data = this.data, x, y, height = this.size.y, width = this.size.x, val, ysq, labelsum = [], i, label, mu11, mu02, mu20, x_, y_, tmp, result = [], PI = Math.PI, PI_4 = PI / 4;
              if (labelcount <= 0) {
                return result;
              }
              for (i = 0; i < labelcount; i++) {
                labelsum[i] = {
                  m00: 0,
                  m01: 0,
                  m10: 0,
                  m11: 0,
                  m02: 0,
                  m20: 0,
                  theta: 0,
                  rad: 0
                };
              }
              for (y = 0; y < height; y++) {
                ysq = y * y;
                for (x = 0; x < width; x++) {
                  val = data[y * width + x];
                  if (val > 0) {
                    label = labelsum[val - 1];
                    label.m00 += 1;
                    label.m01 += y;
                    label.m10 += x;
                    label.m11 += x * y;
                    label.m02 += ysq;
                    label.m20 += x * x;
                  }
                }
              }
              for (i = 0; i < labelcount; i++) {
                label = labelsum[i];
                if (!isNaN(label.m00) && label.m00 !== 0) {
                  x_ = label.m10 / label.m00;
                  y_ = label.m01 / label.m00;
                  mu11 = label.m11 / label.m00 - x_ * y_;
                  mu02 = label.m02 / label.m00 - y_ * y_;
                  mu20 = label.m20 / label.m00 - x_ * x_;
                  tmp = (mu02 - mu20) / (2 * mu11);
                  tmp = 0.5 * Math.atan(tmp) + (mu11 >= 0 ? PI_4 : -PI_4) + PI;
                  label.theta = (tmp * 180 / PI + 90) % 180 - 90;
                  if (label.theta < 0) {
                    label.theta += 180;
                  }
                  label.rad = tmp > PI ? tmp - PI : tmp;
                  label.vec = vec2.clone([Math.cos(tmp), Math.sin(tmp)]);
                  result.push(label);
                }
              }
              return result;
            };
            ImageWrapper.prototype.show = function(canvas, scale) {
              var ctx, frame, data, current, pixel, x, y;
              if (!scale) {
                scale = 1;
              }
              ctx = canvas.getContext("2d");
              canvas.width = this.size.x;
              canvas.height = this.size.y;
              frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
              data = frame.data;
              current = 0;
              for (y = 0; y < this.size.y; y++) {
                for (x = 0; x < this.size.x; x++) {
                  pixel = y * this.size.x + x;
                  current = this.get(x, y) * scale;
                  data[pixel * 4 + 0] = current;
                  data[pixel * 4 + 1] = current;
                  data[pixel * 4 + 2] = current;
                  data[pixel * 4 + 3] = 255;
                }
              }
              ctx.putImageData(frame, 0, 0);
            };
            ImageWrapper.prototype.overlay = function(canvas, scale, from) {
              if (!scale || scale < 0 || scale > 360) {
                scale = 360;
              }
              var hsv = [0, 1, 1];
              var rgb = [0, 0, 0];
              var whiteRgb = [255, 255, 255];
              var blackRgb = [0, 0, 0];
              var result = [];
              var ctx = canvas.getContext("2d");
              var frame = ctx.getImageData(from.x, from.y, this.size.x, this.size.y);
              var data = frame.data;
              var length = this.data.length;
              while (length--) {
                hsv[0] = this.data[length] * scale;
                result = hsv[0] <= 0 ? whiteRgb : hsv[0] >= 360 ? blackRgb : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["a"])(hsv, rgb);
                data[length * 4 + 0] = result[0];
                data[length * 4 + 1] = result[1];
                data[length * 4 + 2] = result[2];
                data[length * 4 + 3] = 255;
              }
              ctx.putImageData(frame, from.x, from.y);
            };
            __webpack_exports__["a"] = ImageWrapper;
          },
          function(module2, exports2, __webpack_require__) {
            var defineProperty = __webpack_require__(37);
            function baseAssignValue(object, key, value) {
              if (key == "__proto__" && defineProperty) {
                defineProperty(object, key, {
                  "configurable": true,
                  "enumerable": true,
                  "value": value,
                  "writable": true
                });
              } else {
                object[key] = value;
              }
            }
            module2.exports = baseAssignValue;
          },
          function(module2, exports2, __webpack_require__) {
            var baseIsNative = __webpack_require__(97), getValue = __webpack_require__(120);
            function getNative(object, key) {
              var value = getValue(object, key);
              return baseIsNative(value) ? value : void 0;
            }
            module2.exports = getNative;
          },
          function(module2, exports2, __webpack_require__) {
            var isSymbol = __webpack_require__(27);
            var INFINITY = 1 / 0;
            function toKey(value) {
              if (typeof value == "string" || isSymbol(value)) {
                return value;
              }
              var result = value + "";
              return result == "0" && 1 / value == -INFINITY ? "-0" : result;
            }
            module2.exports = toKey;
          },
          function(module2, exports2, __webpack_require__) {
            var isFunction = __webpack_require__(25), isLength = __webpack_require__(26);
            function isArrayLike(value) {
              return value != null && isLength(value.length) && !isFunction(value);
            }
            module2.exports = isArrayLike;
          },
          function(module2, exports2, __webpack_require__) {
            var baseGetTag = __webpack_require__(8), isObject = __webpack_require__(0);
            var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
            function isFunction(value) {
              if (!isObject(value)) {
                return false;
              }
              var tag = baseGetTag(value);
              return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
            }
            module2.exports = isFunction;
          },
          function(module2, exports2) {
            var MAX_SAFE_INTEGER = 9007199254740991;
            function isLength(value) {
              return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
            }
            module2.exports = isLength;
          },
          function(module2, exports2, __webpack_require__) {
            var baseGetTag = __webpack_require__(8), isObjectLike = __webpack_require__(6);
            var symbolTag = "[object Symbol]";
            function isSymbol(value) {
              return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
            }
            module2.exports = isSymbol;
          },
          function(module2, exports2, __webpack_require__) {
            var baseMerge = __webpack_require__(100), createAssigner = __webpack_require__(116);
            var merge = createAssigner(function(object, source, srcIndex) {
              baseMerge(object, source, srcIndex);
            });
            module2.exports = merge;
          },
          function(module2, exports2) {
            module2.exports = function(module3) {
              if (!module3.webpackPolyfill) {
                module3.deprecate = function() {
                };
                module3.paths = [];
                if (!module3.children)
                  module3.children = [];
                Object.defineProperty(module3, "loaded", {
                  enumerable: true,
                  get: function() {
                    return module3.l;
                  }
                });
                Object.defineProperty(module3, "id", {
                  enumerable: true,
                  get: function() {
                    return module3.i;
                  }
                });
                module3.webpackPolyfill = 1;
              }
              return module3;
            };
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var Tracer = {
              searchDirections: [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]],
              create: function create(imageWrapper, labelWrapper) {
                var imageData = imageWrapper.data, labelData = labelWrapper.data, searchDirections = this.searchDirections, width = imageWrapper.size.x, pos;
                function _trace(current, color, label, edgelabel) {
                  var i, y, x;
                  for (i = 0; i < 7; i++) {
                    y = current.cy + searchDirections[current.dir][0];
                    x = current.cx + searchDirections[current.dir][1];
                    pos = y * width + x;
                    if (imageData[pos] === color && (labelData[pos] === 0 || labelData[pos] === label)) {
                      labelData[pos] = label;
                      current.cy = y;
                      current.cx = x;
                      return true;
                    } else {
                      if (labelData[pos] === 0) {
                        labelData[pos] = edgelabel;
                      }
                      current.dir = (current.dir + 1) % 8;
                    }
                  }
                  return false;
                }
                function vertex2D(x, y, dir) {
                  return {
                    dir,
                    x,
                    y,
                    next: null,
                    prev: null
                  };
                }
                function _contourTracing(sy, sx, label, color, edgelabel) {
                  var Fv = null, Cv, P, ldir, current = {
                    cx: sx,
                    cy: sy,
                    dir: 0
                  };
                  if (_trace(current, color, label, edgelabel)) {
                    Fv = vertex2D(sx, sy, current.dir);
                    Cv = Fv;
                    ldir = current.dir;
                    P = vertex2D(current.cx, current.cy, 0);
                    P.prev = Cv;
                    Cv.next = P;
                    P.next = null;
                    Cv = P;
                    do {
                      current.dir = (current.dir + 6) % 8;
                      _trace(current, color, label, edgelabel);
                      if (ldir !== current.dir) {
                        Cv.dir = current.dir;
                        P = vertex2D(current.cx, current.cy, 0);
                        P.prev = Cv;
                        Cv.next = P;
                        P.next = null;
                        Cv = P;
                      } else {
                        Cv.dir = ldir;
                        Cv.x = current.cx;
                        Cv.y = current.cy;
                      }
                      ldir = current.dir;
                    } while (current.cx !== sx || current.cy !== sy);
                    Fv.prev = Cv.prev;
                    Cv.prev.next = Fv;
                  }
                  return Fv;
                }
                return {
                  trace: function trace(current, color, label, edgelabel) {
                    return _trace(current, color, label, edgelabel);
                  },
                  contourTracing: function contourTracing(sy, sx, label, color, edgelabel) {
                    return _contourTracing(sy, sx, label, color, edgelabel);
                  }
                };
              }
            };
            __webpack_exports__["a"] = Tracer;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__barcode_reader__ = __webpack_require__(1);
            var __WEBPACK_IMPORTED_MODULE_1__common_array_helper__ = __webpack_require__(3);
            function Code39Reader() {
              __WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].call(this);
            }
            var properties = {
              ALPHABETH_STRING: { value: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. *$/+%" },
              ALPHABET: { value: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 45, 46, 32, 42, 36, 47, 43, 37] },
              CHARACTER_ENCODINGS: { value: [52, 289, 97, 352, 49, 304, 112, 37, 292, 100, 265, 73, 328, 25, 280, 88, 13, 268, 76, 28, 259, 67, 322, 19, 274, 82, 7, 262, 70, 22, 385, 193, 448, 145, 400, 208, 133, 388, 196, 148, 168, 162, 138, 42] },
              ASTERISK: { value: 148 },
              FORMAT: { value: "code_39", writeable: false }
            };
            Code39Reader.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].prototype, properties);
            Code39Reader.prototype.constructor = Code39Reader;
            Code39Reader.prototype._decode = function() {
              var self2 = this, counters = [0, 0, 0, 0, 0, 0, 0, 0, 0], result = [], start = self2._findStart(), decodedChar, lastStart, pattern, nextStart;
              if (!start) {
                return null;
              }
              nextStart = self2._nextSet(self2._row, start.end);
              do {
                counters = self2._toCounters(nextStart, counters);
                pattern = self2._toPattern(counters);
                if (pattern < 0) {
                  return null;
                }
                decodedChar = self2._patternToChar(pattern);
                if (decodedChar < 0) {
                  return null;
                }
                result.push(decodedChar);
                lastStart = nextStart;
                nextStart += __WEBPACK_IMPORTED_MODULE_1__common_array_helper__["a"].sum(counters);
                nextStart = self2._nextSet(self2._row, nextStart);
              } while (decodedChar !== "*");
              result.pop();
              if (!result.length) {
                return null;
              }
              if (!self2._verifyTrailingWhitespace(lastStart, nextStart, counters)) {
                return null;
              }
              return {
                code: result.join(""),
                start: start.start,
                end: nextStart,
                startInfo: start,
                decodedCodes: result
              };
            };
            Code39Reader.prototype._verifyTrailingWhitespace = function(lastStart, nextStart, counters) {
              var trailingWhitespaceEnd, patternSize = __WEBPACK_IMPORTED_MODULE_1__common_array_helper__["a"].sum(counters);
              trailingWhitespaceEnd = nextStart - lastStart - patternSize;
              if (trailingWhitespaceEnd * 3 >= patternSize) {
                return true;
              }
              return false;
            };
            Code39Reader.prototype._patternToChar = function(pattern) {
              var i, self2 = this;
              for (i = 0; i < self2.CHARACTER_ENCODINGS.length; i++) {
                if (self2.CHARACTER_ENCODINGS[i] === pattern) {
                  return String.fromCharCode(self2.ALPHABET[i]);
                }
              }
              return -1;
            };
            Code39Reader.prototype._findNextWidth = function(counters, current) {
              var i, minWidth = Number.MAX_VALUE;
              for (i = 0; i < counters.length; i++) {
                if (counters[i] < minWidth && counters[i] > current) {
                  minWidth = counters[i];
                }
              }
              return minWidth;
            };
            Code39Reader.prototype._toPattern = function(counters) {
              var numCounters = counters.length, maxNarrowWidth = 0, numWideBars = numCounters, wideBarWidth = 0, self2 = this, pattern, i;
              while (numWideBars > 3) {
                maxNarrowWidth = self2._findNextWidth(counters, maxNarrowWidth);
                numWideBars = 0;
                pattern = 0;
                for (i = 0; i < numCounters; i++) {
                  if (counters[i] > maxNarrowWidth) {
                    pattern |= 1 << numCounters - 1 - i;
                    numWideBars++;
                    wideBarWidth += counters[i];
                  }
                }
                if (numWideBars === 3) {
                  for (i = 0; i < numCounters && numWideBars > 0; i++) {
                    if (counters[i] > maxNarrowWidth) {
                      numWideBars--;
                      if (counters[i] * 2 >= wideBarWidth) {
                        return -1;
                      }
                    }
                  }
                  return pattern;
                }
              }
              return -1;
            };
            Code39Reader.prototype._findStart = function() {
              var self2 = this, offset = self2._nextSet(self2._row), patternStart = offset, counter = [0, 0, 0, 0, 0, 0, 0, 0, 0], counterPos = 0, isWhite = false, i, j, whiteSpaceMustStart;
              for (i = offset; i < self2._row.length; i++) {
                if (self2._row[i] ^ isWhite) {
                  counter[counterPos]++;
                } else {
                  if (counterPos === counter.length - 1) {
                    if (self2._toPattern(counter) === self2.ASTERISK) {
                      whiteSpaceMustStart = Math.floor(Math.max(0, patternStart - (i - patternStart) / 4));
                      if (self2._matchRange(whiteSpaceMustStart, patternStart, 0)) {
                        return {
                          start: patternStart,
                          end: i
                        };
                      }
                    }
                    patternStart += counter[0] + counter[1];
                    for (j = 0; j < 7; j++) {
                      counter[j] = counter[j + 2];
                    }
                    counter[7] = 0;
                    counter[8] = 0;
                    counterPos--;
                  } else {
                    counterPos++;
                  }
                  counter[counterPos] = 1;
                  isWhite = !isWhite;
                }
              }
              return null;
            };
            __webpack_exports__["a"] = Code39Reader;
          },
          function(module2, exports2) {
            module2.exports = dot;
            function dot(a, b) {
              return a[0] * b[0] + a[1] * b[1];
            }
          },
          function(module2, exports2, __webpack_require__) {
            var getNative = __webpack_require__(22), root = __webpack_require__(5);
            var Map = getNative(root, "Map");
            module2.exports = Map;
          },
          function(module2, exports2, __webpack_require__) {
            var mapCacheClear = __webpack_require__(138), mapCacheDelete = __webpack_require__(139), mapCacheGet = __webpack_require__(140), mapCacheHas = __webpack_require__(141), mapCacheSet = __webpack_require__(142);
            function MapCache(entries) {
              var index = -1, length = entries == null ? 0 : entries.length;
              this.clear();
              while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
              }
            }
            MapCache.prototype.clear = mapCacheClear;
            MapCache.prototype["delete"] = mapCacheDelete;
            MapCache.prototype.get = mapCacheGet;
            MapCache.prototype.has = mapCacheHas;
            MapCache.prototype.set = mapCacheSet;
            module2.exports = MapCache;
          },
          function(module2, exports2, __webpack_require__) {
            var baseAssignValue = __webpack_require__(21), eq = __webpack_require__(17);
            function assignMergeValue(object, key, value) {
              if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
                baseAssignValue(object, key, value);
              }
            }
            module2.exports = assignMergeValue;
          },
          function(module2, exports2, __webpack_require__) {
            var baseAssignValue = __webpack_require__(21), eq = __webpack_require__(17);
            var objectProto = Object.prototype;
            var hasOwnProperty = objectProto.hasOwnProperty;
            function assignValue(object, key, value) {
              var objValue = object[key];
              if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
                baseAssignValue(object, key, value);
              }
            }
            module2.exports = assignValue;
          },
          function(module2, exports2, __webpack_require__) {
            var getNative = __webpack_require__(22);
            var defineProperty = function() {
              try {
                var func = getNative(Object, "defineProperty");
                func({}, "", {});
                return func;
              } catch (e) {
              }
            }();
            module2.exports = defineProperty;
          },
          function(module2, exports2, __webpack_require__) {
            (function(global) {
              var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
              module2.exports = freeGlobal;
            }).call(exports2, __webpack_require__(47));
          },
          function(module2, exports2, __webpack_require__) {
            var overArg = __webpack_require__(147);
            var getPrototype = overArg(Object.getPrototypeOf, Object);
            module2.exports = getPrototype;
          },
          function(module2, exports2) {
            var objectProto = Object.prototype;
            function isPrototype(value) {
              var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
              return value === proto;
            }
            module2.exports = isPrototype;
          },
          function(module2, exports2, __webpack_require__) {
            var apply = __webpack_require__(87);
            var nativeMax = Math.max;
            function overRest(func, start, transform) {
              start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
              return function() {
                var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
                while (++index < length) {
                  array[index] = args[start + index];
                }
                index = -1;
                var otherArgs = Array(start + 1);
                while (++index < start) {
                  otherArgs[index] = args[index];
                }
                otherArgs[start] = transform(array);
                return apply(func, this, otherArgs);
              };
            }
            module2.exports = overRest;
          },
          function(module2, exports2, __webpack_require__) {
            var baseSetToString = __webpack_require__(106), shortOut = __webpack_require__(148);
            var setToString = shortOut(baseSetToString);
            module2.exports = setToString;
          },
          function(module2, exports2) {
            function identity(value) {
              return value;
            }
            module2.exports = identity;
          },
          function(module2, exports2, __webpack_require__) {
            (function(module3) {
              var root = __webpack_require__(5), stubFalse = __webpack_require__(163);
              var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
              var freeModule = freeExports && typeof module3 == "object" && module3 && !module3.nodeType && module3;
              var moduleExports = freeModule && freeModule.exports === freeExports;
              var Buffer2 = moduleExports ? root.Buffer : void 0;
              var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
              var isBuffer = nativeIsBuffer || stubFalse;
              module3.exports = isBuffer;
            }).call(exports2, __webpack_require__(29)(module2));
          },
          function(module2, exports2, __webpack_require__) {
            var baseIsTypedArray = __webpack_require__(98), baseUnary = __webpack_require__(109), nodeUtil = __webpack_require__(145);
            var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
            var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
            module2.exports = isTypedArray;
          },
          function(module2, exports2, __webpack_require__) {
            var arrayLikeKeys = __webpack_require__(88), baseKeysIn = __webpack_require__(99), isArrayLike = __webpack_require__(24);
            function keysIn(object) {
              return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
            }
            module2.exports = keysIn;
          },
          function(module2, exports2) {
            var g;
            g = function() {
              return this;
            }();
            try {
              g = g || Function("return this")() || (1, eval)("this");
            } catch (e) {
              if (typeof window === "object")
                g = window;
            }
            module2.exports = g;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
            var __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ = __webpack_require__(28);
            var __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_merge__);
            var __WEBPACK_IMPORTED_MODULE_1__common_typedefs__ = __webpack_require__(54);
            var __WEBPACK_IMPORTED_MODULE_1__common_typedefs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__common_typedefs__);
            var __WEBPACK_IMPORTED_MODULE_2__common_image_wrapper__ = __webpack_require__(20);
            var __WEBPACK_IMPORTED_MODULE_3__locator_barcode_locator__ = __webpack_require__(64);
            var __WEBPACK_IMPORTED_MODULE_4__decoder_barcode_decoder__ = __webpack_require__(57);
            var __WEBPACK_IMPORTED_MODULE_5__common_events__ = __webpack_require__(51);
            var __WEBPACK_IMPORTED_MODULE_6__input_camera_access__ = __webpack_require__(59);
            var __WEBPACK_IMPORTED_MODULE_7__common_image_debug__ = __webpack_require__(9);
            var __WEBPACK_IMPORTED_MODULE_8__analytics_result_collector__ = __webpack_require__(49);
            var __WEBPACK_IMPORTED_MODULE_9__config_config__ = __webpack_require__(56);
            var __WEBPACK_IMPORTED_MODULE_10_input_stream__ = __webpack_require__(63);
            var __WEBPACK_IMPORTED_MODULE_11_frame_grabber__ = __webpack_require__(61);
            var _extends = Object.assign || function(target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }
              return target;
            };
            var vec2 = {
              clone: __webpack_require__(7)
            };
            var _inputStream, _framegrabber, _stopped, _canvasContainer = {
              ctx: {
                image: null,
                overlay: null
              },
              dom: {
                image: null,
                overlay: null
              }
            }, _inputImageWrapper, _boxSize, _decoder, _workerPool = [], _onUIThread = true, _resultCollector, _config = {};
            function initializeData(imageWrapper) {
              initBuffers(imageWrapper);
              _decoder = __WEBPACK_IMPORTED_MODULE_4__decoder_barcode_decoder__["a"].create(_config.decoder, _inputImageWrapper);
            }
            function initInputStream(cb) {
              var video;
              if (_config.inputStream.type === "VideoStream") {
                video = document.createElement("video");
                _inputStream = __WEBPACK_IMPORTED_MODULE_10_input_stream__["a"].createVideoStream(video);
              } else if (_config.inputStream.type === "ImageStream") {
                _inputStream = __WEBPACK_IMPORTED_MODULE_10_input_stream__["a"].createImageStream();
              } else if (_config.inputStream.type === "LiveStream") {
                var $viewport = getViewPort();
                if ($viewport) {
                  video = $viewport.querySelector("video");
                  if (!video) {
                    video = document.createElement("video");
                    $viewport.appendChild(video);
                  }
                }
                _inputStream = __WEBPACK_IMPORTED_MODULE_10_input_stream__["a"].createLiveStream(video);
                __WEBPACK_IMPORTED_MODULE_6__input_camera_access__["a"].request(video, _config.inputStream.constraints).then(function() {
                  _inputStream.trigger("canrecord");
                }).catch(function(err) {
                  return cb(err);
                });
              }
              _inputStream.setAttribute("preload", "auto");
              _inputStream.setInputStream(_config.inputStream);
              _inputStream.addEventListener("canrecord", canRecord.bind(void 0, cb));
            }
            function getViewPort() {
              var target = _config.inputStream.target;
              if (target && target.nodeName && target.nodeType === 1) {
                return target;
              } else {
                var selector = typeof target === "string" ? target : "#interactive.viewport";
                return document.querySelector(selector);
              }
            }
            function canRecord(cb) {
              __WEBPACK_IMPORTED_MODULE_3__locator_barcode_locator__["a"].checkImageConstraints(_inputStream, _config.locator);
              initCanvas(_config);
              _framegrabber = __WEBPACK_IMPORTED_MODULE_11_frame_grabber__["a"].create(_inputStream, _canvasContainer.dom.image);
              adjustWorkerPool(_config.numOfWorkers, function() {
                if (_config.numOfWorkers === 0) {
                  initializeData();
                }
                ready(cb);
              });
            }
            function ready(cb) {
              _inputStream.play();
              cb();
            }
            function initCanvas() {
              if (typeof document !== "undefined") {
                var $viewport = getViewPort();
                _canvasContainer.dom.image = document.querySelector("canvas.imgBuffer");
                if (!_canvasContainer.dom.image) {
                  _canvasContainer.dom.image = document.createElement("canvas");
                  _canvasContainer.dom.image.className = "imgBuffer";
                  if ($viewport && _config.inputStream.type === "ImageStream") {
                    $viewport.appendChild(_canvasContainer.dom.image);
                  }
                }
                _canvasContainer.ctx.image = _canvasContainer.dom.image.getContext("2d");
                _canvasContainer.dom.image.width = _inputStream.getCanvasSize().x;
                _canvasContainer.dom.image.height = _inputStream.getCanvasSize().y;
                _canvasContainer.dom.overlay = document.querySelector("canvas.drawingBuffer");
                if (!_canvasContainer.dom.overlay) {
                  _canvasContainer.dom.overlay = document.createElement("canvas");
                  _canvasContainer.dom.overlay.className = "drawingBuffer";
                  if ($viewport) {
                    $viewport.appendChild(_canvasContainer.dom.overlay);
                  }
                  var clearFix = document.createElement("br");
                  clearFix.setAttribute("clear", "all");
                  if ($viewport) {
                    $viewport.appendChild(clearFix);
                  }
                }
                _canvasContainer.ctx.overlay = _canvasContainer.dom.overlay.getContext("2d");
                _canvasContainer.dom.overlay.width = _inputStream.getCanvasSize().x;
                _canvasContainer.dom.overlay.height = _inputStream.getCanvasSize().y;
              }
            }
            function initBuffers(imageWrapper) {
              if (imageWrapper) {
                _inputImageWrapper = imageWrapper;
              } else {
                _inputImageWrapper = new __WEBPACK_IMPORTED_MODULE_2__common_image_wrapper__["a"]({
                  x: _inputStream.getWidth(),
                  y: _inputStream.getHeight()
                });
              }
              if (true) {
                console.log(_inputImageWrapper.size);
              }
              _boxSize = [vec2.clone([0, 0]), vec2.clone([0, _inputImageWrapper.size.y]), vec2.clone([_inputImageWrapper.size.x, _inputImageWrapper.size.y]), vec2.clone([_inputImageWrapper.size.x, 0])];
              __WEBPACK_IMPORTED_MODULE_3__locator_barcode_locator__["a"].init(_inputImageWrapper, _config.locator);
            }
            function getBoundingBoxes() {
              if (_config.locate) {
                return __WEBPACK_IMPORTED_MODULE_3__locator_barcode_locator__["a"].locate();
              } else {
                return [[vec2.clone(_boxSize[0]), vec2.clone(_boxSize[1]), vec2.clone(_boxSize[2]), vec2.clone(_boxSize[3])]];
              }
            }
            function transformResult(result) {
              var topRight = _inputStream.getTopRight(), xOffset = topRight.x, yOffset = topRight.y, i;
              if (xOffset === 0 && yOffset === 0) {
                return;
              }
              if (result.barcodes) {
                for (i = 0; i < result.barcodes.length; i++) {
                  transformResult(result.barcodes[i]);
                }
              }
              if (result.line && result.line.length === 2) {
                moveLine(result.line);
              }
              if (result.box) {
                moveBox(result.box);
              }
              if (result.boxes && result.boxes.length > 0) {
                for (i = 0; i < result.boxes.length; i++) {
                  moveBox(result.boxes[i]);
                }
              }
              function moveBox(box) {
                var corner = box.length;
                while (corner--) {
                  box[corner][0] += xOffset;
                  box[corner][1] += yOffset;
                }
              }
              function moveLine(line) {
                line[0].x += xOffset;
                line[0].y += yOffset;
                line[1].x += xOffset;
                line[1].y += yOffset;
              }
            }
            function addResult(result, imageData) {
              if (!imageData || !_resultCollector) {
                return;
              }
              if (result.barcodes) {
                result.barcodes.filter(function(barcode) {
                  return barcode.codeResult;
                }).forEach(function(barcode) {
                  return addResult(barcode, imageData);
                });
              } else if (result.codeResult) {
                _resultCollector.addResult(imageData, _inputStream.getCanvasSize(), result.codeResult);
              }
            }
            function hasCodeResult(result) {
              return result && (result.barcodes ? result.barcodes.some(function(barcode) {
                return barcode.codeResult;
              }) : result.codeResult);
            }
            function publishResult(result, imageData) {
              var resultToPublish = result;
              if (result && _onUIThread) {
                transformResult(result);
                addResult(result, imageData);
                resultToPublish = result.barcodes || result;
              }
              __WEBPACK_IMPORTED_MODULE_5__common_events__["a"].publish("processed", resultToPublish);
              if (hasCodeResult(result)) {
                __WEBPACK_IMPORTED_MODULE_5__common_events__["a"].publish("detected", resultToPublish);
              }
            }
            function locateAndDecode() {
              var result, boxes;
              boxes = getBoundingBoxes();
              if (boxes) {
                result = _decoder.decodeFromBoundingBoxes(boxes);
                result = result || {};
                result.boxes = boxes;
                publishResult(result, _inputImageWrapper.data);
              } else {
                publishResult();
              }
            }
            function update() {
              var availableWorker;
              if (_onUIThread) {
                if (_workerPool.length > 0) {
                  availableWorker = _workerPool.filter(function(workerThread) {
                    return !workerThread.busy;
                  })[0];
                  if (availableWorker) {
                    _framegrabber.attachData(availableWorker.imageData);
                  } else {
                    return;
                  }
                } else {
                  _framegrabber.attachData(_inputImageWrapper.data);
                }
                if (_framegrabber.grab()) {
                  if (availableWorker) {
                    availableWorker.busy = true;
                    availableWorker.worker.postMessage({
                      cmd: "process",
                      imageData: availableWorker.imageData
                    }, [availableWorker.imageData.buffer]);
                  } else {
                    locateAndDecode();
                  }
                }
              } else {
                locateAndDecode();
              }
            }
            function startContinuousUpdate() {
              var next = null, delay = 1e3 / (_config.frequency || 60);
              _stopped = false;
              (function frame(timestamp) {
                next = next || timestamp;
                if (!_stopped) {
                  if (timestamp >= next) {
                    next += delay;
                    update();
                  }
                  window.requestAnimFrame(frame);
                }
              })(performance.now());
            }
            function _start() {
              if (_onUIThread && _config.inputStream.type === "LiveStream") {
                startContinuousUpdate();
              } else {
                update();
              }
            }
            function initWorker(cb) {
              var blobURL, workerThread = {
                worker: void 0,
                imageData: new Uint8Array(_inputStream.getWidth() * _inputStream.getHeight()),
                busy: true
              };
              blobURL = generateWorkerBlob();
              workerThread.worker = new Worker(blobURL);
              workerThread.worker.onmessage = function(e) {
                if (e.data.event === "initialized") {
                  URL.revokeObjectURL(blobURL);
                  workerThread.busy = false;
                  workerThread.imageData = new Uint8Array(e.data.imageData);
                  if (true) {
                    console.log("Worker initialized");
                  }
                  return cb(workerThread);
                } else if (e.data.event === "processed") {
                  workerThread.imageData = new Uint8Array(e.data.imageData);
                  workerThread.busy = false;
                  publishResult(e.data.result, workerThread.imageData);
                } else if (e.data.event === "error") {
                  if (true) {
                    console.log("Worker error: " + e.data.message);
                  }
                }
              };
              workerThread.worker.postMessage({
                cmd: "init",
                size: { x: _inputStream.getWidth(), y: _inputStream.getHeight() },
                imageData: workerThread.imageData,
                config: configForWorker(_config)
              }, [workerThread.imageData.buffer]);
            }
            function configForWorker(config) {
              return _extends({}, config, {
                inputStream: _extends({}, config.inputStream, {
                  target: null
                })
              });
            }
            function workerInterface(factory) {
              if (factory) {
                var Quagga2 = factory().default;
                if (!Quagga2) {
                  self.postMessage({ "event": "error", message: "Quagga could not be created" });
                  return;
                }
              }
              var imageWrapper;
              self.onmessage = function(e) {
                if (e.data.cmd === "init") {
                  var config = e.data.config;
                  config.numOfWorkers = 0;
                  imageWrapper = new Quagga2.ImageWrapper({
                    x: e.data.size.x,
                    y: e.data.size.y
                  }, new Uint8Array(e.data.imageData));
                  Quagga2.init(config, ready2, imageWrapper);
                  Quagga2.onProcessed(onProcessed);
                } else if (e.data.cmd === "process") {
                  imageWrapper.data = new Uint8Array(e.data.imageData);
                  Quagga2.start();
                } else if (e.data.cmd === "setReaders") {
                  Quagga2.setReaders(e.data.readers);
                }
              };
              function onProcessed(result) {
                self.postMessage({
                  "event": "processed",
                  imageData: imageWrapper.data,
                  result
                }, [imageWrapper.data.buffer]);
              }
              function ready2() {
                self.postMessage({ "event": "initialized", imageData: imageWrapper.data }, [imageWrapper.data.buffer]);
              }
            }
            function generateWorkerBlob() {
              var blob, factorySource;
              if (typeof __factorySource__ !== "undefined") {
                factorySource = __factorySource__;
              }
              blob = new Blob(["(" + workerInterface.toString() + ")(" + factorySource + ");"], { type: "text/javascript" });
              return window.URL.createObjectURL(blob);
            }
            function _setReaders(readers) {
              if (_decoder) {
                _decoder.setReaders(readers);
              } else if (_onUIThread && _workerPool.length > 0) {
                _workerPool.forEach(function(workerThread) {
                  workerThread.worker.postMessage({ cmd: "setReaders", readers });
                });
              }
            }
            function adjustWorkerPool(capacity, cb) {
              var increaseBy = capacity - _workerPool.length;
              if (increaseBy === 0) {
                return cb && cb();
              }
              if (increaseBy < 0) {
                var workersToTerminate = _workerPool.slice(increaseBy);
                workersToTerminate.forEach(function(workerThread) {
                  workerThread.worker.terminate();
                  if (true) {
                    console.log("Worker terminated!");
                  }
                });
                _workerPool = _workerPool.slice(0, increaseBy);
                return cb && cb();
              } else {
                var workerInitialized = function workerInitialized2(workerThread) {
                  _workerPool.push(workerThread);
                  if (_workerPool.length >= capacity) {
                    cb && cb();
                  }
                };
                for (var i = 0; i < increaseBy; i++) {
                  initWorker(workerInitialized);
                }
              }
            }
            __webpack_exports__["default"] = {
              init: function init(config, cb, imageWrapper) {
                _config = __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default()({}, __WEBPACK_IMPORTED_MODULE_9__config_config__["a"], config);
                if (imageWrapper) {
                  _onUIThread = false;
                  initializeData(imageWrapper);
                  return cb();
                } else {
                  initInputStream(cb);
                }
              },
              start: function start() {
                _start();
              },
              stop: function stop() {
                _stopped = true;
                adjustWorkerPool(0);
                if (_config.inputStream.type === "LiveStream") {
                  __WEBPACK_IMPORTED_MODULE_6__input_camera_access__["a"].release();
                  _inputStream.clearEventHandlers();
                }
              },
              pause: function pause() {
                _stopped = true;
              },
              onDetected: function onDetected(callback) {
                __WEBPACK_IMPORTED_MODULE_5__common_events__["a"].subscribe("detected", callback);
              },
              offDetected: function offDetected(callback) {
                __WEBPACK_IMPORTED_MODULE_5__common_events__["a"].unsubscribe("detected", callback);
              },
              onProcessed: function onProcessed(callback) {
                __WEBPACK_IMPORTED_MODULE_5__common_events__["a"].subscribe("processed", callback);
              },
              offProcessed: function offProcessed(callback) {
                __WEBPACK_IMPORTED_MODULE_5__common_events__["a"].unsubscribe("processed", callback);
              },
              setReaders: function setReaders(readers) {
                _setReaders(readers);
              },
              registerResultCollector: function registerResultCollector(resultCollector) {
                if (resultCollector && typeof resultCollector.addResult === "function") {
                  _resultCollector = resultCollector;
                }
              },
              canvas: _canvasContainer,
              decodeSingle: function decodeSingle(config, resultCallback) {
                var _this = this;
                config = __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default()({
                  inputStream: {
                    type: "ImageStream",
                    sequence: false,
                    size: 800,
                    src: config.src
                  },
                  numOfWorkers: config.debug ? 0 : 1,
                  locator: {
                    halfSample: false
                  }
                }, config);
                this.init(config, function() {
                  __WEBPACK_IMPORTED_MODULE_5__common_events__["a"].once("processed", function(result) {
                    _this.stop();
                    resultCallback.call(null, result);
                  }, true);
                  _start();
                });
              },
              ImageWrapper: __WEBPACK_IMPORTED_MODULE_2__common_image_wrapper__["a"],
              ImageDebug: __WEBPACK_IMPORTED_MODULE_7__common_image_debug__["a"],
              ResultCollector: __WEBPACK_IMPORTED_MODULE_8__analytics_result_collector__["a"],
              CameraAccess: __WEBPACK_IMPORTED_MODULE_6__input_camera_access__["a"]
            };
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__common_image_debug__ = __webpack_require__(9);
            function contains(codeResult, list) {
              if (list) {
                return list.some(function(item) {
                  return Object.keys(item).every(function(key) {
                    return item[key] === codeResult[key];
                  });
                });
              }
              return false;
            }
            function passesFilter(codeResult, filter) {
              if (typeof filter === "function") {
                return filter(codeResult);
              }
              return true;
            }
            __webpack_exports__["a"] = {
              create: function create(config) {
                var canvas = document.createElement("canvas"), ctx = canvas.getContext("2d"), results = [], capacity = config.capacity || 20, capture = config.capture === true;
                function matchesConstraints(codeResult) {
                  return capacity && codeResult && !contains(codeResult, config.blacklist) && passesFilter(codeResult, config.filter);
                }
                return {
                  addResult: function addResult(data, imageSize, codeResult) {
                    var result = {};
                    if (matchesConstraints(codeResult)) {
                      capacity--;
                      result.codeResult = codeResult;
                      if (capture) {
                        canvas.width = imageSize.x;
                        canvas.height = imageSize.y;
                        __WEBPACK_IMPORTED_MODULE_0__common_image_debug__["a"].drawImage(data, imageSize, ctx);
                        result.frame = canvas.toDataURL();
                      }
                      results.push(result);
                    }
                  },
                  getResults: function getResults() {
                    return results;
                  }
                };
              }
            };
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var vec2 = {
              clone: __webpack_require__(7),
              dot: __webpack_require__(32)
            };
            __webpack_exports__["a"] = {
              create: function create(point, threshold) {
                var points = [], center = {
                  rad: 0,
                  vec: vec2.clone([0, 0])
                }, pointMap = {};
                function init() {
                  _add(point);
                  updateCenter();
                }
                function _add(pointToAdd) {
                  pointMap[pointToAdd.id] = pointToAdd;
                  points.push(pointToAdd);
                }
                function updateCenter() {
                  var i, sum = 0;
                  for (i = 0; i < points.length; i++) {
                    sum += points[i].rad;
                  }
                  center.rad = sum / points.length;
                  center.vec = vec2.clone([Math.cos(center.rad), Math.sin(center.rad)]);
                }
                init();
                return {
                  add: function add(pointToAdd) {
                    if (!pointMap[pointToAdd.id]) {
                      _add(pointToAdd);
                      updateCenter();
                    }
                  },
                  fits: function fits(otherPoint) {
                    var similarity = Math.abs(vec2.dot(otherPoint.point.vec, center.vec));
                    if (similarity > threshold) {
                      return true;
                    }
                    return false;
                  },
                  getPoints: function getPoints() {
                    return points;
                  },
                  getCenter: function getCenter() {
                    return center;
                  }
                };
              },
              createPoint: function createPoint(newPoint, id, property) {
                return {
                  rad: newPoint[property],
                  point: newPoint,
                  id
                };
              }
            };
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__["a"] = function() {
              var events = {};
              function getEvent(eventName) {
                if (!events[eventName]) {
                  events[eventName] = {
                    subscribers: []
                  };
                }
                return events[eventName];
              }
              function clearEvents() {
                events = {};
              }
              function publishSubscription(subscription, data) {
                if (subscription.async) {
                  setTimeout(function() {
                    subscription.callback(data);
                  }, 4);
                } else {
                  subscription.callback(data);
                }
              }
              function _subscribe(event, callback, async) {
                var subscription;
                if (typeof callback === "function") {
                  subscription = {
                    callback,
                    async
                  };
                } else {
                  subscription = callback;
                  if (!subscription.callback) {
                    throw "Callback was not specified on options";
                  }
                }
                getEvent(event).subscribers.push(subscription);
              }
              return {
                subscribe: function subscribe(event, callback, async) {
                  return _subscribe(event, callback, async);
                },
                publish: function publish(eventName, data) {
                  var event = getEvent(eventName), subscribers = event.subscribers;
                  subscribers.filter(function(subscriber) {
                    return !!subscriber.once;
                  }).forEach(function(subscriber) {
                    publishSubscription(subscriber, data);
                  });
                  event.subscribers = subscribers.filter(function(subscriber) {
                    return !subscriber.once;
                  });
                  event.subscribers.forEach(function(subscriber) {
                    publishSubscription(subscriber, data);
                  });
                },
                once: function once(event, callback, async) {
                  _subscribe(event, {
                    callback,
                    async,
                    once: true
                  });
                },
                unsubscribe: function unsubscribe(eventName, callback) {
                  var event;
                  if (eventName) {
                    event = getEvent(eventName);
                    if (event && callback) {
                      event.subscribers = event.subscribers.filter(function(subscriber) {
                        return subscriber.callback !== callback;
                      });
                    } else {
                      event.subscribers = [];
                    }
                  } else {
                    clearEvents();
                  }
                }
              };
            }();
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__["b"] = enumerateDevices;
            __webpack_exports__["a"] = getUserMedia;
            function enumerateDevices() {
              if (navigator.mediaDevices && typeof navigator.mediaDevices.enumerateDevices === "function") {
                return navigator.mediaDevices.enumerateDevices();
              }
              return Promise.reject(new Error("enumerateDevices is not defined"));
            }
            ;
            function getUserMedia(constraints) {
              if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function") {
                return navigator.mediaDevices.getUserMedia(constraints);
              }
              return Promise.reject(new Error("getUserMedia is not defined"));
            }
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            function SubImage(from, size, I) {
              if (!I) {
                I = {
                  data: null,
                  size
                };
              }
              this.data = I.data;
              this.originalSize = I.size;
              this.I = I;
              this.from = from;
              this.size = size;
            }
            SubImage.prototype.show = function(canvas, scale) {
              var ctx, frame, data, current, y, x, pixel;
              if (!scale) {
                scale = 1;
              }
              ctx = canvas.getContext("2d");
              canvas.width = this.size.x;
              canvas.height = this.size.y;
              frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
              data = frame.data;
              current = 0;
              for (y = 0; y < this.size.y; y++) {
                for (x = 0; x < this.size.x; x++) {
                  pixel = y * this.size.x + x;
                  current = this.get(x, y) * scale;
                  data[pixel * 4 + 0] = current;
                  data[pixel * 4 + 1] = current;
                  data[pixel * 4 + 2] = current;
                  data[pixel * 4 + 3] = 255;
                }
              }
              frame.data = data;
              ctx.putImageData(frame, 0, 0);
            };
            SubImage.prototype.get = function(x, y) {
              return this.data[(this.from.y + y) * this.originalSize.x + this.from.x + x];
            };
            SubImage.prototype.updateData = function(image) {
              this.originalSize = image.size;
              this.data = image.data;
            };
            SubImage.prototype.updateFrom = function(from) {
              this.from = from;
              return this;
            };
            __webpack_exports__["a"] = SubImage;
          },
          function(module2, exports2) {
            if (typeof window !== "undefined") {
              window.requestAnimFrame = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                  window.setTimeout(callback, 1e3 / 60);
                };
              }();
            }
            Math.imul = Math.imul || function(a, b) {
              var ah = a >>> 16 & 65535, al = a & 65535, bh = b >>> 16 & 65535, bl = b & 65535;
              return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
            };
            if (typeof Object.assign !== "function") {
              Object.assign = function(target) {
                "use strict";
                if (target === null) {
                  throw new TypeError("Cannot convert undefined or null to object");
                }
                var to = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                  var nextSource = arguments[index];
                  if (nextSource !== null) {
                    for (var nextKey in nextSource) {
                      if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                      }
                    }
                  }
                }
                return to;
              };
            }
          },
          function(module2, exports2) {
            module2.exports = {
              inputStream: {
                name: "Live",
                type: "LiveStream",
                constraints: {
                  width: 640,
                  height: 480,
                  facingMode: "environment"
                },
                area: {
                  top: "0%",
                  right: "0%",
                  left: "0%",
                  bottom: "0%"
                },
                singleChannel: false
              },
              locate: true,
              numOfWorkers: 0,
              decoder: {
                readers: ["code_128_reader"],
                debug: {
                  drawBoundingBox: false,
                  showFrequency: false,
                  drawScanline: false,
                  showPattern: false
                }
              },
              locator: {
                halfSample: true,
                patchSize: "medium",
                debug: {
                  showCanvas: false,
                  showPatches: false,
                  showFoundPatches: false,
                  showSkeleton: false,
                  showLabels: false,
                  showPatchLabels: false,
                  showRemainingPatchLabels: false,
                  boxFromPatches: {
                    showTransformed: false,
                    showTransformedBox: false,
                    showBB: false
                  }
                }
              }
            };
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var config = void 0;
            if (true) {
              config = __webpack_require__(55);
            } else if (ENV.node) {
              config = null;
            } else {
              config = null;
            }
            __webpack_exports__["a"] = config;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__bresenham__ = __webpack_require__(58);
            var __WEBPACK_IMPORTED_MODULE_1__common_image_debug__ = __webpack_require__(9);
            var __WEBPACK_IMPORTED_MODULE_2__reader_code_128_reader__ = __webpack_require__(69);
            var __WEBPACK_IMPORTED_MODULE_3__reader_ean_reader__ = __webpack_require__(4);
            var __WEBPACK_IMPORTED_MODULE_4__reader_code_39_reader__ = __webpack_require__(31);
            var __WEBPACK_IMPORTED_MODULE_5__reader_code_39_vin_reader__ = __webpack_require__(70);
            var __WEBPACK_IMPORTED_MODULE_6__reader_codabar_reader__ = __webpack_require__(68);
            var __WEBPACK_IMPORTED_MODULE_7__reader_upc_reader__ = __webpack_require__(77);
            var __WEBPACK_IMPORTED_MODULE_8__reader_ean_8_reader__ = __webpack_require__(74);
            var __WEBPACK_IMPORTED_MODULE_9__reader_ean_2_reader__ = __webpack_require__(72);
            var __WEBPACK_IMPORTED_MODULE_10__reader_ean_5_reader__ = __webpack_require__(73);
            var __WEBPACK_IMPORTED_MODULE_11__reader_upc_e_reader__ = __webpack_require__(76);
            var __WEBPACK_IMPORTED_MODULE_12__reader_i2of5_reader__ = __webpack_require__(75);
            var __WEBPACK_IMPORTED_MODULE_13__reader_2of5_reader__ = __webpack_require__(67);
            var __WEBPACK_IMPORTED_MODULE_14__reader_code_93_reader__ = __webpack_require__(71);
            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
              return typeof obj;
            } : function(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            var READERS = {
              code_128_reader: __WEBPACK_IMPORTED_MODULE_2__reader_code_128_reader__["a"],
              ean_reader: __WEBPACK_IMPORTED_MODULE_3__reader_ean_reader__["a"],
              ean_5_reader: __WEBPACK_IMPORTED_MODULE_10__reader_ean_5_reader__["a"],
              ean_2_reader: __WEBPACK_IMPORTED_MODULE_9__reader_ean_2_reader__["a"],
              ean_8_reader: __WEBPACK_IMPORTED_MODULE_8__reader_ean_8_reader__["a"],
              code_39_reader: __WEBPACK_IMPORTED_MODULE_4__reader_code_39_reader__["a"],
              code_39_vin_reader: __WEBPACK_IMPORTED_MODULE_5__reader_code_39_vin_reader__["a"],
              codabar_reader: __WEBPACK_IMPORTED_MODULE_6__reader_codabar_reader__["a"],
              upc_reader: __WEBPACK_IMPORTED_MODULE_7__reader_upc_reader__["a"],
              upc_e_reader: __WEBPACK_IMPORTED_MODULE_11__reader_upc_e_reader__["a"],
              i2of5_reader: __WEBPACK_IMPORTED_MODULE_12__reader_i2of5_reader__["a"],
              "2of5_reader": __WEBPACK_IMPORTED_MODULE_13__reader_2of5_reader__["a"],
              code_93_reader: __WEBPACK_IMPORTED_MODULE_14__reader_code_93_reader__["a"]
            };
            __webpack_exports__["a"] = {
              create: function create(config, inputImageWrapper) {
                var _canvas = {
                  ctx: {
                    frequency: null,
                    pattern: null,
                    overlay: null
                  },
                  dom: {
                    frequency: null,
                    pattern: null,
                    overlay: null
                  }
                }, _barcodeReaders = [];
                initCanvas();
                initReaders();
                initConfig();
                function initCanvas() {
                  if (typeof document !== "undefined") {
                    var $debug = document.querySelector("#debug.detection");
                    _canvas.dom.frequency = document.querySelector("canvas.frequency");
                    if (!_canvas.dom.frequency) {
                      _canvas.dom.frequency = document.createElement("canvas");
                      _canvas.dom.frequency.className = "frequency";
                      if ($debug) {
                        $debug.appendChild(_canvas.dom.frequency);
                      }
                    }
                    _canvas.ctx.frequency = _canvas.dom.frequency.getContext("2d");
                    _canvas.dom.pattern = document.querySelector("canvas.patternBuffer");
                    if (!_canvas.dom.pattern) {
                      _canvas.dom.pattern = document.createElement("canvas");
                      _canvas.dom.pattern.className = "patternBuffer";
                      if ($debug) {
                        $debug.appendChild(_canvas.dom.pattern);
                      }
                    }
                    _canvas.ctx.pattern = _canvas.dom.pattern.getContext("2d");
                    _canvas.dom.overlay = document.querySelector("canvas.drawingBuffer");
                    if (_canvas.dom.overlay) {
                      _canvas.ctx.overlay = _canvas.dom.overlay.getContext("2d");
                    }
                  }
                }
                function initReaders() {
                  config.readers.forEach(function(readerConfig) {
                    var reader, configuration = {}, supplements = [];
                    if ((typeof readerConfig === "undefined" ? "undefined" : _typeof(readerConfig)) === "object") {
                      reader = readerConfig.format;
                      configuration = readerConfig.config;
                    } else if (typeof readerConfig === "string") {
                      reader = readerConfig;
                    }
                    if (true) {
                      console.log("Before registering reader: ", reader);
                    }
                    if (configuration.supplements) {
                      supplements = configuration.supplements.map(function(supplement) {
                        return new READERS[supplement]();
                      });
                    }
                    _barcodeReaders.push(new READERS[reader](configuration, supplements));
                  });
                  if (true) {
                    console.log("Registered Readers: " + _barcodeReaders.map(function(reader) {
                      return JSON.stringify({ format: reader.FORMAT, config: reader.config });
                    }).join(", "));
                  }
                }
                function initConfig() {
                  if (typeof document !== "undefined") {
                    var i, vis = [{
                      node: _canvas.dom.frequency,
                      prop: config.debug.showFrequency
                    }, {
                      node: _canvas.dom.pattern,
                      prop: config.debug.showPattern
                    }];
                    for (i = 0; i < vis.length; i++) {
                      if (vis[i].prop === true) {
                        vis[i].node.style.display = "block";
                      } else {
                        vis[i].node.style.display = "none";
                      }
                    }
                  }
                }
                function getExtendedLine(line, angle, ext) {
                  function extendLine(amount) {
                    var extension = {
                      y: amount * Math.sin(angle),
                      x: amount * Math.cos(angle)
                    };
                    line[0].y -= extension.y;
                    line[0].x -= extension.x;
                    line[1].y += extension.y;
                    line[1].x += extension.x;
                  }
                  extendLine(ext);
                  while (ext > 1 && (!inputImageWrapper.inImageWithBorder(line[0], 0) || !inputImageWrapper.inImageWithBorder(line[1], 0))) {
                    ext -= Math.ceil(ext / 2);
                    extendLine(-ext);
                  }
                  return line;
                }
                function getLine(box) {
                  return [{
                    x: (box[1][0] - box[0][0]) / 2 + box[0][0],
                    y: (box[1][1] - box[0][1]) / 2 + box[0][1]
                  }, {
                    x: (box[3][0] - box[2][0]) / 2 + box[2][0],
                    y: (box[3][1] - box[2][1]) / 2 + box[2][1]
                  }];
                }
                function tryDecode(line) {
                  var result = null, i, barcodeLine = __WEBPACK_IMPORTED_MODULE_0__bresenham__["a"].getBarcodeLine(inputImageWrapper, line[0], line[1]);
                  if (config.debug.showFrequency) {
                    __WEBPACK_IMPORTED_MODULE_1__common_image_debug__["a"].drawPath(line, { x: "x", y: "y" }, _canvas.ctx.overlay, { color: "red", lineWidth: 3 });
                    __WEBPACK_IMPORTED_MODULE_0__bresenham__["a"].debug.printFrequency(barcodeLine.line, _canvas.dom.frequency);
                  }
                  __WEBPACK_IMPORTED_MODULE_0__bresenham__["a"].toBinaryLine(barcodeLine);
                  if (config.debug.showPattern) {
                    __WEBPACK_IMPORTED_MODULE_0__bresenham__["a"].debug.printPattern(barcodeLine.line, _canvas.dom.pattern);
                  }
                  for (i = 0; i < _barcodeReaders.length && result === null; i++) {
                    result = _barcodeReaders[i].decodePattern(barcodeLine.line);
                  }
                  if (result === null) {
                    return null;
                  }
                  return {
                    codeResult: result,
                    barcodeLine
                  };
                }
                function tryDecodeBruteForce(box, line, lineAngle) {
                  var sideLength = Math.sqrt(Math.pow(box[1][0] - box[0][0], 2) + Math.pow(box[1][1] - box[0][1], 2)), i, slices = 16, result = null, dir, extension, xdir = Math.sin(lineAngle), ydir = Math.cos(lineAngle);
                  for (i = 1; i < slices && result === null; i++) {
                    dir = sideLength / slices * i * (i % 2 === 0 ? -1 : 1);
                    extension = {
                      y: dir * xdir,
                      x: dir * ydir
                    };
                    line[0].y += extension.x;
                    line[0].x -= extension.y;
                    line[1].y += extension.x;
                    line[1].x -= extension.y;
                    result = tryDecode(line);
                  }
                  return result;
                }
                function getLineLength(line) {
                  return Math.sqrt(Math.pow(Math.abs(line[1].y - line[0].y), 2) + Math.pow(Math.abs(line[1].x - line[0].x), 2));
                }
                function _decodeFromBoundingBox(box) {
                  var line, lineAngle, ctx = _canvas.ctx.overlay, result, lineLength;
                  if (true) {
                    if (config.debug.drawBoundingBox && ctx) {
                      __WEBPACK_IMPORTED_MODULE_1__common_image_debug__["a"].drawPath(box, { x: 0, y: 1 }, ctx, { color: "blue", lineWidth: 2 });
                    }
                  }
                  line = getLine(box);
                  lineLength = getLineLength(line);
                  lineAngle = Math.atan2(line[1].y - line[0].y, line[1].x - line[0].x);
                  line = getExtendedLine(line, lineAngle, Math.floor(lineLength * 0.1));
                  if (line === null) {
                    return null;
                  }
                  result = tryDecode(line);
                  if (result === null) {
                    result = tryDecodeBruteForce(box, line, lineAngle);
                  }
                  if (result === null) {
                    return null;
                  }
                  if (result && config.debug.drawScanline && ctx) {
                    __WEBPACK_IMPORTED_MODULE_1__common_image_debug__["a"].drawPath(line, { x: "x", y: "y" }, ctx, { color: "red", lineWidth: 3 });
                  }
                  return {
                    codeResult: result.codeResult,
                    line,
                    angle: lineAngle,
                    pattern: result.barcodeLine.line,
                    threshold: result.barcodeLine.threshold
                  };
                }
                return {
                  decodeFromBoundingBox: function decodeFromBoundingBox(box) {
                    return _decodeFromBoundingBox(box);
                  },
                  decodeFromBoundingBoxes: function decodeFromBoundingBoxes(boxes) {
                    var i, result, barcodes = [], multiple = config.multiple;
                    for (i = 0; i < boxes.length; i++) {
                      var box = boxes[i];
                      result = _decodeFromBoundingBox(box) || {};
                      result.box = box;
                      if (multiple) {
                        barcodes.push(result);
                      } else if (result.codeResult) {
                        return result;
                      }
                    }
                    if (multiple) {
                      return {
                        barcodes
                      };
                    }
                  },
                  setReaders: function setReaders(readers) {
                    config.readers = readers;
                    _barcodeReaders.length = 0;
                    initReaders();
                  }
                };
              }
            };
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__ = __webpack_require__(20);
            var Bresenham = {};
            var Slope = {
              DIR: {
                UP: 1,
                DOWN: -1
              }
            };
            Bresenham.getBarcodeLine = function(imageWrapper, p1, p2) {
              var x0 = p1.x | 0, y0 = p1.y | 0, x1 = p2.x | 0, y1 = p2.y | 0, steep = Math.abs(y1 - y0) > Math.abs(x1 - x0), deltax, deltay, error, ystep, y, tmp, x, line = [], imageData = imageWrapper.data, width = imageWrapper.size.x, sum = 0, val, min = 255, max = 0;
              function read(a, b) {
                val = imageData[b * width + a];
                sum += val;
                min = val < min ? val : min;
                max = val > max ? val : max;
                line.push(val);
              }
              if (steep) {
                tmp = x0;
                x0 = y0;
                y0 = tmp;
                tmp = x1;
                x1 = y1;
                y1 = tmp;
              }
              if (x0 > x1) {
                tmp = x0;
                x0 = x1;
                x1 = tmp;
                tmp = y0;
                y0 = y1;
                y1 = tmp;
              }
              deltax = x1 - x0;
              deltay = Math.abs(y1 - y0);
              error = deltax / 2 | 0;
              y = y0;
              ystep = y0 < y1 ? 1 : -1;
              for (x = x0; x < x1; x++) {
                if (steep) {
                  read(y, x);
                } else {
                  read(x, y);
                }
                error = error - deltay;
                if (error < 0) {
                  y = y + ystep;
                  error = error + deltax;
                }
              }
              return {
                line,
                min,
                max
              };
            };
            Bresenham.toBinaryLine = function(result) {
              var min = result.min, max = result.max, line = result.line, slope, slope2, center = min + (max - min) / 2, extrema = [], currentDir, dir, threshold = (max - min) / 12, rThreshold = -threshold, i, j;
              currentDir = line[0] > center ? Slope.DIR.UP : Slope.DIR.DOWN;
              extrema.push({
                pos: 0,
                val: line[0]
              });
              for (i = 0; i < line.length - 2; i++) {
                slope = line[i + 1] - line[i];
                slope2 = line[i + 2] - line[i + 1];
                if (slope + slope2 < rThreshold && line[i + 1] < center * 1.5) {
                  dir = Slope.DIR.DOWN;
                } else if (slope + slope2 > threshold && line[i + 1] > center * 0.5) {
                  dir = Slope.DIR.UP;
                } else {
                  dir = currentDir;
                }
                if (currentDir !== dir) {
                  extrema.push({
                    pos: i,
                    val: line[i]
                  });
                  currentDir = dir;
                }
              }
              extrema.push({
                pos: line.length,
                val: line[line.length - 1]
              });
              for (j = extrema[0].pos; j < extrema[1].pos; j++) {
                line[j] = line[j] > center ? 0 : 1;
              }
              for (i = 1; i < extrema.length - 1; i++) {
                if (extrema[i + 1].val > extrema[i].val) {
                  threshold = extrema[i].val + (extrema[i + 1].val - extrema[i].val) / 3 * 2 | 0;
                } else {
                  threshold = extrema[i + 1].val + (extrema[i].val - extrema[i + 1].val) / 3 | 0;
                }
                for (j = extrema[i].pos; j < extrema[i + 1].pos; j++) {
                  line[j] = line[j] > threshold ? 0 : 1;
                }
              }
              return {
                line,
                threshold
              };
            };
            Bresenham.debug = {
              printFrequency: function printFrequency(line, canvas) {
                var i, ctx = canvas.getContext("2d");
                canvas.width = line.length;
                canvas.height = 256;
                ctx.beginPath();
                ctx.strokeStyle = "blue";
                for (i = 0; i < line.length; i++) {
                  ctx.moveTo(i, 255);
                  ctx.lineTo(i, 255 - line[i]);
                }
                ctx.stroke();
                ctx.closePath();
              },
              printPattern: function printPattern(line, canvas) {
                var ctx = canvas.getContext("2d"), i;
                canvas.width = line.length;
                ctx.fillColor = "black";
                for (i = 0; i < line.length; i++) {
                  if (line[i] === 1) {
                    ctx.fillRect(i, 0, 1, 100);
                  }
                }
              }
            };
            __webpack_exports__["a"] = Bresenham;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0_lodash_pick__ = __webpack_require__(162);
            var __WEBPACK_IMPORTED_MODULE_0_lodash_pick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_pick__);
            var __WEBPACK_IMPORTED_MODULE_1_mediaDevices__ = __webpack_require__(52);
            var facingMatching = {
              "user": /front/i,
              "environment": /back/i
            };
            var streamRef;
            function waitForVideo(video) {
              return new Promise(function(resolve, reject) {
                var attempts = 10;
                function checkVideo() {
                  if (attempts > 0) {
                    if (video.videoWidth > 10 && video.videoHeight > 10) {
                      if (true) {
                        console.log(video.videoWidth + "px x " + video.videoHeight + "px");
                      }
                      resolve();
                    } else {
                      window.setTimeout(checkVideo, 500);
                    }
                  } else {
                    reject("Unable to play video stream. Is webcam working?");
                  }
                  attempts--;
                }
                checkVideo();
              });
            }
            function initCamera(video, constraints) {
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_mediaDevices__["a"])(constraints).then(function(stream) {
                return new Promise(function(resolve) {
                  streamRef = stream;
                  video.setAttribute("autoplay", true);
                  video.setAttribute("muted", true);
                  video.setAttribute("playsinline", true);
                  video.srcObject = stream;
                  video.addEventListener("loadedmetadata", function() {
                    video.play();
                    resolve();
                  });
                });
              }).then(waitForVideo.bind(null, video));
            }
            function deprecatedConstraints(videoConstraints) {
              var normalized = __WEBPACK_IMPORTED_MODULE_0_lodash_pick___default()(videoConstraints, ["width", "height", "facingMode", "aspectRatio", "deviceId"]);
              if (typeof videoConstraints.minAspectRatio !== "undefined" && videoConstraints.minAspectRatio > 0) {
                normalized.aspectRatio = videoConstraints.minAspectRatio;
                console.log("WARNING: Constraint 'minAspectRatio' is deprecated; Use 'aspectRatio' instead");
              }
              if (typeof videoConstraints.facing !== "undefined") {
                normalized.facingMode = videoConstraints.facing;
                console.log("WARNING: Constraint 'facing' is deprecated. Use 'facingMode' instead'");
              }
              return normalized;
            }
            function pickConstraints(videoConstraints) {
              var normalizedConstraints = {
                audio: false,
                video: deprecatedConstraints(videoConstraints)
              };
              if (normalizedConstraints.video.deviceId && normalizedConstraints.video.facingMode) {
                delete normalizedConstraints.video.facingMode;
              }
              return Promise.resolve(normalizedConstraints);
            }
            function enumerateVideoDevices() {
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_mediaDevices__["b"])().then(function(devices) {
                return devices.filter(function(device) {
                  return device.kind === "videoinput";
                });
              });
            }
            function getActiveTrack() {
              if (streamRef) {
                var tracks = streamRef.getVideoTracks();
                if (tracks && tracks.length) {
                  return tracks[0];
                }
              }
            }
            __webpack_exports__["a"] = {
              request: function request(video, videoConstraints) {
                return pickConstraints(videoConstraints).then(initCamera.bind(null, video));
              },
              release: function release() {
                var tracks = streamRef && streamRef.getVideoTracks();
                if (tracks && tracks.length) {
                  tracks[0].stop();
                }
                streamRef = null;
              },
              enumerateVideoDevices,
              getActiveStreamLabel: function getActiveStreamLabel() {
                var track = getActiveTrack();
                return track ? track.label : "";
              },
              getActiveTrack
            };
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__["a"] = findTagsInObjectURL;
            var ExifTags = { 274: "orientation" };
            var AvailableTags = Object.keys(ExifTags).map(function(key) {
              return ExifTags[key];
            });
            function findTagsInObjectURL(src) {
              var tags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : AvailableTags;
              if (/^blob\:/i.test(src)) {
                return objectURLToBlob(src).then(readToBuffer).then(function(buffer) {
                  return findTagsInBuffer(buffer, tags);
                });
              }
              return Promise.resolve(null);
            }
            function base64ToArrayBuffer(dataUrl) {
              var base64 = dataUrl.replace(/^data\:([^\;]+)\;base64,/gmi, ""), binary = atob(base64), len = binary.length, buffer = new ArrayBuffer(len), view = new Uint8Array(buffer);
              for (var i = 0; i < len; i++) {
                view[i] = binary.charCodeAt(i);
              }
              return buffer;
            }
            function readToBuffer(blob) {
              return new Promise(function(resolve) {
                var fileReader = new FileReader();
                fileReader.onload = function(e) {
                  return resolve(e.target.result);
                };
                fileReader.readAsArrayBuffer(blob);
              });
            }
            function objectURLToBlob(url) {
              return new Promise(function(resolve, reject) {
                var http = new XMLHttpRequest();
                http.open("GET", url, true);
                http.responseType = "blob";
                http.onreadystatechange = function() {
                  if (http.readyState === XMLHttpRequest.DONE && (http.status === 200 || http.status === 0)) {
                    resolve(this.response);
                  }
                };
                http.onerror = reject;
                http.send();
              });
            }
            function findTagsInBuffer(file) {
              var selectedTags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : AvailableTags;
              var dataView = new DataView(file), length = file.byteLength, exifTags = selectedTags.reduce(function(result, selectedTag) {
                var exifTag = Object.keys(ExifTags).filter(function(tag) {
                  return ExifTags[tag] === selectedTag;
                })[0];
                if (exifTag) {
                  result[exifTag] = selectedTag;
                }
                return result;
              }, {});
              var offset = 2, marker = void 0;
              if (dataView.getUint8(0) !== 255 || dataView.getUint8(1) !== 216) {
                return false;
              }
              while (offset < length) {
                if (dataView.getUint8(offset) !== 255) {
                  return false;
                }
                marker = dataView.getUint8(offset + 1);
                if (marker === 225) {
                  return readEXIFData(dataView, offset + 4, exifTags);
                } else {
                  offset += 2 + dataView.getUint16(offset + 2);
                }
              }
            }
            function readEXIFData(file, start, exifTags) {
              if (getStringFromBuffer(file, start, 4) !== "Exif") {
                return false;
              }
              var tiffOffset = start + 6;
              var bigEnd = void 0, tags = void 0;
              if (file.getUint16(tiffOffset) === 18761) {
                bigEnd = false;
              } else if (file.getUint16(tiffOffset) === 19789) {
                bigEnd = true;
              } else {
                return false;
              }
              if (file.getUint16(tiffOffset + 2, !bigEnd) !== 42) {
                return false;
              }
              var firstIFDOffset = file.getUint32(tiffOffset + 4, !bigEnd);
              if (firstIFDOffset < 8) {
                return false;
              }
              tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, exifTags, bigEnd);
              return tags;
            }
            function readTags(file, tiffStart, dirStart, strings, bigEnd) {
              var entries = file.getUint16(dirStart, !bigEnd), tags = {};
              for (var i = 0; i < entries; i++) {
                var entryOffset = dirStart + i * 12 + 2, tag = strings[file.getUint16(entryOffset, !bigEnd)];
                if (tag) {
                  tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
                }
              }
              return tags;
            }
            function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
              var type = file.getUint16(entryOffset + 2, !bigEnd), numValues = file.getUint32(entryOffset + 4, !bigEnd);
              switch (type) {
                case 3:
                  if (numValues === 1) {
                    return file.getUint16(entryOffset + 8, !bigEnd);
                  }
              }
            }
            function getStringFromBuffer(buffer, start, length) {
              var outstr = "";
              for (var n = start; n < start + length; n++) {
                outstr += String.fromCharCode(buffer.getUint8(n));
              }
              return outstr;
            }
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__common_cv_utils__ = __webpack_require__(19);
            var TO_RADIANS = Math.PI / 180;
            function adjustCanvasSize(canvas, targetSize) {
              if (canvas.width !== targetSize.x) {
                if (true) {
                  console.log("WARNING: canvas-size needs to be adjusted");
                }
                canvas.width = targetSize.x;
              }
              if (canvas.height !== targetSize.y) {
                if (true) {
                  console.log("WARNING: canvas-size needs to be adjusted");
                }
                canvas.height = targetSize.y;
              }
            }
            var FrameGrabber = {};
            FrameGrabber.create = function(inputStream, canvas) {
              var _that = {}, _streamConfig = inputStream.getConfig(), _video_size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_cv_utils__["b"])(inputStream.getRealWidth(), inputStream.getRealHeight()), _canvasSize = inputStream.getCanvasSize(), _size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_cv_utils__["b"])(inputStream.getWidth(), inputStream.getHeight()), topRight = inputStream.getTopRight(), _sx = topRight.x, _sy = topRight.y, _canvas, _ctx = null, _data = null;
              _canvas = canvas ? canvas : document.createElement("canvas");
              _canvas.width = _canvasSize.x;
              _canvas.height = _canvasSize.y;
              _ctx = _canvas.getContext("2d");
              _data = new Uint8Array(_size.x * _size.y);
              if (true) {
                console.log("FrameGrabber", JSON.stringify({
                  size: _size,
                  topRight,
                  videoSize: _video_size,
                  canvasSize: _canvasSize
                }));
              }
              _that.attachData = function(data) {
                _data = data;
              };
              _that.getData = function() {
                return _data;
              };
              _that.grab = function() {
                var doHalfSample = _streamConfig.halfSample, frame = inputStream.getFrame(), drawable = frame, drawAngle = 0, ctxData;
                if (drawable) {
                  adjustCanvasSize(_canvas, _canvasSize);
                  if (_streamConfig.type === "ImageStream") {
                    drawable = frame.img;
                    if (frame.tags && frame.tags.orientation) {
                      switch (frame.tags.orientation) {
                        case 6:
                          drawAngle = 90 * TO_RADIANS;
                          break;
                        case 8:
                          drawAngle = -90 * TO_RADIANS;
                          break;
                      }
                    }
                  }
                  if (drawAngle !== 0) {
                    _ctx.translate(_canvasSize.x / 2, _canvasSize.y / 2);
                    _ctx.rotate(drawAngle);
                    _ctx.drawImage(drawable, -_canvasSize.y / 2, -_canvasSize.x / 2, _canvasSize.y, _canvasSize.x);
                    _ctx.rotate(-drawAngle);
                    _ctx.translate(-_canvasSize.x / 2, -_canvasSize.y / 2);
                  } else {
                    _ctx.drawImage(drawable, 0, 0, _canvasSize.x, _canvasSize.y);
                  }
                  ctxData = _ctx.getImageData(_sx, _sy, _size.x, _size.y).data;
                  if (doHalfSample) {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_cv_utils__["c"])(ctxData, _size, _data);
                  } else {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_cv_utils__["d"])(ctxData, _data, _streamConfig);
                  }
                  return true;
                } else {
                  return false;
                }
              };
              _that.getSize = function() {
                return _size;
              };
              return _that;
            };
            __webpack_exports__["a"] = FrameGrabber;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__exif_helper__ = __webpack_require__(60);
            var ImageLoader = {};
            ImageLoader.load = function(directory, callback, offset, size, sequence) {
              var htmlImagesSrcArray = new Array(size), htmlImagesArray = new Array(htmlImagesSrcArray.length), i, img, num;
              if (sequence === false) {
                htmlImagesSrcArray[0] = directory;
              } else {
                for (i = 0; i < htmlImagesSrcArray.length; i++) {
                  num = offset + i;
                  htmlImagesSrcArray[i] = directory + "image-" + ("00" + num).slice(-3) + ".jpg";
                }
              }
              htmlImagesArray.notLoaded = [];
              htmlImagesArray.addImage = function(image) {
                htmlImagesArray.notLoaded.push(image);
              };
              htmlImagesArray.loaded = function(loadedImg) {
                var notloadedImgs = htmlImagesArray.notLoaded;
                for (var x = 0; x < notloadedImgs.length; x++) {
                  if (notloadedImgs[x] === loadedImg) {
                    notloadedImgs.splice(x, 1);
                    for (var y = 0; y < htmlImagesSrcArray.length; y++) {
                      var imgName = htmlImagesSrcArray[y].substr(htmlImagesSrcArray[y].lastIndexOf("/"));
                      if (loadedImg.src.lastIndexOf(imgName) !== -1) {
                        htmlImagesArray[y] = { img: loadedImg };
                        break;
                      }
                    }
                    break;
                  }
                }
                if (notloadedImgs.length === 0) {
                  if (true) {
                    console.log("Images loaded");
                  }
                  if (sequence === false) {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__exif_helper__["a"])(directory, ["orientation"]).then(function(tags) {
                      htmlImagesArray[0].tags = tags;
                      callback(htmlImagesArray);
                    }).catch(function(e) {
                      console.log(e);
                      callback(htmlImagesArray);
                    });
                  } else {
                    callback(htmlImagesArray);
                  }
                }
              };
              for (i = 0; i < htmlImagesSrcArray.length; i++) {
                img = new Image();
                htmlImagesArray.addImage(img);
                addOnloadHandler(img, htmlImagesArray);
                img.src = htmlImagesSrcArray[i];
              }
            };
            function addOnloadHandler(img, htmlImagesArray) {
              img.onload = function() {
                htmlImagesArray.loaded(this);
              };
            }
            __webpack_exports__["a"] = ImageLoader;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__image_loader__ = __webpack_require__(62);
            var InputStream = {};
            InputStream.createVideoStream = function(video) {
              var that = {}, _config = null, _eventNames = ["canrecord", "ended"], _eventHandlers = {}, _calculatedWidth, _calculatedHeight, _topRight = { x: 0, y: 0 }, _canvasSize = { x: 0, y: 0 };
              function initSize() {
                var width = video.videoWidth, height = video.videoHeight;
                _calculatedWidth = _config.size ? width / height > 1 ? _config.size : Math.floor(width / height * _config.size) : width;
                _calculatedHeight = _config.size ? width / height > 1 ? Math.floor(height / width * _config.size) : _config.size : height;
                _canvasSize.x = _calculatedWidth;
                _canvasSize.y = _calculatedHeight;
              }
              that.getRealWidth = function() {
                return video.videoWidth;
              };
              that.getRealHeight = function() {
                return video.videoHeight;
              };
              that.getWidth = function() {
                return _calculatedWidth;
              };
              that.getHeight = function() {
                return _calculatedHeight;
              };
              that.setWidth = function(width) {
                _calculatedWidth = width;
              };
              that.setHeight = function(height) {
                _calculatedHeight = height;
              };
              that.setInputStream = function(config) {
                _config = config;
                video.src = typeof config.src !== "undefined" ? config.src : "";
              };
              that.ended = function() {
                return video.ended;
              };
              that.getConfig = function() {
                return _config;
              };
              that.setAttribute = function(name, value) {
                video.setAttribute(name, value);
              };
              that.pause = function() {
                video.pause();
              };
              that.play = function() {
                video.play();
              };
              that.setCurrentTime = function(time) {
                if (_config.type !== "LiveStream") {
                  video.currentTime = time;
                }
              };
              that.addEventListener = function(event, f, bool) {
                if (_eventNames.indexOf(event) !== -1) {
                  if (!_eventHandlers[event]) {
                    _eventHandlers[event] = [];
                  }
                  _eventHandlers[event].push(f);
                } else {
                  video.addEventListener(event, f, bool);
                }
              };
              that.clearEventHandlers = function() {
                _eventNames.forEach(function(eventName) {
                  var handlers = _eventHandlers[eventName];
                  if (handlers && handlers.length > 0) {
                    handlers.forEach(function(handler) {
                      video.removeEventListener(eventName, handler);
                    });
                  }
                });
              };
              that.trigger = function(eventName, args) {
                var j, handlers = _eventHandlers[eventName];
                if (eventName === "canrecord") {
                  initSize();
                }
                if (handlers && handlers.length > 0) {
                  for (j = 0; j < handlers.length; j++) {
                    handlers[j].apply(that, args);
                  }
                }
              };
              that.setTopRight = function(topRight) {
                _topRight.x = topRight.x;
                _topRight.y = topRight.y;
              };
              that.getTopRight = function() {
                return _topRight;
              };
              that.setCanvasSize = function(size) {
                _canvasSize.x = size.x;
                _canvasSize.y = size.y;
              };
              that.getCanvasSize = function() {
                return _canvasSize;
              };
              that.getFrame = function() {
                return video;
              };
              return that;
            };
            InputStream.createLiveStream = function(video) {
              video.setAttribute("autoplay", true);
              var that = InputStream.createVideoStream(video);
              that.ended = function() {
                return false;
              };
              return that;
            };
            InputStream.createImageStream = function() {
              var that = {};
              var _config = null;
              var width = 0, height = 0, frameIdx = 0, paused = true, loaded = false, imgArray = null, size = 0, offset = 1, baseUrl = null, ended = false, calculatedWidth, calculatedHeight, _eventNames = ["canrecord", "ended"], _eventHandlers = {}, _topRight = { x: 0, y: 0 }, _canvasSize = { x: 0, y: 0 };
              function loadImages() {
                loaded = false;
                __WEBPACK_IMPORTED_MODULE_0__image_loader__["a"].load(baseUrl, function(imgs) {
                  imgArray = imgs;
                  if (imgs[0].tags && imgs[0].tags.orientation) {
                    switch (imgs[0].tags.orientation) {
                      case 6:
                      case 8:
                        width = imgs[0].img.height;
                        height = imgs[0].img.width;
                        break;
                      default:
                        width = imgs[0].img.width;
                        height = imgs[0].img.height;
                    }
                  } else {
                    width = imgs[0].img.width;
                    height = imgs[0].img.height;
                  }
                  calculatedWidth = _config.size ? width / height > 1 ? _config.size : Math.floor(width / height * _config.size) : width;
                  calculatedHeight = _config.size ? width / height > 1 ? Math.floor(height / width * _config.size) : _config.size : height;
                  _canvasSize.x = calculatedWidth;
                  _canvasSize.y = calculatedHeight;
                  loaded = true;
                  frameIdx = 0;
                  setTimeout(function() {
                    publishEvent("canrecord", []);
                  }, 0);
                }, offset, size, _config.sequence);
              }
              function publishEvent(eventName, args) {
                var j, handlers = _eventHandlers[eventName];
                if (handlers && handlers.length > 0) {
                  for (j = 0; j < handlers.length; j++) {
                    handlers[j].apply(that, args);
                  }
                }
              }
              that.trigger = publishEvent;
              that.getWidth = function() {
                return calculatedWidth;
              };
              that.getHeight = function() {
                return calculatedHeight;
              };
              that.setWidth = function(newWidth) {
                calculatedWidth = newWidth;
              };
              that.setHeight = function(newHeight) {
                calculatedHeight = newHeight;
              };
              that.getRealWidth = function() {
                return width;
              };
              that.getRealHeight = function() {
                return height;
              };
              that.setInputStream = function(stream) {
                _config = stream;
                if (stream.sequence === false) {
                  baseUrl = stream.src;
                  size = 1;
                } else {
                  baseUrl = stream.src;
                  size = stream.length;
                }
                loadImages();
              };
              that.ended = function() {
                return ended;
              };
              that.setAttribute = function() {
              };
              that.getConfig = function() {
                return _config;
              };
              that.pause = function() {
                paused = true;
              };
              that.play = function() {
                paused = false;
              };
              that.setCurrentTime = function(time) {
                frameIdx = time;
              };
              that.addEventListener = function(event, f) {
                if (_eventNames.indexOf(event) !== -1) {
                  if (!_eventHandlers[event]) {
                    _eventHandlers[event] = [];
                  }
                  _eventHandlers[event].push(f);
                }
              };
              that.setTopRight = function(topRight) {
                _topRight.x = topRight.x;
                _topRight.y = topRight.y;
              };
              that.getTopRight = function() {
                return _topRight;
              };
              that.setCanvasSize = function(canvasSize) {
                _canvasSize.x = canvasSize.x;
                _canvasSize.y = canvasSize.y;
              };
              that.getCanvasSize = function() {
                return _canvasSize;
              };
              that.getFrame = function() {
                var frame;
                if (!loaded) {
                  return null;
                }
                if (!paused) {
                  frame = imgArray[frameIdx];
                  if (frameIdx < size - 1) {
                    frameIdx++;
                  } else {
                    setTimeout(function() {
                      ended = true;
                      publishEvent("ended", []);
                    }, 0);
                  }
                }
                return frame;
              };
              return that;
            };
            __webpack_exports__["a"] = InputStream;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            (function(global) {
              var __WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__ = __webpack_require__(20);
              var __WEBPACK_IMPORTED_MODULE_1__common_cv_utils__ = __webpack_require__(19);
              var __WEBPACK_IMPORTED_MODULE_2__common_array_helper__ = __webpack_require__(3);
              var __WEBPACK_IMPORTED_MODULE_3__common_image_debug__ = __webpack_require__(9);
              var __WEBPACK_IMPORTED_MODULE_4__rasterizer__ = __webpack_require__(65);
              var __WEBPACK_IMPORTED_MODULE_5__tracer__ = __webpack_require__(30);
              var __WEBPACK_IMPORTED_MODULE_6__skeletonizer__ = __webpack_require__(66);
              var vec2 = {
                clone: __webpack_require__(7),
                dot: __webpack_require__(32),
                scale: __webpack_require__(81),
                transformMat2: __webpack_require__(82)
              };
              var mat2 = {
                copy: __webpack_require__(78),
                create: __webpack_require__(79),
                invert: __webpack_require__(80)
              };
              var _config, _currentImageWrapper, _skelImageWrapper, _subImageWrapper, _labelImageWrapper, _patchGrid, _patchLabelGrid, _imageToPatchGrid, _binaryImageWrapper, _patchSize, _canvasContainer = {
                ctx: {
                  binary: null
                },
                dom: {
                  binary: null
                }
              }, _numPatches = { x: 0, y: 0 }, _inputImageWrapper, _skeletonizer;
              function initBuffers() {
                var skeletonImageData;
                if (_config.halfSample) {
                  _currentImageWrapper = new __WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"]({
                    x: _inputImageWrapper.size.x / 2 | 0,
                    y: _inputImageWrapper.size.y / 2 | 0
                  });
                } else {
                  _currentImageWrapper = _inputImageWrapper;
                }
                _patchSize = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["e"])(_config.patchSize, _currentImageWrapper.size);
                _numPatches.x = _currentImageWrapper.size.x / _patchSize.x | 0;
                _numPatches.y = _currentImageWrapper.size.y / _patchSize.y | 0;
                _binaryImageWrapper = new __WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"](_currentImageWrapper.size, void 0, Uint8Array, false);
                _labelImageWrapper = new __WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"](_patchSize, void 0, Array, true);
                skeletonImageData = new ArrayBuffer(64 * 1024);
                _subImageWrapper = new __WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"](_patchSize, new Uint8Array(skeletonImageData, 0, _patchSize.x * _patchSize.y));
                _skelImageWrapper = new __WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"](_patchSize, new Uint8Array(skeletonImageData, _patchSize.x * _patchSize.y * 3, _patchSize.x * _patchSize.y), void 0, true);
                _skeletonizer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__skeletonizer__["a"])(typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : global, {
                  size: _patchSize.x
                }, skeletonImageData);
                _imageToPatchGrid = new __WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"]({
                  x: _currentImageWrapper.size.x / _subImageWrapper.size.x | 0,
                  y: _currentImageWrapper.size.y / _subImageWrapper.size.y | 0
                }, void 0, Array, true);
                _patchGrid = new __WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"](_imageToPatchGrid.size, void 0, void 0, true);
                _patchLabelGrid = new __WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"](_imageToPatchGrid.size, void 0, Int32Array, true);
              }
              function initCanvas() {
                if (_config.useWorker || typeof document === "undefined") {
                  return;
                }
                _canvasContainer.dom.binary = document.createElement("canvas");
                _canvasContainer.dom.binary.className = "binaryBuffer";
                if (_config.debug.showCanvas === true) {
                  document.querySelector("#debug").appendChild(_canvasContainer.dom.binary);
                }
                _canvasContainer.ctx.binary = _canvasContainer.dom.binary.getContext("2d");
                _canvasContainer.dom.binary.width = _binaryImageWrapper.size.x;
                _canvasContainer.dom.binary.height = _binaryImageWrapper.size.y;
              }
              function boxFromPatches(patches) {
                var overAvg, i, j, patch, transMat, minx = _binaryImageWrapper.size.x, miny = _binaryImageWrapper.size.y, maxx = -_binaryImageWrapper.size.x, maxy = -_binaryImageWrapper.size.y, box, scale;
                overAvg = 0;
                for (i = 0; i < patches.length; i++) {
                  patch = patches[i];
                  overAvg += patch.rad;
                  if (_config.debug.showPatches) {
                    __WEBPACK_IMPORTED_MODULE_3__common_image_debug__["a"].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "red" });
                  }
                }
                overAvg /= patches.length;
                overAvg = (overAvg * 180 / Math.PI + 90) % 180 - 90;
                if (overAvg < 0) {
                  overAvg += 180;
                }
                overAvg = (180 - overAvg) * Math.PI / 180;
                transMat = mat2.copy(mat2.create(), [Math.cos(overAvg), Math.sin(overAvg), -Math.sin(overAvg), Math.cos(overAvg)]);
                for (i = 0; i < patches.length; i++) {
                  patch = patches[i];
                  for (j = 0; j < 4; j++) {
                    vec2.transformMat2(patch.box[j], patch.box[j], transMat);
                  }
                  if (_config.debug.boxFromPatches.showTransformed) {
                    __WEBPACK_IMPORTED_MODULE_3__common_image_debug__["a"].drawPath(patch.box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: "#99ff00", lineWidth: 2 });
                  }
                }
                for (i = 0; i < patches.length; i++) {
                  patch = patches[i];
                  for (j = 0; j < 4; j++) {
                    if (patch.box[j][0] < minx) {
                      minx = patch.box[j][0];
                    }
                    if (patch.box[j][0] > maxx) {
                      maxx = patch.box[j][0];
                    }
                    if (patch.box[j][1] < miny) {
                      miny = patch.box[j][1];
                    }
                    if (patch.box[j][1] > maxy) {
                      maxy = patch.box[j][1];
                    }
                  }
                }
                box = [[minx, miny], [maxx, miny], [maxx, maxy], [minx, maxy]];
                if (_config.debug.boxFromPatches.showTransformedBox) {
                  __WEBPACK_IMPORTED_MODULE_3__common_image_debug__["a"].drawPath(box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: "#ff0000", lineWidth: 2 });
                }
                scale = _config.halfSample ? 2 : 1;
                transMat = mat2.invert(transMat, transMat);
                for (j = 0; j < 4; j++) {
                  vec2.transformMat2(box[j], box[j], transMat);
                }
                if (_config.debug.boxFromPatches.showBB) {
                  __WEBPACK_IMPORTED_MODULE_3__common_image_debug__["a"].drawPath(box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: "#ff0000", lineWidth: 2 });
                }
                for (j = 0; j < 4; j++) {
                  vec2.scale(box[j], box[j], scale);
                }
                return box;
              }
              function binarizeImage() {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["f"])(_currentImageWrapper, _binaryImageWrapper);
                _binaryImageWrapper.zeroBorder();
                if (_config.debug.showCanvas) {
                  _binaryImageWrapper.show(_canvasContainer.dom.binary, 255);
                }
              }
              function findPatches() {
                var i, j, x, y, moments, patchesFound = [], rasterizer, rasterResult, patch;
                for (i = 0; i < _numPatches.x; i++) {
                  for (j = 0; j < _numPatches.y; j++) {
                    x = _subImageWrapper.size.x * i;
                    y = _subImageWrapper.size.y * j;
                    skeletonize(x, y);
                    _skelImageWrapper.zeroBorder();
                    __WEBPACK_IMPORTED_MODULE_2__common_array_helper__["a"].init(_labelImageWrapper.data, 0);
                    rasterizer = __WEBPACK_IMPORTED_MODULE_4__rasterizer__["a"].create(_skelImageWrapper, _labelImageWrapper);
                    rasterResult = rasterizer.rasterize(0);
                    if (_config.debug.showLabels) {
                      _labelImageWrapper.overlay(_canvasContainer.dom.binary, Math.floor(360 / rasterResult.count), { x, y });
                    }
                    moments = _labelImageWrapper.moments(rasterResult.count);
                    patchesFound = patchesFound.concat(describePatch(moments, [i, j], x, y));
                  }
                }
                if (_config.debug.showFoundPatches) {
                  for (i = 0; i < patchesFound.length; i++) {
                    patch = patchesFound[i];
                    __WEBPACK_IMPORTED_MODULE_3__common_image_debug__["a"].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "#99ff00", lineWidth: 2 });
                  }
                }
                return patchesFound;
              }
              function findBiggestConnectedAreas(maxLabel) {
                var i, sum, labelHist = [], topLabels = [];
                for (i = 0; i < maxLabel; i++) {
                  labelHist.push(0);
                }
                sum = _patchLabelGrid.data.length;
                while (sum--) {
                  if (_patchLabelGrid.data[sum] > 0) {
                    labelHist[_patchLabelGrid.data[sum] - 1]++;
                  }
                }
                labelHist = labelHist.map(function(val, idx) {
                  return {
                    val,
                    label: idx + 1
                  };
                });
                labelHist.sort(function(a, b) {
                  return b.val - a.val;
                });
                topLabels = labelHist.filter(function(el) {
                  return el.val >= 5;
                });
                return topLabels;
              }
              function findBoxes(topLabels, maxLabel) {
                var i, j, sum, patches = [], patch, box, boxes = [], hsv = [0, 1, 1], rgb = [0, 0, 0];
                for (i = 0; i < topLabels.length; i++) {
                  sum = _patchLabelGrid.data.length;
                  patches.length = 0;
                  while (sum--) {
                    if (_patchLabelGrid.data[sum] === topLabels[i].label) {
                      patch = _imageToPatchGrid.data[sum];
                      patches.push(patch);
                    }
                  }
                  box = boxFromPatches(patches);
                  if (box) {
                    boxes.push(box);
                    if (_config.debug.showRemainingPatchLabels) {
                      for (j = 0; j < patches.length; j++) {
                        patch = patches[j];
                        hsv[0] = topLabels[i].label / (maxLabel + 1) * 360;
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["a"])(hsv, rgb);
                        __WEBPACK_IMPORTED_MODULE_3__common_image_debug__["a"].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "rgb(" + rgb.join(",") + ")", lineWidth: 2 });
                      }
                    }
                  }
                }
                return boxes;
              }
              function similarMoments(moments) {
                var clusters = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["g"])(moments, 0.9);
                var topCluster = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["h"])(clusters, 1, function(e) {
                  return e.getPoints().length;
                });
                var points = [], result = [];
                if (topCluster.length === 1) {
                  points = topCluster[0].item.getPoints();
                  for (var i = 0; i < points.length; i++) {
                    result.push(points[i].point);
                  }
                }
                return result;
              }
              function skeletonize(x, y) {
                _binaryImageWrapper.subImageAsCopy(_subImageWrapper, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["b"])(x, y));
                _skeletonizer.skeletonize();
                if (_config.debug.showSkeleton) {
                  _skelImageWrapper.overlay(_canvasContainer.dom.binary, 360, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["b"])(x, y));
                }
              }
              function describePatch(moments, patchPos, x, y) {
                var k, avg, eligibleMoments = [], matchingMoments, patch, patchesFound = [], minComponentWeight = Math.ceil(_patchSize.x / 3);
                if (moments.length >= 2) {
                  for (k = 0; k < moments.length; k++) {
                    if (moments[k].m00 > minComponentWeight) {
                      eligibleMoments.push(moments[k]);
                    }
                  }
                  if (eligibleMoments.length >= 2) {
                    matchingMoments = similarMoments(eligibleMoments);
                    avg = 0;
                    for (k = 0; k < matchingMoments.length; k++) {
                      avg += matchingMoments[k].rad;
                    }
                    if (matchingMoments.length > 1 && matchingMoments.length >= eligibleMoments.length / 4 * 3 && matchingMoments.length > moments.length / 4) {
                      avg /= matchingMoments.length;
                      patch = {
                        index: patchPos[1] * _numPatches.x + patchPos[0],
                        pos: {
                          x,
                          y
                        },
                        box: [vec2.clone([x, y]), vec2.clone([x + _subImageWrapper.size.x, y]), vec2.clone([x + _subImageWrapper.size.x, y + _subImageWrapper.size.y]), vec2.clone([x, y + _subImageWrapper.size.y])],
                        moments: matchingMoments,
                        rad: avg,
                        vec: vec2.clone([Math.cos(avg), Math.sin(avg)])
                      };
                      patchesFound.push(patch);
                    }
                  }
                }
                return patchesFound;
              }
              function rasterizeAngularSimilarity(patchesFound) {
                var label = 0, threshold = 0.95, currIdx = 0, j, patch, hsv = [0, 1, 1], rgb = [0, 0, 0];
                function notYetProcessed() {
                  var i;
                  for (i = 0; i < _patchLabelGrid.data.length; i++) {
                    if (_patchLabelGrid.data[i] === 0 && _patchGrid.data[i] === 1) {
                      return i;
                    }
                  }
                  return _patchLabelGrid.length;
                }
                function trace(currentIdx) {
                  var x, y, currentPatch, idx, dir, current = {
                    x: currentIdx % _patchLabelGrid.size.x,
                    y: currentIdx / _patchLabelGrid.size.x | 0
                  }, similarity;
                  if (currentIdx < _patchLabelGrid.data.length) {
                    currentPatch = _imageToPatchGrid.data[currentIdx];
                    _patchLabelGrid.data[currentIdx] = label;
                    for (dir = 0; dir < __WEBPACK_IMPORTED_MODULE_5__tracer__["a"].searchDirections.length; dir++) {
                      y = current.y + __WEBPACK_IMPORTED_MODULE_5__tracer__["a"].searchDirections[dir][0];
                      x = current.x + __WEBPACK_IMPORTED_MODULE_5__tracer__["a"].searchDirections[dir][1];
                      idx = y * _patchLabelGrid.size.x + x;
                      if (_patchGrid.data[idx] === 0) {
                        _patchLabelGrid.data[idx] = Number.MAX_VALUE;
                        continue;
                      }
                      if (_patchLabelGrid.data[idx] === 0) {
                        similarity = Math.abs(vec2.dot(_imageToPatchGrid.data[idx].vec, currentPatch.vec));
                        if (similarity > threshold) {
                          trace(idx);
                        }
                      }
                    }
                  }
                }
                __WEBPACK_IMPORTED_MODULE_2__common_array_helper__["a"].init(_patchGrid.data, 0);
                __WEBPACK_IMPORTED_MODULE_2__common_array_helper__["a"].init(_patchLabelGrid.data, 0);
                __WEBPACK_IMPORTED_MODULE_2__common_array_helper__["a"].init(_imageToPatchGrid.data, null);
                for (j = 0; j < patchesFound.length; j++) {
                  patch = patchesFound[j];
                  _imageToPatchGrid.data[patch.index] = patch;
                  _patchGrid.data[patch.index] = 1;
                }
                _patchGrid.zeroBorder();
                while ((currIdx = notYetProcessed()) < _patchLabelGrid.data.length) {
                  label++;
                  trace(currIdx);
                }
                if (_config.debug.showPatchLabels) {
                  for (j = 0; j < _patchLabelGrid.data.length; j++) {
                    if (_patchLabelGrid.data[j] > 0 && _patchLabelGrid.data[j] <= label) {
                      patch = _imageToPatchGrid.data[j];
                      hsv[0] = _patchLabelGrid.data[j] / (label + 1) * 360;
                      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["a"])(hsv, rgb);
                      __WEBPACK_IMPORTED_MODULE_3__common_image_debug__["a"].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "rgb(" + rgb.join(",") + ")", lineWidth: 2 });
                    }
                  }
                }
                return label;
              }
              __webpack_exports__["a"] = {
                init: function init(inputImageWrapper, config) {
                  _config = config;
                  _inputImageWrapper = inputImageWrapper;
                  initBuffers();
                  initCanvas();
                },
                locate: function locate() {
                  var patchesFound, topLabels, boxes;
                  if (_config.halfSample) {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["i"])(_inputImageWrapper, _currentImageWrapper);
                  }
                  binarizeImage();
                  patchesFound = findPatches();
                  if (patchesFound.length < _numPatches.x * _numPatches.y * 0.05) {
                    return null;
                  }
                  var maxLabel = rasterizeAngularSimilarity(patchesFound);
                  if (maxLabel < 1) {
                    return null;
                  }
                  topLabels = findBiggestConnectedAreas(maxLabel);
                  if (topLabels.length === 0) {
                    return null;
                  }
                  boxes = findBoxes(topLabels, maxLabel);
                  return boxes;
                },
                checkImageConstraints: function checkImageConstraints(inputStream, config) {
                  var patchSize, width = inputStream.getWidth(), height = inputStream.getHeight(), halfSample = config.halfSample ? 0.5 : 1, size, area;
                  if (inputStream.getConfig().area) {
                    area = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["j"])(width, height, inputStream.getConfig().area);
                    inputStream.setTopRight({ x: area.sx, y: area.sy });
                    inputStream.setCanvasSize({ x: width, y: height });
                    width = area.sw;
                    height = area.sh;
                  }
                  size = {
                    x: Math.floor(width * halfSample),
                    y: Math.floor(height * halfSample)
                  };
                  patchSize = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["e"])(config.patchSize, size);
                  if (true) {
                    console.log("Patch-Size: " + JSON.stringify(patchSize));
                  }
                  inputStream.setWidth(Math.floor(Math.floor(size.x / patchSize.x) * (1 / halfSample) * patchSize.x));
                  inputStream.setHeight(Math.floor(Math.floor(size.y / patchSize.y) * (1 / halfSample) * patchSize.y));
                  if (inputStream.getWidth() % patchSize.x === 0 && inputStream.getHeight() % patchSize.y === 0) {
                    return true;
                  }
                  throw new Error("Image dimensions do not comply with the current settings: Width (" + width + " )and height (" + height + ") must a multiple of " + patchSize.x);
                }
              };
            }).call(__webpack_exports__, __webpack_require__(47));
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__tracer__ = __webpack_require__(30);
            var Rasterizer = {
              createContour2D: function createContour2D() {
                return {
                  dir: null,
                  index: null,
                  firstVertex: null,
                  insideContours: null,
                  nextpeer: null,
                  prevpeer: null
                };
              },
              CONTOUR_DIR: {
                CW_DIR: 0,
                CCW_DIR: 1,
                UNKNOWN_DIR: 2
              },
              DIR: {
                OUTSIDE_EDGE: -32767,
                INSIDE_EDGE: -32766
              },
              create: function create(imageWrapper, labelWrapper) {
                var imageData = imageWrapper.data, labelData = labelWrapper.data, width = imageWrapper.size.x, height = imageWrapper.size.y, tracer = __WEBPACK_IMPORTED_MODULE_0__tracer__["a"].create(imageWrapper, labelWrapper);
                return {
                  rasterize: function rasterize(depthlabel) {
                    var color, bc, lc, labelindex, cx, cy, colorMap = [], vertex, p, cc, sc, pos, connectedCount = 0, i;
                    for (i = 0; i < 400; i++) {
                      colorMap[i] = 0;
                    }
                    colorMap[0] = imageData[0];
                    cc = null;
                    for (cy = 1; cy < height - 1; cy++) {
                      labelindex = 0;
                      bc = colorMap[0];
                      for (cx = 1; cx < width - 1; cx++) {
                        pos = cy * width + cx;
                        if (labelData[pos] === 0) {
                          color = imageData[pos];
                          if (color !== bc) {
                            if (labelindex === 0) {
                              lc = connectedCount + 1;
                              colorMap[lc] = color;
                              bc = color;
                              vertex = tracer.contourTracing(cy, cx, lc, color, Rasterizer.DIR.OUTSIDE_EDGE);
                              if (vertex !== null) {
                                connectedCount++;
                                labelindex = lc;
                                p = Rasterizer.createContour2D();
                                p.dir = Rasterizer.CONTOUR_DIR.CW_DIR;
                                p.index = labelindex;
                                p.firstVertex = vertex;
                                p.nextpeer = cc;
                                p.insideContours = null;
                                if (cc !== null) {
                                  cc.prevpeer = p;
                                }
                                cc = p;
                              }
                            } else {
                              vertex = tracer.contourTracing(cy, cx, Rasterizer.DIR.INSIDE_EDGE, color, labelindex);
                              if (vertex !== null) {
                                p = Rasterizer.createContour2D();
                                p.firstVertex = vertex;
                                p.insideContours = null;
                                if (depthlabel === 0) {
                                  p.dir = Rasterizer.CONTOUR_DIR.CCW_DIR;
                                } else {
                                  p.dir = Rasterizer.CONTOUR_DIR.CW_DIR;
                                }
                                p.index = depthlabel;
                                sc = cc;
                                while (sc !== null && sc.index !== labelindex) {
                                  sc = sc.nextpeer;
                                }
                                if (sc !== null) {
                                  p.nextpeer = sc.insideContours;
                                  if (sc.insideContours !== null) {
                                    sc.insideContours.prevpeer = p;
                                  }
                                  sc.insideContours = p;
                                }
                              }
                            }
                          } else {
                            labelData[pos] = labelindex;
                          }
                        } else if (labelData[pos] === Rasterizer.DIR.OUTSIDE_EDGE || labelData[pos] === Rasterizer.DIR.INSIDE_EDGE) {
                          labelindex = 0;
                          if (labelData[pos] === Rasterizer.DIR.INSIDE_EDGE) {
                            bc = imageData[pos];
                          } else {
                            bc = colorMap[0];
                          }
                        } else {
                          labelindex = labelData[pos];
                          bc = colorMap[labelindex];
                        }
                      }
                    }
                    sc = cc;
                    while (sc !== null) {
                      sc.index = depthlabel;
                      sc = sc.nextpeer;
                    }
                    return {
                      cc,
                      count: connectedCount
                    };
                  },
                  debug: {
                    drawContour: function drawContour(canvas, firstContour) {
                      var ctx = canvas.getContext("2d"), pq = firstContour, iq, q, p;
                      ctx.strokeStyle = "red";
                      ctx.fillStyle = "red";
                      ctx.lineWidth = 1;
                      if (pq !== null) {
                        iq = pq.insideContours;
                      } else {
                        iq = null;
                      }
                      while (pq !== null) {
                        if (iq !== null) {
                          q = iq;
                          iq = iq.nextpeer;
                        } else {
                          q = pq;
                          pq = pq.nextpeer;
                          if (pq !== null) {
                            iq = pq.insideContours;
                          } else {
                            iq = null;
                          }
                        }
                        switch (q.dir) {
                          case Rasterizer.CONTOUR_DIR.CW_DIR:
                            ctx.strokeStyle = "red";
                            break;
                          case Rasterizer.CONTOUR_DIR.CCW_DIR:
                            ctx.strokeStyle = "blue";
                            break;
                          case Rasterizer.CONTOUR_DIR.UNKNOWN_DIR:
                            ctx.strokeStyle = "green";
                            break;
                        }
                        p = q.firstVertex;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        do {
                          p = p.next;
                          ctx.lineTo(p.x, p.y);
                        } while (p !== q.firstVertex);
                        ctx.stroke();
                      }
                    }
                  }
                };
              }
            };
            __webpack_exports__["a"] = Rasterizer;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            function Skeletonizer(stdlib, foreign, buffer) {
              ;
              var images = new stdlib.Uint8Array(buffer), size = foreign.size | 0, imul = stdlib.Math.imul;
              function erode(inImagePtr, outImagePtr) {
                inImagePtr = inImagePtr | 0;
                outImagePtr = outImagePtr | 0;
                var v = 0, u = 0, sum = 0, yStart1 = 0, yStart2 = 0, xStart1 = 0, xStart2 = 0, offset = 0;
                for (v = 1; (v | 0) < (size - 1 | 0); v = v + 1 | 0) {
                  offset = offset + size | 0;
                  for (u = 1; (u | 0) < (size - 1 | 0); u = u + 1 | 0) {
                    yStart1 = offset - size | 0;
                    yStart2 = offset + size | 0;
                    xStart1 = u - 1 | 0;
                    xStart2 = u + 1 | 0;
                    sum = (images[inImagePtr + yStart1 + xStart1 | 0] | 0) + (images[inImagePtr + yStart1 + xStart2 | 0] | 0) + (images[inImagePtr + offset + u | 0] | 0) + (images[inImagePtr + yStart2 + xStart1 | 0] | 0) + (images[inImagePtr + yStart2 + xStart2 | 0] | 0) | 0;
                    if ((sum | 0) == (5 | 0)) {
                      images[outImagePtr + offset + u | 0] = 1;
                    } else {
                      images[outImagePtr + offset + u | 0] = 0;
                    }
                  }
                }
                return;
              }
              function subtract(aImagePtr, bImagePtr, outImagePtr) {
                aImagePtr = aImagePtr | 0;
                bImagePtr = bImagePtr | 0;
                outImagePtr = outImagePtr | 0;
                var length = 0;
                length = imul(size, size) | 0;
                while ((length | 0) > 0) {
                  length = length - 1 | 0;
                  images[outImagePtr + length | 0] = (images[aImagePtr + length | 0] | 0) - (images[bImagePtr + length | 0] | 0) | 0;
                }
              }
              function bitwiseOr(aImagePtr, bImagePtr, outImagePtr) {
                aImagePtr = aImagePtr | 0;
                bImagePtr = bImagePtr | 0;
                outImagePtr = outImagePtr | 0;
                var length = 0;
                length = imul(size, size) | 0;
                while ((length | 0) > 0) {
                  length = length - 1 | 0;
                  images[outImagePtr + length | 0] = images[aImagePtr + length | 0] | 0 | (images[bImagePtr + length | 0] | 0) | 0;
                }
              }
              function countNonZero(imagePtr) {
                imagePtr = imagePtr | 0;
                var sum = 0, length = 0;
                length = imul(size, size) | 0;
                while ((length | 0) > 0) {
                  length = length - 1 | 0;
                  sum = (sum | 0) + (images[imagePtr + length | 0] | 0) | 0;
                }
                return sum | 0;
              }
              function init(imagePtr, value) {
                imagePtr = imagePtr | 0;
                value = value | 0;
                var length = 0;
                length = imul(size, size) | 0;
                while ((length | 0) > 0) {
                  length = length - 1 | 0;
                  images[imagePtr + length | 0] = value;
                }
              }
              function dilate(inImagePtr, outImagePtr) {
                inImagePtr = inImagePtr | 0;
                outImagePtr = outImagePtr | 0;
                var v = 0, u = 0, sum = 0, yStart1 = 0, yStart2 = 0, xStart1 = 0, xStart2 = 0, offset = 0;
                for (v = 1; (v | 0) < (size - 1 | 0); v = v + 1 | 0) {
                  offset = offset + size | 0;
                  for (u = 1; (u | 0) < (size - 1 | 0); u = u + 1 | 0) {
                    yStart1 = offset - size | 0;
                    yStart2 = offset + size | 0;
                    xStart1 = u - 1 | 0;
                    xStart2 = u + 1 | 0;
                    sum = (images[inImagePtr + yStart1 + xStart1 | 0] | 0) + (images[inImagePtr + yStart1 + xStart2 | 0] | 0) + (images[inImagePtr + offset + u | 0] | 0) + (images[inImagePtr + yStart2 + xStart1 | 0] | 0) + (images[inImagePtr + yStart2 + xStart2 | 0] | 0) | 0;
                    if ((sum | 0) > (0 | 0)) {
                      images[outImagePtr + offset + u | 0] = 1;
                    } else {
                      images[outImagePtr + offset + u | 0] = 0;
                    }
                  }
                }
                return;
              }
              function memcpy(srcImagePtr, dstImagePtr) {
                srcImagePtr = srcImagePtr | 0;
                dstImagePtr = dstImagePtr | 0;
                var length = 0;
                length = imul(size, size) | 0;
                while ((length | 0) > 0) {
                  length = length - 1 | 0;
                  images[dstImagePtr + length | 0] = images[srcImagePtr + length | 0] | 0;
                }
              }
              function zeroBorder(imagePtr) {
                imagePtr = imagePtr | 0;
                var x = 0, y = 0;
                for (x = 0; (x | 0) < (size - 1 | 0); x = x + 1 | 0) {
                  images[imagePtr + x | 0] = 0;
                  images[imagePtr + y | 0] = 0;
                  y = y + size - 1 | 0;
                  images[imagePtr + y | 0] = 0;
                  y = y + 1 | 0;
                }
                for (x = 0; (x | 0) < (size | 0); x = x + 1 | 0) {
                  images[imagePtr + y | 0] = 0;
                  y = y + 1 | 0;
                }
              }
              function skeletonize() {
                var subImagePtr = 0, erodedImagePtr = 0, tempImagePtr = 0, skelImagePtr = 0, sum = 0, done = 0;
                erodedImagePtr = imul(size, size) | 0;
                tempImagePtr = erodedImagePtr + erodedImagePtr | 0;
                skelImagePtr = tempImagePtr + erodedImagePtr | 0;
                init(skelImagePtr, 0);
                zeroBorder(subImagePtr);
                do {
                  erode(subImagePtr, erodedImagePtr);
                  dilate(erodedImagePtr, tempImagePtr);
                  subtract(subImagePtr, tempImagePtr, tempImagePtr);
                  bitwiseOr(skelImagePtr, tempImagePtr, skelImagePtr);
                  memcpy(erodedImagePtr, subImagePtr);
                  sum = countNonZero(subImagePtr) | 0;
                  done = (sum | 0) == 0 | 0;
                } while (!done);
              }
              return {
                skeletonize
              };
            }
            __webpack_exports__["a"] = Skeletonizer;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__barcode_reader__ = __webpack_require__(1);
            function TwoOfFiveReader(opts) {
              __WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].call(this, opts);
              this.barSpaceRatio = [1, 1];
            }
            var N = 1, W = 3, properties = {
              START_PATTERN: { value: [W, N, W, N, N, N] },
              STOP_PATTERN: { value: [W, N, N, N, W] },
              CODE_PATTERN: { value: [[N, N, W, W, N], [W, N, N, N, W], [N, W, N, N, W], [W, W, N, N, N], [N, N, W, N, W], [W, N, W, N, N], [N, W, W, N, N], [N, N, N, W, W], [W, N, N, W, N], [N, W, N, W, N]] },
              SINGLE_CODE_ERROR: { value: 0.78, writable: true },
              AVG_CODE_ERROR: { value: 0.3, writable: true },
              FORMAT: { value: "2of5" }
            };
            var startPatternLength = properties.START_PATTERN.value.reduce(function(sum, val) {
              return sum + val;
            }, 0);
            TwoOfFiveReader.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].prototype, properties);
            TwoOfFiveReader.prototype.constructor = TwoOfFiveReader;
            TwoOfFiveReader.prototype._findPattern = function(pattern, offset, isWhite, tryHarder) {
              var counter = [], self2 = this, i, counterPos = 0, bestMatch = {
                error: Number.MAX_VALUE,
                code: -1,
                start: 0,
                end: 0
              }, error, j, sum, epsilon = self2.AVG_CODE_ERROR;
              isWhite = isWhite || false;
              tryHarder = tryHarder || false;
              if (!offset) {
                offset = self2._nextSet(self2._row);
              }
              for (i = 0; i < pattern.length; i++) {
                counter[i] = 0;
              }
              for (i = offset; i < self2._row.length; i++) {
                if (self2._row[i] ^ isWhite) {
                  counter[counterPos]++;
                } else {
                  if (counterPos === counter.length - 1) {
                    sum = 0;
                    for (j = 0; j < counter.length; j++) {
                      sum += counter[j];
                    }
                    error = self2._matchPattern(counter, pattern);
                    if (error < epsilon) {
                      bestMatch.error = error;
                      bestMatch.start = i - sum;
                      bestMatch.end = i;
                      return bestMatch;
                    }
                    if (tryHarder) {
                      for (j = 0; j < counter.length - 2; j++) {
                        counter[j] = counter[j + 2];
                      }
                      counter[counter.length - 2] = 0;
                      counter[counter.length - 1] = 0;
                      counterPos--;
                    } else {
                      return null;
                    }
                  } else {
                    counterPos++;
                  }
                  counter[counterPos] = 1;
                  isWhite = !isWhite;
                }
              }
              return null;
            };
            TwoOfFiveReader.prototype._findStart = function() {
              var self2 = this, leadingWhitespaceStart, offset = self2._nextSet(self2._row), startInfo, narrowBarWidth = 1;
              while (!startInfo) {
                startInfo = self2._findPattern(self2.START_PATTERN, offset, false, true);
                if (!startInfo) {
                  return null;
                }
                narrowBarWidth = Math.floor((startInfo.end - startInfo.start) / startPatternLength);
                leadingWhitespaceStart = startInfo.start - narrowBarWidth * 5;
                if (leadingWhitespaceStart >= 0) {
                  if (self2._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
                    return startInfo;
                  }
                }
                offset = startInfo.end;
                startInfo = null;
              }
            };
            TwoOfFiveReader.prototype._verifyTrailingWhitespace = function(endInfo) {
              var self2 = this, trailingWhitespaceEnd;
              trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;
              if (trailingWhitespaceEnd < self2._row.length) {
                if (self2._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
                  return endInfo;
                }
              }
              return null;
            };
            TwoOfFiveReader.prototype._findEnd = function() {
              var self2 = this, endInfo, tmp, offset;
              self2._row.reverse();
              offset = self2._nextSet(self2._row);
              endInfo = self2._findPattern(self2.STOP_PATTERN, offset, false, true);
              self2._row.reverse();
              if (endInfo === null) {
                return null;
              }
              tmp = endInfo.start;
              endInfo.start = self2._row.length - endInfo.end;
              endInfo.end = self2._row.length - tmp;
              return endInfo !== null ? self2._verifyTrailingWhitespace(endInfo) : null;
            };
            TwoOfFiveReader.prototype._decodeCode = function(counter) {
              var j, self2 = this, sum = 0, normalized, error, epsilon = self2.AVG_CODE_ERROR, code, bestMatch = {
                error: Number.MAX_VALUE,
                code: -1,
                start: 0,
                end: 0
              };
              for (j = 0; j < counter.length; j++) {
                sum += counter[j];
              }
              for (code = 0; code < self2.CODE_PATTERN.length; code++) {
                error = self2._matchPattern(counter, self2.CODE_PATTERN[code]);
                if (error < bestMatch.error) {
                  bestMatch.code = code;
                  bestMatch.error = error;
                }
              }
              if (bestMatch.error < epsilon) {
                return bestMatch;
              }
            };
            TwoOfFiveReader.prototype._decodePayload = function(counters, result, decodedCodes) {
              var i, self2 = this, pos = 0, counterLength = counters.length, counter = [0, 0, 0, 0, 0], code;
              while (pos < counterLength) {
                for (i = 0; i < 5; i++) {
                  counter[i] = counters[pos] * this.barSpaceRatio[0];
                  pos += 2;
                }
                code = self2._decodeCode(counter);
                if (!code) {
                  return null;
                }
                result.push(code.code + "");
                decodedCodes.push(code);
              }
              return code;
            };
            TwoOfFiveReader.prototype._verifyCounterLength = function(counters) {
              return counters.length % 10 === 0;
            };
            TwoOfFiveReader.prototype._decode = function() {
              var startInfo, endInfo, self2 = this, code, result = [], decodedCodes = [], counters;
              startInfo = self2._findStart();
              if (!startInfo) {
                return null;
              }
              decodedCodes.push(startInfo);
              endInfo = self2._findEnd();
              if (!endInfo) {
                return null;
              }
              counters = self2._fillCounters(startInfo.end, endInfo.start, false);
              if (!self2._verifyCounterLength(counters)) {
                return null;
              }
              code = self2._decodePayload(counters, result, decodedCodes);
              if (!code) {
                return null;
              }
              if (result.length < 5) {
                return null;
              }
              decodedCodes.push(endInfo);
              return {
                code: result.join(""),
                start: startInfo.start,
                end: endInfo.end,
                startInfo,
                decodedCodes
              };
            };
            __webpack_exports__["a"] = TwoOfFiveReader;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__barcode_reader__ = __webpack_require__(1);
            function CodabarReader() {
              __WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].call(this);
              this._counters = [];
            }
            var properties = {
              ALPHABETH_STRING: { value: "0123456789-$:/.+ABCD" },
              ALPHABET: { value: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 45, 36, 58, 47, 46, 43, 65, 66, 67, 68] },
              CHARACTER_ENCODINGS: { value: [3, 6, 9, 96, 18, 66, 33, 36, 48, 72, 12, 24, 69, 81, 84, 21, 26, 41, 11, 14] },
              START_END: { value: [26, 41, 11, 14] },
              MIN_ENCODED_CHARS: { value: 4 },
              MAX_ACCEPTABLE: { value: 2 },
              PADDING: { value: 1.5 },
              FORMAT: { value: "codabar", writeable: false }
            };
            CodabarReader.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].prototype, properties);
            CodabarReader.prototype.constructor = CodabarReader;
            CodabarReader.prototype._decode = function() {
              var self2 = this, result = [], start, decodedChar, pattern, nextStart, end;
              this._counters = self2._fillCounters();
              start = self2._findStart();
              if (!start) {
                return null;
              }
              nextStart = start.startCounter;
              do {
                pattern = self2._toPattern(nextStart);
                if (pattern < 0) {
                  return null;
                }
                decodedChar = self2._patternToChar(pattern);
                if (decodedChar < 0) {
                  return null;
                }
                result.push(decodedChar);
                nextStart += 8;
                if (result.length > 1 && self2._isStartEnd(pattern)) {
                  break;
                }
              } while (nextStart < self2._counters.length);
              if (result.length - 2 < self2.MIN_ENCODED_CHARS || !self2._isStartEnd(pattern)) {
                return null;
              }
              if (!self2._verifyWhitespace(start.startCounter, nextStart - 8)) {
                return null;
              }
              if (!self2._validateResult(result, start.startCounter)) {
                return null;
              }
              nextStart = nextStart > self2._counters.length ? self2._counters.length : nextStart;
              end = start.start + self2._sumCounters(start.startCounter, nextStart - 8);
              return {
                code: result.join(""),
                start: start.start,
                end,
                startInfo: start,
                decodedCodes: result
              };
            };
            CodabarReader.prototype._verifyWhitespace = function(startCounter, endCounter) {
              if (startCounter - 1 <= 0 || this._counters[startCounter - 1] >= this._calculatePatternLength(startCounter) / 2) {
                if (endCounter + 8 >= this._counters.length || this._counters[endCounter + 7] >= this._calculatePatternLength(endCounter) / 2) {
                  return true;
                }
              }
              return false;
            };
            CodabarReader.prototype._calculatePatternLength = function(offset) {
              var i, sum = 0;
              for (i = offset; i < offset + 7; i++) {
                sum += this._counters[i];
              }
              return sum;
            };
            CodabarReader.prototype._thresholdResultPattern = function(result, startCounter) {
              var self2 = this, categorization = {
                space: {
                  narrow: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE },
                  wide: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE }
                },
                bar: {
                  narrow: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE },
                  wide: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE }
                }
              }, kind, cat, i, j, pos = startCounter, pattern;
              for (i = 0; i < result.length; i++) {
                pattern = self2._charToPattern(result[i]);
                for (j = 6; j >= 0; j--) {
                  kind = (j & 1) === 2 ? categorization.bar : categorization.space;
                  cat = (pattern & 1) === 1 ? kind.wide : kind.narrow;
                  cat.size += self2._counters[pos + j];
                  cat.counts++;
                  pattern >>= 1;
                }
                pos += 8;
              }
              ["space", "bar"].forEach(function(key) {
                var newkind = categorization[key];
                newkind.wide.min = Math.floor((newkind.narrow.size / newkind.narrow.counts + newkind.wide.size / newkind.wide.counts) / 2);
                newkind.narrow.max = Math.ceil(newkind.wide.min);
                newkind.wide.max = Math.ceil((newkind.wide.size * self2.MAX_ACCEPTABLE + self2.PADDING) / newkind.wide.counts);
              });
              return categorization;
            };
            CodabarReader.prototype._charToPattern = function(char) {
              var self2 = this, charCode = char.charCodeAt(0), i;
              for (i = 0; i < self2.ALPHABET.length; i++) {
                if (self2.ALPHABET[i] === charCode) {
                  return self2.CHARACTER_ENCODINGS[i];
                }
              }
              return 0;
            };
            CodabarReader.prototype._validateResult = function(result, startCounter) {
              var self2 = this, thresholds = self2._thresholdResultPattern(result, startCounter), i, j, kind, cat, size, pos = startCounter, pattern;
              for (i = 0; i < result.length; i++) {
                pattern = self2._charToPattern(result[i]);
                for (j = 6; j >= 0; j--) {
                  kind = (j & 1) === 0 ? thresholds.bar : thresholds.space;
                  cat = (pattern & 1) === 1 ? kind.wide : kind.narrow;
                  size = self2._counters[pos + j];
                  if (size < cat.min || size > cat.max) {
                    return false;
                  }
                  pattern >>= 1;
                }
                pos += 8;
              }
              return true;
            };
            CodabarReader.prototype._patternToChar = function(pattern) {
              var i, self2 = this;
              for (i = 0; i < self2.CHARACTER_ENCODINGS.length; i++) {
                if (self2.CHARACTER_ENCODINGS[i] === pattern) {
                  return String.fromCharCode(self2.ALPHABET[i]);
                }
              }
              return -1;
            };
            CodabarReader.prototype._computeAlternatingThreshold = function(offset, end) {
              var i, min = Number.MAX_VALUE, max = 0, counter;
              for (i = offset; i < end; i += 2) {
                counter = this._counters[i];
                if (counter > max) {
                  max = counter;
                }
                if (counter < min) {
                  min = counter;
                }
              }
              return (min + max) / 2 | 0;
            };
            CodabarReader.prototype._toPattern = function(offset) {
              var numCounters = 7, end = offset + numCounters, barThreshold, spaceThreshold, bitmask = 1 << numCounters - 1, pattern = 0, i, threshold;
              if (end > this._counters.length) {
                return -1;
              }
              barThreshold = this._computeAlternatingThreshold(offset, end);
              spaceThreshold = this._computeAlternatingThreshold(offset + 1, end);
              for (i = 0; i < numCounters; i++) {
                threshold = (i & 1) === 0 ? barThreshold : spaceThreshold;
                if (this._counters[offset + i] > threshold) {
                  pattern |= bitmask;
                }
                bitmask >>= 1;
              }
              return pattern;
            };
            CodabarReader.prototype._isStartEnd = function(pattern) {
              var i;
              for (i = 0; i < this.START_END.length; i++) {
                if (this.START_END[i] === pattern) {
                  return true;
                }
              }
              return false;
            };
            CodabarReader.prototype._sumCounters = function(start, end) {
              var i, sum = 0;
              for (i = start; i < end; i++) {
                sum += this._counters[i];
              }
              return sum;
            };
            CodabarReader.prototype._findStart = function() {
              var self2 = this, i, pattern, start = self2._nextUnset(self2._row), end;
              for (i = 1; i < this._counters.length; i++) {
                pattern = self2._toPattern(i);
                if (pattern !== -1 && self2._isStartEnd(pattern)) {
                  start += self2._sumCounters(0, i);
                  end = start + self2._sumCounters(i, i + 8);
                  return {
                    start,
                    end,
                    startCounter: i,
                    endCounter: i + 8
                  };
                }
              }
            };
            __webpack_exports__["a"] = CodabarReader;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__barcode_reader__ = __webpack_require__(1);
            function Code128Reader() {
              __WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].call(this);
            }
            var properties = {
              CODE_SHIFT: { value: 98 },
              CODE_C: { value: 99 },
              CODE_B: { value: 100 },
              CODE_A: { value: 101 },
              START_CODE_A: { value: 103 },
              START_CODE_B: { value: 104 },
              START_CODE_C: { value: 105 },
              STOP_CODE: { value: 106 },
              CODE_PATTERN: { value: [[2, 1, 2, 2, 2, 2], [2, 2, 2, 1, 2, 2], [2, 2, 2, 2, 2, 1], [1, 2, 1, 2, 2, 3], [1, 2, 1, 3, 2, 2], [1, 3, 1, 2, 2, 2], [1, 2, 2, 2, 1, 3], [1, 2, 2, 3, 1, 2], [1, 3, 2, 2, 1, 2], [2, 2, 1, 2, 1, 3], [2, 2, 1, 3, 1, 2], [2, 3, 1, 2, 1, 2], [1, 1, 2, 2, 3, 2], [1, 2, 2, 1, 3, 2], [1, 2, 2, 2, 3, 1], [1, 1, 3, 2, 2, 2], [1, 2, 3, 1, 2, 2], [1, 2, 3, 2, 2, 1], [2, 2, 3, 2, 1, 1], [2, 2, 1, 1, 3, 2], [2, 2, 1, 2, 3, 1], [2, 1, 3, 2, 1, 2], [2, 2, 3, 1, 1, 2], [3, 1, 2, 1, 3, 1], [3, 1, 1, 2, 2, 2], [3, 2, 1, 1, 2, 2], [3, 2, 1, 2, 2, 1], [3, 1, 2, 2, 1, 2], [3, 2, 2, 1, 1, 2], [3, 2, 2, 2, 1, 1], [2, 1, 2, 1, 2, 3], [2, 1, 2, 3, 2, 1], [2, 3, 2, 1, 2, 1], [1, 1, 1, 3, 2, 3], [1, 3, 1, 1, 2, 3], [1, 3, 1, 3, 2, 1], [1, 1, 2, 3, 1, 3], [1, 3, 2, 1, 1, 3], [1, 3, 2, 3, 1, 1], [2, 1, 1, 3, 1, 3], [2, 3, 1, 1, 1, 3], [2, 3, 1, 3, 1, 1], [1, 1, 2, 1, 3, 3], [1, 1, 2, 3, 3, 1], [1, 3, 2, 1, 3, 1], [1, 1, 3, 1, 2, 3], [1, 1, 3, 3, 2, 1], [1, 3, 3, 1, 2, 1], [3, 1, 3, 1, 2, 1], [2, 1, 1, 3, 3, 1], [2, 3, 1, 1, 3, 1], [2, 1, 3, 1, 1, 3], [2, 1, 3, 3, 1, 1], [2, 1, 3, 1, 3, 1], [3, 1, 1, 1, 2, 3], [3, 1, 1, 3, 2, 1], [3, 3, 1, 1, 2, 1], [3, 1, 2, 1, 1, 3], [3, 1, 2, 3, 1, 1], [3, 3, 2, 1, 1, 1], [3, 1, 4, 1, 1, 1], [2, 2, 1, 4, 1, 1], [4, 3, 1, 1, 1, 1], [1, 1, 1, 2, 2, 4], [1, 1, 1, 4, 2, 2], [1, 2, 1, 1, 2, 4], [1, 2, 1, 4, 2, 1], [1, 4, 1, 1, 2, 2], [1, 4, 1, 2, 2, 1], [1, 1, 2, 2, 1, 4], [1, 1, 2, 4, 1, 2], [1, 2, 2, 1, 1, 4], [1, 2, 2, 4, 1, 1], [1, 4, 2, 1, 1, 2], [1, 4, 2, 2, 1, 1], [2, 4, 1, 2, 1, 1], [2, 2, 1, 1, 1, 4], [4, 1, 3, 1, 1, 1], [2, 4, 1, 1, 1, 2], [1, 3, 4, 1, 1, 1], [1, 1, 1, 2, 4, 2], [1, 2, 1, 1, 4, 2], [1, 2, 1, 2, 4, 1], [1, 1, 4, 2, 1, 2], [1, 2, 4, 1, 1, 2], [1, 2, 4, 2, 1, 1], [4, 1, 1, 2, 1, 2], [4, 2, 1, 1, 1, 2], [4, 2, 1, 2, 1, 1], [2, 1, 2, 1, 4, 1], [2, 1, 4, 1, 2, 1], [4, 1, 2, 1, 2, 1], [1, 1, 1, 1, 4, 3], [1, 1, 1, 3, 4, 1], [1, 3, 1, 1, 4, 1], [1, 1, 4, 1, 1, 3], [1, 1, 4, 3, 1, 1], [4, 1, 1, 1, 1, 3], [4, 1, 1, 3, 1, 1], [1, 1, 3, 1, 4, 1], [1, 1, 4, 1, 3, 1], [3, 1, 1, 1, 4, 1], [4, 1, 1, 1, 3, 1], [2, 1, 1, 4, 1, 2], [2, 1, 1, 2, 1, 4], [2, 1, 1, 2, 3, 2], [2, 3, 3, 1, 1, 1, 2]] },
              SINGLE_CODE_ERROR: { value: 0.64 },
              AVG_CODE_ERROR: { value: 0.3 },
              FORMAT: { value: "code_128", writeable: false },
              MODULE_INDICES: { value: { bar: [0, 2, 4], space: [1, 3, 5] } }
            };
            Code128Reader.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].prototype, properties);
            Code128Reader.prototype.constructor = Code128Reader;
            Code128Reader.prototype._decodeCode = function(start, correction) {
              var counter = [0, 0, 0, 0, 0, 0], i, self2 = this, offset = start, isWhite = !self2._row[offset], counterPos = 0, bestMatch = {
                error: Number.MAX_VALUE,
                code: -1,
                start,
                end: start,
                correction: {
                  bar: 1,
                  space: 1
                }
              }, code, error;
              for (i = offset; i < self2._row.length; i++) {
                if (self2._row[i] ^ isWhite) {
                  counter[counterPos]++;
                } else {
                  if (counterPos === counter.length - 1) {
                    if (correction) {
                      self2._correct(counter, correction);
                    }
                    for (code = 0; code < self2.CODE_PATTERN.length; code++) {
                      error = self2._matchPattern(counter, self2.CODE_PATTERN[code]);
                      if (error < bestMatch.error) {
                        bestMatch.code = code;
                        bestMatch.error = error;
                      }
                    }
                    bestMatch.end = i;
                    if (bestMatch.code === -1 || bestMatch.error > self2.AVG_CODE_ERROR) {
                      return null;
                    }
                    if (self2.CODE_PATTERN[bestMatch.code]) {
                      bestMatch.correction.bar = calculateCorrection(self2.CODE_PATTERN[bestMatch.code], counter, this.MODULE_INDICES.bar);
                      bestMatch.correction.space = calculateCorrection(self2.CODE_PATTERN[bestMatch.code], counter, this.MODULE_INDICES.space);
                    }
                    return bestMatch;
                  } else {
                    counterPos++;
                  }
                  counter[counterPos] = 1;
                  isWhite = !isWhite;
                }
              }
              return null;
            };
            Code128Reader.prototype._correct = function(counter, correction) {
              this._correctBars(counter, correction.bar, this.MODULE_INDICES.bar);
              this._correctBars(counter, correction.space, this.MODULE_INDICES.space);
            };
            Code128Reader.prototype._findStart = function() {
              var counter = [0, 0, 0, 0, 0, 0], i, self2 = this, offset = self2._nextSet(self2._row), isWhite = false, counterPos = 0, bestMatch = {
                error: Number.MAX_VALUE,
                code: -1,
                start: 0,
                end: 0,
                correction: {
                  bar: 1,
                  space: 1
                }
              }, code, error, j, sum;
              for (i = offset; i < self2._row.length; i++) {
                if (self2._row[i] ^ isWhite) {
                  counter[counterPos]++;
                } else {
                  if (counterPos === counter.length - 1) {
                    sum = 0;
                    for (j = 0; j < counter.length; j++) {
                      sum += counter[j];
                    }
                    for (code = self2.START_CODE_A; code <= self2.START_CODE_C; code++) {
                      error = self2._matchPattern(counter, self2.CODE_PATTERN[code]);
                      if (error < bestMatch.error) {
                        bestMatch.code = code;
                        bestMatch.error = error;
                      }
                    }
                    if (bestMatch.error < self2.AVG_CODE_ERROR) {
                      bestMatch.start = i - sum;
                      bestMatch.end = i;
                      bestMatch.correction.bar = calculateCorrection(self2.CODE_PATTERN[bestMatch.code], counter, this.MODULE_INDICES.bar);
                      bestMatch.correction.space = calculateCorrection(self2.CODE_PATTERN[bestMatch.code], counter, this.MODULE_INDICES.space);
                      return bestMatch;
                    }
                    for (j = 0; j < 4; j++) {
                      counter[j] = counter[j + 2];
                    }
                    counter[4] = 0;
                    counter[5] = 0;
                    counterPos--;
                  } else {
                    counterPos++;
                  }
                  counter[counterPos] = 1;
                  isWhite = !isWhite;
                }
              }
              return null;
            };
            Code128Reader.prototype._decode = function() {
              var self2 = this, startInfo = self2._findStart(), code = null, done = false, result = [], multiplier = 0, checksum = 0, codeset, rawResult = [], decodedCodes = [], shiftNext = false, unshift, removeLastCharacter = true;
              if (startInfo === null) {
                return null;
              }
              code = {
                code: startInfo.code,
                start: startInfo.start,
                end: startInfo.end,
                correction: {
                  bar: startInfo.correction.bar,
                  space: startInfo.correction.space
                }
              };
              decodedCodes.push(code);
              checksum = code.code;
              switch (code.code) {
                case self2.START_CODE_A:
                  codeset = self2.CODE_A;
                  break;
                case self2.START_CODE_B:
                  codeset = self2.CODE_B;
                  break;
                case self2.START_CODE_C:
                  codeset = self2.CODE_C;
                  break;
                default:
                  return null;
              }
              while (!done) {
                unshift = shiftNext;
                shiftNext = false;
                code = self2._decodeCode(code.end, code.correction);
                if (code !== null) {
                  if (code.code !== self2.STOP_CODE) {
                    removeLastCharacter = true;
                  }
                  if (code.code !== self2.STOP_CODE) {
                    rawResult.push(code.code);
                    multiplier++;
                    checksum += multiplier * code.code;
                  }
                  decodedCodes.push(code);
                  switch (codeset) {
                    case self2.CODE_A:
                      if (code.code < 64) {
                        result.push(String.fromCharCode(32 + code.code));
                      } else if (code.code < 96) {
                        result.push(String.fromCharCode(code.code - 64));
                      } else {
                        if (code.code !== self2.STOP_CODE) {
                          removeLastCharacter = false;
                        }
                        switch (code.code) {
                          case self2.CODE_SHIFT:
                            shiftNext = true;
                            codeset = self2.CODE_B;
                            break;
                          case self2.CODE_B:
                            codeset = self2.CODE_B;
                            break;
                          case self2.CODE_C:
                            codeset = self2.CODE_C;
                            break;
                          case self2.STOP_CODE:
                            done = true;
                            break;
                        }
                      }
                      break;
                    case self2.CODE_B:
                      if (code.code < 96) {
                        result.push(String.fromCharCode(32 + code.code));
                      } else {
                        if (code.code !== self2.STOP_CODE) {
                          removeLastCharacter = false;
                        }
                        switch (code.code) {
                          case self2.CODE_SHIFT:
                            shiftNext = true;
                            codeset = self2.CODE_A;
                            break;
                          case self2.CODE_A:
                            codeset = self2.CODE_A;
                            break;
                          case self2.CODE_C:
                            codeset = self2.CODE_C;
                            break;
                          case self2.STOP_CODE:
                            done = true;
                            break;
                        }
                      }
                      break;
                    case self2.CODE_C:
                      if (code.code < 100) {
                        result.push(code.code < 10 ? "0" + code.code : code.code);
                      } else {
                        if (code.code !== self2.STOP_CODE) {
                          removeLastCharacter = false;
                        }
                        switch (code.code) {
                          case self2.CODE_A:
                            codeset = self2.CODE_A;
                            break;
                          case self2.CODE_B:
                            codeset = self2.CODE_B;
                            break;
                          case self2.STOP_CODE:
                            done = true;
                            break;
                        }
                      }
                      break;
                  }
                } else {
                  done = true;
                }
                if (unshift) {
                  codeset = codeset === self2.CODE_A ? self2.CODE_B : self2.CODE_A;
                }
              }
              if (code === null) {
                return null;
              }
              code.end = self2._nextUnset(self2._row, code.end);
              if (!self2._verifyTrailingWhitespace(code)) {
                return null;
              }
              checksum -= multiplier * rawResult[rawResult.length - 1];
              if (checksum % 103 !== rawResult[rawResult.length - 1]) {
                return null;
              }
              if (!result.length) {
                return null;
              }
              if (removeLastCharacter) {
                result.splice(result.length - 1, 1);
              }
              return {
                code: result.join(""),
                start: startInfo.start,
                end: code.end,
                codeset,
                startInfo,
                decodedCodes,
                endInfo: code
              };
            };
            __WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].prototype._verifyTrailingWhitespace = function(endInfo) {
              var self2 = this, trailingWhitespaceEnd;
              trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;
              if (trailingWhitespaceEnd < self2._row.length) {
                if (self2._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
                  return endInfo;
                }
              }
              return null;
            };
            function calculateCorrection(expected, normalized, indices) {
              var length = indices.length, sumNormalized = 0, sumExpected = 0;
              while (length--) {
                sumExpected += expected[indices[length]];
                sumNormalized += normalized[indices[length]];
              }
              return sumExpected / sumNormalized;
            }
            __webpack_exports__["a"] = Code128Reader;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__code_39_reader__ = __webpack_require__(31);
            function Code39VINReader() {
              __WEBPACK_IMPORTED_MODULE_0__code_39_reader__["a"].call(this);
            }
            var patterns = {
              IOQ: /[IOQ]/g,
              AZ09: /[A-Z0-9]{17}/
            };
            Code39VINReader.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__code_39_reader__["a"].prototype);
            Code39VINReader.prototype.constructor = Code39VINReader;
            Code39VINReader.prototype._decode = function() {
              var result = __WEBPACK_IMPORTED_MODULE_0__code_39_reader__["a"].prototype._decode.apply(this);
              if (!result) {
                return null;
              }
              var code = result.code;
              if (!code) {
                return null;
              }
              code = code.replace(patterns.IOQ, "");
              if (!code.match(patterns.AZ09)) {
                if (true) {
                  console.log("Failed AZ09 pattern code:", code);
                }
                return null;
              }
              if (!this._checkChecksum(code)) {
                return null;
              }
              result.code = code;
              return result;
            };
            Code39VINReader.prototype._checkChecksum = function(code) {
              return !!code;
            };
            __webpack_exports__["a"] = Code39VINReader;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__barcode_reader__ = __webpack_require__(1);
            var __WEBPACK_IMPORTED_MODULE_1__common_array_helper__ = __webpack_require__(3);
            function Code93Reader() {
              __WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].call(this);
            }
            var ALPHABETH_STRING = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%abcd*";
            var properties = {
              ALPHABETH_STRING: { value: ALPHABETH_STRING },
              ALPHABET: { value: ALPHABETH_STRING.split("").map(function(char) {
                return char.charCodeAt(0);
              }) },
              CHARACTER_ENCODINGS: { value: [276, 328, 324, 322, 296, 292, 290, 336, 274, 266, 424, 420, 418, 404, 402, 394, 360, 356, 354, 308, 282, 344, 332, 326, 300, 278, 436, 434, 428, 422, 406, 410, 364, 358, 310, 314, 302, 468, 466, 458, 366, 374, 430, 294, 474, 470, 306, 350] },
              ASTERISK: { value: 350 },
              FORMAT: { value: "code_93", writeable: false }
            };
            Code93Reader.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].prototype, properties);
            Code93Reader.prototype.constructor = Code93Reader;
            Code93Reader.prototype._decode = function() {
              var self2 = this, counters = [0, 0, 0, 0, 0, 0], result = [], start = self2._findStart(), decodedChar, lastStart, pattern, nextStart;
              if (!start) {
                return null;
              }
              nextStart = self2._nextSet(self2._row, start.end);
              do {
                counters = self2._toCounters(nextStart, counters);
                pattern = self2._toPattern(counters);
                if (pattern < 0) {
                  return null;
                }
                decodedChar = self2._patternToChar(pattern);
                if (decodedChar < 0) {
                  return null;
                }
                result.push(decodedChar);
                lastStart = nextStart;
                nextStart += __WEBPACK_IMPORTED_MODULE_1__common_array_helper__["a"].sum(counters);
                nextStart = self2._nextSet(self2._row, nextStart);
              } while (decodedChar !== "*");
              result.pop();
              if (!result.length) {
                return null;
              }
              if (!self2._verifyEnd(lastStart, nextStart, counters)) {
                return null;
              }
              if (!self2._verifyChecksums(result)) {
                return null;
              }
              result = result.slice(0, result.length - 2);
              if ((result = self2._decodeExtended(result)) === null) {
                return null;
              }
              ;
              return {
                code: result.join(""),
                start: start.start,
                end: nextStart,
                startInfo: start,
                decodedCodes: result
              };
            };
            Code93Reader.prototype._verifyEnd = function(lastStart, nextStart) {
              if (lastStart === nextStart || !this._row[nextStart]) {
                return false;
              }
              return true;
            };
            Code93Reader.prototype._patternToChar = function(pattern) {
              var i, self2 = this;
              for (i = 0; i < self2.CHARACTER_ENCODINGS.length; i++) {
                if (self2.CHARACTER_ENCODINGS[i] === pattern) {
                  return String.fromCharCode(self2.ALPHABET[i]);
                }
              }
              return -1;
            };
            Code93Reader.prototype._toPattern = function(counters) {
              var numCounters = counters.length;
              var pattern = 0;
              var sum = 0;
              for (var i = 0; i < numCounters; i++) {
                sum += counters[i];
              }
              for (var _i = 0; _i < numCounters; _i++) {
                var normalized = Math.round(counters[_i] * 9 / sum);
                if (normalized < 1 || normalized > 4) {
                  return -1;
                }
                if ((_i & 1) === 0) {
                  for (var j = 0; j < normalized; j++) {
                    pattern = pattern << 1 | 1;
                  }
                } else {
                  pattern <<= normalized;
                }
              }
              return pattern;
            };
            Code93Reader.prototype._findStart = function() {
              var self2 = this, offset = self2._nextSet(self2._row), patternStart = offset, counter = [0, 0, 0, 0, 0, 0], counterPos = 0, isWhite = false, i, j, whiteSpaceMustStart;
              for (i = offset; i < self2._row.length; i++) {
                if (self2._row[i] ^ isWhite) {
                  counter[counterPos]++;
                } else {
                  if (counterPos === counter.length - 1) {
                    if (self2._toPattern(counter) === self2.ASTERISK) {
                      whiteSpaceMustStart = Math.floor(Math.max(0, patternStart - (i - patternStart) / 4));
                      if (self2._matchRange(whiteSpaceMustStart, patternStart, 0)) {
                        return {
                          start: patternStart,
                          end: i
                        };
                      }
                    }
                    patternStart += counter[0] + counter[1];
                    for (j = 0; j < 4; j++) {
                      counter[j] = counter[j + 2];
                    }
                    counter[4] = 0;
                    counter[5] = 0;
                    counterPos--;
                  } else {
                    counterPos++;
                  }
                  counter[counterPos] = 1;
                  isWhite = !isWhite;
                }
              }
              return null;
            };
            Code93Reader.prototype._decodeExtended = function(charArray) {
              var length = charArray.length;
              var result = [];
              for (var i = 0; i < length; i++) {
                var char = charArray[i];
                if (char >= "a" && char <= "d") {
                  if (i > length - 2) {
                    return null;
                  }
                  var nextChar = charArray[++i];
                  var nextCharCode = nextChar.charCodeAt(0);
                  var decodedChar = void 0;
                  switch (char) {
                    case "a":
                      if (nextChar >= "A" && nextChar <= "Z") {
                        decodedChar = String.fromCharCode(nextCharCode - 64);
                      } else {
                        return null;
                      }
                      break;
                    case "b":
                      if (nextChar >= "A" && nextChar <= "E") {
                        decodedChar = String.fromCharCode(nextCharCode - 38);
                      } else if (nextChar >= "F" && nextChar <= "J") {
                        decodedChar = String.fromCharCode(nextCharCode - 11);
                      } else if (nextChar >= "K" && nextChar <= "O") {
                        decodedChar = String.fromCharCode(nextCharCode + 16);
                      } else if (nextChar >= "P" && nextChar <= "S") {
                        decodedChar = String.fromCharCode(nextCharCode + 43);
                      } else if (nextChar >= "T" && nextChar <= "Z") {
                        decodedChar = String.fromCharCode(127);
                      } else {
                        return null;
                      }
                      break;
                    case "c":
                      if (nextChar >= "A" && nextChar <= "O") {
                        decodedChar = String.fromCharCode(nextCharCode - 32);
                      } else if (nextChar === "Z") {
                        decodedChar = ":";
                      } else {
                        return null;
                      }
                      break;
                    case "d":
                      if (nextChar >= "A" && nextChar <= "Z") {
                        decodedChar = String.fromCharCode(nextCharCode + 32);
                      } else {
                        return null;
                      }
                      break;
                  }
                  result.push(decodedChar);
                } else {
                  result.push(char);
                }
              }
              return result;
            };
            Code93Reader.prototype._verifyChecksums = function(charArray) {
              return this._matchCheckChar(charArray, charArray.length - 2, 20) && this._matchCheckChar(charArray, charArray.length - 1, 15);
            };
            Code93Reader.prototype._matchCheckChar = function(charArray, index, maxWeight) {
              var _this = this;
              var arrayToCheck = charArray.slice(0, index);
              var length = arrayToCheck.length;
              var weightedSums = arrayToCheck.reduce(function(sum, char, i) {
                var weight = (i * -1 + (length - 1)) % maxWeight + 1;
                var value = _this.ALPHABET.indexOf(char.charCodeAt(0));
                return sum + weight * value;
              }, 0);
              var checkChar = this.ALPHABET[weightedSums % 47];
              return checkChar === charArray[index].charCodeAt(0);
            };
            __webpack_exports__["a"] = Code93Reader;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__ean_reader__ = __webpack_require__(4);
            function EAN2Reader() {
              __WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].call(this);
            }
            var properties = {
              FORMAT: { value: "ean_2", writeable: false }
            };
            EAN2Reader.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype, properties);
            EAN2Reader.prototype.constructor = EAN2Reader;
            EAN2Reader.prototype.decode = function(row, start) {
              this._row = row;
              var counters = [0, 0, 0, 0], codeFrequency = 0, i = 0, offset = start, end = this._row.length, code, result = [], decodedCodes = [];
              for (i = 0; i < 2 && offset < end; i++) {
                code = this._decodeCode(offset);
                if (!code) {
                  return null;
                }
                decodedCodes.push(code);
                result.push(code.code % 10);
                if (code.code >= this.CODE_G_START) {
                  codeFrequency |= 1 << 1 - i;
                }
                if (i != 1) {
                  offset = this._nextSet(this._row, code.end);
                  offset = this._nextUnset(this._row, offset);
                }
              }
              if (result.length != 2 || parseInt(result.join("")) % 4 !== codeFrequency) {
                return null;
              }
              return {
                code: result.join(""),
                decodedCodes,
                end: code.end
              };
            };
            __webpack_exports__["a"] = EAN2Reader;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__ean_reader__ = __webpack_require__(4);
            function EAN5Reader() {
              __WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].call(this);
            }
            var properties = {
              FORMAT: { value: "ean_5", writeable: false }
            };
            var CHECK_DIGIT_ENCODINGS = [24, 20, 18, 17, 12, 6, 3, 10, 9, 5];
            EAN5Reader.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype, properties);
            EAN5Reader.prototype.constructor = EAN5Reader;
            EAN5Reader.prototype.decode = function(row, start) {
              this._row = row;
              var counters = [0, 0, 0, 0], codeFrequency = 0, i = 0, offset = start, end = this._row.length, code, result = [], decodedCodes = [];
              for (i = 0; i < 5 && offset < end; i++) {
                code = this._decodeCode(offset);
                if (!code) {
                  return null;
                }
                decodedCodes.push(code);
                result.push(code.code % 10);
                if (code.code >= this.CODE_G_START) {
                  codeFrequency |= 1 << 4 - i;
                }
                if (i != 4) {
                  offset = this._nextSet(this._row, code.end);
                  offset = this._nextUnset(this._row, offset);
                }
              }
              if (result.length != 5) {
                return null;
              }
              if (extensionChecksum(result) !== determineCheckDigit(codeFrequency)) {
                return null;
              }
              return {
                code: result.join(""),
                decodedCodes,
                end: code.end
              };
            };
            function determineCheckDigit(codeFrequency) {
              var i;
              for (i = 0; i < 10; i++) {
                if (codeFrequency === CHECK_DIGIT_ENCODINGS[i]) {
                  return i;
                }
              }
              return null;
            }
            function extensionChecksum(result) {
              var length = result.length, sum = 0, i;
              for (i = length - 2; i >= 0; i -= 2) {
                sum += result[i];
              }
              sum *= 3;
              for (i = length - 1; i >= 0; i -= 2) {
                sum += result[i];
              }
              sum *= 3;
              return sum % 10;
            }
            __webpack_exports__["a"] = EAN5Reader;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__ean_reader__ = __webpack_require__(4);
            function EAN8Reader(opts, supplements) {
              __WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].call(this, opts, supplements);
            }
            var properties = {
              FORMAT: { value: "ean_8", writeable: false }
            };
            EAN8Reader.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype, properties);
            EAN8Reader.prototype.constructor = EAN8Reader;
            EAN8Reader.prototype._decodePayload = function(code, result, decodedCodes) {
              var i, self2 = this;
              for (i = 0; i < 4; i++) {
                code = self2._decodeCode(code.end, self2.CODE_G_START);
                if (!code) {
                  return null;
                }
                result.push(code.code);
                decodedCodes.push(code);
              }
              code = self2._findPattern(self2.MIDDLE_PATTERN, code.end, true, false);
              if (code === null) {
                return null;
              }
              decodedCodes.push(code);
              for (i = 0; i < 4; i++) {
                code = self2._decodeCode(code.end, self2.CODE_G_START);
                if (!code) {
                  return null;
                }
                decodedCodes.push(code);
                result.push(code.code);
              }
              return code;
            };
            __webpack_exports__["a"] = EAN8Reader;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ = __webpack_require__(28);
            var __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_merge__);
            var __WEBPACK_IMPORTED_MODULE_1__barcode_reader__ = __webpack_require__(1);
            function I2of5Reader(opts) {
              opts = __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default()(getDefaulConfig(), opts);
              __WEBPACK_IMPORTED_MODULE_1__barcode_reader__["a"].call(this, opts);
              this.barSpaceRatio = [1, 1];
              if (opts.normalizeBarSpaceWidth) {
                this.SINGLE_CODE_ERROR = 0.38;
                this.AVG_CODE_ERROR = 0.09;
              }
            }
            function getDefaulConfig() {
              var config = {};
              Object.keys(I2of5Reader.CONFIG_KEYS).forEach(function(key) {
                config[key] = I2of5Reader.CONFIG_KEYS[key].default;
              });
              return config;
            }
            var N = 1, W = 3, properties = {
              START_PATTERN: { value: [N, N, N, N] },
              STOP_PATTERN: { value: [N, N, W] },
              CODE_PATTERN: { value: [[N, N, W, W, N], [W, N, N, N, W], [N, W, N, N, W], [W, W, N, N, N], [N, N, W, N, W], [W, N, W, N, N], [N, W, W, N, N], [N, N, N, W, W], [W, N, N, W, N], [N, W, N, W, N]] },
              SINGLE_CODE_ERROR: { value: 0.78, writable: true },
              AVG_CODE_ERROR: { value: 0.38, writable: true },
              MAX_CORRECTION_FACTOR: { value: 5 },
              FORMAT: { value: "i2of5" }
            };
            I2of5Reader.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_1__barcode_reader__["a"].prototype, properties);
            I2of5Reader.prototype.constructor = I2of5Reader;
            I2of5Reader.prototype._matchPattern = function(counter, code) {
              if (this.config.normalizeBarSpaceWidth) {
                var i, counterSum = [0, 0], codeSum = [0, 0], correction = [0, 0], correctionRatio = this.MAX_CORRECTION_FACTOR, correctionRatioInverse = 1 / correctionRatio;
                for (i = 0; i < counter.length; i++) {
                  counterSum[i % 2] += counter[i];
                  codeSum[i % 2] += code[i];
                }
                correction[0] = codeSum[0] / counterSum[0];
                correction[1] = codeSum[1] / counterSum[1];
                correction[0] = Math.max(Math.min(correction[0], correctionRatio), correctionRatioInverse);
                correction[1] = Math.max(Math.min(correction[1], correctionRatio), correctionRatioInverse);
                this.barSpaceRatio = correction;
                for (i = 0; i < counter.length; i++) {
                  counter[i] *= this.barSpaceRatio[i % 2];
                }
              }
              return __WEBPACK_IMPORTED_MODULE_1__barcode_reader__["a"].prototype._matchPattern.call(this, counter, code);
            };
            I2of5Reader.prototype._findPattern = function(pattern, offset, isWhite, tryHarder) {
              var counter = [], self2 = this, i, counterPos = 0, bestMatch = {
                error: Number.MAX_VALUE,
                code: -1,
                start: 0,
                end: 0
              }, error, j, sum, normalized, epsilon = self2.AVG_CODE_ERROR;
              isWhite = isWhite || false;
              tryHarder = tryHarder || false;
              if (!offset) {
                offset = self2._nextSet(self2._row);
              }
              for (i = 0; i < pattern.length; i++) {
                counter[i] = 0;
              }
              for (i = offset; i < self2._row.length; i++) {
                if (self2._row[i] ^ isWhite) {
                  counter[counterPos]++;
                } else {
                  if (counterPos === counter.length - 1) {
                    sum = 0;
                    for (j = 0; j < counter.length; j++) {
                      sum += counter[j];
                    }
                    error = self2._matchPattern(counter, pattern);
                    if (error < epsilon) {
                      bestMatch.error = error;
                      bestMatch.start = i - sum;
                      bestMatch.end = i;
                      return bestMatch;
                    }
                    if (tryHarder) {
                      for (j = 0; j < counter.length - 2; j++) {
                        counter[j] = counter[j + 2];
                      }
                      counter[counter.length - 2] = 0;
                      counter[counter.length - 1] = 0;
                      counterPos--;
                    } else {
                      return null;
                    }
                  } else {
                    counterPos++;
                  }
                  counter[counterPos] = 1;
                  isWhite = !isWhite;
                }
              }
              return null;
            };
            I2of5Reader.prototype._findStart = function() {
              var self2 = this, leadingWhitespaceStart, offset = self2._nextSet(self2._row), startInfo, narrowBarWidth = 1;
              while (!startInfo) {
                startInfo = self2._findPattern(self2.START_PATTERN, offset, false, true);
                if (!startInfo) {
                  return null;
                }
                narrowBarWidth = Math.floor((startInfo.end - startInfo.start) / 4);
                leadingWhitespaceStart = startInfo.start - narrowBarWidth * 10;
                if (leadingWhitespaceStart >= 0) {
                  if (self2._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
                    return startInfo;
                  }
                }
                offset = startInfo.end;
                startInfo = null;
              }
            };
            I2of5Reader.prototype._verifyTrailingWhitespace = function(endInfo) {
              var self2 = this, trailingWhitespaceEnd;
              trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;
              if (trailingWhitespaceEnd < self2._row.length) {
                if (self2._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
                  return endInfo;
                }
              }
              return null;
            };
            I2of5Reader.prototype._findEnd = function() {
              var self2 = this, endInfo, tmp;
              self2._row.reverse();
              endInfo = self2._findPattern(self2.STOP_PATTERN);
              self2._row.reverse();
              if (endInfo === null) {
                return null;
              }
              tmp = endInfo.start;
              endInfo.start = self2._row.length - endInfo.end;
              endInfo.end = self2._row.length - tmp;
              return endInfo !== null ? self2._verifyTrailingWhitespace(endInfo) : null;
            };
            I2of5Reader.prototype._decodePair = function(counterPair) {
              var i, code, codes = [], self2 = this;
              for (i = 0; i < counterPair.length; i++) {
                code = self2._decodeCode(counterPair[i]);
                if (!code) {
                  return null;
                }
                codes.push(code);
              }
              return codes;
            };
            I2of5Reader.prototype._decodeCode = function(counter) {
              var j, self2 = this, sum = 0, normalized, error, epsilon = self2.AVG_CODE_ERROR, code, bestMatch = {
                error: Number.MAX_VALUE,
                code: -1,
                start: 0,
                end: 0
              };
              for (j = 0; j < counter.length; j++) {
                sum += counter[j];
              }
              for (code = 0; code < self2.CODE_PATTERN.length; code++) {
                error = self2._matchPattern(counter, self2.CODE_PATTERN[code]);
                if (error < bestMatch.error) {
                  bestMatch.code = code;
                  bestMatch.error = error;
                }
              }
              if (bestMatch.error < epsilon) {
                return bestMatch;
              }
            };
            I2of5Reader.prototype._decodePayload = function(counters, result, decodedCodes) {
              var i, self2 = this, pos = 0, counterLength = counters.length, counterPair = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], codes;
              while (pos < counterLength) {
                for (i = 0; i < 5; i++) {
                  counterPair[0][i] = counters[pos] * this.barSpaceRatio[0];
                  counterPair[1][i] = counters[pos + 1] * this.barSpaceRatio[1];
                  pos += 2;
                }
                codes = self2._decodePair(counterPair);
                if (!codes) {
                  return null;
                }
                for (i = 0; i < codes.length; i++) {
                  result.push(codes[i].code + "");
                  decodedCodes.push(codes[i]);
                }
              }
              return codes;
            };
            I2of5Reader.prototype._verifyCounterLength = function(counters) {
              return counters.length % 10 === 0;
            };
            I2of5Reader.prototype._decode = function() {
              var startInfo, endInfo, self2 = this, code, result = [], decodedCodes = [], counters;
              startInfo = self2._findStart();
              if (!startInfo) {
                return null;
              }
              decodedCodes.push(startInfo);
              endInfo = self2._findEnd();
              if (!endInfo) {
                return null;
              }
              counters = self2._fillCounters(startInfo.end, endInfo.start, false);
              if (!self2._verifyCounterLength(counters)) {
                return null;
              }
              code = self2._decodePayload(counters, result, decodedCodes);
              if (!code) {
                return null;
              }
              if (result.length % 2 !== 0 || result.length < 6) {
                return null;
              }
              decodedCodes.push(endInfo);
              return {
                code: result.join(""),
                start: startInfo.start,
                end: endInfo.end,
                startInfo,
                decodedCodes
              };
            };
            I2of5Reader.CONFIG_KEYS = {
              normalizeBarSpaceWidth: {
                "type": "boolean",
                "default": false,
                "description": "If true, the reader tries to normalize thewidth-difference between bars and spaces"
              }
            };
            __webpack_exports__["a"] = I2of5Reader;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__ean_reader__ = __webpack_require__(4);
            function UPCEReader(opts, supplements) {
              __WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].call(this, opts, supplements);
            }
            var properties = {
              CODE_FREQUENCY: { value: [[56, 52, 50, 49, 44, 38, 35, 42, 41, 37], [7, 11, 13, 14, 19, 25, 28, 21, 22, 26]] },
              STOP_PATTERN: { value: [1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7] },
              FORMAT: { value: "upc_e", writeable: false }
            };
            UPCEReader.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype, properties);
            UPCEReader.prototype.constructor = UPCEReader;
            UPCEReader.prototype._decodePayload = function(code, result, decodedCodes) {
              var i, self2 = this, codeFrequency = 0;
              for (i = 0; i < 6; i++) {
                code = self2._decodeCode(code.end);
                if (!code) {
                  return null;
                }
                if (code.code >= self2.CODE_G_START) {
                  code.code = code.code - self2.CODE_G_START;
                  codeFrequency |= 1 << 5 - i;
                }
                result.push(code.code);
                decodedCodes.push(code);
              }
              if (!self2._determineParity(codeFrequency, result)) {
                return null;
              }
              return code;
            };
            UPCEReader.prototype._determineParity = function(codeFrequency, result) {
              var i, nrSystem;
              for (nrSystem = 0; nrSystem < this.CODE_FREQUENCY.length; nrSystem++) {
                for (i = 0; i < this.CODE_FREQUENCY[nrSystem].length; i++) {
                  if (codeFrequency === this.CODE_FREQUENCY[nrSystem][i]) {
                    result.unshift(nrSystem);
                    result.push(i);
                    return true;
                  }
                }
              }
              return false;
            };
            UPCEReader.prototype._convertToUPCA = function(result) {
              var upca = [result[0]], lastDigit = result[result.length - 2];
              if (lastDigit <= 2) {
                upca = upca.concat(result.slice(1, 3)).concat([lastDigit, 0, 0, 0, 0]).concat(result.slice(3, 6));
              } else if (lastDigit === 3) {
                upca = upca.concat(result.slice(1, 4)).concat([0, 0, 0, 0, 0]).concat(result.slice(4, 6));
              } else if (lastDigit === 4) {
                upca = upca.concat(result.slice(1, 5)).concat([0, 0, 0, 0, 0, result[5]]);
              } else {
                upca = upca.concat(result.slice(1, 6)).concat([0, 0, 0, 0, lastDigit]);
              }
              upca.push(result[result.length - 1]);
              return upca;
            };
            UPCEReader.prototype._checksum = function(result) {
              return __WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype._checksum.call(this, this._convertToUPCA(result));
            };
            UPCEReader.prototype._findEnd = function(offset, isWhite) {
              isWhite = true;
              return __WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype._findEnd.call(this, offset, isWhite);
            };
            UPCEReader.prototype._verifyTrailingWhitespace = function(endInfo) {
              var self2 = this, trailingWhitespaceEnd;
              trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;
              if (trailingWhitespaceEnd < self2._row.length) {
                if (self2._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
                  return endInfo;
                }
              }
            };
            __webpack_exports__["a"] = UPCEReader;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__ean_reader__ = __webpack_require__(4);
            function UPCReader(opts, supplements) {
              __WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].call(this, opts, supplements);
            }
            var properties = {
              FORMAT: { value: "upc_a", writeable: false }
            };
            UPCReader.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype, properties);
            UPCReader.prototype.constructor = UPCReader;
            UPCReader.prototype._decode = function() {
              var result = __WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype._decode.call(this);
              if (result && result.code && result.code.length === 13 && result.code.charAt(0) === "0") {
                result.code = result.code.substring(1);
                return result;
              }
              return null;
            };
            __webpack_exports__["a"] = UPCReader;
          },
          function(module2, exports2) {
            module2.exports = copy;
            function copy(out, a) {
              out[0] = a[0];
              out[1] = a[1];
              out[2] = a[2];
              out[3] = a[3];
              return out;
            }
          },
          function(module2, exports2) {
            module2.exports = create;
            function create() {
              var out = new Float32Array(4);
              out[0] = 1;
              out[1] = 0;
              out[2] = 0;
              out[3] = 1;
              return out;
            }
          },
          function(module2, exports2) {
            module2.exports = invert;
            function invert(out, a) {
              var a0 = a[0];
              var a1 = a[1];
              var a2 = a[2];
              var a3 = a[3];
              var det = a0 * a3 - a2 * a1;
              if (!det)
                return null;
              det = 1 / det;
              out[0] = a3 * det;
              out[1] = -a1 * det;
              out[2] = -a2 * det;
              out[3] = a0 * det;
              return out;
            }
          },
          function(module2, exports2) {
            module2.exports = scale;
            function scale(out, a, b) {
              out[0] = a[0] * b;
              out[1] = a[1] * b;
              return out;
            }
          },
          function(module2, exports2) {
            module2.exports = transformMat2;
            function transformMat2(out, a, m) {
              var x = a[0], y = a[1];
              out[0] = m[0] * x + m[2] * y;
              out[1] = m[1] * x + m[3] * y;
              return out;
            }
          },
          function(module2, exports2) {
            module2.exports = clone;
            function clone(a) {
              var out = new Float32Array(3);
              out[0] = a[0];
              out[1] = a[1];
              out[2] = a[2];
              return out;
            }
          },
          function(module2, exports2, __webpack_require__) {
            var hashClear = __webpack_require__(122), hashDelete = __webpack_require__(123), hashGet = __webpack_require__(124), hashHas = __webpack_require__(125), hashSet = __webpack_require__(126);
            function Hash(entries) {
              var index = -1, length = entries == null ? 0 : entries.length;
              this.clear();
              while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
              }
            }
            Hash.prototype.clear = hashClear;
            Hash.prototype["delete"] = hashDelete;
            Hash.prototype.get = hashGet;
            Hash.prototype.has = hashHas;
            Hash.prototype.set = hashSet;
            module2.exports = Hash;
          },
          function(module2, exports2, __webpack_require__) {
            var ListCache = __webpack_require__(10), stackClear = __webpack_require__(149), stackDelete = __webpack_require__(150), stackGet = __webpack_require__(151), stackHas = __webpack_require__(152), stackSet = __webpack_require__(153);
            function Stack(entries) {
              var data = this.__data__ = new ListCache(entries);
              this.size = data.size;
            }
            Stack.prototype.clear = stackClear;
            Stack.prototype["delete"] = stackDelete;
            Stack.prototype.get = stackGet;
            Stack.prototype.has = stackHas;
            Stack.prototype.set = stackSet;
            module2.exports = Stack;
          },
          function(module2, exports2, __webpack_require__) {
            var root = __webpack_require__(5);
            var Uint8Array2 = root.Uint8Array;
            module2.exports = Uint8Array2;
          },
          function(module2, exports2) {
            function apply(func, thisArg, args) {
              switch (args.length) {
                case 0:
                  return func.call(thisArg);
                case 1:
                  return func.call(thisArg, args[0]);
                case 2:
                  return func.call(thisArg, args[0], args[1]);
                case 3:
                  return func.call(thisArg, args[0], args[1], args[2]);
              }
              return func.apply(thisArg, args);
            }
            module2.exports = apply;
          },
          function(module2, exports2, __webpack_require__) {
            var baseTimes = __webpack_require__(107), isArguments = __webpack_require__(18), isArray = __webpack_require__(2), isBuffer = __webpack_require__(44), isIndex = __webpack_require__(15), isTypedArray = __webpack_require__(45);
            var objectProto = Object.prototype;
            var hasOwnProperty = objectProto.hasOwnProperty;
            function arrayLikeKeys(value, inherited) {
              var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
              for (var key in value) {
                if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
                  result.push(key);
                }
              }
              return result;
            }
            module2.exports = arrayLikeKeys;
          },
          function(module2, exports2) {
            function arrayMap(array, iteratee) {
              var index = -1, length = array == null ? 0 : array.length, result = Array(length);
              while (++index < length) {
                result[index] = iteratee(array[index], index, array);
              }
              return result;
            }
            module2.exports = arrayMap;
          },
          function(module2, exports2) {
            function arrayPush(array, values) {
              var index = -1, length = values.length, offset = array.length;
              while (++index < length) {
                array[offset + index] = values[index];
              }
              return array;
            }
            module2.exports = arrayPush;
          },
          function(module2, exports2, __webpack_require__) {
            var isObject = __webpack_require__(0);
            var objectCreate = Object.create;
            var baseCreate = function() {
              function object() {
              }
              return function(proto) {
                if (!isObject(proto)) {
                  return {};
                }
                if (objectCreate) {
                  return objectCreate(proto);
                }
                object.prototype = proto;
                var result = new object();
                object.prototype = void 0;
                return result;
              };
            }();
            module2.exports = baseCreate;
          },
          function(module2, exports2, __webpack_require__) {
            var arrayPush = __webpack_require__(90), isFlattenable = __webpack_require__(128);
            function baseFlatten(array, depth, predicate, isStrict, result) {
              var index = -1, length = array.length;
              predicate || (predicate = isFlattenable);
              result || (result = []);
              while (++index < length) {
                var value = array[index];
                if (depth > 0 && predicate(value)) {
                  if (depth > 1) {
                    baseFlatten(value, depth - 1, predicate, isStrict, result);
                  } else {
                    arrayPush(result, value);
                  }
                } else if (!isStrict) {
                  result[result.length] = value;
                }
              }
              return result;
            }
            module2.exports = baseFlatten;
          },
          function(module2, exports2, __webpack_require__) {
            var createBaseFor = __webpack_require__(117);
            var baseFor = createBaseFor();
            module2.exports = baseFor;
          },
          function(module2, exports2, __webpack_require__) {
            var castPath = __webpack_require__(13), toKey = __webpack_require__(23);
            function baseGet(object, path) {
              path = castPath(path, object);
              var index = 0, length = path.length;
              while (object != null && index < length) {
                object = object[toKey(path[index++])];
              }
              return index && index == length ? object : void 0;
            }
            module2.exports = baseGet;
          },
          function(module2, exports2) {
            function baseHasIn(object, key) {
              return object != null && key in Object(object);
            }
            module2.exports = baseHasIn;
          },
          function(module2, exports2, __webpack_require__) {
            var baseGetTag = __webpack_require__(8), isObjectLike = __webpack_require__(6);
            var argsTag = "[object Arguments]";
            function baseIsArguments(value) {
              return isObjectLike(value) && baseGetTag(value) == argsTag;
            }
            module2.exports = baseIsArguments;
          },
          function(module2, exports2, __webpack_require__) {
            var isFunction = __webpack_require__(25), isMasked = __webpack_require__(132), isObject = __webpack_require__(0), toSource = __webpack_require__(155);
            var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
            var reIsHostCtor = /^\[object .+?Constructor\]$/;
            var funcProto = Function.prototype, objectProto = Object.prototype;
            var funcToString = funcProto.toString;
            var hasOwnProperty = objectProto.hasOwnProperty;
            var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
            function baseIsNative(value) {
              if (!isObject(value) || isMasked(value)) {
                return false;
              }
              var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
              return pattern.test(toSource(value));
            }
            module2.exports = baseIsNative;
          },
          function(module2, exports2, __webpack_require__) {
            var baseGetTag = __webpack_require__(8), isLength = __webpack_require__(26), isObjectLike = __webpack_require__(6);
            var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
            var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
            var typedArrayTags = {};
            typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
            typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
            function baseIsTypedArray(value) {
              return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
            }
            module2.exports = baseIsTypedArray;
          },
          function(module2, exports2, __webpack_require__) {
            var isObject = __webpack_require__(0), isPrototype = __webpack_require__(40), nativeKeysIn = __webpack_require__(144);
            var objectProto = Object.prototype;
            var hasOwnProperty = objectProto.hasOwnProperty;
            function baseKeysIn(object) {
              if (!isObject(object)) {
                return nativeKeysIn(object);
              }
              var isProto = isPrototype(object), result = [];
              for (var key in object) {
                if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
                  result.push(key);
                }
              }
              return result;
            }
            module2.exports = baseKeysIn;
          },
          function(module2, exports2, __webpack_require__) {
            var Stack = __webpack_require__(85), assignMergeValue = __webpack_require__(35), baseFor = __webpack_require__(93), baseMergeDeep = __webpack_require__(101), isObject = __webpack_require__(0), keysIn = __webpack_require__(46);
            function baseMerge(object, source, srcIndex, customizer, stack) {
              if (object === source) {
                return;
              }
              baseFor(source, function(srcValue, key) {
                if (isObject(srcValue)) {
                  stack || (stack = new Stack());
                  baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
                } else {
                  var newValue = customizer ? customizer(object[key], srcValue, key + "", object, source, stack) : void 0;
                  if (newValue === void 0) {
                    newValue = srcValue;
                  }
                  assignMergeValue(object, key, newValue);
                }
              }, keysIn);
            }
            module2.exports = baseMerge;
          },
          function(module2, exports2, __webpack_require__) {
            var assignMergeValue = __webpack_require__(35), cloneBuffer = __webpack_require__(111), cloneTypedArray = __webpack_require__(112), copyArray = __webpack_require__(113), initCloneObject = __webpack_require__(127), isArguments = __webpack_require__(18), isArray = __webpack_require__(2), isArrayLikeObject = __webpack_require__(159), isBuffer = __webpack_require__(44), isFunction = __webpack_require__(25), isObject = __webpack_require__(0), isPlainObject = __webpack_require__(160), isTypedArray = __webpack_require__(45), toPlainObject = __webpack_require__(164);
            function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
              var objValue = object[key], srcValue = source[key], stacked = stack.get(srcValue);
              if (stacked) {
                assignMergeValue(object, key, stacked);
                return;
              }
              var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
              var isCommon = newValue === void 0;
              if (isCommon) {
                var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
                newValue = srcValue;
                if (isArr || isBuff || isTyped) {
                  if (isArray(objValue)) {
                    newValue = objValue;
                  } else if (isArrayLikeObject(objValue)) {
                    newValue = copyArray(objValue);
                  } else if (isBuff) {
                    isCommon = false;
                    newValue = cloneBuffer(srcValue, true);
                  } else if (isTyped) {
                    isCommon = false;
                    newValue = cloneTypedArray(srcValue, true);
                  } else {
                    newValue = [];
                  }
                } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                  newValue = objValue;
                  if (isArguments(objValue)) {
                    newValue = toPlainObject(objValue);
                  } else if (!isObject(objValue) || srcIndex && isFunction(objValue)) {
                    newValue = initCloneObject(srcValue);
                  }
                } else {
                  isCommon = false;
                }
              }
              if (isCommon) {
                stack.set(srcValue, newValue);
                mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
                stack["delete"](srcValue);
              }
              assignMergeValue(object, key, newValue);
            }
            module2.exports = baseMergeDeep;
          },
          function(module2, exports2, __webpack_require__) {
            var basePickBy = __webpack_require__(103), hasIn = __webpack_require__(158);
            function basePick(object, paths) {
              return basePickBy(object, paths, function(value, path) {
                return hasIn(object, path);
              });
            }
            module2.exports = basePick;
          },
          function(module2, exports2, __webpack_require__) {
            var baseGet = __webpack_require__(94), baseSet = __webpack_require__(105), castPath = __webpack_require__(13);
            function basePickBy(object, paths, predicate) {
              var index = -1, length = paths.length, result = {};
              while (++index < length) {
                var path = paths[index], value = baseGet(object, path);
                if (predicate(value, path)) {
                  baseSet(result, castPath(path, object), value);
                }
              }
              return result;
            }
            module2.exports = basePickBy;
          },
          function(module2, exports2, __webpack_require__) {
            var identity = __webpack_require__(43), overRest = __webpack_require__(41), setToString = __webpack_require__(42);
            function baseRest(func, start) {
              return setToString(overRest(func, start, identity), func + "");
            }
            module2.exports = baseRest;
          },
          function(module2, exports2, __webpack_require__) {
            var assignValue = __webpack_require__(36), castPath = __webpack_require__(13), isIndex = __webpack_require__(15), isObject = __webpack_require__(0), toKey = __webpack_require__(23);
            function baseSet(object, path, value, customizer) {
              if (!isObject(object)) {
                return object;
              }
              path = castPath(path, object);
              var index = -1, length = path.length, lastIndex = length - 1, nested = object;
              while (nested != null && ++index < length) {
                var key = toKey(path[index]), newValue = value;
                if (index != lastIndex) {
                  var objValue = nested[key];
                  newValue = customizer ? customizer(objValue, key, nested) : void 0;
                  if (newValue === void 0) {
                    newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
                  }
                }
                assignValue(nested, key, newValue);
                nested = nested[key];
              }
              return object;
            }
            module2.exports = baseSet;
          },
          function(module2, exports2, __webpack_require__) {
            var constant = __webpack_require__(156), defineProperty = __webpack_require__(37), identity = __webpack_require__(43);
            var baseSetToString = !defineProperty ? identity : function(func, string) {
              return defineProperty(func, "toString", {
                "configurable": true,
                "enumerable": false,
                "value": constant(string),
                "writable": true
              });
            };
            module2.exports = baseSetToString;
          },
          function(module2, exports2) {
            function baseTimes(n, iteratee) {
              var index = -1, result = Array(n);
              while (++index < n) {
                result[index] = iteratee(index);
              }
              return result;
            }
            module2.exports = baseTimes;
          },
          function(module2, exports2, __webpack_require__) {
            var Symbol2 = __webpack_require__(11), arrayMap = __webpack_require__(89), isArray = __webpack_require__(2), isSymbol = __webpack_require__(27);
            var INFINITY = 1 / 0;
            var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
            function baseToString(value) {
              if (typeof value == "string") {
                return value;
              }
              if (isArray(value)) {
                return arrayMap(value, baseToString) + "";
              }
              if (isSymbol(value)) {
                return symbolToString ? symbolToString.call(value) : "";
              }
              var result = value + "";
              return result == "0" && 1 / value == -INFINITY ? "-0" : result;
            }
            module2.exports = baseToString;
          },
          function(module2, exports2) {
            function baseUnary(func) {
              return function(value) {
                return func(value);
              };
            }
            module2.exports = baseUnary;
          },
          function(module2, exports2, __webpack_require__) {
            var Uint8Array2 = __webpack_require__(86);
            function cloneArrayBuffer(arrayBuffer) {
              var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
              new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
              return result;
            }
            module2.exports = cloneArrayBuffer;
          },
          function(module2, exports2, __webpack_require__) {
            (function(module3) {
              var root = __webpack_require__(5);
              var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
              var freeModule = freeExports && typeof module3 == "object" && module3 && !module3.nodeType && module3;
              var moduleExports = freeModule && freeModule.exports === freeExports;
              var Buffer2 = moduleExports ? root.Buffer : void 0, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
              function cloneBuffer(buffer, isDeep) {
                if (isDeep) {
                  return buffer.slice();
                }
                var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
                buffer.copy(result);
                return result;
              }
              module3.exports = cloneBuffer;
            }).call(exports2, __webpack_require__(29)(module2));
          },
          function(module2, exports2, __webpack_require__) {
            var cloneArrayBuffer = __webpack_require__(110);
            function cloneTypedArray(typedArray, isDeep) {
              var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
              return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
            }
            module2.exports = cloneTypedArray;
          },
          function(module2, exports2) {
            function copyArray(source, array) {
              var index = -1, length = source.length;
              array || (array = Array(length));
              while (++index < length) {
                array[index] = source[index];
              }
              return array;
            }
            module2.exports = copyArray;
          },
          function(module2, exports2, __webpack_require__) {
            var assignValue = __webpack_require__(36), baseAssignValue = __webpack_require__(21);
            function copyObject(source, props, object, customizer) {
              var isNew = !object;
              object || (object = {});
              var index = -1, length = props.length;
              while (++index < length) {
                var key = props[index];
                var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
                if (newValue === void 0) {
                  newValue = source[key];
                }
                if (isNew) {
                  baseAssignValue(object, key, newValue);
                } else {
                  assignValue(object, key, newValue);
                }
              }
              return object;
            }
            module2.exports = copyObject;
          },
          function(module2, exports2, __webpack_require__) {
            var root = __webpack_require__(5);
            var coreJsData = root["__core-js_shared__"];
            module2.exports = coreJsData;
          },
          function(module2, exports2, __webpack_require__) {
            var baseRest = __webpack_require__(104), isIterateeCall = __webpack_require__(129);
            function createAssigner(assigner) {
              return baseRest(function(object, sources) {
                var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
                customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
                if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                  customizer = length < 3 ? void 0 : customizer;
                  length = 1;
                }
                object = Object(object);
                while (++index < length) {
                  var source = sources[index];
                  if (source) {
                    assigner(object, source, index, customizer);
                  }
                }
                return object;
              });
            }
            module2.exports = createAssigner;
          },
          function(module2, exports2) {
            function createBaseFor(fromRight) {
              return function(object, iteratee, keysFunc) {
                var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
                while (length--) {
                  var key = props[fromRight ? length : ++index];
                  if (iteratee(iterable[key], key, iterable) === false) {
                    break;
                  }
                }
                return object;
              };
            }
            module2.exports = createBaseFor;
          },
          function(module2, exports2, __webpack_require__) {
            var flatten = __webpack_require__(157), overRest = __webpack_require__(41), setToString = __webpack_require__(42);
            function flatRest(func) {
              return setToString(overRest(func, void 0, flatten), func + "");
            }
            module2.exports = flatRest;
          },
          function(module2, exports2, __webpack_require__) {
            var Symbol2 = __webpack_require__(11);
            var objectProto = Object.prototype;
            var hasOwnProperty = objectProto.hasOwnProperty;
            var nativeObjectToString = objectProto.toString;
            var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
            function getRawTag(value) {
              var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
              try {
                value[symToStringTag] = void 0;
                var unmasked = true;
              } catch (e) {
              }
              var result = nativeObjectToString.call(value);
              if (unmasked) {
                if (isOwn) {
                  value[symToStringTag] = tag;
                } else {
                  delete value[symToStringTag];
                }
              }
              return result;
            }
            module2.exports = getRawTag;
          },
          function(module2, exports2) {
            function getValue(object, key) {
              return object == null ? void 0 : object[key];
            }
            module2.exports = getValue;
          },
          function(module2, exports2, __webpack_require__) {
            var castPath = __webpack_require__(13), isArguments = __webpack_require__(18), isArray = __webpack_require__(2), isIndex = __webpack_require__(15), isLength = __webpack_require__(26), toKey = __webpack_require__(23);
            function hasPath(object, path, hasFunc) {
              path = castPath(path, object);
              var index = -1, length = path.length, result = false;
              while (++index < length) {
                var key = toKey(path[index]);
                if (!(result = object != null && hasFunc(object, key))) {
                  break;
                }
                object = object[key];
              }
              if (result || ++index != length) {
                return result;
              }
              length = object == null ? 0 : object.length;
              return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
            }
            module2.exports = hasPath;
          },
          function(module2, exports2, __webpack_require__) {
            var nativeCreate = __webpack_require__(16);
            function hashClear() {
              this.__data__ = nativeCreate ? nativeCreate(null) : {};
              this.size = 0;
            }
            module2.exports = hashClear;
          },
          function(module2, exports2) {
            function hashDelete(key) {
              var result = this.has(key) && delete this.__data__[key];
              this.size -= result ? 1 : 0;
              return result;
            }
            module2.exports = hashDelete;
          },
          function(module2, exports2, __webpack_require__) {
            var nativeCreate = __webpack_require__(16);
            var HASH_UNDEFINED = "__lodash_hash_undefined__";
            var objectProto = Object.prototype;
            var hasOwnProperty = objectProto.hasOwnProperty;
            function hashGet(key) {
              var data = this.__data__;
              if (nativeCreate) {
                var result = data[key];
                return result === HASH_UNDEFINED ? void 0 : result;
              }
              return hasOwnProperty.call(data, key) ? data[key] : void 0;
            }
            module2.exports = hashGet;
          },
          function(module2, exports2, __webpack_require__) {
            var nativeCreate = __webpack_require__(16);
            var objectProto = Object.prototype;
            var hasOwnProperty = objectProto.hasOwnProperty;
            function hashHas(key) {
              var data = this.__data__;
              return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
            }
            module2.exports = hashHas;
          },
          function(module2, exports2, __webpack_require__) {
            var nativeCreate = __webpack_require__(16);
            var HASH_UNDEFINED = "__lodash_hash_undefined__";
            function hashSet(key, value) {
              var data = this.__data__;
              this.size += this.has(key) ? 0 : 1;
              data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
              return this;
            }
            module2.exports = hashSet;
          },
          function(module2, exports2, __webpack_require__) {
            var baseCreate = __webpack_require__(91), getPrototype = __webpack_require__(39), isPrototype = __webpack_require__(40);
            function initCloneObject(object) {
              return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
            }
            module2.exports = initCloneObject;
          },
          function(module2, exports2, __webpack_require__) {
            var Symbol2 = __webpack_require__(11), isArguments = __webpack_require__(18), isArray = __webpack_require__(2);
            var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
            function isFlattenable(value) {
              return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
            }
            module2.exports = isFlattenable;
          },
          function(module2, exports2, __webpack_require__) {
            var eq = __webpack_require__(17), isArrayLike = __webpack_require__(24), isIndex = __webpack_require__(15), isObject = __webpack_require__(0);
            function isIterateeCall(value, index, object) {
              if (!isObject(object)) {
                return false;
              }
              var type = typeof index;
              if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
                return eq(object[index], value);
              }
              return false;
            }
            module2.exports = isIterateeCall;
          },
          function(module2, exports2, __webpack_require__) {
            var isArray = __webpack_require__(2), isSymbol = __webpack_require__(27);
            var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
            function isKey(value, object) {
              if (isArray(value)) {
                return false;
              }
              var type = typeof value;
              if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
                return true;
              }
              return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
            }
            module2.exports = isKey;
          },
          function(module2, exports2) {
            function isKeyable(value) {
              var type = typeof value;
              return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
            }
            module2.exports = isKeyable;
          },
          function(module2, exports2, __webpack_require__) {
            var coreJsData = __webpack_require__(115);
            var maskSrcKey = function() {
              var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
              return uid ? "Symbol(src)_1." + uid : "";
            }();
            function isMasked(func) {
              return !!maskSrcKey && maskSrcKey in func;
            }
            module2.exports = isMasked;
          },
          function(module2, exports2) {
            function listCacheClear() {
              this.__data__ = [];
              this.size = 0;
            }
            module2.exports = listCacheClear;
          },
          function(module2, exports2, __webpack_require__) {
            var assocIndexOf = __webpack_require__(12);
            var arrayProto = Array.prototype;
            var splice = arrayProto.splice;
            function listCacheDelete(key) {
              var data = this.__data__, index = assocIndexOf(data, key);
              if (index < 0) {
                return false;
              }
              var lastIndex = data.length - 1;
              if (index == lastIndex) {
                data.pop();
              } else {
                splice.call(data, index, 1);
              }
              --this.size;
              return true;
            }
            module2.exports = listCacheDelete;
          },
          function(module2, exports2, __webpack_require__) {
            var assocIndexOf = __webpack_require__(12);
            function listCacheGet(key) {
              var data = this.__data__, index = assocIndexOf(data, key);
              return index < 0 ? void 0 : data[index][1];
            }
            module2.exports = listCacheGet;
          },
          function(module2, exports2, __webpack_require__) {
            var assocIndexOf = __webpack_require__(12);
            function listCacheHas(key) {
              return assocIndexOf(this.__data__, key) > -1;
            }
            module2.exports = listCacheHas;
          },
          function(module2, exports2, __webpack_require__) {
            var assocIndexOf = __webpack_require__(12);
            function listCacheSet(key, value) {
              var data = this.__data__, index = assocIndexOf(data, key);
              if (index < 0) {
                ++this.size;
                data.push([key, value]);
              } else {
                data[index][1] = value;
              }
              return this;
            }
            module2.exports = listCacheSet;
          },
          function(module2, exports2, __webpack_require__) {
            var Hash = __webpack_require__(84), ListCache = __webpack_require__(10), Map = __webpack_require__(33);
            function mapCacheClear() {
              this.size = 0;
              this.__data__ = {
                "hash": new Hash(),
                "map": new (Map || ListCache)(),
                "string": new Hash()
              };
            }
            module2.exports = mapCacheClear;
          },
          function(module2, exports2, __webpack_require__) {
            var getMapData = __webpack_require__(14);
            function mapCacheDelete(key) {
              var result = getMapData(this, key)["delete"](key);
              this.size -= result ? 1 : 0;
              return result;
            }
            module2.exports = mapCacheDelete;
          },
          function(module2, exports2, __webpack_require__) {
            var getMapData = __webpack_require__(14);
            function mapCacheGet(key) {
              return getMapData(this, key).get(key);
            }
            module2.exports = mapCacheGet;
          },
          function(module2, exports2, __webpack_require__) {
            var getMapData = __webpack_require__(14);
            function mapCacheHas(key) {
              return getMapData(this, key).has(key);
            }
            module2.exports = mapCacheHas;
          },
          function(module2, exports2, __webpack_require__) {
            var getMapData = __webpack_require__(14);
            function mapCacheSet(key, value) {
              var data = getMapData(this, key), size = data.size;
              data.set(key, value);
              this.size += data.size == size ? 0 : 1;
              return this;
            }
            module2.exports = mapCacheSet;
          },
          function(module2, exports2, __webpack_require__) {
            var memoize = __webpack_require__(161);
            var MAX_MEMOIZE_SIZE = 500;
            function memoizeCapped(func) {
              var result = memoize(func, function(key) {
                if (cache.size === MAX_MEMOIZE_SIZE) {
                  cache.clear();
                }
                return key;
              });
              var cache = result.cache;
              return result;
            }
            module2.exports = memoizeCapped;
          },
          function(module2, exports2) {
            function nativeKeysIn(object) {
              var result = [];
              if (object != null) {
                for (var key in Object(object)) {
                  result.push(key);
                }
              }
              return result;
            }
            module2.exports = nativeKeysIn;
          },
          function(module2, exports2, __webpack_require__) {
            (function(module3) {
              var freeGlobal = __webpack_require__(38);
              var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
              var freeModule = freeExports && typeof module3 == "object" && module3 && !module3.nodeType && module3;
              var moduleExports = freeModule && freeModule.exports === freeExports;
              var freeProcess = moduleExports && freeGlobal.process;
              var nodeUtil = function() {
                try {
                  return freeProcess && freeProcess.binding && freeProcess.binding("util");
                } catch (e) {
                }
              }();
              module3.exports = nodeUtil;
            }).call(exports2, __webpack_require__(29)(module2));
          },
          function(module2, exports2) {
            var objectProto = Object.prototype;
            var nativeObjectToString = objectProto.toString;
            function objectToString(value) {
              return nativeObjectToString.call(value);
            }
            module2.exports = objectToString;
          },
          function(module2, exports2) {
            function overArg(func, transform) {
              return function(arg) {
                return func(transform(arg));
              };
            }
            module2.exports = overArg;
          },
          function(module2, exports2) {
            var HOT_COUNT = 800, HOT_SPAN = 16;
            var nativeNow = Date.now;
            function shortOut(func) {
              var count = 0, lastCalled = 0;
              return function() {
                var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
                lastCalled = stamp;
                if (remaining > 0) {
                  if (++count >= HOT_COUNT) {
                    return arguments[0];
                  }
                } else {
                  count = 0;
                }
                return func.apply(void 0, arguments);
              };
            }
            module2.exports = shortOut;
          },
          function(module2, exports2, __webpack_require__) {
            var ListCache = __webpack_require__(10);
            function stackClear() {
              this.__data__ = new ListCache();
              this.size = 0;
            }
            module2.exports = stackClear;
          },
          function(module2, exports2) {
            function stackDelete(key) {
              var data = this.__data__, result = data["delete"](key);
              this.size = data.size;
              return result;
            }
            module2.exports = stackDelete;
          },
          function(module2, exports2) {
            function stackGet(key) {
              return this.__data__.get(key);
            }
            module2.exports = stackGet;
          },
          function(module2, exports2) {
            function stackHas(key) {
              return this.__data__.has(key);
            }
            module2.exports = stackHas;
          },
          function(module2, exports2, __webpack_require__) {
            var ListCache = __webpack_require__(10), Map = __webpack_require__(33), MapCache = __webpack_require__(34);
            var LARGE_ARRAY_SIZE = 200;
            function stackSet(key, value) {
              var data = this.__data__;
              if (data instanceof ListCache) {
                var pairs = data.__data__;
                if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
                  pairs.push([key, value]);
                  this.size = ++data.size;
                  return this;
                }
                data = this.__data__ = new MapCache(pairs);
              }
              data.set(key, value);
              this.size = data.size;
              return this;
            }
            module2.exports = stackSet;
          },
          function(module2, exports2, __webpack_require__) {
            var memoizeCapped = __webpack_require__(143);
            var reLeadingDot = /^\./, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
            var reEscapeChar = /\\(\\)?/g;
            var stringToPath = memoizeCapped(function(string) {
              var result = [];
              if (reLeadingDot.test(string)) {
                result.push("");
              }
              string.replace(rePropName, function(match, number, quote, string2) {
                result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
              });
              return result;
            });
            module2.exports = stringToPath;
          },
          function(module2, exports2) {
            var funcProto = Function.prototype;
            var funcToString = funcProto.toString;
            function toSource(func) {
              if (func != null) {
                try {
                  return funcToString.call(func);
                } catch (e) {
                }
                try {
                  return func + "";
                } catch (e) {
                }
              }
              return "";
            }
            module2.exports = toSource;
          },
          function(module2, exports2) {
            function constant(value) {
              return function() {
                return value;
              };
            }
            module2.exports = constant;
          },
          function(module2, exports2, __webpack_require__) {
            var baseFlatten = __webpack_require__(92);
            function flatten(array) {
              var length = array == null ? 0 : array.length;
              return length ? baseFlatten(array, 1) : [];
            }
            module2.exports = flatten;
          },
          function(module2, exports2, __webpack_require__) {
            var baseHasIn = __webpack_require__(95), hasPath = __webpack_require__(121);
            function hasIn(object, path) {
              return object != null && hasPath(object, path, baseHasIn);
            }
            module2.exports = hasIn;
          },
          function(module2, exports2, __webpack_require__) {
            var isArrayLike = __webpack_require__(24), isObjectLike = __webpack_require__(6);
            function isArrayLikeObject(value) {
              return isObjectLike(value) && isArrayLike(value);
            }
            module2.exports = isArrayLikeObject;
          },
          function(module2, exports2, __webpack_require__) {
            var baseGetTag = __webpack_require__(8), getPrototype = __webpack_require__(39), isObjectLike = __webpack_require__(6);
            var objectTag = "[object Object]";
            var funcProto = Function.prototype, objectProto = Object.prototype;
            var funcToString = funcProto.toString;
            var hasOwnProperty = objectProto.hasOwnProperty;
            var objectCtorString = funcToString.call(Object);
            function isPlainObject(value) {
              if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
                return false;
              }
              var proto = getPrototype(value);
              if (proto === null) {
                return true;
              }
              var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
              return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
            }
            module2.exports = isPlainObject;
          },
          function(module2, exports2, __webpack_require__) {
            var MapCache = __webpack_require__(34);
            var FUNC_ERROR_TEXT = "Expected a function";
            function memoize(func, resolver) {
              if (typeof func != "function" || resolver != null && typeof resolver != "function") {
                throw new TypeError(FUNC_ERROR_TEXT);
              }
              var memoized = function() {
                var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
                if (cache.has(key)) {
                  return cache.get(key);
                }
                var result = func.apply(this, args);
                memoized.cache = cache.set(key, result) || cache;
                return result;
              };
              memoized.cache = new (memoize.Cache || MapCache)();
              return memoized;
            }
            memoize.Cache = MapCache;
            module2.exports = memoize;
          },
          function(module2, exports2, __webpack_require__) {
            var basePick = __webpack_require__(102), flatRest = __webpack_require__(118);
            var pick = flatRest(function(object, paths) {
              return object == null ? {} : basePick(object, paths);
            });
            module2.exports = pick;
          },
          function(module2, exports2) {
            function stubFalse() {
              return false;
            }
            module2.exports = stubFalse;
          },
          function(module2, exports2, __webpack_require__) {
            var copyObject = __webpack_require__(114), keysIn = __webpack_require__(46);
            function toPlainObject(value) {
              return copyObject(value, keysIn(value));
            }
            module2.exports = toPlainObject;
          },
          function(module2, exports2, __webpack_require__) {
            var baseToString = __webpack_require__(108);
            function toString(value) {
              return value == null ? "" : baseToString(value);
            }
            module2.exports = toString;
          },
          function(module2, exports2, __webpack_require__) {
            module2.exports = __webpack_require__(48);
          }
        ]);
      });
    }
  });

  // frappe/public/js/frappe/barcode_scanner/quagga.js
  var import_quagga = __toESM(require_quagga());
  frappe.provide("frappe.barcode");
  import_quagga.default.onProcessed(function(result) {
    let drawingCtx = import_quagga.default.canvas.ctx.overlay, drawingCanvas = import_quagga.default.canvas.dom.overlay;
    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
        result.boxes.filter(function(box) {
          return box !== result.box;
        }).forEach(function(box) {
          import_quagga.default.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
            color: "green",
            lineWidth: 2
          });
        });
      }
      if (result.box) {
        import_quagga.default.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
          color: "#00F",
          lineWidth: 2
        });
      }
      if (result.codeResult && result.codeResult.code) {
        import_quagga.default.ImageDebug.drawPath(result.line, { x: "x", y: "y" }, drawingCtx, {
          color: "red",
          lineWidth: 3
        });
      }
    }
  });
  frappe.barcode.get_barcode = function() {
    return new Promise((resolve) => {
      let d = new frappe.ui.Dialog({
        title: __("Scan Barcode"),
        fields: [
          {
            fieldtype: "HTML",
            fieldname: "scan_area"
          }
        ],
        on_page_show() {
          let $scan_area = d.get_field("scan_area").$wrapper;
          $scan_area.addClass("barcode-scanner");
          import_quagga.default.init({
            inputStream: {
              name: "Live",
              type: "LiveStream",
              target: $scan_area.get(0)
            },
            decoder: {
              readers: ["code_128_reader"]
            }
          }, function(err) {
            if (err) {
              console.log(err);
              return;
            }
            console.log("Initialization finished. Ready to start");
            import_quagga.default.start();
          });
          import_quagga.default.onDetected(function(result) {
            let code = result.codeResult.code;
            if (code) {
              import_quagga.default.stop();
              d.hide();
              resolve(code);
            }
          });
        }
      });
      d.show();
    });
  };
})();
/* @preserve ASM BEGIN */
/* @preserve ASM END */
//# sourceMappingURL=barcode_scanner.bundle.YJCYA5BX.js.map
