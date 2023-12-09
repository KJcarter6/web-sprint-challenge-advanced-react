import React from "react"
import AppFunctional from "./AppFunctional"
import { render } from "@testing-library/react"
import {screen, waitfor} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
//import userEvent from '@testing-library/user-event'

// Write your tests here
// test('sanity', () => {
//   expect(true).toBe(false)
// })
test('renders without errors', () => {
  render(<AppFunctional />)
});

test('renders coordinates from form', () =>{
  render(<AppFunctional/>)
  const coordinatesElement = screen.queryByText(/Corrdinates/i);
  expect(coordinatesElement).toBeInTheDocument();
  expect(coordinatesElement).toBeTruthy();
  expect(coordinatesElement).toHaveTextContent(/Corrdinates/i);
});

test('there should be a button with text of left', ()=>{
  render(<AppFunctional/>)
  const leftButton  = screen.queryByText(/left/i);
  expect(leftButton).toHaveTextContent(/LEFT/i)
})
test('there should be a button with text of right', ()=>{
  render(<AppFunctional/>)
  const rightButton  = screen.queryByText(/right/i);
  expect(rightButton).toHaveTextContent(/RIGHT/i)
})

test('there should be a button with text of up', ()=>{
  render(<AppFunctional/>)
  const upButton  = screen.queryByText(/up/i);
  expect(upButton).toHaveTextContent(/UP/i)
})