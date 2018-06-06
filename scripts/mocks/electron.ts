// mocks/electronMock.js
export const remote = {
  app: {
    getPath: jest.fn().mockReturnValue('path')
  }
}
