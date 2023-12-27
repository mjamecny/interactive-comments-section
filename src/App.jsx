import { useState } from "react"
import styled from "styled-components"

import Comment from "./Comment"
import NewComment from "./NewComment"
import Modal from "./Modal"
import Overlay from "./Overlay"

import { useComments } from "./contexts/CommentsContext"

const StyledApp = styled.div`
  background-color: var(--color-light-gray);
`

const Container = styled.div`
  position: relative;
  max-width: 82rem;
  margin-inline: auto;
  padding: 6.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

export default function App() {
  const { comments, currentUser } = useComments()
  const [delObj, setDelObj] = useState({
    isDeleting: false,
    deletingId: "",
    referenceId: "",
    type: "comment",
  })

  return (
    <StyledApp>
      {delObj.isDeleting && <Overlay />}
      <Container>
        {delObj.isDeleting && <Modal setDelObj={setDelObj} delObj={delObj} />}
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            setDelObj={setDelObj}
          />
        ))}
        <NewComment currentUser={currentUser} />
      </Container>
    </StyledApp>
  )
}
