var AdminBro = (function (React, reactRedux, reactRouterDom, styled, reactI18next, i18n, flat, DesignSystem, redux, axios, reactRouter, reactDom, PropTypes$1, Select$1) {
	'use strict';

	var React__default = 'default' in React ? React['default'] : React;
	var styled__default = 'default' in styled ? styled['default'] : styled;
	i18n = i18n && Object.prototype.hasOwnProperty.call(i18n, 'default') ? i18n['default'] : i18n;
	var flat__default = 'default' in flat ? flat['default'] : flat;
	axios = axios && Object.prototype.hasOwnProperty.call(axios, 'default') ? axios['default'] : axios;
	var reactDom__default = 'default' in reactDom ? reactDom['default'] : reactDom;
	PropTypes$1 = PropTypes$1 && Object.prototype.hasOwnProperty.call(PropTypes$1, 'default') ? PropTypes$1['default'] : PropTypes$1;
	Select$1 = Select$1 && Object.prototype.hasOwnProperty.call(Select$1, 'default') ? Select$1['default'] : Select$1;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports 
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	var regenerator = runtime_1;

	let globalAny = {};

	try {
	  globalAny = window;
	} catch (error) {
	  if (error.message !== 'window is not defined') {
	    throw error;
	  }
	}
	/**
	 * Params for a record action
	 * @alias RecordActionParams
	 * @memberof ViewHelpers
	 */


	const runDate = new Date();
	/**
	 * Collection of helper methods available in the views
	 */

	class ViewHelpers {
	  constructor({
	    options
	  } = {}) {
	    let opts = ViewHelpers.getPaths(options);
	    opts = opts || {
	      rootPath: '/admin'
	    }; // when ViewHelpers are used on the frontend, paths are taken from global Redux State

	    this.options = opts;
	  }

	  static getPaths(options) {
	    var _globalAny$REDUX_STAT;

	    return options || ((_globalAny$REDUX_STAT = globalAny.REDUX_STATE) === null || _globalAny$REDUX_STAT === void 0 ? void 0 : _globalAny$REDUX_STAT.paths);
	  }
	  /**
	   * To each related path adds rootPath passed by the user, as well as a query string
	   * @private
	   * @param  {Array<string>} [paths]      list of parts of the url
	   * @return {string}       path
	   * @return {query}        [search=''] query string which can be fetch
	   *                                    from `location.search`
	   */


	  urlBuilder(paths = [], search = '') {
	    const separator = '/';
	    const replace = new RegExp(`${separator}{1,}`, 'g');
	    let {
	      rootPath
	    } = this.options;

	    if (!rootPath.startsWith(separator)) {
	      rootPath = `${separator}${rootPath}`;
	    }

	    const parts = [rootPath, ...paths];
	    return `${parts.join(separator).replace(replace, separator)}${search}`;
	  }
	  /**
	   * Returns login URL
	   * @return {string}
	   */


	  loginUrl() {
	    return this.options.loginPath;
	  }
	  /**
	   * Returns logout URL
	   * @return {string}
	   */


	  logoutUrl() {
	    return this.options.logoutPath;
	  }
	  /**
	   * Returns URL for the dashboard
	   * @return {string}
	   */


	  dashboardUrl() {
	    return this.options.rootPath;
	  }
	  /**
	   * Returns URL for given page name
	   * @param {string} pageName       page name which is a unique key specified in
	   *                                {@link AdminBroOptions}
	   * @return {string}
	   */


	  pageUrl(pageName) {
	    return this.urlBuilder(['pages', pageName]);
	  }
	  /**
	   * Returns resourceAction url
	   *
	   * @param   {ResourceActionParams}  options
	   * @param   {string}  options.resourceId
	   * @param   {string}  options.actionName
	   *
	   * @return  {string}
	   */


	  resourceActionUrl({
	    resourceId,
	    actionName,
	    search
	  }) {
	    return this.urlBuilder(['resources', resourceId, 'actions', actionName], search);
	  }

	  resourceUrl({
	    resourceId,
	    search
	  }) {
	    return this.urlBuilder(['resources', resourceId], search);
	  }
	  /**
	   * Returns recordAction url
	   *
	   * @param   {RecordActionParams}  options
	   * @param   {string}  options.resourceId
	   * @param   {string}  options.recordId
	   * @param   {string}  options.actionName
	   *
	   * @return  {string}
	   */


	  recordActionUrl({
	    resourceId,
	    recordId,
	    actionName,
	    search
	  }) {
	    return this.urlBuilder(['resources', resourceId, 'records', recordId, actionName], search);
	  }
	  /**
	   * Returns bulkAction url
	   *
	   * @param   {BulkActionParams}  options
	   * @param   {string}  options.resourceId
	   * @param   {string}  [options.recordIds]
	   * @param   {string}  options.actionName
	   *
	   * @return  {string}
	   */


	  bulkActionUrl({
	    resourceId,
	    recordIds,
	    actionName,
	    search
	  }) {
	    const url = this.urlBuilder(['resources', resourceId, 'bulk', actionName]);

	    if (recordIds && recordIds.length) {
	      const query = new URLSearchParams(search);
	      query.set('recordIds', recordIds.join(','));
	      return `${url}?${query.toString()}`;
	    }

	    return `${url}${search || ''}`;
	  }
	  /**
	   * Returns absolute path to a given asset.
	   * @private
	   *
	   * @param  {string} asset
	   * @return {string}
	   */


	  assetPath(asset) {
	    if (this.options.assetsCDN) {
	      const url = new URL(asset, this.options.assetsCDN).href; // adding timestamp to the href invalidates the CDN cache

	      return `${url}?date=${runDate.getTime()}`;
	    }

	    return this.urlBuilder(['frontend', 'assets', asset]);
	  }

	}

	const LogoLink = styled__default(reactRouterDom.Link).withConfig({
	  displayName: "sidebar-branding__LogoLink",
	  componentId: "sc-1ozeetj-0"
	})(["display:flex;align-items:center;text-decoration:none;color:", ";& > img{margin-right:12px;}"], ({
	  theme
	}) => theme.colors.grey80);

	const SidebarBranding = props => {
	  const {
	    branding
	  } = props;
	  const {
	    logo,
	    companyName
	  } = branding;
	  const h = new ViewHelpers();
	  return /*#__PURE__*/React__default.createElement(DesignSystem.H5, null, /*#__PURE__*/React__default.createElement(LogoLink, {
	    to: h.dashboardUrl()
	  }, logo && /*#__PURE__*/React__default.createElement("img", {
	    src: logo,
	    alt: companyName,
	    height: "35px"
	  }), /*#__PURE__*/React__default.createElement("span", null, companyName)));
	};

	const SidebarLink = styled__default(reactRouterDom.NavLink).withConfig({
	  displayName: "sidebar-linkstyled__SidebarLink",
	  componentId: "sc-13hc6f5-0"
	})(["color:", ";padding:", ";display:block;text-decoration:none;&:hover{color:", ";}&.active span{color:", ";}"], ({
	  theme
	}) => theme.colors.grey80, ({
	  theme
	}) => theme.space.sm, ({
	  theme
	}) => theme.colors.hoverBg, ({
	  theme
	}) => theme.colors.primary100);

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	var _arrayReduce = arrayReduce;

	/**
	 * The base implementation of `_.propertyOf` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyOf(object) {
	  return function(key) {
	    return object == null ? undefined : object[key];
	  };
	}

	var _basePropertyOf = basePropertyOf;

	/** Used to map Latin Unicode letters to basic Latin letters. */
	var deburredLetters = {
	  // Latin-1 Supplement block.
	  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	  '\xc7': 'C',  '\xe7': 'c',
	  '\xd0': 'D',  '\xf0': 'd',
	  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	  '\xd1': 'N',  '\xf1': 'n',
	  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	  '\xc6': 'Ae', '\xe6': 'ae',
	  '\xde': 'Th', '\xfe': 'th',
	  '\xdf': 'ss',
	  // Latin Extended-A block.
	  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
	  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
	  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
	  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
	  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
	  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
	  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
	  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
	  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
	  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
	  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
	  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
	  '\u0134': 'J',  '\u0135': 'j',
	  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
	  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
	  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
	  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
	  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
	  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
	  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
	  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
	  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
	  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
	  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
	  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
	  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
	  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
	  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
	  '\u0174': 'W',  '\u0175': 'w',
	  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
	  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
	  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
	  '\u0132': 'IJ', '\u0133': 'ij',
	  '\u0152': 'Oe', '\u0153': 'oe',
	  '\u0149': "'n", '\u017f': 's'
	};

	/**
	 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
	 * letters to basic Latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	var deburrLetter = _basePropertyOf(deburredLetters);

	var _deburrLetter = deburrLetter;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	var _freeGlobal = freeGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = _freeGlobal || freeSelf || Function('return this')();

	var _root = root;

	/** Built-in value references. */
	var Symbol$1 = _root.Symbol;

	var _Symbol = Symbol$1;

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	var _arrayMap = arrayMap;

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	var isArray_1 = isArray;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

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

	var _getRawTag = getRawTag;

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString$1 = objectProto$1.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString$1.call(value);
	}

	var _objectToString = objectToString;

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag$1 && symToStringTag$1 in Object(value))
	    ? _getRawTag(value)
	    : _objectToString(value);
	}

	var _baseGetTag = baseGetTag;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	var isObjectLike_1 = isObjectLike;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
	}

	var isSymbol_1 = isSymbol;

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray_1(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return _arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol_1(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	var _baseToString = baseToString;

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : _baseToString(value);
	}

	var toString_1 = toString;

	/** Used to match Latin Unicode letters (excluding mathematical operators). */
	var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

	/** Used to compose unicode character classes. */
	var rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

	/** Used to compose unicode capture groups. */
	var rsCombo = '[' + rsComboRange + ']';

	/**
	 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	 */
	var reComboMark = RegExp(rsCombo, 'g');

	/**
	 * Deburrs `string` by converting
	 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
	 * letters to basic Latin letters and removing
	 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = toString_1(string);
	  return string && string.replace(reLatin, _deburrLetter).replace(reComboMark, '');
	}

	var deburr_1 = deburr;

	/** Used to match words composed of alphanumeric characters. */
	var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

	/**
	 * Splits an ASCII `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function asciiWords(string) {
	  return string.match(reAsciiWord) || [];
	}

	var _asciiWords = asciiWords;

	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

	/**
	 * Checks if `string` contains a word composed of Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a word is found, else `false`.
	 */
	function hasUnicodeWord(string) {
	  return reHasUnicodeWord.test(string);
	}

	var _hasUnicodeWord = hasUnicodeWord;

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange$1 = '\\u0300-\\u036f',
	    reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
	    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
	    rsDingbatRange = '\\u2700-\\u27bf',
	    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	    rsPunctuationRange = '\\u2000-\\u206f',
	    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	    rsVarRange = '\\ufe0e\\ufe0f',
	    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

	/** Used to compose unicode capture groups. */
	var rsApos = "['\u2019]",
	    rsBreak = '[' + rsBreakRange + ']',
	    rsCombo$1 = '[' + rsComboRange$1 + ']',
	    rsDigits = '\\d+',
	    rsDingbat = '[' + rsDingbatRange + ']',
	    rsLower = '[' + rsLowerRange + ']',
	    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo$1 + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsUpper = '[' + rsUpperRange + ']',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
	    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
	    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
	    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
	    reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
	    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

	/** Used to match complex or compound words. */
	var reUnicodeWord = RegExp([
	  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
	  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
	  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
	  rsUpper + '+' + rsOptContrUpper,
	  rsOrdUpper,
	  rsOrdLower,
	  rsDigits,
	  rsEmoji
	].join('|'), 'g');

	/**
	 * Splits a Unicode `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function unicodeWords(string) {
	  return string.match(reUnicodeWord) || [];
	}

	var _unicodeWords = unicodeWords;

	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  string = toString_1(string);
	  pattern = guard ? undefined : pattern;

	  if (pattern === undefined) {
	    return _hasUnicodeWord(string) ? _unicodeWords(string) : _asciiWords(string);
	  }
	  return string.match(pattern) || [];
	}

	var words_1 = words;

	/** Used to compose unicode capture groups. */
	var rsApos$1 = "['\u2019]";

	/** Used to match apostrophes. */
	var reApos = RegExp(rsApos$1, 'g');

	/**
	 * Creates a function like `_.camelCase`.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function(string) {
	    return _arrayReduce(words_1(deburr_1(string).replace(reApos, '')), callback, '');
	  };
	}

	var _createCompounder = createCompounder;

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	var _baseSlice = baseSlice;

	/**
	 * Casts `array` to a slice if it's needed.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {number} start The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the cast slice.
	 */
	function castSlice(array, start, end) {
	  var length = array.length;
	  end = end === undefined ? length : end;
	  return (!start && end >= length) ? array : _baseSlice(array, start, end);
	}

	var _castSlice = castSlice;

	/** Used to compose unicode character classes. */
	var rsAstralRange$1 = '\\ud800-\\udfff',
	    rsComboMarksRange$2 = '\\u0300-\\u036f',
	    reComboHalfMarksRange$2 = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange$2 = '\\u20d0-\\u20ff',
	    rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2,
	    rsVarRange$1 = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsZWJ$1 = '\\u200d';

	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	var reHasUnicode = RegExp('[' + rsZWJ$1 + rsAstralRange$1  + rsComboRange$2 + rsVarRange$1 + ']');

	/**
	 * Checks if `string` contains Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
	 */
	function hasUnicode(string) {
	  return reHasUnicode.test(string);
	}

	var _hasUnicode = hasUnicode;

	/**
	 * Converts an ASCII `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function asciiToArray(string) {
	  return string.split('');
	}

	var _asciiToArray = asciiToArray;

	/** Used to compose unicode character classes. */
	var rsAstralRange$2 = '\\ud800-\\udfff',
	    rsComboMarksRange$3 = '\\u0300-\\u036f',
	    reComboHalfMarksRange$3 = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange$3 = '\\u20d0-\\u20ff',
	    rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3,
	    rsVarRange$2 = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange$2 + ']',
	    rsCombo$2 = '[' + rsComboRange$3 + ']',
	    rsFitz$1 = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')',
	    rsNonAstral$1 = '[^' + rsAstralRange$2 + ']',
	    rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ$2 = '\\u200d';

	/** Used to compose unicode regexes. */
	var reOptMod$1 = rsModifier$1 + '?',
	    rsOptVar$1 = '[' + rsVarRange$2 + ']?',
	    rsOptJoin$1 = '(?:' + rsZWJ$2 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
	    rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
	    rsSymbol = '(?:' + [rsNonAstral$1 + rsCombo$2 + '?', rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join('|') + ')';

	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz$1 + '(?=' + rsFitz$1 + ')|' + rsSymbol + rsSeq$1, 'g');

	/**
	 * Converts a Unicode `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function unicodeToArray(string) {
	  return string.match(reUnicode) || [];
	}

	var _unicodeToArray = unicodeToArray;

	/**
	 * Converts `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function stringToArray(string) {
	  return _hasUnicode(string)
	    ? _unicodeToArray(string)
	    : _asciiToArray(string);
	}

	var _stringToArray = stringToArray;

	/**
	 * Creates a function like `_.lowerFirst`.
	 *
	 * @private
	 * @param {string} methodName The name of the `String` case method to use.
	 * @returns {Function} Returns the new case function.
	 */
	function createCaseFirst(methodName) {
	  return function(string) {
	    string = toString_1(string);

	    var strSymbols = _hasUnicode(string)
	      ? _stringToArray(string)
	      : undefined;

	    var chr = strSymbols
	      ? strSymbols[0]
	      : string.charAt(0);

	    var trailing = strSymbols
	      ? _castSlice(strSymbols, 1).join('')
	      : string.slice(1);

	    return chr[methodName]() + trailing;
	  };
	}

	var _createCaseFirst = createCaseFirst;

	/**
	 * Converts the first character of `string` to upper case.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.upperFirst('fred');
	 * // => 'Fred'
	 *
	 * _.upperFirst('FRED');
	 * // => 'FRED'
	 */
	var upperFirst = _createCaseFirst('toUpperCase');

	var upperFirst_1 = upperFirst;

	/**
	 * Converts `string` to
	 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.1.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the start cased string.
	 * @example
	 *
	 * _.startCase('--foo-bar--');
	 * // => 'Foo Bar'
	 *
	 * _.startCase('fooBar');
	 * // => 'Foo Bar'
	 *
	 * _.startCase('__FOO_BAR__');
	 * // => 'FOO BAR'
	 */
	var startCase = _createCompounder(function(result, word, index) {
	  return result + (index ? ' ' : '') + upperFirst_1(word);
	});

	var startCase_1 = startCase;

	/**
	 * @memberof TranslateFunctions
	 * @alias TranslateFunction
	 */

	const formatName = name => name.split('.').join('&#46;');

	const translate = (i18n, key, name, resourceId, options) => {
	  var _realOptions$defaultV;

	  const realOptions = (typeof resourceId === 'string' ? options : resourceId) || {};
	  const formattedName = formatName(name);
	  let keys = [`${key}.${formattedName}`];

	  if (resourceId) {
	    keys = [`resources.${resourceId}.${key}.${formattedName}`, ...keys];
	  }

	  if (i18n.exists(keys)) {
	    return i18n.t(keys, realOptions);
	  }

	  return (_realOptions$defaultV = realOptions.defaultValue) !== null && _realOptions$defaultV !== void 0 ? _realOptions$defaultV : startCase_1(name);
	};

	const createFunctions = i18n => {
	  const translateAction = (actionName, resourceId, options) => translate(i18n, 'actions', actionName, resourceId, options);

	  const translateButton = (buttonLabel, resourceId, options) => translate(i18n, 'buttons', buttonLabel, resourceId, options);

	  const translateLabel = (label, resourceId, options) => translate(i18n, 'labels', label, resourceId, options);

	  const translateProperty = (propertyName, resourceId, options) => translate(i18n, 'properties', propertyName, resourceId, options);

	  const translateMessage = (messageName, resourceId, options) => translate(i18n, 'messages', messageName, resourceId, options);

	  return {
	    translateAction,
	    ta: translateAction,
	    translateButton,
	    tb: translateButton,
	    translateLabel,
	    tl: translateLabel,
	    translateProperty,
	    tp: translateProperty,
	    translateMessage,
	    tm: translateMessage,
	    t: i18n.t,
	    translate: i18n.t
	  };
	};

	/**
	 * Extends {@link TranslateFunctions}. Apart from that it also returns all the properties
	 * defined below.
	 *
	 * ```javascript
	 * import { useTranslation } from 'admin-bro'
	 *
	 * const MyComponent = () => {
	 *   const { translateButton } = useTranslation()
	 *
	 *   return (
	 *     <Box>
	 *       <Button variant="primary" onClick={...}>{translateButton('save')}<Button>
	 *     </Box>
	 *   )
	 * }
	 * ```
	 *
	 * @memberof useTranslation
	 * @alias UseTranslationResponse
	 *
	 * @property {TranslateFunction} ... All functions defined in {@link TranslateFunctions}
	 */

	/**
	 * Extends the useTranslation hook from react-i18next library.
	 *
	 * Returns all the {@link TranslateFunctions} + methods returned by the original
	 * useTranslation method from react-i18next like: `i18n` instance and `ready` flag.
	 *
	 * @component
	 * @subcategory Hooks
	 */
	const useTranslation = () => {
	  // eslint-disable-next-line no-shadow
	  const {
	    i18n,
	    ...rest
	  } = reactI18next.useTranslation();
	  const translateFunctions = createFunctions(i18n);
	  return { ...rest,
	    i18n,
	    ...translateFunctions
	  };
	};

	const SidebarPages = props => {
	  const {
	    pages
	  } = props;
	  const {
	    translateLabel
	  } = useTranslation();
	  const h = new ViewHelpers();

	  if (!pages || !pages.length) {
	    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null);
	  }

	  const isActive = (page, location) => !!location.pathname.match(`/pages/${page.name}`);

	  return /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    ml: "lg"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Label, {
	    uppercase: true,
	    color: "grey60",
	    mb: "lg"
	  }, translateLabel('pages')), pages.map(page => /*#__PURE__*/React__default.createElement(SidebarLink, {
	    to: h.pageUrl(page.name),
	    key: page.name,
	    isActive: (match, location) => isActive(page, location),
	    "data-testid": "sidebar-page-link"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Text, {
	    as: "span"
	  }, translateLabel(page.name)))));
	};

	var _extends_1 = createCommonjsModule(function (module) {
	function _extends() {
	  module.exports = _extends = Object.assign || function (target) {
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

	  return _extends.apply(this, arguments);
	}

	module.exports = _extends;
	});

	/**
	 * @private
	 *
	 * @classdesc
	 * Overrides one of the component form AdminBro core when user pass its name to
	 * {@link AdminBro.bundle} method.
	 *
	 * If case of being overridden, component receives additional prop: `OriginalComponent`
	 *
	 * @example
	 * AdminBro.bundle('./path/to/component', 'SidebarFooter')
	 */
	function allowOverride(OriginalComponent, name) {
	  const WrapperComponent = props => {
	    let globalAny = window;
	    globalAny = window;
	    let Component = OriginalComponent;

	    if (globalAny.AdminBro && globalAny.AdminBro.UserComponents && globalAny.AdminBro.UserComponents[name]) {
	      Component = globalAny.AdminBro.UserComponents[name];
	      return /*#__PURE__*/React__default.createElement(Component, _extends_1({}, props, {
	        OriginalComponent: OriginalComponent
	      }));
	    }

	    return /*#__PURE__*/React__default.createElement(Component, props);
	  };

	  return WrapperComponent;
	}

	const SidebarFooter = () => /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	  mt: "lg"
	}, /*#__PURE__*/React__default.createElement(DesignSystem.Text, {
	  color: "grey60",
	  textAlign: "center",
	  fontSize: "sm"
	}, "With", /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	  icon: "FavoriteFilled",
	  color: "love",
	  mx: "xs"
	}), "by", /*#__PURE__*/React__default.createElement(DesignSystem.Link, {
	  href: "http://softwarebrothers.co",
	  target: "_blank",
	  rel: "noopener noreferrer",
	  mx: "xs"
	}, "SoftwareBrothers")));

	var SidebarFooter$1 = allowOverride(SidebarFooter, 'SidebarFooter');

	/* eslint-disable no-param-reassign */
	var groupResources = (resources => {
	  const visibleResources = resources.filter(res => res.href);
	  const map = visibleResources.reduce((memo, resource) => {
	    var _resource$parent, _resource$parent2;

	    const key = ((_resource$parent = resource.parent) === null || _resource$parent === void 0 ? void 0 : _resource$parent.name) || '';

	    if (memo[key]) {
	      memo[key].push(resource);
	    } else {
	      memo[key] = [resource];
	    }

	    memo[key].icon = (_resource$parent2 = resource.parent) === null || _resource$parent2 === void 0 ? void 0 : _resource$parent2.icon;
	    return memo;
	  }, {});
	  return Object.keys(map).map(parentName => ({
	    name: parentName,
	    icon: map[parentName].icon,
	    resources: map[parentName]
	  }));
	});

	const SidebarResource = props => {
	  const {
	    resource
	  } = props;
	  const regExp = new RegExp(`/resources/${resource.id}($|/)`);

	  const isActive = (match, location) => !!location.pathname.match(regExp);

	  if (!resource.href) {
	    return null;
	  }

	  return /*#__PURE__*/React__default.createElement(SidebarLink, {
	    to: resource.href,
	    isActive: isActive,
	    "data-testid": "sidebar-resource-link"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Text, {
	    as: "span"
	  }, resource.name));
	};

	var SidebarResource$1 = reactRouterDom.withRouter(SidebarResource);

	const useSelectedRecords = records => {
	  const [selectedRecords, setSelectedRecords] = React.useState([]);

	  const handleSelect = record => {
	    const selectedIndex = selectedRecords.findIndex(selected => selected.id === record.id);

	    if (selectedIndex < 0) {
	      setSelectedRecords([...selectedRecords, record]);
	    } else {
	      const newSelectedRecords = [...selectedRecords];
	      newSelectedRecords.splice(selectedIndex, 1);
	      setSelectedRecords(newSelectedRecords);
	    }
	  };

	  const handleSelectAll = () => {
	    const missing = records.filter(record => !selectedRecords.find(selected => selected.id === record.id) && record.bulkActions.length);

	    if (missing.length) {
	      setSelectedRecords([...selectedRecords, ...missing]);
	    } else {
	      const newSelectedRecords = selectedRecords.filter(selected => !records.find(record => record.id === selected.id));
	      setSelectedRecords(newSelectedRecords);
	    }
	  };

	  return {
	    handleSelect,
	    handleSelectAll,
	    selectedRecords,
	    setSelectedRecords
	  };
	};

	const DOCS = 'https://adminbro.com';
	const DEFAULT_PATHS = {
	  rootPath: '/admin',
	  logoutPath: '/admin/logout',
	  loginPath: '/admin/login',
	};

	/* eslint-disable @typescript-eslint/explicit-function-return-type */
	const setCurrentAdmin = (data = null) => ({
	  type: 'SESSION_INITIALIZE',
	  data
	});
	const addNotice = (data = {
	  message: ''
	}) => ({
	  type: 'ADD_NOTICE',
	  data: {
	    message: data.message,
	    id: Math.random().toString(36).substr(2, 9),
	    type: data.type || 'success',
	    progress: 0
	  }
	});
	const setNoticeProgress = ({
	  noticeId,
	  progress
	}) => ({
	  type: 'SET_NOTICE_PROGRESS',
	  data: {
	    noticeId,
	    progress
	  }
	});
	const dropNotice = noticeId => ({
	  type: 'DROP_NOTICE',
	  data: {
	    noticeId
	  }
	});

	const resourcesReducer = (state = [], action) => {
	  switch (action.type) {
	    case 'RESOURCES_INITIALIZE':
	      return action.data;

	    default:
	      return state;
	  }
	};

	const pagesReducer = (state = [], action) => {
	  switch (action.type) {
	    case 'PAGES_INITIALIZE':
	      return action.data;

	    default:
	      return state;
	  }
	};

	const localesReducer = (state = {
	  language: 'en',
	  translations: {}
	}, action) => {
	  switch (action.type) {
	    case 'LOCALE_INITIALIZE':
	      return action.data;

	    default:
	      return state;
	  }
	};

	const brandingReducer = (state = {}, action) => {
	  switch (action.type) {
	    case 'BRANDING_INITIALIZE':
	      return action.data;

	    default:
	      return state;
	  }
	};

	const assetsReducer = (state = {}, action) => {
	  switch (action.type) {
	    case 'ASSETS_INITIALIZE':
	      return action.data;

	    default:
	      return state;
	  }
	};

	const pathsReducer = (state = DEFAULT_PATHS, action) => {
	  switch (action.type) {
	    case 'PATHS_INITIALIZE':
	      return action.data;

	    default:
	      return state;
	  }
	};

	const dashboardReducer = (state = {}, action) => {
	  switch (action.type) {
	    case 'DASHBOARD_INITIALIZE':
	      return action.data;

	    default:
	      return state;
	  }
	};

	const sessionReducer = (state = null, action) => {
	  switch (action.type) {
	    case 'SESSION_INITIALIZE':
	      return action.data;

	    default:
	      return state;
	  }
	};

	const versionsReducer = (state = {}, action) => {
	  switch (action.type) {
	    case 'VERSIONS_INITIALIZE':
	      return {
	        admin: action.data.admin,
	        app: action.data.app
	      };

	    default:
	      return state;
	  }
	};

	const noticesReducer = (state = [], action) => {
	  switch (action.type) {
	    case 'ADD_NOTICE':
	      {
	        const notices = [action.data];
	        return notices;
	      }

	    case 'DROP_NOTICE':
	      {
	        return state.filter(notice => notice.id !== action.data.noticeId);
	      }

	    case 'SET_NOTICE_PROGRESS':
	      {
	        return state.map(notice => ({ ...notice,
	          progress: notice.id === action.data.noticeId ? action.data.progress : notice.progress
	        }));
	      }

	    default:
	      return state;
	  }
	};

	const reducer = redux.combineReducers({
	  resources: resourcesReducer,
	  branding: brandingReducer,
	  assets: assetsReducer,
	  paths: pathsReducer,
	  session: sessionReducer,
	  dashboard: dashboardReducer,
	  notices: noticesReducer,
	  versions: versionsReducer,
	  pages: pagesReducer,
	  locale: localesReducer
	});
	var createStore = ((initialState = {}) => redux.createStore(reducer, initialState));

	/**
	 * Hook which allows you to add notice message to the app.
	 *
	 * ```usage
	 * import { useNotice, Button } from 'admin-bro'
	 *
	 * const myComponent = () => {
	 *   const sendNotice = useNotice()
	 *   render (
	 *     <Button onClick={() => sendNotice({ message: 'I am awesome' })}>I am awesome</Button>
	 *   )
	 * }
	 * ```
	 *
	 * @component
	 * @subcategory Hooks
	 */
	const useNotice = () => {
	  const dispatch = reactRedux.useDispatch();
	  return notice => dispatch(addNotice(notice));
	};

	/* eslint-disable no-alert */
	let globalAny$1 = {};

	try {
	  globalAny$1 = window;
	} catch (error) {
	  if (error.message !== 'window is not defined') {
	    throw error;
	  } else {
	    globalAny$1 = {
	      isOnServer: true
	    };
	  }
	}
	/**
	 * Type of an [axios request]{@link https://github.com/axios/axios/blob/master/index.d.ts#L43}
	 *
	 * @typedef {object} AxiosRequestConfig
	 * @alias AxiosRequestConfig
	 * @memberof ApiClient
	 * @see https://github.com/axios/axios/blob/master/index.d.ts#L43
	 */


	const checkResponse = response => {
	  if (globalAny$1.isOnServer) {
	    return;
	  }

	  const loginUrl = [globalAny$1.location.origin, globalAny$1.REDUX_STATE.paths.loginPath].join(''); // if response has redirect to loginUrl

	  if (response.request.responseURL && response.request.responseURL.match(loginUrl)) {
	    // eslint-disable-next-line no-undef
	    alert('Your session expired. You will be redirected to login screen');
	    globalAny$1.location.assign(loginUrl);
	  }
	};
	/**
	 * Extends {@link AxiosRequestConfig}
	 *
	 * @alias ResourceActionAPIParams
	 * @memberof ApiClient
	 * @property {any}   ...    any property supported by {@link AxiosRequestConfig}
	 */


	/**
	 * Client which access the admin API.
	 * Use it to fetch data from auto generated AdminBro API.
	 *
	 * In the backend it uses [axios](https://github.com/axios/axios) client
	 * library.
	 *
	 * Usage:
	 * ```javascript
	 * import { ApiClient } from 'admin-bro'
	 *
	 * const api = new ApiClient()
	 * // fetching all records
	 * api.resourceAction({ resourceId: 'Comments', actionName: 'list' }).then(results => {...})
	 * ```
	 * @see https://github.com/axios/axios
	 */
	class ApiClient {
	  constructor() {
	    this.baseURL = ApiClient.getBaseUrl();
	    this.client = axios.create({
	      baseURL: this.baseURL
	    });
	  }

	  static getBaseUrl() {
	    var _globalAny$REDUX_STAT;

	    if (globalAny$1.isOnServer) {
	      return '';
	    }

	    return [globalAny$1.location.origin, (_globalAny$REDUX_STAT = globalAny$1.REDUX_STATE) === null || _globalAny$REDUX_STAT === void 0 ? void 0 : _globalAny$REDUX_STAT.paths.rootPath].join('');
	  }
	  /**
	   * Search by query string for records in a given resource.
	   *
	   * @param   {Object}  options
	   * @param   {String}  options.resourceId  id of a {@link ResourceJSON}
	   * @param   {String}  options.query       query string
	   *
	   * @return  {Promise<SearchResponse>}
	   */


	  async searchRecords({
	    resourceId,
	    query
	  }) {
	    if (globalAny$1.isOnServer) {
	      return [];
	    }

	    const actionName = 'search';
	    const response = await this.resourceAction({
	      resourceId,
	      actionName,
	      query
	    });
	    checkResponse(response);
	    return response.data.records;
	  }
	  /**
	   * Invokes given resource {@link Action} on the backend.
	   *
	   * @param   {ResourceActionAPIParams}     options
	   * @return  {Promise<ActionResponse>}     response from an {@link Action}
	   */


	  async resourceAction(options) {
	    const {
	      resourceId,
	      actionName,
	      data,
	      query,
	      ...axiosParams
	    } = options;
	    let url = `/api/resources/${resourceId}/actions/${actionName}`;

	    if (query) {
	      const q = encodeURIComponent(query);
	      url = [url, q].join('/');
	    }

	    const response = await this.client.request({
	      url,
	      method: data ? 'POST' : 'GET',
	      ...axiosParams,
	      data
	    });
	    checkResponse(response);
	    return response;
	  }
	  /**
	   * Invokes given record {@link Action} on the backend.
	   *
	   * @param   {RecordActionAPIParams} options
	   * @return  {Promise<RecordActionResponse>}            response from an {@link Action}
	   */


	  async recordAction(options) {
	    const {
	      resourceId,
	      recordId,
	      actionName,
	      data,
	      ...axiosParams
	    } = options;
	    const response = await this.client.request({
	      url: `/api/resources/${resourceId}/records/${recordId}/${actionName}`,
	      method: data ? 'POST' : 'GET',
	      ...axiosParams,
	      data
	    });
	    checkResponse(response);
	    return response;
	  }
	  /**
	   * Invokes given bulk {@link Action} on the backend.
	   *
	   * @param   {BulkActionAPIParams} options
	   * @return  {Promise<BulkActionResponse>}            response from an {@link Action}
	   */


	  async bulkAction(options) {
	    const {
	      resourceId,
	      recordIds,
	      actionName,
	      data,
	      ...axiosParams
	    } = options;
	    const params = new URLSearchParams();
	    params.set('recordIds', recordIds.join(','));
	    const response = await this.client.request({
	      url: `/api/resources/${resourceId}/bulk/${actionName}`,
	      method: data ? 'POST' : 'GET',
	      ...axiosParams,
	      data,
	      params
	    });
	    checkResponse(response);
	    return response;
	  }
	  /**
	   * Invokes dashboard handler.
	   *
	   * @param   {AxiosRequestConfig}       options
	   * @return  {Promise<any>}             response from the handler function defined in
	   *                                     {@link AdminBroOptions#dashboard}
	   */


	  async getDashboard(options = {}) {
	    const response = await this.client.get('/api/dashboard', options);
	    checkResponse(response);
	    return response;
	  }
	  /**
	   * Invokes handler function of given page and returns its response.
	   *
	   * @param   {GetPageAPIParams}                options
	   * @return  {Promise<any>}                    response from the handler of given page
	   *                                            defined in {@link AdminBroOptions#pages}
	   */


	  async getPage(options) {
	    const {
	      pageName,
	      ...axiosParams
	    } = options;
	    const response = await this.client.request({
	      url: `/api/pages/${pageName}`,
	      ...axiosParams
	    });
	    checkResponse(response);
	    return response;
	  }

	}

	const FORM_VALUE_NULL = '__FORM_VALUE_NULL__';
	const FORM_VALUE_EMPTY_OBJECT = '__FORM_VALUE_EMPTY_OBJECT__';
	const FORM_VALUE_EMPTY_ARRAY = '__FORM_VALUE_EMPTY_ARRAY__';
	/**
	 * Changes RecordJSON that it can be send as a FormData to the backend.
	 *
	 * FormData is required because we are sending files via the wire. But it has limitations.
	 * Namely it can only transport files and strings. That is why we have to convert some
	 * standard types like NULL to constants so they can be property converted back by the backend.
	 * And thus properly handled.
	 *
	 *
	 * @param   {RecordJSON}  record
	 * @return  {FormData}
	 */

	function recordToFormData(record) {
	  const formData = new FormData();
	  Object.entries(record.params).forEach(([key, value]) => {
	    // {@link updateRecord} does not change empty objects "{}" - so in order to prevent having
	    // them changed to "[object Object]" we have to set them to empty strings.
	    if (value === null) {
	      return formData.set(key, FORM_VALUE_NULL);
	    } // File objects has to go through because they are handled by FormData


	    if (typeof value === 'object' && value.constructor !== File) {
	      if (Array.isArray(value)) {
	        return formData.set(key, FORM_VALUE_EMPTY_ARRAY);
	      }

	      return formData.set(key, FORM_VALUE_EMPTY_OBJECT);
	    } // Rest goes as a standard value


	    return formData.set(key, value);
	  });
	  return formData;
	}

	/**
	 * Handlers of all [Actions]{@link Action} of type `record` returns record.
	 * Depending on a place and response we have to merge what was returned
	 * to the actual state. It is done in following places:
	 * - {@link useRecord} hook
	 * - {@link RecordInList} component
	 * - {@link RecordAction} component
	 *
	 * @private
	 */
	const mergeRecordResponse = (record, response) => ({ // we start from the response because it can have different recordActions or bulkActions
	  ...(response.record || record),
	  // records has to be reset every time because so that user wont
	  // see old errors which are not relevant anymore
	  errors: response.record.errors,
	  populated: { ...record.populated,
	    ...response.record.populated
	  },
	  params: { ...record.params,
	    ...response.record.params
	  }
	});

	/**
	 * HOF returning a function which takes a record and returns an updated record.
	 * This way we can pass this to setState in react, which takes old state
	 * (in our case previousRecord) as an argument.
	 *
	 * Function is used when to the {@link OnPropertyChange} callback, user passes
	 * key (property name) and the value (followed by an optional selectedRecord).
	 *
	 * The responsibility of the function is to:
	 * - clear old values under passed key: so when user passes property === `some.key`
	 *   function removes `some.key.1`, `some.key.2` etc
	 * - sets new value under the passed key for primitive types
	 * - in case of objects - it flattens them first and then sets all the resulted values
	 *   under the path provided in the property argument
	 * - it fills value in RecordJSON#populated when selectedRecord is given
	 * - finally it invalidates populated for given property
	 *
	 *
	 * @param {string}      property        property that must be updated, supports nesting
	 *                                      with dots
	 * @param {any}         value           value that must be set, undefined or null if
	 *                                      deleting, will be flattened
	 * @param {RecordJSON}  selectedRecord  if value is reference ID, this must be a record
	 *                                      it's referencing to
	 * @private
	 */
	const updateRecord = (property, value, selectedRecord) => previousRecord => {
	  let populatedModified = false;
	  const populatedCopy = { ...previousRecord.populated
	  };
	  const paramsCopy = { ...previousRecord.params
	  }; // clear previous value

	  Object.keys(paramsCopy).filter(key => key === property || key.startsWith(`${property}.`)).forEach(k => delete paramsCopy[k]);

	  if (property in populatedCopy) {
	    delete populatedCopy[property];
	    populatedModified = true;
	  } // set new value


	  if (typeof value !== 'undefined') {
	    if (typeof value === 'object' && !(value instanceof File) && value !== null) {
	      const flattened = flat__default.flatten(value);

	      if (Object.keys(flattened).length) {
	        Object.keys(flattened).forEach(key => {
	          paramsCopy[`${property}.${key}`] = flattened[key];
	        });
	      } else if (Array.isArray(value)) {
	        paramsCopy[property] = [];
	      } else {
	        paramsCopy[property] = {};
	      }
	    } else {
	      paramsCopy[property] = value;
	    }
	  }

	  if (selectedRecord) {
	    populatedCopy[property] = selectedRecord;
	    populatedModified = true;
	  }

	  return { ...previousRecord,
	    params: paramsCopy,
	    populated: populatedModified ? populatedCopy : previousRecord.populated
	  };
	};

	const api = new ApiClient();

	const isEntireRecordGiven = (propertyOrRecord, value) => !!(typeof value === 'undefined' // user can pass property and omit value. This makes sense when
	// third argument of the function (selectedRecord) is passed to onChange
	// callback
	&& !(typeof propertyOrRecord === 'string') // we assume that only params has to be given
	&& propertyOrRecord.params);
	/**
	 * Result of useRecord hook
	 *
	 * @memberof useRecord
	 * @alias UseRecordResult
	 */


	/**
	 * A powerful, hook which allows you to manage an entire record of given type.
	 *
	 * Take a look of creating a component which renders form for some non-existing record.
	 * Form have name and surname fields. After clicking "save" user will create a new record.
	 * Consecutive calls will update it.
	 *
	 * ```javascript
	 * import { BasePropertyComponent, useRecord, Box, useTranslation } from '@admin-bro/design-system'
	 *
	 * const MyRecordActionComponent = (props) => {
	 *   const { record: initialRecord, resource, action } = props
	 *
	 *   const { record, handleChange, submit } = useRecord(initialRecord, resource.id)
	 *   const { translateButton } = useTranslation()
	 *
	 *   const nameProperty = resource.editProperties.find((property) => property.name === 'name')
	 *   const surnameProperty = resource.editProperties.find((property) => property.name === 'surname')
	 *
	 *   const handleSubmit = (event) => {
	 *     submit().then(() => {
	 *        // do something
	 *     })
	 *   }
	 *
	 *   return (
	 *     <Box
	 *       as="form"
	 *       onSubmit={handleSubmit}
	 *     >
	 *       <BasePropertyComponent
	 *         where="edit"
	 *         onChange={handleChange}
	 *         property={nameProperty}
	 *         resource={resource}
	 *         record={record}
	 *       />
	 *       <BasePropertyComponent
	 *         where="edit"
	 *         onChange={handleChange}
	 *         property={surnameProperty}
	 *         resource={resource}
	 *         record={record}
	 *       />
	 *       <Button variant="primary" size="lg">
	 *         {translateButton('save', resource.id)}
	 *       </Button>
	 *     </Box>
	 *   )
	 * }
	 * export default MyRecordActionComponent
	 * ```
	 *
	 * Returns {@link UseRecordResult}.
	 *
	 * @subcategory Hooks
	 * @component
	 */
	const useRecord = (initialRecord, resourceId) => {
	  var _initialRecord$params, _initialRecord$errors, _initialRecord$popula;

	  const [loading, setLoading] = React.useState(false);
	  const [progress, setProgress] = React.useState(0);
	  const [record, setRecord] = React.useState({ ...initialRecord,
	    params: (_initialRecord$params = initialRecord === null || initialRecord === void 0 ? void 0 : initialRecord.params) !== null && _initialRecord$params !== void 0 ? _initialRecord$params : {},
	    errors: (_initialRecord$errors = initialRecord === null || initialRecord === void 0 ? void 0 : initialRecord.errors) !== null && _initialRecord$errors !== void 0 ? _initialRecord$errors : {},
	    populated: (_initialRecord$popula = initialRecord === null || initialRecord === void 0 ? void 0 : initialRecord.populated) !== null && _initialRecord$popula !== void 0 ? _initialRecord$popula : {}
	  });
	  const onNotice = useNotice();
	  React.useEffect(() => {
	    if (initialRecord) {
	      setRecord(initialRecord);
	    }
	  }, [initialRecord]);
	  const handleChange = React.useCallback((propertyOrRecord, value, incomingRecord) => {
	    if (isEntireRecordGiven(propertyOrRecord, value)) {
	      setRecord(propertyOrRecord);
	    } else {
	      setRecord(updateRecord(propertyOrRecord, value, incomingRecord));
	    }
	  }, [setRecord]);
	  const handleSubmit = React.useCallback((customParams = {}) => {
	    setLoading(true);
	    const formData = recordToFormData(record);
	    Object.entries(customParams).forEach(([key, value]) => formData.set(key, value));
	    const params = {
	      resourceId,
	      onUploadProgress: e => setProgress(Math.round(e.loaded * 100 / e.total)),
	      data: formData,
	      headers: {
	        'Content-Type': 'multipart/form-data'
	      }
	    };
	    const promise = record.id ? api.recordAction({ ...params,
	      actionName: 'edit',
	      recordId: record.id
	    }) : api.resourceAction({ ...params,
	      actionName: 'new'
	    });
	    promise.then(response => {
	      if (response.data.notice) {
	        onNotice(response.data.notice);
	      }

	      setRecord(prev => mergeRecordResponse(prev, response.data));
	      setProgress(0);
	      setLoading(false);
	    }).catch(() => {
	      onNotice({
	        message: 'There was an error updating record, Check out console to see more information.',
	        type: 'error'
	      });
	      setProgress(0);
	      setLoading(false);
	    });
	    return promise;
	  }, [record, resourceId, setLoading, setProgress]);
	  return {
	    record,
	    handleChange,
	    submit: handleSubmit,
	    loading,
	    progress
	  };
	};

	const REFRESH_KEY = 'refresh';
	/**
	 * Adds refresh=true to the url, which in turn should cause list to reload.
	 *
	 * @param {string} url      url to which function should add `refresh`
	 * @param {string} [search] optional search query which should be updated,
	 *                          if not given function will use window.location.search
	 * @private
	 */

	const appendForceRefresh = (url, search) => {
	  const params = new URLSearchParams(search !== null && search !== void 0 ? search : window.location.search);
	  params.set(REFRESH_KEY, 'true');
	  return `${url}?${params}`;
	};
	const hasForceRefresh = search => {
	  const params = new URLSearchParams(search);
	  return !!params.get(REFRESH_KEY);
	};
	const removeForceRefresh = search => {
	  const params = new URLSearchParams(search);

	  if (params.get(REFRESH_KEY)) {
	    params.delete(REFRESH_KEY);
	  }

	  return params.toString();
	};

	const api$1 = new ApiClient();
	const useRecords = resourceId => {
	  const [records, setRecords] = React.useState([]);
	  const [loading, setLoading] = React.useState(false);
	  const [perPage, setPerPage] = React.useState(10);
	  const [page, setPage] = React.useState(1);
	  const [total, setTotal] = React.useState(0);
	  const [direction, setDirection] = React.useState('asc');
	  const [sortBy, setSortBy] = React.useState();
	  const location = reactRouter.useLocation();
	  const history = reactRouter.useHistory();
	  const addNotice = useNotice();
	  const {
	    translateMessage
	  } = useTranslation();
	  const onNotice = useNotice();

	  const fetchData = () => {
	    setLoading(true);
	    const query = new URLSearchParams(location.search);
	    const promise = api$1.resourceAction({
	      actionName: 'list',
	      resourceId,
	      params: query
	    });
	    promise.then(response => {
	      const listActionResponse = response.data;

	      if (listActionResponse.notice) {
	        onNotice(listActionResponse.notice);
	      }

	      if (listActionResponse.redirectUrl) {
	        history.push(listActionResponse.redirectUrl);
	        return;
	      }

	      setRecords(listActionResponse.records);
	      setPage(listActionResponse.meta.page);
	      setPerPage(listActionResponse.meta.perPage);
	      setTotal(listActionResponse.meta.total);
	      setDirection(listActionResponse.meta.direction);
	      setSortBy(listActionResponse.meta.sortBy);
	      setLoading(false);
	    }).catch(() => {
	      addNotice({
	        message: translateMessage('errorFetchingRecords', resourceId),
	        type: 'error'
	      });
	    });
	    return promise;
	  };

	  React.useEffect(() => {
	    if (hasForceRefresh(location.search)) {
	      history.replace([location.pathname, removeForceRefresh(location.search).toString()].join('?'));
	    } else {
	      fetchData();
	    }
	  }, [resourceId, location.search]);
	  return {
	    records,
	    loading,
	    page,
	    total,
	    direction,
	    sortBy,
	    perPage,
	    fetchData
	  };
	};

	/**
	 * Hook which allows you to get and set currentAdmin
	 *
	 * ```usage
	 * import { useCurrentAdmin } from 'admin-bro'
	 *
	 * const myComponent = () => {
	 *   const [currentAdmin, setCurrentAdmin] = useCurrentAdmin()
	 *   // ...
	 * }
	 * ```
	 *
	 * @component
	 * @subcategory Hooks
	 */
	const useCurrentAdmin = () => {
	  const currentAdmin = reactRedux.useSelector(state => state.session);
	  const dispatch = reactRedux.useDispatch();
	  return [currentAdmin, admin => dispatch(setCurrentAdmin(admin))];
	};

	var Hooks = /*#__PURE__*/Object.freeze({
		__proto__: null,
		updateRecord: updateRecord,
		useSelectedRecords: useSelectedRecords,
		useNotice: useNotice,
		useTranslation: useTranslation,
		useRecord: useRecord,
		useRecords: useRecords,
		useCurrentAdmin: useCurrentAdmin
	});

	const SidebarParent = props => {
	  const {
	    parent
	  } = props;
	  const {
	    icon,
	    name,
	    resources
	  } = parent;
	  const {
	    translateLabel
	  } = useTranslation();

	  if (!parent.name) {
	    return /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	      pl: "default",
	      pb: "xl",
	      pt: "sm",
	      ml: "sm",
	      className: DesignSystem.cssClass('SidebarParent')
	    }, resources.map(resource => /*#__PURE__*/React__default.createElement(SidebarResource$1, {
	      resource: resource,
	      key: resource.id
	    })));
	  }

	  return /*#__PURE__*/React__default.createElement(DesignSystem.NavGroup, {
	    icon: icon,
	    title: translateLabel(name)
	  }, resources.map(resource => /*#__PURE__*/React__default.createElement(SidebarResource$1, {
	    resource: resource,
	    key: resource.id
	  })));
	};

	/**
	 * @alias SidebarResourceSectionProps
	 * @memberof SidebarResourceSection
	 */

	/**
	 * Groups resources by sections and renders the list in {@link Sidebar}
	 *
	 * ### Usage
	 *
	 * ```
	 * import { SidebarResourceSection } from 'admin-bro`
	 * ```
	 *
	 * @component
	 * @subcategory Application
	 * @name SidebarResourceSection
	 */
	const SidebarResourceSectionOriginal = ({
	  resources
	}) => {
	  const groupedResources = groupResources(resources);
	  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, groupedResources.map(parent => /*#__PURE__*/React__default.createElement(SidebarParent, {
	    parent: parent,
	    key: parent.name
	  })));
	}; // Rollup cannot handle type exports well - that is why we need to do this hack with
	// exporting default and named SidebarResourceSection


	const SidebarResourceSection = allowOverride(SidebarResourceSectionOriginal, 'SidebarResourceSection');

	const Sidebar = props => {
	  const {
	    isVisible
	  } = props;
	  const [branding, resources, pages] = reactRedux.useSelector(state => [state.branding, state.resources, state.pages]);
	  const {
	    translateLabel
	  } = useTranslation();
	  return /*#__PURE__*/React__default.createElement(DesignSystem.Navigation, {
	    className: isVisible ? 'visible' : 'hidden',
	    position: ['absolute', 'absolute', 'absolute', 'absolute', 'inherit']
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    flexShrink: 0,
	    px: "lg",
	    pb: "xxl",
	    className: DesignSystem.cssClass('Logo')
	  }, /*#__PURE__*/React__default.createElement(SidebarBranding, {
	    branding: branding
	  })), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    flexGrow: 1,
	    className: DesignSystem.cssClass('Resources')
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Label, {
	    uppercase: true,
	    ml: "lg",
	    color: "grey60"
	  }, translateLabel('navigation')), /*#__PURE__*/React__default.createElement(SidebarResourceSection, {
	    resources: resources
	  })), /*#__PURE__*/React__default.createElement(SidebarPages, {
	    pages: pages
	  }), branding.softwareBrothers && /*#__PURE__*/React__default.createElement(SidebarFooter$1, null));
	};

	const LoggedIn = props => {
	  const {
	    session,
	    paths
	  } = props;
	  const {
	    translateButton
	  } = useTranslation();
	  return /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    flexShrink: 0,
	    py: "lg"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.LoggedUser, {
	    email: session.email,
	    title: session.title,
	    avatarUrl: session.avatarUrl
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.DropDownItem, null, /*#__PURE__*/React__default.createElement(DesignSystem.Link, {
	    href: paths.logoutPath
	  }, translateButton('logout')))));
	};

	var LoggedIn$1 = allowOverride(LoggedIn, 'LoggedIn');

	const VersionItem = styled__default(DesignSystem.Text).withConfig({
	  displayName: "version__VersionItem",
	  componentId: "rgspw3-0"
	})(["padding:12px 24px 12px 0;"]);
	VersionItem.defaultProps = {
	  display: ['none', 'block'],
	  color: 'grey100'
	};

	const Version = props => {
	  const {
	    versions
	  } = props;
	  const {
	    admin,
	    app
	  } = versions;
	  const {
	    translateLabel
	  } = useTranslation();
	  return /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    flex: true,
	    flexGrow: 1,
	    py: "default",
	    px: "xxl",
	    className: DesignSystem.cssClass('Version')
	  }, admin && /*#__PURE__*/React__default.createElement(VersionItem, null, translateLabel('adminVersion', {
	    version: admin
	  })), app && /*#__PURE__*/React__default.createElement(VersionItem, null, translateLabel('appVersion', {
	    version: app
	  })));
	};

	const NavBar = styled__default(DesignSystem.Box).withConfig({
	  displayName: "top-bar__NavBar",
	  componentId: "sc-1qk1nql-0"
	})(["height:", ";border-bottom:1px solid ", ";background:", ";display:flex;flex-direction:row;flex-shrink:0;"], ({
	  theme
	}) => theme.sizes.navbarHeight, ({
	  theme
	}) => theme.colors.grey20, ({
	  theme
	}) => theme.colors.white);
	NavBar.defaultProps = {
	  className: DesignSystem.cssClass('NavBar')
	};

	const TopBar = props => {
	  const {
	    toggleSidebar
	  } = props;
	  const [session, paths, versions] = reactRedux.useSelector(state => [state.session, state.paths, state.versions]);
	  return /*#__PURE__*/React__default.createElement(NavBar, null, /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    py: "lg",
	    px: ['default', 'lg'],
	    onClick: toggleSidebar,
	    display: ['block', 'block', 'block', 'block', 'none'],
	    style: {
	      cursor: 'pointer'
	    }
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: "Menu",
	    size: 32,
	    color: "grey100"
	  })), /*#__PURE__*/React__default.createElement(Version, {
	    versions: versions
	  }), session && session.email ? /*#__PURE__*/React__default.createElement(LoggedIn$1, {
	    session: session,
	    paths: paths
	  }) : '');
	};

	const TIME_TO_DISAPPEAR = 3;

	class NoticeElement extends React__default.Component {
	  constructor(props) {
	    super(props);
	    const {
	      notice
	    } = props;
	    this.timer = null;
	    this.state = {
	      progress: notice.progress || 0
	    };
	  }

	  componentDidMount() {
	    const {
	      drop,
	      notice,
	      notifyProgress
	    } = this.props;
	    this.timer = setInterval(() => {
	      this.setState(state => {
	        const progress = state.progress + 100 / TIME_TO_DISAPPEAR;
	        notifyProgress({
	          noticeId: notice.id,
	          progress
	        });
	        return {
	          progress
	        };
	      });
	    }, 1000);
	    setTimeout(() => {
	      if (this.timer) {
	        clearInterval(this.timer);
	      }

	      drop();
	    }, 1000 * (TIME_TO_DISAPPEAR + 1));
	  }

	  componentWillUnmount() {
	    if (this.timer) {
	      clearInterval(this.timer);
	    }
	  }

	  render() {
	    const {
	      notice,
	      drop
	    } = this.props;
	    return /*#__PURE__*/React__default.createElement(DesignSystem.MessageBox, {
	      style: {
	        minWidth: '480px'
	      },
	      message: notice.message,
	      variant: notice.type === 'success' ? 'success' : 'danger',
	      onCloseClick: drop
	    });
	  }

	}

	const NoticeBox = props => {
	  const {
	    drop,
	    notices,
	    notifyProgress
	  } = props;
	  const notice = notices.length ? notices[notices.length - 1] : null;

	  if (notice) {
	    return /*#__PURE__*/React__default.createElement("div", {
	      "data-testid": "notice-wrapper"
	    }, /*#__PURE__*/React__default.createElement(NoticeElement, {
	      key: notice.id,
	      notice: notice,
	      drop: () => drop(notice.id),
	      notifyProgress: notifyProgress
	    }));
	  }

	  return /*#__PURE__*/React__default.createElement("div", null);
	};

	const mapStateToProps = state => ({
	  notices: state.notices
	});

	const mapDispatchToProps = dispatch => ({
	  drop: noticeId => dispatch(dropNotice(noticeId)),
	  notifyProgress: ({
	    noticeId,
	    progress
	  }) => dispatch(setNoticeProgress({
	    noticeId,
	    progress
	  }))
	});

	var Notice = reactRedux.connect(mapStateToProps, mapDispatchToProps)(NoticeBox);

	const pageHeaderHeight = 284;
	const pageHeaderPaddingY = 74;
	const pageHeaderPaddingX = 250;

	const DashboardHeader = () => {
	  const {
	    translateMessage
	  } = useTranslation();
	  return /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    position: "relative",
	    overflow: "hidden"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    position: "absolute",
	    top: 50,
	    left: -10,
	    opacity: [0.2, 0.4, 1],
	    animate: true
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Illustration, {
	    variant: "Rocket"
	  })), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    position: "absolute",
	    top: -70,
	    right: -15,
	    opacity: [0.2, 0.4, 1],
	    animate: true
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Illustration, {
	    variant: "Moon"
	  })), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    bg: "grey100",
	    height: pageHeaderHeight,
	    py: pageHeaderPaddingY,
	    px: ['default', 'lg', pageHeaderPaddingX]
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Text, {
	    textAlign: "center",
	    color: "white"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.H2, null, translateMessage('welcomeOnBoard_title')), /*#__PURE__*/React__default.createElement(DesignSystem.Text, {
	    opacity: "0.8"
	  }, translateMessage('welcomeOnBoard_subtitle')))));
	};

	const boxes = ({
	  translateMessage
	}) => [{
	  variant: 'Planet',
	  title: translateMessage('addingResources_title'),
	  subtitle: translateMessage('addingResources_subtitle'),
	  href: 'https://adminbro.com/tutorial-passing-resources.html'
	}, {
	  variant: 'DocumentCheck',
	  title: translateMessage('customizeResources_title'),
	  subtitle: translateMessage('customizeResources_subtitle'),
	  href: 'https://adminbro.com/tutorial-customizing-resources.html'
	}, {
	  variant: 'DocumentSearch',
	  title: translateMessage('customizeActions_title'),
	  subtitle: translateMessage('customizeActions_subtitle'),
	  href: 'https://adminbro.com/tutorial-actions.html'
	}, {
	  variant: 'FlagInCog',
	  title: translateMessage('writeOwnComponents_title'),
	  subtitle: translateMessage('writeOwnComponents_subtitle'),
	  href: 'https://adminbro.com/tutorial-writing-react-components.html'
	}, {
	  variant: 'Folders',
	  title: translateMessage('customDashboard_title'),
	  subtitle: translateMessage('customDashboard_subtitle'),
	  href: 'https://adminbro.com/tutorial-custom-dashboard.html'
	}, {
	  variant: 'Astronaut',
	  title: translateMessage('roleBasedAccess_title'),
	  subtitle: translateMessage('roleBasedAccess_subtitle'),
	  href: 'https://adminbro.com/tutorial-rbac.html'
	}];

	const Card = styled__default(DesignSystem.Box).withConfig({
	  displayName: "default-dashboard__Card",
	  componentId: "y6jxa9-0"
	})(["display:", ";color:", ";text-decoration:none;border:1px solid transparent;&:hover{border:1px solid ", ";box-shadow:", ";}"], ({
	  flex
	}) => flex ? 'flex' : 'block', ({
	  theme
	}) => theme.colors.grey100, ({
	  theme
	}) => theme.colors.primary100, ({
	  theme
	}) => theme.shadows.cardHover);
	Card.defaultProps = {
	  variant: 'white',
	  boxShadow: 'card'
	};

	const Dashboard = () => {
	  const {
	    translateMessage,
	    translateButton
	  } = useTranslation();
	  return /*#__PURE__*/React__default.createElement(DesignSystem.Box, null, /*#__PURE__*/React__default.createElement(DashboardHeader, null), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    mt: ['xl', 'xl', '-100px'],
	    mb: "xl",
	    mx: [0, 0, 0, 'auto'],
	    px: ['default', 'lg', 'xxl', '0'],
	    position: "relative",
	    flex: true,
	    flexDirection: "row",
	    flexWrap: "wrap",
	    width: [1, 1, 1, 1024]
	  }, boxes({
	    translateMessage
	  }).map((box, index) =>
	  /*#__PURE__*/
	  // eslint-disable-next-line react/no-array-index-key
	  React__default.createElement(DesignSystem.Box, {
	    key: index,
	    width: [1, 1 / 2, 1 / 2, 1 / 3],
	    p: "lg"
	  }, /*#__PURE__*/React__default.createElement(Card, {
	    as: "a",
	    href: box.href
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Text, {
	    textAlign: "center"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Illustration, {
	    variant: box.variant,
	    width: 100,
	    height: 70
	  }), /*#__PURE__*/React__default.createElement(DesignSystem.H5, {
	    mt: "lg"
	  }, box.title), /*#__PURE__*/React__default.createElement(DesignSystem.Text, null, box.subtitle))))), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    width: [1, 1, 1 / 2],
	    p: "lg"
	  }, /*#__PURE__*/React__default.createElement(Card, {
	    as: "a",
	    flex: true,
	    href: "https://join.slack.com/t/adminbro/shared_invite/zt-djsqxxpz-_YCS8UMtQ9Ade6DPuLR7Zw"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    flexShrink: 0
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Illustration, {
	    variant: "SlackLogo"
	  })), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    ml: "xl"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.H4, null, translateMessage('community_title')), /*#__PURE__*/React__default.createElement(DesignSystem.Text, null, translateMessage('community_subtitle'))))), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    width: [1, 1, 1 / 2],
	    p: "lg"
	  }, /*#__PURE__*/React__default.createElement(Card, {
	    as: "a",
	    flex: true,
	    href: "https://github.com/SoftwareBrothers/admin-bro/issues"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    flexShrink: 0
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Illustration, {
	    variant: "GithubLogo"
	  })), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    ml: "xl"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.H4, null, translateMessage('foundBug_title')), /*#__PURE__*/React__default.createElement(DesignSystem.Text, null, translateMessage('foundBug_subtitle'))))), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    variant: "white",
	    boxShadow: "card",
	    width: 1,
	    m: "lg"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Text, {
	    textAlign: "center"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Illustration, {
	    variant: "SoftwareBrothersLogo"
	  }), /*#__PURE__*/React__default.createElement(DesignSystem.H4, null, translateMessage('needMoreSolutions_title')), /*#__PURE__*/React__default.createElement(DesignSystem.Text, null, translateMessage('needMoreSolutions_subtitle')), /*#__PURE__*/React__default.createElement(DesignSystem.Text, {
	    mt: "xxl"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Button, {
	    as: "a",
	    size: "sm",
	    variant: "primary",
	    href: "https://softwarebrothers.co/services"
	  }, translateButton('contactUs')))))));
	};

	const ErrorMessage = ({
	  error
	}) => {
	  const {
	    translateMessage
	  } = useTranslation();
	  return /*#__PURE__*/React__default.createElement(DesignSystem.MessageBox, {
	    m: "xxl",
	    variant: "danger",
	    message: "Javascript Error"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Text, null, error.toString()), /*#__PURE__*/React__default.createElement(DesignSystem.Text, {
	    mt: "default"
	  }, translateMessage('seeConsoleForMore')));
	};

	class ErrorBoundary extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      error: null
	    };
	  }

	  componentDidCatch(error) {
	    this.setState({
	      error
	    });
	  }

	  render() {
	    const {
	      children
	    } = this.props;
	    const {
	      error
	    } = this.state;

	    if (error !== null) {
	      return /*#__PURE__*/React__default.createElement(ErrorMessage, {
	        error: error
	      });
	    }

	    return children || null;
	  }

	}

	class Dashboard$1 extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      isClient: false
	    };
	  }

	  componentDidMount() {
	    this.setState({
	      isClient: true
	    });
	  }

	  render() {
	    const {
	      dashboard
	    } = this.props;
	    const {
	      isClient
	    } = this.state;
	    let Component;

	    if (dashboard && dashboard.component && isClient && AdminBro.UserComponents[dashboard.component]) {
	      Component = AdminBro.UserComponents[dashboard.component];
	    } else {
	      Component = Dashboard;
	    }

	    return /*#__PURE__*/React__default.createElement(ErrorBoundary, null, /*#__PURE__*/React__default.createElement(Component, null));
	  }

	}

	const mapStateToProps$1 = state => ({
	  dashboard: state.dashboard
	});

	var Dashboard$2 = reactRedux.connect(mapStateToProps$1)(Dashboard$1);

	/**
	 * Converts flatten params to array items when given property is an array.
	 *
	 * What problem it solves:
	 * so let say user has a record with record.property:
	 * ```
	 * Item.0.imageVariants.0.dateCreated: "2019-09-19T10:00:00.000Z"
	 * Item.0.imageVariants.0.imageURL: "url to help"
	 * Item.0.imageVariants.0.isApproved: true
	 * Item.0.imageVariants.0.isDeleted: false
	 * Item.0.imageVariants.1.dateCreated: "2019-09-19T19:10:34.919Z"
	 * Item.0.imageVariants.1.imageURL: "url 2"
	 * ```
	 *
	 * this function for property: `Item.0.imageVariants` should return array with 2 items. Where for
	 * property `Item` array with one element
	 *
	 * @param {PropertyJSON} property
	 * @param {RecordJSON} record
	 *
	 * @private
	 */
	const convertParamsToArrayItems = (property, record) => {
	  const tempName = 'arrayField';
	  const regex = new RegExp(`^${property.name}`);
	  /**
	   * in this step we filter keys which starts with regex the same as name. So let say
	   * property name is: Item.0.imageVariants and the record.params is:
	   * {
	   *  'anyOtherKey': 'value'
	   *  'Item.0.imageVariants.0.dateCreated': '2019-09-19T10:00:00.000Z',
	   *  'Item.0.imageVariants.0.imageURL': 'url to help'
	   * }
	   *
	   * so keys will be `Item.0.imageVariants.0.dateCreated` and `Item.0.imageVariants.0.imageURL`
	   */

	  const keys = Object.keys(record.params).filter(key => key.match(regex));
	  /**
	   * Next, we create new object with only those keys. But we have to rename the regex part
	   * because it could has dots (take a look at const tempName = 'arrayField' on the top).
	   * If we didn't do this - then unflatten function wouldn't work.
	   *
	   * so in our example obj is not: {
	   *  'Item.0.imageVariants.0.dateCreated': '2019-09-19T10:00:00.000Z',
	   *  'Item.0.imageVariants.0.imageURL': 'url to help'
	   * }
	   *
	   * but: {
	   *  'arrayField.0.dateCreated': '2019-09-19T10:00:00.000Z',
	   *  'arrayField.0.imageURL': 'url to help'
	   * }
	   */

	  const obj = keys.reduce((memo, key) => ({ ...memo,
	    [key.replace(regex, tempName)]: record.params[key]
	  }), {});
	  /**
	   * In the last step we unflatten the object and return 'tempName' property:
	   * {
	   *  'arrayField: [{
	   *     dateCreated': '2019-09-19T10:00:00.000Z',
	   *     'arrayField.0.imageURL': 'url to help',
	   *   }],
	   * }['arrayField']
	   */

	  const unflatten = flat__default.unflatten(obj);
	  return unflatten[tempName] || [];
	};

	const {
	  flatten
	} = flat__default;
	/**
	 * for given params:
	 *
	 * example:
	 * ```
	 * anotherItem: 'value'
	 * Item.0.imageVariants.0.dateCreated: "2019-09-19T10:00:00.000Z"
	 * Item.0.imageVariants.0.imageURL: "url to help"
	 * Item.0.imageVariants.0.isApproved: true
	 * Item.0.imageVariants.0.isDeleted: false
	 * Item.0.imageVariants.1.dateCreated: "2019-09-19T19:10:34.919Z"
	 * Item.0.imageVariants.1.imageURL: "url 2"
	 * ```
	 *
	 * and given propertyPath, example: `Item.0.imageVariants`
	 * and new array, example: [{
	 *   dateCreated: "2019-09-19T19:10:34.919Z"
	 *   imageURL: "url 2"
	 * }]
	 *
	 * returns:
	 * ```
	 * anotherItem: 'value'
	 * Item.0.imageVariants.1.dateCreated: "2019-09-19T19:10:34.919Z"
	 * Item.0.imageVariants.1.imageURL: "url 2"
	 * ```
	 *
	 * @private
	 */

	function updateParamsArray(params, propertyPath, array) {
	  const regex = new RegExp(`^${propertyPath}`);
	  const filteredParams = Object.entries(params).filter(([key]) => !key.match(regex)).reduce((memo, [key, value]) => ({ ...memo,
	    [key]: value
	  }), {});
	  return flatten({ ...filteredParams,
	    [propertyPath]: array
	  });
	}

	const AddNewItemButton = props => {
	  const {
	    resource,
	    property
	  } = props;
	  const {
	    translateProperty,
	    translateButton
	  } = useTranslation();
	  const label = translateProperty(`${property.name}.addNewItem`, resource.id, {
	    defaultValue: translateButton('addNewItem', resource.id)
	  });
	  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: "Add"
	  }), label);
	};

	const {
	  flatten: flatten$1,
	  unflatten
	} = flat__default;

	const normalizeParams = params => flatten$1(unflatten(params, {
	  overwrite: true
	}));

	const ItemRenderer = props => {
	  const {
	    ItemComponent,
	    property,
	    i,
	    onDelete
	  } = props;
	  return /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    flex: true,
	    flexDirection: "row",
	    alignItems: "center",
	    "data-testid": `array-item-${i}`
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    flexGrow: 1
	  }, /*#__PURE__*/React__default.createElement(ItemComponent, _extends_1({}, props, {
	    property: { ...property,
	      name: `${property.name}.${i}`,
	      label: `[${i + 1}]`,
	      isArray: false
	    }
	  }))), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    flexShrink: 0
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Button, {
	    ml: "default",
	    "data-testid": "delete-item",
	    type: "button",
	    size: "icon",
	    onClick: event => onDelete(event),
	    variant: "danger"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: "Delete"
	  }))));
	};

	class Edit extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.addNew = this.addNew.bind(this);
	  }

	  addNew(event) {
	    const {
	      property,
	      record,
	      onChange
	    } = this.props;
	    const items = convertParamsToArrayItems(property, record);
	    const newRecord = { ...record
	    };
	    newRecord.params = normalizeParams({ ...newRecord.params,
	      // otherwise yarn types is not working
	      [property.name]: [...items, property.subProperties.length ? {} : '']
	    });
	    onChange(newRecord);
	    event.preventDefault();
	    return false;
	  }

	  removeItem(i, event) {
	    const {
	      property,
	      record,
	      onChange
	    } = this.props;
	    const items = convertParamsToArrayItems(property, record);
	    const newItems = [...items];
	    newItems.splice(i, 1);
	    const newRecord = { ...record
	    };
	    newRecord.params = updateParamsArray(newRecord.params, property.name, newItems);
	    onChange(newRecord);
	    event.preventDefault();
	    return false;
	  }

	  renderInput() {
	    const {
	      property,
	      record,
	      resource
	    } = this.props;
	    const items = convertParamsToArrayItems(property, record);
	    return /*#__PURE__*/React__default.createElement(DesignSystem.Section, {
	      mt: "xl"
	    }, items.map((item, i) => /*#__PURE__*/React__default.createElement(ItemRenderer, _extends_1({}, this.props, {
	      // eslint-disable-next-line react/no-array-index-key
	      key: i,
	      i: i,
	      onDelete: event => this.removeItem(i, event)
	    }))), /*#__PURE__*/React__default.createElement(DesignSystem.Button, {
	      onClick: this.addNew,
	      type: "button",
	      size: "sm"
	    }, /*#__PURE__*/React__default.createElement(AddNewItemButton, {
	      resource: resource,
	      property: property
	    })));
	  }

	  render() {
	    const {
	      property,
	      record,
	      testId
	    } = this.props;
	    const error = record.errors && record.errors[property.name];
	    return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, {
	      error: !!error,
	      "data-testid": testId
	    }, /*#__PURE__*/React__default.createElement(DesignSystem.Label, {
	      htmlFor: property.name,
	      required: property.isRequired
	    }, property.label), this.renderInput(), /*#__PURE__*/React__default.createElement(DesignSystem.FormMessage, null, error && error.message));
	  }

	}

	const List = props => {
	  const {
	    property,
	    record
	  } = props;
	  const unflatten = flat__default.unflatten(record.params);
	  const values = unflatten[property.name] || [];
	  return /*#__PURE__*/React__default.createElement("span", null, `length: ${values.length}`);
	};

	class Show extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record,
	      ItemComponent
	    } = this.props;
	    const items = convertParamsToArrayItems(property, record);
	    return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, null, /*#__PURE__*/React__default.createElement(DesignSystem.Label, null, property.label), /*#__PURE__*/React__default.createElement(DesignSystem.Section, null, items.map((item, i) => /*#__PURE__*/React__default.createElement(ItemComponent, _extends_1({}, this.props, {
	      // eslint-disable-next-line react/no-array-index-key
	      key: i,
	      property: { ...property,
	        name: `${property.name}.${i}`,
	        label: `[${i + 1}]`,
	        isArray: false
	      }
	    })))));
	  }

	}

	// import Show from './show'

	var ArrayType = /*#__PURE__*/Object.freeze({
		__proto__: null,
		show: Show,
		edit: Edit,
		list: List
	});

	const Edit$1 = props => {
	  const {
	    property,
	    record,
	    ItemComponent
	  } = props;
	  const error = record.errors && record.errors[property.name];
	  return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, {
	    error: !!error
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Label, {
	    htmlFor: property.name,
	    required: property.isRequired
	  }, property.label), /*#__PURE__*/React__default.createElement(DesignSystem.Section, null, property.subProperties.filter(subProperty => !subProperty.isId).map(subProperty => /*#__PURE__*/React__default.createElement(ItemComponent, _extends_1({}, props, {
	    key: subProperty.name,
	    property: { ...subProperty,
	      name: `${property.name}.${subProperty.name}`
	    }
	  })))), /*#__PURE__*/React__default.createElement(DesignSystem.FormMessage, null, error && error.message));
	};

	const Show$1 = props => {
	  const {
	    property,
	    ItemComponent
	  } = props;
	  return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, null, /*#__PURE__*/React__default.createElement(DesignSystem.Label, null, property.label), /*#__PURE__*/React__default.createElement(DesignSystem.Section, null, property.subProperties.filter(subProperty => !subProperty.isId).map(subProperty => /*#__PURE__*/React__default.createElement(ItemComponent, _extends_1({}, props, {
	    key: subProperty.name,
	    property: { ...subProperty,
	      name: `${property.name}.${subProperty.name}`
	    }
	  })))));
	};

	// TODO define ItemComponent interface
	class List$1 extends React__default.PureComponent {
	  renderItems() {
	    const {
	      property,
	      ItemComponent
	    } = this.props;
	    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, property.subProperties.filter(subProperty => !subProperty.isId).map(subProperty => /*#__PURE__*/React__default.createElement("div", {
	      key: subProperty.name
	    }, /*#__PURE__*/React__default.createElement(DesignSystem.Label, {
	      inline: true
	    }, `${subProperty.label}: `), /*#__PURE__*/React__default.createElement(ItemComponent, _extends_1({}, this.props, {
	      key: subProperty.name,
	      property: { ...subProperty,
	        name: `${property.name}.${subProperty.name}`
	      }
	    })))));
	  }

	  render() {
	    const {
	      property,
	      record,
	      resource
	    } = this.props;
	    const showAction = record.recordActions.find(a => a.name === 'show');

	    if (resource.titleProperty.name === property.name && showAction) {
	      const h = new ViewHelpers();
	      const href = h.recordActionUrl({
	        resourceId: resource.id,
	        recordId: record.id,
	        actionName: 'show'
	      });
	      return /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
	        to: href
	      }, this.renderItems());
	    }

	    return this.renderItems();
	  }

	}

	// import Show from './show'

	var MixedType = /*#__PURE__*/Object.freeze({
		__proto__: null,
		show: Show$1,
		edit: Edit$1,
		list: List$1
	});

	const DefaultPropertyValue = props => {
	  const {
	    property,
	    record
	  } = props;
	  const rawValue = record === null || record === void 0 ? void 0 : record.params[property.name];

	  if (typeof rawValue === 'undefined') {
	    return null;
	  }

	  if (property.availableValues) {
	    const option = property.availableValues.find(opt => opt.value === rawValue);

	    if (!option) {
	      return rawValue;
	    }

	    return /*#__PURE__*/React__default.createElement(DesignSystem.Badge, null, (option === null || option === void 0 ? void 0 : option.label) || rawValue);
	  }

	  return rawValue;
	};

	class Show$2 extends React__default.PureComponent {
	  render() {
	    const {
	      property
	    } = this.props;
	    return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, null, /*#__PURE__*/React__default.createElement(DesignSystem.Label, null, property.label), /*#__PURE__*/React__default.createElement(DefaultPropertyValue, this.props));
	  }

	}

	function areInputsEqual(newInputs, lastInputs) {
	    if (newInputs.length !== lastInputs.length) {
	        return false;
	    }
	    for (var i = 0; i < newInputs.length; i++) {
	        if (newInputs[i] !== lastInputs[i]) {
	            return false;
	        }
	    }
	    return true;
	}

	function memoizeOne(resultFn, isEqual) {
	    if (isEqual === void 0) { isEqual = areInputsEqual; }
	    var lastThis;
	    var lastArgs = [];
	    var lastResult;
	    var calledOnce = false;
	    function memoized() {
	        var newArgs = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            newArgs[_i] = arguments[_i];
	        }
	        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
	            return lastResult;
	        }
	        lastResult = resultFn.apply(this, newArgs);
	        calledOnce = true;
	        lastThis = this;
	        lastArgs = newArgs;
	        return lastResult;
	    }
	    return memoized;
	}

	function memoize(fn) {
	  var cache = {};
	  return function (arg) {
	    if (cache[arg] === undefined) cache[arg] = fn(arg);
	    return cache[arg];
	  };
	}

	var unitlessKeys = {
	  animationIterationCount: 1,
	  borderImageOutset: 1,
	  borderImageSlice: 1,
	  borderImageWidth: 1,
	  boxFlex: 1,
	  boxFlexGroup: 1,
	  boxOrdinalGroup: 1,
	  columnCount: 1,
	  columns: 1,
	  flex: 1,
	  flexGrow: 1,
	  flexPositive: 1,
	  flexShrink: 1,
	  flexNegative: 1,
	  flexOrder: 1,
	  gridRow: 1,
	  gridRowEnd: 1,
	  gridRowSpan: 1,
	  gridRowStart: 1,
	  gridColumn: 1,
	  gridColumnEnd: 1,
	  gridColumnSpan: 1,
	  gridColumnStart: 1,
	  fontWeight: 1,
	  lineHeight: 1,
	  opacity: 1,
	  order: 1,
	  orphans: 1,
	  tabSize: 1,
	  widows: 1,
	  zIndex: 1,
	  zoom: 1,
	  WebkitLineClamp: 1,
	  // SVG-related properties
	  fillOpacity: 1,
	  floodOpacity: 1,
	  stopOpacity: 1,
	  strokeDasharray: 1,
	  strokeDashoffset: 1,
	  strokeMiterlimit: 1,
	  strokeOpacity: 1,
	  strokeWidth: 1
	};

	/* eslint-disable */
	// murmurhash2 via https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
	function murmurhash2_32_gc(str) {
	  var l = str.length,
	      h = l ^ l,
	      i = 0,
	      k;

	  while (l >= 4) {
	    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
	    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	    k ^= k >>> 24;
	    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
	    l -= 4;
	    ++i;
	  }

	  switch (l) {
	    case 3:
	      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

	    case 2:
	      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

	    case 1:
	      h ^= str.charCodeAt(i) & 0xff;
	      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	  }

	  h ^= h >>> 13;
	  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	  h ^= h >>> 15;
	  return (h >>> 0).toString(36);
	}

	function stylis_min (W) {
	  function M(d, c, e, h, a) {
	    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
	      g = e.charCodeAt(l);
	      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

	      if (0 === b + n + v + m) {
	        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
	          switch (g) {
	            case 32:
	            case 9:
	            case 59:
	            case 13:
	            case 10:
	              break;

	            default:
	              f += e.charAt(l);
	          }

	          g = 59;
	        }

	        switch (g) {
	          case 123:
	            f = f.trim();
	            q = f.charCodeAt(0);
	            k = 1;

	            for (t = ++l; l < B;) {
	              switch (g = e.charCodeAt(l)) {
	                case 123:
	                  k++;
	                  break;

	                case 125:
	                  k--;
	                  break;

	                case 47:
	                  switch (g = e.charCodeAt(l + 1)) {
	                    case 42:
	                    case 47:
	                      a: {
	                        for (u = l + 1; u < J; ++u) {
	                          switch (e.charCodeAt(u)) {
	                            case 47:
	                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
	                                l = u + 1;
	                                break a;
	                              }

	                              break;

	                            case 10:
	                              if (47 === g) {
	                                l = u + 1;
	                                break a;
	                              }

	                          }
	                        }

	                        l = u;
	                      }

	                  }

	                  break;

	                case 91:
	                  g++;

	                case 40:
	                  g++;

	                case 34:
	                case 39:
	                  for (; l++ < J && e.charCodeAt(l) !== g;) {
	                  }

	              }

	              if (0 === k) break;
	              l++;
	            }

	            k = e.substring(t, l);
	            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

	            switch (q) {
	              case 64:
	                0 < r && (f = f.replace(N, ''));
	                g = f.charCodeAt(1);

	                switch (g) {
	                  case 100:
	                  case 109:
	                  case 115:
	                  case 45:
	                    r = c;
	                    break;

	                  default:
	                    r = O;
	                }

	                k = M(c, r, k, g, a + 1);
	                t = k.length;
	                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
	                if (0 < t) switch (g) {
	                  case 115:
	                    f = f.replace(da, ea);

	                  case 100:
	                  case 109:
	                  case 45:
	                    k = f + '{' + k + '}';
	                    break;

	                  case 107:
	                    f = f.replace(fa, '$1 $2');
	                    k = f + '{' + k + '}';
	                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
	                    break;

	                  default:
	                    k = f + k, 112 === h && (k = (p += k, ''));
	                } else k = '';
	                break;

	              default:
	                k = M(c, X(c, f, I), k, h, a + 1);
	            }

	            F += k;
	            k = I = r = u = q = 0;
	            f = '';
	            g = e.charCodeAt(++l);
	            break;

	          case 125:
	          case 59:
	            f = (0 < r ? f.replace(N, '') : f).trim();
	            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
	              case 0:
	                break;

	              case 64:
	                if (105 === g || 99 === g) {
	                  G += f + e.charAt(l);
	                  break;
	                }

	              default:
	                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
	            }
	            I = r = u = q = 0;
	            f = '';
	            g = e.charCodeAt(++l);
	        }
	      }

	      switch (g) {
	        case 13:
	        case 10:
	          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
	          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
	          z = 1;
	          D++;
	          break;

	        case 59:
	        case 125:
	          if (0 === b + n + v + m) {
	            z++;
	            break;
	          }

	        default:
	          z++;
	          y = e.charAt(l);

	          switch (g) {
	            case 9:
	            case 32:
	              if (0 === n + m + b) switch (x) {
	                case 44:
	                case 58:
	                case 9:
	                case 32:
	                  y = '';
	                  break;

	                default:
	                  32 !== g && (y = ' ');
	              }
	              break;

	            case 0:
	              y = '\\0';
	              break;

	            case 12:
	              y = '\\f';
	              break;

	            case 11:
	              y = '\\v';
	              break;

	            case 38:
	              0 === n + b + m && (r = I = 1, y = '\f' + y);
	              break;

	            case 108:
	              if (0 === n + b + m + E && 0 < u) switch (l - u) {
	                case 2:
	                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

	                case 8:
	                  111 === K && (E = K);
	              }
	              break;

	            case 58:
	              0 === n + b + m && (u = l);
	              break;

	            case 44:
	              0 === b + v + n + m && (r = 1, y += '\r');
	              break;

	            case 34:
	            case 39:
	              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
	              break;

	            case 91:
	              0 === n + b + v && m++;
	              break;

	            case 93:
	              0 === n + b + v && m--;
	              break;

	            case 41:
	              0 === n + b + m && v--;
	              break;

	            case 40:
	              if (0 === n + b + m) {
	                if (0 === q) switch (2 * x + 3 * K) {
	                  case 533:
	                    break;

	                  default:
	                    q = 1;
	                }
	                v++;
	              }

	              break;

	            case 64:
	              0 === b + v + n + m + u + k && (k = 1);
	              break;

	            case 42:
	            case 47:
	              if (!(0 < n + m + v)) switch (b) {
	                case 0:
	                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
	                    case 235:
	                      b = 47;
	                      break;

	                    case 220:
	                      t = l, b = 42;
	                  }

	                  break;

	                case 42:
	                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
	              }
	          }

	          0 === b && (f += y);
	      }

	      K = x;
	      x = g;
	      l++;
	    }

	    t = p.length;

	    if (0 < t) {
	      r = c;
	      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
	      p = r.join(',') + '{' + p + '}';

	      if (0 !== w * E) {
	        2 !== w || L(p, 2) || (E = 0);

	        switch (E) {
	          case 111:
	            p = p.replace(ha, ':-moz-$1') + p;
	            break;

	          case 112:
	            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
	        }

	        E = 0;
	      }
	    }

	    return G + p + F;
	  }

	  function X(d, c, e) {
	    var h = c.trim().split(ia);
	    c = h;
	    var a = h.length,
	        m = d.length;

	    switch (m) {
	      case 0:
	      case 1:
	        var b = 0;

	        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
	          c[b] = Z(d, c[b], e).trim();
	        }

	        break;

	      default:
	        var v = b = 0;

	        for (c = []; b < a; ++b) {
	          for (var n = 0; n < m; ++n) {
	            c[v++] = Z(d[n] + ' ', h[b], e).trim();
	          }
	        }

	    }

	    return c;
	  }

	  function Z(d, c, e) {
	    var h = c.charCodeAt(0);
	    33 > h && (h = (c = c.trim()).charCodeAt(0));

	    switch (h) {
	      case 38:
	        return c.replace(F, '$1' + d.trim());

	      case 58:
	        return d.trim() + c.replace(F, '$1' + d.trim());

	      default:
	        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
	    }

	    return d + c;
	  }

	  function P(d, c, e, h) {
	    var a = d + ';',
	        m = 2 * c + 3 * e + 4 * h;

	    if (944 === m) {
	      d = a.indexOf(':', 9) + 1;
	      var b = a.substring(d, a.length - 1).trim();
	      b = a.substring(0, d).trim() + b + ';';
	      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
	    }

	    if (0 === w || 2 === w && !L(a, 1)) return a;

	    switch (m) {
	      case 1015:
	        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

	      case 951:
	        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

	      case 963:
	        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

	      case 1009:
	        if (100 !== a.charCodeAt(4)) break;

	      case 969:
	      case 942:
	        return '-webkit-' + a + a;

	      case 978:
	        return '-webkit-' + a + '-moz-' + a + a;

	      case 1019:
	      case 983:
	        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

	      case 883:
	        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
	        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
	        break;

	      case 932:
	        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
	          case 103:
	            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

	          case 115:
	            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

	          case 98:
	            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
	        }
	        return '-webkit-' + a + '-ms-' + a + a;

	      case 964:
	        return '-webkit-' + a + '-ms-flex-' + a + a;

	      case 1023:
	        if (99 !== a.charCodeAt(8)) break;
	        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
	        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

	      case 1005:
	        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

	      case 1e3:
	        b = a.substring(13).trim();
	        c = b.indexOf('-') + 1;

	        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
	          case 226:
	            b = a.replace(G, 'tb');
	            break;

	          case 232:
	            b = a.replace(G, 'tb-rl');
	            break;

	          case 220:
	            b = a.replace(G, 'lr');
	            break;

	          default:
	            return a;
	        }

	        return '-webkit-' + a + '-ms-' + b + a;

	      case 1017:
	        if (-1 === a.indexOf('sticky', 9)) break;

	      case 975:
	        c = (a = d).length - 10;
	        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

	        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
	          case 203:
	            if (111 > b.charCodeAt(8)) break;

	          case 115:
	            a = a.replace(b, '-webkit-' + b) + ';' + a;
	            break;

	          case 207:
	          case 102:
	            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
	        }

	        return a + ';';

	      case 938:
	        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
	          case 105:
	            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

	          case 115:
	            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

	          default:
	            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
	        }
	        break;

	      case 973:
	      case 989:
	        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

	      case 931:
	      case 953:
	        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
	        break;

	      case 962:
	        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
	    }

	    return a;
	  }

	  function L(d, c) {
	    var e = d.indexOf(1 === c ? ':' : '{'),
	        h = d.substring(0, 3 !== c ? e : 10);
	    e = d.substring(e + 1, d.length - 1);
	    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
	  }

	  function ea(d, c) {
	    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
	    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
	  }

	  function H(d, c, e, h, a, m, b, v, n, q) {
	    for (var g = 0, x = c, w; g < A; ++g) {
	      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
	        case void 0:
	        case !1:
	        case !0:
	        case null:
	          break;

	        default:
	          x = w;
	      }
	    }

	    if (x !== c) return x;
	  }

	  function T(d) {
	    switch (d) {
	      case void 0:
	      case null:
	        A = S.length = 0;
	        break;

	      default:
	        switch (d.constructor) {
	          case Array:
	            for (var c = 0, e = d.length; c < e; ++c) {
	              T(d[c]);
	            }

	            break;

	          case Function:
	            S[A++] = d;
	            break;

	          case Boolean:
	            Y = !!d | 0;
	        }

	    }

	    return T;
	  }

	  function U(d) {
	    d = d.prefix;
	    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
	    return U;
	  }

	  function B(d, c) {
	    var e = d;
	    33 > e.charCodeAt(0) && (e = e.trim());
	    V = e;
	    e = [V];

	    if (0 < A) {
	      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
	      void 0 !== h && 'string' === typeof h && (c = h);
	    }

	    var a = M(O, e, c, 0, 0);
	    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
	    V = '';
	    E = 0;
	    z = D = 1;
	    return a;
	  }

	  var ca = /^\0+/g,
	      N = /[\0\r\f]/g,
	      aa = /: */g,
	      ka = /zoo|gra/,
	      ma = /([,: ])(transform)/g,
	      ia = /,\r+?/g,
	      F = /([\t\r\n ])*\f?&/g,
	      fa = /@(k\w+)\s*(\S*)\s*/,
	      Q = /::(place)/g,
	      ha = /:(read-only)/g,
	      G = /[svh]\w+-[tblr]{2}/,
	      da = /\(\s*(.*)\s*\)/g,
	      oa = /([\s\S]*?);/g,
	      ba = /-self|flex-/g,
	      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
	      la = /stretch|:\s*\w+\-(?:conte|avail)/,
	      ja = /([^-])(image-set\()/,
	      z = 1,
	      D = 1,
	      E = 0,
	      w = 1,
	      O = [],
	      S = [],
	      A = 0,
	      R = null,
	      Y = 0,
	      V = '';
	  B.use = T;
	  B.set = U;
	  void 0 !== W && U(W);
	  return B;
	}

	var stylisRuleSheet = createCommonjsModule(function (module, exports) {
	(function (factory) {
		 (module['exports'] = factory()) ;
	}(function () {

		return function (insertRule) {
			var delimiter = '/*|*/';
			var needle = delimiter+'}';

			function toSheet (block) {
				if (block)
					try {
						insertRule(block + '}');
					} catch (e) {}
			}

			return function ruleSheet (context, content, selectors, parents, line, column, length, ns, depth, at) {
				switch (context) {
					// property
					case 1:
						// @import
						if (depth === 0 && content.charCodeAt(0) === 64)
							return insertRule(content+';'), ''
						break
					// selector
					case 2:
						if (ns === 0)
							return content + delimiter
						break
					// at-rule
					case 3:
						switch (ns) {
							// @font-face, @page
							case 102:
							case 112:
								return insertRule(selectors[0]+content), ''
							default:
								return content + (at === 0 ? delimiter : '')
						}
					case -2:
						content.split(needle).forEach(toSheet);
				}
			}
		}
	}));
	});

	var hyphenateRegex = /[A-Z]|^ms/g;
	var processStyleName = memoize(function (styleName) {
	  return styleName.replace(hyphenateRegex, '-$&').toLowerCase();
	});
	var processStyleValue = function processStyleValue(key, value) {
	  if (value == null || typeof value === 'boolean') {
	    return '';
	  }

	  if (unitlessKeys[key] !== 1 && key.charCodeAt(1) !== 45 && // custom properties
	  !isNaN(value) && value !== 0) {
	    return value + 'px';
	  }

	  return value;
	};

	{
	  var contentValuePattern = /(attr|calc|counters?|url)\(/;
	  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
	  var oldProcessStyleValue = processStyleValue;

	  processStyleValue = function processStyleValue(key, value) {
	    if (key === 'content') {
	      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
	        console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
	      }
	    }

	    return oldProcessStyleValue(key, value);
	  };
	}

	var classnames = function classnames(args) {
	  var len = args.length;
	  var i = 0;
	  var cls = '';

	  for (; i < len; i++) {
	    var arg = args[i];
	    if (arg == null) continue;
	    var toAdd = void 0;

	    switch (typeof arg) {
	      case 'boolean':
	        break;

	      case 'function':
	        {
	          console.error('Passing functions to cx is deprecated and will be removed in the next major version of Emotion.\n' + 'Please call the function before passing it to cx.');
	        }

	        toAdd = classnames([arg()]);
	        break;

	      case 'object':
	        {
	          if (Array.isArray(arg)) {
	            toAdd = classnames(arg);
	          } else {
	            toAdd = '';

	            for (var k in arg) {
	              if (arg[k] && k) {
	                toAdd && (toAdd += ' ');
	                toAdd += k;
	              }
	            }
	          }

	          break;
	        }

	      default:
	        {
	          toAdd = arg;
	        }
	    }

	    if (toAdd) {
	      cls && (cls += ' ');
	      cls += toAdd;
	    }
	  }

	  return cls;
	};
	var isBrowser = typeof document !== 'undefined';

	/*

	high performance StyleSheet for css-in-js systems

	- uses multiple style tags behind the scenes for millions of rules
	- uses `insertRule` for appending in production for *much* faster performance
	- 'polyfills' on server side

	// usage

	import StyleSheet from 'glamor/lib/sheet'
	let styleSheet = new StyleSheet()

	styleSheet.inject()
	- 'injects' the stylesheet into the page (or into memory if on server)

	styleSheet.insert('#box { border: 1px solid red; }')
	- appends a css rule into the stylesheet

	styleSheet.flush()
	- empties the stylesheet of all its contents

	*/
	// $FlowFixMe
	function sheetForTag(tag) {
	  if (tag.sheet) {
	    // $FlowFixMe
	    return tag.sheet;
	  } // this weirdness brought to you by firefox


	  for (var i = 0; i < document.styleSheets.length; i++) {
	    if (document.styleSheets[i].ownerNode === tag) {
	      // $FlowFixMe
	      return document.styleSheets[i];
	    }
	  }
	}

	function makeStyleTag(opts) {
	  var tag = document.createElement('style');
	  tag.setAttribute('data-emotion', opts.key || '');

	  if (opts.nonce !== undefined) {
	    tag.setAttribute('nonce', opts.nonce);
	  }

	  tag.appendChild(document.createTextNode('')) // $FlowFixMe
	  ;
	  (opts.container !== undefined ? opts.container : document.head).appendChild(tag);
	  return tag;
	}

	var StyleSheet =
	/*#__PURE__*/
	function () {
	  function StyleSheet(options) {
	    this.isSpeedy = "development" === 'production'; // the big drawback here is that the css won't be editable in devtools

	    this.tags = [];
	    this.ctr = 0;
	    this.opts = options;
	  }

	  var _proto = StyleSheet.prototype;

	  _proto.inject = function inject() {
	    if (this.injected) {
	      throw new Error('already injected!');
	    }

	    this.tags[0] = makeStyleTag(this.opts);
	    this.injected = true;
	  };

	  _proto.speedy = function speedy(bool) {
	    if (this.ctr !== 0) {
	      // cannot change speedy mode after inserting any rule to sheet. Either call speedy(${bool}) earlier in your app, or call flush() before speedy(${bool})
	      throw new Error("cannot change speedy now");
	    }

	    this.isSpeedy = !!bool;
	  };

	  _proto.insert = function insert(rule, sourceMap) {
	    // this is the ultrafast version, works across browsers
	    if (this.isSpeedy) {
	      var tag = this.tags[this.tags.length - 1];
	      var sheet = sheetForTag(tag);

	      try {
	        sheet.insertRule(rule, sheet.cssRules.length);
	      } catch (e) {
	        {
	          console.warn('illegal rule', rule); // eslint-disable-line no-console
	        }
	      }
	    } else {
	      var _tag = makeStyleTag(this.opts);

	      this.tags.push(_tag);

	      _tag.appendChild(document.createTextNode(rule + (sourceMap || '')));
	    }

	    this.ctr++;

	    if (this.ctr % 65000 === 0) {
	      this.tags.push(makeStyleTag(this.opts));
	    }
	  };

	  _proto.flush = function flush() {
	    // $FlowFixMe
	    this.tags.forEach(function (tag) {
	      return tag.parentNode.removeChild(tag);
	    });
	    this.tags = [];
	    this.ctr = 0; // todo - look for remnants in document.styleSheets

	    this.injected = false;
	  };

	  return StyleSheet;
	}();

	function createEmotion(context, options) {
	  if (context.__SECRET_EMOTION__ !== undefined) {
	    return context.__SECRET_EMOTION__;
	  }

	  if (options === undefined) options = {};
	  var key = options.key || 'css';

	  {
	    if (/[^a-z-]/.test(key)) {
	      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
	    }
	  }

	  var current;

	  function insertRule(rule) {
	    current += rule;

	    if (isBrowser) {
	      sheet.insert(rule, currentSourceMap);
	    }
	  }

	  var insertionPlugin = stylisRuleSheet(insertRule);
	  var stylisOptions;

	  if (options.prefix !== undefined) {
	    stylisOptions = {
	      prefix: options.prefix
	    };
	  }

	  var caches = {
	    registered: {},
	    inserted: {},
	    nonce: options.nonce,
	    key: key
	  };
	  var sheet = new StyleSheet(options);

	  if (isBrowser) {
	    // 🚀
	    sheet.inject();
	  }

	  var stylis = new stylis_min(stylisOptions);
	  stylis.use(options.stylisPlugins)(insertionPlugin);
	  var currentSourceMap = '';

	  function handleInterpolation(interpolation, couldBeSelectorInterpolation) {
	    if (interpolation == null) {
	      return '';
	    }

	    switch (typeof interpolation) {
	      case 'boolean':
	        return '';

	      case 'function':
	        if (interpolation.__emotion_styles !== undefined) {
	          var selector = interpolation.toString();

	          if (selector === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
	            throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
	          }

	          return selector;
	        }

	        if (this === undefined && "development" !== 'production') {
	          console.error('Interpolating functions in css calls is deprecated and will be removed in the next major version of Emotion.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
	        }

	        return handleInterpolation.call(this, this === undefined ? interpolation() : // $FlowFixMe
	        interpolation(this.mergedProps, this.context), couldBeSelectorInterpolation);

	      case 'object':
	        return createStringFromObject.call(this, interpolation);

	      default:
	        var cached = caches.registered[interpolation];
	        return couldBeSelectorInterpolation === false && cached !== undefined ? cached : interpolation;
	    }
	  }

	  var objectToStringCache = new WeakMap();

	  function createStringFromObject(obj) {
	    if (objectToStringCache.has(obj)) {
	      // $FlowFixMe
	      return objectToStringCache.get(obj);
	    }

	    var string = '';

	    if (Array.isArray(obj)) {
	      obj.forEach(function (interpolation) {
	        string += handleInterpolation.call(this, interpolation, false);
	      }, this);
	    } else {
	      Object.keys(obj).forEach(function (key) {
	        if (typeof obj[key] !== 'object') {
	          if (caches.registered[obj[key]] !== undefined) {
	            string += key + "{" + caches.registered[obj[key]] + "}";
	          } else {
	            string += processStyleName(key) + ":" + processStyleValue(key, obj[key]) + ";";
	          }
	        } else {
	          if (key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
	            throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
	          }

	          if (Array.isArray(obj[key]) && typeof obj[key][0] === 'string' && caches.registered[obj[key][0]] === undefined) {
	            obj[key].forEach(function (value) {
	              string += processStyleName(key) + ":" + processStyleValue(key, value) + ";";
	            });
	          } else {
	            string += key + "{" + handleInterpolation.call(this, obj[key], false) + "}";
	          }
	        }
	      }, this);
	    }

	    objectToStringCache.set(obj, string);
	    return string;
	  }

	  var name;
	  var stylesWithLabel;
	  var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;

	  var createClassName = function createClassName(styles, identifierName) {
	    return murmurhash2_32_gc(styles + identifierName) + identifierName;
	  };

	  {
	    var oldCreateClassName = createClassName;
	    var sourceMappingUrlPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;

	    createClassName = function createClassName(styles, identifierName) {
	      return oldCreateClassName(styles.replace(sourceMappingUrlPattern, function (sourceMap) {
	        currentSourceMap = sourceMap;
	        return '';
	      }), identifierName);
	    };
	  }

	  var createStyles = function createStyles(strings) {
	    var stringMode = true;
	    var styles = '';
	    var identifierName = '';

	    if (strings == null || strings.raw === undefined) {
	      stringMode = false;
	      styles += handleInterpolation.call(this, strings, false);
	    } else {
	      styles += strings[0];
	    }

	    for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      interpolations[_key - 1] = arguments[_key];
	    }

	    interpolations.forEach(function (interpolation, i) {
	      styles += handleInterpolation.call(this, interpolation, styles.charCodeAt(styles.length - 1) === 46 // .
	      );

	      if (stringMode === true && strings[i + 1] !== undefined) {
	        styles += strings[i + 1];
	      }
	    }, this);
	    stylesWithLabel = styles;
	    styles = styles.replace(labelPattern, function (match, p1) {
	      identifierName += "-" + p1;
	      return '';
	    });
	    name = createClassName(styles, identifierName);
	    return styles;
	  };

	  {
	    var oldStylis = stylis;

	    stylis = function stylis(selector, styles) {
	      oldStylis(selector, styles);
	      currentSourceMap = '';
	    };
	  }

	  function insert(scope, styles) {
	    if (caches.inserted[name] === undefined) {
	      current = '';
	      stylis(scope, styles);
	      caches.inserted[name] = current;
	    }
	  }

	  var css = function css() {
	    var styles = createStyles.apply(this, arguments);
	    var selector = key + "-" + name;

	    if (caches.registered[selector] === undefined) {
	      caches.registered[selector] = stylesWithLabel;
	    }

	    insert("." + selector, styles);
	    return selector;
	  };

	  var keyframes = function keyframes() {
	    var styles = createStyles.apply(this, arguments);
	    var animation = "animation-" + name;
	    insert('', "@keyframes " + animation + "{" + styles + "}");
	    return animation;
	  };

	  var injectGlobal = function injectGlobal() {
	    var styles = createStyles.apply(this, arguments);
	    insert('', styles);
	  };

	  function getRegisteredStyles(registeredStyles, classNames) {
	    var rawClassName = '';
	    classNames.split(' ').forEach(function (className) {
	      if (caches.registered[className] !== undefined) {
	        registeredStyles.push(className);
	      } else {
	        rawClassName += className + " ";
	      }
	    });
	    return rawClassName;
	  }

	  function merge(className, sourceMap) {
	    var registeredStyles = [];
	    var rawClassName = getRegisteredStyles(registeredStyles, className);

	    if (registeredStyles.length < 2) {
	      return className;
	    }

	    return rawClassName + css(registeredStyles, sourceMap);
	  }

	  function cx() {
	    for (var _len2 = arguments.length, classNames = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      classNames[_key2] = arguments[_key2];
	    }

	    return merge(classnames(classNames));
	  }

	  function hydrateSingleId(id) {
	    caches.inserted[id] = true;
	  }

	  function hydrate(ids) {
	    ids.forEach(hydrateSingleId);
	  }

	  function flush() {
	    if (isBrowser) {
	      sheet.flush();
	      sheet.inject();
	    }

	    caches.inserted = {};
	    caches.registered = {};
	  }

	  if (isBrowser) {
	    var chunks = document.querySelectorAll("[data-emotion-" + key + "]");
	    Array.prototype.forEach.call(chunks, function (node) {
	      // $FlowFixMe
	      sheet.tags[0].parentNode.insertBefore(node, sheet.tags[0]); // $FlowFixMe

	      node.getAttribute("data-emotion-" + key).split(' ').forEach(hydrateSingleId);
	    });
	  }

	  var emotion = {
	    flush: flush,
	    hydrate: hydrate,
	    cx: cx,
	    merge: merge,
	    getRegisteredStyles: getRegisteredStyles,
	    injectGlobal: injectGlobal,
	    keyframes: keyframes,
	    css: css,
	    sheet: sheet,
	    caches: caches
	  };
	  context.__SECRET_EMOTION__ = emotion;
	  return emotion;
	}

	var context = typeof global !== 'undefined' ? global : {};

	var _createEmotion = createEmotion(context),
	    flush = _createEmotion.flush,
	    hydrate = _createEmotion.hydrate,
	    cx = _createEmotion.cx,
	    merge = _createEmotion.merge,
	    getRegisteredStyles = _createEmotion.getRegisteredStyles,
	    injectGlobal = _createEmotion.injectGlobal,
	    keyframes = _createEmotion.keyframes,
	    css = _createEmotion.css,
	    sheet = _createEmotion.sheet,
	    caches = _createEmotion.caches;

	var performanceNow = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.2
	(function() {
	  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - nodeLoadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    moduleLoadTime = getNanoSeconds();
	    upTime = process.uptime() * 1e9;
	    nodeLoadTime = moduleLoadTime - upTime;
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }

	}).call(commonjsGlobal);


	});

	var root$1 = typeof window === 'undefined' ? commonjsGlobal : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = root$1['request' + suffix]
	  , caf = root$1['cancel' + suffix] || root$1['cancelRequest' + suffix];

	for(var i = 0; !raf && i < vendors.length; i++) {
	  raf = root$1[vendors[i] + 'Request' + suffix];
	  caf = root$1[vendors[i] + 'Cancel' + suffix]
	      || root$1[vendors[i] + 'CancelRequest' + suffix];
	}

	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60;

	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = performanceNow()
	        , next = Math.max(0, frameDuration - (_now - last));
	      last = next + _now;
	      setTimeout(function() {
	        var cp = queue.slice(0);
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0;
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last);
	            } catch(e) {
	              setTimeout(function() { throw e }, 0);
	            }
	          }
	        }
	      }, Math.round(next));
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    });
	    return id
	  };

	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true;
	      }
	    }
	  };
	}

	var raf_1 = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(root$1, fn)
	};
	var cancel = function() {
	  caf.apply(root$1, arguments);
	};
	var polyfill = function(object) {
	  if (!object) {
	    object = root$1;
	  }
	  object.requestAnimationFrame = raf;
	  object.cancelAnimationFrame = caf;
	};
	raf_1.cancel = cancel;
	raf_1.polyfill = polyfill;

	var AutosizeInput_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _react2 = _interopRequireDefault(React__default);



	var _propTypes2 = _interopRequireDefault(PropTypes$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var sizerStyle = {
		position: 'absolute',
		top: 0,
		left: 0,
		visibility: 'hidden',
		height: 0,
		overflow: 'scroll',
		whiteSpace: 'pre'
	};

	var INPUT_PROPS_BLACKLIST = ['extraWidth', 'injectStyles', 'inputClassName', 'inputRef', 'inputStyle', 'minWidth', 'onAutosize', 'placeholderIsMinWidth'];

	var cleanInputProps = function cleanInputProps(inputProps) {
		INPUT_PROPS_BLACKLIST.forEach(function (field) {
			return delete inputProps[field];
		});
		return inputProps;
	};

	var copyStyles = function copyStyles(styles, node) {
		node.style.fontSize = styles.fontSize;
		node.style.fontFamily = styles.fontFamily;
		node.style.fontWeight = styles.fontWeight;
		node.style.fontStyle = styles.fontStyle;
		node.style.letterSpacing = styles.letterSpacing;
		node.style.textTransform = styles.textTransform;
	};

	var isIE = typeof window !== 'undefined' && window.navigator ? /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent) : false;

	var generateId = function generateId() {
		// we only need an auto-generated ID for stylesheet injection, which is only
		// used for IE. so if the browser is not IE, this should return undefined.
		return isIE ? '_' + Math.random().toString(36).substr(2, 12) : undefined;
	};

	var AutosizeInput = function (_Component) {
		_inherits(AutosizeInput, _Component);

		function AutosizeInput(props) {
			_classCallCheck(this, AutosizeInput);

			var _this = _possibleConstructorReturn(this, (AutosizeInput.__proto__ || Object.getPrototypeOf(AutosizeInput)).call(this, props));

			_this.inputRef = function (el) {
				_this.input = el;
				if (typeof _this.props.inputRef === 'function') {
					_this.props.inputRef(el);
				}
			};

			_this.placeHolderSizerRef = function (el) {
				_this.placeHolderSizer = el;
			};

			_this.sizerRef = function (el) {
				_this.sizer = el;
			};

			_this.state = {
				inputWidth: props.minWidth,
				inputId: props.id || generateId()
			};
			return _this;
		}

		_createClass(AutosizeInput, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.mounted = true;
				this.copyInputStyles();
				this.updateInputWidth();
			}
		}, {
			key: 'UNSAFE_componentWillReceiveProps',
			value: function UNSAFE_componentWillReceiveProps(nextProps) {
				var id = nextProps.id;

				if (id !== this.props.id) {
					this.setState({ inputId: id || generateId() });
				}
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps, prevState) {
				if (prevState.inputWidth !== this.state.inputWidth) {
					if (typeof this.props.onAutosize === 'function') {
						this.props.onAutosize(this.state.inputWidth);
					}
				}
				this.updateInputWidth();
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.mounted = false;
			}
		}, {
			key: 'copyInputStyles',
			value: function copyInputStyles() {
				if (!this.mounted || !window.getComputedStyle) {
					return;
				}
				var inputStyles = this.input && window.getComputedStyle(this.input);
				if (!inputStyles) {
					return;
				}
				copyStyles(inputStyles, this.sizer);
				if (this.placeHolderSizer) {
					copyStyles(inputStyles, this.placeHolderSizer);
				}
			}
		}, {
			key: 'updateInputWidth',
			value: function updateInputWidth() {
				if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
					return;
				}
				var newInputWidth = void 0;
				if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
					newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
				} else {
					newInputWidth = this.sizer.scrollWidth + 2;
				}
				// add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
				var extraWidth = this.props.type === 'number' && this.props.extraWidth === undefined ? 16 : parseInt(this.props.extraWidth) || 0;
				newInputWidth += extraWidth;
				if (newInputWidth < this.props.minWidth) {
					newInputWidth = this.props.minWidth;
				}
				if (newInputWidth !== this.state.inputWidth) {
					this.setState({
						inputWidth: newInputWidth
					});
				}
			}
		}, {
			key: 'getInput',
			value: function getInput() {
				return this.input;
			}
		}, {
			key: 'focus',
			value: function focus() {
				this.input.focus();
			}
		}, {
			key: 'blur',
			value: function blur() {
				this.input.blur();
			}
		}, {
			key: 'select',
			value: function select() {
				this.input.select();
			}
		}, {
			key: 'renderStyles',
			value: function renderStyles() {
				// this method injects styles to hide IE's clear indicator, which messes
				// with input size detection. the stylesheet is only injected when the
				// browser is IE, and can also be disabled by the `injectStyles` prop.
				var injectStyles = this.props.injectStyles;

				return isIE && injectStyles ? _react2.default.createElement('style', { dangerouslySetInnerHTML: {
						__html: 'input#' + this.state.inputId + '::-ms-clear {display: none;}'
					} }) : null;
			}
		}, {
			key: 'render',
			value: function render() {
				var sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(function (previousValue, currentValue) {
					if (previousValue !== null && previousValue !== undefined) {
						return previousValue;
					}
					return currentValue;
				});

				var wrapperStyle = _extends({}, this.props.style);
				if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';

				var inputStyle = _extends({
					boxSizing: 'content-box',
					width: this.state.inputWidth + 'px'
				}, this.props.inputStyle);

				var inputProps = _objectWithoutProperties(this.props, []);

				cleanInputProps(inputProps);
				inputProps.className = this.props.inputClassName;
				inputProps.id = this.state.inputId;
				inputProps.style = inputStyle;

				return _react2.default.createElement(
					'div',
					{ className: this.props.className, style: wrapperStyle },
					this.renderStyles(),
					_react2.default.createElement('input', _extends({}, inputProps, { ref: this.inputRef })),
					_react2.default.createElement(
						'div',
						{ ref: this.sizerRef, style: sizerStyle },
						sizerValue
					),
					this.props.placeholder ? _react2.default.createElement(
						'div',
						{ ref: this.placeHolderSizerRef, style: sizerStyle },
						this.props.placeholder
					) : null
				);
			}
		}]);

		return AutosizeInput;
	}(React__default.Component);

	AutosizeInput.propTypes = {
		className: _propTypes2.default.string, // className for the outer element
		defaultValue: _propTypes2.default.any, // default field value
		extraWidth: _propTypes2.default.oneOfType([// additional width for input element
		_propTypes2.default.number, _propTypes2.default.string]),
		id: _propTypes2.default.string, // id to use for the input, can be set for consistent snapshots
		injectStyles: _propTypes2.default.bool, // inject the custom stylesheet to hide clear UI, defaults to true
		inputClassName: _propTypes2.default.string, // className for the input element
		inputRef: _propTypes2.default.func, // ref callback for the input element
		inputStyle: _propTypes2.default.object, // css styles for the input element
		minWidth: _propTypes2.default.oneOfType([// minimum width for input element
		_propTypes2.default.number, _propTypes2.default.string]),
		onAutosize: _propTypes2.default.func, // onAutosize handler: function(newWidth) {}
		onChange: _propTypes2.default.func, // onChange handler: function(event) {}
		placeholder: _propTypes2.default.string, // placeholder text
		placeholderIsMinWidth: _propTypes2.default.bool, // don't collapse size to less than the placeholder
		style: _propTypes2.default.object, // css styles for the outer element
		value: _propTypes2.default.any // field value
	};
	AutosizeInput.defaultProps = {
		minWidth: 1,
		injectStyles: true
	};

	exports.default = AutosizeInput;
	});

	var AutosizeInput = unwrapExports(AutosizeInput_1);

	var interopRequireDefault = createCommonjsModule(function (module) {
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	}

	module.exports = _interopRequireDefault;
	});

	unwrapExports(interopRequireDefault);

	var hasClass_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.default = hasClass;

	function hasClass(element, className) {
	  if (element.classList) return !!className && element.classList.contains(className);else return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
	}

	module.exports = exports["default"];
	});

	unwrapExports(hasClass_1);

	var addClass_1 = createCommonjsModule(function (module, exports) {



	exports.__esModule = true;
	exports.default = addClass;

	var _hasClass = interopRequireDefault(hasClass_1);

	function addClass(element, className) {
	  if (element.classList) element.classList.add(className);else if (!(0, _hasClass.default)(element, className)) if (typeof element.className === 'string') element.className = element.className + ' ' + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + ' ' + className);
	}

	module.exports = exports["default"];
	});

	unwrapExports(addClass_1);

	function replaceClassName(origClass, classToRemove) {
	  return origClass.replace(new RegExp('(^|\\s)' + classToRemove + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
	}

	var removeClass = function removeClass(element, className) {
	  if (element.classList) element.classList.remove(className);else if (typeof element.className === 'string') element.className = replaceClassName(element.className, className);else element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	function componentWillMount() {
	  // Call this.constructor.gDSFP to support sub-classes.
	  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
	  if (state !== null && state !== undefined) {
	    this.setState(state);
	  }
	}

	function componentWillReceiveProps(nextProps) {
	  // Call this.constructor.gDSFP to support sub-classes.
	  // Use the setState() updater to ensure state isn't stale in certain edge cases.
	  function updater(prevState) {
	    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
	    return state !== null && state !== undefined ? state : null;
	  }
	  // Binding "this" is important for shallow renderer support.
	  this.setState(updater.bind(this));
	}

	function componentWillUpdate(nextProps, nextState) {
	  try {
	    var prevProps = this.props;
	    var prevState = this.state;
	    this.props = nextProps;
	    this.state = nextState;
	    this.__reactInternalSnapshotFlag = true;
	    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
	      prevProps,
	      prevState
	    );
	  } finally {
	    this.props = prevProps;
	    this.state = prevState;
	  }
	}

	// React may warn about cWM/cWRP/cWU methods being deprecated.
	// Add a flag to suppress these warnings for this special case.
	componentWillMount.__suppressDeprecationWarning = true;
	componentWillReceiveProps.__suppressDeprecationWarning = true;
	componentWillUpdate.__suppressDeprecationWarning = true;

	function polyfill$1(Component) {
	  var prototype = Component.prototype;

	  if (!prototype || !prototype.isReactComponent) {
	    throw new Error('Can only polyfill class components');
	  }

	  if (
	    typeof Component.getDerivedStateFromProps !== 'function' &&
	    typeof prototype.getSnapshotBeforeUpdate !== 'function'
	  ) {
	    return Component;
	  }

	  // If new component APIs are defined, "unsafe" lifecycles won't be called.
	  // Error if any of these lifecycles are present,
	  // Because they would work differently between older and newer (16.3+) versions of React.
	  var foundWillMountName = null;
	  var foundWillReceivePropsName = null;
	  var foundWillUpdateName = null;
	  if (typeof prototype.componentWillMount === 'function') {
	    foundWillMountName = 'componentWillMount';
	  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
	    foundWillMountName = 'UNSAFE_componentWillMount';
	  }
	  if (typeof prototype.componentWillReceiveProps === 'function') {
	    foundWillReceivePropsName = 'componentWillReceiveProps';
	  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
	    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
	  }
	  if (typeof prototype.componentWillUpdate === 'function') {
	    foundWillUpdateName = 'componentWillUpdate';
	  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
	    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
	  }
	  if (
	    foundWillMountName !== null ||
	    foundWillReceivePropsName !== null ||
	    foundWillUpdateName !== null
	  ) {
	    var componentName = Component.displayName || Component.name;
	    var newApiName =
	      typeof Component.getDerivedStateFromProps === 'function'
	        ? 'getDerivedStateFromProps()'
	        : 'getSnapshotBeforeUpdate()';

	    throw Error(
	      'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
	        componentName +
	        ' uses ' +
	        newApiName +
	        ' but also contains the following legacy lifecycles:' +
	        (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
	        (foundWillReceivePropsName !== null
	          ? '\n  ' + foundWillReceivePropsName
	          : '') +
	        (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
	        '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
	        'https://fb.me/react-async-component-lifecycle-hooks'
	    );
	  }

	  // React <= 16.2 does not support static getDerivedStateFromProps.
	  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
	  // Newer versions of React will ignore these lifecycles if gDSFP exists.
	  if (typeof Component.getDerivedStateFromProps === 'function') {
	    prototype.componentWillMount = componentWillMount;
	    prototype.componentWillReceiveProps = componentWillReceiveProps;
	  }

	  // React <= 16.2 does not support getSnapshotBeforeUpdate.
	  // As a workaround, use cWU to invoke the new lifecycle.
	  // Newer versions of React will ignore that lifecycle if gSBU exists.
	  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
	    if (typeof prototype.componentDidUpdate !== 'function') {
	      throw new Error(
	        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
	      );
	    }

	    prototype.componentWillUpdate = componentWillUpdate;

	    var componentDidUpdate = prototype.componentDidUpdate;

	    prototype.componentDidUpdate = function componentDidUpdatePolyfill(
	      prevProps,
	      prevState,
	      maybeSnapshot
	    ) {
	      // 16.3+ will not execute our will-update method;
	      // It will pass a snapshot value to did-update though.
	      // Older versions will require our polyfilled will-update value.
	      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
	      // Because for <= 15.x versions this might be a "prevContext" object.
	      // We also can't just check "__reactInternalSnapshot",
	      // Because get-snapshot might return a falsy value.
	      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
	      var snapshot = this.__reactInternalSnapshotFlag
	        ? this.__reactInternalSnapshot
	        : maybeSnapshot;

	      componentDidUpdate.call(this, prevProps, prevState, snapshot);
	    };
	  }

	  return Component;
	}

	var reactLifecyclesCompat_es = /*#__PURE__*/Object.freeze({
		__proto__: null,
		polyfill: polyfill$1
	});

	var PropTypes = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.classNamesShape = exports.timeoutsShape = void 0;

	var _propTypes = _interopRequireDefault(PropTypes$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var timeoutsShape =  _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
	  enter: _propTypes.default.number,
	  exit: _propTypes.default.number,
	  appear: _propTypes.default.number
	}).isRequired]) ;
	exports.timeoutsShape = timeoutsShape;
	var classNamesShape =  _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
	  enter: _propTypes.default.string,
	  exit: _propTypes.default.string,
	  active: _propTypes.default.string
	}), _propTypes.default.shape({
	  enter: _propTypes.default.string,
	  enterDone: _propTypes.default.string,
	  enterActive: _propTypes.default.string,
	  exit: _propTypes.default.string,
	  exitDone: _propTypes.default.string,
	  exitActive: _propTypes.default.string
	})]) ;
	exports.classNamesShape = classNamesShape;
	});

	unwrapExports(PropTypes);
	var PropTypes_1 = PropTypes.classNamesShape;
	var PropTypes_2 = PropTypes.timeoutsShape;

	var Transition_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.default = exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = void 0;

	var PropTypes$2 = _interopRequireWildcard(PropTypes$1);

	var _react = _interopRequireDefault(React__default);

	var _reactDom = _interopRequireDefault(reactDom__default);





	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	var UNMOUNTED = 'unmounted';
	exports.UNMOUNTED = UNMOUNTED;
	var EXITED = 'exited';
	exports.EXITED = EXITED;
	var ENTERING = 'entering';
	exports.ENTERING = ENTERING;
	var ENTERED = 'entered';
	exports.ENTERED = ENTERED;
	var EXITING = 'exiting';
	/**
	 * The Transition component lets you describe a transition from one component
	 * state to another _over time_ with a simple declarative API. Most commonly
	 * it's used to animate the mounting and unmounting of a component, but can also
	 * be used to describe in-place transition states as well.
	 *
	 * ---
	 *
	 * **Note**: `Transition` is a platform-agnostic base component. If you're using
	 * transitions in CSS, you'll probably want to use
	 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
	 * instead. It inherits all the features of `Transition`, but contains
	 * additional features necessary to play nice with CSS transitions (hence the
	 * name of the component).
	 *
	 * ---
	 *
	 * By default the `Transition` component does not alter the behavior of the
	 * component it renders, it only tracks "enter" and "exit" states for the
	 * components. It's up to you to give meaning and effect to those states. For
	 * example we can add styles to a component when it enters or exits:
	 *
	 * ```jsx
	 * import { Transition } from 'react-transition-group';
	 *
	 * const duration = 300;
	 *
	 * const defaultStyle = {
	 *   transition: `opacity ${duration}ms ease-in-out`,
	 *   opacity: 0,
	 * }
	 *
	 * const transitionStyles = {
	 *   entering: { opacity: 0 },
	 *   entered:  { opacity: 1 },
	 * };
	 *
	 * const Fade = ({ in: inProp }) => (
	 *   <Transition in={inProp} timeout={duration}>
	 *     {state => (
	 *       <div style={{
	 *         ...defaultStyle,
	 *         ...transitionStyles[state]
	 *       }}>
	 *         I'm a fade Transition!
	 *       </div>
	 *     )}
	 *   </Transition>
	 * );
	 * ```
	 *
	 * There are 4 main states a Transition can be in:
	 *  - `'entering'`
	 *  - `'entered'`
	 *  - `'exiting'`
	 *  - `'exited'`
	 *
	 * Transition state is toggled via the `in` prop. When `true` the component
	 * begins the "Enter" stage. During this stage, the component will shift from
	 * its current transition state, to `'entering'` for the duration of the
	 * transition and then to the `'entered'` stage once it's complete. Let's take
	 * the following example (we'll use the
	 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
	 *
	 * ```jsx
	 * function App() {
	 *   const [inProp, setInProp] = useState(false);
	 *   return (
	 *     <div>
	 *       <Transition in={inProp} timeout={500}>
	 *         {state => (
	 *           // ...
	 *         )}
	 *       </Transition>
	 *       <button onClick={() => setInProp(true)}>
	 *         Click to Enter
	 *       </button>
	 *     </div>
	 *   );
	 * }
	 * ```
	 *
	 * When the button is clicked the component will shift to the `'entering'` state
	 * and stay there for 500ms (the value of `timeout`) before it finally switches
	 * to `'entered'`.
	 *
	 * When `in` is `false` the same thing happens except the state moves from
	 * `'exiting'` to `'exited'`.
	 */

	exports.EXITING = EXITING;

	var Transition =
	/*#__PURE__*/
	function (_React$Component) {
	  _inheritsLoose(Transition, _React$Component);

	  function Transition(props, context) {
	    var _this;

	    _this = _React$Component.call(this, props, context) || this;
	    var parentGroup = context.transitionGroup; // In the context of a TransitionGroup all enters are really appears

	    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
	    var initialStatus;
	    _this.appearStatus = null;

	    if (props.in) {
	      if (appear) {
	        initialStatus = EXITED;
	        _this.appearStatus = ENTERING;
	      } else {
	        initialStatus = ENTERED;
	      }
	    } else {
	      if (props.unmountOnExit || props.mountOnEnter) {
	        initialStatus = UNMOUNTED;
	      } else {
	        initialStatus = EXITED;
	      }
	    }

	    _this.state = {
	      status: initialStatus
	    };
	    _this.nextCallback = null;
	    return _this;
	  }

	  var _proto = Transition.prototype;

	  _proto.getChildContext = function getChildContext() {
	    return {
	      transitionGroup: null // allows for nested Transitions

	    };
	  };

	  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
	    var nextIn = _ref.in;

	    if (nextIn && prevState.status === UNMOUNTED) {
	      return {
	        status: EXITED
	      };
	    }

	    return null;
	  }; // getSnapshotBeforeUpdate(prevProps) {
	  //   let nextStatus = null
	  //   if (prevProps !== this.props) {
	  //     const { status } = this.state
	  //     if (this.props.in) {
	  //       if (status !== ENTERING && status !== ENTERED) {
	  //         nextStatus = ENTERING
	  //       }
	  //     } else {
	  //       if (status === ENTERING || status === ENTERED) {
	  //         nextStatus = EXITING
	  //       }
	  //     }
	  //   }
	  //   return { nextStatus }
	  // }


	  _proto.componentDidMount = function componentDidMount() {
	    this.updateStatus(true, this.appearStatus);
	  };

	  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
	    var nextStatus = null;

	    if (prevProps !== this.props) {
	      var status = this.state.status;

	      if (this.props.in) {
	        if (status !== ENTERING && status !== ENTERED) {
	          nextStatus = ENTERING;
	        }
	      } else {
	        if (status === ENTERING || status === ENTERED) {
	          nextStatus = EXITING;
	        }
	      }
	    }

	    this.updateStatus(false, nextStatus);
	  };

	  _proto.componentWillUnmount = function componentWillUnmount() {
	    this.cancelNextCallback();
	  };

	  _proto.getTimeouts = function getTimeouts() {
	    var timeout = this.props.timeout;
	    var exit, enter, appear;
	    exit = enter = appear = timeout;

	    if (timeout != null && typeof timeout !== 'number') {
	      exit = timeout.exit;
	      enter = timeout.enter; // TODO: remove fallback for next major

	      appear = timeout.appear !== undefined ? timeout.appear : enter;
	    }

	    return {
	      exit: exit,
	      enter: enter,
	      appear: appear
	    };
	  };

	  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
	    if (mounting === void 0) {
	      mounting = false;
	    }

	    if (nextStatus !== null) {
	      // nextStatus will always be ENTERING or EXITING.
	      this.cancelNextCallback();

	      var node = _reactDom.default.findDOMNode(this);

	      if (nextStatus === ENTERING) {
	        this.performEnter(node, mounting);
	      } else {
	        this.performExit(node);
	      }
	    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
	      this.setState({
	        status: UNMOUNTED
	      });
	    }
	  };

	  _proto.performEnter = function performEnter(node, mounting) {
	    var _this2 = this;

	    var enter = this.props.enter;
	    var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;
	    var timeouts = this.getTimeouts();
	    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
	    // if we are mounting and running this it means appear _must_ be set

	    if (!mounting && !enter) {
	      this.safeSetState({
	        status: ENTERED
	      }, function () {
	        _this2.props.onEntered(node);
	      });
	      return;
	    }

	    this.props.onEnter(node, appearing);
	    this.safeSetState({
	      status: ENTERING
	    }, function () {
	      _this2.props.onEntering(node, appearing);

	      _this2.onTransitionEnd(node, enterTimeout, function () {
	        _this2.safeSetState({
	          status: ENTERED
	        }, function () {
	          _this2.props.onEntered(node, appearing);
	        });
	      });
	    });
	  };

	  _proto.performExit = function performExit(node) {
	    var _this3 = this;

	    var exit = this.props.exit;
	    var timeouts = this.getTimeouts(); // no exit animation skip right to EXITED

	    if (!exit) {
	      this.safeSetState({
	        status: EXITED
	      }, function () {
	        _this3.props.onExited(node);
	      });
	      return;
	    }

	    this.props.onExit(node);
	    this.safeSetState({
	      status: EXITING
	    }, function () {
	      _this3.props.onExiting(node);

	      _this3.onTransitionEnd(node, timeouts.exit, function () {
	        _this3.safeSetState({
	          status: EXITED
	        }, function () {
	          _this3.props.onExited(node);
	        });
	      });
	    });
	  };

	  _proto.cancelNextCallback = function cancelNextCallback() {
	    if (this.nextCallback !== null) {
	      this.nextCallback.cancel();
	      this.nextCallback = null;
	    }
	  };

	  _proto.safeSetState = function safeSetState(nextState, callback) {
	    // This shouldn't be necessary, but there are weird race conditions with
	    // setState callbacks and unmounting in testing, so always make sure that
	    // we can cancel any pending setState callbacks after we unmount.
	    callback = this.setNextCallback(callback);
	    this.setState(nextState, callback);
	  };

	  _proto.setNextCallback = function setNextCallback(callback) {
	    var _this4 = this;

	    var active = true;

	    this.nextCallback = function (event) {
	      if (active) {
	        active = false;
	        _this4.nextCallback = null;
	        callback(event);
	      }
	    };

	    this.nextCallback.cancel = function () {
	      active = false;
	    };

	    return this.nextCallback;
	  };

	  _proto.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
	    this.setNextCallback(handler);
	    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

	    if (!node || doesNotHaveTimeoutOrListener) {
	      setTimeout(this.nextCallback, 0);
	      return;
	    }

	    if (this.props.addEndListener) {
	      this.props.addEndListener(node, this.nextCallback);
	    }

	    if (timeout != null) {
	      setTimeout(this.nextCallback, timeout);
	    }
	  };

	  _proto.render = function render() {
	    var status = this.state.status;

	    if (status === UNMOUNTED) {
	      return null;
	    }

	    var _this$props = this.props,
	        children = _this$props.children,
	        childProps = _objectWithoutPropertiesLoose(_this$props, ["children"]); // filter props for Transtition


	    delete childProps.in;
	    delete childProps.mountOnEnter;
	    delete childProps.unmountOnExit;
	    delete childProps.appear;
	    delete childProps.enter;
	    delete childProps.exit;
	    delete childProps.timeout;
	    delete childProps.addEndListener;
	    delete childProps.onEnter;
	    delete childProps.onEntering;
	    delete childProps.onEntered;
	    delete childProps.onExit;
	    delete childProps.onExiting;
	    delete childProps.onExited;

	    if (typeof children === 'function') {
	      return children(status, childProps);
	    }

	    var child = _react.default.Children.only(children);

	    return _react.default.cloneElement(child, childProps);
	  };

	  return Transition;
	}(_react.default.Component);

	Transition.contextTypes = {
	  transitionGroup: PropTypes$2.object
	};
	Transition.childContextTypes = {
	  transitionGroup: function transitionGroup() {}
	};
	Transition.propTypes =  {
	  /**
	   * A `function` child can be used instead of a React element. This function is
	   * called with the current transition status (`'entering'`, `'entered'`,
	   * `'exiting'`, `'exited'`, `'unmounted'`), which can be used to apply context
	   * specific props to a component.
	   *
	   * ```jsx
	   * <Transition in={this.state.in} timeout={150}>
	   *   {state => (
	   *     <MyComponent className={`fade fade-${state}`} />
	   *   )}
	   * </Transition>
	   * ```
	   */
	  children: PropTypes$2.oneOfType([PropTypes$2.func.isRequired, PropTypes$2.element.isRequired]).isRequired,

	  /**
	   * Show the component; triggers the enter or exit states
	   */
	  in: PropTypes$2.bool,

	  /**
	   * By default the child component is mounted immediately along with
	   * the parent `Transition` component. If you want to "lazy mount" the component on the
	   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
	   * mounted, even on "exited", unless you also specify `unmountOnExit`.
	   */
	  mountOnEnter: PropTypes$2.bool,

	  /**
	   * By default the child component stays mounted after it reaches the `'exited'` state.
	   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
	   */
	  unmountOnExit: PropTypes$2.bool,

	  /**
	   * Normally a component is not transitioned if it is shown when the `<Transition>` component mounts.
	   * If you want to transition on the first mount set `appear` to `true`, and the
	   * component will transition in as soon as the `<Transition>` mounts.
	   *
	   * > Note: there are no specific "appear" states. `appear` only adds an additional `enter` transition.
	   */
	  appear: PropTypes$2.bool,

	  /**
	   * Enable or disable enter transitions.
	   */
	  enter: PropTypes$2.bool,

	  /**
	   * Enable or disable exit transitions.
	   */
	  exit: PropTypes$2.bool,

	  /**
	   * The duration of the transition, in milliseconds.
	   * Required unless `addEndListener` is provided.
	   *
	   * You may specify a single timeout for all transitions:
	   *
	   * ```jsx
	   * timeout={500}
	   * ```
	   *
	   * or individually:
	   *
	   * ```jsx
	   * timeout={{
	   *  appear: 500,
	   *  enter: 300,
	   *  exit: 500,
	   * }}
	   * ```
	   *
	   * - `appear` defaults to the value of `enter`
	   * - `enter` defaults to `0`
	   * - `exit` defaults to `0`
	   *
	   * @type {number | { enter?: number, exit?: number, appear?: number }}
	   */
	  timeout: function timeout(props) {
	    var pt = PropTypes.timeoutsShape;
	    if (!props.addEndListener) pt = pt.isRequired;

	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return pt.apply(void 0, [props].concat(args));
	  },

	  /**
	   * Add a custom transition end trigger. Called with the transitioning
	   * DOM node and a `done` callback. Allows for more fine grained transition end
	   * logic. **Note:** Timeouts are still used as a fallback if provided.
	   *
	   * ```jsx
	   * addEndListener={(node, done) => {
	   *   // use the css transitionend event to mark the finish of a transition
	   *   node.addEventListener('transitionend', done, false);
	   * }}
	   * ```
	   */
	  addEndListener: PropTypes$2.func,

	  /**
	   * Callback fired before the "entering" status is applied. An extra parameter
	   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool) -> void
	   */
	  onEnter: PropTypes$2.func,

	  /**
	   * Callback fired after the "entering" status is applied. An extra parameter
	   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool)
	   */
	  onEntering: PropTypes$2.func,

	  /**
	   * Callback fired after the "entered" status is applied. An extra parameter
	   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool) -> void
	   */
	  onEntered: PropTypes$2.func,

	  /**
	   * Callback fired before the "exiting" status is applied.
	   *
	   * @type Function(node: HtmlElement) -> void
	   */
	  onExit: PropTypes$2.func,

	  /**
	   * Callback fired after the "exiting" status is applied.
	   *
	   * @type Function(node: HtmlElement) -> void
	   */
	  onExiting: PropTypes$2.func,

	  /**
	   * Callback fired after the "exited" status is applied.
	   *
	   * @type Function(node: HtmlElement) -> void
	   */
	  onExited: PropTypes$2.func // Name the function so it is clearer in the documentation

	} ;

	function noop() {}

	Transition.defaultProps = {
	  in: false,
	  mountOnEnter: false,
	  unmountOnExit: false,
	  appear: false,
	  enter: true,
	  exit: true,
	  onEnter: noop,
	  onEntering: noop,
	  onEntered: noop,
	  onExit: noop,
	  onExiting: noop,
	  onExited: noop
	};
	Transition.UNMOUNTED = 0;
	Transition.EXITED = 1;
	Transition.ENTERING = 2;
	Transition.ENTERED = 3;
	Transition.EXITING = 4;

	var _default = (0, reactLifecyclesCompat_es.polyfill)(Transition);

	exports.default = _default;
	});

	unwrapExports(Transition_1);
	var Transition_2 = Transition_1.EXITING;
	var Transition_3 = Transition_1.ENTERED;
	var Transition_4 = Transition_1.ENTERING;
	var Transition_5 = Transition_1.EXITED;
	var Transition_6 = Transition_1.UNMOUNTED;

	var CSSTransition_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.default = void 0;

	var PropTypes$2 = _interopRequireWildcard(PropTypes$1);

	var _addClass = _interopRequireDefault(addClass_1);

	var _removeClass = _interopRequireDefault(removeClass);

	var _react = _interopRequireDefault(React__default);

	var _Transition = _interopRequireDefault(Transition_1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	var addClass = function addClass(node, classes) {
	  return node && classes && classes.split(' ').forEach(function (c) {
	    return (0, _addClass.default)(node, c);
	  });
	};

	var removeClass$1 = function removeClass(node, classes) {
	  return node && classes && classes.split(' ').forEach(function (c) {
	    return (0, _removeClass.default)(node, c);
	  });
	};
	/**
	 * A transition component inspired by the excellent
	 * [ng-animate](http://www.nganimate.org/) library, you should use it if you're
	 * using CSS transitions or animations. It's built upon the
	 * [`Transition`](https://reactcommunity.org/react-transition-group/transition)
	 * component, so it inherits all of its props.
	 *
	 * `CSSTransition` applies a pair of class names during the `appear`, `enter`,
	 * and `exit` states of the transition. The first class is applied and then a
	 * second `*-active` class in order to activate the CSSS transition. After the
	 * transition, matching `*-done` class names are applied to persist the
	 * transition state.
	 *
	 * ```jsx
	 * function App() {
	 *   const [inProp, setInProp] = useState(false);
	 *   return (
	 *     <div>
	 *       <CSSTransition in={inProp} timeout={200} classNames="my-node">
	 *         <div>
	 *           {"I'll receive my-node-* classes"}
	 *         </div>
	 *       </CSSTransition>
	 *       <button type="button" onClick={() => setInProp(true)}>
	 *         Click to Enter
	 *       </button>
	 *     </div>
	 *   );
	 * }
	 * ```
	 *
	 * When the `in` prop is set to `true`, the child component will first receive
	 * the class `example-enter`, then the `example-enter-active` will be added in
	 * the next tick. `CSSTransition` [forces a
	 * reflow](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
	 * between before adding the `example-enter-active`. This is an important trick
	 * because it allows us to transition between `example-enter` and
	 * `example-enter-active` even though they were added immediately one after
	 * another. Most notably, this is what makes it possible for us to animate
	 * _appearance_.
	 *
	 * ```css
	 * .my-node-enter {
	 *   opacity: 0;
	 * }
	 * .my-node-enter-active {
	 *   opacity: 1;
	 *   transition: opacity 200ms;
	 * }
	 * .my-node-exit {
	 *   opacity: 1;
	 * }
	 * .my-node-exit-active {
	 *   opacity: 0;
	 *   transition: opacity: 200ms;
	 * }
	 * ```
	 *
	 * `*-active` classes represent which styles you want to animate **to**.
	 */


	var CSSTransition =
	/*#__PURE__*/
	function (_React$Component) {
	  _inheritsLoose(CSSTransition, _React$Component);

	  function CSSTransition() {
	    var _this;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

	    _this.onEnter = function (node, appearing) {
	      var _this$getClassNames = _this.getClassNames(appearing ? 'appear' : 'enter'),
	          className = _this$getClassNames.className;

	      _this.removeClasses(node, 'exit');

	      addClass(node, className);

	      if (_this.props.onEnter) {
	        _this.props.onEnter(node, appearing);
	      }
	    };

	    _this.onEntering = function (node, appearing) {
	      var _this$getClassNames2 = _this.getClassNames(appearing ? 'appear' : 'enter'),
	          activeClassName = _this$getClassNames2.activeClassName;

	      _this.reflowAndAddClass(node, activeClassName);

	      if (_this.props.onEntering) {
	        _this.props.onEntering(node, appearing);
	      }
	    };

	    _this.onEntered = function (node, appearing) {
	      var appearClassName = _this.getClassNames('appear').doneClassName;

	      var enterClassName = _this.getClassNames('enter').doneClassName;

	      var doneClassName = appearing ? appearClassName + " " + enterClassName : enterClassName;

	      _this.removeClasses(node, appearing ? 'appear' : 'enter');

	      addClass(node, doneClassName);

	      if (_this.props.onEntered) {
	        _this.props.onEntered(node, appearing);
	      }
	    };

	    _this.onExit = function (node) {
	      var _this$getClassNames3 = _this.getClassNames('exit'),
	          className = _this$getClassNames3.className;

	      _this.removeClasses(node, 'appear');

	      _this.removeClasses(node, 'enter');

	      addClass(node, className);

	      if (_this.props.onExit) {
	        _this.props.onExit(node);
	      }
	    };

	    _this.onExiting = function (node) {
	      var _this$getClassNames4 = _this.getClassNames('exit'),
	          activeClassName = _this$getClassNames4.activeClassName;

	      _this.reflowAndAddClass(node, activeClassName);

	      if (_this.props.onExiting) {
	        _this.props.onExiting(node);
	      }
	    };

	    _this.onExited = function (node) {
	      var _this$getClassNames5 = _this.getClassNames('exit'),
	          doneClassName = _this$getClassNames5.doneClassName;

	      _this.removeClasses(node, 'exit');

	      addClass(node, doneClassName);

	      if (_this.props.onExited) {
	        _this.props.onExited(node);
	      }
	    };

	    _this.getClassNames = function (type) {
	      var classNames = _this.props.classNames;
	      var isStringClassNames = typeof classNames === 'string';
	      var prefix = isStringClassNames && classNames ? classNames + '-' : '';
	      var className = isStringClassNames ? prefix + type : classNames[type];
	      var activeClassName = isStringClassNames ? className + '-active' : classNames[type + 'Active'];
	      var doneClassName = isStringClassNames ? className + '-done' : classNames[type + 'Done'];
	      return {
	        className: className,
	        activeClassName: activeClassName,
	        doneClassName: doneClassName
	      };
	    };

	    return _this;
	  }

	  var _proto = CSSTransition.prototype;

	  _proto.removeClasses = function removeClasses(node, type) {
	    var _this$getClassNames6 = this.getClassNames(type),
	        className = _this$getClassNames6.className,
	        activeClassName = _this$getClassNames6.activeClassName,
	        doneClassName = _this$getClassNames6.doneClassName;

	    className && removeClass$1(node, className);
	    activeClassName && removeClass$1(node, activeClassName);
	    doneClassName && removeClass$1(node, doneClassName);
	  };

	  _proto.reflowAndAddClass = function reflowAndAddClass(node, className) {
	    // This is for to force a repaint,
	    // which is necessary in order to transition styles when adding a class name.
	    if (className) {
	      /* eslint-disable no-unused-expressions */
	      node && node.scrollTop;
	      /* eslint-enable no-unused-expressions */

	      addClass(node, className);
	    }
	  };

	  _proto.render = function render() {
	    var props = _extends({}, this.props);

	    delete props.classNames;
	    return _react.default.createElement(_Transition.default, _extends({}, props, {
	      onEnter: this.onEnter,
	      onEntered: this.onEntered,
	      onEntering: this.onEntering,
	      onExit: this.onExit,
	      onExiting: this.onExiting,
	      onExited: this.onExited
	    }));
	  };

	  return CSSTransition;
	}(_react.default.Component);

	CSSTransition.defaultProps = {
	  classNames: ''
	};
	CSSTransition.propTypes =  _extends({}, _Transition.default.propTypes, {
	  /**
	   * The animation classNames applied to the component as it enters, exits or
	   * has finished the transition. A single name can be provided and it will be
	   * suffixed for each stage: e.g.
	   *
	   * `classNames="fade"` applies `fade-enter`, `fade-enter-active`,
	   * `fade-enter-done`, `fade-exit`, `fade-exit-active`, `fade-exit-done`,
	   * `fade-appear`, `fade-appear-active`, and `fade-appear-done`.
	   *
	   * **Note**: `fade-appear-done` and `fade-enter-done` will _both_ be applied.
	   * This allows you to define different behavior for when appearing is done and
	   * when regular entering is done, using selectors like
	   * `.fade-enter-done:not(.fade-appear-done)`. For example, you could apply an
	   * epic entrance animation when element first appears in the DOM using
	   * [Animate.css](https://daneden.github.io/animate.css/). Otherwise you can
	   * simply use `fade-enter-done` for defining both cases.
	   *
	   * Each individual classNames can also be specified independently like:
	   *
	   * ```js
	   * classNames={{
	   *  appear: 'my-appear',
	   *  appearActive: 'my-active-appear',
	   *  appearDone: 'my-done-appear',
	   *  enter: 'my-enter',
	   *  enterActive: 'my-active-enter',
	   *  enterDone: 'my-done-enter',
	   *  exit: 'my-exit',
	   *  exitActive: 'my-active-exit',
	   *  exitDone: 'my-done-exit',
	   * }}
	   * ```
	   *
	   * If you want to set these classes using CSS Modules:
	   *
	   * ```js
	   * import styles from './styles.css';
	   * ```
	   *
	   * you might want to use camelCase in your CSS file, that way could simply
	   * spread them instead of listing them one by one:
	   *
	   * ```js
	   * classNames={{ ...styles }}
	   * ```
	   *
	   * @type {string | {
	   *  appear?: string,
	   *  appearActive?: string,
	   *  appearDone?: string,
	   *  enter?: string,
	   *  enterActive?: string,
	   *  enterDone?: string,
	   *  exit?: string,
	   *  exitActive?: string,
	   *  exitDone?: string,
	   * }}
	   */
	  classNames: PropTypes.classNamesShape,

	  /**
	   * A `<Transition>` callback fired immediately after the 'enter' or 'appear' class is
	   * applied.
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool)
	   */
	  onEnter: PropTypes$2.func,

	  /**
	   * A `<Transition>` callback fired immediately after the 'enter-active' or
	   * 'appear-active' class is applied.
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool)
	   */
	  onEntering: PropTypes$2.func,

	  /**
	   * A `<Transition>` callback fired immediately after the 'enter' or
	   * 'appear' classes are **removed** and the `done` class is added to the DOM node.
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool)
	   */
	  onEntered: PropTypes$2.func,

	  /**
	   * A `<Transition>` callback fired immediately after the 'exit' class is
	   * applied.
	   *
	   * @type Function(node: HtmlElement)
	   */
	  onExit: PropTypes$2.func,

	  /**
	   * A `<Transition>` callback fired immediately after the 'exit-active' is applied.
	   *
	   * @type Function(node: HtmlElement)
	   */
	  onExiting: PropTypes$2.func,

	  /**
	   * A `<Transition>` callback fired immediately after the 'exit' classes
	   * are **removed** and the `exit-done` class is added to the DOM node.
	   *
	   * @type Function(node: HtmlElement)
	   */
	  onExited: PropTypes$2.func
	}) ;
	var _default = CSSTransition;
	exports.default = _default;
	module.exports = exports["default"];
	});

	unwrapExports(CSSTransition_1);

	var ChildMapping = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.getChildMapping = getChildMapping;
	exports.mergeChildMappings = mergeChildMappings;
	exports.getInitialChildMapping = getInitialChildMapping;
	exports.getNextChildMapping = getNextChildMapping;



	/**
	 * Given `this.props.children`, return an object mapping key to child.
	 *
	 * @param {*} children `this.props.children`
	 * @return {object} Mapping of key to child
	 */
	function getChildMapping(children, mapFn) {
	  var mapper = function mapper(child) {
	    return mapFn && (0, React__default.isValidElement)(child) ? mapFn(child) : child;
	  };

	  var result = Object.create(null);
	  if (children) React__default.Children.map(children, function (c) {
	    return c;
	  }).forEach(function (child) {
	    // run the map function here instead so that the key is the computed one
	    result[child.key] = mapper(child);
	  });
	  return result;
	}
	/**
	 * When you're adding or removing children some may be added or removed in the
	 * same render pass. We want to show *both* since we want to simultaneously
	 * animate elements in and out. This function takes a previous set of keys
	 * and a new set of keys and merges them with its best guess of the correct
	 * ordering. In the future we may expose some of the utilities in
	 * ReactMultiChild to make this easy, but for now React itself does not
	 * directly have this concept of the union of prevChildren and nextChildren
	 * so we implement it here.
	 *
	 * @param {object} prev prev children as returned from
	 * `ReactTransitionChildMapping.getChildMapping()`.
	 * @param {object} next next children as returned from
	 * `ReactTransitionChildMapping.getChildMapping()`.
	 * @return {object} a key set that contains all keys in `prev` and all keys
	 * in `next` in a reasonable order.
	 */


	function mergeChildMappings(prev, next) {
	  prev = prev || {};
	  next = next || {};

	  function getValueForKey(key) {
	    return key in next ? next[key] : prev[key];
	  } // For each key of `next`, the list of keys to insert before that key in
	  // the combined list


	  var nextKeysPending = Object.create(null);
	  var pendingKeys = [];

	  for (var prevKey in prev) {
	    if (prevKey in next) {
	      if (pendingKeys.length) {
	        nextKeysPending[prevKey] = pendingKeys;
	        pendingKeys = [];
	      }
	    } else {
	      pendingKeys.push(prevKey);
	    }
	  }

	  var i;
	  var childMapping = {};

	  for (var nextKey in next) {
	    if (nextKeysPending[nextKey]) {
	      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
	        var pendingNextKey = nextKeysPending[nextKey][i];
	        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
	      }
	    }

	    childMapping[nextKey] = getValueForKey(nextKey);
	  } // Finally, add the keys which didn't appear before any key in `next`


	  for (i = 0; i < pendingKeys.length; i++) {
	    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	  }

	  return childMapping;
	}

	function getProp(child, prop, props) {
	  return props[prop] != null ? props[prop] : child.props[prop];
	}

	function getInitialChildMapping(props, onExited) {
	  return getChildMapping(props.children, function (child) {
	    return (0, React__default.cloneElement)(child, {
	      onExited: onExited.bind(null, child),
	      in: true,
	      appear: getProp(child, 'appear', props),
	      enter: getProp(child, 'enter', props),
	      exit: getProp(child, 'exit', props)
	    });
	  });
	}

	function getNextChildMapping(nextProps, prevChildMapping, onExited) {
	  var nextChildMapping = getChildMapping(nextProps.children);
	  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
	  Object.keys(children).forEach(function (key) {
	    var child = children[key];
	    if (!(0, React__default.isValidElement)(child)) return;
	    var hasPrev = key in prevChildMapping;
	    var hasNext = key in nextChildMapping;
	    var prevChild = prevChildMapping[key];
	    var isLeaving = (0, React__default.isValidElement)(prevChild) && !prevChild.props.in; // item is new (entering)

	    if (hasNext && (!hasPrev || isLeaving)) {
	      // console.log('entering', key)
	      children[key] = (0, React__default.cloneElement)(child, {
	        onExited: onExited.bind(null, child),
	        in: true,
	        exit: getProp(child, 'exit', nextProps),
	        enter: getProp(child, 'enter', nextProps)
	      });
	    } else if (!hasNext && hasPrev && !isLeaving) {
	      // item is old (exiting)
	      // console.log('leaving', key)
	      children[key] = (0, React__default.cloneElement)(child, {
	        in: false
	      });
	    } else if (hasNext && hasPrev && (0, React__default.isValidElement)(prevChild)) {
	      // item hasn't changed transition states
	      // copy over the last transition props;
	      // console.log('unchanged', key)
	      children[key] = (0, React__default.cloneElement)(child, {
	        onExited: onExited.bind(null, child),
	        in: prevChild.props.in,
	        exit: getProp(child, 'exit', nextProps),
	        enter: getProp(child, 'enter', nextProps)
	      });
	    }
	  });
	  return children;
	}
	});

	unwrapExports(ChildMapping);
	var ChildMapping_1 = ChildMapping.getChildMapping;
	var ChildMapping_2 = ChildMapping.mergeChildMappings;
	var ChildMapping_3 = ChildMapping.getInitialChildMapping;
	var ChildMapping_4 = ChildMapping.getNextChildMapping;

	var TransitionGroup_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.default = void 0;

	var _propTypes = _interopRequireDefault(PropTypes$1);

	var _react = _interopRequireDefault(React__default);





	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	var values = Object.values || function (obj) {
	  return Object.keys(obj).map(function (k) {
	    return obj[k];
	  });
	};

	var defaultProps = {
	  component: 'div',
	  childFactory: function childFactory(child) {
	    return child;
	  }
	  /**
	   * The `<TransitionGroup>` component manages a set of transition components
	   * (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
	   * components, `<TransitionGroup>` is a state machine for managing the mounting
	   * and unmounting of components over time.
	   *
	   * Consider the example below. As items are removed or added to the TodoList the
	   * `in` prop is toggled automatically by the `<TransitionGroup>`.
	   *
	   * Note that `<TransitionGroup>`  does not define any animation behavior!
	   * Exactly _how_ a list item animates is up to the individual transition
	   * component. This means you can mix and match animations across different list
	   * items.
	   */

	};

	var TransitionGroup =
	/*#__PURE__*/
	function (_React$Component) {
	  _inheritsLoose(TransitionGroup, _React$Component);

	  function TransitionGroup(props, context) {
	    var _this;

	    _this = _React$Component.call(this, props, context) || this;

	    var handleExited = _this.handleExited.bind(_assertThisInitialized(_assertThisInitialized(_this))); // Initial children should all be entering, dependent on appear


	    _this.state = {
	      handleExited: handleExited,
	      firstRender: true
	    };
	    return _this;
	  }

	  var _proto = TransitionGroup.prototype;

	  _proto.getChildContext = function getChildContext() {
	    return {
	      transitionGroup: {
	        isMounting: !this.appeared
	      }
	    };
	  };

	  _proto.componentDidMount = function componentDidMount() {
	    this.appeared = true;
	    this.mounted = true;
	  };

	  _proto.componentWillUnmount = function componentWillUnmount() {
	    this.mounted = false;
	  };

	  TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
	    var prevChildMapping = _ref.children,
	        handleExited = _ref.handleExited,
	        firstRender = _ref.firstRender;
	    return {
	      children: firstRender ? (0, ChildMapping.getInitialChildMapping)(nextProps, handleExited) : (0, ChildMapping.getNextChildMapping)(nextProps, prevChildMapping, handleExited),
	      firstRender: false
	    };
	  };

	  _proto.handleExited = function handleExited(child, node) {
	    var currentChildMapping = (0, ChildMapping.getChildMapping)(this.props.children);
	    if (child.key in currentChildMapping) return;

	    if (child.props.onExited) {
	      child.props.onExited(node);
	    }

	    if (this.mounted) {
	      this.setState(function (state) {
	        var children = _extends({}, state.children);

	        delete children[child.key];
	        return {
	          children: children
	        };
	      });
	    }
	  };

	  _proto.render = function render() {
	    var _this$props = this.props,
	        Component = _this$props.component,
	        childFactory = _this$props.childFactory,
	        props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);

	    var children = values(this.state.children).map(childFactory);
	    delete props.appear;
	    delete props.enter;
	    delete props.exit;

	    if (Component === null) {
	      return children;
	    }

	    return _react.default.createElement(Component, props, children);
	  };

	  return TransitionGroup;
	}(_react.default.Component);

	TransitionGroup.childContextTypes = {
	  transitionGroup: _propTypes.default.object.isRequired
	};
	TransitionGroup.propTypes =  {
	  /**
	   * `<TransitionGroup>` renders a `<div>` by default. You can change this
	   * behavior by providing a `component` prop.
	   * If you use React v16+ and would like to avoid a wrapping `<div>` element
	   * you can pass in `component={null}`. This is useful if the wrapping div
	   * borks your css styles.
	   */
	  component: _propTypes.default.any,

	  /**
	   * A set of `<Transition>` components, that are toggled `in` and out as they
	   * leave. the `<TransitionGroup>` will inject specific transition props, so
	   * remember to spread them through if you are wrapping the `<Transition>` as
	   * with our `<Fade>` example.
	   *
	   * While this component is meant for multiple `Transition` or `CSSTransition`
	   * children, sometimes you may want to have a single transition child with
	   * content that you want to be transitioned out and in when you change it
	   * (e.g. routes, images etc.) In that case you can change the `key` prop of
	   * the transition child as you change its content, this will cause
	   * `TransitionGroup` to transition the child out and back in.
	   */
	  children: _propTypes.default.node,

	  /**
	   * A convenience prop that enables or disables appear animations
	   * for all children. Note that specifying this will override any defaults set
	   * on individual children Transitions.
	   */
	  appear: _propTypes.default.bool,

	  /**
	   * A convenience prop that enables or disables enter animations
	   * for all children. Note that specifying this will override any defaults set
	   * on individual children Transitions.
	   */
	  enter: _propTypes.default.bool,

	  /**
	   * A convenience prop that enables or disables exit animations
	   * for all children. Note that specifying this will override any defaults set
	   * on individual children Transitions.
	   */
	  exit: _propTypes.default.bool,

	  /**
	   * You may need to apply reactive updates to a child as it is exiting.
	   * This is generally done by using `cloneElement` however in the case of an exiting
	   * child the element has already been removed and not accessible to the consumer.
	   *
	   * If you do need to update a child as it leaves you can provide a `childFactory`
	   * to wrap every child, even the ones that are leaving.
	   *
	   * @type Function(child: ReactElement) -> ReactElement
	   */
	  childFactory: _propTypes.default.func
	} ;
	TransitionGroup.defaultProps = defaultProps;

	var _default = (0, reactLifecyclesCompat_es.polyfill)(TransitionGroup);

	exports.default = _default;
	module.exports = exports["default"];
	});

	unwrapExports(TransitionGroup_1);

	var ReplaceTransition_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.default = void 0;

	var _propTypes = _interopRequireDefault(PropTypes$1);

	var _react = _interopRequireDefault(React__default);



	var _TransitionGroup = _interopRequireDefault(TransitionGroup_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	/**
	 * The `<ReplaceTransition>` component is a specialized `Transition` component
	 * that animates between two children.
	 *
	 * ```jsx
	 * <ReplaceTransition in>
	 *   <Fade><div>I appear first</div></Fade>
	 *   <Fade><div>I replace the above</div></Fade>
	 * </ReplaceTransition>
	 * ```
	 */
	var ReplaceTransition =
	/*#__PURE__*/
	function (_React$Component) {
	  _inheritsLoose(ReplaceTransition, _React$Component);

	  function ReplaceTransition() {
	    var _this;

	    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
	      _args[_key] = arguments[_key];
	    }

	    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;

	    _this.handleEnter = function () {
	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return _this.handleLifecycle('onEnter', 0, args);
	    };

	    _this.handleEntering = function () {
	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      return _this.handleLifecycle('onEntering', 0, args);
	    };

	    _this.handleEntered = function () {
	      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }

	      return _this.handleLifecycle('onEntered', 0, args);
	    };

	    _this.handleExit = function () {
	      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        args[_key5] = arguments[_key5];
	      }

	      return _this.handleLifecycle('onExit', 1, args);
	    };

	    _this.handleExiting = function () {
	      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	        args[_key6] = arguments[_key6];
	      }

	      return _this.handleLifecycle('onExiting', 1, args);
	    };

	    _this.handleExited = function () {
	      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	        args[_key7] = arguments[_key7];
	      }

	      return _this.handleLifecycle('onExited', 1, args);
	    };

	    return _this;
	  }

	  var _proto = ReplaceTransition.prototype;

	  _proto.handleLifecycle = function handleLifecycle(handler, idx, originalArgs) {
	    var _child$props;

	    var children = this.props.children;

	    var child = _react.default.Children.toArray(children)[idx];

	    if (child.props[handler]) (_child$props = child.props)[handler].apply(_child$props, originalArgs);
	    if (this.props[handler]) this.props[handler]((0, reactDom__default.findDOMNode)(this));
	  };

	  _proto.render = function render() {
	    var _this$props = this.props,
	        children = _this$props.children,
	        inProp = _this$props.in,
	        props = _objectWithoutPropertiesLoose(_this$props, ["children", "in"]);

	    var _React$Children$toArr = _react.default.Children.toArray(children),
	        first = _React$Children$toArr[0],
	        second = _React$Children$toArr[1];

	    delete props.onEnter;
	    delete props.onEntering;
	    delete props.onEntered;
	    delete props.onExit;
	    delete props.onExiting;
	    delete props.onExited;
	    return _react.default.createElement(_TransitionGroup.default, props, inProp ? _react.default.cloneElement(first, {
	      key: 'first',
	      onEnter: this.handleEnter,
	      onEntering: this.handleEntering,
	      onEntered: this.handleEntered
	    }) : _react.default.cloneElement(second, {
	      key: 'second',
	      onEnter: this.handleExit,
	      onEntering: this.handleExiting,
	      onEntered: this.handleExited
	    }));
	  };

	  return ReplaceTransition;
	}(_react.default.Component);

	ReplaceTransition.propTypes =  {
	  in: _propTypes.default.bool.isRequired,
	  children: function children(props, propName) {
	    if (_react.default.Children.count(props[propName]) !== 2) return new Error("\"" + propName + "\" must be exactly two transition components.");
	    return null;
	  }
	} ;
	var _default = ReplaceTransition;
	exports.default = _default;
	module.exports = exports["default"];
	});

	unwrapExports(ReplaceTransition_1);

	var reactTransitionGroup = createCommonjsModule(function (module) {

	var _CSSTransition = _interopRequireDefault(CSSTransition_1);

	var _ReplaceTransition = _interopRequireDefault(ReplaceTransition_1);

	var _TransitionGroup = _interopRequireDefault(TransitionGroup_1);

	var _Transition = _interopRequireDefault(Transition_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	  Transition: _Transition.default,
	  TransitionGroup: _TransitionGroup.default,
	  ReplaceTransition: _ReplaceTransition.default,
	  CSSTransition: _CSSTransition.default
	};
	});

	unwrapExports(reactTransitionGroup);
	var reactTransitionGroup_1 = reactTransitionGroup.Transition;
	var reactTransitionGroup_2 = reactTransitionGroup.TransitionGroup;
	var reactTransitionGroup_3 = reactTransitionGroup.ReplaceTransition;
	var reactTransitionGroup_4 = reactTransitionGroup.CSSTransition;

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _extends() {
	  _extends = Object.assign || function (target) {
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

	  return _extends.apply(this, arguments);
	}

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};

	  var target = _objectWithoutPropertiesLoose(source, excluded);

	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	// ==============================
	// NO OP
	// ==============================
	var noop = function noop() {};
	// Class Name Prefixer
	// ==============================

	/**
	 String representation of component state for styling with class names.

	 Expects an array of strings OR a string/object pair:
	 - className(['comp', 'comp-arg', 'comp-arg-2'])
	   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
	 - className('comp', { some: true, state: false })
	   @returns 'react-select__comp react-select__comp--some'
	*/

	function applyPrefixToName(prefix, name) {
	  if (!name) {
	    return prefix;
	  } else if (name[0] === '-') {
	    return prefix + name;
	  } else {
	    return prefix + '__' + name;
	  }
	}

	function classNames(prefix, cssKey, state, className) {
	  var arr = [cssKey, className];

	  if (state && prefix) {
	    for (var key in state) {
	      if (state.hasOwnProperty(key) && state[key]) {
	        arr.push("".concat(applyPrefixToName(prefix, key)));
	      }
	    }
	  }

	  return arr.filter(function (i) {
	    return i;
	  }).map(function (i) {
	    return String(i).trim();
	  }).join(' ');
	} // ==============================
	// Clean Value
	// ==============================

	var cleanValue = function cleanValue(value) {
	  if (Array.isArray(value)) return value.filter(Boolean);
	  if (_typeof(value) === 'object' && value !== null) return [value];
	  return [];
	}; // ==============================
	// Handle Input Change
	// ==============================

	function handleInputChange(inputValue, actionMeta, onInputChange) {
	  if (onInputChange) {
	    var newValue = onInputChange(inputValue, actionMeta);
	    if (typeof newValue === 'string') return newValue;
	  }

	  return inputValue;
	} // ==============================
	// Scroll Helpers
	// ==============================

	function isDocumentElement(el) {
	  return [document.documentElement, document.body, window].indexOf(el) > -1;
	} // Normalized Scroll Top
	// ------------------------------

	function getScrollTop(el) {
	  if (isDocumentElement(el)) {
	    return window.pageYOffset;
	  }

	  return el.scrollTop;
	}
	function scrollTo(el, top) {
	  // with a scroll distance, we perform scroll on the element
	  if (isDocumentElement(el)) {
	    window.scrollTo(0, top);
	    return;
	  }

	  el.scrollTop = top;
	} // Get Scroll Parent
	// ------------------------------

	function getScrollParent(element) {
	  var style = getComputedStyle(element);
	  var excludeStaticParent = style.position === 'absolute';
	  var overflowRx = /(auto|scroll)/;
	  var docEl = document.documentElement; // suck it, flow...

	  if (style.position === 'fixed') return docEl;

	  for (var parent = element; parent = parent.parentElement;) {
	    style = getComputedStyle(parent);

	    if (excludeStaticParent && style.position === 'static') {
	      continue;
	    }

	    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
	      return parent;
	    }
	  }

	  return docEl;
	} // Animated Scroll To
	// ------------------------------

	/**
	  @param t: time (elapsed)
	  @param b: initial value
	  @param c: amount of change
	  @param d: duration
	*/

	function easeOutCubic(t, b, c, d) {
	  return c * ((t = t / d - 1) * t * t + 1) + b;
	}

	function animatedScrollTo(element, to) {
	  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
	  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
	  var start = getScrollTop(element);
	  var change = to - start;
	  var increment = 10;
	  var currentTime = 0;

	  function animateScroll() {
	    currentTime += increment;
	    var val = easeOutCubic(currentTime, start, change, duration);
	    scrollTo(element, val);

	    if (currentTime < duration) {
	      raf_1(animateScroll);
	    } else {
	      callback(element);
	    }
	  }

	  animateScroll();
	} // Scroll Into View
	// ------------------------------

	function scrollIntoView(menuEl, focusedEl) {
	  var menuRect = menuEl.getBoundingClientRect();
	  var focusedRect = focusedEl.getBoundingClientRect();
	  var overScroll = focusedEl.offsetHeight / 3;

	  if (focusedRect.bottom + overScroll > menuRect.bottom) {
	    scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
	  } else if (focusedRect.top - overScroll < menuRect.top) {
	    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
	  }
	} // ==============================
	// Get bounding client object
	// ==============================
	// cannot get keys using array notation with DOMRect

	function getBoundingClientObj(element) {
	  var rect = element.getBoundingClientRect();
	  return {
	    bottom: rect.bottom,
	    height: rect.height,
	    left: rect.left,
	    right: rect.right,
	    top: rect.top,
	    width: rect.width
	  };
	}
	// Touch Capability Detector
	// ==============================

	function isTouchCapable() {
	  try {
	    document.createEvent('TouchEvent');
	    return true;
	  } catch (e) {
	    return false;
	  }
	} // ==============================
	// Mobile Device Detector
	// ==============================

	function isMobileDevice() {
	  try {
	    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	  } catch (e) {
	    return false;
	  }
	}

	function getMenuPlacement(_ref) {
	  var maxHeight = _ref.maxHeight,
	      menuEl = _ref.menuEl,
	      minHeight = _ref.minHeight,
	      placement = _ref.placement,
	      shouldScroll = _ref.shouldScroll,
	      isFixedPosition = _ref.isFixedPosition,
	      theme = _ref.theme;
	  var spacing = theme.spacing;
	  var scrollParent = getScrollParent(menuEl);
	  var defaultState = {
	    placement: 'bottom',
	    maxHeight: maxHeight
	  }; // something went wrong, return default state

	  if (!menuEl || !menuEl.offsetParent) return defaultState; // we can't trust `scrollParent.scrollHeight` --> it may increase when
	  // the menu is rendered

	  var _scrollParent$getBoun = scrollParent.getBoundingClientRect(),
	      scrollHeight = _scrollParent$getBoun.height;

	  var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(),
	      menuBottom = _menuEl$getBoundingCl.bottom,
	      menuHeight = _menuEl$getBoundingCl.height,
	      menuTop = _menuEl$getBoundingCl.top;

	  var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(),
	      containerTop = _menuEl$offsetParent$.top;

	  var viewHeight = window.innerHeight;
	  var scrollTop = getScrollTop(scrollParent);
	  var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
	  var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
	  var viewSpaceAbove = containerTop - marginTop;
	  var viewSpaceBelow = viewHeight - menuTop;
	  var scrollSpaceAbove = viewSpaceAbove + scrollTop;
	  var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
	  var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
	  var scrollUp = scrollTop + menuTop - marginTop;
	  var scrollDuration = 160;

	  switch (placement) {
	    case 'auto':
	    case 'bottom':
	      // 1: the menu will fit, do nothing
	      if (viewSpaceBelow >= menuHeight) {
	        return {
	          placement: 'bottom',
	          maxHeight: maxHeight
	        };
	      } // 2: the menu will fit, if scrolled


	      if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
	        if (shouldScroll) {
	          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
	        }

	        return {
	          placement: 'bottom',
	          maxHeight: maxHeight
	        };
	      } // 3: the menu will fit, if constrained


	      if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
	        if (shouldScroll) {
	          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
	        } // we want to provide as much of the menu as possible to the user,
	        // so give them whatever is available below rather than the minHeight.


	        var constrainedHeight = isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom;
	        return {
	          placement: 'bottom',
	          maxHeight: constrainedHeight
	        };
	      } // 4. Forked beviour when there isn't enough space below
	      // AUTO: flip the menu, render above


	      if (placement === 'auto' || isFixedPosition) {
	        // may need to be constrained after flipping
	        var _constrainedHeight = maxHeight;
	        var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;

	        if (spaceAbove >= minHeight) {
	          _constrainedHeight = Math.min(spaceAbove - marginBottom - spacing.controlHeight, maxHeight);
	        }

	        return {
	          placement: 'top',
	          maxHeight: _constrainedHeight
	        };
	      } // BOTTOM: allow browser to increase scrollable area and immediately set scroll


	      if (placement === 'bottom') {
	        scrollTo(scrollParent, scrollDown);
	        return {
	          placement: 'bottom',
	          maxHeight: maxHeight
	        };
	      }

	      break;

	    case 'top':
	      // 1: the menu will fit, do nothing
	      if (viewSpaceAbove >= menuHeight) {
	        return {
	          placement: 'top',
	          maxHeight: maxHeight
	        };
	      } // 2: the menu will fit, if scrolled


	      if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
	        if (shouldScroll) {
	          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
	        }

	        return {
	          placement: 'top',
	          maxHeight: maxHeight
	        };
	      } // 3: the menu will fit, if constrained


	      if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
	        var _constrainedHeight2 = maxHeight; // we want to provide as much of the menu as possible to the user,
	        // so give them whatever is available below rather than the minHeight.

	        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
	          _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
	        }

	        if (shouldScroll) {
	          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
	        }

	        return {
	          placement: 'top',
	          maxHeight: _constrainedHeight2
	        };
	      } // 4. not enough space, the browser WILL NOT increase scrollable area when
	      // absolutely positioned element rendered above the viewport (only below).
	      // Flip the menu, render below


	      return {
	        placement: 'bottom',
	        maxHeight: maxHeight
	      };

	    default:
	      throw new Error("Invalid placement provided \"".concat(placement, "\"."));
	  } // fulfil contract with flow: implicit return value of undefined


	  return defaultState;
	} // Menu Component
	// ------------------------------

	function alignToControl(placement) {
	  var placementToCSSProp = {
	    bottom: 'top',
	    top: 'bottom'
	  };
	  return placement ? placementToCSSProp[placement] : 'bottom';
	}

	var coercePlacement = function coercePlacement(p) {
	  return p === 'auto' ? 'bottom' : p;
	};

	var menuCSS = function menuCSS(_ref2) {
	  var _ref3;

	  var placement = _ref2.placement,
	      _ref2$theme = _ref2.theme,
	      borderRadius = _ref2$theme.borderRadius,
	      spacing = _ref2$theme.spacing,
	      colors = _ref2$theme.colors;
	  return _ref3 = {
	    label: 'menu'
	  }, _defineProperty(_ref3, alignToControl(placement), '100%'), _defineProperty(_ref3, "backgroundColor", colors.neutral0), _defineProperty(_ref3, "borderRadius", borderRadius), _defineProperty(_ref3, "boxShadow", '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)'), _defineProperty(_ref3, "marginBottom", spacing.menuGutter), _defineProperty(_ref3, "marginTop", spacing.menuGutter), _defineProperty(_ref3, "position", 'absolute'), _defineProperty(_ref3, "width", '100%'), _defineProperty(_ref3, "zIndex", 1), _ref3;
	}; // NOTE: internal only

	var MenuPlacer =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(MenuPlacer, _Component);

	  function MenuPlacer() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, MenuPlacer);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MenuPlacer)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
	      maxHeight: _this.props.maxMenuHeight,
	      placement: null
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPlacement", function (ref) {
	      var _this$props = _this.props,
	          minMenuHeight = _this$props.minMenuHeight,
	          maxMenuHeight = _this$props.maxMenuHeight,
	          menuPlacement = _this$props.menuPlacement,
	          menuPosition = _this$props.menuPosition,
	          menuShouldScrollIntoView = _this$props.menuShouldScrollIntoView,
	          theme = _this$props.theme;
	      var getPortalPlacement = _this.context.getPortalPlacement;
	      if (!ref) return; // DO NOT scroll if position is fixed

	      var isFixedPosition = menuPosition === 'fixed';
	      var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;
	      var state = getMenuPlacement({
	        maxHeight: maxMenuHeight,
	        menuEl: ref,
	        minHeight: minMenuHeight,
	        placement: menuPlacement,
	        shouldScroll: shouldScroll,
	        isFixedPosition: isFixedPosition,
	        theme: theme
	      });
	      if (getPortalPlacement) getPortalPlacement(state);

	      _this.setState(state);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getUpdatedProps", function () {
	      var menuPlacement = _this.props.menuPlacement;
	      var placement = _this.state.placement || coercePlacement(menuPlacement);
	      return _objectSpread({}, _this.props, {
	        placement: placement,
	        maxHeight: _this.state.maxHeight
	      });
	    });

	    return _this;
	  }

	  _createClass(MenuPlacer, [{
	    key: "render",
	    value: function render() {
	      var children = this.props.children;
	      return children({
	        ref: this.getPlacement,
	        placerProps: this.getUpdatedProps()
	      });
	    }
	  }]);

	  return MenuPlacer;
	}(React.Component);

	_defineProperty(MenuPlacer, "contextTypes", {
	  getPortalPlacement: PropTypes$1.func
	});

	var Menu = function Menu(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerRef = props.innerRef,
	      innerProps = props.innerProps;
	  var cn = cx(
	  /*#__PURE__*/
	  css(getStyles('menu', props)), {
	    menu: true
	  }, className);
	  return React__default.createElement("div", _extends({
	    className: cn
	  }, innerProps, {
	    ref: innerRef
	  }), children);
	};
	// Menu List
	// ==============================

	var menuListCSS = function menuListCSS(_ref4) {
	  var maxHeight = _ref4.maxHeight,
	      baseUnit = _ref4.theme.spacing.baseUnit;
	  return {
	    maxHeight: maxHeight,
	    overflowY: 'auto',
	    paddingBottom: baseUnit,
	    paddingTop: baseUnit,
	    position: 'relative',
	    // required for offset[Height, Top] > keyboard scroll
	    WebkitOverflowScrolling: 'touch'
	  };
	};
	var MenuList = function MenuList(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      isMulti = props.isMulti,
	      innerRef = props.innerRef;
	  return React__default.createElement("div", {
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('menuList', props)), {
	      'menu-list': true,
	      'menu-list--is-multi': isMulti
	    }, className),
	    ref: innerRef
	  }, children);
	}; // ==============================
	// Menu Notices
	// ==============================

	var noticeCSS = function noticeCSS(_ref5) {
	  var _ref5$theme = _ref5.theme,
	      baseUnit = _ref5$theme.spacing.baseUnit,
	      colors = _ref5$theme.colors;
	  return {
	    color: colors.neutral40,
	    padding: "".concat(baseUnit * 2, "px ").concat(baseUnit * 3, "px"),
	    textAlign: 'center'
	  };
	};

	var noOptionsMessageCSS = noticeCSS;
	var loadingMessageCSS = noticeCSS;
	var NoOptionsMessage = function NoOptionsMessage(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return React__default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('noOptionsMessage', props)), {
	      'menu-notice': true,
	      'menu-notice--no-options': true
	    }, className)
	  }, innerProps), children);
	};
	NoOptionsMessage.defaultProps = {
	  children: 'No options'
	};
	var LoadingMessage = function LoadingMessage(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return React__default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('loadingMessage', props)), {
	      'menu-notice': true,
	      'menu-notice--loading': true
	    }, className)
	  }, innerProps), children);
	};
	LoadingMessage.defaultProps = {
	  children: 'Loading...'
	}; // ==============================
	// Menu Portal
	// ==============================

	var menuPortalCSS = function menuPortalCSS(_ref6) {
	  var rect = _ref6.rect,
	      offset = _ref6.offset,
	      position = _ref6.position;
	  return {
	    left: rect.left,
	    position: position,
	    top: offset,
	    width: rect.width,
	    zIndex: 1
	  };
	};
	var MenuPortal =
	/*#__PURE__*/
	function (_Component2) {
	  _inherits(MenuPortal, _Component2);

	  function MenuPortal() {
	    var _getPrototypeOf3;

	    var _this2;

	    _classCallCheck(this, MenuPortal);

	    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(MenuPortal)).call.apply(_getPrototypeOf3, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
	      placement: null
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "getPortalPlacement", function (_ref7) {
	      var placement = _ref7.placement;
	      var initialPlacement = coercePlacement(_this2.props.menuPlacement); // avoid re-renders if the placement has not changed

	      if (placement !== initialPlacement) {
	        _this2.setState({
	          placement: placement
	        });
	      }
	    });

	    return _this2;
	  }

	  _createClass(MenuPortal, [{
	    key: "getChildContext",
	    value: function getChildContext() {
	      return {
	        getPortalPlacement: this.getPortalPlacement
	      };
	    } // callback for occassions where the menu must "flip"

	  }, {
	    key: "render",
	    value: function render() {
	      var _this$props2 = this.props,
	          appendTo = _this$props2.appendTo,
	          children = _this$props2.children,
	          controlElement = _this$props2.controlElement,
	          menuPlacement = _this$props2.menuPlacement,
	          position = _this$props2.menuPosition,
	          getStyles = _this$props2.getStyles;
	      var isFixed = position === 'fixed'; // bail early if required elements aren't present

	      if (!appendTo && !isFixed || !controlElement) {
	        return null;
	      }

	      var placement = this.state.placement || coercePlacement(menuPlacement);
	      var rect = getBoundingClientObj(controlElement);
	      var scrollDistance = isFixed ? 0 : window.pageYOffset;
	      var offset = rect[placement] + scrollDistance;
	      var state = {
	        offset: offset,
	        position: position,
	        rect: rect
	      }; // same wrapper element whether fixed or portalled

	      var menuWrapper = React__default.createElement("div", {
	        className:
	        /*#__PURE__*/

	        /*#__PURE__*/
	        css(getStyles('menuPortal', state))
	      }, children);
	      return appendTo ? reactDom.createPortal(menuWrapper, appendTo) : menuWrapper;
	    }
	  }]);

	  return MenuPortal;
	}(React.Component);

	_defineProperty(MenuPortal, "childContextTypes", {
	  getPortalPlacement: PropTypes$1.func
	});

	var isArray$1 = Array.isArray;
	var keyList = Object.keys;
	var hasProp = Object.prototype.hasOwnProperty;

	function equal(a, b) {
	  // fast-deep-equal index.js 2.0.1
	  if (a === b) return true;

	  if (a && b && _typeof(a) == 'object' && _typeof(b) == 'object') {
	    var arrA = isArray$1(a),
	        arrB = isArray$1(b),
	        i,
	        length,
	        key;

	    if (arrA && arrB) {
	      length = a.length;
	      if (length != b.length) return false;

	      for (i = length; i-- !== 0;) {
	        if (!equal(a[i], b[i])) return false;
	      }

	      return true;
	    }

	    if (arrA != arrB) return false;
	    var dateA = a instanceof Date,
	        dateB = b instanceof Date;
	    if (dateA != dateB) return false;
	    if (dateA && dateB) return a.getTime() == b.getTime();
	    var regexpA = a instanceof RegExp,
	        regexpB = b instanceof RegExp;
	    if (regexpA != regexpB) return false;
	    if (regexpA && regexpB) return a.toString() == b.toString();
	    var keys = keyList(a);
	    length = keys.length;

	    if (length !== keyList(b).length) {
	      return false;
	    }

	    for (i = length; i-- !== 0;) {
	      if (!hasProp.call(b, keys[i])) return false;
	    } // end fast-deep-equal
	    // Custom handling for React


	    for (i = length; i-- !== 0;) {
	      key = keys[i];

	      if (key === '_owner' && a.$$typeof) {
	        // React-specific: avoid traversing React elements' _owner.
	        //  _owner contains circular references
	        // and is not needed when comparing the actual elements (and not their owners)
	        // .$$typeof and ._store on just reasonable markers of a react element
	        continue;
	      } else {
	        // all other properties should be traversed as usual
	        if (!equal(a[key], b[key])) return false;
	      }
	    } // fast-deep-equal index.js 2.0.1


	    return true;
	  }

	  return a !== a && b !== b;
	} // end fast-deep-equal


	function exportedEqual(a, b) {
	  try {
	    return equal(a, b);
	  } catch (error) {
	    if (error.message && error.message.match(/stack|recursion/i)) {
	      // warn on circular references, don't crash
	      // browsers give this different errors name and messages:
	      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
	      // firefox: "InternalError", too much recursion"
	      // edge: "Error", "Out of stack space"
	      console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
	      return false;
	    } // some other error. we should definitely know about these


	    throw error;
	  }
	}

	var diacritics = [{
	  base: 'A',
	  letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
	}, {
	  base: 'AA',
	  letters: /[\uA732]/g
	}, {
	  base: 'AE',
	  letters: /[\u00C6\u01FC\u01E2]/g
	}, {
	  base: 'AO',
	  letters: /[\uA734]/g
	}, {
	  base: 'AU',
	  letters: /[\uA736]/g
	}, {
	  base: 'AV',
	  letters: /[\uA738\uA73A]/g
	}, {
	  base: 'AY',
	  letters: /[\uA73C]/g
	}, {
	  base: 'B',
	  letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
	}, {
	  base: 'C',
	  letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
	}, {
	  base: 'D',
	  letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
	}, {
	  base: 'DZ',
	  letters: /[\u01F1\u01C4]/g
	}, {
	  base: 'Dz',
	  letters: /[\u01F2\u01C5]/g
	}, {
	  base: 'E',
	  letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
	}, {
	  base: 'F',
	  letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
	}, {
	  base: 'G',
	  letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
	}, {
	  base: 'H',
	  letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
	}, {
	  base: 'I',
	  letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
	}, {
	  base: 'J',
	  letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g
	}, {
	  base: 'K',
	  letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
	}, {
	  base: 'L',
	  letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
	}, {
	  base: 'LJ',
	  letters: /[\u01C7]/g
	}, {
	  base: 'Lj',
	  letters: /[\u01C8]/g
	}, {
	  base: 'M',
	  letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g
	}, {
	  base: 'N',
	  letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
	}, {
	  base: 'NJ',
	  letters: /[\u01CA]/g
	}, {
	  base: 'Nj',
	  letters: /[\u01CB]/g
	}, {
	  base: 'O',
	  letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
	}, {
	  base: 'OI',
	  letters: /[\u01A2]/g
	}, {
	  base: 'OO',
	  letters: /[\uA74E]/g
	}, {
	  base: 'OU',
	  letters: /[\u0222]/g
	}, {
	  base: 'P',
	  letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
	}, {
	  base: 'Q',
	  letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
	}, {
	  base: 'R',
	  letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
	}, {
	  base: 'S',
	  letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
	}, {
	  base: 'T',
	  letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
	}, {
	  base: 'TZ',
	  letters: /[\uA728]/g
	}, {
	  base: 'U',
	  letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
	}, {
	  base: 'V',
	  letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
	}, {
	  base: 'VY',
	  letters: /[\uA760]/g
	}, {
	  base: 'W',
	  letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
	}, {
	  base: 'X',
	  letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g
	}, {
	  base: 'Y',
	  letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
	}, {
	  base: 'Z',
	  letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
	}, {
	  base: 'a',
	  letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
	}, {
	  base: 'aa',
	  letters: /[\uA733]/g
	}, {
	  base: 'ae',
	  letters: /[\u00E6\u01FD\u01E3]/g
	}, {
	  base: 'ao',
	  letters: /[\uA735]/g
	}, {
	  base: 'au',
	  letters: /[\uA737]/g
	}, {
	  base: 'av',
	  letters: /[\uA739\uA73B]/g
	}, {
	  base: 'ay',
	  letters: /[\uA73D]/g
	}, {
	  base: 'b',
	  letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
	}, {
	  base: 'c',
	  letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
	}, {
	  base: 'd',
	  letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
	}, {
	  base: 'dz',
	  letters: /[\u01F3\u01C6]/g
	}, {
	  base: 'e',
	  letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
	}, {
	  base: 'f',
	  letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g
	}, {
	  base: 'g',
	  letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
	}, {
	  base: 'h',
	  letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
	}, {
	  base: 'hv',
	  letters: /[\u0195]/g
	}, {
	  base: 'i',
	  letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
	}, {
	  base: 'j',
	  letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g
	}, {
	  base: 'k',
	  letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
	}, {
	  base: 'l',
	  letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
	}, {
	  base: 'lj',
	  letters: /[\u01C9]/g
	}, {
	  base: 'm',
	  letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g
	}, {
	  base: 'n',
	  letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
	}, {
	  base: 'nj',
	  letters: /[\u01CC]/g
	}, {
	  base: 'o',
	  letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
	}, {
	  base: 'oi',
	  letters: /[\u01A3]/g
	}, {
	  base: 'ou',
	  letters: /[\u0223]/g
	}, {
	  base: 'oo',
	  letters: /[\uA74F]/g
	}, {
	  base: 'p',
	  letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
	}, {
	  base: 'q',
	  letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
	}, {
	  base: 'r',
	  letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
	}, {
	  base: 's',
	  letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
	}, {
	  base: 't',
	  letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
	}, {
	  base: 'tz',
	  letters: /[\uA729]/g
	}, {
	  base: 'u',
	  letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
	}, {
	  base: 'v',
	  letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
	}, {
	  base: 'vy',
	  letters: /[\uA761]/g
	}, {
	  base: 'w',
	  letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
	}, {
	  base: 'x',
	  letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g
	}, {
	  base: 'y',
	  letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
	}, {
	  base: 'z',
	  letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
	}];
	var stripDiacritics = function stripDiacritics(str) {
	  for (var i = 0; i < diacritics.length; i++) {
	    str = str.replace(diacritics[i].letters, diacritics[i].base);
	  }

	  return str;
	};

	var trimString = function trimString(str) {
	  return str.replace(/^\s+|\s+$/g, '');
	};

	var defaultStringify = function defaultStringify(option) {
	  return "".concat(option.label, " ").concat(option.value);
	};

	var createFilter = function createFilter(config) {
	  return function (option, rawInput) {
	    var _ignoreCase$ignoreAcc = _objectSpread({
	      ignoreCase: true,
	      ignoreAccents: true,
	      stringify: defaultStringify,
	      trim: true,
	      matchFrom: 'any'
	    }, config),
	        ignoreCase = _ignoreCase$ignoreAcc.ignoreCase,
	        ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents,
	        stringify = _ignoreCase$ignoreAcc.stringify,
	        trim = _ignoreCase$ignoreAcc.trim,
	        matchFrom = _ignoreCase$ignoreAcc.matchFrom;

	    var input = trim ? trimString(rawInput) : rawInput;
	    var candidate = trim ? trimString(stringify(option)) : stringify(option);

	    if (ignoreCase) {
	      input = input.toLowerCase();
	      candidate = candidate.toLowerCase();
	    }

	    if (ignoreAccents) {
	      input = stripDiacritics(input);
	      candidate = stripDiacritics(candidate);
	    }

	    return matchFrom === 'start' ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
	  };
	};

	var A11yText = function A11yText(props) {
	  return React__default.createElement("span", _extends({
	    className:
	    /*#__PURE__*/

	    /*#__PURE__*/
	    css({
	      label: 'a11yText',
	      zIndex: 9999,
	      border: 0,
	      clip: 'rect(1px, 1px, 1px, 1px)',
	      height: 1,
	      width: 1,
	      position: 'absolute',
	      overflow: 'hidden',
	      padding: 0,
	      whiteSpace: 'nowrap',
	      backgroundColor: 'red',
	      color: 'blue'
	    })
	  }, props));
	};

	var DummyInput =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(DummyInput, _Component);

	  function DummyInput() {
	    _classCallCheck(this, DummyInput);

	    return _possibleConstructorReturn(this, _getPrototypeOf(DummyInput).apply(this, arguments));
	  }

	  _createClass(DummyInput, [{
	    key: "render",
	    value: function render() {
	      var _this$props = this.props,
	          inProp = _this$props.in,
	          out = _this$props.out,
	          onExited = _this$props.onExited,
	          appear = _this$props.appear,
	          enter = _this$props.enter,
	          exit = _this$props.exit,
	          innerRef = _this$props.innerRef,
	          emotion = _this$props.emotion,
	          props = _objectWithoutProperties(_this$props, ["in", "out", "onExited", "appear", "enter", "exit", "innerRef", "emotion"]);

	      return React__default.createElement("input", _extends({
	        ref: innerRef
	      }, props, {
	        className:
	        /*#__PURE__*/

	        /*#__PURE__*/
	        css({
	          label: 'dummyInput',
	          // get rid of any default styles
	          background: 0,
	          border: 0,
	          fontSize: 'inherit',
	          outline: 0,
	          padding: 0,
	          // important! without `width` browsers won't allow focus
	          width: 1,
	          // remove cursor on desktop
	          color: 'transparent',
	          // remove cursor on mobile whilst maintaining "scroll into view" behaviour
	          left: -100,
	          opacity: 0,
	          position: 'relative',
	          transform: 'scale(0)'
	        })
	      }));
	    }
	  }]);

	  return DummyInput;
	}(React.Component);

	var NodeResolver =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(NodeResolver, _Component);

	  function NodeResolver() {
	    _classCallCheck(this, NodeResolver);

	    return _possibleConstructorReturn(this, _getPrototypeOf(NodeResolver).apply(this, arguments));
	  }

	  _createClass(NodeResolver, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.props.innerRef(reactDom.findDOMNode(this));
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.props.innerRef(null);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.props.children;
	    }
	  }]);

	  return NodeResolver;
	}(React.Component);

	var STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
	var LOCK_STYLES = {
	  boxSizing: 'border-box',
	  // account for possible declaration `width: 100%;` on body
	  overflow: 'hidden',
	  position: 'relative',
	  height: '100%'
	};

	function preventTouchMove(e) {
	  e.preventDefault();
	}
	function allowTouchMove(e) {
	  e.stopPropagation();
	}
	function preventInertiaScroll() {
	  var top = this.scrollTop;
	  var totalScroll = this.scrollHeight;
	  var currentScroll = top + this.offsetHeight;

	  if (top === 0) {
	    this.scrollTop = 1;
	  } else if (currentScroll === totalScroll) {
	    this.scrollTop = top - 1;
	  }
	} // `ontouchstart` check works on most browsers
	// `maxTouchPoints` works on IE10/11 and Surface

	function isTouchDevice() {
	  return 'ontouchstart' in window || navigator.maxTouchPoints;
	}

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	var activeScrollLocks = 0;

	var ScrollLock =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(ScrollLock, _Component);

	  function ScrollLock() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, ScrollLock);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollLock)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "originalStyles", {});

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "listenerOptions", {
	      capture: false,
	      passive: false
	    });

	    return _this;
	  }

	  _createClass(ScrollLock, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var _this2 = this;

	      if (!canUseDOM) return;
	      var _this$props = this.props,
	          accountForScrollbars = _this$props.accountForScrollbars,
	          touchScrollTarget = _this$props.touchScrollTarget;
	      var target = document.body;
	      var targetStyle = target && target.style;

	      if (accountForScrollbars) {
	        // store any styles already applied to the body
	        STYLE_KEYS.forEach(function (key) {
	          var val = targetStyle && targetStyle[key];
	          _this2.originalStyles[key] = val;
	        });
	      } // apply the lock styles and padding if this is the first scroll lock


	      if (accountForScrollbars && activeScrollLocks < 1) {
	        var currentPadding = parseInt(this.originalStyles.paddingRight, 10) || 0;
	        var clientWidth = document.body ? document.body.clientWidth : 0;
	        var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
	        Object.keys(LOCK_STYLES).forEach(function (key) {
	          var val = LOCK_STYLES[key];

	          if (targetStyle) {
	            targetStyle[key] = val;
	          }
	        });

	        if (targetStyle) {
	          targetStyle.paddingRight = "".concat(adjustedPadding, "px");
	        }
	      } // account for touch devices


	      if (target && isTouchDevice()) {
	        // Mobile Safari ignores { overflow: hidden } declaration on the body.
	        target.addEventListener('touchmove', preventTouchMove, this.listenerOptions); // Allow scroll on provided target

	        if (touchScrollTarget) {
	          touchScrollTarget.addEventListener('touchstart', preventInertiaScroll, this.listenerOptions);
	          touchScrollTarget.addEventListener('touchmove', allowTouchMove, this.listenerOptions);
	        }
	      } // increment active scroll locks


	      activeScrollLocks += 1;
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      var _this3 = this;

	      if (!canUseDOM) return;
	      var _this$props2 = this.props,
	          accountForScrollbars = _this$props2.accountForScrollbars,
	          touchScrollTarget = _this$props2.touchScrollTarget;
	      var target = document.body;
	      var targetStyle = target && target.style; // safely decrement active scroll locks

	      activeScrollLocks = Math.max(activeScrollLocks - 1, 0); // reapply original body styles, if any

	      if (accountForScrollbars && activeScrollLocks < 1) {
	        STYLE_KEYS.forEach(function (key) {
	          var val = _this3.originalStyles[key];

	          if (targetStyle) {
	            targetStyle[key] = val;
	          }
	        });
	      } // remove touch listeners


	      if (target && isTouchDevice()) {
	        target.removeEventListener('touchmove', preventTouchMove, this.listenerOptions);

	        if (touchScrollTarget) {
	          touchScrollTarget.removeEventListener('touchstart', preventInertiaScroll, this.listenerOptions);
	          touchScrollTarget.removeEventListener('touchmove', allowTouchMove, this.listenerOptions);
	        }
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return null;
	    }
	  }]);

	  return ScrollLock;
	}(React.Component);

	_defineProperty(ScrollLock, "defaultProps", {
	  accountForScrollbars: true
	});

	// NOTE:
	// We shouldn't need this after updating to React v16.3.0, which introduces:
	// - createRef() https://reactjs.org/docs/react-api.html#reactcreateref
	// - forwardRef() https://reactjs.org/docs/react-api.html#reactforwardref
	var ScrollBlock =
	/*#__PURE__*/
	function (_PureComponent) {
	  _inherits(ScrollBlock, _PureComponent);

	  function ScrollBlock() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, ScrollBlock);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollBlock)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
	      touchScrollTarget: null
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getScrollTarget", function (ref) {
	      if (ref === _this.state.touchScrollTarget) return;

	      _this.setState({
	        touchScrollTarget: ref
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blurSelectInput", function () {
	      if (document.activeElement) {
	        document.activeElement.blur();
	      }
	    });

	    return _this;
	  }

	  _createClass(ScrollBlock, [{
	    key: "render",
	    value: function render() {
	      var _this$props = this.props,
	          children = _this$props.children,
	          isEnabled = _this$props.isEnabled;
	      var touchScrollTarget = this.state.touchScrollTarget; // bail early if not enabled

	      if (!isEnabled) return children;
	      /*
	       * Div
	       * ------------------------------
	       * blocks scrolling on non-body elements behind the menu
	        * NodeResolver
	       * ------------------------------
	       * we need a reference to the scrollable element to "unlock" scroll on
	       * mobile devices
	        * ScrollLock
	       * ------------------------------
	       * actually does the scroll locking
	       */

	      return React__default.createElement("div", null, React__default.createElement("div", {
	        onClick: this.blurSelectInput,
	        className:
	        /*#__PURE__*/

	        /*#__PURE__*/
	        css({
	          position: 'fixed',
	          left: 0,
	          bottom: 0,
	          right: 0,
	          top: 0
	        })
	      }), React__default.createElement(NodeResolver, {
	        innerRef: this.getScrollTarget
	      }, children), touchScrollTarget ? React__default.createElement(ScrollLock, {
	        touchScrollTarget: touchScrollTarget
	      }) : null);
	    }
	  }]);

	  return ScrollBlock;
	}(React.PureComponent);

	var ScrollCaptor =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(ScrollCaptor, _Component);

	  function ScrollCaptor() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, ScrollCaptor);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollCaptor)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isBottom", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isTop", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollTarget", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "touchStart", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cancelScroll", function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleEventDelta", function (event, delta) {
	      var _this$props = _this.props,
	          onBottomArrive = _this$props.onBottomArrive,
	          onBottomLeave = _this$props.onBottomLeave,
	          onTopArrive = _this$props.onTopArrive,
	          onTopLeave = _this$props.onTopLeave;
	      var _this$scrollTarget = _this.scrollTarget,
	          scrollTop = _this$scrollTarget.scrollTop,
	          scrollHeight = _this$scrollTarget.scrollHeight,
	          clientHeight = _this$scrollTarget.clientHeight;
	      var target = _this.scrollTarget;
	      var isDeltaPositive = delta > 0;
	      var availableScroll = scrollHeight - clientHeight - scrollTop;
	      var shouldCancelScroll = false; // reset bottom/top flags

	      if (availableScroll > delta && _this.isBottom) {
	        if (onBottomLeave) onBottomLeave(event);
	        _this.isBottom = false;
	      }

	      if (isDeltaPositive && _this.isTop) {
	        if (onTopLeave) onTopLeave(event);
	        _this.isTop = false;
	      } // bottom limit


	      if (isDeltaPositive && delta > availableScroll) {
	        if (onBottomArrive && !_this.isBottom) {
	          onBottomArrive(event);
	        }

	        target.scrollTop = scrollHeight;
	        shouldCancelScroll = true;
	        _this.isBottom = true; // top limit
	      } else if (!isDeltaPositive && -delta > scrollTop) {
	        if (onTopArrive && !_this.isTop) {
	          onTopArrive(event);
	        }

	        target.scrollTop = 0;
	        shouldCancelScroll = true;
	        _this.isTop = true;
	      } // cancel scroll


	      if (shouldCancelScroll) {
	        _this.cancelScroll(event);
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onWheel", function (event) {
	      _this.handleEventDelta(event, event.deltaY);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchStart", function (event) {
	      // set touch start so we can calculate touchmove delta
	      _this.touchStart = event.changedTouches[0].clientY;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchMove", function (event) {
	      var deltaY = _this.touchStart - event.changedTouches[0].clientY;

	      _this.handleEventDelta(event, deltaY);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getScrollTarget", function (ref) {
	      _this.scrollTarget = ref;
	    });

	    return _this;
	  }

	  _createClass(ScrollCaptor, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.startListening(this.scrollTarget);
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.stopListening(this.scrollTarget);
	    }
	  }, {
	    key: "startListening",
	    value: function startListening(el) {
	      // bail early if no scroll available
	      if (!el) return;
	      if (el.scrollHeight <= el.clientHeight) return; // all the if statements are to appease Flow 😢

	      if (typeof el.addEventListener === 'function') {
	        el.addEventListener('wheel', this.onWheel, false);
	      }

	      if (typeof el.addEventListener === 'function') {
	        el.addEventListener('touchstart', this.onTouchStart, false);
	      }

	      if (typeof el.addEventListener === 'function') {
	        el.addEventListener('touchmove', this.onTouchMove, false);
	      }
	    }
	  }, {
	    key: "stopListening",
	    value: function stopListening(el) {
	      // bail early if no scroll available
	      if (el.scrollHeight <= el.clientHeight) return; // all the if statements are to appease Flow 😢

	      if (typeof el.removeEventListener === 'function') {
	        el.removeEventListener('wheel', this.onWheel, false);
	      }

	      if (typeof el.removeEventListener === 'function') {
	        el.removeEventListener('touchstart', this.onTouchStart, false);
	      }

	      if (typeof el.removeEventListener === 'function') {
	        el.removeEventListener('touchmove', this.onTouchMove, false);
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return React__default.createElement(NodeResolver, {
	        innerRef: this.getScrollTarget
	      }, this.props.children);
	    }
	  }]);

	  return ScrollCaptor;
	}(React.Component);

	var ScrollCaptorSwitch =
	/*#__PURE__*/
	function (_Component2) {
	  _inherits(ScrollCaptorSwitch, _Component2);

	  function ScrollCaptorSwitch() {
	    _classCallCheck(this, ScrollCaptorSwitch);

	    return _possibleConstructorReturn(this, _getPrototypeOf(ScrollCaptorSwitch).apply(this, arguments));
	  }

	  _createClass(ScrollCaptorSwitch, [{
	    key: "render",
	    value: function render() {
	      var _this$props2 = this.props,
	          isEnabled = _this$props2.isEnabled,
	          props = _objectWithoutProperties(_this$props2, ["isEnabled"]);

	      return isEnabled ? React__default.createElement(ScrollCaptor, props) : this.props.children;
	    }
	  }]);

	  return ScrollCaptorSwitch;
	}(React.Component);

	_defineProperty(ScrollCaptorSwitch, "defaultProps", {
	  isEnabled: true
	});

	var instructionsAriaMessage = function instructionsAriaMessage(event) {
	  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var isSearchable = context.isSearchable,
	      isMulti = context.isMulti,
	      label = context.label,
	      isDisabled = context.isDisabled;

	  switch (event) {
	    case 'menu':
	      return "Use Up and Down to choose options".concat(isDisabled ? '' : ', press Enter to select the currently focused option', ", press Escape to exit the menu, press Tab to select the option and exit the menu.");

	    case 'input':
	      return "".concat(label ? label : 'Select', " is focused ").concat(isSearchable ? ',type to refine list' : '', ", press Down to open the menu, ").concat(isMulti ? ' press left to focus selected values' : '');

	    case 'value':
	      return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
	  }
	};
	var valueEventAriaMessage = function valueEventAriaMessage(event, context) {
	  var value = context.value,
	      isDisabled = context.isDisabled;
	  if (!value) return;

	  switch (event) {
	    case 'deselect-option':
	    case 'pop-value':
	    case 'remove-value':
	      return "option ".concat(value, ", deselected.");

	    case 'select-option':
	      return isDisabled ? "option ".concat(value, " is disabled. Select another option.") : "option ".concat(value, ", selected.");
	  }
	};
	var valueFocusAriaMessage = function valueFocusAriaMessage(_ref) {
	  var focusedValue = _ref.focusedValue,
	      getOptionLabel = _ref.getOptionLabel,
	      selectValue = _ref.selectValue;
	  return "value ".concat(getOptionLabel(focusedValue), " focused, ").concat(selectValue.indexOf(focusedValue) + 1, " of ").concat(selectValue.length, ".");
	};
	var optionFocusAriaMessage = function optionFocusAriaMessage(_ref2) {
	  var focusedOption = _ref2.focusedOption,
	      getOptionLabel = _ref2.getOptionLabel,
	      options = _ref2.options;
	  return "option ".concat(getOptionLabel(focusedOption), " focused").concat(focusedOption.isDisabled ? ' disabled' : '', ", ").concat(options.indexOf(focusedOption) + 1, " of ").concat(options.length, ".");
	};
	var resultsAriaMessage = function resultsAriaMessage(_ref3) {
	  var inputValue = _ref3.inputValue,
	      screenReaderMessage = _ref3.screenReaderMessage;
	  return "".concat(screenReaderMessage).concat(inputValue ? ' for search term ' + inputValue : '', ".");
	};

	var formatGroupLabel = function formatGroupLabel(group) {
	  return group.label;
	};
	var getOptionLabel = function getOptionLabel(option) {
	  return option.label;
	};
	var getOptionValue = function getOptionValue(option) {
	  return option.value;
	};
	var isOptionDisabled = function isOptionDisabled(option) {
	  return !!option.isDisabled;
	};

	var containerCSS = function containerCSS(_ref) {
	  var isDisabled = _ref.isDisabled,
	      isRtl = _ref.isRtl;
	  return {
	    label: 'container',
	    direction: isRtl ? 'rtl' : null,
	    pointerEvents: isDisabled ? 'none' : null,
	    // cancel mouse events when disabled
	    position: 'relative'
	  };
	};
	var SelectContainer = function SelectContainer(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps,
	      isDisabled = props.isDisabled,
	      isRtl = props.isRtl;
	  return React__default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('container', props)), {
	      '--is-disabled': isDisabled,
	      '--is-rtl': isRtl
	    }, className)
	  }, innerProps), children);
	}; // ==============================
	// Value Container
	// ==============================

	var valueContainerCSS = function valueContainerCSS(_ref2) {
	  var spacing = _ref2.theme.spacing;
	  return {
	    alignItems: 'center',
	    display: 'flex',
	    flex: 1,
	    flexWrap: 'wrap',
	    padding: "".concat(spacing.baseUnit / 2, "px ").concat(spacing.baseUnit * 2, "px"),
	    WebkitOverflowScrolling: 'touch',
	    position: 'relative',
	    overflow: 'hidden'
	  };
	};
	var ValueContainer =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(ValueContainer, _Component);

	  function ValueContainer() {
	    _classCallCheck(this, ValueContainer);

	    return _possibleConstructorReturn(this, _getPrototypeOf(ValueContainer).apply(this, arguments));
	  }

	  _createClass(ValueContainer, [{
	    key: "render",
	    value: function render() {
	      var _this$props = this.props,
	          children = _this$props.children,
	          className = _this$props.className,
	          cx = _this$props.cx,
	          isMulti = _this$props.isMulti,
	          getStyles = _this$props.getStyles,
	          hasValue = _this$props.hasValue;
	      return React__default.createElement("div", {
	        className: cx(
	        /*#__PURE__*/
	        css(getStyles('valueContainer', this.props)), {
	          'value-container': true,
	          'value-container--is-multi': isMulti,
	          'value-container--has-value': hasValue
	        }, className)
	      }, children);
	    }
	  }]);

	  return ValueContainer;
	}(React.Component); // ==============================
	// Indicator Container
	// ==============================

	var indicatorsContainerCSS = function indicatorsContainerCSS() {
	  return {
	    alignItems: 'center',
	    alignSelf: 'stretch',
	    display: 'flex',
	    flexShrink: 0
	  };
	};
	var IndicatorsContainer = function IndicatorsContainer(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles;
	  return React__default.createElement("div", {
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('indicatorsContainer', props)), {
	      'indicators': true
	    }, className)
	  }, children);
	};

	// ==============================
	// Dropdown & Clear Icons
	// ==============================
	var Svg = function Svg(_ref) {
	  var size = _ref.size,
	      props = _objectWithoutProperties(_ref, ["size"]);

	  return React__default.createElement("svg", _extends({
	    height: size,
	    width: size,
	    viewBox: "0 0 20 20",
	    "aria-hidden": "true",
	    focusable: "false",
	    className:
	    /*#__PURE__*/

	    /*#__PURE__*/
	    css({
	      display: 'inline-block',
	      fill: 'currentColor',
	      lineHeight: 1,
	      stroke: 'currentColor',
	      strokeWidth: 0
	    })
	  }, props));
	};

	var CrossIcon = function CrossIcon(props) {
	  return React__default.createElement(Svg, _extends({
	    size: 20
	  }, props), React__default.createElement("path", {
	    d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
	  }));
	};
	var DownChevron = function DownChevron(props) {
	  return React__default.createElement(Svg, _extends({
	    size: 20
	  }, props), React__default.createElement("path", {
	    d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
	  }));
	}; // ==============================
	// Dropdown & Clear Buttons
	// ==============================

	var baseCSS = function baseCSS(_ref2) {
	  var isFocused = _ref2.isFocused,
	      _ref2$theme = _ref2.theme,
	      baseUnit = _ref2$theme.spacing.baseUnit,
	      colors = _ref2$theme.colors;
	  return {
	    label: 'indicatorContainer',
	    color: isFocused ? colors.neutral60 : colors.neutral20,
	    display: 'flex',
	    padding: baseUnit * 2,
	    transition: 'color 150ms',
	    ':hover': {
	      color: isFocused ? colors.neutral80 : colors.neutral40
	    }
	  };
	};

	var dropdownIndicatorCSS = baseCSS;
	var DropdownIndicator = function DropdownIndicator(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return React__default.createElement("div", _extends({}, innerProps, {
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('dropdownIndicator', props)), {
	      'indicator': true,
	      'dropdown-indicator': true
	    }, className)
	  }), children || React__default.createElement(DownChevron, null));
	};
	var clearIndicatorCSS = baseCSS;
	var ClearIndicator = function ClearIndicator(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return React__default.createElement("div", _extends({}, innerProps, {
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('clearIndicator', props)), {
	      'indicator': true,
	      'clear-indicator': true
	    }, className)
	  }), children || React__default.createElement(CrossIcon, null));
	}; // ==============================
	// Separator
	// ==============================

	var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref3) {
	  var isDisabled = _ref3.isDisabled,
	      _ref3$theme = _ref3.theme,
	      baseUnit = _ref3$theme.spacing.baseUnit,
	      colors = _ref3$theme.colors;
	  return {
	    label: 'indicatorSeparator',
	    alignSelf: 'stretch',
	    backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
	    marginBottom: baseUnit * 2,
	    marginTop: baseUnit * 2,
	    width: 1
	  };
	};
	var IndicatorSeparator = function IndicatorSeparator(props) {
	  var className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return React__default.createElement("span", _extends({}, innerProps, {
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('indicatorSeparator', props)), {
	      'indicator-separator': true
	    }, className)
	  }));
	}; // ==============================
	// Loading
	// ==============================

	var keyframesName = 'react-select-loading-indicator';
	var keyframesInjected = false;
	var loadingIndicatorCSS = function loadingIndicatorCSS(_ref4) {
	  var isFocused = _ref4.isFocused,
	      size = _ref4.size,
	      _ref4$theme = _ref4.theme,
	      colors = _ref4$theme.colors,
	      baseUnit = _ref4$theme.spacing.baseUnit;
	  return {
	    label: 'loadingIndicator',
	    color: isFocused ? colors.neutral60 : colors.neutral20,
	    display: 'flex',
	    padding: baseUnit * 2,
	    transition: 'color 150ms',
	    alignSelf: 'center',
	    fontSize: size,
	    lineHeight: 1,
	    marginRight: size,
	    textAlign: 'center',
	    verticalAlign: 'middle'
	  };
	};

	var LoadingDot = function LoadingDot(_ref5) {
	  var color = _ref5.color,
	      delay = _ref5.delay,
	      offset = _ref5.offset;
	  return React__default.createElement("span", {
	    className:
	    /*#__PURE__*/

	    /*#__PURE__*/
	    css({
	      animationDuration: '1s',
	      animationDelay: "".concat(delay, "ms"),
	      animationIterationCount: 'infinite',
	      animationName: keyframesName,
	      animationTimingFunction: 'ease-in-out',
	      backgroundColor: color,
	      borderRadius: '1em',
	      display: 'inline-block',
	      marginLeft: offset ? '1em' : null,
	      height: '1em',
	      verticalAlign: 'top',
	      width: '1em'
	    })
	  });
	};

	var LoadingIndicator = function LoadingIndicator(props) {
	  var className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps,
	      isFocused = props.isFocused,
	      isRtl = props.isRtl,
	      colors = props.theme.colors;
	  var color = isFocused ? colors.neutral80 : colors.neutral20;

	  if (!keyframesInjected) {
	    // eslint-disable-next-line no-unused-expressions
	    injectGlobal("@keyframes ", keyframesName, "{0%,80%,100%{opacity:0;}40%{opacity:1;}};");
	    keyframesInjected = true;
	  }

	  return React__default.createElement("div", _extends({}, innerProps, {
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('loadingIndicator', props)), {
	      'indicator': true,
	      'loading-indicator': true
	    }, className)
	  }), React__default.createElement(LoadingDot, {
	    color: color,
	    delay: 0,
	    offset: isRtl
	  }), React__default.createElement(LoadingDot, {
	    color: color,
	    delay: 160,
	    offset: true
	  }), React__default.createElement(LoadingDot, {
	    color: color,
	    delay: 320,
	    offset: !isRtl
	  }));
	};
	LoadingIndicator.defaultProps = {
	  size: 4
	};

	var css$1 = function css$$1(_ref) {
	  var isDisabled = _ref.isDisabled,
	      isFocused = _ref.isFocused,
	      _ref$theme = _ref.theme,
	      colors = _ref$theme.colors,
	      borderRadius = _ref$theme.borderRadius,
	      spacing = _ref$theme.spacing;
	  return {
	    label: 'control',
	    alignItems: 'center',
	    backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
	    borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
	    borderRadius: borderRadius,
	    borderStyle: 'solid',
	    borderWidth: 1,
	    boxShadow: isFocused ? "0 0 0 1px ".concat(colors.primary) : null,
	    cursor: 'default',
	    display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'space-between',
	    minHeight: spacing.controlHeight,
	    outline: '0 !important',
	    position: 'relative',
	    transition: 'all 100ms',
	    '&:hover': {
	      borderColor: isFocused ? colors.primary : colors.neutral30
	    }
	  };
	};

	var Control = function Control(props) {
	  var children = props.children,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      className = props.className,
	      isDisabled = props.isDisabled,
	      isFocused = props.isFocused,
	      innerRef = props.innerRef,
	      innerProps = props.innerProps,
	      menuIsOpen = props.menuIsOpen;
	  return React__default.createElement("div", _extends({
	    ref: innerRef,
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('control', props)), {
	      'control': true,
	      'control--is-disabled': isDisabled,
	      'control--is-focused': isFocused,
	      'control--menu-is-open': menuIsOpen
	    }, className)
	  }, innerProps), children);
	};

	var groupCSS = function groupCSS(_ref) {
	  var spacing = _ref.theme.spacing;
	  return {
	    paddingBottom: spacing.baseUnit * 2,
	    paddingTop: spacing.baseUnit * 2
	  };
	};

	var Group = function Group(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      Heading = props.Heading,
	      headingProps = props.headingProps,
	      label = props.label,
	      theme = props.theme,
	      selectProps = props.selectProps;
	  return React__default.createElement("div", {
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('group', props)), {
	      'group': true
	    }, className)
	  }, React__default.createElement(Heading, _extends({}, headingProps, {
	    selectProps: selectProps,
	    theme: theme,
	    getStyles: getStyles,
	    cx: cx
	  }), label), React__default.createElement("div", null, children));
	};

	var groupHeadingCSS = function groupHeadingCSS(_ref2) {
	  var spacing = _ref2.theme.spacing;
	  return {
	    label: 'group',
	    color: '#999',
	    cursor: 'default',
	    display: 'block',
	    fontSize: '75%',
	    fontWeight: '500',
	    marginBottom: '0.25em',
	    paddingLeft: spacing.baseUnit * 3,
	    paddingRight: spacing.baseUnit * 3,
	    textTransform: 'uppercase'
	  };
	};
	var GroupHeading = function GroupHeading(props) {
	  var className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      theme = props.theme,
	      selectProps = props.selectProps,
	      cleanProps = _objectWithoutProperties(props, ["className", "cx", "getStyles", "theme", "selectProps"]);

	  return React__default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('groupHeading', _objectSpread({
	      theme: theme
	    }, cleanProps))), {
	      'group-heading': true
	    }, className)
	  }, cleanProps));
	};

	var inputCSS = function inputCSS(_ref) {
	  var isDisabled = _ref.isDisabled,
	      _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      colors = _ref$theme.colors;
	  return {
	    margin: spacing.baseUnit / 2,
	    paddingBottom: spacing.baseUnit / 2,
	    paddingTop: spacing.baseUnit / 2,
	    visibility: isDisabled ? 'hidden' : 'visible',
	    color: colors.neutral80
	  };
	};

	var inputStyle = function inputStyle(isHidden) {
	  return {
	    label: 'input',
	    background: 0,
	    border: 0,
	    fontSize: 'inherit',
	    opacity: isHidden ? 0 : 1,
	    outline: 0,
	    padding: 0,
	    color: 'inherit'
	  };
	};

	var Input = function Input(_ref2) {
	  var className = _ref2.className,
	      cx = _ref2.cx,
	      getStyles = _ref2.getStyles,
	      innerRef = _ref2.innerRef,
	      isHidden = _ref2.isHidden,
	      isDisabled = _ref2.isDisabled,
	      theme = _ref2.theme,
	      selectProps = _ref2.selectProps,
	      props = _objectWithoutProperties(_ref2, ["className", "cx", "getStyles", "innerRef", "isHidden", "isDisabled", "theme", "selectProps"]);

	  return React__default.createElement("div", {
	    className:
	    /*#__PURE__*/

	    /*#__PURE__*/
	    css(getStyles('input', _objectSpread({
	      theme: theme
	    }, props)))
	  }, React__default.createElement(AutosizeInput, _extends({
	    className: cx(null, {
	      'input': true
	    }, className),
	    inputRef: innerRef,
	    inputStyle: inputStyle(isHidden),
	    disabled: isDisabled
	  }, props)));
	};

	var multiValueCSS = function multiValueCSS(_ref) {
	  var _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      borderRadius = _ref$theme.borderRadius,
	      colors = _ref$theme.colors;
	  return {
	    label: 'multiValue',
	    backgroundColor: colors.neutral10,
	    borderRadius: borderRadius / 2,
	    display: 'flex',
	    margin: spacing.baseUnit / 2,
	    minWidth: 0 // resolves flex/text-overflow bug

	  };
	};
	var multiValueLabelCSS = function multiValueLabelCSS(_ref2) {
	  var _ref2$theme = _ref2.theme,
	      borderRadius = _ref2$theme.borderRadius,
	      colors = _ref2$theme.colors,
	      cropWithEllipsis = _ref2.cropWithEllipsis;
	  return {
	    borderRadius: borderRadius / 2,
	    color: colors.neutral80,
	    fontSize: '85%',
	    overflow: 'hidden',
	    padding: 3,
	    paddingLeft: 6,
	    textOverflow: cropWithEllipsis ? 'ellipsis' : null,
	    whiteSpace: 'nowrap'
	  };
	};
	var multiValueRemoveCSS = function multiValueRemoveCSS(_ref3) {
	  var _ref3$theme = _ref3.theme,
	      spacing = _ref3$theme.spacing,
	      borderRadius = _ref3$theme.borderRadius,
	      colors = _ref3$theme.colors,
	      isFocused = _ref3.isFocused;
	  return {
	    alignItems: 'center',
	    borderRadius: borderRadius / 2,
	    backgroundColor: isFocused && colors.dangerLight,
	    display: 'flex',
	    paddingLeft: spacing.baseUnit,
	    paddingRight: spacing.baseUnit,
	    ':hover': {
	      backgroundColor: colors.dangerLight,
	      color: colors.danger
	    }
	  };
	};
	var MultiValueGeneric = function MultiValueGeneric(_ref4) {
	  var children = _ref4.children,
	      innerProps = _ref4.innerProps;
	  return React__default.createElement("div", innerProps, children);
	};
	var MultiValueContainer = MultiValueGeneric;
	var MultiValueLabel = MultiValueGeneric;
	var MultiValueRemove =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(MultiValueRemove, _Component);

	  function MultiValueRemove() {
	    _classCallCheck(this, MultiValueRemove);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MultiValueRemove).apply(this, arguments));
	  }

	  _createClass(MultiValueRemove, [{
	    key: "render",
	    value: function render() {
	      var _this$props = this.props,
	          children = _this$props.children,
	          innerProps = _this$props.innerProps;
	      return React__default.createElement("div", innerProps, children || React__default.createElement(CrossIcon, {
	        size: 14
	      }));
	    }
	  }]);

	  return MultiValueRemove;
	}(React.Component);

	var MultiValue =
	/*#__PURE__*/
	function (_Component2) {
	  _inherits(MultiValue, _Component2);

	  function MultiValue() {
	    _classCallCheck(this, MultiValue);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MultiValue).apply(this, arguments));
	  }

	  _createClass(MultiValue, [{
	    key: "render",
	    value: function render() {
	      var _this$props2 = this.props,
	          children = _this$props2.children,
	          className = _this$props2.className,
	          components = _this$props2.components,
	          cx = _this$props2.cx,
	          data = _this$props2.data,
	          getStyles = _this$props2.getStyles,
	          innerProps = _this$props2.innerProps,
	          isDisabled = _this$props2.isDisabled,
	          removeProps = _this$props2.removeProps,
	          selectProps = _this$props2.selectProps;
	      var Container = components.Container,
	          Label = components.Label,
	          Remove = components.Remove;

	      var containerInnerProps = _objectSpread({
	        className: cx(
	        /*#__PURE__*/
	        css(getStyles('multiValue', this.props)), {
	          'multi-value': true,
	          'multi-value--is-disabled': isDisabled
	        }, className)
	      }, innerProps);

	      var labelInnerProps = {
	        className: cx(
	        /*#__PURE__*/
	        css(getStyles('multiValueLabel', this.props)), {
	          'multi-value__label': true
	        }, className)
	      };

	      var removeInnerProps = _objectSpread({
	        className: cx(
	        /*#__PURE__*/
	        css(getStyles('multiValueRemove', this.props)), {
	          'multi-value__remove': true
	        }, className)
	      }, removeProps);

	      return React__default.createElement(Container, {
	        data: data,
	        innerProps: containerInnerProps,
	        selectProps: selectProps
	      }, React__default.createElement(Label, {
	        data: data,
	        innerProps: labelInnerProps,
	        selectProps: selectProps
	      }, children), React__default.createElement(Remove, {
	        data: data,
	        innerProps: removeInnerProps,
	        selectProps: selectProps
	      }));
	    }
	  }]);

	  return MultiValue;
	}(React.Component);

	_defineProperty(MultiValue, "defaultProps", {
	  cropWithEllipsis: true
	});

	var optionCSS = function optionCSS(_ref) {
	  var isDisabled = _ref.isDisabled,
	      isFocused = _ref.isFocused,
	      isSelected = _ref.isSelected,
	      _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      colors = _ref$theme.colors;
	  return {
	    label: 'option',
	    backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
	    color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
	    cursor: 'default',
	    display: 'block',
	    fontSize: 'inherit',
	    padding: "".concat(spacing.baseUnit * 2, "px ").concat(spacing.baseUnit * 3, "px"),
	    width: '100%',
	    userSelect: 'none',
	    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
	    // provide some affordance on touch devices
	    ':active': {
	      backgroundColor: !isDisabled && (isSelected ? colors.primary : colors.primary50)
	    }
	  };
	};

	var Option = function Option(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      isDisabled = props.isDisabled,
	      isFocused = props.isFocused,
	      isSelected = props.isSelected,
	      innerRef = props.innerRef,
	      innerProps = props.innerProps;
	  return React__default.createElement("div", _extends({
	    ref: innerRef,
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('option', props)), {
	      'option': true,
	      'option--is-disabled': isDisabled,
	      'option--is-focused': isFocused,
	      'option--is-selected': isSelected
	    }, className)
	  }, innerProps), children);
	};

	var placeholderCSS = function placeholderCSS(_ref) {
	  var _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      colors = _ref$theme.colors;
	  return {
	    label: 'placeholder',
	    color: colors.neutral50,
	    marginLeft: spacing.baseUnit / 2,
	    marginRight: spacing.baseUnit / 2,
	    position: 'absolute',
	    top: '50%',
	    transform: 'translateY(-50%)'
	  };
	};

	var Placeholder = function Placeholder(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      innerProps = props.innerProps;
	  return React__default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('placeholder', props)), {
	      'placeholder': true
	    }, className)
	  }, innerProps), children);
	};

	var css$2 = function css$$1(_ref) {
	  var isDisabled = _ref.isDisabled,
	      _ref$theme = _ref.theme,
	      spacing = _ref$theme.spacing,
	      colors = _ref$theme.colors;
	  return {
	    label: 'singleValue',
	    color: isDisabled ? colors.neutral40 : colors.neutral80,
	    marginLeft: spacing.baseUnit / 2,
	    marginRight: spacing.baseUnit / 2,
	    maxWidth: "calc(100% - ".concat(spacing.baseUnit * 2, "px)"),
	    overflow: 'hidden',
	    position: 'absolute',
	    textOverflow: 'ellipsis',
	    whiteSpace: 'nowrap',
	    top: '50%',
	    transform: 'translateY(-50%)'
	  };
	};

	var SingleValue = function SingleValue(props) {
	  var children = props.children,
	      className = props.className,
	      cx = props.cx,
	      getStyles = props.getStyles,
	      isDisabled = props.isDisabled,
	      innerProps = props.innerProps;
	  return React__default.createElement("div", _extends({
	    className: cx(
	    /*#__PURE__*/
	    css(getStyles('singleValue', props)), {
	      'single-value': true,
	      'single-value--is-disabled': isDisabled
	    }, className)
	  }, innerProps), children);
	};

	var components = {
	  ClearIndicator: ClearIndicator,
	  Control: Control,
	  DropdownIndicator: DropdownIndicator,
	  DownChevron: DownChevron,
	  CrossIcon: CrossIcon,
	  Group: Group,
	  GroupHeading: GroupHeading,
	  IndicatorsContainer: IndicatorsContainer,
	  IndicatorSeparator: IndicatorSeparator,
	  Input: Input,
	  LoadingIndicator: LoadingIndicator,
	  Menu: Menu,
	  MenuList: MenuList,
	  MenuPortal: MenuPortal,
	  LoadingMessage: LoadingMessage,
	  NoOptionsMessage: NoOptionsMessage,
	  MultiValue: MultiValue,
	  MultiValueContainer: MultiValueContainer,
	  MultiValueLabel: MultiValueLabel,
	  MultiValueRemove: MultiValueRemove,
	  Option: Option,
	  Placeholder: Placeholder,
	  SelectContainer: SelectContainer,
	  SingleValue: SingleValue,
	  ValueContainer: ValueContainer
	};
	var defaultComponents = function defaultComponents(props) {
	  return _objectSpread({}, components, props.components);
	};

	var defaultStyles = {
	  clearIndicator: clearIndicatorCSS,
	  container: containerCSS,
	  control: css$1,
	  dropdownIndicator: dropdownIndicatorCSS,
	  group: groupCSS,
	  groupHeading: groupHeadingCSS,
	  indicatorsContainer: indicatorsContainerCSS,
	  indicatorSeparator: indicatorSeparatorCSS,
	  input: inputCSS,
	  loadingIndicator: loadingIndicatorCSS,
	  loadingMessage: loadingMessageCSS,
	  menu: menuCSS,
	  menuList: menuListCSS,
	  menuPortal: menuPortalCSS,
	  multiValue: multiValueCSS,
	  multiValueLabel: multiValueLabelCSS,
	  multiValueRemove: multiValueRemoveCSS,
	  noOptionsMessage: noOptionsMessageCSS,
	  option: optionCSS,
	  placeholder: placeholderCSS,
	  singleValue: css$2,
	  valueContainer: valueContainerCSS
	}; // Merge Utility

	var colors = {
	  primary: '#2684FF',
	  primary75: '#4C9AFF',
	  primary50: '#B2D4FF',
	  primary25: '#DEEBFF',
	  danger: '#DE350B',
	  dangerLight: '#FFBDAD',
	  neutral0: 'hsl(0, 0%, 100%)',
	  neutral5: 'hsl(0, 0%, 95%)',
	  neutral10: 'hsl(0, 0%, 90%)',
	  neutral20: 'hsl(0, 0%, 80%)',
	  neutral30: 'hsl(0, 0%, 70%)',
	  neutral40: 'hsl(0, 0%, 60%)',
	  neutral50: 'hsl(0, 0%, 50%)',
	  neutral60: 'hsl(0, 0%, 40%)',
	  neutral70: 'hsl(0, 0%, 30%)',
	  neutral80: 'hsl(0, 0%, 20%)',
	  neutral90: 'hsl(0, 0%, 10%)'
	};
	var borderRadius = 4;
	var baseUnit = 4;
	/* Used to calculate consistent margin/padding on elements */

	var controlHeight = 38;
	/* The minimum height of the control */

	var menuGutter = baseUnit * 2;
	/* The amount of space between the control and menu */

	var spacing = {
	  baseUnit: baseUnit,
	  controlHeight: controlHeight,
	  menuGutter: menuGutter
	};
	var defaultTheme = {
	  borderRadius: borderRadius,
	  colors: colors,
	  spacing: spacing
	};

	var defaultProps = {
	  backspaceRemovesValue: true,
	  blurInputOnSelect: isTouchCapable(),
	  captureMenuScroll: !isTouchCapable(),
	  closeMenuOnSelect: true,
	  closeMenuOnScroll: false,
	  components: {},
	  controlShouldRenderValue: true,
	  escapeClearsValue: false,
	  filterOption: createFilter(),
	  formatGroupLabel: formatGroupLabel,
	  getOptionLabel: getOptionLabel,
	  getOptionValue: getOptionValue,
	  isDisabled: false,
	  isLoading: false,
	  isMulti: false,
	  isRtl: false,
	  isSearchable: true,
	  isOptionDisabled: isOptionDisabled,
	  loadingMessage: function loadingMessage() {
	    return 'Loading...';
	  },
	  maxMenuHeight: 300,
	  minMenuHeight: 140,
	  menuIsOpen: false,
	  menuPlacement: 'bottom',
	  menuPosition: 'absolute',
	  menuShouldBlockScroll: false,
	  menuShouldScrollIntoView: !isMobileDevice(),
	  noOptionsMessage: function noOptionsMessage() {
	    return 'No options';
	  },
	  openMenuOnFocus: false,
	  openMenuOnClick: true,
	  options: [],
	  pageSize: 5,
	  placeholder: 'Select...',
	  screenReaderStatus: function screenReaderStatus(_ref) {
	    var count = _ref.count;
	    return "".concat(count, " result").concat(count !== 1 ? 's' : '', " available");
	  },
	  styles: {},
	  tabIndex: '0',
	  tabSelectsValue: true
	};
	var instanceId = 1;

	var Select =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(Select, _Component);

	  // Misc. Instance Properties
	  // ------------------------------
	  // TODO
	  // Refs
	  // ------------------------------
	  // Lifecycle
	  // ------------------------------
	  function Select(_props) {
	    var _this;

	    _classCallCheck(this, Select);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, _props));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
	      ariaLiveSelection: '',
	      ariaLiveContext: '',
	      focusedOption: null,
	      focusedValue: null,
	      inputIsHidden: false,
	      isFocused: false,
	      menuOptions: {
	        render: [],
	        focusable: []
	      },
	      selectValue: []
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blockOptionHover", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isComposing", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearFocusValueOnUpdate", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "commonProps", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "components", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hasGroups", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialTouchX", 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialTouchY", 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputIsHiddenAfterUpdate", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "instancePrefix", '');

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "openAfterFocus", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollToFocusedOptionOnUpdate", false);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "userIsDragging", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "controlRef", null);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getControlRef", function (ref) {
	      _this.controlRef = ref;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "focusedOptionRef", null);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getFocusedOptionRef", function (ref) {
	      _this.focusedOptionRef = ref;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "menuListRef", null);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMenuListRef", function (ref) {
	      _this.menuListRef = ref;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputRef", null);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getInputRef", function (ref) {
	      _this.inputRef = ref;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cacheComponents", function (components$$1) {
	      _this.components = defaultComponents({
	        components: components$$1
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "focus", _this.focusInput);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blur", _this.blurInput);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (newValue, actionMeta) {
	      var _this$props = _this.props,
	          onChange = _this$props.onChange,
	          name = _this$props.name;
	      onChange(newValue, _objectSpread({}, actionMeta, {
	        name: name
	      }));
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setValue", function (newValue) {
	      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set-value';
	      var option = arguments.length > 2 ? arguments[2] : undefined;
	      var _this$props2 = _this.props,
	          closeMenuOnSelect = _this$props2.closeMenuOnSelect,
	          isMulti = _this$props2.isMulti;

	      _this.onInputChange('', {
	        action: 'set-value'
	      });

	      if (closeMenuOnSelect) {
	        _this.inputIsHiddenAfterUpdate = !isMulti;

	        _this.onMenuClose();
	      } // when the select value should change, we should reset focusedValue


	      _this.clearFocusValueOnUpdate = true;

	      _this.onChange(newValue, {
	        action: action,
	        option: option
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectOption", function (newValue) {
	      var _this$props3 = _this.props,
	          blurInputOnSelect = _this$props3.blurInputOnSelect,
	          isMulti = _this$props3.isMulti;
	      var selectValue = _this.state.selectValue;

	      if (isMulti) {
	        if (_this.isOptionSelected(newValue, selectValue)) {
	          var candidate = _this.getOptionValue(newValue);

	          _this.setValue(selectValue.filter(function (i) {
	            return _this.getOptionValue(i) !== candidate;
	          }), 'deselect-option', newValue);

	          _this.announceAriaLiveSelection({
	            event: 'deselect-option',
	            context: {
	              value: _this.getOptionLabel(newValue)
	            }
	          });
	        } else {
	          if (!_this.isOptionDisabled(newValue, selectValue)) {
	            _this.setValue([].concat(_toConsumableArray(selectValue), [newValue]), 'select-option', newValue);

	            _this.announceAriaLiveSelection({
	              event: 'select-option',
	              context: {
	                value: _this.getOptionLabel(newValue)
	              }
	            });
	          } else {
	            // announce that option is disabled
	            _this.announceAriaLiveSelection({
	              event: 'select-option',
	              context: {
	                value: _this.getOptionLabel(newValue),
	                isDisabled: true
	              }
	            });
	          }
	        }
	      } else {
	        if (!_this.isOptionDisabled(newValue, selectValue)) {
	          _this.setValue(newValue, 'select-option');

	          _this.announceAriaLiveSelection({
	            event: 'select-option',
	            context: {
	              value: _this.getOptionLabel(newValue)
	            }
	          });
	        } else {
	          // announce that option is disabled
	          _this.announceAriaLiveSelection({
	            event: 'select-option',
	            context: {
	              value: _this.getOptionLabel(newValue),
	              isDisabled: true
	            }
	          });
	        }
	      }

	      if (blurInputOnSelect) {
	        _this.blurInput();
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "removeValue", function (removedValue) {
	      var selectValue = _this.state.selectValue;

	      var candidate = _this.getOptionValue(removedValue);

	      _this.onChange(selectValue.filter(function (i) {
	        return _this.getOptionValue(i) !== candidate;
	      }), {
	        action: 'remove-value',
	        removedValue: removedValue
	      });

	      _this.announceAriaLiveSelection({
	        event: 'remove-value',
	        context: {
	          value: removedValue ? _this.getOptionLabel(removedValue) : ''
	        }
	      });

	      _this.focusInput();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearValue", function () {
	      var isMulti = _this.props.isMulti;

	      _this.onChange(isMulti ? [] : null, {
	        action: 'clear'
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "popValue", function () {
	      var selectValue = _this.state.selectValue;
	      var lastSelectedValue = selectValue[selectValue.length - 1];

	      _this.announceAriaLiveSelection({
	        event: 'pop-value',
	        context: {
	          value: lastSelectedValue ? _this.getOptionLabel(lastSelectedValue) : ''
	        }
	      });

	      _this.onChange(selectValue.slice(0, selectValue.length - 1), {
	        action: 'pop-value',
	        removedValue: lastSelectedValue
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOptionLabel", function (data) {
	      return _this.props.getOptionLabel(data);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOptionValue", function (data) {
	      return _this.props.getOptionValue(data);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getStyles", function (key, props) {
	      var base = defaultStyles[key](props);
	      base.boxSizing = 'border-box';
	      var custom = _this.props.styles[key];
	      return custom ? custom(base, props) : base;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getElementId", function (element) {
	      return "".concat(_this.instancePrefix, "-").concat(element);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getActiveDescendentId", function () {
	      var menuIsOpen = _this.props.menuIsOpen;
	      var _this$state = _this.state,
	          menuOptions = _this$state.menuOptions,
	          focusedOption = _this$state.focusedOption;
	      if (!focusedOption || !menuIsOpen) return undefined;
	      var index = menuOptions.focusable.indexOf(focusedOption);
	      var option = menuOptions.render[index];
	      return option && option.key;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "announceAriaLiveSelection", function (_ref2) {
	      var event = _ref2.event,
	          context = _ref2.context;

	      _this.setState({
	        ariaLiveSelection: valueEventAriaMessage(event, context)
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "announceAriaLiveContext", function (_ref3) {
	      var event = _ref3.event,
	          context = _ref3.context;

	      _this.setState({
	        ariaLiveContext: instructionsAriaMessage(event, _objectSpread({}, context, {
	          label: _this.props['aria-label']
	        }))
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuMouseDown", function (event) {
	      if (event.button !== 0) {
	        return;
	      }

	      event.stopPropagation();
	      event.preventDefault();

	      _this.focusInput();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuMouseMove", function (event) {
	      _this.blockOptionHover = false;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onControlMouseDown", function (event) {
	      var openMenuOnClick = _this.props.openMenuOnClick;

	      if (!_this.state.isFocused) {
	        if (openMenuOnClick) {
	          _this.openAfterFocus = true;
	        }

	        _this.focusInput();
	      } else if (!_this.props.menuIsOpen) {
	        if (openMenuOnClick) {
	          _this.openMenu('first');
	        }
	      } else {
	        //$FlowFixMe
	        if (event.target.tagName !== 'INPUT') {
	          _this.onMenuClose();
	        }
	      } //$FlowFixMe


	      if (event.target.tagName !== 'INPUT') {
	        event.preventDefault();
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDropdownIndicatorMouseDown", function (event) {
	      // ignore mouse events that weren't triggered by the primary button
	      if (event && event.type === 'mousedown' && event.button !== 0) {
	        return;
	      }

	      if (_this.props.isDisabled) return;
	      var _this$props4 = _this.props,
	          isMulti = _this$props4.isMulti,
	          menuIsOpen = _this$props4.menuIsOpen;

	      _this.focusInput();

	      if (menuIsOpen) {
	        _this.inputIsHiddenAfterUpdate = !isMulti;

	        _this.onMenuClose();
	      } else {
	        _this.openMenu('first');
	      }

	      event.preventDefault();
	      event.stopPropagation();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClearIndicatorMouseDown", function (event) {
	      // ignore mouse events that weren't triggered by the primary button
	      if (event && event.type === 'mousedown' && event.button !== 0) {
	        return;
	      }

	      _this.clearValue();

	      event.stopPropagation();
	      _this.openAfterFocus = false;
	      setTimeout(function () {
	        return _this.focusInput();
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onScroll", function (event) {
	      if (typeof _this.props.closeMenuOnScroll === 'boolean') {
	        if (event.target instanceof HTMLElement && isDocumentElement(event.target)) {
	          _this.props.onMenuClose();
	        }
	      } else if (typeof _this.props.closeMenuOnScroll === 'function') {
	        if (_this.props.closeMenuOnScroll(event)) {
	          _this.props.onMenuClose();
	        }
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCompositionStart", function () {
	      _this.isComposing = true;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCompositionEnd", function () {
	      _this.isComposing = false;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchStart", function (_ref4) {
	      var touches = _ref4.touches;
	      var touch = touches.item(0);

	      if (!touch) {
	        return;
	      }

	      _this.initialTouchX = touch.clientX;
	      _this.initialTouchY = touch.clientY;
	      _this.userIsDragging = false;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchMove", function (_ref5) {
	      var touches = _ref5.touches;
	      var touch = touches.item(0);

	      if (!touch) {
	        return;
	      }

	      var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
	      var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
	      var moveThreshold = 5;
	      _this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchEnd", function (event) {
	      if (_this.userIsDragging) return; // close the menu if the user taps outside
	      // we're checking on event.target here instead of event.currentTarget, because we want to assert information
	      // on events on child elements, not the document (which we've attached this handler to).

	      if (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target)) {
	        _this.blurInput();
	      } // reset move vars


	      _this.initialTouchX = 0;
	      _this.initialTouchY = 0;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onControlTouchEnd", function (event) {
	      if (_this.userIsDragging) return;

	      _this.onControlMouseDown(event);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClearIndicatorTouchEnd", function (event) {
	      if (_this.userIsDragging) return;

	      _this.onClearIndicatorMouseDown(event);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDropdownIndicatorTouchEnd", function (event) {
	      if (_this.userIsDragging) return;

	      _this.onDropdownIndicatorMouseDown(event);
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function (event) {
	      var inputValue = event.currentTarget.value;
	      _this.inputIsHiddenAfterUpdate = false;

	      _this.onInputChange(inputValue, {
	        action: 'input-change'
	      });

	      _this.onMenuOpen();
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputFocus", function (event) {
	      var _this$props5 = _this.props,
	          isSearchable = _this$props5.isSearchable,
	          isMulti = _this$props5.isMulti;

	      if (_this.props.onFocus) {
	        _this.props.onFocus(event);
	      }

	      _this.inputIsHiddenAfterUpdate = false;

	      _this.announceAriaLiveContext({
	        event: 'input',
	        context: {
	          isSearchable: isSearchable,
	          isMulti: isMulti
	        }
	      });

	      _this.setState({
	        isFocused: true
	      });

	      if (_this.openAfterFocus || _this.props.openMenuOnFocus) {
	        _this.openMenu('first');
	      }

	      _this.openAfterFocus = false;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputBlur", function (event) {
	      if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
	        _this.inputRef.focus();

	        return;
	      }

	      if (_this.props.onBlur) {
	        _this.props.onBlur(event);
	      }

	      _this.onInputChange('', {
	        action: 'input-blur'
	      });

	      _this.onMenuClose();

	      _this.setState({
	        focusedValue: null,
	        isFocused: false
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onOptionHover", function (focusedOption) {
	      if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) {
	        return;
	      }

	      _this.setState({
	        focusedOption: focusedOption
	      });
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "shouldHideSelectedOptions", function () {
	      var _this$props6 = _this.props,
	          hideSelectedOptions = _this$props6.hideSelectedOptions,
	          isMulti = _this$props6.isMulti;
	      if (hideSelectedOptions === undefined) return isMulti;
	      return hideSelectedOptions;
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onKeyDown", function (event) {
	      var _this$props7 = _this.props,
	          isMulti = _this$props7.isMulti,
	          backspaceRemovesValue = _this$props7.backspaceRemovesValue,
	          escapeClearsValue = _this$props7.escapeClearsValue,
	          inputValue = _this$props7.inputValue,
	          isClearable = _this$props7.isClearable,
	          isDisabled = _this$props7.isDisabled,
	          menuIsOpen = _this$props7.menuIsOpen,
	          onKeyDown = _this$props7.onKeyDown,
	          tabSelectsValue = _this$props7.tabSelectsValue,
	          openMenuOnFocus = _this$props7.openMenuOnFocus;
	      var _this$state2 = _this.state,
	          focusedOption = _this$state2.focusedOption,
	          focusedValue = _this$state2.focusedValue,
	          selectValue = _this$state2.selectValue;
	      if (isDisabled) return;

	      if (typeof onKeyDown === 'function') {
	        onKeyDown(event);

	        if (event.defaultPrevented) {
	          return;
	        }
	      } // Block option hover events when the user has just pressed a key


	      _this.blockOptionHover = true;

	      switch (event.key) {
	        case 'ArrowLeft':
	          if (!isMulti || inputValue) return;

	          _this.focusValue('previous');

	          break;

	        case 'ArrowRight':
	          if (!isMulti || inputValue) return;

	          _this.focusValue('next');

	          break;

	        case 'Delete':
	        case 'Backspace':
	          if (inputValue) return;

	          if (focusedValue) {
	            _this.removeValue(focusedValue);
	          } else {
	            if (!backspaceRemovesValue) return;

	            if (isMulti) {
	              _this.popValue();
	            } else if (isClearable) {
	              _this.clearValue();
	            }
	          }

	          break;

	        case 'Tab':
	          if (_this.isComposing) return;

	          if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption || // don't capture the event if the menu opens on focus and the focused
	          // option is already selected; it breaks the flow of navigation
	          openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) {
	            return;
	          }

	          _this.selectOption(focusedOption);

	          break;

	        case 'Enter':
	          if (event.keyCode === 229) {
	            // ignore the keydown event from an Input Method Editor(IME)
	            // ref. https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
	            break;
	          }

	          if (menuIsOpen) {
	            if (!focusedOption) return;
	            if (_this.isComposing) return;

	            _this.selectOption(focusedOption);

	            break;
	          }

	          return;

	        case 'Escape':
	          if (menuIsOpen) {
	            _this.inputIsHiddenAfterUpdate = false;

	            _this.onInputChange('', {
	              action: 'menu-close'
	            });

	            _this.onMenuClose();
	          } else if (isClearable && escapeClearsValue) {
	            _this.clearValue();
	          }

	          break;

	        case ' ':
	          // space
	          if (inputValue) {
	            return;
	          }

	          if (!menuIsOpen) {
	            _this.openMenu('first');

	            break;
	          }

	          if (!focusedOption) return;

	          _this.selectOption(focusedOption);

	          break;

	        case 'ArrowUp':
	          if (menuIsOpen) {
	            _this.focusOption('up');
	          } else {
	            _this.openMenu('last');
	          }

	          break;

	        case 'ArrowDown':
	          if (menuIsOpen) {
	            _this.focusOption('down');
	          } else {
	            _this.openMenu('first');
	          }

	          break;

	        case 'PageUp':
	          if (!menuIsOpen) return;

	          _this.focusOption('pageup');

	          break;

	        case 'PageDown':
	          if (!menuIsOpen) return;

	          _this.focusOption('pagedown');

	          break;

	        case 'Home':
	          if (!menuIsOpen) return;

	          _this.focusOption('first');

	          break;

	        case 'End':
	          if (!menuIsOpen) return;

	          _this.focusOption('last');

	          break;

	        default:
	          return;
	      }

	      event.preventDefault();
	    });

	    var value = _props.value;
	    _this.cacheComponents = memoizeOne(_this.cacheComponents, exportedEqual).bind(_assertThisInitialized(_assertThisInitialized(_this)));

	    _this.cacheComponents(_props.components);

	    _this.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId);

	    var _selectValue = cleanValue(value);

	    var _menuOptions = _this.buildMenuOptions(_props, _selectValue);

	    _this.state.menuOptions = _menuOptions;
	    _this.state.selectValue = _selectValue;
	    return _this;
	  }

	  _createClass(Select, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.startListeningComposition();
	      this.startListeningToTouch();

	      if (this.props.closeMenuOnScroll && document && document.addEventListener) {
	        // Listen to all scroll events, and filter them out inside of 'onScroll'
	        document.addEventListener('scroll', this.onScroll, true);
	      }

	      if (this.props.autoFocus) {
	        this.focusInput();
	      }
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      var _this$props8 = this.props,
	          options = _this$props8.options,
	          value = _this$props8.value,
	          inputValue = _this$props8.inputValue; // re-cache custom components

	      this.cacheComponents(nextProps.components); // rebuild the menu options

	      if (nextProps.value !== value || nextProps.options !== options || nextProps.inputValue !== inputValue) {
	        var selectValue = cleanValue(nextProps.value);
	        var menuOptions = this.buildMenuOptions(nextProps, selectValue);
	        var focusedValue = this.getNextFocusedValue(selectValue);
	        var focusedOption = this.getNextFocusedOption(menuOptions.focusable);
	        this.setState({
	          menuOptions: menuOptions,
	          selectValue: selectValue,
	          focusedOption: focusedOption,
	          focusedValue: focusedValue
	        });
	      } // some updates should toggle the state of the input visibility


	      if (this.inputIsHiddenAfterUpdate != null) {
	        this.setState({
	          inputIsHidden: this.inputIsHiddenAfterUpdate
	        });
	        delete this.inputIsHiddenAfterUpdate;
	      }
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      var _this$props9 = this.props,
	          isDisabled = _this$props9.isDisabled,
	          menuIsOpen = _this$props9.menuIsOpen;
	      var isFocused = this.state.isFocused;

	      if ( // ensure focus is restored correctly when the control becomes enabled
	      isFocused && !isDisabled && prevProps.isDisabled || // ensure focus is on the Input when the menu opens
	      isFocused && menuIsOpen && !prevProps.menuIsOpen) {
	        this.focusInput();
	      } // scroll the focused option into view if necessary


	      if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
	        scrollIntoView(this.menuListRef, this.focusedOptionRef);
	      }

	      this.scrollToFocusedOptionOnUpdate = false;
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.stopListeningComposition();
	      this.stopListeningToTouch();
	      document.removeEventListener('scroll', this.onScroll, true);
	    }
	  }, {
	    key: "onMenuOpen",
	    // ==============================
	    // Consumer Handlers
	    // ==============================
	    value: function onMenuOpen() {
	      this.props.onMenuOpen();
	    }
	  }, {
	    key: "onMenuClose",
	    value: function onMenuClose() {
	      var _this$props10 = this.props,
	          isSearchable = _this$props10.isSearchable,
	          isMulti = _this$props10.isMulti;
	      this.announceAriaLiveContext({
	        event: 'input',
	        context: {
	          isSearchable: isSearchable,
	          isMulti: isMulti
	        }
	      });
	      this.onInputChange('', {
	        action: 'menu-close'
	      });
	      this.props.onMenuClose();
	    }
	  }, {
	    key: "onInputChange",
	    value: function onInputChange(newValue, actionMeta) {
	      this.props.onInputChange(newValue, actionMeta);
	    } // ==============================
	    // Methods
	    // ==============================

	  }, {
	    key: "focusInput",
	    value: function focusInput() {
	      if (!this.inputRef) return;
	      this.inputRef.focus();
	    }
	  }, {
	    key: "blurInput",
	    value: function blurInput() {
	      if (!this.inputRef) return;
	      this.inputRef.blur();
	    } // aliased for consumers

	  }, {
	    key: "openMenu",
	    value: function openMenu(focusOption) {
	      var _this$state3 = this.state,
	          menuOptions = _this$state3.menuOptions,
	          selectValue = _this$state3.selectValue,
	          isFocused = _this$state3.isFocused;
	      var isMulti = this.props.isMulti;
	      var openAtIndex = focusOption === 'first' ? 0 : menuOptions.focusable.length - 1;

	      if (!isMulti) {
	        var selectedIndex = menuOptions.focusable.indexOf(selectValue[0]);

	        if (selectedIndex > -1) {
	          openAtIndex = selectedIndex;
	        }
	      } // only scroll if the menu isn't already open


	      this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
	      this.inputIsHiddenAfterUpdate = false;
	      this.onMenuOpen();
	      this.setState({
	        focusedValue: null,
	        focusedOption: menuOptions.focusable[openAtIndex]
	      });
	      this.announceAriaLiveContext({
	        event: 'menu'
	      });
	    }
	  }, {
	    key: "focusValue",
	    value: function focusValue(direction) {
	      var _this$props11 = this.props,
	          isMulti = _this$props11.isMulti,
	          isSearchable = _this$props11.isSearchable;
	      var _this$state4 = this.state,
	          selectValue = _this$state4.selectValue,
	          focusedValue = _this$state4.focusedValue; // Only multiselects support value focusing

	      if (!isMulti) return;
	      this.setState({
	        focusedOption: null
	      });
	      var focusedIndex = selectValue.indexOf(focusedValue);

	      if (!focusedValue) {
	        focusedIndex = -1;
	        this.announceAriaLiveContext({
	          event: 'value'
	        });
	      }

	      var lastIndex = selectValue.length - 1;
	      var nextFocus = -1;
	      if (!selectValue.length) return;

	      switch (direction) {
	        case 'previous':
	          if (focusedIndex === 0) {
	            // don't cycle from the start to the end
	            nextFocus = 0;
	          } else if (focusedIndex === -1) {
	            // if nothing is focused, focus the last value first
	            nextFocus = lastIndex;
	          } else {
	            nextFocus = focusedIndex - 1;
	          }

	          break;

	        case 'next':
	          if (focusedIndex > -1 && focusedIndex < lastIndex) {
	            nextFocus = focusedIndex + 1;
	          }

	          break;
	      }

	      if (nextFocus === -1) {
	        this.announceAriaLiveContext({
	          event: 'input',
	          context: {
	            isSearchable: isSearchable,
	            isMulti: isMulti
	          }
	        });
	      }

	      this.setState({
	        inputIsHidden: nextFocus === -1 ? false : true,
	        focusedValue: selectValue[nextFocus]
	      });
	    }
	  }, {
	    key: "focusOption",
	    value: function focusOption() {
	      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'first';
	      var pageSize = this.props.pageSize;
	      var _this$state5 = this.state,
	          focusedOption = _this$state5.focusedOption,
	          menuOptions = _this$state5.menuOptions;
	      var options = menuOptions.focusable;
	      if (!options.length) return;
	      var nextFocus = 0; // handles 'first'

	      var focusedIndex = options.indexOf(focusedOption);

	      if (!focusedOption) {
	        focusedIndex = -1;
	        this.announceAriaLiveContext({
	          event: 'menu'
	        });
	      }

	      if (direction === 'up') {
	        nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
	      } else if (direction === 'down') {
	        nextFocus = (focusedIndex + 1) % options.length;
	      } else if (direction === 'pageup') {
	        nextFocus = focusedIndex - pageSize;
	        if (nextFocus < 0) nextFocus = 0;
	      } else if (direction === 'pagedown') {
	        nextFocus = focusedIndex + pageSize;
	        if (nextFocus > options.length - 1) nextFocus = options.length - 1;
	      } else if (direction === 'last') {
	        nextFocus = options.length - 1;
	      }

	      this.scrollToFocusedOptionOnUpdate = true;
	      this.setState({
	        focusedOption: options[nextFocus],
	        focusedValue: null
	      });
	      this.announceAriaLiveContext({
	        event: 'menu',
	        context: {
	          isDisabled: isOptionDisabled(options[nextFocus])
	        }
	      });
	    }
	  }, {
	    key: "getTheme",
	    // ==============================
	    // Getters
	    // ==============================
	    value: function getTheme() {
	      // Use the default theme if there are no customizations.
	      if (!this.props.theme) {
	        return defaultTheme;
	      } // If the theme prop is a function, assume the function
	      // knows how to merge the passed-in default theme with
	      // its own modifications.


	      if (typeof this.props.theme === 'function') {
	        return this.props.theme(defaultTheme);
	      } // Otherwise, if a plain theme object was passed in,
	      // overlay it with the default theme.


	      return _objectSpread({}, defaultTheme, this.props.theme);
	    }
	  }, {
	    key: "getCommonProps",
	    value: function getCommonProps() {
	      var clearValue = this.clearValue,
	          getStyles = this.getStyles,
	          setValue = this.setValue,
	          selectOption = this.selectOption,
	          props = this.props;
	      var classNamePrefix = props.classNamePrefix,
	          isMulti = props.isMulti,
	          isRtl = props.isRtl,
	          options = props.options;
	      var selectValue = this.state.selectValue;
	      var hasValue = this.hasValue();

	      var getValue = function getValue() {
	        return selectValue;
	      };

	      var cx = classNames.bind(null, classNamePrefix);
	      return {
	        cx: cx,
	        clearValue: clearValue,
	        getStyles: getStyles,
	        getValue: getValue,
	        hasValue: hasValue,
	        isMulti: isMulti,
	        isRtl: isRtl,
	        options: options,
	        selectOption: selectOption,
	        setValue: setValue,
	        selectProps: props,
	        theme: this.getTheme()
	      };
	    }
	  }, {
	    key: "getNextFocusedValue",
	    value: function getNextFocusedValue(nextSelectValue) {
	      if (this.clearFocusValueOnUpdate) {
	        this.clearFocusValueOnUpdate = false;
	        return null;
	      }

	      var _this$state6 = this.state,
	          focusedValue = _this$state6.focusedValue,
	          lastSelectValue = _this$state6.selectValue;
	      var lastFocusedIndex = lastSelectValue.indexOf(focusedValue);

	      if (lastFocusedIndex > -1) {
	        var nextFocusedIndex = nextSelectValue.indexOf(focusedValue);

	        if (nextFocusedIndex > -1) {
	          // the focused value is still in the selectValue, return it
	          return focusedValue;
	        } else if (lastFocusedIndex < nextSelectValue.length) {
	          // the focusedValue is not present in the next selectValue array by
	          // reference, so return the new value at the same index
	          return nextSelectValue[lastFocusedIndex];
	        }
	      }

	      return null;
	    }
	  }, {
	    key: "getNextFocusedOption",
	    value: function getNextFocusedOption(options) {
	      var lastFocusedOption = this.state.focusedOption;
	      return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
	    }
	  }, {
	    key: "hasValue",
	    value: function hasValue() {
	      var selectValue = this.state.selectValue;
	      return selectValue.length > 0;
	    }
	  }, {
	    key: "hasOptions",
	    value: function hasOptions() {
	      return !!this.state.menuOptions.render.length;
	    }
	  }, {
	    key: "countOptions",
	    value: function countOptions() {
	      return this.state.menuOptions.focusable.length;
	    }
	  }, {
	    key: "isClearable",
	    value: function isClearable() {
	      var _this$props12 = this.props,
	          isClearable = _this$props12.isClearable,
	          isMulti = _this$props12.isMulti; // single select, by default, IS NOT clearable
	      // multi select, by default, IS clearable

	      if (isClearable === undefined) return isMulti;
	      return isClearable;
	    }
	  }, {
	    key: "isOptionDisabled",
	    value: function isOptionDisabled$$1(option, selectValue) {
	      return typeof this.props.isOptionDisabled === 'function' ? this.props.isOptionDisabled(option, selectValue) : false;
	    }
	  }, {
	    key: "isOptionSelected",
	    value: function isOptionSelected(option, selectValue) {
	      var _this2 = this;

	      if (selectValue.indexOf(option) > -1) return true;

	      if (typeof this.props.isOptionSelected === 'function') {
	        return this.props.isOptionSelected(option, selectValue);
	      }

	      var candidate = this.getOptionValue(option);
	      return selectValue.some(function (i) {
	        return _this2.getOptionValue(i) === candidate;
	      });
	    }
	  }, {
	    key: "filterOption",
	    value: function filterOption(option, inputValue) {
	      return this.props.filterOption ? this.props.filterOption(option, inputValue) : true;
	    }
	  }, {
	    key: "formatOptionLabel",
	    value: function formatOptionLabel(data, context) {
	      if (typeof this.props.formatOptionLabel === 'function') {
	        var inputValue = this.props.inputValue;
	        var selectValue = this.state.selectValue;
	        return this.props.formatOptionLabel(data, {
	          context: context,
	          inputValue: inputValue,
	          selectValue: selectValue
	        });
	      } else {
	        return this.getOptionLabel(data);
	      }
	    }
	  }, {
	    key: "formatGroupLabel",
	    value: function formatGroupLabel$$1(data) {
	      return this.props.formatGroupLabel(data);
	    } // ==============================
	    // Mouse Handlers
	    // ==============================

	  }, {
	    key: "startListeningComposition",
	    // ==============================
	    // Composition Handlers
	    // ==============================
	    value: function startListeningComposition() {
	      if (document && document.addEventListener) {
	        document.addEventListener('compositionstart', this.onCompositionStart, false);
	        document.addEventListener('compositionend', this.onCompositionEnd, false);
	      }
	    }
	  }, {
	    key: "stopListeningComposition",
	    value: function stopListeningComposition() {
	      if (document && document.removeEventListener) {
	        document.removeEventListener('compositionstart', this.onCompositionStart);
	        document.removeEventListener('compositionend', this.onCompositionEnd);
	      }
	    }
	  }, {
	    key: "startListeningToTouch",
	    // ==============================
	    // Touch Handlers
	    // ==============================
	    value: function startListeningToTouch() {
	      if (document && document.addEventListener) {
	        document.addEventListener('touchstart', this.onTouchStart, false);
	        document.addEventListener('touchmove', this.onTouchMove, false);
	        document.addEventListener('touchend', this.onTouchEnd, false);
	      }
	    }
	  }, {
	    key: "stopListeningToTouch",
	    value: function stopListeningToTouch() {
	      if (document && document.removeEventListener) {
	        document.removeEventListener('touchstart', this.onTouchStart);
	        document.removeEventListener('touchmove', this.onTouchMove);
	        document.removeEventListener('touchend', this.onTouchEnd);
	      }
	    }
	  }, {
	    key: "buildMenuOptions",
	    // ==============================
	    // Menu Options
	    // ==============================
	    value: function buildMenuOptions(props, selectValue) {
	      var _this3 = this;

	      var _props$inputValue = props.inputValue,
	          inputValue = _props$inputValue === void 0 ? '' : _props$inputValue,
	          options = props.options;

	      var toOption = function toOption(option, id) {
	        var isDisabled = _this3.isOptionDisabled(option, selectValue);

	        var isSelected = _this3.isOptionSelected(option, selectValue);

	        var label = _this3.getOptionLabel(option);

	        var value = _this3.getOptionValue(option);

	        if (_this3.shouldHideSelectedOptions() && isSelected || !_this3.filterOption({
	          label: label,
	          value: value,
	          data: option
	        }, inputValue)) {
	          return;
	        }

	        var onHover = isDisabled ? undefined : function () {
	          return _this3.onOptionHover(option);
	        };
	        var onSelect = isDisabled ? undefined : function () {
	          return _this3.selectOption(option);
	        };
	        var optionId = "".concat(_this3.getElementId('option'), "-").concat(id);
	        return {
	          innerProps: {
	            id: optionId,
	            onClick: onSelect,
	            onMouseMove: onHover,
	            onMouseOver: onHover,
	            tabIndex: -1
	          },
	          data: option,
	          isDisabled: isDisabled,
	          isSelected: isSelected,
	          key: optionId,
	          label: label,
	          type: 'option',
	          value: value
	        };
	      };

	      return options.reduce(function (acc, item, itemIndex) {
	        if (item.options) {
	          // TODO needs a tidier implementation
	          if (!_this3.hasGroups) _this3.hasGroups = true;
	          var items = item.options;
	          var children = items.map(function (child, i) {
	            var option = toOption(child, "".concat(itemIndex, "-").concat(i));
	            if (option) acc.focusable.push(child);
	            return option;
	          }).filter(Boolean);

	          if (children.length) {
	            var groupId = "".concat(_this3.getElementId('group'), "-").concat(itemIndex);
	            acc.render.push({
	              type: 'group',
	              key: groupId,
	              data: item,
	              options: children
	            });
	          }
	        } else {
	          var option = toOption(item, "".concat(itemIndex));

	          if (option) {
	            acc.render.push(option);
	            acc.focusable.push(item);
	          }
	        }

	        return acc;
	      }, {
	        render: [],
	        focusable: []
	      });
	    } // ==============================
	    // Renderers
	    // ==============================

	  }, {
	    key: "constructAriaLiveMessage",
	    value: function constructAriaLiveMessage() {
	      var _this$state7 = this.state,
	          ariaLiveContext = _this$state7.ariaLiveContext,
	          selectValue = _this$state7.selectValue,
	          focusedValue = _this$state7.focusedValue,
	          focusedOption = _this$state7.focusedOption;
	      var _this$props13 = this.props,
	          options = _this$props13.options,
	          menuIsOpen = _this$props13.menuIsOpen,
	          inputValue = _this$props13.inputValue,
	          screenReaderStatus = _this$props13.screenReaderStatus; // An aria live message representing the currently focused value in the select.

	      var focusedValueMsg = focusedValue ? valueFocusAriaMessage({
	        focusedValue: focusedValue,
	        getOptionLabel: this.getOptionLabel,
	        selectValue: selectValue
	      }) : ''; // An aria live message representing the currently focused option in the select.

	      var focusedOptionMsg = focusedOption && menuIsOpen ? optionFocusAriaMessage({
	        focusedOption: focusedOption,
	        getOptionLabel: this.getOptionLabel,
	        options: options
	      }) : ''; // An aria live message representing the set of focusable results and current searchterm/inputvalue.

	      var resultsMsg = resultsAriaMessage({
	        inputValue: inputValue,
	        screenReaderMessage: screenReaderStatus({
	          count: this.countOptions()
	        })
	      });
	      return "".concat(focusedValueMsg, " ").concat(focusedOptionMsg, " ").concat(resultsMsg, " ").concat(ariaLiveContext);
	    }
	  }, {
	    key: "renderInput",
	    value: function renderInput() {
	      var _this$props14 = this.props,
	          isDisabled = _this$props14.isDisabled,
	          isSearchable = _this$props14.isSearchable,
	          inputId = _this$props14.inputId,
	          inputValue = _this$props14.inputValue,
	          tabIndex = _this$props14.tabIndex;
	      var Input = this.components.Input;
	      var inputIsHidden = this.state.inputIsHidden;
	      var id = inputId || this.getElementId('input');

	      if (!isSearchable) {
	        // use a dummy input to maintain focus/blur functionality
	        return React__default.createElement(DummyInput, {
	          id: id,
	          innerRef: this.getInputRef,
	          onBlur: this.onInputBlur,
	          onChange: noop,
	          onFocus: this.onInputFocus,
	          readOnly: true,
	          disabled: isDisabled,
	          tabIndex: tabIndex,
	          value: ""
	        });
	      } // aria attributes makes the JSX "noisy", separated for clarity


	      var ariaAttributes = {
	        'aria-autocomplete': 'list',
	        'aria-label': this.props['aria-label'],
	        'aria-labelledby': this.props['aria-labelledby']
	      };
	      var _this$commonProps = this.commonProps,
	          cx = _this$commonProps.cx,
	          theme = _this$commonProps.theme,
	          selectProps = _this$commonProps.selectProps;
	      return React__default.createElement(Input, _extends({
	        autoCapitalize: "none",
	        autoComplete: "off",
	        autoCorrect: "off",
	        cx: cx,
	        getStyles: this.getStyles,
	        id: id,
	        innerRef: this.getInputRef,
	        isDisabled: isDisabled,
	        isHidden: inputIsHidden,
	        onBlur: this.onInputBlur,
	        onChange: this.handleInputChange,
	        onFocus: this.onInputFocus,
	        selectProps: selectProps,
	        spellCheck: "false",
	        tabIndex: tabIndex,
	        theme: theme,
	        type: "text",
	        value: inputValue
	      }, ariaAttributes));
	    }
	  }, {
	    key: "renderPlaceholderOrValue",
	    value: function renderPlaceholderOrValue() {
	      var _this4 = this;

	      var _this$components = this.components,
	          MultiValue = _this$components.MultiValue,
	          MultiValueContainer = _this$components.MultiValueContainer,
	          MultiValueLabel = _this$components.MultiValueLabel,
	          MultiValueRemove = _this$components.MultiValueRemove,
	          SingleValue = _this$components.SingleValue,
	          Placeholder = _this$components.Placeholder;
	      var commonProps = this.commonProps;
	      var _this$props15 = this.props,
	          controlShouldRenderValue = _this$props15.controlShouldRenderValue,
	          isDisabled = _this$props15.isDisabled,
	          isMulti = _this$props15.isMulti,
	          inputValue = _this$props15.inputValue,
	          placeholder = _this$props15.placeholder;
	      var _this$state8 = this.state,
	          selectValue = _this$state8.selectValue,
	          focusedValue = _this$state8.focusedValue,
	          isFocused = _this$state8.isFocused;

	      if (!this.hasValue() || !controlShouldRenderValue) {
	        return inputValue ? null : React__default.createElement(Placeholder, _extends({}, commonProps, {
	          key: "placeholder",
	          isDisabled: isDisabled,
	          isFocused: isFocused
	        }), placeholder);
	      }

	      if (isMulti) {
	        var selectValues = selectValue.map(function (opt) {
	          var isOptionFocused = opt === focusedValue;
	          return React__default.createElement(MultiValue, _extends({}, commonProps, {
	            components: {
	              Container: MultiValueContainer,
	              Label: MultiValueLabel,
	              Remove: MultiValueRemove
	            },
	            isFocused: isOptionFocused,
	            isDisabled: isDisabled,
	            key: _this4.getOptionValue(opt),
	            removeProps: {
	              onClick: function onClick() {
	                return _this4.removeValue(opt);
	              },
	              onTouchEnd: function onTouchEnd() {
	                return _this4.removeValue(opt);
	              },
	              onMouseDown: function onMouseDown(e) {
	                e.preventDefault();
	                e.stopPropagation();
	              }
	            },
	            data: opt
	          }), _this4.formatOptionLabel(opt, 'value'));
	        });
	        return selectValues;
	      }

	      if (inputValue) {
	        return null;
	      }

	      var singleValue = selectValue[0];
	      return React__default.createElement(SingleValue, _extends({}, commonProps, {
	        data: singleValue,
	        isDisabled: isDisabled
	      }), this.formatOptionLabel(singleValue, 'value'));
	    }
	  }, {
	    key: "renderClearIndicator",
	    value: function renderClearIndicator() {
	      var ClearIndicator = this.components.ClearIndicator;
	      var commonProps = this.commonProps;
	      var _this$props16 = this.props,
	          isDisabled = _this$props16.isDisabled,
	          isLoading = _this$props16.isLoading;
	      var isFocused = this.state.isFocused;

	      if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
	        return null;
	      }

	      var innerProps = {
	        onMouseDown: this.onClearIndicatorMouseDown,
	        onTouchEnd: this.onClearIndicatorTouchEnd,
	        'aria-hidden': 'true'
	      };
	      return React__default.createElement(ClearIndicator, _extends({}, commonProps, {
	        innerProps: innerProps,
	        isFocused: isFocused
	      }));
	    }
	  }, {
	    key: "renderLoadingIndicator",
	    value: function renderLoadingIndicator() {
	      var LoadingIndicator = this.components.LoadingIndicator;
	      var commonProps = this.commonProps;
	      var _this$props17 = this.props,
	          isDisabled = _this$props17.isDisabled,
	          isLoading = _this$props17.isLoading;
	      var isFocused = this.state.isFocused;
	      if (!LoadingIndicator || !isLoading) return null;
	      var innerProps = {
	        'aria-hidden': 'true'
	      };
	      return React__default.createElement(LoadingIndicator, _extends({}, commonProps, {
	        innerProps: innerProps,
	        isDisabled: isDisabled,
	        isFocused: isFocused
	      }));
	    }
	  }, {
	    key: "renderIndicatorSeparator",
	    value: function renderIndicatorSeparator() {
	      var _this$components2 = this.components,
	          DropdownIndicator = _this$components2.DropdownIndicator,
	          IndicatorSeparator = _this$components2.IndicatorSeparator; // separator doesn't make sense without the dropdown indicator

	      if (!DropdownIndicator || !IndicatorSeparator) return null;
	      var commonProps = this.commonProps;
	      var isDisabled = this.props.isDisabled;
	      var isFocused = this.state.isFocused;
	      return React__default.createElement(IndicatorSeparator, _extends({}, commonProps, {
	        isDisabled: isDisabled,
	        isFocused: isFocused
	      }));
	    }
	  }, {
	    key: "renderDropdownIndicator",
	    value: function renderDropdownIndicator() {
	      var DropdownIndicator = this.components.DropdownIndicator;
	      if (!DropdownIndicator) return null;
	      var commonProps = this.commonProps;
	      var isDisabled = this.props.isDisabled;
	      var isFocused = this.state.isFocused;
	      var innerProps = {
	        onMouseDown: this.onDropdownIndicatorMouseDown,
	        onTouchEnd: this.onDropdownIndicatorTouchEnd,
	        'aria-hidden': 'true'
	      };
	      return React__default.createElement(DropdownIndicator, _extends({}, commonProps, {
	        innerProps: innerProps,
	        isDisabled: isDisabled,
	        isFocused: isFocused
	      }));
	    }
	  }, {
	    key: "renderMenu",
	    value: function renderMenu() {
	      var _this5 = this;

	      var _this$components3 = this.components,
	          Group = _this$components3.Group,
	          GroupHeading = _this$components3.GroupHeading,
	          Menu$$1 = _this$components3.Menu,
	          MenuList$$1 = _this$components3.MenuList,
	          MenuPortal$$1 = _this$components3.MenuPortal,
	          LoadingMessage$$1 = _this$components3.LoadingMessage,
	          NoOptionsMessage$$1 = _this$components3.NoOptionsMessage,
	          Option = _this$components3.Option;
	      var commonProps = this.commonProps;
	      var _this$state9 = this.state,
	          focusedOption = _this$state9.focusedOption,
	          menuOptions = _this$state9.menuOptions;
	      var _this$props18 = this.props,
	          captureMenuScroll = _this$props18.captureMenuScroll,
	          inputValue = _this$props18.inputValue,
	          isLoading = _this$props18.isLoading,
	          loadingMessage = _this$props18.loadingMessage,
	          minMenuHeight = _this$props18.minMenuHeight,
	          maxMenuHeight = _this$props18.maxMenuHeight,
	          menuIsOpen = _this$props18.menuIsOpen,
	          menuPlacement = _this$props18.menuPlacement,
	          menuPosition = _this$props18.menuPosition,
	          menuPortalTarget = _this$props18.menuPortalTarget,
	          menuShouldBlockScroll = _this$props18.menuShouldBlockScroll,
	          menuShouldScrollIntoView = _this$props18.menuShouldScrollIntoView,
	          noOptionsMessage = _this$props18.noOptionsMessage,
	          onMenuScrollToTop = _this$props18.onMenuScrollToTop,
	          onMenuScrollToBottom = _this$props18.onMenuScrollToBottom;
	      if (!menuIsOpen) return null; // TODO: Internal Option Type here

	      var render = function render(props) {
	        // for performance, the menu options in state aren't changed when the
	        // focused option changes so we calculate additional props based on that
	        var isFocused = focusedOption === props.data;
	        props.innerRef = isFocused ? _this5.getFocusedOptionRef : undefined;
	        return React__default.createElement(Option, _extends({}, commonProps, props, {
	          isFocused: isFocused
	        }), _this5.formatOptionLabel(props.data, 'menu'));
	      };

	      var menuUI;

	      if (this.hasOptions()) {
	        menuUI = menuOptions.render.map(function (item) {
	          if (item.type === 'group') {
	            var type = item.type,
	                group = _objectWithoutProperties(item, ["type"]);

	            var headingId = "".concat(item.key, "-heading");
	            return React__default.createElement(Group, _extends({}, commonProps, group, {
	              Heading: GroupHeading,
	              headingProps: {
	                id: headingId
	              },
	              label: _this5.formatGroupLabel(item.data)
	            }), item.options.map(function (option) {
	              return render(option);
	            }));
	          } else if (item.type === 'option') {
	            return render(item);
	          }
	        });
	      } else if (isLoading) {
	        var message = loadingMessage({
	          inputValue: inputValue
	        });
	        if (message === null) return null;
	        menuUI = React__default.createElement(LoadingMessage$$1, commonProps, message);
	      } else {
	        var _message = noOptionsMessage({
	          inputValue: inputValue
	        });

	        if (_message === null) return null;
	        menuUI = React__default.createElement(NoOptionsMessage$$1, commonProps, _message);
	      }

	      var menuPlacementProps = {
	        minMenuHeight: minMenuHeight,
	        maxMenuHeight: maxMenuHeight,
	        menuPlacement: menuPlacement,
	        menuPosition: menuPosition,
	        menuShouldScrollIntoView: menuShouldScrollIntoView
	      };
	      var menuElement = React__default.createElement(MenuPlacer, _extends({}, commonProps, menuPlacementProps), function (_ref6) {
	        var ref = _ref6.ref,
	            _ref6$placerProps = _ref6.placerProps,
	            placement = _ref6$placerProps.placement,
	            maxHeight = _ref6$placerProps.maxHeight;
	        return React__default.createElement(Menu$$1, _extends({}, commonProps, menuPlacementProps, {
	          innerRef: ref,
	          innerProps: {
	            onMouseDown: _this5.onMenuMouseDown,
	            onMouseMove: _this5.onMenuMouseMove
	          },
	          isLoading: isLoading,
	          placement: placement
	        }), React__default.createElement(ScrollCaptorSwitch, {
	          isEnabled: captureMenuScroll,
	          onTopArrive: onMenuScrollToTop,
	          onBottomArrive: onMenuScrollToBottom
	        }, React__default.createElement(ScrollBlock, {
	          isEnabled: menuShouldBlockScroll
	        }, React__default.createElement(MenuList$$1, _extends({}, commonProps, {
	          innerRef: _this5.getMenuListRef,
	          isLoading: isLoading,
	          maxHeight: maxHeight
	        }), menuUI))));
	      }); // positioning behaviour is almost identical for portalled and fixed,
	      // so we use the same component. the actual portalling logic is forked
	      // within the component based on `menuPosition`

	      return menuPortalTarget || menuPosition === 'fixed' ? React__default.createElement(MenuPortal$$1, _extends({}, commonProps, {
	        appendTo: menuPortalTarget,
	        controlElement: this.controlRef,
	        menuPlacement: menuPlacement,
	        menuPosition: menuPosition
	      }), menuElement) : menuElement;
	    }
	  }, {
	    key: "renderFormField",
	    value: function renderFormField() {
	      var _this6 = this;

	      var _this$props19 = this.props,
	          delimiter = _this$props19.delimiter,
	          isDisabled = _this$props19.isDisabled,
	          isMulti = _this$props19.isMulti,
	          name = _this$props19.name;
	      var selectValue = this.state.selectValue;
	      if (!name || isDisabled) return;

	      if (isMulti) {
	        if (delimiter) {
	          var value = selectValue.map(function (opt) {
	            return _this6.getOptionValue(opt);
	          }).join(delimiter);
	          return React__default.createElement("input", {
	            name: name,
	            type: "hidden",
	            value: value
	          });
	        } else {
	          var input = selectValue.length > 0 ? selectValue.map(function (opt, i) {
	            return React__default.createElement("input", {
	              key: "i-".concat(i),
	              name: name,
	              type: "hidden",
	              value: _this6.getOptionValue(opt)
	            });
	          }) : React__default.createElement("input", {
	            name: name,
	            type: "hidden"
	          });
	          return React__default.createElement("div", null, input);
	        }
	      } else {
	        var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';

	        return React__default.createElement("input", {
	          name: name,
	          type: "hidden",
	          value: _value
	        });
	      }
	    }
	  }, {
	    key: "renderLiveRegion",
	    value: function renderLiveRegion() {
	      if (!this.state.isFocused) return null;
	      return React__default.createElement(A11yText, {
	        "aria-live": "assertive"
	      }, React__default.createElement("p", {
	        id: "aria-selection-event"
	      }, "\xA0", this.state.ariaLiveSelection), React__default.createElement("p", {
	        id: "aria-context"
	      }, "\xA0", this.constructAriaLiveMessage()));
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this$components4 = this.components,
	          Control = _this$components4.Control,
	          IndicatorsContainer = _this$components4.IndicatorsContainer,
	          SelectContainer = _this$components4.SelectContainer,
	          ValueContainer = _this$components4.ValueContainer;
	      var _this$props20 = this.props,
	          className = _this$props20.className,
	          id = _this$props20.id,
	          isDisabled = _this$props20.isDisabled,
	          menuIsOpen = _this$props20.menuIsOpen;
	      var isFocused = this.state.isFocused;
	      var commonProps = this.commonProps = this.getCommonProps();
	      return React__default.createElement(SelectContainer, _extends({}, commonProps, {
	        className: className,
	        innerProps: {
	          id: id,
	          onKeyDown: this.onKeyDown
	        },
	        isDisabled: isDisabled,
	        isFocused: isFocused
	      }), this.renderLiveRegion(), React__default.createElement(Control, _extends({}, commonProps, {
	        innerRef: this.getControlRef,
	        innerProps: {
	          onMouseDown: this.onControlMouseDown,
	          onTouchEnd: this.onControlTouchEnd
	        },
	        isDisabled: isDisabled,
	        isFocused: isFocused,
	        menuIsOpen: menuIsOpen
	      }), React__default.createElement(ValueContainer, _extends({}, commonProps, {
	        isDisabled: isDisabled
	      }), this.renderPlaceholderOrValue(), this.renderInput()), React__default.createElement(IndicatorsContainer, _extends({}, commonProps, {
	        isDisabled: isDisabled
	      }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
	    }
	  }]);

	  return Select;
	}(React.Component);

	_defineProperty(Select, "defaultProps", defaultProps);

	var defaultProps$1 = {
	  defaultInputValue: '',
	  defaultMenuIsOpen: false,
	  defaultValue: null
	};

	var manageState = function manageState(SelectComponent) {
	  var _class, _temp;

	  return _temp = _class =
	  /*#__PURE__*/
	  function (_Component) {
	    _inherits(StateManager, _Component);

	    function StateManager() {
	      var _getPrototypeOf2;

	      var _this;

	      _classCallCheck(this, StateManager);

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StateManager)).call.apply(_getPrototypeOf2, [this].concat(args)));

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "select", void 0);

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
	        inputValue: _this.props.inputValue !== undefined ? _this.props.inputValue : _this.props.defaultInputValue,
	        menuIsOpen: _this.props.menuIsOpen !== undefined ? _this.props.menuIsOpen : _this.props.defaultMenuIsOpen,
	        value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
	      });

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (value, actionMeta) {
	        _this.callProp('onChange', value, actionMeta);

	        _this.setState({
	          value: value
	        });
	      });

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputChange", function (value, actionMeta) {
	        // TODO: for backwards compatibility, we allow the prop to return a new
	        // value, but now inputValue is a controllable prop we probably shouldn't
	        var newValue = _this.callProp('onInputChange', value, actionMeta);

	        _this.setState({
	          inputValue: newValue !== undefined ? newValue : value
	        });
	      });

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuOpen", function () {
	        _this.callProp('onMenuOpen');

	        _this.setState({
	          menuIsOpen: true
	        });
	      });

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuClose", function () {
	        _this.callProp('onMenuClose');

	        _this.setState({
	          menuIsOpen: false
	        });
	      });

	      return _this;
	    }

	    _createClass(StateManager, [{
	      key: "focus",
	      value: function focus() {
	        this.select.focus();
	      }
	    }, {
	      key: "blur",
	      value: function blur() {
	        this.select.blur();
	      } // FIXME: untyped flow code, return any

	    }, {
	      key: "getProp",
	      value: function getProp(key) {
	        return this.props[key] !== undefined ? this.props[key] : this.state[key];
	      } // FIXME: untyped flow code, return any

	    }, {
	      key: "callProp",
	      value: function callProp(name) {
	        if (typeof this.props[name] === 'function') {
	          var _this$props;

	          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	            args[_key2 - 1] = arguments[_key2];
	          }

	          return (_this$props = this.props)[name].apply(_this$props, args);
	        }
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        var _this2 = this;

	        var _this$props2 = this.props,
	            defaultInputValue = _this$props2.defaultInputValue,
	            defaultMenuIsOpen = _this$props2.defaultMenuIsOpen,
	            defaultValue = _this$props2.defaultValue,
	            props = _objectWithoutProperties(_this$props2, ["defaultInputValue", "defaultMenuIsOpen", "defaultValue"]);

	        return React__default.createElement(SelectComponent, _extends({}, props, {
	          ref: function ref(_ref) {
	            _this2.select = _ref;
	          },
	          inputValue: this.getProp('inputValue'),
	          menuIsOpen: this.getProp('menuIsOpen'),
	          onChange: this.onChange,
	          onInputChange: this.onInputChange,
	          onMenuClose: this.onMenuClose,
	          onMenuOpen: this.onMenuOpen,
	          value: this.getProp('value')
	        }));
	      }
	    }]);

	    return StateManager;
	  }(React.Component), _defineProperty(_class, "defaultProps", defaultProps$1), _temp;
	};

	var defaultProps$2 = {
	  cacheOptions: false,
	  defaultOptions: false,
	  filterOption: null
	};
	var makeAsyncSelect = function makeAsyncSelect(SelectComponent) {
	  var _class, _temp;

	  return _temp = _class =
	  /*#__PURE__*/
	  function (_Component) {
	    _inherits(Async, _Component);

	    function Async(props) {
	      var _this;

	      _classCallCheck(this, Async);

	      _this = _possibleConstructorReturn(this, _getPrototypeOf(Async).call(this));

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "select", void 0);

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "lastRequest", void 0);

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mounted", false);

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "optionsCache", {});

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function (newValue, actionMeta) {
	        var _this$props = _this.props,
	            cacheOptions = _this$props.cacheOptions,
	            onInputChange = _this$props.onInputChange; // TODO

	        var inputValue = handleInputChange(newValue, actionMeta, onInputChange);

	        if (!inputValue) {
	          delete _this.lastRequest;

	          _this.setState({
	            inputValue: '',
	            loadedInputValue: '',
	            loadedOptions: [],
	            isLoading: false,
	            passEmptyOptions: false
	          });

	          return;
	        }

	        if (cacheOptions && _this.optionsCache[inputValue]) {
	          _this.setState({
	            inputValue: inputValue,
	            loadedInputValue: inputValue,
	            loadedOptions: _this.optionsCache[inputValue],
	            isLoading: false,
	            passEmptyOptions: false
	          });
	        } else {
	          var request = _this.lastRequest = {};

	          _this.setState({
	            inputValue: inputValue,
	            isLoading: true,
	            passEmptyOptions: !_this.state.loadedInputValue
	          }, function () {
	            _this.loadOptions(inputValue, function (options) {
	              if (!_this.mounted) return;

	              if (options) {
	                _this.optionsCache[inputValue] = options;
	              }

	              if (request !== _this.lastRequest) return;
	              delete _this.lastRequest;

	              _this.setState({
	                isLoading: false,
	                loadedInputValue: inputValue,
	                loadedOptions: options || [],
	                passEmptyOptions: false
	              });
	            });
	          });
	        }

	        return inputValue;
	      });

	      _this.state = {
	        defaultOptions: Array.isArray(props.defaultOptions) ? props.defaultOptions : undefined,
	        inputValue: typeof props.inputValue !== 'undefined' ? props.inputValue : '',
	        isLoading: props.defaultOptions === true ? true : false,
	        loadedOptions: [],
	        passEmptyOptions: false
	      };
	      return _this;
	    }

	    _createClass(Async, [{
	      key: "componentDidMount",
	      value: function componentDidMount() {
	        var _this2 = this;

	        this.mounted = true;
	        var defaultOptions = this.props.defaultOptions;
	        var inputValue = this.state.inputValue;

	        if (defaultOptions === true) {
	          this.loadOptions(inputValue, function (options) {
	            if (!_this2.mounted) return;
	            var isLoading = !!_this2.lastRequest;

	            _this2.setState({
	              defaultOptions: options || [],
	              isLoading: isLoading
	            });
	          });
	        }
	      }
	    }, {
	      key: "componentWillReceiveProps",
	      value: function componentWillReceiveProps(nextProps) {
	        // if the cacheOptions prop changes, clear the cache
	        if (nextProps.cacheOptions !== this.props.cacheOptions) {
	          this.optionsCache = {};
	        }

	        if (nextProps.defaultOptions !== this.props.defaultOptions) {
	          this.setState({
	            defaultOptions: Array.isArray(nextProps.defaultOptions) ? nextProps.defaultOptions : undefined
	          });
	        }
	      }
	    }, {
	      key: "componentWillUnmount",
	      value: function componentWillUnmount() {
	        this.mounted = false;
	      }
	    }, {
	      key: "focus",
	      value: function focus() {
	        this.select.focus();
	      }
	    }, {
	      key: "blur",
	      value: function blur() {
	        this.select.blur();
	      }
	    }, {
	      key: "loadOptions",
	      value: function loadOptions(inputValue, callback) {
	        var loadOptions = this.props.loadOptions;
	        if (!loadOptions) return callback();
	        var loader = loadOptions(inputValue, callback);

	        if (loader && typeof loader.then === 'function') {
	          loader.then(callback, function () {
	            return callback();
	          });
	        }
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        var _this3 = this;

	        var _this$props2 = this.props,
	            loadOptions = _this$props2.loadOptions,
	            props = _objectWithoutProperties(_this$props2, ["loadOptions"]);

	        var _this$state = this.state,
	            defaultOptions = _this$state.defaultOptions,
	            inputValue = _this$state.inputValue,
	            isLoading = _this$state.isLoading,
	            loadedInputValue = _this$state.loadedInputValue,
	            loadedOptions = _this$state.loadedOptions,
	            passEmptyOptions = _this$state.passEmptyOptions;
	        var options = passEmptyOptions ? [] : inputValue && loadedInputValue ? loadedOptions : defaultOptions || [];
	        return React__default.createElement(SelectComponent, _extends({}, props, {
	          ref: function ref(_ref) {
	            _this3.select = _ref;
	          },
	          options: options,
	          isLoading: isLoading,
	          onInputChange: this.handleInputChange
	        }));
	      }
	    }]);

	    return Async;
	  }(React.Component), _defineProperty(_class, "defaultProps", defaultProps$2), _temp;
	};
	var SelectState = manageState(Select);
	var Async = makeAsyncSelect(SelectState);

	var compareOption = function compareOption() {
	  var inputValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var option = arguments.length > 1 ? arguments[1] : undefined;
	  var candidate = String(inputValue).toLowerCase();
	  var optionValue = String(option.value).toLowerCase();
	  var optionLabel = String(option.label).toLowerCase();
	  return optionValue === candidate || optionLabel === candidate;
	};

	var builtins = {
	  formatCreateLabel: function formatCreateLabel(inputValue) {
	    return "Create \"".concat(inputValue, "\"");
	  },
	  isValidNewOption: function isValidNewOption(inputValue, selectValue, selectOptions) {
	    return !(!inputValue || selectValue.some(function (option) {
	      return compareOption(inputValue, option);
	    }) || selectOptions.some(function (option) {
	      return compareOption(inputValue, option);
	    }));
	  },
	  getNewOptionData: function getNewOptionData(inputValue, optionLabel) {
	    return {
	      label: optionLabel,
	      value: inputValue,
	      __isNew__: true
	    };
	  }
	};
	var defaultProps$3 = _objectSpread({
	  allowCreateWhileLoading: false,
	  createOptionPosition: 'last'
	}, builtins);
	var makeCreatableSelect = function makeCreatableSelect(SelectComponent) {
	  var _class, _temp;

	  return _temp = _class =
	  /*#__PURE__*/
	  function (_Component) {
	    _inherits(Creatable, _Component);

	    function Creatable(props) {
	      var _this;

	      _classCallCheck(this, Creatable);

	      _this = _possibleConstructorReturn(this, _getPrototypeOf(Creatable).call(this, props));

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "select", void 0);

	      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (newValue, actionMeta) {
	        var _this$props = _this.props,
	            getNewOptionData = _this$props.getNewOptionData,
	            inputValue = _this$props.inputValue,
	            isMulti = _this$props.isMulti,
	            onChange = _this$props.onChange,
	            onCreateOption = _this$props.onCreateOption,
	            value = _this$props.value;

	        if (actionMeta.action !== 'select-option') {
	          return onChange(newValue, actionMeta);
	        }

	        var newOption = _this.state.newOption;
	        var valueArray = Array.isArray(newValue) ? newValue : [newValue];

	        if (valueArray[valueArray.length - 1] === newOption) {
	          if (onCreateOption) onCreateOption(inputValue);else {
	            var newOptionData = getNewOptionData(inputValue, inputValue);
	            var newActionMeta = {
	              action: 'create-option'
	            };

	            if (isMulti) {
	              onChange([].concat(_toConsumableArray(cleanValue(value)), [newOptionData]), newActionMeta);
	            } else {
	              onChange(newOptionData, newActionMeta);
	            }
	          }
	          return;
	        }

	        onChange(newValue, actionMeta);
	      });

	      var options = props.options || [];
	      _this.state = {
	        newOption: undefined,
	        options: options
	      };
	      return _this;
	    }

	    _createClass(Creatable, [{
	      key: "componentWillReceiveProps",
	      value: function componentWillReceiveProps(nextProps) {
	        var allowCreateWhileLoading = nextProps.allowCreateWhileLoading,
	            createOptionPosition = nextProps.createOptionPosition,
	            formatCreateLabel = nextProps.formatCreateLabel,
	            getNewOptionData = nextProps.getNewOptionData,
	            inputValue = nextProps.inputValue,
	            isLoading = nextProps.isLoading,
	            isValidNewOption = nextProps.isValidNewOption,
	            value = nextProps.value;
	        var options = nextProps.options || [];
	        var newOption = this.state.newOption;

	        if (isValidNewOption(inputValue, cleanValue(value), options)) {
	          newOption = getNewOptionData(inputValue, formatCreateLabel(inputValue));
	        } else {
	          newOption = undefined;
	        }

	        this.setState({
	          newOption: newOption,
	          options: (allowCreateWhileLoading || !isLoading) && newOption ? createOptionPosition === 'first' ? [newOption].concat(_toConsumableArray(options)) : [].concat(_toConsumableArray(options), [newOption]) : options
	        });
	      }
	    }, {
	      key: "focus",
	      value: function focus() {
	        this.select.focus();
	      }
	    }, {
	      key: "blur",
	      value: function blur() {
	        this.select.blur();
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        var _this2 = this;

	        var props = _extends({}, this.props);

	        var options = this.state.options;
	        return React__default.createElement(SelectComponent, _extends({}, props, {
	          ref: function ref(_ref) {
	            _this2.select = _ref;
	          },
	          options: options,
	          onChange: this.onChange
	        }));
	      }
	    }]);

	    return Creatable;
	  }(React.Component), _defineProperty(_class, "defaultProps", defaultProps$3), _temp;
	}; // TODO: do this in package entrypoint

	var SelectCreatable = makeCreatableSelect(Select);
	var Creatable = manageState(SelectCreatable);

	var SelectCreatable$1 = makeCreatableSelect(Select);
	var SelectCreatableState = manageState(SelectCreatable$1);
	var AsyncCreatable = makeAsyncSelect(SelectCreatableState);

	// strip transition props off before spreading onto select component
	// note we need to be explicit about innerRef for flow
	var AnimatedInput = function AnimatedInput(WrappedComponent) {
	  return function (_ref) {
	    var inProp = _ref.in,
	        onExited = _ref.onExited,
	        appear = _ref.appear,
	        enter = _ref.enter,
	        exit = _ref.exit,
	        props = _objectWithoutProperties(_ref, ["in", "onExited", "appear", "enter", "exit"]);

	    return React__default.createElement(WrappedComponent, props);
	  };
	};

	var Fade = function Fade(_ref) {
	  var Tag = _ref.component,
	      _ref$duration = _ref.duration,
	      duration = _ref$duration === void 0 ? 1 : _ref$duration,
	      inProp = _ref.in,
	      onExited = _ref.onExited,
	      props = _objectWithoutProperties(_ref, ["component", "duration", "in", "onExited"]);

	  var transition = {
	    entering: {
	      opacity: 0
	    },
	    entered: {
	      opacity: 1,
	      transition: "opacity ".concat(duration, "ms")
	    },
	    exiting: {
	      opacity: 0
	    },
	    exited: {
	      opacity: 0
	    }
	  };
	  return React__default.createElement(reactTransitionGroup_1, {
	    mountOnEnter: true,
	    unmountOnExit: true,
	    in: inProp,
	    timeout: duration
	  }, function (state) {
	    var innerProps = {
	      style: _objectSpread({}, transition[state])
	    };
	    return React__default.createElement(Tag, _extends({
	      innerProps: innerProps
	    }, props));
	  });
	}; // ==============================
	// Collapse Transition
	// ==============================

	var collapseDuration = 260;
	// wrap each MultiValue with a collapse transition; decreases width until
	// finally removing from DOM
	var Collapse =
	/*#__PURE__*/
	function (_Component) {
	  _inherits(Collapse, _Component);

	  function Collapse() {
	    var _getPrototypeOf2;

	    var _this;

	    _classCallCheck(this, Collapse);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Collapse)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "duration", collapseDuration);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "rafID", void 0);

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
	      width: 'auto'
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "transition", {
	      exiting: {
	        width: 0,
	        transition: "width ".concat(_this.duration, "ms ease-out")
	      },
	      exited: {
	        width: 0
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getWidth", function (ref) {
	      if (ref && isNaN(_this.state.width)) {
	        /*
	          Here we're invoking requestAnimationFrame with a callback invoking our
	          call to getBoundingClientRect and setState in order to resolve an edge case
	          around portalling. Certain portalling solutions briefly remove children from the DOM
	          before appending them to the target node. This is to avoid us trying to call getBoundingClientrect
	          while the Select component is in this state.
	        */
	        // cannot use `offsetWidth` because it is rounded
	        _this.rafID = window.requestAnimationFrame(function () {
	          var _ref$getBoundingClien = ref.getBoundingClientRect(),
	              width = _ref$getBoundingClien.width;

	          _this.setState({
	            width: width
	          });
	        });
	      }
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getStyle", function (width) {
	      return {
	        overflow: 'hidden',
	        whiteSpace: 'nowrap',
	        width: width
	      };
	    });

	    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getTransition", function (state) {
	      return _this.transition[state];
	    });

	    return _this;
	  }

	  _createClass(Collapse, [{
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      if (this.rafID) {
	        window.cancelAnimationFrame(this.rafID);
	      }
	    } // width must be calculated; cannot transition from `undefined` to `number`

	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;

	      var _this$props = this.props,
	          children = _this$props.children,
	          inProp = _this$props.in;
	      var width = this.state.width;
	      return React__default.createElement(reactTransitionGroup_1, {
	        enter: false,
	        mountOnEnter: true,
	        unmountOnExit: true,
	        in: inProp,
	        timeout: this.duration
	      }, function (state) {
	        var style = _objectSpread({}, _this2.getStyle(width), _this2.getTransition(state));

	        return React__default.createElement("div", {
	          ref: _this2.getWidth,
	          style: style
	        }, children);
	      });
	    }
	  }]);

	  return Collapse;
	}(React.Component);

	var AnimatedMultiValue = function AnimatedMultiValue(WrappedComponent) {
	  return function (_ref) {
	    var inProp = _ref.in,
	        onExited = _ref.onExited,
	        props = _objectWithoutProperties(_ref, ["in", "onExited"]);

	    return React__default.createElement(Collapse, {
	      in: inProp,
	      onExited: onExited
	    }, React__default.createElement(WrappedComponent, _extends({
	      cropWithEllipsis: inProp
	    }, props)));
	  };
	};

	var AnimatedPlaceholder = function AnimatedPlaceholder(WrappedComponent) {
	  return function (props) {
	    return React__default.createElement(Fade, _extends({
	      component: WrappedComponent,
	      duration: props.isMulti ? collapseDuration : 1
	    }, props));
	  };
	};

	var AnimatedSingleValue = function AnimatedSingleValue(WrappedComponent) {
	  return function (props) {
	    return React__default.createElement(Fade, _extends({
	      component: WrappedComponent
	    }, props));
	  };
	};

	// make ValueContainer a transition group
	var AnimatedValueContainer = function AnimatedValueContainer(WrappedComponent) {
	  return function (props) {
	    return React__default.createElement(reactTransitionGroup_2, _extends({
	      component: WrappedComponent
	    }, props));
	  };
	};

	var makeAnimated = function makeAnimated() {
	  var externalComponents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var components$$1 = defaultComponents({
	    components: externalComponents
	  });

	  var Input = components$$1.Input,
	      MultiValue = components$$1.MultiValue,
	      Placeholder = components$$1.Placeholder,
	      SingleValue = components$$1.SingleValue,
	      ValueContainer = components$$1.ValueContainer,
	      rest = _objectWithoutProperties(components$$1, ["Input", "MultiValue", "Placeholder", "SingleValue", "ValueContainer"]);

	  return _objectSpread({
	    Input: AnimatedInput(Input),
	    MultiValue: AnimatedMultiValue(MultiValue),
	    Placeholder: AnimatedPlaceholder(Placeholder),
	    SingleValue: AnimatedSingleValue(SingleValue),
	    ValueContainer: AnimatedValueContainer(ValueContainer)
	  }, rest);
	};

	var AnimatedComponents = makeAnimated();
	var Input$1 = AnimatedComponents.Input;
	var MultiValue$1 = AnimatedComponents.MultiValue;
	var Placeholder$1 = AnimatedComponents.Placeholder;
	var SingleValue$1 = AnimatedComponents.SingleValue;
	var ValueContainer$1 = AnimatedComponents.ValueContainer;
	var index = memoizeOne(makeAnimated, exportedEqual);

	var index$1 = manageState(Select);

	/* eslint-disable import/prefer-default-export */

	/**
	 * Function used in React memo to compare if previous property value and next
	 * property value are the same.
	 *
	 * @private
	 */
	const recordPropertyIsEqual = (prevProps, nextProps) => {
	  const prevValue = prevProps.record.params[prevProps.property.name];
	  const nextValue = nextProps.record.params[nextProps.property.name];
	  const prevError = prevProps.record.errors[prevProps.property.name];
	  const nextError = nextProps.record.errors[nextProps.property.name];
	  return prevValue === nextValue && prevError === nextError;
	};

	/* eslint-disable @typescript-eslint/explicit-function-return-type */

	const Edit$2 = props => {
	  var _record$errors;

	  const {
	    property,
	    record
	  } = props;
	  const error = (_record$errors = record.errors) === null || _record$errors === void 0 ? void 0 : _record$errors[property.name];
	  return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, {
	    error: Boolean(error)
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Label, {
	    htmlFor: property.name,
	    required: property.isRequired
	  }, property.label), property.availableValues ? /*#__PURE__*/React__default.createElement(SelectEdit, props) : /*#__PURE__*/React__default.createElement(TextEdit, props), /*#__PURE__*/React__default.createElement(DesignSystem.FormMessage, null, error && error.message));
	};

	const SelectEdit = props => {
	  var _record$params$proper, _record$params;

	  const {
	    theme,
	    record,
	    property,
	    onChange
	  } = props;

	  if (!property.availableValues) {
	    return null;
	  }

	  const propValue = (_record$params$proper = (_record$params = record.params) === null || _record$params === void 0 ? void 0 : _record$params[property.name]) !== null && _record$params$proper !== void 0 ? _record$params$proper : '';
	  const styles = DesignSystem.selectStyles(theme);
	  const selected = property.availableValues.find(av => av.value === propValue);
	  return /*#__PURE__*/React__default.createElement(index$1, {
	    isClearable: true,
	    styles: styles,
	    value: selected,
	    options: property.availableValues,
	    onChange: s => {
	      var _s$value;

	      return onChange(property.name, (_s$value = s === null || s === void 0 ? void 0 : s.value) !== null && _s$value !== void 0 ? _s$value : '');
	    },
	    isDisabled: property.isDisabled
	  });
	};

	const TextEdit = props => {
	  var _record$params$proper2, _record$params2;

	  const {
	    property,
	    record,
	    onChange
	  } = props;
	  const propValue = (_record$params$proper2 = (_record$params2 = record.params) === null || _record$params2 === void 0 ? void 0 : _record$params2[property.name]) !== null && _record$params$proper2 !== void 0 ? _record$params$proper2 : '';
	  const [value, setValue] = React.useState(propValue);
	  React.useEffect(() => {
	    if (value !== propValue) {
	      setValue(propValue);
	    }
	  }, [propValue]);
	  return /*#__PURE__*/React__default.createElement(DesignSystem.Input, {
	    id: property.name,
	    name: property.name,
	    onChange: e => setValue(e.target.value),
	    onBlur: () => onChange(property.name, value) // handle clicking ENTER
	    ,
	    onKeyDown: e => e.keyCode === 13 && onChange(property.name, value),
	    value: value,
	    disabled: property.isDisabled
	  });
	};

	var edit = styled.withTheme( /*#__PURE__*/React.memo(Edit$2, recordPropertyIsEqual));

	class Filter extends React__default.PureComponent {
	  constructor(props) {
	    super(props);
	    this.handleInputChange = this.handleInputChange.bind(this);
	    this.handleSelectChange = this.handleSelectChange.bind(this);
	  }

	  handleInputChange(event) {
	    const {
	      onChange,
	      property
	    } = this.props;
	    onChange(property.name, event.target.value);
	  }

	  handleSelectChange(selected) {
	    const {
	      onChange,
	      property
	    } = this.props;
	    const value = selected ? selected.value : '';
	    onChange(property.name, value);
	  }

	  renderInput() {
	    const {
	      property,
	      filter,
	      theme
	    } = this.props;
	    const filterKey = `filter-${property.name}`;
	    const value = filter[property.name] || '';

	    if (property.availableValues) {
	      const selected = property.availableValues.find(av => av.value === value);
	      return /*#__PURE__*/React__default.createElement(index$1, {
	        value: typeof selected === 'undefined' ? '' : selected,
	        isClearable: true,
	        options: property.availableValues,
	        styles: DesignSystem.filterStyles(theme),
	        onChange: this.handleSelectChange
	      });
	    }

	    return /*#__PURE__*/React__default.createElement(DesignSystem.Input, {
	      name: filterKey,
	      onChange: this.handleInputChange,
	      value: value
	    });
	  }

	  render() {
	    const {
	      property
	    } = this.props;
	    return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, {
	      variant: "filter"
	    }, /*#__PURE__*/React__default.createElement(DesignSystem.Label, null, property.label), this.renderInput());
	  }

	}

	var filter = styled.withTheme(Filter);

	class List$2 extends React__default.PureComponent {
	  render() {
	    return /*#__PURE__*/React__default.createElement(DefaultPropertyValue, this.props);
	  }

	}

	var defaultType = /*#__PURE__*/Object.freeze({
		__proto__: null,
		show: Show$2,
		edit: edit,
		filter: filter,
		list: List$2
	});

	const parseValue = value => !(!value || value === 'false');

	const Edit$3 = props => {
	  const {
	    property,
	    onChange,
	    record
	  } = props;
	  const value = parseValue(record.params && record.params[property.name]);
	  const error = record.errors && record.errors[property.name];

	  const handleChange = () => {
	    if (!property.isDisabled) {
	      onChange(property.name, !value);
	    }
	  };

	  return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, {
	    error: !!error
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.CheckBox, {
	    id: property.name,
	    name: property.name,
	    onChange: handleChange,
	    checked: value,
	    disabled: property.isDisabled
	  }), /*#__PURE__*/React__default.createElement(DesignSystem.Label, {
	    inline: true,
	    htmlFor: property.name,
	    required: property.isRequired
	  }, property.label), /*#__PURE__*/React__default.createElement(DesignSystem.FormMessage, null, error && error.message));
	};

	var edit$1 = /*#__PURE__*/React.memo(Edit$3, recordPropertyIsEqual);

	var mapValue = (value => {
	  if (typeof value === 'undefined') {
	    return '';
	  }

	  return value ? 'Yes' : 'No';
	});

	const BooleanPropertyValue = props => {
	  const {
	    record,
	    property,
	    resource
	  } = props;
	  const {
	    translateProperty
	  } = useTranslation();
	  const rawValue = record === null || record === void 0 ? void 0 : record.params[property.name];

	  if (typeof rawValue === 'undefined' || rawValue === '') {
	    return null;
	  }

	  const base = mapValue(rawValue);
	  const translation = translateProperty(`${property.name}.${rawValue}`, resource.id, {
	    defaultValue: base
	  });
	  return /*#__PURE__*/React__default.createElement(DesignSystem.Badge, {
	    outline: true,
	    size: "sm"
	  }, translation);
	};

	class Show$3 extends React__default.PureComponent {
	  render() {
	    const {
	      property
	    } = this.props;
	    return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, null, /*#__PURE__*/React__default.createElement(DesignSystem.Label, null, property.label), /*#__PURE__*/React__default.createElement(BooleanPropertyValue, this.props));
	  }

	}

	class List$3 extends React__default.PureComponent {
	  render() {
	    return /*#__PURE__*/React__default.createElement(BooleanPropertyValue, this.props);
	  }

	}

	class Filter$1 extends React__default.PureComponent {
	  constructor(props) {
	    super(props);
	    this.handleChange = this.handleChange.bind(this);
	  }

	  handleChange(selected) {
	    const {
	      onChange,
	      property
	    } = this.props;
	    const value = selected ? selected.value : '';
	    onChange(property.name, value);
	  }

	  render() {
	    const {
	      property,
	      filter = {},
	      theme
	    } = this.props;
	    const value = typeof filter[property.name] === 'undefined' ? '' : filter[property.name];
	    const options = [{
	      value: true,
	      label: mapValue(true)
	    }, {
	      value: false,
	      label: mapValue(false)
	    }];
	    const selected = options.find(o => o.value === value);
	    return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, null, /*#__PURE__*/React__default.createElement(DesignSystem.Label, null, property.label), /*#__PURE__*/React__default.createElement(index$1, {
	      value: typeof selected === 'undefined' ? '' : selected,
	      isClearable: true,
	      options: options,
	      styles: DesignSystem.filterStyles(theme),
	      onChange: this.handleChange
	    }));
	  }

	}

	var filter$1 = styled.withTheme(Filter$1);

	var boolean = /*#__PURE__*/Object.freeze({
		__proto__: null,
		edit: edit$1,
		show: Show$3,
		list: List$3,
		filter: filter$1
	});

	const Edit$4 = props => {
	  const {
	    property,
	    onChange,
	    record
	  } = props;
	  const value = record.params && record.params[property.name] || '';
	  const error = record.errors && record.errors[property.name];
	  return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, {
	    error: !!error
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Label, {
	    htmlFor: property.name,
	    required: property.isRequired
	  }, property.label), /*#__PURE__*/React__default.createElement(DesignSystem.DatePicker, _extends_1({
	    value: value,
	    disabled: property.isDisabled,
	    onChange: data => onChange(property.name, data),
	    propertyType: property.type
	  }, property.custom)), /*#__PURE__*/React__default.createElement(DesignSystem.FormMessage, null, error && error.message));
	};

	var edit$2 = /*#__PURE__*/React.memo(Edit$4, recordPropertyIsEqual);

	var mapValue$1 = ((value, propertyType) => {
	  if (!value) {
	    return '';
	  }

	  const date = new Date(value);

	  if (date) {
	    return DesignSystem.formatDateProperty(date, propertyType);
	  }

	  return '';
	});

	class Show$4 extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    const value = mapValue$1(record.params[property.name], property.type);
	    return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, null, /*#__PURE__*/React__default.createElement(DesignSystem.Label, null, property.label), value);
	  }

	}

	class List$4 extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    const value = mapValue$1(record.params[property.name], property.type);
	    return /*#__PURE__*/React__default.createElement("span", null, value);
	  }

	}

	const PARAM_SEPARATOR = '~~';

	/**
	 * Filter object wrapping up selected filters.
	 * @private
	 */
	class Filter$2 {
	  /**
	   * Changes raw nested filters to form Object<path, value>.
	   *
	   * @example
	   * const filters = {
	   *  nested: {field: 'ala'},
	   *  'dataField~~from': '2019-08-14'
	   * }
	   *
	   * const normalized = Filter.normalizeFilters(filters)
	   * // {
	   * //   'nested.filter': 'ala',
	   * //   'dataField': {from: '2019-08-14'}
	   * // }
	   *
	   *
	   * @param   {Object}  filters
	   *
	   * @return  {Object}
	   */
	  static normalizeKeys(filters) {
	    return flat.unflatten(flat.flatten(filters), {
	      delimiter: PARAM_SEPARATOR
	    });
	  }
	  /**
	   * @param   {Object<String,Object | String>}  filters   selected filters
	   * @param   {BaseResource}                    resource    resource which is filtered
	   */


	  constructor(filters = {}, resource) {
	    this.resource = resource;
	    const normalized = Filter$2.normalizeKeys(filters);
	    this.filters = Object.keys(normalized).reduce((memo, path) => ({
	      [path]: {
	        path,
	        property: this.resource.property(path),
	        value: normalized[path]
	      },
	      ...memo
	    }), {});
	  }
	  /**
	   * Returns filter for a given property key
	   *
	   * @param {String} key      property key
	   * @returns {Filter.Property | undefined}
	   */


	  get(key) {
	    return this.filters[key];
	  }
	  /**
	   * Populates all filtered properties which refers to other resources
	   */


	  async populate() {
	    const keys = Object.keys(this.filters);

	    for (let index = 0; index < keys.length; index += 1) {
	      var _this$resource$decora;

	      const key = keys[index];
	      const referenceResource = (_this$resource$decora = this.resource.decorate().getPropertyByKey(key)) === null || _this$resource$decora === void 0 ? void 0 : _this$resource$decora.reference();

	      if (referenceResource) {
	        this.filters[key].populated = await referenceResource.findOne(this.filters[key].value);
	      }
	    }

	    return this;
	  }

	  reduce(callback, initial) {
	    return Object.values(this.filters).reduce(callback, initial || {});
	  }

	  isVisible() {
	    return !!Object.keys(this.filters).length;
	  }

	}

	var BackendFilter = /*#__PURE__*/Object.freeze({
		__proto__: null,
		PARAM_SEPARATOR: PARAM_SEPARATOR,
		'default': Filter$2
	});

	const {
	  PARAM_SEPARATOR: PARAM_SEPARATOR$1
	} = BackendFilter;

	const Filter$3 = props => {
	  const {
	    property,
	    filter,
	    onChange
	  } = props;
	  const fromKey = `${property.name}${PARAM_SEPARATOR$1}from`;
	  const toKey = `${property.name}${PARAM_SEPARATOR$1}to`;
	  const fromValue = filter[fromKey];
	  const toValue = filter[toKey];
	  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, {
	    variant: "filter"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Label, null, property.label), /*#__PURE__*/React__default.createElement(DesignSystem.Label, null, "- From: "), /*#__PURE__*/React__default.createElement(DesignSystem.DatePicker, {
	    value: fromValue,
	    onChange: data => onChange(fromKey, data),
	    propertyType: property.type
	  }), /*#__PURE__*/React__default.createElement(DesignSystem.Label, {
	    mt: "default"
	  }, "- To: "), /*#__PURE__*/React__default.createElement(DesignSystem.DatePicker, {
	    value: toValue,
	    onChange: data => onChange(toKey, data),
	    propertyType: property.type
	  })));
	};

	var datetime = /*#__PURE__*/Object.freeze({
		__proto__: null,
		edit: edit$2,
		show: Show$4,
		list: List$4,
		filter: Filter$3
	});

	/* eslint-disable @typescript-eslint/explicit-function-return-type */
	const loadQuill = () => new Promise(resolve => {
	  if (typeof Quill !== 'undefined') {
	    resolve();
	    return;
	  }

	  const id = 'quill-script-tag';

	  if (window.document.getElementById(id)) {
	    // it could be a situation where id exists but quill hasn't been loaded. In this case
	    // we check if Quill global variable exists
	    const checkIfLoaded = () => {
	      if (typeof Quill === 'function') {
	        resolve();
	      }
	    };

	    checkIfLoaded();
	    setInterval(checkIfLoaded, 500);
	    return;
	  }

	  const script = window.document.createElement('script');
	  script.src = 'https://cdn.quilljs.com/1.3.6/quill.js';
	  script.async = true;
	  script.defer = true;
	  script.id = id;
	  script.addEventListener('load', () => {
	    resolve();
	  });
	  const style = window.document.createElement('link');
	  style.rel = 'stylesheet';
	  style.type = 'text/css';
	  style.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
	  window.document.body.appendChild(script);
	  window.document.body.appendChild(style);
	});

	/* eslint-disable @typescript-eslint/no-use-before-define */

	const Edit$5 = props => {
	  var _record$params$proper, _record$params;

	  const {
	    property,
	    record,
	    onChange
	  } = props;
	  const value = (_record$params$proper = (_record$params = record.params) === null || _record$params === void 0 ? void 0 : _record$params[property.name]) !== null && _record$params$proper !== void 0 ? _record$params$proper : '';
	  const error = record.errors && record.errors[property.name];
	  const [quill, setQuill] = React.useState(null);
	  const editorRef = React.useRef(null);
	  React.useEffect(() => {
	    let shouldLoad = true;
	    loadQuill().then(() => {
	      if (!shouldLoad) {
	        return;
	      }

	      const quillInstance = new Quill(editorRef.current, {
	        modules: {
	          toolbar: toolbarOptions
	        },
	        theme: 'snow'
	      });
	      setQuill(quillInstance);
	    });
	    return () => {
	      shouldLoad = false;
	    };
	  }, []);
	  React.useEffect(() => {
	    if (!editorRef.current || !quill) {
	      return;
	    }

	    if (value) {
	      quill.root.innerHTML = value;
	    }
	  }, [value, quill]);
	  React.useEffect(() => {
	    const editor = quill === null || quill === void 0 ? void 0 : quill.root;

	    if (!editor) {
	      return undefined;
	    }

	    const handler = () => {
	      const content = editor.innerHTML;
	      onChange === null || onChange === void 0 ? void 0 : onChange(property.name, content);
	    };

	    editor === null || editor === void 0 ? void 0 : editor.addEventListener('blur', handler);
	    return () => {
	      editor === null || editor === void 0 ? void 0 : editor.removeEventListener('blur', handler);
	    };
	  }, [onChange, property.name, quill]);
	  return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, {
	    error: Boolean(error)
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Label, {
	    htmlFor: property.name,
	    required: property.isRequired
	  }, property.label), /*#__PURE__*/React__default.createElement(Wrapper, null, /*#__PURE__*/React__default.createElement("div", {
	    className: "quill-editor",
	    ref: editorRef,
	    style: {
	      height: '400px'
	    }
	  })), /*#__PURE__*/React__default.createElement(DesignSystem.FormMessage, null, error === null || error === void 0 ? void 0 : error.message));
	};

	const toolbarOptions = [[{
	  header: [1, 2, 3, 4, 5, 6, false]
	}], ['bold', 'italic', 'underline', 'strike'], // toggled buttons
	['blockquote', 'code-block'], [{
	  list: 'ordered'
	}, {
	  list: 'bullet'
	}], [{
	  script: 'sub'
	}, {
	  script: 'super'
	}], // superscript/subscript
	[{
	  indent: '-1'
	}, {
	  indent: '+1'
	}], // indent
	[{
	  direction: 'rtl'
	}], // text direction
	[{
	  size: ['small', false, 'large', 'huge']
	}], // custom dropdown
	[{
	  color: []
	}, {
	  background: []
	}], // dropdown with defaults from theme
	[{
	  font: []
	}], [{
	  align: []
	}], ['clean'] // remove formatting button
	];
	const Wrapper = styled__default.div.attrs({
	  className: 'control has-icons-right'
	}).withConfig({
	  displayName: "edit__Wrapper",
	  componentId: "sc-1ilg3d7-0"
	})([".ql-toolbar{border-color:", ";.ql-picker{color:", ";}}.ql-container{border-color:", ";background:", ";}"], ({
	  theme
	}) => theme.colors.grey40, ({
	  theme
	}) => theme.colors.grey60, ({
	  theme
	}) => theme.colors.grey40, ({
	  theme
	}) => theme.colors.white);
	var edit$3 = /*#__PURE__*/React.memo(Edit$5, recordPropertyIsEqual);

	class Show$5 extends React__default.PureComponent {
	  constructor(props) {
	    super(props);
	    this.contentRef = /*#__PURE__*/React__default.createRef();
	  }

	  componentDidMount() {
	    const {
	      property,
	      record
	    } = this.props;
	    const value = record.params[property.name];
	    this.contentRef.current.innerHTML = value;
	  }

	  render() {
	    const {
	      property
	    } = this.props;
	    return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, null, /*#__PURE__*/React__default.createElement(DesignSystem.Label, null, property.label), /*#__PURE__*/React__default.createElement("div", {
	      className: "rich-text-value content",
	      ref: this.contentRef
	    }));
	  }

	}

	const List$5 = props => {
	  const {
	    property,
	    record
	  } = props;
	  const original = record.params[property.name] || '';
	  const value = original.substring(0, 15) + (original.length > 15 ? '...' : '');
	  return /*#__PURE__*/React__default.createElement("span", null, value);
	};

	var richtext = /*#__PURE__*/Object.freeze({
		__proto__: null,
		edit: edit$3,
		show: Show$5,
		list: List$5
	});

	const Edit$6 = props => {
	  var _record$populated$pro;

	  const {
	    onChange,
	    property,
	    record,
	    theme
	  } = props;
	  const {
	    reference: resourceId
	  } = property;

	  if (!resourceId) {
	    throw new Error(`Cannot reference resource in property '${property.name}'`);
	  }

	  const handleChange = selected => {
	    if (selected) {
	      onChange(property.name, selected.value, selected.record);
	    } else {
	      onChange(property.name, null);
	    }
	  };

	  const loadOptions = async inputValue => {
	    const api = new ApiClient();
	    const optionRecords = await api.searchRecords({
	      resourceId,
	      query: inputValue
	    });
	    return optionRecords.map(optionRecord => ({
	      value: optionRecord.id,
	      label: optionRecord.title,
	      record: optionRecord
	    }));
	  };

	  const error = record === null || record === void 0 ? void 0 : record.errors[property.name];
	  const selectedId = record === null || record === void 0 ? void 0 : record.params[property.name];
	  const [loadedRecord, setLoadedRecord] = React.useState();
	  const [loadingRecord, setLoadingRecord] = React.useState(0);
	  const selectedValue = (_record$populated$pro = record === null || record === void 0 ? void 0 : record.populated[property.name]) !== null && _record$populated$pro !== void 0 ? _record$populated$pro : loadedRecord;
	  const selectedOption = selectedId && selectedValue ? {
	    value: selectedValue.id,
	    label: selectedValue.title
	  } : {
	    value: '',
	    label: ''
	  };
	  const styles = DesignSystem.selectStyles(theme);
	  React.useEffect(() => {
	    if (!selectedValue && selectedId) {
	      setLoadingRecord(c => c + 1);
	      const api = new ApiClient();
	      api.recordAction({
	        actionName: 'show',
	        resourceId,
	        recordId: selectedId
	      }).then(({
	        data
	      }) => {
	        setLoadedRecord(data.record);
	      }).finally(() => {
	        setLoadingRecord(c => c - 1);
	      });
	    }
	  }, [selectedValue, selectedId, resourceId]);
	  return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, {
	    error: Boolean(error)
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Label, {
	    htmlFor: property.name,
	    required: property.isRequired
	  }, property.label), /*#__PURE__*/React__default.createElement(Select$1, {
	    cacheOptions: true,
	    value: selectedOption,
	    styles: styles,
	    defaultOptions: true,
	    loadOptions: loadOptions,
	    onChange: handleChange,
	    isClearable: true,
	    isDisabled: property.isDisabled,
	    isLoading: loadingRecord
	  }), /*#__PURE__*/React__default.createElement(DesignSystem.FormMessage, null, error === null || error === void 0 ? void 0 : error.message));
	};

	var edit$4 = styled.withTheme(Edit$6);

	const StyledLink = styled__default(reactRouterDom.Link).withConfig({
	  displayName: "reference-value__StyledLink",
	  componentId: "flgaqr-0"
	})(["", " padding-left:", ";padding-right:", ";"], DesignSystem.ButtonCSS, ({
	  theme
	}) => theme.space.xs, ({
	  theme
	}) => theme.space.xs);

	const ReferenceValue = props => {
	  const {
	    property,
	    record
	  } = props;
	  const h = new ViewHelpers();
	  const refId = record.params[property.name];
	  const populated = record.populated[property.name];
	  const value = populated && populated.title || refId;

	  if (!property.reference) {
	    throw new Error(`property: "${property.name}" does not have a reference`);
	  }

	  if (populated && populated.recordActions.find(a => a.name === 'show')) {
	    const href = h.recordActionUrl({
	      resourceId: property.reference,
	      recordId: refId,
	      actionName: 'show'
	    });
	    return /*#__PURE__*/React__default.createElement(StyledLink, {
	      variant: "text",
	      to: href
	    }, value);
	  }

	  return /*#__PURE__*/React__default.createElement("span", null, value);
	};

	class Show$6 extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, null, /*#__PURE__*/React__default.createElement(DesignSystem.Label, null, property.label), /*#__PURE__*/React__default.createElement(ReferenceValue, {
	      property: property,
	      record: record
	    }));
	  }

	}

	class List$6 extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    return /*#__PURE__*/React__default.createElement(ReferenceValue, {
	      property: property,
	      record: record
	    });
	  }

	}

	class Filter$4 extends React__default.PureComponent {
	  constructor(props) {
	    super(props);
	    this.api = new ApiClient();
	    this.options = [];
	    this.loadOptions = this.loadOptions.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	  }

	  handleChange(selected) {
	    const {
	      onChange,
	      property
	    } = this.props;
	    onChange(property.name, selected ? selected.value : '');
	  }

	  async loadOptions(inputValue) {
	    const {
	      property
	    } = this.props;
	    const records = await this.api.searchRecords({
	      resourceId: property.reference,
	      query: inputValue
	    });
	    this.options = records.map(r => ({
	      value: r.id,
	      label: r.title
	    }));
	    return this.options;
	  }

	  render() {
	    const {
	      property,
	      filter,
	      theme
	    } = this.props;
	    const value = typeof filter[property.name] === 'undefined' ? '' : filter[property.name];
	    const selected = (this.options || []).find(o => o.value === value);
	    return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, null, /*#__PURE__*/React__default.createElement(DesignSystem.Label, null, property.label), /*#__PURE__*/React__default.createElement(Select$1, {
	      value: typeof selected === 'undefined' ? '' : selected,
	      isClearable: true,
	      cacheOptions: true,
	      styles: DesignSystem.filterStyles(theme),
	      loadOptions: this.loadOptions,
	      onChange: this.handleChange,
	      defaultOptions: true
	    }));
	  }

	}

	var filter$2 = styled.withTheme(Filter$4);

	var reference = /*#__PURE__*/Object.freeze({
		__proto__: null,
		edit: edit$4,
		show: Show$6,
		list: List$6,
		filter: filter$2
	});

	class Show$7 extends React__default.PureComponent {
	  render() {
	    const {
	      property,
	      record
	    } = this.props;
	    const value = record.params[property.name] || '';
	    return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, null, /*#__PURE__*/React__default.createElement(DesignSystem.Label, null, property.label), value.split(/(?:\r\n|\r|\n)/g).map((line, i) =>
	    /*#__PURE__*/
	    // eslint-disable-next-line react/no-array-index-key
	    React__default.createElement(React__default.Fragment, {
	      key: i
	    }, line, /*#__PURE__*/React__default.createElement("br", null))));
	  }

	}

	/* eslint-disable @typescript-eslint/explicit-function-return-type */

	const Edit$7 = props => {
	  var _record$params$proper, _record$params, _record$errors;

	  const {
	    onChange,
	    property,
	    record
	  } = props;
	  const propValue = (_record$params$proper = (_record$params = record.params) === null || _record$params === void 0 ? void 0 : _record$params[property.name]) !== null && _record$params$proper !== void 0 ? _record$params$proper : '';
	  const [value, setValue] = React.useState(propValue);
	  const error = (_record$errors = record.errors) === null || _record$errors === void 0 ? void 0 : _record$errors[property.name];
	  React.useEffect(() => {
	    if (value !== propValue) {
	      setValue(propValue);
	    }
	  }, [propValue]);
	  return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, {
	    error: Boolean(error)
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Label, {
	    htmlFor: property.name,
	    required: property.isRequired
	  }, property.label), /*#__PURE__*/React__default.createElement(DesignSystem.Input, {
	    as: "textarea",
	    rows: (value.match(/\n/g) || []).length + 1,
	    id: property.name,
	    name: property.name,
	    onChange: e => setValue(e.target.value),
	    onBlur: () => onChange(property.name, value),
	    value: value,
	    disabled: property.isDisabled
	  }), /*#__PURE__*/React__default.createElement(DesignSystem.FormMessage, null, error && error.message));
	};

	var edit$5 = /*#__PURE__*/React.memo(Edit$7, recordPropertyIsEqual);

	var textarea = /*#__PURE__*/Object.freeze({
		__proto__: null,
		show: Show$7,
		edit: edit$5
	});

	/* eslint-disable @typescript-eslint/explicit-function-return-type */

	const Edit$8 = props => {
	  const {
	    property,
	    record,
	    onChange
	  } = props;
	  const propValue = record.params[property.name];
	  const [value, setValue] = React.useState(propValue);
	  const error = record.errors && record.errors[property.name];
	  const [isInput, setIsInput] = React.useState(false);
	  React.useEffect(() => {
	    if (value !== propValue) {
	      setValue(propValue);
	    }
	  }, [propValue]);
	  return /*#__PURE__*/React__default.createElement(DesignSystem.FormGroup, {
	    error: !!error
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Label, {
	    htmlFor: property.name,
	    required: property.isRequired
	  }, property.label), /*#__PURE__*/React__default.createElement(DesignSystem.InputGroup, null, /*#__PURE__*/React__default.createElement(DesignSystem.Input, {
	    type: isInput ? 'input' : 'password',
	    className: "input",
	    id: property.name,
	    name: property.name,
	    onChange: event => setValue(event.target.value),
	    onBlur: () => onChange(property.name, value),
	    onKeyDown: e => e.keyCode === 13 && onChange(property.name, value),
	    value: value !== null && value !== void 0 ? value : '',
	    disabled: property.isDisabled
	  }), /*#__PURE__*/React__default.createElement(DesignSystem.Button, {
	    variant: isInput ? 'primary' : 'text',
	    type: "button",
	    size: "icon",
	    onClick: () => setIsInput(!isInput)
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: "View"
	  }))), /*#__PURE__*/React__default.createElement(DesignSystem.FormMessage, null, error && error.message));
	};

	var edit$6 = /*#__PURE__*/React.memo(Edit$8, recordPropertyIsEqual);

	/* eslint-disable import/prefer-default-export */

	var password = /*#__PURE__*/Object.freeze({
		__proto__: null,
		edit: edit$6
	});

	let globalAny$2 = {};

	try {
	  globalAny$2 = window;
	} catch (error) {
	  if (error.message !== 'window is not defined') {
	    throw error;
	  }
	}

	const types = {
	  textarea,
	  boolean,
	  datetime,
	  reference,
	  password,
	  date: datetime,
	  richtext,
	  string: defaultType,
	  number: defaultType,
	  float: defaultType,
	  mixed: null
	};
	/**
	 * Component which renders properties in all the places in the AdminBro UI. By all the
	 * places I mean:
	 * - **list**: on the List,
	 * - **edit**: on default actions where user can modify the record like: {@link EditAction},
	 * and {@link NewAction},
	 * - **show**: on the default {@link ShowAction} where user can see the details of a record,
	 * - **filter**: and finally on the sidebar filter,
	 *
	 * Based on the type of given property and where the property is rendered **BasePropertyComponent**
	 * picks Component to use. That is how **date** fields are rendered as **datepicker**
	 * or **boolean** values as **checkbox**'es.
	 *
	 * ### Overriding default render logic
	 *
	 * By default BasePropertyComponent will render corresponding
	 * component: input for string, DatePicker for dates etc.
	 * But you can override this by passing a custom component to {@link PropertyOptions}.
	 *
	 * Take a look at the following example:
	 *
	 * ```
	 * const AdminBro = require('admin-bro')
	 * const ResourceModel = require('./resource-model')
	 * const AdminBroOptions = {
	 *   resources: [{
	 *     resource: ResourceModel
	 *     options: {
	 *       properties: {
	 *         name: {
	 *           components: {
	 *             show: AdminBro.bundle('./my-react-component'),
	 *           },
	 *         },
	 *       },
	 *     },
	 *   }],
	 * }
	 * ```
	 *
	 * In the example above we are altering how **name** property will look
	 * like on the Show action. We can define **my-react-component.jsx** like this:
	 *
	 * ```
	 * import React from 'react'
	 * import { InputGroup, Label } from '@admin-bro/design-system'
	 *
	 * const MyReactComponent = props => {
	 *   const { record, property } = props
	 *   const value = record.params[property.name]
	 *   return (
	 *     <InputGroup>
	 *       <Label>{property.name}</Label>
	 *       {value} [meters]
	 *     </InputGroup>
	 *   )
	 * }
	 * ```
	 *
	 * @component
	 * @name BasePropertyComponent
	 * @subcategory Application
	 * @example
	 * const booleanProperty = {
	 *   isTitle: false,
	 *   name: 'awesome',
	 *   isId: false,
	 *   position: -1,
	 *   label: 'I am awesome',
	 *   type: 'boolean',
	 * }
	 *
	 * const stringProperty = {
	 *   isTitle: true,
	 *   name: 'name',
	 *   isId: false,
	 *   position: -1,
	 *   label: 'Name of a user',
	 *   type: 'string',
	 * }
	 * // Resource is taken from the database
	 * const resource = {
	 *   id: 'User',
	 *   name: 'User Model',
	 *   titleProperty: 'name',
	 *   resourceActions: [],
	 *   listProperties: [booleanProperty, stringProperty],
	 *   editProperties: [booleanProperty, stringProperty],
	 *   showProperties: [booleanProperty, stringProperty],
	 *   filterProperties: [booleanProperty, stringProperty],
	 * }
	 *
	 * const initialRecord = {
	 *   id: '1',
	 *   title: 'John',
	 *   params: {
	 *     name: 'John',
	 *     gender: 'male',
	 *   },
	 *   errors: {},
	 *   recordActions: [],
	 * }
	 * const Wrapper = () => {
	 *   const { record, handleChange, submit } = useRecord(initialRecord, resource.id)
	 *   const params = JSON.stringify(record.params)
	 *   return (
	 *     <Box py="lg">
	 *       <BasePropertyComponent
	 *         property={booleanProperty}
	 *         resource={resource}
	 *         onChange={handleChange}
	 *         where="edit"
	 *         record={record}
	 *       />
	 *       <BasePropertyComponent
	 *         property={stringProperty}
	 *         resource={resource}
	 *         onChange={handleChange}
	 *         where="edit"
	 *         record={record}
	 *       />
	 *      <Box>
	 *        <Label>Params:</Label>
	 *        {params}
	 *      </Box>
	 *      <Box my="lg">
	 *        <Button variant="primary" onClick={submit}>Submit</Button>
	 *        <Text variant="sm">
	 *          This will throw an error because there is no AdminBro instance running
	 *        </Text>
	 *      </Box>
	 *     </Box>
	 *   )
	 * }
	 *
	 * return (<Wrapper />)
	 */

	class BasePropertyComponent extends React__default.Component {
	  render() {
	    const {
	      property,
	      resource,
	      record,
	      filter,
	      where,
	      onChange
	    } = this.props;
	    const testId = `property-${where}-${property.name}`;
	    let Component = types[property.type] && types[property.type][where] || defaultType[where];

	    if (property.components && property.components[where]) {
	      const component = property.components[where];

	      if (!component) {
	        throw new Error(`there is no "${property.name}.components.${where}"`);
	      }

	      Component = globalAny$2.AdminBro.UserComponents[component];
	      return /*#__PURE__*/React__default.createElement(ErrorBoundary, null, /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	        "data-testid": testId
	      }, /*#__PURE__*/React__default.createElement(Component, {
	        property: property,
	        resource: resource,
	        record: record,
	        filter: filter,
	        onChange: onChange,
	        where: where
	      })));
	    }

	    const Array = ArrayType[where];
	    const Mixed = MixedType[where];

	    if (property.isArray) {
	      if (!Array) {
	        return /*#__PURE__*/React__default.createElement("div", null);
	      }

	      return /*#__PURE__*/React__default.createElement(Array, _extends_1({}, this.props, {
	        ItemComponent: BasePropertyComponent,
	        testId: testId
	      }));
	    }

	    if (property.type === 'mixed' && property.subProperties && property.subProperties.length) {
	      if (!Mixed) {
	        return /*#__PURE__*/React__default.createElement("div", null);
	      }

	      return /*#__PURE__*/React__default.createElement(Mixed, _extends_1({}, this.props, {
	        ItemComponent: BasePropertyComponent,
	        testId: testId
	      }));
	    }

	    return /*#__PURE__*/React__default.createElement(ErrorBoundary, null, /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	      "data-testid": testId
	    }, /*#__PURE__*/React__default.createElement(Component, {
	      property: property,
	      resource: resource,
	      record: record,
	      filter: filter,
	      onChange: onChange,
	      where: where
	    })));
	  }

	}

	function camelizePropertyType(type) {
	  return {
	    Edit: type.edit,
	    Show: type.show,
	    List: type.list,
	    Filter: type.filter
	  };
	}

	BasePropertyComponent.DefaultType = camelizePropertyType(defaultType);
	BasePropertyComponent.Boolean = camelizePropertyType(boolean);
	BasePropertyComponent.DateTime = camelizePropertyType(datetime);
	BasePropertyComponent.RichText = camelizePropertyType(richtext);
	BasePropertyComponent.Reference = camelizePropertyType(reference);
	BasePropertyComponent.TextArea = camelizePropertyType(textarea);
	BasePropertyComponent.Password = camelizePropertyType(password);

	/* eslint-disable @typescript-eslint/explicit-function-return-type */
	/**
	 * NoticeMessage which can be presented as a "Toast" message.
	 * @alias NoticeMessage
	 * @memberof withNotice
	 */

	const mapDispatchToProps$1 = dispatch => ({
	  addNotice: notice => dispatch(addNotice(notice))
	});
	/**
	 * Higher Order Component which allows you to post notice messages from your components
	 *
	 * It gives you the additional prop: `addNotice(noticeMessage)` taking {@link NoticeMessage}.
	 *
	 * ```javascript
	 * import { withNotice } from 'admin-bro/core'
	 *
	 * const MY_MESSAGE = {
	 *   message: 'I am toast message',
	 *   type: 'success',
	 * }
	 * const MyCustomComponent = ({ addNotice }) => {
	 *   return (
	 *     <a onClick={() => addNotice(MY_MESSAGE)}>Click Me</a>
	 *   )
	 * }
	 * export default withNotice(MyCustomComponent)
	 * ```
	 *
	 * @component
	 * @subcategory HOC
	 */


	const withNotice = Component => reactRedux.connect(null, mapDispatchToProps$1)(Component);

	/* eslint-disable no-undef */
	/**
	 * @alias ActionButtonProps
	 * @memberof ActionButton
	 */

	const StyledLink$1 = styled__default(reactRouterDom.Link).withConfig({
	  displayName: "action-button__StyledLink",
	  componentId: "sc-1tnwd9t-0"
	})(["text-decoration:none;"]);
	/**
	 * Renders Button which redirects to given action
	 *
	 * ### Usage
	 *
	 * ```
	 * import { ActionButton } from 'admin-bro'
	 * ```
	 *
	 * @component
	 * @subcategory Application
	 */

	class ActionButton extends React__default.PureComponent {
	  constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);
	  }

	  href() {
	    const {
	      action,
	      resourceId,
	      recordId,
	      recordIds,
	      location
	    } = this.props;
	    const h = new ViewHelpers();
	    const {
	      name: actionName,
	      actionType
	    } = action;

	    switch (actionType) {
	      case 'record':
	        if (!recordId) {
	          throw new Error('You have to specify "recordId" for record action');
	        }

	        return h.recordActionUrl({
	          resourceId,
	          recordId,
	          actionName,
	          search: location.search
	        });

	      case 'resource':
	        return h.resourceActionUrl({
	          resourceId,
	          actionName,
	          search: location.search
	        });

	      case 'bulk':
	        return h.bulkActionUrl({
	          resourceId,
	          recordIds,
	          actionName,
	          search: location.search
	        });

	      default:
	        throw new Error('"actionType" should be either record, resource or bulk');
	    }
	  }

	  callApi() {
	    const {
	      action,
	      resourceId,
	      recordId,
	      location,
	      history,
	      actionPerformed,
	      addNotice,
	      recordIds
	    } = this.props;
	    const api = new ApiClient();
	    let promise;

	    switch (action.actionType) {
	      case 'record':
	        if (!recordId) {
	          throw new Error('You have to specify "recordId" for record action');
	        }

	        promise = api.recordAction({
	          resourceId,
	          actionName: action.name,
	          recordId
	        });
	        break;

	      case 'resource':
	        promise = api.resourceAction({
	          resourceId,
	          actionName: action.name
	        });
	        break;

	      case 'bulk':
	        if (!recordIds) {
	          throw new Error('You have to specify "recordIds" for bulk action');
	        }

	        promise = api.bulkAction({
	          resourceId,
	          actionName: action.name,
	          recordIds
	        });
	        break;

	      default:
	        throw new Error('"actionType" should be either record, resource or bulk');
	    }

	    promise.then(response => {
	      const {
	        data
	      } = response;

	      if (data.notice) {
	        addNotice(data.notice);
	      }

	      if (data.redirectUrl && location.pathname !== data.redirectUrl) {
	        history.push(appendForceRefresh(data.redirectUrl));
	      }

	      if (actionPerformed) {
	        actionPerformed(data);
	      }
	    }).catch(error => {
	      throw error;
	    });
	  }

	  handleClick(event) {
	    const {
	      action
	    } = this.props;

	    if (action.guard && !confirm(action.guard)) {
	      event.preventDefault();
	      return;
	    }

	    if (typeof action.component !== 'undefined' && action.component === false) {
	      event.preventDefault();
	      this.callApi();
	    }
	  }

	  render() {
	    const {
	      children,
	      action
	    } = this.props;

	    if (!action) {
	      return null;
	    }

	    return /*#__PURE__*/React__default.createElement(StyledLink$1, {
	      to: this.href(),
	      onClick: this.handleClick,
	      "data-testid": `action-${action.name}`
	    }, children);
	  }

	} // TODO - remove this hack


	var ActionButton$1 = reactRouterDom.withRouter(withNotice(ActionButton));

	const BreadcrumbLink = styled__default(reactRouterDom.Link).withConfig({
	  displayName: "breadcrumbs__BreadcrumbLink",
	  componentId: "yjyesi-0"
	})(["color:", ";font-family:", ";line-height:", ";font-size:", ";text-decoration:none;&:hover{color:", ";}&:after{content:'/';padding:0 ", ";}&:last-child{&:after{content:'';}}"], ({
	  theme
	}) => theme.colors.grey40, ({
	  theme
	}) => theme.font, ({
	  theme
	}) => theme.lineHeights.default, ({
	  theme
	}) => theme.fontSizes.default, ({
	  theme
	}) => theme.colors.primary100, ({
	  theme
	}) => theme.space.default);
	/**
	 * @memberof Breadcrumbs
	 */

	/**
	 * @component
	 * @private
	 */
	const Breadcrumbs = props => {
	  const {
	    resource,
	    record,
	    actionName
	  } = props;
	  const action = resource.actions.find(a => a.name === actionName);
	  const h = new ViewHelpers();
	  return /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    flexGrow: 1,
	    className: DesignSystem.cssClass('Breadcrumbs')
	  }, /*#__PURE__*/React__default.createElement(BreadcrumbLink, {
	    to: h.dashboardUrl()
	  }, "Dashboard"), /*#__PURE__*/React__default.createElement(BreadcrumbLink, {
	    to: resource.href ? resource.href : '/',
	    className: record ? 'is-active' : ''
	  }, resource.name), action && action.name !== 'list' && /*#__PURE__*/React__default.createElement(BreadcrumbLink, {
	    to: "#"
	  }, action.label));
	};

	/* eslint-disable jsx-a11y/anchor-is-valid */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const StyledLink$2 = styled__default(({
	  rounded,
	  ...rest
	}) => /*#__PURE__*/React__default.createElement(reactRouterDom.Link, rest)).withConfig({
	  displayName: "action-header__StyledLink",
	  componentId: "sc-17u6jqx-0"
	})(["", ""], DesignSystem.ButtonCSS);
	/**
	 * Header of an action. It renders Action name with buttons for all the actions.
	 *
	 * ### Usage
	 *
	 * ```
	 * import { ActionHeader } from 'admin-bro'
	 * ```
	 *
	 * @component
	 * @subcategory Application
	 */

	const ActionHeader = props => {
	  const {
	    translateButton
	  } = useTranslation();
	  const h = new ViewHelpers();
	  const {
	    resource,
	    toggleFilter,
	    actionPerformed,
	    record,
	    action,
	    tag,
	    omitActions
	  } = props;

	  if (action.hideActionHeader) {
	    return null;
	  }

	  const resourceId = resource.id;
	  const actions = record ? record.recordActions.filter(ra => !action || action.name !== ra.name) // only new action should be seen in regular "Big" actions place
	  : resource.resourceActions.filter(ra => ra.name === 'new' && (!action || action.name !== ra.name)); // list and new actions are special and are are always

	  const customResourceActions = resource.resourceActions.filter(ra => !['list', 'new'].includes(ra.name));
	  const title = action ? action.label : resource.name;
	  const isList = action && action.name === 'list';
	  const listAction = resource.resourceActions.find(ra => ra.name === 'list'); // styled which differs if action header is in the drawer or not

	  const cssIsRootFlex = !action.showInDrawer;
	  const cssHeaderMT = action.showInDrawer ? '' : 'lg';
	  const cssCloseIcon = action.showInDrawer ? 'ChevronRight' : 'ChevronLeft';
	  const cssActionButtonSize = action.showInDrawer ? 'sm' : 'lg';
	  const cssActionsMB = action.showInDrawer ? 'xl' : 'default';
	  const CssHComponent = action.showInDrawer ? DesignSystem.H3 : DesignSystem.H2;
	  return /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    className: DesignSystem.cssClass('ActionHeader')
	  }, action.showInDrawer ? '' : /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    flex: true,
	    flexDirection: "row",
	    px: ['default', 0]
	  }, /*#__PURE__*/React__default.createElement(Breadcrumbs, {
	    resource: resource,
	    actionName: action.name,
	    record: record
	  }), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    flexShrink: 0
	  }, customResourceActions.map(customAction => /*#__PURE__*/React__default.createElement(ActionButton$1, {
	    action: customAction,
	    key: customAction.name,
	    resourceId: resource.id
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Link, {
	    as: "span",
	    ml: "lg"
	  }, customAction.icon ? /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: customAction.icon
	  }) : null, customAction.label))))), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    display: ['block', cssIsRootFlex ? 'flex' : 'block']
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    mt: cssHeaderMT,
	    flexGrow: 1,
	    px: ['default', 0]
	  }, /*#__PURE__*/React__default.createElement(CssHComponent, {
	    mb: "lg"
	  }, !isList && listAction ? /*#__PURE__*/React__default.createElement(StyledLink$2, {
	    size: "icon",
	    to: h.resourceUrl({
	      resourceId,
	      search: window.location.search
	    }),
	    rounded: true,
	    mr: "lg",
	    type: "button"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: cssCloseIcon
	  })) : '', title, tag ? /*#__PURE__*/React__default.createElement(DesignSystem.Badge, {
	    variant: "primary",
	    ml: "default"
	  }, tag) : '')), omitActions ? '' : /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    mt: "xl",
	    mb: cssActionsMB,
	    flexShrink: 0
	  }, actions.map(headerAction => /*#__PURE__*/React__default.createElement(ActionButton$1, {
	    action: headerAction,
	    key: headerAction.name,
	    actionPerformed: actionPerformed,
	    resourceId: resource.id,
	    recordId: record && record.id
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Button, {
	    as: "span",
	    mr: action.showInDrawer ? 'default' : '',
	    ml: !action.showInDrawer ? 'default' : '',
	    mb: "default",
	    variant: headerAction.name === 'new' ? 'primary' : undefined,
	    size: cssActionButtonSize
	  }, headerAction.icon ? /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: headerAction.icon
	  }) : null, headerAction.label))), toggleFilter && /*#__PURE__*/React__default.createElement(DesignSystem.Button, {
	    onClick: toggleFilter,
	    ml: "default"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: "SettingsAdjust"
	  }), translateButton('filter', resource.id)))));
	};

	const LayoutElementRenderer = props => {
	  const {
	    layoutElement,
	    resource,
	    where,
	    record,
	    onChange
	  } = props;
	  const {
	    props: layoutProps,
	    properties: propertyNames,
	    layoutElements: innerLayoutElements,
	    component
	  } = layoutElement;
	  const {
	    children,
	    ...other
	  } = layoutProps;
	  const properties = propertyNames.map(name => resource.properties[name]);
	  const Component = DesignSystem[component];

	  if (!Component) {
	    return /*#__PURE__*/React__default.createElement(DesignSystem.MessageBox, {
	      size: "sm",
	      message: "Javascript Error",
	      variant: "danger",
	      py: "xl"
	    }, "There is no component by the name of", /*#__PURE__*/React__default.createElement(DesignSystem.Badge, {
	      size: "sm",
	      variant: "danger",
	      mx: "default"
	    }, component), "in @admin-bro/design-system. Change", /*#__PURE__*/React__default.createElement(DesignSystem.Badge, {
	      size: "sm",
	      variant: "danger",
	      mx: "default"
	    }, `@${component}`), "to available component like @Header");
	  }

	  return /*#__PURE__*/React__default.createElement(Component, other, properties.map(property => /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    flexGrow: 1,
	    key: property.name
	  }, /*#__PURE__*/React__default.createElement(BasePropertyComponent, {
	    key: property.name,
	    where: where,
	    property: property,
	    resource: resource,
	    record: record,
	    onChange: onChange
	  }))), innerLayoutElements.map((innerLayoutElement, i) => /*#__PURE__*/React__default.createElement(LayoutElementRenderer, _extends_1({}, props, {
	    // eslint-disable-next-line react/no-array-index-key
	    key: i,
	    layoutElement: innerLayoutElement
	  }))), children);
	};

	const New = props => {
	  const {
	    record: initialRecord,
	    resource,
	    action
	  } = props;
	  const {
	    record,
	    handleChange,
	    submit: handleSubmit,
	    loading
	  } = useRecord(initialRecord, resource.id);
	  const {
	    translateButton
	  } = useTranslation();
	  const history = reactRouter.useHistory();

	  const submit = event => {
	    event.preventDefault();
	    handleSubmit().then(response => {
	      if (response.data.redirectUrl) {
	        history.push(appendForceRefresh(response.data.redirectUrl));
	      } // if record has id === has been created


	      if (response.data.record.id) {
	        handleChange({
	          params: {},
	          populated: {},
	          errors: {}
	        });
	      }
	    });
	    return false;
	  };

	  return /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    as: "form",
	    onSubmit: submit,
	    flex: true,
	    flexGrow: 1,
	    flexDirection: "column"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.DrawerContent, null, (action === null || action === void 0 ? void 0 : action.showInDrawer) ? /*#__PURE__*/React__default.createElement(ActionHeader, props) : null, action.layout ? action.layout.map((layoutElement, i) => /*#__PURE__*/React__default.createElement(LayoutElementRenderer // eslint-disable-next-line react/no-array-index-key
	  , _extends_1({
	    key: i,
	    layoutElement: layoutElement
	  }, props, {
	    where: "edit",
	    onChange: handleChange,
	    record: record
	  }))) : resource.editProperties.map(property => /*#__PURE__*/React__default.createElement(BasePropertyComponent, {
	    key: property.name,
	    where: "edit",
	    onChange: handleChange,
	    property: property,
	    resource: resource,
	    record: record
	  }))), /*#__PURE__*/React__default.createElement(DesignSystem.DrawerFooter, null, /*#__PURE__*/React__default.createElement(DesignSystem.Button, {
	    variant: "primary",
	    size: "lg",
	    type: "submit",
	    "data-testid": "button-save"
	  }, loading ? /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: "Fade",
	    spin: true
	  }) : null, translateButton('save', resource.id))));
	};

	const Edit$9 = props => {
	  const {
	    record: initialRecord,
	    resource,
	    action
	  } = props;
	  const {
	    record,
	    handleChange,
	    submit: handleSubmit,
	    loading
	  } = useRecord(initialRecord, resource.id);
	  const {
	    translateButton
	  } = useTranslation();
	  const history = reactRouter.useHistory();

	  const submit = event => {
	    event.preventDefault();
	    handleSubmit().then(response => {
	      if (response.data.redirectUrl) {
	        history.push(appendForceRefresh(response.data.redirectUrl));
	      }
	    });
	    return false;
	  };

	  return /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    as: "form",
	    onSubmit: submit,
	    flex: true,
	    flexGrow: 1,
	    flexDirection: "column"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.DrawerContent, null, (action === null || action === void 0 ? void 0 : action.showInDrawer) ? /*#__PURE__*/React__default.createElement(ActionHeader, props) : null, action.layout ? action.layout.map((layoutElement, i) => /*#__PURE__*/React__default.createElement(LayoutElementRenderer // eslint-disable-next-line react/no-array-index-key
	  , _extends_1({
	    key: i,
	    layoutElement: layoutElement
	  }, props, {
	    where: "edit",
	    onChange: handleChange,
	    record: record
	  }))) : resource.editProperties.map(property => /*#__PURE__*/React__default.createElement(BasePropertyComponent, {
	    key: property.name,
	    where: "edit",
	    onChange: handleChange,
	    property: property,
	    resource: resource,
	    record: record
	  }))), /*#__PURE__*/React__default.createElement(DesignSystem.DrawerFooter, null, /*#__PURE__*/React__default.createElement(DesignSystem.Button, {
	    variant: "primary",
	    size: "lg",
	    type: "submit",
	    "data-testid": "button-save"
	  }, loading ? /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: "Fade",
	    spin: true
	  }) : null, translateButton('save', resource.id))));
	};

	/**
	 * @name ShowAction
	 * @category Actions
	 * @description Shows a given record.
	 * @component
	 * @private
	 */

	const Show$8 = props => {
	  const {
	    resource,
	    record,
	    action
	  } = props;
	  const properties = resource.showProperties;
	  return /*#__PURE__*/React__default.createElement(DesignSystem.DrawerContent, null, (action === null || action === void 0 ? void 0 : action.showInDrawer) ? /*#__PURE__*/React__default.createElement(ActionHeader, props) : null, action.layout ? action.layout.map((layoutElement, i) => /*#__PURE__*/React__default.createElement(LayoutElementRenderer // eslint-disable-next-line react/no-array-index-key
	  , _extends_1({
	    key: i,
	    layoutElement: layoutElement
	  }, props, {
	    where: "show"
	  }))) : properties.map(property => /*#__PURE__*/React__default.createElement(BasePropertyComponent, {
	    key: property.name,
	    where: "show",
	    property: property,
	    resource: resource,
	    record: record
	  })));
	};

	class SortLink extends React__default.PureComponent {
	  constructor(props) {
	    super(props);
	    this.isActive = this.isActive.bind(this);
	  }

	  isActive() {
	    const {
	      sortBy,
	      property
	    } = this.props;
	    return sortBy === property.name;
	  }

	  render() {
	    const {
	      property,
	      location,
	      direction
	    } = this.props;
	    const query = new URLSearchParams(location.search);
	    const oppositeDirection = this.isActive() && direction === 'asc' ? 'desc' : 'asc';
	    const sortedByIcon = `Caret${direction === 'asc' ? 'Up' : 'Down'}`;
	    query.set('direction', oppositeDirection);
	    query.set('sortBy', property.name);
	    return /*#__PURE__*/React__default.createElement(reactRouterDom.NavLink, {
	      to: {
	        search: query.toString()
	      },
	      className: DesignSystem.cssClass('SortLink')
	    }, property.label, this.isActive() ? /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	      icon: sortedByIcon,
	      color: "primary100",
	      ml: "default"
	    }) : '');
	  }

	}

	var SortLink$1 = reactRouterDom.withRouter(SortLink);

	const PropertyHeader = props => {
	  const {
	    property,
	    titleProperty,
	    display
	  } = props;
	  const isMain = property.name === titleProperty.name;
	  return /*#__PURE__*/React__default.createElement(DesignSystem.TableCell, {
	    className: isMain ? 'main' : undefined,
	    display: display
	  }, property.isSortable ? /*#__PURE__*/React__default.createElement(SortLink$1, props) : property.label);
	};

	const display = isTitle => [isTitle ? 'table-cell' : 'none', isTitle ? 'table-cell' : 'none', 'table-cell', 'table-cell'];
	/**
	 * Prints `thead` section for table with records.
	 *
	 * ```
	 * import { RecordsTableHeader } from 'admin-bro'
	 * ```
	 *
	 * @component
	 * @subcategory Application
	 * @example <caption>List with 2 properties</caption>
	 * const properties = [{
	 *   label: 'First Name',
	 *   name: 'firstName',
	 *   isSortable: true,
	 * }, {
	 *   label: 'Last Name',
	 *   name: 'lastName',
	 * }]
	 * return (
	 * <Box py="xl">
	 *   <Table>
	 *    <RecordsTableHeader
	 *      properties={properties}
	 *      titleProperty={properties[0]}
	 *      sortBy={'firstName'}
	 *      direction={'asc'}
	 *    />
	 *    <TableBody>
	 *      <TableRow>
	 *        <TableCell>John</TableCell>
	 *        <TableCell>Doe</TableCell>
	 *        <TableCell></TableCell>
	 *      </TableRow>
	 *      <TableRow>
	 *        <TableCell>Max</TableCell>
	 *        <TableCell>Kodaly</TableCell>
	 *        <TableCell></TableCell>
	 *      </TableRow>
	 *    </TableBody>
	 *   </Table>
	 * </Box>
	 * )
	 */

	const RecordsTableHeader = props => {
	  const {
	    titleProperty,
	    properties,
	    sortBy,
	    direction,
	    onSelectAll,
	    selectedAll
	  } = props;
	  return /*#__PURE__*/React__default.createElement(DesignSystem.TableHead, null, /*#__PURE__*/React__default.createElement(DesignSystem.TableRow, null, /*#__PURE__*/React__default.createElement(DesignSystem.TableCell, null, onSelectAll ? /*#__PURE__*/React__default.createElement(DesignSystem.CheckBox, {
	    style: {
	      marginLeft: 5
	    },
	    onChange: () => onSelectAll(),
	    checked: selectedAll
	  }) : null), properties.map(property => /*#__PURE__*/React__default.createElement(PropertyHeader, {
	    display: display(property.isTitle),
	    key: property.name,
	    titleProperty: titleProperty,
	    property: property,
	    sortBy: sortBy,
	    direction: direction
	  })), /*#__PURE__*/React__default.createElement(DesignSystem.TableCell, {
	    key: "actions",
	    style: {
	      width: 80
	    }
	  })));
	};

	const RecordInList = props => {
	  const {
	    resource,
	    record: recordFromProps,
	    actionPerformed,
	    isLoading,
	    onSelect,
	    isSelected
	  } = props;
	  const [record, setRecord] = React.useState(recordFromProps);
	  const history = reactRouterDom.useHistory();
	  React.useEffect(() => {
	    setRecord(recordFromProps);
	  }, [recordFromProps]);
	  const {
	    recordActions
	  } = record;
	  const show = record.recordActions.find(({
	    name
	  }) => name === 'show');
	  const edit = record.recordActions.find(({
	    name
	  }) => name === 'edit');
	  const actionName = show && show.name || edit && edit.name;

	  const handleClick = event => {
	    const h = new ViewHelpers();
	    const targetTagName = event.target.tagName.toLowerCase();

	    if (actionName && targetTagName !== 'a' && targetTagName !== 'button' && targetTagName !== 'svg') {
	      const actionUrl = h.recordActionUrl({
	        resourceId: resource.id,
	        recordId: record.id,
	        actionName,
	        search: window.location.search
	      });
	      history.push(actionUrl);
	    }
	  };

	  const handleActionPerformed = React.useCallback(actionResponse => {
	    if (actionResponse.record && !actionResponse.redirectUrl) {
	      setRecord(mergeRecordResponse(record, actionResponse));
	    } else if (actionPerformed) {
	      actionPerformed(actionResponse);
	    }
	  }, [actionPerformed]);
	  return /*#__PURE__*/React__default.createElement(DesignSystem.TableRow, {
	    onClick: event => handleClick(event),
	    "data-id": record.id
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.TableCell, {
	    className: isSelected ? 'selected' : 'not-selected'
	  }, onSelect && record.bulkActions.length ? /*#__PURE__*/React__default.createElement(DesignSystem.CheckBox, {
	    onChange: () => onSelect(record),
	    checked: isSelected
	  }) : null), resource.listProperties.map(property => /*#__PURE__*/React__default.createElement(DesignSystem.TableCell, {
	    style: {
	      cursor: 'pointer'
	    },
	    key: property.name,
	    "data-property-name": property.name,
	    display: display(property.isTitle)
	  }, isLoading ? /*#__PURE__*/React__default.createElement(DesignSystem.Placeholder, {
	    style: {
	      height: 14
	    }
	  }) : /*#__PURE__*/React__default.createElement(BasePropertyComponent, {
	    key: property.name,
	    where: "list",
	    property: property,
	    resource: resource,
	    record: record
	  }))), /*#__PURE__*/React__default.createElement(DesignSystem.TableCell, {
	    key: "options"
	  }, recordActions.length ? /*#__PURE__*/React__default.createElement(DesignSystem.DropDown, null, /*#__PURE__*/React__default.createElement(DesignSystem.DropDownTrigger, {
	    py: "sm",
	    px: "xl",
	    "data-testid": "actions-dropdown"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: "OverflowMenuHorizontal",
	    color: "grey100"
	  })), /*#__PURE__*/React__default.createElement(DesignSystem.DropDownMenu, null, recordActions.map(action => /*#__PURE__*/React__default.createElement(DesignSystem.DropDownItem, {
	    key: action.name
	  }, /*#__PURE__*/React__default.createElement(ActionButton$1, {
	    action: action,
	    resourceId: resource.id,
	    recordId: record.id,
	    actionPerformed: handleActionPerformed
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: action.icon
	  }), action.label))))) : ''));
	};

	const NoRecordsOriginal = props => {
	  const {
	    resource
	  } = props;
	  const h = new ViewHelpers();
	  const {
	    translateButton,
	    translateMessage
	  } = useTranslation();
	  const canCreate = resource.resourceActions.find(a => a.name === 'new');
	  const newAction = h.resourceActionUrl({
	    resourceId: resource.id,
	    actionName: 'new'
	  });
	  return /*#__PURE__*/React__default.createElement(DesignSystem.InfoBox, {
	    title: translateMessage('noRecords', resource.id)
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Text, null, translateMessage('noRecordsInResource', resource.id)), canCreate ? /*#__PURE__*/React__default.createElement(DesignSystem.Text, {
	    mt: "xl"
	  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
	    to: newAction
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Button, {
	    variant: "primary",
	    as: "span"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: "Add"
	  }), translateButton('createFirstRecord', resource.id)))) : '');
	}; // This hack prevents rollup from throwing an error


	const NoRecords = allowOverride(NoRecordsOriginal, 'NoRecords');

	const getBulkActionsFromRecords = records => {
	  const actions = Object.values(records.reduce((memo, record) => ({ ...memo,
	    ...record.bulkActions.reduce((actionsMemo, action) => ({ ...actionsMemo,
	      [action.name]: action
	    }), {})
	  }), {}));
	  return actions;
	};

	const SelectedRecords = props => {
	  const {
	    resource,
	    selectedRecords
	  } = props;
	  const {
	    translateLabel
	  } = useTranslation();

	  if (!selectedRecords || !selectedRecords.length) {
	    return null;
	  }

	  const bulkActions = getBulkActionsFromRecords(selectedRecords);
	  return /*#__PURE__*/React__default.createElement(DesignSystem.TableCaption, null, /*#__PURE__*/React__default.createElement(DesignSystem.Text, {
	    as: "span",
	    mr: "lg"
	  }, translateLabel('selectedRecords', resource.id, {
	    selected: selectedRecords.length
	  })), bulkActions.map(action => /*#__PURE__*/React__default.createElement(ActionButton$1, {
	    action: action,
	    key: action.name,
	    resourceId: resource.id,
	    recordIds: selectedRecords.map(records => records.id)
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Button, {
	    variant: "text",
	    size: "sm"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: action.icon
	  }), action.label))));
	};

	const RecordsTable = props => {
	  const {
	    resource,
	    records,
	    actionPerformed,
	    sortBy,
	    direction,
	    isLoading,
	    onSelect,
	    selectedRecords,
	    onSelectAll
	  } = props;

	  if (!records.length) {
	    if (isLoading) {
	      return /*#__PURE__*/React__default.createElement(DesignSystem.Loader, null);
	    }

	    return /*#__PURE__*/React__default.createElement(NoRecords, {
	      resource: resource
	    });
	  }

	  const selectedAll = selectedRecords && !!records.find(record => selectedRecords.find(selected => selected.id === record.id));
	  const recordsHaveBulkAction = !!records.find(record => record.bulkActions.length);
	  return /*#__PURE__*/React__default.createElement(DesignSystem.Table, null, /*#__PURE__*/React__default.createElement(SelectedRecords, {
	    resource: resource,
	    selectedRecords: selectedRecords
	  }), /*#__PURE__*/React__default.createElement(RecordsTableHeader, {
	    properties: resource.listProperties,
	    titleProperty: resource.titleProperty,
	    direction: direction,
	    sortBy: sortBy,
	    onSelectAll: recordsHaveBulkAction ? onSelectAll : undefined,
	    selectedAll: selectedAll
	  }), /*#__PURE__*/React__default.createElement(DesignSystem.TableBody, null, records.map(record => /*#__PURE__*/React__default.createElement(RecordInList, {
	    record: record,
	    resource: resource,
	    key: record.id,
	    actionPerformed: actionPerformed,
	    isLoading: isLoading,
	    onSelect: onSelect,
	    isSelected: selectedRecords && !!selectedRecords.find(selected => selected.id === record.id)
	  }))));
	};

	const List$7 = ({
	  resource,
	  setTag
	}) => {
	  const {
	    records,
	    loading,
	    direction,
	    sortBy,
	    page,
	    total,
	    fetchData,
	    perPage
	  } = useRecords(resource.id);
	  const {
	    selectedRecords,
	    handleSelect,
	    handleSelectAll,
	    setSelectedRecords
	  } = useSelectedRecords(records);
	  const location = reactRouter.useLocation();
	  const history = reactRouter.useHistory();
	  React.useEffect(() => {
	    if (setTag) {
	      setTag(total.toString());
	    }
	  }, [total]);
	  React.useEffect(() => {
	    setSelectedRecords([]);
	  }, [resource.id]);
	  React.useEffect(() => {
	    const search = new URLSearchParams(location.search);

	    if (search.get(REFRESH_KEY)) {
	      setSelectedRecords([]);
	    }
	  }, [location.search]);

	  const handleActionPerformed = () => fetchData();

	  const handlePaginationChange = pageNumber => {
	    const search = new URLSearchParams(location.search);
	    search.set('page', pageNumber.toString());
	    history.push({
	      search: search.toString()
	    });
	  };

	  return /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    variant: "white"
	  }, /*#__PURE__*/React__default.createElement(RecordsTable, {
	    resource: resource,
	    records: records,
	    actionPerformed: handleActionPerformed,
	    onSelect: handleSelect,
	    onSelectAll: handleSelectAll,
	    selectedRecords: selectedRecords,
	    direction: direction,
	    sortBy: sortBy,
	    isLoading: loading
	  }), /*#__PURE__*/React__default.createElement(DesignSystem.Text, {
	    mt: "xl",
	    textAlign: "center"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Pagination, {
	    page: page,
	    perPage: perPage,
	    total: total,
	    onChange: handlePaginationChange
	  })));
	};

	/**
	 * @name ShowAction
	 * @category Actions
	 * @description Shows a given record.
	 * @component
	 * @private
	 */

	const BulkDelete = props => {
	  const {
	    resource,
	    records,
	    action,
	    addNotice,
	    history
	  } = props;
	  const [loading, setLoading] = React.useState(false);
	  const {
	    translateMessage,
	    translateButton
	  } = useTranslation();

	  if (!records) {
	    return /*#__PURE__*/React__default.createElement(DesignSystem.Text, null, translateMessage('pickSomeFirstToRemove', resource.id));
	  }

	  const handleClick = () => {
	    const api = new ApiClient();
	    setLoading(true);
	    const recordIds = records.map(r => r.id);
	    api.bulkAction({
	      resourceId: resource.id,
	      actionName: action.name,
	      recordIds,
	      method: 'post'
	    }).then(response => {
	      setLoading(false);

	      if (response.data.notice) {
	        addNotice(response.data.notice);
	      }

	      if (response.data.redirectUrl) {
	        const search = new URLSearchParams(window.location.search); // bulk function have recordIds in the URL so it has to be stripped before redirect

	        search.delete('recordIds');
	        history.push(appendForceRefresh(response.data.redirectUrl, search.toString()));
	      }
	    }).catch(error => {
	      setLoading(false);
	      addNotice({
	        message: translateMessage('bulkDeleteError', resource.id),
	        type: 'error'
	      });
	      throw error;
	    });
	  };

	  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DesignSystem.DrawerContent, null, (action === null || action === void 0 ? void 0 : action.showInDrawer) ? /*#__PURE__*/React__default.createElement(ActionHeader, _extends_1({
	    omitActions: true
	  }, props)) : null, /*#__PURE__*/React__default.createElement(DesignSystem.MessageBox, {
	    mb: "xxl",
	    variant: "danger",
	    message: translateMessage('theseRecordsWillBeRemoved', resource.id, {
	      count: records.length
	    })
	  }), /*#__PURE__*/React__default.createElement(DesignSystem.Table, null, /*#__PURE__*/React__default.createElement(DesignSystem.TableBody, null, records.map(record => /*#__PURE__*/React__default.createElement(DesignSystem.TableRow, {
	    key: record.id
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.TableCell, null, /*#__PURE__*/React__default.createElement(BasePropertyComponent, {
	    where: "list",
	    property: resource.titleProperty,
	    resource: resource,
	    record: record
	  }))))))), /*#__PURE__*/React__default.createElement(DesignSystem.DrawerFooter, null, /*#__PURE__*/React__default.createElement(DesignSystem.Button, {
	    variant: "primary",
	    size: "lg",
	    onClick: handleClick
	  }, loading ? /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: "Fade",
	    spin: true
	  }) : null, translateButton('confirmRemovalMany', resource.id, {
	    count: records.length
	  }))));
	};

	var bulkDelete = withNotice(reactRouter.withRouter(BulkDelete));

	var actions = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'new': New,
		edit: Edit$9,
		show: Show$8,
		list: List$7,
		bulkDelete: bulkDelete
	});

	/**
	 * Component which renders all the default and custom actions for both the Resource and the Record.
	 *
	 * It passes all props down to the actual Action component.
	 *
	 * Example of creating your own actions:
	 * ```
	 * // AdminBro options
	 * const AdminBroOptions = {
	 *   resources: [
	 *      resource,
	 *      options: {
	 *        actions: {
	 *           myNewAction: {
	 *             label: 'amazing action',
	 *             icon: 'Add',
	 *             inVisible: (resource, record) => record.param('email') !== '',
	 *             actionType: 'record',
	 *             component: AdminBro.bundle('./my-new-action'),
	 *             handler: (request, response, data) => {
	 *               return {
	 *                  ...
	 *               }
	 *             }
	 *           }
	 *        }
	 *      }
	 *   ]
	 * }
	 * ```
	 *
	 * ```
	 * // ./my-new-action.jsx
	 * import { Box } from 'admin-bro'
	 *
	 * const MyNewAction = (props) => {
	 *   const { resource, action, record } = props
	 *   // do something with the props and render action
	 *   return (
	 *     <Box>Some Action Content</Box>
	 *   )
	 * }
	 * ```
	 *
	 * @component
	 * @name BaseActionComponent
	 * @subcategory Application
	 */
	const BaseActionComponent = props => {
	  const {
	    resource,
	    action,
	    record,
	    records,
	    setTag
	  } = props;
	  const documentationLink = [DOCS, 'BaseAction.html'].join('/');
	  const {
	    translateMessage
	  } = useTranslation();
	  let Action = actions[action.name];

	  if (action.component) {
	    Action = AdminBro.UserComponents[action.component];
	  }

	  if (Action) {
	    return /*#__PURE__*/React__default.createElement(ErrorBoundary, null, /*#__PURE__*/React__default.createElement(Action, {
	      action: action,
	      resource: resource,
	      record: record,
	      records: records,
	      setTag: setTag
	    }));
	  }

	  return Action || /*#__PURE__*/React__default.createElement(DesignSystem.MessageBox, {
	    variant: "danger"
	  }, translateMessage('noActionComponent'), /*#__PURE__*/React__default.createElement(reactI18next.Trans, {
	    key: "messages.buttons.seeTheDocumentation"
	  }, "See:", /*#__PURE__*/React__default.createElement(DesignSystem.Link, {
	    ml: "default",
	    href: documentationLink
	  }, "the documentation")));
	};

	/**
	 * @class
	 * Prints error message
	 *
	 * @component
	 * @private
	 * @example
	 * return (
	 * <ErrorMessageBox title={'Some error'}>
	 *   <p>Text below the title</p>
	 * </ErrorMessageBox>
	 * )
	 */
	const ErrorMessageBox = props => {
	  const {
	    children,
	    title,
	    testId
	  } = props;
	  return /*#__PURE__*/React__default.createElement(DesignSystem.MessageBox, {
	    "data-testid": testId,
	    message: title
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Text, null, children));
	};

	const NoResourceError = props => {
	  const {
	    resourceId
	  } = props;
	  const {
	    translateMessage
	  } = useTranslation();
	  return /*#__PURE__*/React__default.createElement(DesignSystem.MessageBox, {
	    message: "404 - PAGE NOT FOUND",
	    "data-testid": "NoResourceError",
	    variant: "info",
	    m: "xxl"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Text, null, translateMessage('error404Resource', resourceId, {
	    resourceId
	  })));
	};

	const NoActionError = props => {
	  const {
	    resourceId,
	    actionName
	  } = props;
	  const {
	    translateMessage
	  } = useTranslation();
	  return /*#__PURE__*/React__default.createElement(DesignSystem.MessageBox, {
	    message: "404 - PAGE NOT FOUND",
	    "data-testid": "NoActionError",
	    variant: "info",
	    m: "xxl"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Text, null, translateMessage('error404Action', resourceId, {
	    resourceId,
	    actionName
	  })));
	};

	const NoRecordError = props => {
	  const {
	    resourceId,
	    recordId
	  } = props;
	  const {
	    translateMessage
	  } = useTranslation();
	  return /*#__PURE__*/React__default.createElement(DesignSystem.MessageBox, {
	    message: "404 - PAGE NOT FOUND",
	    "data-testid": "NoRecordError",
	    variant: "info",
	    m: "xxl"
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Text, null, translateMessage('error404Record', resourceId, {
	    resourceId,
	    recordId
	  })));
	};

	const StyledWrapper = styled__default(DesignSystem.Box).withConfig({
	  displayName: "wrapper__StyledWrapper",
	  componentId: "gd2y70-0"
	})(["& ", "{background:", ";padding:", ";overflow:visible;}& ", "{background:", ";padding:0 ", " ", ";}"], DesignSystem.DrawerContent, ({
	  theme
	}) => theme.colors.white, ({
	  theme
	}) => theme.space.xxl, DesignSystem.DrawerFooter, ({
	  theme
	}) => theme.colors.white, ({
	  theme
	}) => theme.space.xxl, ({
	  theme
	}) => theme.space.xxl);

	const Wrapper$1 = props => {
	  // eslint-disable-next-line @typescript-eslint/no-unused-vars
	  const {
	    children,
	    variant,
	    color,
	    ...rest
	  } = props;
	  return /*#__PURE__*/React__default.createElement(StyledWrapper, _extends_1({}, rest, {
	    variant: "grey",
	    mx: "auto"
	  }), children);
	};

	const parseQuery = location => {
	  const filter = {};
	  const query = new URLSearchParams(location.search);

	  for (const entry of query.entries()) {
	    const [key, value] = entry;

	    if (key.match('filters.')) {
	      filter[key.replace('filters.', '')] = value;
	    }
	  }

	  return filter;
	};

	const FilterContainer = props => {
	  const {
	    resource,
	    isVisible,
	    toggleFilter
	  } = props;
	  const properties = resource.filterProperties;
	  const location = reactRouterDom.useLocation();
	  const [filter, setFilter] = React.useState(parseQuery(location));
	  const match = reactRouterDom.useRouteMatch();
	  const history = reactRouterDom.useHistory();
	  const {
	    translateLabel,
	    translateButton
	  } = useTranslation();
	  React.useEffect(() => setFilter({}), [match.params.resourceId]);

	  const handleSubmit = event => {
	    event.preventDefault();
	    const search = new URLSearchParams(window.location.search);
	    Object.keys(filter).forEach(key => {
	      if (filter[key] !== '') {
	        search.set(`filters.${key}`, filter[key]);
	      } else {
	        search.delete(`filters.${key}`);
	      }
	    });
	    search.set('page', '1');
	    history.push(`${history.location.pathname}?${search.toString()}`);
	    return false;
	  };

	  const resetFilter = event => {
	    event.preventDefault();
	    const filteredSearch = new URLSearchParams();
	    const search = new URLSearchParams(window.location.search);

	    for (const key of search.keys()) {
	      if (!key.match('filters.')) {
	        filteredSearch.set(key, search.get(key));
	      }
	    }

	    const query = filteredSearch.toString() === '' ? `?${filteredSearch.toString()}` : '';
	    history.push(history.location.pathname + query);
	    setFilter({});
	  };

	  const handleChange = (propertyName, value) => {
	    if (propertyName.params) {
	      throw new Error('you can not pass RecordJSON to filters');
	    }

	    setFilter({ ...filter,
	      [propertyName]: value
	    });
	  };

	  return /*#__PURE__*/React__default.createElement(DesignSystem.Drawer, {
	    variant: "filter",
	    isHidden: !isVisible,
	    as: "form",
	    onSubmit: handleSubmit
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.DrawerContent, null, /*#__PURE__*/React__default.createElement(DesignSystem.H3, null, /*#__PURE__*/React__default.createElement(DesignSystem.Button, {
	    type: "button",
	    size: "icon",
	    rounded: true,
	    mr: "lg",
	    onClick: () => toggleFilter()
	  }, /*#__PURE__*/React__default.createElement(DesignSystem.Icon, {
	    icon: "ChevronRight",
	    color: "white"
	  })), translateLabel('filters', resource.id)), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    my: "x3"
	  }, properties.map(property => /*#__PURE__*/React__default.createElement(BasePropertyComponent, {
	    key: property.name,
	    where: "filter",
	    onChange: handleChange,
	    property: property,
	    filter: filter,
	    resource: resource
	  })))), /*#__PURE__*/React__default.createElement(DesignSystem.DrawerFooter, null, /*#__PURE__*/React__default.createElement(DesignSystem.Button, {
	    variant: "primary",
	    size: "lg"
	  }, translateButton('applyChanges', resource.id)), /*#__PURE__*/React__default.createElement(DesignSystem.Button, {
	    variant: "text",
	    size: "lg",
	    onClick: resetFilter,
	    type: "button",
	    color: "white"
	  }, translateButton('resetFilter', resource.id))));
	};

	var AppComponents = /*#__PURE__*/Object.freeze({
		__proto__: null,
		ActionButton: ActionButton$1,
		ActionHeader: ActionHeader,
		BaseActionComponent: BaseActionComponent,
		Breadcrumbs: Breadcrumbs,
		DefaultDashboard: Dashboard,
		ErrorBoundary: ErrorBoundary,
		Filter: FilterContainer,
		LoggedIn: LoggedIn$1,
		Notice: Notice,
		PropertyHeader: PropertyHeader,
		RecordInList: RecordInList,
		RecordsTableHeader: RecordsTableHeader,
		RecordsTable: RecordsTable,
		TopBar: TopBar,
		Version: Version,
		SortLink: SortLink$1,
		SidebarResourceSection: SidebarResourceSection,
		SidebarParent: SidebarParent,
		Sidebar: Sidebar,
		groupResources: groupResources,
		SidebarResource: SidebarResource$1,
		NoRecords: NoRecords
	});

	/**
	 * @alias DrawerPortalProps
	 * @memberof DrawerPortal
	 */

	const DRAWER_PORTAL_ID = 'drawerPortal';
	/**
	 * Shows all of its children in a Drawer on the right.
	 * Instead of rendering it's own {@link Drawer} component it reuses
	 * the global Drawer via React Portal.
	 *
	 * ### Usage
	 *
	 * ```
	 * import { DrawerPortal } from 'admin-bro'
	 * ```
	 *
	 * @component
	 * @subcategory Application
	 */

	const DrawerPortal = ({
	  children,
	  width
	}) => {
	  const [drawerElement, setDrawerElement] = React.useState(window.document.getElementById(DRAWER_PORTAL_ID));

	  if (!drawerElement && window) {
	    const innerWrapper = window.document.createElement('div');
	    const DrawerWrapper = /*#__PURE__*/React__default.createElement(styled.ThemeProvider, {
	      theme: window.THEME
	    }, /*#__PURE__*/React__default.createElement(DesignSystem.Drawer, {
	      id: DRAWER_PORTAL_ID,
	      className: "hidden"
	    }));
	    window.document.body.appendChild(innerWrapper);
	    reactDom.render(DrawerWrapper, innerWrapper, () => {
	      setDrawerElement(window.document.getElementById(DRAWER_PORTAL_ID));
	    });
	  }

	  React.useEffect(() => {
	    if (drawerElement) {
	      drawerElement.classList.remove('hidden');

	      if (width) {
	        drawerElement.style.width = Array.isArray(width) ? width[0].toString() : width.toString();
	      }

	      return () => {
	        drawerElement.style.width = DesignSystem.DEFAULT_DRAWER_WIDTH;
	        drawerElement.classList.add('hidden');
	      };
	    }

	    return () => undefined;
	  }, [drawerElement]);

	  if (!drawerElement) {
	    return null;
	  }

	  return /*#__PURE__*/reactDom.createPortal(children, drawerElement);
	};

	const api$2 = new ApiClient();

	const RecordAction = () => {
	  const [record, setRecord] = React.useState();
	  const [loading, setLoading] = React.useState(true);
	  const match = reactRouter.useRouteMatch();
	  const resources = reactRedux.useSelector(state => state.resources);
	  const addNotice = useNotice();
	  const {
	    translateMessage
	  } = useTranslation();
	  const {
	    actionName,
	    recordId,
	    resourceId
	  } = match.params;
	  const resource = resources.find(r => r.id === resourceId);
	  const action = record && record.recordActions.find(r => r.name === actionName);

	  const fetchRecord = () => {
	    setLoading(true);
	    api$2.recordAction(match.params).then(response => {
	      setLoading(false);
	      setRecord(response.data.record);
	    }).catch(error => {
	      addNotice({
	        message: translateMessage('errorFetchingRecord', resourceId),
	        type: 'error'
	      });
	      throw error;
	    });
	  };

	  React.useEffect(() => {
	    fetchRecord();
	  }, [actionName, recordId, resourceId]);
	  const handleActionPerformed = React.useCallback((oldRecord, response) => {
	    if (response.record) {
	      setRecord(mergeRecordResponse(oldRecord, response));
	    } else {
	      fetchRecord();
	    }
	  }, [fetchRecord]);

	  if (!resource) {
	    return /*#__PURE__*/React__default.createElement(NoResourceError, {
	      resourceId: resourceId
	    });
	  }

	  if (loading) {
	    const actionFromResource = resource.actions.find(r => r.name === actionName);
	    return (actionFromResource === null || actionFromResource === void 0 ? void 0 : actionFromResource.showInDrawer) ? /*#__PURE__*/React__default.createElement(DrawerPortal, null, /*#__PURE__*/React__default.createElement(DesignSystem.Loader, null)) : /*#__PURE__*/React__default.createElement(DesignSystem.Loader, null);
	  }

	  if (!action) {
	    return /*#__PURE__*/React__default.createElement(NoActionError, {
	      resourceId: resourceId,
	      actionName: actionName
	    });
	  }

	  if (!record) {
	    return /*#__PURE__*/React__default.createElement(NoRecordError, {
	      resourceId: resourceId,
	      recordId: recordId
	    });
	  }

	  if (action.showInDrawer) {
	    return /*#__PURE__*/React__default.createElement(DrawerPortal, {
	      width: action.containerWidth
	    }, /*#__PURE__*/React__default.createElement(BaseActionComponent, {
	      action: action,
	      resource: resource,
	      record: record
	    }));
	  }

	  return /*#__PURE__*/React__default.createElement(Wrapper$1, {
	    width: action.containerWidth
	  }, /*#__PURE__*/React__default.createElement(ActionHeader, {
	    resource: resource,
	    action: action,
	    record: record,
	    actionPerformed: response => handleActionPerformed(record, response)
	  }), /*#__PURE__*/React__default.createElement(BaseActionComponent, {
	    action: action,
	    resource: resource,
	    record: record
	  }));
	};

	const ResourceAction = props => {
	  const {
	    resources,
	    match
	  } = props;
	  const {
	    resourceId,
	    actionName
	  } = match.params;
	  const resource = resources.find(r => r.id === resourceId);

	  if (!resource) {
	    return /*#__PURE__*/React__default.createElement(NoResourceError, {
	      resourceId: resourceId
	    });
	  }

	  const action = resource.resourceActions.find(r => r.name === actionName);

	  if (!action) {
	    return /*#__PURE__*/React__default.createElement(NoActionError, {
	      resourceId: resourceId,
	      actionName: actionName
	    });
	  }

	  if (action.showInDrawer) {
	    return /*#__PURE__*/React__default.createElement(DrawerPortal, {
	      width: action.containerWidth
	    }, /*#__PURE__*/React__default.createElement(BaseActionComponent, {
	      action: action,
	      resource: resource
	    }));
	  }

	  return /*#__PURE__*/React__default.createElement(Wrapper$1, {
	    width: action.containerWidth
	  }, /*#__PURE__*/React__default.createElement(ActionHeader, {
	    resource: resource,
	    action: action
	  }), /*#__PURE__*/React__default.createElement(BaseActionComponent, {
	    action: action,
	    resource: resource
	  }));
	};

	const mapStateToProps$2 = state => ({
	  resources: state.resources
	});

	var ResourceAction$1 = reactRedux.connect(mapStateToProps$2)(ResourceAction);

	const api$3 = new ApiClient();

	const BulkAction = () => {
	  const resources = reactRedux.useSelector(state => state.resources);
	  const match = reactRouter.useRouteMatch();
	  const [records, setRecords] = React.useState([]);
	  const [loading, setLoading] = React.useState(false);
	  const {
	    translateMessage
	  } = useTranslation();
	  const addNotice = useNotice();
	  const location = reactRouter.useLocation();
	  const {
	    resourceId,
	    actionName
	  } = match.params;
	  const resource = resources.find(r => r.id === resourceId);

	  const fetchRecords = () => {
	    const recordIdsString = new URLSearchParams(location.search).get('recordIds');
	    const recordIds = recordIdsString ? recordIdsString.split(',') : [];
	    setLoading(true);
	    return api$3.bulkAction({
	      resourceId,
	      recordIds,
	      actionName
	    }).then(response => {
	      setLoading(false);
	      setRecords(response.data.records);
	    }).catch(error => {
	      setLoading(false);
	      addNotice({
	        message: translateMessage('errorFetchingRecords', resourceId),
	        type: 'error'
	      });
	      throw error;
	    });
	  };

	  React.useEffect(() => {
	    fetchRecords();
	  }, [match.params.resourceId, match.params.actionName]);

	  if (!resource) {
	    return /*#__PURE__*/React__default.createElement(NoResourceError, {
	      resourceId: resourceId
	    });
	  }

	  if (!records && !loading) {
	    return /*#__PURE__*/React__default.createElement(ErrorMessageBox, {
	      title: "No records"
	    }, /*#__PURE__*/React__default.createElement("p", null, translateMessage('noRecordsSelected', resourceId)));
	  }

	  const action = getBulkActionsFromRecords(records || []).find(r => r.name === actionName);

	  if (loading) {
	    const actionFromResource = resource.actions.find(r => r.name === actionName);
	    return (actionFromResource === null || actionFromResource === void 0 ? void 0 : actionFromResource.showInDrawer) ? /*#__PURE__*/React__default.createElement(DrawerPortal, null, /*#__PURE__*/React__default.createElement(DesignSystem.Loader, null)) : /*#__PURE__*/React__default.createElement(DesignSystem.Loader, null);
	  }

	  if (!action) {
	    return /*#__PURE__*/React__default.createElement(NoActionError, {
	      resourceId: resourceId,
	      actionName: actionName
	    });
	  }

	  if (action.showInDrawer) {
	    return /*#__PURE__*/React__default.createElement(DrawerPortal, {
	      width: action.containerWidth
	    }, /*#__PURE__*/React__default.createElement(BaseActionComponent, {
	      action: action,
	      resource: resource,
	      records: records
	    }));
	  }

	  return /*#__PURE__*/React__default.createElement(Wrapper$1, {
	    width: action.containerWidth
	  }, !(action === null || action === void 0 ? void 0 : action.showInDrawer) ? /*#__PURE__*/React__default.createElement(ActionHeader, {
	    resource: resource,
	    action: action
	  }) : '', /*#__PURE__*/React__default.createElement(BaseActionComponent, {
	    action: action,
	    resource: resource,
	    records: records
	  }));
	};

	class Page extends React__default.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      isClient: false
	    };
	  }

	  componentDidMount() {
	    this.setState({
	      isClient: true
	    });
	  }

	  render() {
	    const {
	      pages,
	      match
	    } = this.props;
	    const {
	      params
	    } = match;
	    const {
	      pageName
	    } = params;
	    const {
	      isClient
	    } = this.state;
	    const currentPage = pages.find(page => page.name === pageName);

	    if (!currentPage) {
	      return /*#__PURE__*/React__default.createElement(ErrorMessageBox, {
	        title: "There is no page of given name"
	      }, /*#__PURE__*/React__default.createElement("p", null, "Page:", /*#__PURE__*/React__default.createElement("b", null, ` "${pageName}" `), "does not exist."));
	    }

	    const Component = AdminBro.UserComponents[currentPage.component];

	    if (!Component || !isClient) {
	      return /*#__PURE__*/React__default.createElement(ErrorMessageBox, {
	        title: "No component specified"
	      }, /*#__PURE__*/React__default.createElement("p", null, "You have to specify component which will render this Page"));
	    }

	    return /*#__PURE__*/React__default.createElement(ErrorBoundary, null, /*#__PURE__*/React__default.createElement(Component, null));
	  }

	}

	const mapStateToProps$3 = state => ({
	  pages: state.pages
	});

	var Page$1 = reactRedux.connect(mapStateToProps$3)(Page);

	var queryHasFilter = (queryString => {
	  const query = new URLSearchParams(queryString);

	  for (const key of query.keys()) {
	    if (key.match('filters.')) {
	      return true;
	    }
	  }

	  return false;
	});

	const getAction = resource => {
	  const h = new ViewHelpers();
	  const resourceId = ':resourceId';
	  const actionName = ':actionName';
	  const recordId = ':recordId';
	  const recordActionUrl = h.recordActionUrl({
	    resourceId,
	    recordId,
	    actionName
	  });
	  const resourceActionUrl = h.resourceActionUrl({
	    resourceId,
	    actionName
	  });
	  const bulkActionUrl = h.bulkActionUrl({
	    resourceId,
	    actionName
	  });
	  const resourceActionMatch = reactRouterDom.useRouteMatch(resourceActionUrl);
	  const recordActionMatch = reactRouterDom.useRouteMatch(recordActionUrl);
	  const bulkActionMatch = reactRouterDom.useRouteMatch(bulkActionUrl);
	  const action = (resourceActionMatch === null || resourceActionMatch === void 0 ? void 0 : resourceActionMatch.params.actionName) || (recordActionMatch === null || recordActionMatch === void 0 ? void 0 : recordActionMatch.params.actionName) || (bulkActionMatch === null || bulkActionMatch === void 0 ? void 0 : bulkActionMatch.params.actionName);
	  return action ? resource.actions.find(a => a.name === action) : undefined;
	};

	const ResourceAction$2 = props => {
	  const {
	    resources,
	    match,
	    location
	  } = props;
	  const {
	    resourceId
	  } = match.params;
	  const [filterVisible, setFilerVisible] = React.useState(queryHasFilter(location.search));
	  const [tag, setTag] = React.useState('');
	  const resource = resources.find(r => r.id === resourceId);

	  if (!resource) {
	    return /*#__PURE__*/React__default.createElement(NoResourceError, {
	      resourceId: resourceId
	    });
	  }

	  const realEndAction = getAction(resource);

	  if (realEndAction && !realEndAction.showInDrawer) {
	    return null;
	  }

	  const listActionName = 'list';
	  const listAction = resource.resourceActions.find(r => r.name === listActionName);

	  if (!listAction) {
	    return /*#__PURE__*/React__default.createElement(NoActionError, {
	      resourceId: resourceId,
	      actionName: listActionName
	    });
	  }

	  const toggleFilter = listAction.showFilter ? () => setFilerVisible(!filterVisible) : undefined;
	  return /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    variant: "grey",
	    width: listAction.containerWidth,
	    mx: "auto"
	  }, /*#__PURE__*/React__default.createElement(ActionHeader, {
	    resource: resource,
	    action: listAction,
	    tag: tag,
	    toggleFilter: toggleFilter
	  }), /*#__PURE__*/React__default.createElement(BaseActionComponent, {
	    action: listAction,
	    resource: resource,
	    setTag: setTag
	  }), listAction.showFilter ? /*#__PURE__*/React__default.createElement(FilterContainer, {
	    resource: resource,
	    isVisible: filterVisible,
	    toggleFilter: () => {
	      setFilerVisible(!filterVisible);
	    }
	  }) : '');
	};

	const mapStateToProps$4 = state => ({
	  resources: state.resources
	});

	var Resource = reactRedux.connect(mapStateToProps$4)(ResourceAction$2);

	/* eslint-disable react/no-children-prop */
	const GlobalStyle = styled.createGlobalStyle`
  html, body, #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    color: ${({
  theme
}) => theme.colors.grey100}
  }
`;

	const App = () => {
	  const [sidebarVisible, toggleSidebar] = React.useState(false);
	  const h = new ViewHelpers();
	  const resourceId = ':resourceId';
	  const actionName = ':actionName';
	  const recordId = ':recordId';
	  const pageName = ':pageName';
	  const recordActionUrl = h.recordActionUrl({
	    resourceId,
	    recordId,
	    actionName
	  });
	  const resourceActionUrl = h.resourceActionUrl({
	    resourceId,
	    actionName
	  });
	  const bulkActionUrl = h.bulkActionUrl({
	    resourceId,
	    actionName
	  });
	  const resourceUrl = h.resourceUrl({
	    resourceId
	  });
	  const pageUrl = h.pageUrl(pageName);
	  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(GlobalStyle, null), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    height: "100%",
	    flex: true
	  }, sidebarVisible ? /*#__PURE__*/React__default.createElement(DesignSystem.Overlay, {
	    onClick: () => toggleSidebar(!sidebarVisible)
	  }) : null, /*#__PURE__*/React__default.createElement(Sidebar, {
	    isVisible: sidebarVisible
	  }), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    flex: true,
	    flexGrow: 1,
	    flexDirection: "column",
	    overflowY: "auto",
	    bg: "bg"
	  }, /*#__PURE__*/React__default.createElement(TopBar, {
	    toggleSidebar: () => toggleSidebar(!sidebarVisible)
	  }), /*#__PURE__*/React__default.createElement(DesignSystem.Box, {
	    position: "absolute",
	    top: 0
	  }, /*#__PURE__*/React__default.createElement(Notice, null)), /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
	    path: h.dashboardUrl(),
	    exact: true,
	    component: Dashboard$2
	  }), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
	    path: resourceUrl,
	    component: Resource
	  }), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
	    path: pageUrl,
	    exact: true,
	    component: Page$1
	  })), /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
	    path: recordActionUrl,
	    component: RecordAction
	  }), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
	    path: resourceActionUrl,
	    component: ResourceAction$1
	  }), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
	    path: bulkActionUrl,
	    component: BulkAction
	  })))));
	};

	const pathsType = PropTypes$1.shape({
	  loginPath: PropTypes$1.string.isRequired,
	  rootPath: PropTypes$1.string.isRequired,
	  logoutPath: PropTypes$1.string.isRequired
	});
	const sessionType = PropTypes$1.shape({
	  email: PropTypes$1.string
	});
	const brandingType = PropTypes$1.shape({
	  logo: PropTypes$1.string.isRequired,
	  companyName: PropTypes$1.string.isRequired,
	  softwareBrothers: PropTypes$1.bool.isRequired
	});
	const propertyTypeShape = {
	  isId: PropTypes$1.bool.isRequired,
	  isSortable: PropTypes$1.bool.isRequired,
	  isTitle: PropTypes$1.bool.isRequired,
	  label: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]).isRequired,
	  name: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]).isRequired,
	  position: PropTypes$1.number.isRequired,
	  type: PropTypes$1.string.isRequired,
	  availableValues: PropTypes$1.arrayOf(PropTypes$1.shape({
	    title: PropTypes$1.string,
	    value: PropTypes$1.string
	  })),
	  reference: PropTypes$1.oneOfType([PropTypes$1.string]),
	  isArray: PropTypes$1.boolean
	};
	const propertyType = PropTypes$1.shape(propertyTypeShape);
	propertyTypeShape.subProperties = PropTypes$1.arrayOf(propertyType);
	const versionsType = PropTypes$1.shape({
	  admin: PropTypes$1.string,
	  app: PropTypes$1.string
	});
	const simplifiedPropertyType = PropTypes$1.shape({
	  isId: PropTypes$1.bool,
	  isSortable: PropTypes$1.bool,
	  isTitle: PropTypes$1.bool,
	  isVisible: PropTypes$1.bool,
	  label: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]).isRequired,
	  name: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]).isRequired,
	  position: PropTypes$1.number,
	  type: PropTypes$1.string,
	  availableValues: PropTypes$1.arrayOf(PropTypes$1.shape({
	    title: PropTypes$1.string,
	    value: PropTypes$1.string
	  })),
	  reference: PropTypes$1.oneOfType([PropTypes$1.string])
	});
	const actionType = PropTypes$1.shape({
	  actionType: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.arrayOf(PropTypes$1.string)]).isRequired,
	  icon: PropTypes$1.string,
	  label: PropTypes$1.string.isRequired,
	  name: PropTypes$1.string.isRequired,
	  showFilter: PropTypes$1.bool
	});
	const resourceParentType = PropTypes$1.shape({
	  name: PropTypes$1.string.isRequired,
	  icon: PropTypes$1.string.isRequired
	});
	const resourceType = PropTypes$1.shape({
	  editProperties: PropTypes$1.arrayOf(propertyType).isRequired,
	  filterProperties: PropTypes$1.arrayOf(propertyType).isRequired,
	  href: PropTypes$1.string.isRequired,
	  id: PropTypes$1.string.isRequired,
	  listProperties: PropTypes$1.arrayOf(propertyType).isRequired,
	  name: PropTypes$1.string.isRequired,
	  parent: resourceParentType.isRequired,
	  resourceActions: PropTypes$1.arrayOf(actionType).isRequired,
	  showProperties: PropTypes$1.arrayOf(propertyType).isRequired,
	  titleProperty: propertyType.isRequired
	});
	const resourceParentWithResourcesType = PropTypes$1.shape({
	  name: PropTypes$1.string.isRequired,
	  icon: PropTypes$1.string.isRequired,
	  resources: PropTypes$1.arrayOf(resourceType).isRequired
	});
	const recordType = PropTypes$1.shape({
	  params: PropTypes$1.object.isRequired,
	  populated: PropTypes$1.object,
	  errors: PropTypes$1.object,
	  id: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]),
	  title: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]),
	  recordActions: PropTypes$1.arrayOf(actionType).isRequired
	});
	const locationType = PropTypes$1.shape({
	  pathname: PropTypes$1.string.isRequired
	});
	const historyType = PropTypes$1.shape({
	  push: PropTypes$1.func.isRequired
	});
	const matchType = PropTypes$1.shape({
	  params: PropTypes$1.shape({
	    resourceId: PropTypes$1.string,
	    recordId: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]),
	    actionName: PropTypes$1.string
	  })
	});
	const childrenType = PropTypes$1.oneOfType([PropTypes$1.element, PropTypes$1.arrayOf(PropTypes$1.oneOfType([PropTypes$1.element, PropTypes$1.arrayOf(PropTypes$1.element), PropTypes$1.string, PropTypes$1.number])), PropTypes$1.string, PropTypes$1.number]);
	const noticeType = PropTypes$1.shape({
	  message: PropTypes$1.string,
	  progress: PropTypes$1.number,
	  type: PropTypes$1.oneOf(['success', 'error'])
	});

	var types$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		pathsType: pathsType,
		sessionType: sessionType,
		brandingType: brandingType,
		propertyType: propertyType,
		versionsType: versionsType,
		simplifiedPropertyType: simplifiedPropertyType,
		actionType: actionType,
		resourceParentType: resourceParentType,
		resourceType: resourceType,
		resourceParentWithResourcesType: resourceParentWithResourcesType,
		recordType: recordType,
		locationType: locationType,
		historyType: historyType,
		matchType: matchType,
		childrenType: childrenType,
		noticeType: noticeType
	});

	const env = {
	  NODE_ENV: "development" 
	};
	const store = createStore(window.REDUX_STATE);
	const theme = window.THEME;
	const {
	  locale
	} = window.REDUX_STATE;
	i18n.use(reactI18next.initReactI18next).init({
	  resources: {
	    [locale.language]: {
	      translation: locale.translations
	    }
	  },
	  lng: locale.language,
	  interpolation: {
	    escapeValue: false
	  }
	});
	const Application = /*#__PURE__*/React__default.createElement(reactRedux.Provider, {
	  store: store
	}, /*#__PURE__*/React__default.createElement(styled.ThemeProvider, {
	  theme: theme
	}, /*#__PURE__*/React__default.createElement(reactRouterDom.BrowserRouter, null, /*#__PURE__*/React__default.createElement(App, null)))); // eslint-disable-next-line no-undef

	window.regeneratorRuntime = regenerator;
	var bundleEntry = {
	  withNotice,
	  Application,
	  ViewHelpers,
	  UserComponents: {},
	  ApiClient,
	  BasePropertyComponent,
	  env,
	  ...AppComponents,
	  ...Hooks,
	  flatten: flat__default.flatten,
	  unflatten: flat__default.unflatten,
	  // DEPRECATED: this should be removed in the next version
	  // now it was added here to ensure backwards compatibility
	  // window.AdminBroDesignSystem is set by design-system bundle
	  ...window.AdminBroDesignSystem,
	  types: types$1
	};

	return bundleEntry;

}(React, ReactRedux, ReactRouterDOM, styled, ReactI18Next, i18n, flat, AdminBroDesignSystem, Redux, axios, ReactRouter, ReactDOM, PropTypes, ReactSelect));