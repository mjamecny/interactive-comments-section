import styled from "styled-components"

const StyledScore = styled.div`
  background-color: var(--color-light-gray);
  display: flex;
  align-items: center;
  gap: 2.4rem;
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  justify-self: start;

  @media (min-width: 768px) {
    flex-direction: column;
    grid-row: 1 / 3;
  }
`

const Button = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon = styled.img`
  cursor: pointer;
`

const ScoreNum = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--color-moderate-blue);
`

export default function Score({
  score,
  handleUpvote,
  handleDownvote,
  isCurrentUser,
}) {
  return (
    <StyledScore>
      {!isCurrentUser && (
        <Button onClick={handleUpvote}>
          <Icon src="icon-plus.svg" alt="plus icon" />
        </Button>
      )}

      <ScoreNum>{score}</ScoreNum>
      {!isCurrentUser && (
        <Button onClick={handleDownvote}>
          <Icon src="icon-minus.svg" alt="minus icon" />
        </Button>
      )}
    </StyledScore>
  )
}
