
import type {Config} from 'jest'

const config :Config ={
  rootDir:__dirname,
  testEnvironment:'jsdom',
  setupFilesAfterEnv:['<rootDir>/test/jest.setup.ts'],
  transform :{
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1", 
  },
}

export default config