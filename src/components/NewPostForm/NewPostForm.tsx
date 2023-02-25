import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import * as postService from '../../services/postService'

import styles from './NewPostForm.module.scss'

import { AuthFormProps } from '../../types/props'
import { NewPostFormData, PhotoFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

import { tractors } from '../../data/tractors'

interface NewPostFormProps {
}

const NewPostForm = (props: NewPostFormProps): JSX.Element => {
  const navigate = useNavigate()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<NewPostFormData>({
    variety: '',
    brand: '',
    design: '',
    horsepower: 0,
    reaction: '',
    rating: 1,
  })
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) setPhotoData({ photo: evt.target.files.item(0) })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    if(isSubmitted) return
    try {
      setIsSubmitted(true)
      const newPost = await postService.create(formData)
      await postService.addPhoto(photoData, newPost.id)
      navigate('/')
    } catch (err) {
      console.log(err)
      setIsSubmitted(false)
    }
  }

  const { variety, brand, design, horsepower, reaction, rating } = formData
  const { photo } = photoData

  const isFormInvalid = (): boolean => {
    return !(variety && brand && design && horsepower && reaction && rating && photo)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <label htmlFor="photo-upload">Upload Profile Photo</label>
        <div id={styles.photoUpload}>
          <label htmlFor="photo-upload" className={photoData.photo?.name && styles.active}>{!photoData.photo ? 'No file chosen' : photoData.photo.name}</label>
          <input
            type="file"
            id="photo-upload"
            name="photo"
            onChange={handleChangePhoto}
          />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="brand">Make:</label>
        <select name="brand" id="brand" onChange={(evt) => console.log(evt)} required>
          {tractors.brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="design">Model:</label>
        <input
          type="text"
          id="design"
          value={design}
          name="design"
          onChange={handleChange}
          placeholder="X000"
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="variety">Type:</label>
        <select name="variety" id="variety" onChange={(evt) => console.log(evt)} required>
          {tractors.types.map(type => (
            <option key={type} value={variety}>{type}</option>
          ))}
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="confirm">Rating:</label>
        

        X X X X X



      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="horsepower">HP:</label>
        <input
          type="number"
          id="horsepower"
          value={horsepower}
          name="horsepower"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="reaction">Reaction:</label>
        <textarea
          id="reaction"
          value={reaction}
          name="reaction"
          onChange={(evt) => console.log(evt)}
          placeholder="What is your reaction?"
        />
      </div>
      <div id={styles.buttonContainer}>
        <button id={styles.NewPost} disabled={isFormInvalid() || isSubmitted} className={styles.button}>
          {!isSubmitted ? "Sign Up" : "Sending..."}
        </button>
        <button id={styles.cancel}><Link to="/">Cancel</Link></button>
      </div>
    </form>
  )
}

export default NewPostForm
