import { withRuntimeContext, getRuntimeContext } from "./runtimeContext";

describe(getRuntimeContext, () => {
  it("throws when there is no context", () => {
    expect(() => getRuntimeContext()).toThrow();
  });

  it("returns the current context", () => {
    const context = { effects: [] };
    withRuntimeContext(context, () => {
      expect(getRuntimeContext()).toBe(context);
    });
  });
});

describe(withRuntimeContext, () => {
  it("replaces the current context for the given callback", () => {
    const contextA = { effects: [] };
    const contextB = { effects: [] };
    withRuntimeContext(contextA, () => {
      withRuntimeContext(contextB, () => {
        expect(getRuntimeContext()).toBe(contextB);
      });
    });
  });

  it("restores the previous context after the given callback", () => {
    const contextA = { effects: [] };
    const contextB = { effects: [] };
    withRuntimeContext(contextA, () => {
      withRuntimeContext(contextB, jest.fn());
      expect(getRuntimeContext()).toBe(contextA);
    });
  });

  it("returns the result of the given callback", () => {
    const context = { effects: [] };
    const expectedResult = {};
    const result = withRuntimeContext(context, () => {
      return expectedResult;
    });
    expect(result).toBe(expectedResult);
  });
});
