import { Post, Comment } from '../types/models'

import { AddCommentFormData, PostFormData, PhotoFormData } from '../types/forms'

import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/posts`

async function index(): Promise<Post[]> {
  try {
    const res = await fetch(BASE_URL)
    return await res.json() as Post[]
  } catch (error) {
    throw error
  }
}

async function create(formData: PostFormData, photoFormData: PhotoFormData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    const post = await res.json()
    if (photoFormData.photo) {
      const photoData = new FormData()
      photoData.append('photo', photoFormData.photo)
      await addPhoto(photoData, post.id)
    }
  } catch (error) {
    throw(error)
  }
}

async function update(formData: PostFormData, photoFormData: PhotoFormData, postId: number) {
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    const post = await res.json()
    if (photoFormData.photo) {
      const photoData = new FormData()
      photoData.append('photo', photoFormData.photo)
      await addPhoto(photoData, post[1][0].id)
    }
  } catch (error) {
    throw(error)
  }
}

async function deletePost(postId: number): Promise<number> {
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return await res.json()
  } catch (error) {
    throw(error)
  }
}

async function addPhoto(photoData: FormData, postId: number): Promise<string> {
  try {
    const res = await fetch(`${BASE_URL}/${postId}/add-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: photoData
    })
    return await res.json() as string
  } catch (error) {
    throw error
  }
}

async function addComment(formData: AddCommentFormData, postId: number): Promise<Comment> {
  try {
    const res = await fetch(`${BASE_URL}/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    return await res.json()
  } catch (error) {
    throw(error)
  }
}

async function updateComment(formData: AddCommentFormData, postId: number, commentId: number): Promise<Comment> {
  try {
    const res = await fetch(`${BASE_URL}/${postId}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    return await res.json()
  } catch (error) {
    throw(error)
  }
}

async function deleteComment(postId: number, commentId: number): Promise<number> {
  try {
    const res = await fetch(`${BASE_URL}/${postId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return await res.json()
  } catch (error) {
    throw(error)
  }
}

export {
  index,
  create,
  update,
  deletePost as delete,
  addPhoto, addComment,
  updateComment,
  deleteComment
}
