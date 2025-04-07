import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Niivue } from '@niivue/niivue'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'

const App = () => {
  const glref = useRef<HTMLCanvasElement>(null)
  const [theNiivue, setTheNiivue] = useState<Niivue | null>(null)
  const [isWholeImg, setIsWholeImg] = useState(true)
  const [isPartialImg, setIsPartialImg] = useState(true)

  useEffect(() => {
    if (!glref) {
      return
    }
    if (!glref.current) {
      return
    }

    const opts = {
      show3Dcrosshair: true,
    }
    const nv = new Niivue(opts)

    nv.attachToCanvas(glref.current)

    setTheNiivue(nv)
  }, [glref])

  useEffect(() => {
    if (!theNiivue) {
      return
    }

    const volumeList = [{ url: './chris_t1.nii.gz' }, { url: './chris_t1-2.nii.gz' }]
    theNiivue.loadVolumes(volumeList)
  }, [theNiivue])

  const onClickWholeImg = () => {
    if (!theNiivue?.back) {
      return
    }

    theNiivue.back.opacity = 1 - theNiivue.back.opacity
    theNiivue.drawScene()

    setIsWholeImg(!isWholeImg)
  }

  const onClickPartialImg = () => {
    if (!theNiivue?.overlays?.length) {
      return
    }

    theNiivue.overlays[0].opacity = 1 - theNiivue.overlays[0].opacity
    theNiivue.drawScene()

    setIsPartialImg(!isPartialImg)
  }

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked onClick={onClickWholeImg} />}
          label='whole'
        />
        <FormControlLabel
          control={<Checkbox defaultChecked onClick={onClickPartialImg} />}
          label='partial'
        />
      </FormGroup>
      <canvas ref={glref} />
    </>
  )
}

export default App
