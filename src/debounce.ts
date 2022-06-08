const nativeMax = Math.max;
const nativeMin = Math.min;
export function debounce<U extends any[], V, T extends (...args: U) => V>(func: T, wait: number, options: any): T {
  let lastArgs : any,
    lastThis: any,
    maxWait: number | undefined,
    result: any,
    timerId: number | undefined,
    lastCallTime: number | undefined,
    lastInvokeTime = 0,
    leading = false,
    maxing = false,
    trailing = true;

    wait = Number(wait) || 0;
  if (typeof options === 'object') {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing
      ? nativeMax(Number(options.maxWait) || 0, wait)
      : maxWait;
    trailing = 'trailing' in options
      ? !!options.trailing
      : trailing;
  }

  function invokeFunc(time: number) {
    const args = lastArgs,
      thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time: number) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait) as unknown as number;
    // Invoke the leading edge.
    return leading
      ? invokeFunc(time)
      : result;
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - lastCallTime!,
      timeSinceLastInvoke = time - lastInvokeTime,
      result = wait - timeSinceLastCall;
    console.log('remainingWait');
    return maxing
      ? nativeMin(result, maxWait! - timeSinceLastInvoke)
      : result;
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - lastCallTime!,
      timeSinceLastInvoke = time - lastInvokeTime;
    // Either this is the first call, activity has stopped and we're at the trailing
    // edge, the system time has gone backwards and we're treating it as the
    // trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) || (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait!));
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time)) as unknown as number;
  }

  function trailingEdge(time: number) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been debounced at
    // least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined
      ? result
      : trailingEdge(Date.now());
  }

  function debounced(this: any, ...args: any[]) {
    const time = Date.now(),
      isInvoking = shouldInvoke(time);
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait) as unknown as number;
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait) as unknown as number;
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced as any;
}