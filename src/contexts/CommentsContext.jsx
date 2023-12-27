import { createContext, useContext, useEffect, useReducer } from "react"

const CommentsContext = createContext()

const initialState = {
  currentUser: {
    id: 1,
    image: {
      png: "./avatars/image-juliusomo.png",
      webp: "./avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
    upvotedComments: [],
    downvotedComments: [],
    upvotedReplies: [],
    downvotedReplies: [],
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: 1703095200000,
      score: 12,
      user: {
        id: 2,
        image: {
          png: "./avatars/image-amyrobson.png",
          webp: "./avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: 1702929600000,
      score: 5,
      user: {
        id: 3,
        image: {
          png: "./avatars/image-maxblagun.png",
          webp: "./avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: 1702933200000,
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "./avatars/image-ramsesmiron.png",
              webp: "./avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: 1702936800000,
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            id: 1,
            image: {
              png: "./avatars/image-juliusomo.png",
              webp: "./avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
}

function reducer(state, action) {
  switch (action.type) {
    case "addComment":
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      }
    case "removeComment":
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      }
    case "editComment":
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.id) {
            return {
              ...comment,
              content: action.payload.content,
            }
          }
          return comment
        }),
      }
    case "addReply":
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              replies: [...comment.replies, action.payload.reply],
            }
          }
          return comment
        }),
      }
    case "removeReply":
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              replies: comment.replies.filter(
                (reply) => reply.id !== action.payload.replyId
              ),
            }
          }
          return comment
        }),
      }
    case "editReply":
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === action.payload.replyId) {
                  return {
                    ...reply,
                    content: action.payload.content,
                  }
                }
                return reply
              }),
            }
          }
          return comment
        }),
      }
    case "upvoteComment":
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              score: comment.score + 1,
            }
          }
          return comment
        }),
      }
    case "downvoteComment":
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              score: comment.score - 1,
            }
          }
          return comment
        }),
      }
    case "upvoteReply":
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (
                  reply.id === action.payload.replyId &&
                  reply.user.id !== action.payload.userId
                ) {
                  return {
                    ...reply,
                    score: reply.score + 1,
                  }
                }
                return reply
              }),
            }
          }
          return comment
        }),
      }
    case "downvoteReply":
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (
                  reply.id === action.payload.replyId &&
                  reply.user.id !== action.payload.userId
                ) {
                  return {
                    ...reply,
                    score: reply.score - 1,
                  }
                }
                return reply
              }),
            }
          }
          return comment
        }),
      }
    default:
      throw new Error("Action unkonwn")
  }
}

function CommentsProvider({ children }) {
  // Check if there is a stored state in localStorage
  const storedState = JSON.parse(localStorage.getItem("commentsState"))

  // Use the stored state if available, otherwise use the initial state
  const [{ currentUser, comments }, dispatch] = useReducer(
    reducer,
    storedState || initialState
  )

  // Update localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem(
      "commentsState",
      JSON.stringify({ currentUser, comments })
    )
  }, [currentUser, comments])

  return (
    <CommentsContext.Provider
      value={{
        currentUser,
        comments,
        dispatch,
      }}
    >
      {children}
    </CommentsContext.Provider>
  )
}

function useComments() {
  const context = useContext(CommentsContext)
  if (context === undefined)
    throw new Error("CommentsContext was used outside of the CommentsProvider")
  return context
}

export { CommentsProvider, useComments }
