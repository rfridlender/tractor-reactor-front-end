import { Post, Comment } from '../types/models'

import { AddCommentFormData } from '../types/forms'

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

// async function addPhoto(
//   photoData: FormData, 
//   profileId: number
// ): Promise<string> {
//   try {
//     const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
//       method: 'PUT',
//       headers: {
//         'Authorization': `Bearer ${tokenService.getToken()}`
//       },
//       body: photoData
//     })
//     return await res.json() as string
//   } catch (error) {
//     throw error
//   }
// }

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

export { index, addComment }
