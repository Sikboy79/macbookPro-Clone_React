import React from 'react'

const ProductViewer = () => {
  return (
    <section id="product-viewer">
        <h2>take a closer look</h2>
        <div className='controls'>
            <p className='info'>MacbookPro 16" Space Black</p>

            <div className='flex-center gap-5 mt-5'>
                <div className='color-control'>
                    <div className='bg-neutral-300' />
                    <div className='bg-neutral-900' />
                </div>
                <div className='size-control'>
                    <div><p>14"</p></div>
                    <div><p>16"</p></div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProductViewer
