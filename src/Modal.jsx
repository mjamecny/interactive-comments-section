import styled from "styled-components"
import { useComments } from "./contexts/CommentsContext"

const StyledModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.4rem;
  border-radius: 9px;
  width: min(100%, 37.5rem);
  max-width: 37.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-white);
  margin-inline: 1.6rem;
  z-index: 20;
`

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-dark-blue);
`

const Text = styled.p`
  font-size: 1.6rem;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Button = styled.button`
  padding: 1.2rem 2.4rem;
  text-transform: uppercase;
  border: none;
  border-radius: 8px;
  font-size: 1.6rem;
  font-weight: 500;
  background-color: ${({ color }) => color};
  color: var(--color-white);
`

export default function Modal({ delObj, setDelObj }) {
  const { isDeleting, deletingId, referenceId, type } = delObj
  const { dispatch } = useComments()

  function handleDelete() {
    if (type === "comment") {
      dispatch({ type: "removeComment", payload: deletingId })
    } else {
      dispatch({
        type: "removeReply",
        payload: { commentId: referenceId, replyId: deletingId },
      })
    }

    setDelObj({
      isDeleting: false,
      deletingId: "",
      referenceId: "",
      type: "comment",
    })
  }
  return (
    <StyledModal>
      <Heading>Delete comment</Heading>
      <Text>
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </Text>
      <ButtonContainer>
        <Button
          onClick={() => setDelObj({ isDeleting: false, id: "" })}
          color="var(--color-grayish-blue)"
        >
          No, Cancel
        </Button>
        <Button onClick={handleDelete} color="var(--color-soft-red)">
          Yes, Delete
        </Button>
      </ButtonContainer>
    </StyledModal>
  )
}
