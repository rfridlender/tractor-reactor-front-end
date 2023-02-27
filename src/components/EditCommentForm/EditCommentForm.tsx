import styles from './EditCommentForm.module.scss'

import { useState } from 'react';

import * as postService from '../../services/postService'

import { BiSave } from 'react-icons/bi'

import { Post } from '../../types/models';
import { CommentFormData } from '../../types/forms'
import { Comment } from '../../types/models';
import { useQueryClient } from 'react-query';

interface EditCommentFormProps {
  post: Post;
  comment: Comment;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditCommentForm = (props: EditCommentFormProps): JSX.Element => {
  const { post, comment, setIsEditOpen } = props

  const queryClient = useQueryClient()

  const [formData, setFormData] = useState<CommentFormData>({content: comment.content})

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleUpdateComment = async (evt: React.FormEvent, commentId: number): Promise<void> => {
    evt.preventDefault()
    try {
      await postService.updateComment(formData, post.id, commentId)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setIsEditOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const { content } = formData

  return (
    <form autoComplete="off" onSubmit={(evt) => handleUpdateComment(evt, comment.id)} className={styles.container}>
      <input type="text" value={content} name="content" onChange={handleChange} />
      <button onClick={(evt) => handleUpdateComment(evt, comment.id)}><BiSave /></button>
    </form>
  )
}

export default EditCommentForm
