// mocks/electron.ts
export const remote = {
  app: {
    getPath: jest.fn().mockReturnValue('path')
  }
}
