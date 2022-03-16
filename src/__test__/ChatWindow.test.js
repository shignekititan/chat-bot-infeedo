import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import ChatWindow from '../ChatWindow'

test('Check Successfull Render', async () => {
  render(<ChatWindow/>)
  expect(screen.getByRole('heading',{name:"inFeeBot"})).toHaveTextContent('inFeeBot')
})

test('Check TextField Visiblity', async () => {
  render(<ChatWindow/>)
  expect(screen.getByPlaceholderText("Type Something...")).toBeVisible();
})


test('Validate if LocalStorage Data Loading', async () => {
  localStorage.setItem("messageData",JSON.stringify([
    {"source":'user', "text":"user message"},
    {"source":'bot', "text":"bot message"},
  ]))
  render(<ChatWindow/>)
  let localStorageData=JSON.parse(localStorage.getItem("messageData"));
  localStorageData.forEach(element => {
        expect(screen.getByText(element.text)).toBeVisible();
  });
})



