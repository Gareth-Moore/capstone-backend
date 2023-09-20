// if true, simulate error
function simulateError(boolean) {
  if (boolean) {
    throw new Error("Simulated error");
  }
}

export { simulateError };
