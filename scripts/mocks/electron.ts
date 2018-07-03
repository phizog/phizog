// mocks/electron.ts
export const remote = {
  app: {
    getPath: jest.fn().mockReturnValue('path')
  },
  getCurrentWindow: jest.fn().mockReturnValue({
    setResizable: jest.fn(),
    setMinimumSize: jest.fn(),
    setSize: jest.fn(),
    center: jest.fn()
  })
}
