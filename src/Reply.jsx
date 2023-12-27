import { useState } from "react"
import styled from "styled-components"

import Score from "./Score"
import ActionButton from "./ActionButton"
import NewReply from "./NewReply"
import Button from "./Button"
import MessageInput from "./MessageInput"

import { useComments } from "./contexts/CommentsContext"

const StyledReply = styled.div`
  background-color: var(--color-white);
  padding: 1.6rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 1.6rem;
  border-radius: 7px;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: min-content 1fr min-content;
    column-gap: 1.6rem;
  }
`

const ReplyInfo = styled.div`
  display: flex;
  align-items: center;
  grid-column: 1 / -1;
  gap: 1.6rem;

  @media (min-width: 768px) {
    grid-column: 2 / 3;
  }
`

const Avatar = styled.img`
  width: 44px;
`
const Username = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--color-dark-blue);
`

const Tag = styled.p`
  font-weight: 500;
  background-color: var(--color-moderate-blue);
  color: var(--color-white);
  border-radius: 3px;
  padding-inline: 0.8rem;
`

const CreatedAt = styled.p`
  font-size: 1.8rem;
`

const Content = styled.p`
  grid-column: 1 / -1;

  @media (min-width: 768px) {
    grid-column: 2 / -1;
  }
`

const ReplyTo = styled.span`
  font-weight: 500;
  color: var(--color-moderate-blue);
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-self: end;

  @media (min-width: 768px) {
    grid-column: 3 / -1;
    grid-row: 1 / 2;
  }
`

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  }

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit)

    if (interval > 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`
    }
  }

  return "Just now"
}

export default function Reply({ commentId, reply, currentUser, setDelObj }) {
  const { id, content, createdAt, score, user, replyingTo } = reply
  const [isEditing, setIsEditing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [message, setMessage] = useState(reply.content)
  const { dispatch } = useComments()

  const ago = timeAgo(createdAt)

  const isCurrentUser = user.id === currentUser.id

  function handleDelete(id) {
    setDelObj({
      isDeleting: true,
      deletingId: id,
      referenceId: commentId,
      type: "reply",
    })
  }

  function handleUpvote(id) {
    dispatch({
      type: "upvoteReply",
      payload: { commentId, replyId: id, userId: currentUser.id },
    })
  }

  function handleDownvote(id) {
    dispatch({
      type: "downvoteReply",
      payload: { commentId, replyId: id, userId: currentUser.id },
    })
  }

  function handleEdit() {
    setIsEditing((prev) => !prev)
  }

  function handleReply() {
    setIsReplying((prev) => !prev)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({
      type: "editReply",
      payload: { commentId, replyId: id, content: message },
    })
    setIsEditing(false)
  }

  return (
    <>
      <StyledReply>
        <ReplyInfo>
          <Avatar src={user.image.png} alt={`avatar of ${user.username}`} />
          <Username>{user.username}</Username>
          {currentUser.id === user.id && <Tag>you</Tag>}
          <CreatedAt>{ago}</CreatedAt>
        </ReplyInfo>
        {isEditing ? (
          <>
            <MessageInput
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button isEditing={isEditing} onClick={handleSubmit}>
              Update
            </Button>
          </>
        ) : (
          <>
            <Content>{content}</Content>

            <Score
              score={score}
              handleUpvote={() => handleUpvote(id)}
              handleDownvote={() => handleDownvote(id)}
              isCurrentUser={isCurrentUser}
            />
          </>
        )}
        {currentUser.id === user.id ? (
          <ButtonContainer>
            <ActionButton
              src="icon-delete.svg"
              text="Delete"
              onClick={() => handleDelete(id)}
              color="--color-soft-red"
            />
            <ActionButton
              src="icon-edit.svg"
              text="Edit"
              color="--color-moderate-blue"
              onClick={() => handleEdit()}
            />
          </ButtonContainer>
        ) : (
          <ActionButton
            src="icon-reply.svg"
            text="Reply"
            color="--color-moderate-blue"
            onClick={() => handleReply()}
          />
        )}
      </StyledReply>
      {isReplying && (
        <NewReply
          currentUser={currentUser}
          replyingTo={user.username}
          commentId={commentId}
          setIsReplying={setIsReplying}
        />
      )}
    </>
  )
}
