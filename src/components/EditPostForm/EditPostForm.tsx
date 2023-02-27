import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import * as postService from '../../services/postService'

import styles from './EditPostForm.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTractor } from '@fortawesome/free-solid-svg-icons'

import { PostFormData, PhotoFormData, PostFormElements } from '../../types/forms'

import { tractors } from '../../data/tractors'
import { useQueryClient } from 'react-query'

const EditPostForm = (): JSX.Element => {
  const navigate = useNavigate()

  const { state } = useLocation()

  const queryClient = useQueryClient()

  const [photoData, setPhotoData] = useState<PhotoFormData>({ photo: null })
  const [photoPreview, setPhotoPreview] = useState<string>(state.photo)
  const [formData, setFormData] = useState<PostFormData>({
    variety: state.variety,
    brand: state.brand,
    design: state.design,
    horsepower: state.horsepower,
    reaction: state.reaction,
    rating: state.rating,
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

  const handleChange = (evt: React.ChangeEvent<PostFormElements>) => {
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
    if(isSubmitted) return
    try {
      setIsSubmitted(true)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      await postService.update(formData, photoData, state.id)
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
      <div id={styles.photoUpload}>
        <label htmlFor="photo-upload" className={photoData.photo?.name && styles.active}>{!photoData.photo ? !state.photo ? 'Upload Post Photo' : 'Edit Post Photo' : photoData.photo.name}</label>
        <input
          type="file"
          id="photo-upload"
          name="photo"
          onChange={handleChangePhoto}
        />
      </div>
      {!photoPreview ? <div id={styles.spacer} /> : <img id={styles.photo} src={photoPreview} />}
      <div id={styles.tractor}>
        <div className={styles.inputContainer}>
          <label htmlFor="brand">Make</label>
          <select name="brand" id="brand" value={state.brand} onChange={handleChange} required>
            {tractors.brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="design">Model</label>
          <input
            type="text"
            className={styles.smallInput}
            id="design"
            value={design}
            name="design"
            onChange={handleChange}
            placeholder="X000"
          />
        </div>
      </div>
      <div id={styles.specs}>
        <div className={styles.inputContainer}>
          <label htmlFor="variety">Type</label>
          <select name="variety" id="variety" value={state.variety} onChange={handleChange} required>
            {tractors.types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="confirm">Rating</label>
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
          <label htmlFor="horsepower">HP</label>
          <input
            type="number"
            className={styles.smallInput}
            id="horsepower"
            value={horsepower}
            name="horsepower"
            onChange={handleChange}
            max="1000"
          />
        </div>
      </div>
      <textarea
        id="reaction"
        value={reaction}
        name="reaction"
        onChange={handleChange}
        placeholder="What is your reaction?"
      />
      <div id={styles.buttonContainer}>
        <button id={styles.newPost} disabled={isFormInvalid() || isSubmitted} className={styles.button}>
          {!isSubmitted ? "Update" : "Updating..."}
        </button>
        <button id={styles.cancel}><Link to="/">Cancel</Link></button>
      </div>
    </form>
  )
}

export default EditPostForm
