import React, { useEffect, useRef, useState } from 'react'
import Tagify from '@yaireo/tagify'
import '@yaireo/tagify/dist/tagify.css'

const TagInput = ({ initialTags = [], onChange }) => {
  const tagifyRef = useRef()
  const [tags, setTags] = useState(initialTags)

  useEffect(() => {
    // Initialize Tagify on the input element
    const tagify = new Tagify(tagifyRef.current)

    // Set initial tags
    tagify.addTags(tags)

    // Add event listener for tag changes
    tagify.on('change', e => {
      const newTags = tagify.value.map(tag => tag.value)

      //   setTags(newTags)
      if (onChange) {
        onChange(newTags)
      }
    })

    return () => {
      // Cleanup Tagify instance
      //   tagify.destroy()
    }
  }, [tags, onChange])

  return <input ref={tagifyRef} name='tags' />
}

export default TagInput
