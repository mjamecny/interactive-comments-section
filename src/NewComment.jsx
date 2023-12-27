import { useState } from "react"
import styled from "styled-components"

import Button from "./Button"
import MessageInput from "./MessageInput"

import { useComments } from "./contexts/CommentsContext"

const StyledMessage = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: var(--color-white);
  padding: 1.6rem;
  row-gap: 1.6rem;
  border-radius: 7px;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: min-content 1fr min-content;
    align-items: start;
    column-gap: 1.6rem;
  }
`

const InputContainer = styled.div`
  grid-column: 1 / -1;

  @media (min-width: 768px) {
    grid-column: 2 / 3;
  }
`

const Avatar = styled.img`
  width: 40px;

  @media (min-width: 768px) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
`

export default function NewComment({ currentUser }) {
  const [message, setMessage] = useState("")
  const { dispatch } = useComments()
  const { id, image, username } = currentUser

  function handleSubmit(e) {
    e.preventDefault()

    const newMessage = {
      id: crypto.randomUUID(),
      content: message,
      createdAt: Date.now(),
      score: 1,
      user: {
        id,
        image,
        username,
      },
      replies: [],
    }

    dispatch({ type: "addComment", payload: newMessage })
    setMessage("")
  }

  return (
    <StyledMessage onSubmit={handleSubmit}>
      <InputContainer>
        <MessageInput
          placeholder="Add a comment..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </InputContainer>

      <Avatar src={image.png} alt={`avatar of ${username}`} />
      <Button>Send</Button>
    </StyledMessage>
  )
}
