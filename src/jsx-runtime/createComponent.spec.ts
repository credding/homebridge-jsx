import { createComponent } from "./createComponent";
import { getRuntimeContext } from "./runtimeContext";

describe(createComponent, () => {
  describe("the returned component", () => {
    describe("getConfiguration", () => {});
  });

  it("invokes the given component fn with the given props", () => {
    const expectedProps = {};
    const componentFn = jest
      .fn()
      .mockReturnValue({ getConfiguration: jest.fn() });

    const component = createComponent(componentFn, expectedProps);
    expect(componentFn).not.toHaveBeenCalled();

    component.getConfiguration({});
    expect(componentFn).toHaveBeenCalledWith(expectedProps);
  });

  it("invokes the given component fn with the current context", () => {
    const context = {};
    const componentFn = jest.fn(() => {
      expect(getRuntimeContext()).toBe(context);
      return { getConfiguration: jest.fn() };
    });

    const component = createComponent(componentFn, {});
    expect(componentFn).not.toHaveBeenCalled();

    component.getConfiguration(context);
  });

  it("invokes the component returned from the given component fn with the current context", () => {
    const context = {};
    const returnedComponent = { getConfiguration: jest.fn() };
    const componentFn = jest
      .fn()
      .mockReturnValue({ getConfiguration: jest.fn() });

    const component = createComponent(componentFn, expectedProps);
    expect(componentFn).not.toHaveBeenCalled();

    component.getConfiguration(context);
    expect(componentFn).toHaveBeenCalledWith(expectedProps);
  });
});
