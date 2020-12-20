import React from 'react'
import {DropzoneArea} from 'material-ui-dropzone'

const File = ({ onChange }) => {
    return (
      <DropzoneArea
        onChange={file => onChange(file[0])}
        filesLimit={1}
        acceptedFiles={['image/jpeg']}
        dropzoneText='Choisissez une image'
        showAlerts={false}
        />
    )
  
}

export default File;