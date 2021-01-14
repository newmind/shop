
import { createSlice } from '@reduxjs/toolkit';


const initialState = {};

const REDUCER_NAME = 'produce';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {},
});


export const name = slice['name'];
export const reducer = slice['reducer'];
