import React, { useEffect, useRef, useState } from 'react'

export interface ModalProps {
  x: number
  y: number
  show: boolean
  value: number
  color: string
  xLabel: string
  zLabel: string
}

export default function Modal({
  x,
  y,
  show,
  value,
  color,
  xLabel,
  zLabel
}: ModalProps) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate3d(${x + 10}px, ${y + 10}px, 0px)`,
          willChange: 'transform',
          backgroundColor: 'white',
          transition: 'opacity 0.3s',
          opacity: show ? 1 : 0,
          borderRadius: 4,
          pointerEvents: 'none',
          boxShadow: 'rgb(0 0 0 / 20%) 1px 2px 10px',
          padding: 10
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-block',
              borderRadius: 10,
              border: `3px solid ${color}`,
              width: 3,
              height: 3,
              marginRight: 10
            }}
          ></div>
          {zLabel}{' '}
        </div>
        <div>
          <div
            style={{
              display: 'inline-block',
              borderRadius: 10,
              border: '3px solid black',
              width: 3,
              height: 3,
              marginRight: 10
            }}
          ></div>
          {xLabel}{' '}
          <b
            style={{
              display: 'inline-block',
              marginLeft: 30,
              fontSize: '1.2rem',
              transform: 'translateY(-0.6rem)'
            }}
          >
            {value}
          </b>
        </div>
      </div>
    </>
  )
}
