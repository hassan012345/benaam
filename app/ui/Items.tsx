import React from 'react';
import { getAllItems } from '../lib/actions';
import Item from './LostItem';

const Items = async () => {
    const res = await getAllItems();
    const items = res.data;
    console.log(items,"These are the items");
  return (
    
  )
}

export default Items