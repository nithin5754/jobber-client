

import AppPage from "./AppPage";

import { render } from '@testing-library/react'


describe('FIRST TESTS',()=>{
  it('should render components',()=>{
    render(<AppPage/>)
    expect(true).toBeTruthy()
  })
})