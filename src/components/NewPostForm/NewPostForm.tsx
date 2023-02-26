import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import * as postService from '../../services/postService'

import styles from './NewPostForm.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTractor } from '@fortawesome/free-solid-svg-icons'

import { NewPostFormData, PhotoFormData, NewPostFormElements } from '../../types/forms'

import { tractors } from '../../data/tractors'

interface NewPostFormProps {
}

const NewPostForm = (props: NewPostFormProps): JSX.Element => {
  const navigate = useNavigate()

  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })
  const [photoPreview, setPhotoPreview] = useState<string>('')
  const [formData, setFormData] = useState<NewPostFormData>({
    variety: 'Utility',
    brand: 'John Deere',
    design: '',
    horsepower: 0,
    reaction: '',
    rating: 0,
  })
  const [hover, setHover] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    if (evt.target.files) reader.readAsDataURL(evt.target.files[0])
    reader.onload = () => {
      const imageUrl = reader.result as string
      setPhotoPreview(imageUrl)
    }
    if (evt.target.files) setPhotoData({ photo: evt.target.files.item(0) })
  }

  const handleChange = (evt: React.ChangeEvent<NewPostFormElements>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleRating = (rating: number) => {
    setFormData({ ...formData, rating: rating })
  }

  const handleHover = (evt: React.MouseEvent<SVGSVGElement>, rating: number): void => {
    if (evt.type === 'mouseover') {
      setHover(rating)
    } else if (evt.type === 'mouseleave') {
      setHover(null)
    }
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    console.log(formData);
    console.log(photoData);
    if(isSubmitted) return
    try {
      setIsSubmitted(true)
      await postService.create(formData, photoData)
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

  const ratingOptions: [ 1, 2, 3, 4, 5 ] = [ 1, 2, 3, 4, 5 ]

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
      <img id={styles.photo} src={photoPreview} />
      <div className={styles.inputContainer}>
        <label htmlFor="brand">Make:</label>
        <select name="brand" id="brand" onChange={handleChange} required>
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
        <select name="variety" id="variety" onChange={handleChange} required>
          {tractors.types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="confirm">Rating:</label>
        <div id={styles.rating}>
          {ratingOptions.map((ratingOption: number): JSX.Element => (
            <FontAwesomeIcon
              key={ratingOption}
              icon={faTractor}
              onClick={() => handleRating(ratingOption)}
              onMouseOver={(evt) => handleHover(evt, ratingOption)}
              onMouseLeave={(evt) => handleHover(evt, ratingOption)}
              className={ratingOption <= (hover ?? rating) ? styles.rated : styles.unrated}
            />
          ))}
        </div>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="horsepower">HP:</label>
        <input
          type="number"
          id="horsepower"
          value={horsepower}
          name="horsepower"
          onChange={handleChange}
          max="1000"
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="reaction">Reaction:</label>
        <textarea
          id="reaction"
          value={reaction}
          name="reaction"
          onChange={handleChange}
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
