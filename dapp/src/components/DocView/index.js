import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import {
  DocViewContainer
} from './styles'

export const DocView = ({close}) => {
  const [pages, setPages] = useState([]);
  const ht = useRef()

  function onDocumentLoadSuccess({ numPages }) {
    setPages([...Array.from({length: numPages}, (_, idx) => idx + 1)]);
    // let ret = []
    // let i
    // for (i = 0; i < numPages; i ++) {
    //   ret = [...ret, i + 1]
    // }
    // setPages(ret)
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <DocViewContainer>
      <div className='top-frame' ref={ht}>
        <div className='subtitle'>
          Litepaper
          <i class="fa-solid fa-circle-xmark close" onClick={close}></i>
        </div>
        <div className='summary-frame'>
          <div className='pdf-frame'>
            <Document file="/royalty-sale-litepaper.pdf" onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
              {
                pages.map(t => <Page key={t} pageNumber={t} style={{maxWidth: '100%'}} />)
              }
            </Document>
          </div>
        </div>
      </div>
    </DocViewContainer>
  )
}
