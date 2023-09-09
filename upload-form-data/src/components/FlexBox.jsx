import React, { useState } from 'react'
import styles from './FlexBox.module.css'
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
const FlexBox = () => {
  const newArr = new Array(10000).fill(0).map((v, idx)=> idx)
  console.log(newArr)

  const [dataArr ,setDataArr] = useState(newArr)
  const addItems = () =>{
    setDataArr([...dataArr,0]);
  }

  const Row = ({ index, style }) => (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
      Row {index}
    </div>
  );

  return (
    <>
      <div className={`grid w-[1200px] h-[600px] gap-[10px] grid-cols-3 grid-rows-4 ${styles.container}`}>
        <div className={`${styles.item} ${styles.item1} col-span-1`}>Item1</div>
        <div className={`${styles.item} ${styles.item2} col-span-2`}>Item2</div>
        <div className={`${styles.item} ${styles.item3} col-span-2`}>Item3</div>
        <div className={`${styles.item} ${styles.item4} col-span-1`}>Item4</div>
    </div>

    <div className='container-flex'>
      <div className='header'>header</div>
      <div className='aside1'>Aside 1</div>
      <div className='content'>Content</div>
      <div className='aside2'>Aside 2</div>
      <div className='footer'>Footer</div>

    </div>

    <div className='items-grid-container'>
      <div className='header'>header</div>
      <div className='asideright'>aside right</div>
      <div className='content'>content</div>
      <div className='asideleft'>aside left</div>
      <div className='navbar'>navbar</div>
      <div className='footer'>footer</div>
    </div>
    {/* {
      dataArr?.map((item, idx)=>(
        <div className={item % 2 ? 'ListItemOdd' : 'ListItemEven'}>
        Row {item}
      </div>
      ))
    } */}
    <button onClick={addItems}>Add Items</button>

    <AutoSizer>
    {({ height, width }) => (
      <List
        className="List"
        height={height}
        itemCount={100}
        itemSize={20}
        width={width}
      >
        {Row}
      </List>
    )}
  </AutoSizer>


    </>

  )
}

export default FlexBox